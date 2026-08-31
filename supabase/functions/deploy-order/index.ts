// deploy-order — Supabase Edge Function
//
// İki aksiyonu destekler, body içindeki `action` alanıyla seçilir (varsayılan "deploy"):
//
// action: "deploy" — Admin panelinden "Canlıya Al" / "Yeniden Canlıya Al" butonuna basıldığında:
// 1) Çağıranın gerçekten giriş yapmış bir admin olduğunu doğrular (anon key ile değil).
// 2) Siparişi (orders tablosu) service_role ile okur (RLS'i bypass eder).
// 3) İlgili şablonun ham HTML'ini canlı siteden (askina-ozel.vercel.app/templates/..) çeker.
// 4) Fotoğraflar için uzun ömürlü imzalı Storage URL'leri üretir.
// 5) Şablonun <script> içindeki CONFIG nesnesini, siparişteki verilerle regex tabanlı
//    olarak doldurur (evrensel alanlar + şablona özel alanlar).
// 6) Doldurulmuş tek dosyalık HTML'i Vercel'e, mevcut "askina-ozel" projesinin
//    içinde ayrı bir (preview) deployment olarak yükler.
// 7) orders.live_url / orders.deployment_id / orders.deployed_at alanlarını
//    günceller, linki döner.
//
// action: "takedown" — Admin panelinden "🗑 Canlıdan Kaldır" butonuna basıldığında:
// 1) Aynı admin doğrulaması yapılır.
// 2) Siparişin kayıtlı orders.deployment_id'si Vercel API'siyle DELETE edilir
//    (deployment silinince o linke giden herkese 404 döner).
// 3) orders.live_url / orders.deployment_id / orders.deployed_at NULL'a çekilir
//    — admin panelinde tekrar "🚀 Canlıya Al" butonu görünür.
//
// Gerekli secret'lar (supabase secrets set ile):
//   VERCEL_TOKEN     -> Vercel personal access token
//   VERCEL_TEAM_ID    -> (opsiyonel) token bir takıma bağlıysa gerekli team id
//
// SUPABASE_URL / SUPABASE_ANON_KEY / SUPABASE_SERVICE_ROLE_KEY Supabase tarafından
// Edge Function ortamına otomatik enjekte edilir, ayrıca set etmeye gerek yok.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const TEMPLATE_SITE_BASE = "https://askina-ozel.vercel.app/templates";
const PHOTO_SIGN_SECONDS = 60 * 60 * 24 * 365 * 5; // ~5 yıl

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });
}

// --- CONFIG bloğu içinde alan değiştirme yardımcıları (sadece extract edilen CONFIG metni üzerinde çalışır) ---

function setString(block: string, key: string, value: string | null | undefined): string {
  const re = new RegExp(
    `(\\b${key}\\s*:\\s*)("(?:[^"\\\\]|\\\\.)*"|'(?:[^'\\\\]|\\\\.)*'|\`(?:[^\`\\\\]|\\\\.)*\`)`,
    "s",
  );
  if (!re.test(block)) return block;
  return block.replace(re, (_m, pre) => pre + JSON.stringify(value ?? ""));
}

// accessType gibi varsayılan değeri literal `null` olan (tırnaksız) alanlar için —
// value verilirse tırnaklı stringe, verilmezse null'a çevirir.
function setStringOrNull(block: string, key: string, value: string | null | undefined): string {
  const re = new RegExp(
    `(\\b${key}\\s*:\\s*)(null|"(?:[^"\\\\]|\\\\.)*"|'(?:[^'\\\\]|\\\\.)*'|\`(?:[^\`\\\\]|\\\\.)*\`)`,
    "s",
  );
  if (!re.test(block)) return block;
  const encoded = value ? JSON.stringify(value) : "null";
  return block.replace(re, (_m, pre) => pre + encoded);
}

function setNumberOrNull(block: string, key: string, value: unknown): string {
  const re = new RegExp(`(\\b${key}\\s*:\\s*)(null|-?\\d+(?:\\.\\d+)?)`);
  if (!re.test(block)) return block;
  const encoded = value === null || value === undefined || value === ""
    ? "null"
    : String(Number(value));
  return block.replace(re, (_m, pre) => pre + encoded);
}

function setArray(block: string, key: string, arr: unknown[]): string {
  const re = new RegExp(`(\\b${key}\\s*:\\s*)\\[[\\s\\S]*?\\]`);
  if (!re.test(block)) return block;
  return block.replace(re, (_m, pre) => pre + JSON.stringify(arr));
}

// --- serbest metin alanlarını satır bazlı yapılara çeviren küçük ayrıştırıcılar ---
// (order formu bu alanları "Başlık: Açıklama" gibi satırlar halinde topluyor)

function parseLines(raw: string): string[] {
  return raw.split("\n").map((l) => l.trim()).filter(Boolean);
}

function parseTitledPairs(raw: string, keyA: string, keyB: string): Record<string, string>[] {
  return parseLines(raw).map((line) => {
    const idx = line.indexOf(":");
    if (idx === -1) return { [keyA]: line.trim(), [keyB]: "" };
    return { [keyA]: line.slice(0, idx).trim(), [keyB]: line.slice(idx + 1).trim() };
  });
}

function parseWishes(raw: string): { name: string; message: string }[] {
  return parseTitledPairs(raw, "name", "message") as { name: string; message: string }[];
}

function parseMilestones(raw: string): { date: string; text: string }[] {
  return parseTitledPairs(raw, "date", "text") as { date: string; text: string }[];
}

// altin-saat "memories" -> "Tarih | Başlık" satırları + galeri fotoğraflarından ilk N tanesi
function parseMemories(
  raw: string,
  photoUrls: string[],
): { date: string; title: string; photo: string }[] {
  return parseLines(raw).map((line, i) => {
    const parts = line.split("|").map((p) => p.trim());
    const date = parts[0] || "";
    const title = parts[1] || "";
    return { date, title, photo: photoUrls[i] || photoUrls[0] || "" };
  });
}

function isoDateTime(dateOnly: string | null | undefined): string {
  if (!dateOnly) return "";
  // Postgres 'date' kolonu "2026-12-31" döner; şablonlar "...T00:00:00" ISO bekliyor.
  return dateOnly.length <= 10 ? `${dateOnly}T00:00:00` : dateOnly;
}

// Vercel token'ı sadece "askina-ozel" projesine deploy izniyle sınırlı (yeni proje
// oluşturamıyor) — bu yüzden her sipariş, aynı projenin İÇİNDE, target belirtilmeden
// (yani "preview") ayrı bir deployment olarak oluşturuluyor. Bu, ana canlı siteyi
// (askina-ozel.vercel.app, production deploy'a bağlı custom domain) hiç etkilemez;
// her sipariş kendi rastgele "askina-ozel-xxxxxxx.vercel.app" adresini alır.
// Not: proje için "Deployment Protection / SSO" kapatıldı (bkz. CLAUDE.md) —
// aksi halde bu linkler müşteri tarayıcısında Vercel girişi isteyip açılmazdı.
const VERCEL_PROJECT_NAME = "askina-ozel";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const vercelToken = Deno.env.get("VERCEL_TOKEN");
    const vercelTeamId = Deno.env.get("VERCEL_TEAM_ID") || "";

    if (!vercelToken) {
      return json({ error: "VERCEL_TOKEN secret tanımlı değil (supabase secrets set ile ekle)." }, 500);
    }

    // 1) Çağıranın gerçek bir admin oturumu olduğunu doğrula (anon key değil).
    const authHeader = req.headers.get("Authorization") || "";
    const jwt = authHeader.replace(/^Bearer\s+/i, "");
    if (!jwt) return json({ error: "Yetkisiz: oturum bulunamadı." }, 401);

    const callerClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: `Bearer ${jwt}` } },
    });
    const { data: userData, error: userErr } = await callerClient.auth.getUser();
    if (userErr || !userData?.user) {
      return json({ error: "Yetkisiz: geçerli bir admin oturumu gerekiyor." }, 401);
    }

    const { order_id, action } = await req.json().catch(() => ({}));
    if (!order_id) return json({ error: "order_id zorunlu." }, 400);

    // 2) Siparişi service_role ile oku (RLS bypass).
    const admin = createClient(supabaseUrl, serviceKey);
    const { data: order, error: orderErr } = await admin
      .from("orders")
      .select("*")
      .eq("id", order_id)
      .single();
    if (orderErr || !order) return json({ error: "Sipariş bulunamadı." }, 404);

    // --- action: takedown — sayfayı canlıdan kaldır ---
    if (action === "takedown") {
      if (!order.deployment_id) {
        return json({ error: "Bu sipariş için kayıtlı bir canlı deployment yok." }, 400);
      }
      const delUrl = new URL(`https://api.vercel.com/v13/deployments/${order.deployment_id}`);
      if (vercelTeamId) delUrl.searchParams.set("teamId", vercelTeamId);
      const delRes = await fetch(delUrl.toString(), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${vercelToken}` },
      });
      // Vercel deployment zaten silinmişse/bulunamıyorsa da (404) kaydı temizlemeye devam et.
      if (!delRes.ok && delRes.status !== 404) {
        const delJson = await delRes.json().catch(() => ({}));
        return json({ error: `Vercel'den kaldırma hatası: ${delJson?.error?.message || delRes.statusText}` }, 500);
      }
      const { error: clearErr } = await admin
        .from("orders")
        .update({ live_url: null, deployment_id: null, deployed_at: null })
        .eq("id", order_id);
      if (clearErr) {
        return json({ error: `Vercel'den kaldırıldı ama kayıt güncellenemedi: ${clearErr.message}` }, 500);
      }
      return json({ removed: true });
    }

    if (!order.template) return json({ error: "Siparişte şablon bilgisi yok." }, 400);

    // 3) Şablon HTML'ini çek.
    const templateRes = await fetch(`${TEMPLATE_SITE_BASE}/${order.template}.html`);
    if (!templateRes.ok) {
      return json({ error: `Şablon dosyası alınamadı: ${order.template} (${templateRes.status})` }, 500);
    }
    let html = await templateRes.text();

    // 4) Fotoğraflar için uzun ömürlü imzalı URL üret.
    let photoUrls: string[] = [];
    if (Array.isArray(order.photo_urls) && order.photo_urls.length) {
      const { data: signed, error: signErr } = await admin.storage
        .from("order-photos")
        .createSignedUrls(order.photo_urls, PHOTO_SIGN_SECONDS);
      if (!signErr && signed) {
        photoUrls = signed.map((s) => s.signedUrl).filter(Boolean) as string[];
      }
    }

    // 5) CONFIG bloğunu bul ve doldur.
    const configMatch = html.match(/const CONFIG = \{[\s\S]*?\n\};/);
    if (!configMatch) {
      return json({ error: "Şablonda CONFIG bloğu bulunamadı, elle doldurulmalı." }, 500);
    }
    let block = configMatch[0];

    // Evrensel alanlar (tüm 19 şablonda aynı isimle var).
    block = setString(block, "partnerName", order.partner_name);
    block = setString(block, "senderName", order.sender_name);
    block = setString(block, "letter", order.letter);
    block = setString(block, "songName", order.song_name || "");
    block = setString(block, "songArtist", order.song_artist || "");
    block = setString(block, "spotifyEmbedUrl", order.spotify_link || "");
    block = setString(block, "timeCapsuleDate", isoDateTime(order.capsule_date));
    block = setString(block, "timeCapsuleMessage", order.capsule_message || "");
    if (order.special_date_label) block = setString(block, "specialDateLabel", order.special_date_label);
    if (order.special_date) block = setString(block, "specialDate", isoDateTime(order.special_date));
    if (photoUrls.length) block = setArray(block, "photos", photoUrls);

    // Erişim kilidi (opsiyonel — tarih / soru-cevap / 4 haneli şifre).
    if (order.access_type) {
      block = setStringOrNull(block, "accessType", order.access_type);
      block = setString(block, "accessQuestion", order.access_question || "");
      if (order.access_date) block = setString(block, "accessDate", order.access_date);
      if (order.access_password) block = setString(block, "accessPassword", order.access_password);
      if (order.access_pin) block = setString(block, "accessPin", order.access_pin);
    }

    // Şablona özel alanlar (order.template_extra.fields = siparis-formu.html'in
    // collectTemplateExtrasStructured() çıktısı, {fieldId: value} şeklinde).
    const extra: Record<string, string> = order.template_extra?.fields || {};

    switch (order.template) {
      case "puzzle-aski":
        if (photoUrls.length) block = setString(block, "PUZZLE_IMAGE", photoUrls[0]);
        break;
      case "kazi-kazan-surprizi":
        if (extra.extraScratchMessage) block = setString(block, "scratchMessage", extra.extraScratchMessage);
        if (photoUrls.length) block = setString(block, "scratchImage", photoUrls[0]);
        break;
      case "hafiza-kartlari":
        if (extra.extraSymbols) {
          const syms = extra.extraSymbols.trim().split(/\s+/).filter(Boolean).slice(0, 6);
          if (syms.length === 6) block = setArray(block, "SYMBOLS", syms);
        }
        break;
      case "evlilik-teklifi":
        if (extra.extraMilestones) block = setArray(block, "milestones", parseMilestones(extra.extraMilestones));
        break;
      case "altin-saat":
        if (extra.extraMemories) {
          block = setArray(block, "memories", parseMemories(extra.extraMemories, photoUrls));
        }
        break;
      case "dogum-gunu-solen":
        if (extra.extraAge) block = setNumberOrNull(block, "age", extra.extraAge);
        if (extra.extraWishes) block = setArray(block, "wishes", parseWishes(extra.extraWishes));
        break;
      case "bebek-duyurusu":
        if (extra.extraRevealType) block = setString(block, "revealType", extra.extraRevealType);
        if (extra.extraRevealColor) block = setString(block, "revealColor", extra.extraRevealColor);
        if (extra.extraParentNames) block = setString(block, "parentNames", extra.extraParentNames);
        if (extra.extraBabyName) block = setString(block, "babyName", extra.extraBabyName);
        if (order.special_date) block = setString(block, "dueDate", isoDateTime(order.special_date));
        if (extra.extraWishes) block = setArray(block, "wishes", parseWishes(extra.extraWishes));
        break;
      case "tesekkur-ozur":
        if (extra.extraPageType) block = setString(block, "pageType", extra.extraPageType);
        if (extra.extraReasons) block = setArray(block, "reasons", parseLines(extra.extraReasons));
        break;
      case "aile-gunu":
        if (extra.extraPageType) block = setString(block, "pageType", extra.extraPageType);
        if (extra.extraReasons) block = setArray(block, "reasons", parseLines(extra.extraReasons));
        if (extra.extraFamilyWishes) block = setArray(block, "familyWishes", parseWishes(extra.extraFamilyWishes));
        break;
      case "mezuniyet":
        if (extra.extraDegree) block = setString(block, "degree", extra.extraDegree);
        if (extra.extraMilestones) block = setArray(block, "milestones", parseMilestones(extra.extraMilestones));
        if (extra.extraWishes) block = setArray(block, "wishes", parseWishes(extra.extraWishes));
        break;
      case "yeni-is-terfi":
        if (extra.extraRole) block = setString(block, "role", extra.extraRole);
        if (extra.extraMilestones) block = setArray(block, "milestones", parseMilestones(extra.extraMilestones));
        if (extra.extraWishes) block = setArray(block, "wishes", parseWishes(extra.extraWishes));
        break;
      case "evcil-hayvan-anisi":
        if (extra.extraYearsTogether) block = setString(block, "yearsTogether", extra.extraYearsTogether);
        break;
    }

    html = html.replace(configMatch[0], block);

    // 6) Vercel'e, mevcut "askina-ozel" projesinin İÇİNDE, target belirtmeden
    //    (= preview) tek dosyalık ayrı bir deployment olarak deploy et.
    //    target GÖNDERİLMEMELİ: "production" göndermek bu deployment'ı ana
    //    canlı siteye (askina-ozel.vercel.app) alias'lar ve gerçek siteyi ezer.
    const deployUrl = new URL("https://api.vercel.com/v13/deployments");
    if (vercelTeamId) deployUrl.searchParams.set("teamId", vercelTeamId);

    const deployRes = await fetch(deployUrl.toString(), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${vercelToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: VERCEL_PROJECT_NAME,
        files: [
          {
            file: "index.html",
            data: btoa(unescape(encodeURIComponent(html))),
            encoding: "base64",
          },
        ],
        projectSettings: { framework: null },
      }),
    });

    const deployJson = await deployRes.json();
    if (!deployRes.ok) {
      return json({ error: `Vercel deploy hatası: ${deployJson?.error?.message || deployRes.statusText}` }, 500);
    }

    const liveUrl = deployJson.alias?.[0]
      ? `https://${deployJson.alias[0]}`
      : `https://${deployJson.url}`;
    const deploymentId: string | undefined = deployJson.id;

    // "Yeniden Canlıya Al" durumunda eski deployment'ı arkada bırakmamak için sil
    // (best-effort — başarısız olursa deploy'u yine de tamamlanmış say).
    if (order.deployment_id && order.deployment_id !== deploymentId) {
      const oldUrl = new URL(`https://api.vercel.com/v13/deployments/${order.deployment_id}`);
      if (vercelTeamId) oldUrl.searchParams.set("teamId", vercelTeamId);
      await fetch(oldUrl.toString(), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${vercelToken}` },
      }).catch(() => {});
    }

    // 7) Sipariş kaydını güncelle.
    const { error: updateErr } = await admin
      .from("orders")
      .update({ live_url: liveUrl, deployment_id: deploymentId, deployed_at: new Date().toISOString() })
      .eq("id", order_id);
    if (updateErr) {
      return json({ error: `Deploy başarılı ama kayıt güncellenemedi: ${updateErr.message}`, live_url: liveUrl }, 500);
    }

    return json({ live_url: liveUrl });
  } catch (e) {
    return json({ error: `Beklenmeyen hata: ${e instanceof Error ? e.message : String(e)}` }, 500);
  }
});
