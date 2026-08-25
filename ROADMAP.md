# Aşkına Özel — Yol Haritası

Bu dosya, projenin mevcut durumunu ve olası sonraki adımlarını özetler.
Teknik/veri modeli detayları ve sipariş alma & teslim süreci için
[CLAUDE.md](CLAUDE.md) dosyasına bakabilirsin.

## Mevcut Durum (Ağustos 2026)

- ✅ Tanıtım sitesi (`index.html`) — şablon kataloğu otomatik render ediliyor
- ✅ Statik sipariş formu (`siparis-formu.html`) — backend yok, özet metin üretiyor
- ✅ 18 teslim şablonu (`templates/`): 7 standart, 3 interaktif (yapboz, kazı
  kazan, hafıza kartları), + doğum günü, arkadaşlık, evlilik teklifi,
  teşekkür/özür, aile günü, mezuniyet, bebek duyurusu, evcil hayvan anısı,
  yeni iş/terfi
- ⚠️ Depo henüz Git ile izlenmiyor / GitHub'a bağlı değil
- ⚠️ İletişim bilgileri (`index.html` footer, `siparis-formu.html` içindeki
  `BUSINESS` nesnesi) hâlâ placeholder
- ⚠️ Fotoğraflar `picsum.photos` placeholder — gerçek teslimlerde elle
  değiştiriliyor

## Kısa Vadeli (1-2 hafta)

1. **Repoyu Git'e bağla, GitHub'a push et** (bu görevin ikinci parçası —
   aşağıdaki "GitHub Bağlantısı" bölümüne bak)
2. **İletişim bilgilerini gerçek verilerle doldur** — `index.html` footer'ı
   ve `siparis-formu.html` sonundaki `BUSINESS.whatsapp` / `BUSINESS.email`
   (her ikisi de `DEĞİŞTİR:` yorumuyla işaretli)
3. **`.gitignore` ekle** — `.DS_Store`, editör/OS dosyaları için
4. **Temel SEO/meta etiketleri** — `index.html`'e Open Graph görseli,
   `<meta description>`, favicon ekle (şu an muhtemelen eksik/varsayılan)
5. **Örnek/demo linki** — `index.html`'de her şablon kartına, placeholder
   verilerle doldurulmuş canlı bir demo linki eklemek dönüşüm oranını artırır

## Orta Vadeli (1-2 ay)

1. **Sipariş formunu otomasyona bağla** — form gönderiminde otomatik
   WhatsApp/e-posta yerine (isteğe bağlı) basit bir backend/servis
   (örn. Formspree, Google Sheets webhook, ya da hafif bir Vercel
   function) ile siparişleri bir yerde biriktir
2. **Ödeme entegrasyonu** — iyzico/Stripe gibi bir sağlayıcı ile ön ödeme
   alma akışı (şu an tamamen manuel/DM üzerinden)
3. **Yeni interaktif şablon** — `CLAUDE.md`'deki mekanik tablosunda henüz
   kullanılmayan bir etkileşim türü (çevirme/rotate, sesli komut,
   zamanlayıcı yarışı vb.)
4. **Analytics** — `index.html`'e gizlilik dostu bir analytics (Plausible,
   Fathom vb.) ekleyerek hangi şablonların daha çok ilgi gördüğünü ölç
5. **Testler / lint** — HTML şablonlarında `CONFIG` alanlarının eksik
   bırakılmadığını kontrol eden basit bir script (`DEĞİŞTİR:` kalıntısı
   kalmış mı diye tarayan bir CI adımı)

## Uzun Vadeli (3+ ay)

1. **Veritabanı temelli otomatik üretim** — `CLAUDE.md`'de tanımlı `pages`
   şemasını gerçek bir veritabanına (Supabase/Postgres) taşıyıp, sipariş
   formundan gelen veriyi otomatik olarak bir şablona enjekte eden bir
   üretim hattı kur (şu an bu adım elle yapılıyor)
2. **Müşteri paneli** — müşterinin kendi fotoğraf/mektup içeriğini
   yükleyip önizleyebileceği basit bir arayüz
3. **Çoklu dil desteği** — İngilizce pazar için şablonların İngilizce
   versiyonu
4. **Performans** — şablonlardaki inline CSS/JS büyüklüğünü ölç, gerekirse
   görselleri lazy-load ve modern format (WebP/AVIF) ile optimize et
5. **Şablon sayısını genişletme** — mevsimsel/özel gün temaları (Sevgililer
   Günü, Yılbaşı vb.) için sınırlı süreli yeni şablonlar

## GitHub Bağlantısı

Bu ortamda Git komut satırı aracı çalışmıyor (Xcode Command Line Tools
kurulu değil), bu yüzden repoyu buradan doğrudan push edemedim — aşağıdaki
adımları kendi terminalinde çalıştırman gerekiyor. Detaylar için sohbetteki
son mesaja bak.
