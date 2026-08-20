# Aşkına Özel — Proje Rehberi

Bu depo, "Aşkına Özel" kişiye özel sürpriz web sayfası hizmetinin tüm statik
kodunu barındırır: tanıtım sitesi, sipariş formu ve müşteriye teslim edilen
9 şablon. Sipariş alma süreci için [SIPARIS-SURECI.md](SIPARIS-SURECI.md)
dosyasına bak — bu dosya teknik/veri modeli tarafını anlatır.

## Klasör Yapısı

```
index.html              → Tanıtım / satış sayfası (anasayfa)
siparis-formu.html       → Statik sipariş formu (backend yok, özet metin üretir)
SIPARIS-SURECI.md        → Sipariş alma & teslim süreci rehberi
CLAUDE.md                → Bu dosya
templates/
  tutkulu-gul.html        → Standart — Bordo/altın
  mavi-ruya.html           → Standart — Pastel lacivert/lavanta
  bal-sarisi.html          → Standart — Sıcak turuncu/şeftali
  zeytin-dali.html         → Standart — Adaçayı yeşili/toprak
  onyx-zarafet.html        → Standart — Siyah/şampanya altını
  seftali-tul.html         → Standart — Açık şeftali/pudra (açık tema)
  puzzle-aski.html         → İnteraktif — 3x3 sürgülü yapboz
  kazi-kazan-surprizi.html → İnteraktif — Kazınabilir kart
  hafiza-kartlari.html     → İnteraktif — Hafıza/eşleştirme oyunu
  dogum-gunu-solen.html    → Doğum Günü — Üflenebilir pasta, konfeti, dilek duvarı
  arkadasima-ozel.html     → Arkadaşlık — Romantik olmayan, samimi ton
  evlilik-teklifi.html     → İnteraktif — Yüzük kutusu, kaçan "Hayır" butonu
  tesekkur-ozur.html       → Diğer — Özür/teşekkür (dual-mode, romantik olmak zorunda değil)
  aile-gunu.html           → Diğer — Anneler/Babalar Günü (dual-mode)
  mezuniyet.html           → Diğer — Diplomayı sürükle-bırak, başarı yolculuğu
  bebek-duyurusu.html      → Diğer — Balonu şişir & patlat, hamilelik/doğum duyurusu
  evcil-hayvan-anisi.html  → Diğer — Sakin anı sayfası (oyun/konfeti yok)
  yeni-is-terfi.html       → Diğer — Kariyer merdiveni tırmanma, kariyer kutlaması
```

**Mekanik çeşitliliği:** her interaktif şablonun kapı mekaniği birbirinden
farklı tutulur (yapboz, kazıma, eşleştirme, mum söndürme, kaçan buton,
sürükle-bırak, şişirme, sıralı tırmanma) — yeni bir interaktif şablon
eklerken bu listede olmayan bir mekanik seç, bkz. `SIPARIS-SURECI.md`.

Her şablon **tek başına çalışan, bağımsız bir HTML dosyasıdır** (harici bir
build adımı, framework ya da paylaşılan dosya yoktur). Bu bilinçli bir
tercih: teslim edilen dosya, müşteriye olduğu gibi (tek dosya) gönderilebilir
ya da bir barındırma servisine sürükle-bırak ile yüklenebilir.

## Veri Modeli ("pages" tablosu)

Her şablonun `<script>` bloğunun başında, `DEĞİŞTİR:` yorumlarıyla işaretli
bir `CONFIG` nesnesi var. Bir siparişi doldurmak = bu nesneyi doldurmaktan
ibaret; HTML/CSS'nin geri kalanına dokunmaya gerek yok.

Gelecekte bir veritabanına geçilirse, `pages` tablosunun şeması aşağıdaki
gibi düşünülebilir — tüm şablonlardaki `CONFIG` nesnesi bu şemayla birebir
uyumludur:

| Alan | Tip | Açıklama |
|---|---|---|
| `id` | string | Sipariş/sayfa kimliği |
| `template` | enum | Şablon dosya adı (örn. `tutkulu-gul`) |
| `partnerName` | string | Sayfada hitap edilecek isim |
| `senderName` | string | İmza / gönderen adı |
| `signatureDate` | string (opsiyonel) | İmza altı tarih; boşsa bugünün tarihi kullanılır |
| `specialDate` | ISO datetime | Geri sayım hedef tarihi |
| `specialDateLabel` | string | Gelecek tarih için geri sayım etiketi |
| `countUpLabel` | string | Geçmiş tarih için "birlikte geçen gün" etiketi |
| `photos` | string[] | 3-5 fotoğraf URL'si (galeri) |
| `letter` | string | Mektup metni (paragraflar boş satırla ayrılır) |
| `songName` | string | Şarkı adı |
| `songArtist` | string | Sanatçı adı |
| `spotifyEmbedUrl` | string (opsiyonel) | `open.spotify.com/embed/track/...` linki |

İnteraktif şablonlarda ek alanlar:

| Şablon | Ek alan | Açıklama |
|---|---|---|
| Puzzle Aşkı | `PUZZLE_IMAGE` | Yapbozda kullanılacak **kare** (1:1) fotoğraf |
| Kazı Kazan Sürprizi | `scratchImage`, `scratchMessage` | Kartın altından çıkacak görsel ve kısa mesaj |
| Hafıza Kartları | `SYMBOLS` | 6 elemanlı emoji/sembol dizisi (12 karta çoğaltılır) |
| Doğum Günü Şöleni | `age`, `candleCount`, `wishes` | `age` opsiyonel yaş rozeti; `candleCount` üflenecek mum sayısı (görsel); `wishes` birden fazla kişiden `{name, message}` dilek listesi |
| Evlilik Teklifi | `milestones` | İlişki zaman çizelgesi: `{date, text}` dizisi (3-5 önemli an) |
| Teşekkür & Özür | `pageType`, `customTitle`, `customSubtitle`, `reasons` | `pageType`: `"ozur"` ya da `"tesekkur"` — başlık/alt metin/footer otomatik ayarlanır; `reasons` 3-6 kısa madde; `photos` ve şarkı alanları bu şablonda opsiyoneldir (boşsa ilgili bölüm gizlenir) |
| Aile Günü | `pageType`, `reasons`, `familyWishes` | `pageType`: `"anne"` ya da `"baba"`; `reasons` = "senden öğrendiklerim" maddeleri; `familyWishes` opsiyonel aile mesaj duvarı |
| Mezuniyet | `degree`, `milestones`, `wishes` | `degree` opsiyonel rozet metni; `milestones` başarı yolculuğu; `wishes` tebrik duvarı |
| Bebek Duyurusu | `revealType`, `revealColor`, `parentNames`, `babyName`, `dueDate`, `wishes` | `revealType`: `"bekliyoruz"` (geri sayım gösterilir) ya da `"dogdu"`; `revealColor` kutu açılışındaki konfeti rengi (`pink`/`blue`/`neutral`) |
| Evcil Hayvan Anısı | `yearsTogether` | Opsiyonel "X Yıl Birlikteydik" rozeti; bu şablonda oyun/konfeti YOKTUR, dil sakin ve tesellı edici tutulmalıdır |
| Yeni İş / Terfi | `role`, `milestones`, `wishes` | `role` opsiyonel rozet metni (ör. unvan); `milestones` ve `wishes` opsiyonel, boşsa ilgili bölüm gizlenir |

### Romantik Olmayan Şablonlar

`Doğum Günü Şöleni`, `Arkadaşıma Özel`, `Teşekkür & Özür`, `Aile Günü`,
`Mezuniyet`, `Bebek Duyurusu`, `Evcil Hayvan Anısı` ve `Yeni İş / Terfi`,
aynı `CONFIG` şemasını kullanır ancak **mektup dili romantik olmamalı**.
Sipariş bilgisi toplarken ilişki tipini (sevgili/arkadaş/aile/iş arkadaşı)
netleştir — bu, `letter` alanının ve `heroSubtitle`/`senderName` gibi
alanların tonunu belirler. `Evlilik Teklifi` her zaman romantiktir, ekstra
olarak `milestones` (ilişki zaman çizelgesi) gerektirir. `Evcil Hayvan
Anısı` özellikle hassas bir şablondur — oyun mekaniği ya da konfeti
kullanılmaz, ton her zaman sakin ve tesellı edici tutulmalıdır.

## Bir Siparişi Doldurma Adımları

1. [SIPARIS-SURECI.md](SIPARIS-SURECI.md)'deki checklist ile bilgileri topla
   (ya da `siparis-formu.html`'in ürettiği özet metni kullan).
2. İlgili `templates/*.html` dosyasını aç.
3. `<script>` içindeki `CONFIG` nesnesini, yukarıdaki tabloya göre doldur.
   HTML/CSS'e dokunma — tüm içerik `CONFIG`'ten JS ile enjekte edilir.
4. Fotoğraf URL'lerini müşterinin gönderdiği görsellerle değiştir (şimdilik
   `picsum.photos` placeholder kullanılıyor).
5. Dosyayı olduğu gibi teslim et ya da Vercel/Netlify'a sürükle-bırak ile
   yükle.

## Tanıtım Sitesi ve Sipariş Formu

- `index.html`: Şablon kataloğu `TEMPLATES` dizisi (dosyanın sonundaki
  `<script>` içinde) üzerinden otomatik render edilir. **Yeni bir şablon
  eklediğinde hem bu diziye hem de `SIPARIS-SURECI.md`'deki tabloya
  ekleme yapmayı unutma.**
- `siparis-formu.html`: Backend'i yok — müşteri formu doldurunca, JS bir
  özet metni üretir (SIPARIS-SURECI.md'deki formatla birebir uyumlu) ve
  WhatsApp/e-posta linkleriyle gönderilmesini sağlar. `BUSINESS.whatsapp`
  ve `BUSINESS.email` değerlerini gerçek bilgilerle güncelle
  (`siparis-formu.html` dosyasının sonundaki `<script>` bloğunda,
  `DEĞİŞTİR:` yorumuyla işaretli).
- `index.html` footer'ındaki iletişim linkleri de aynı şekilde
  `DEĞİŞTİR:` yorumuyla işaretli placeholder'lardır.

## Tasarım Notları

- Tüm sayfalar tek dosyalık, bağımsız HTML'dir (inline CSS/JS, sadece
  Google Fonts harici bağımlıdır).
- Standart şablonlarda ortak yapı: zarf açma animasyonu → hero → geri
  sayım → galeri (lightbox'lı) → mektup (scroll'da beliren) → şarkı
  (Spotify embed opsiyonel) → imza → footer.
- İnteraktif şablonlarda (Puzzle Aşkı, Kazı Kazan Sürprizi, Hafıza Kartları,
  Doğum Günü Şöleni) zarf yerine oyun mekaniği "kapı" görevi görür; oyun
  tamamlanınca aynı yapı (hero → ... → footer) açılır. Arkadaşıma Özel'de
  zarf yerine hediye kutusu animasyonu kullanılır.
- Her şablonun kendine özgü bir renk paleti ve font kombinasyonu vardır
  (bkz. `SIPARIS-SURECI.md` tablosundaki stil açıklamaları).
