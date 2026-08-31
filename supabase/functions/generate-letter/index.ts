// generate-letter — Supabase Edge Function
//
// Admin panelindeki "✨ Yapay Zeka ile Yaz" butonuna basıldığında çalışır.
// Siparişteki ham bilgileri (müşterinin "Siz yazın, ben anlatayım" modunda
// verdiği maddeler, ya da kendi yazdığı taslak) alıp, şablonun tonuna uygun,
// akıcı bir mektup taslağı üretir. Üretilen metin OTOMATIK KAYDEDİLMEZ —
// admin panelinde bir textarea'ya doldurulur, admin gözden geçirip
// düzenleyip "Kaydet"e basar.
//
// Sağlayıcı: Google Gemini API (ücretsiz katman).
// Gerekli secret (supabase secrets set ile): GEMINI_API_KEY

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const GEMINI_MODEL = "gemini-3.6-flash";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });
}

// Şablonun tonu — CLAUDE.md'deki "Romantik Olmayan Şablonlar" rehberiyle uyumlu.
const TEMPLATE_TONE: Record<string, string> = {
  "tutkulu-gul": "Romantik bir sevgili ilişkisi. Tutkulu, iddialı, 'büyük jest' havasında.",
  "mavi-ruya": "Romantik bir sevgili ilişkisi. Hayalperest, uzak mesafe/kavuşma teması olabilir.",
  "bal-sarisi": "Romantik bir sevgili ilişkisi. Sıcak, samimi, uzun süredir birlikte olan bir çift havası.",
  "zeytin-dali": "Romantik bir sevgili ilişkisi. Sakin, doğal, sade bir dil.",
  "onyx-zarafet": "Romantik bir sevgili ilişkisi. Zarif, şık, gösterişsiz bir lüks hissi.",
  "seftali-tul": "Romantik bir sevgili ilişkisi. Masalsı, hayalperest, tatlı bir dil.",
  "altin-saat": "Romantik bir sevgili ilişkisi. Nostaljik, sinematik, 'ilk'lere değer veren bir ton.",
  "puzzle-aski": "Romantik bir sevgili ilişkisi. Eğlenceli ama içten.",
  "kazi-kazan-surprizi": "Romantik bir sevgili ilişkisi. Sürpriz dolu, eğlenceli ama içten.",
  "hafiza-kartlari": "Romantik bir sevgili ilişkisi. Anılara değer veren, sıcak bir ton.",
  "evlilik-teklifi": "Romantik bir sevgili ilişkisi — evlilik teklifi anı. Heyecanlı, kararlı, derin bir bağlılık ifade eden bir ton.",
  "arkadasima-ozel": "ROMANTİK DEĞİL — samimi bir arkadaşlık. 'Sevgilim/aşkım' gibi ifadeler KESİNLİKLE kullanılmaz, bunun yerine 'dostum', 'iyi ki varsın' gibi arkadaşça ifadeler kullanılır.",
  "tesekkur-ozur": "Romantik olmak ZORUNDA DEĞİL — içten, sade bir teşekkür ya da özür dili. İlişki tipine göre (sevgili/arkadaş/aile/iş arkadaşı) ayarlanmalı, sipariş bilgilerinden ilişki tipini anlamaya çalış.",
  "aile-gunu": "Aile ilişkisi (anne ya da baba). Sıcak, minnettar, nostaljik bir evlat-ebeveyn dili.",
  "mezuniyet": "Gurur ve kutlama — mezuniyet. Romantik olmayan, tebrik ve gurur dolu bir dil (aile/arkadaş/sevgili olabilir).",
  "bebek-duyurusu": "Heyecan ve mutluluk — hamilelik/doğum duyurusu. Sıcak, heyecanlı bir dil.",
  "evcil-hayvan-anisi": "ÖNEMLİ: Kaybedilen bir evcil hayvan için anma mektubu. Dil SAKİN ve TESELLİ EDİCİ olmalı — eğlenceli/şakacı bir ton KESİNLİKLE kullanılmaz.",
  "yeni-is-terfi": "Profesyonel kutlama — yeni iş/terfi. Gurur dolu, enerjik ama samimi bir dil (romantik olmak zorunda değil).",
  "dogum-gunu-solen": "Doğum günü kutlaması. Şenlikli, sıcak bir dil — sevgili, arkadaş ya da aile olabilir, sipariş bilgilerinden anlamaya çalış.",
};

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
    const geminiKey = Deno.env.get("GEMINI_API_KEY");

    if (!geminiKey) {
      return json({ error: "GEMINI_API_KEY secret tanımlı değil (supabase secrets set ile ekle)." }, 500);
    }

    // 1) Admin doğrulaması (deploy-order ile aynı desen).
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

    const { order_id, extra_instructions } = await req.json().catch(() => ({}));
    if (!order_id) return json({ error: "order_id zorunlu." }, 400);

    // 2) Siparişi service_role ile oku.
    const admin = createClient(supabaseUrl, serviceKey);
    const { data: order, error: orderErr } = await admin
      .from("orders")
      .select("*")
      .eq("id", order_id)
      .single();
    if (orderErr || !order) return json({ error: "Sipariş bulunamadı." }, 404);

    const tone = TEMPLATE_TONE[order.template] || "Samimi ve içten bir dil kullan.";

    const prompt = `Sen "Kalpte Saklı" adlı, kişiye özel dijital sürpriz sayfa hazırlayan bir işletmenin metin yazarısın.
Aşağıdaki bilgilerden, gönderen kişinin ağzından, alıcıya hitaben yazılmış SICAK ve SAMİMİ bir mektup taslağı yaz.

ÖNEMLİ KURALLAR:
- Türkçe yaz, günlük konuşma dilinde, "sen" hitabıyla (resmi "siz" değil).
- 3-4 kısa paragraf olsun, paragrafları boş satırla ayır.
- Klişe/yapay zeka kokan ifadelerden kaçın ("kelimeler yetersiz kalıyor", "bu satırları yazarken" gibi başlangıçlardan kaçın — doğrudan, gerçek biri yazmış gibi başla).
- Sadece mektup metnini döndür, başlık ya da açıklama ekleme, tırnak işareti kullanma.
- Ton: ${tone}

Alıcının adı: ${order.partner_name || "İsim belirtilmedi"}
Gönderenin adı: ${order.sender_name || "İsim belirtilmedi"}
${order.special_date_label ? `Özel tarih/vesile: ${order.special_date_label}` : ""}

Müşterinin verdiği ham bilgiler/notlar:
${order.letter || "(bilgi verilmemiş, genel ve sıcak bir mektup yaz)"}

${extra_instructions ? `Ek talimat: ${extra_instructions}` : ""}`;

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${geminiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.9 },
        }),
      },
    );

    const geminiJson = await geminiRes.json();
    if (!geminiRes.ok) {
      return json({ error: `Gemini API hatası: ${geminiJson?.error?.message || geminiRes.statusText}` }, 500);
    }

    const letterText = geminiJson?.candidates?.[0]?.content?.parts
      ?.map((p: { text?: string }) => p.text || "")
      .join("")
      .trim();

    if (!letterText) {
      return json({ error: "Yapay zeka bir metin döndürmedi, tekrar dener misin?" }, 500);
    }

    return json({ letter: letterText });
  } catch (e) {
    return json({ error: `Beklenmeyen hata: ${e instanceof Error ? e.message : String(e)}` }, 500);
  }
});
