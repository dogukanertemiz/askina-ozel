# Aşkına Özel — Proje Rehberi

Bu depo, "Aşkına Özel" kişiye özel sürpriz web sayfası hizmetinin tüm statik
kodunu barındırır: tanıtım sitesi, sipariş formu ve müşteriye teslim edilen
18 şablon. Bu dosya hem teknik/veri modeli tarafını hem de sipariş alma &
teslim sürecini anlatır. Genel yönü ve gelecek adımlar için
[ROADMAP.md](ROADMAP.md) dosyasına bak.

## Klasör Yapısı

```
index.html              → Tanıtım / satış sayfası (anasayfa)
siparis-formu.html       → Statik sipariş formu (backend yok, özet metin üretir)
ROADMAP.md               → Yol haritası (kısa/orta/uzun vadeli adımlar)
CLAUDE.md                → Bu dosya
templates/
  tutkulu-gul.html        → Standart — Bordo/altın
  mavi-ruya.html           → Standart — Pastel lacivert/lavanta
  bal-sarisi.html          → Standart — Sıcak turuncu/şeftali
  zeytin-dali.html         → Standart — Adaçayı yeşili/toprak
  onyx-zarafet.html        → Standart — Siyah/şampanya altını
  seftali-tul.html         → Standart — Açık şeftali/pudra (açık tema)
  altin-saat.html          → Standart — Sinematik altın/siyah, plak çalar & fotoğraflı anı zaman çizelgesi
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

Her şablon **tek başına çalışan, bağımsız bir HTML dosyasıdır** (harici bir
build adımı, framework ya da paylaşılan dosya yoktur). Bu bilinçli bir
tercih: teslim edilen dosya, müşteriye olduğu gibi (tek dosya) gönderilebilir
ya da bir barındırma servisine sürükle-bırak ile yüklenebilir.

## Şablon Kataloğu

| Şablon | Stil | Kime Uygun |
|---|---|---|
| **Tutkulu Gül** | Bordo / altın, iddialı & romantik | Klasik, tutkulu, "büyük jest" isteyen çiftler |
| **Mavi Rüya** | Pastel lacivert/lavanta, hayalperest | Uzak mesafe ilişkiler, "kavuşma" teması |
| **Bal Sarısı** | Sıcak turuncu/şeftali, samimi | Uzun süreli, sıcak/ev gibi hisseden ilişkiler |
| **Zeytin Dalı** | Adaçayı yeşili/toprak, sakin & doğal | Sade zevkli, "doğal" estetik isteyen çiftler |
| **Onyx Zarafet** | Siyah/şampanya altını, modern & lüks | Şık, minimal, "gösterişsiz lüks" isteyen çiftler |
| **Şeftali Tül** | Açık şeftali/pudra, masalsı & hayalperest | Genç, tatlı, "masal" temalı ilişkiler |
| **Altın Saat** | Sinematik siyah/altın, sıcak & nostaljik | Plak çalar ve fotoğraflı "ilk"ler zaman çizelgesi isteyen, sinematik/vintage estetik seven çiftler |

### Romantik Olmayan Şablonlar (Doğum Günü / Arkadaşlık / Diğer)

| Şablon | Stil | Kime Uygun |
|---|---|---|
| **Doğum Günü Şöleni** | Mor/pembe/altın, konfeti & balon dolu, şenlikçi | Herhangi bir yakının (sevgili, arkadaş, aile) doğum günü — üflenebilir interaktif pasta ve çok kişili dilek duvarı içerir |
| **Arkadaşıma Özel** | Turuncu/turkuaz, samimi & eğlenceli | Romantik OLMAYAN, "iyi ki varsın" mesajı vermek isteyen arkadaşlar |
| **Evlilik Teklifi** | Lacivert/şampanya altını, zarif & heyecanlı | Evlenme teklifi anı için — yüzük kutusu açılır, "Hayır" butonu kaçar, ilişki zaman çizelgesi içerir |
| **Teşekkür & Özür** | Sıcak amber/krem, sade & içten | Özür dilemek ya da teşekkür etmek isteyen HERKES için (romantik olmak zorunda değil — aile, arkadaş, iş arkadaşı da olabilir) |
| **Aile Günü** | Sıcak toprak/şeftali, nostaljik & sıcak | Anneler Günü ya da Babalar Günü — polaroid galeri, aile mesaj duvarı (dual-mode: anne/baba) |
| **Mezuniyet** | Lacivert/altın, akademik & gururlu | Mezuniyet kutlaması — diplomayı sürükle-bırak mekaniği, başarı yolculuğu, tebrik duvarı |
| **Bebek Duyurusu** | Nane yeşili/pudra, yumuşak & heyecanlı | Hamilelik duyurusu ya da doğum haberi — şişirilip patlatılan balon mekaniği, opsiyonel geri sayım |
| **Evcil Hayvan Anısı** | Alacakaranlık lavanta/mavi, sakin & teselli edici | Kaybedilen bir evcil hayvanı anmak için — oyun/konfeti YOK, dil bilinçli olarak sade ve tesellı edici |
| **Yeni İş / Terfi** | Petrol yeşili/altın, profesyonel & enerjik | Yeni iş ya da terfi kutlaması — kariyer merdiveni tırmanma mekaniği (sırayla basamaklara tıklama), tebrik duvarı |

Bu şablonlarda dil **romantik değil, samimi/arkadaşça** tutulmalı — mektup
içeriğini toplarken müşteriye bunu hatırlat (ör. "sevgilim" yerine "dostum",
"aşkım" yerine "iyi ki varsın" gibi ifadeler kullanılmalı). Doğum Günü
Şöleni'nde ayrıca birden fazla kişiden (arkadaş grubu, aile) kısa dilek
toplanabilir — bkz. aşağıdaki checklist'teki "Dilek duvarı" maddesi.

### İnteraktif Konsept Şablonlar (Mini Oyunlu — Premium)

Bunlar sadece renk/görsel değil, gerçekten **oynanabilir bir mekanik** içeriyor —
bu yüzden "3 saniyede AI ile yapılır" itirazına karşı en güçlü ürünler. Fiyat
bandı bu yüzden standart şablonlardan daha yüksek tutulabilir (bkz. fiyatlandırma).

| Şablon | Mekanik | Kime Uygun |
|---|---|---|
| **Puzzle Aşkı** | Müşterinin fotoğrafından 3x3 sürgülü yapboz — çözünce mektup açılır | "Efor sarf ettirsin" isteyen, oyunsever çiftler |
| **Kazı Kazan Sürprizi** | Kazınabilir kart — fare/parmakla kazıyınca altındaki mesaj/görsel çıkar | Klasik "kazı kazan" heyecanını sevenler |
| **Hafıza Kartları** | 6 çiftlik hafıza/eşleştirme oyunu — tamamlanınca mektup açılır | Eğlenceli, oyun gecesi temalı çiftler |

**Mekanik çeşitliliği:** Katalogdaki her interaktif/oyunlu şablonun "kapı"
mekaniği **birbirinden farklı olmalı**, aksi halde şablonlar "tekrarlayan"
hissi verir (bu bir kez yaşandı ve düzeltildi). Şu an kullanılan mekanikler:

| Mekanik | Şablon |
|---|---|
| Sürgülü yapboz (3x3) | Puzzle Aşkı |
| Kazıma (canvas) | Kazı Kazan Sürprizi |
| Eşleştirme (hafıza kartları) | Hafıza Kartları |
| Çoklu elemanı sırasız söndürme (mumlar) | Doğum Günü Şöleni |
| Kaçan buton + karar (evet/hayır) | Evlilik Teklifi |
| Sürükle-bırak | Mezuniyet |
| Tekrarlayan tıklama / şişirme | Bebek Duyurusu |
| Sıralı tırmanma (adım adım) | Yeni İş / Terfi |

Yeni bir interaktif şablon eklerken bu tablodaki mekaniklerden **birini
tekrar etme** — listede olmayan yeni bir etkileşim türü bul (ör. sürükleyerek
kaydırma, çevirme/rotate, sesli komut, zamanlayıcı yarışı vb.), ve hem bu
tabloya hem de aşağıdaki Veri Modeli tablosuna ekleme yapmayı unutma.

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
| Altın Saat | `memories` | "İlk"lerinizden 3-5 tanesi: `{date, title, photo}` dizisi (küçük fotoğraf + başlık + tarih, plak çalar bölümünün üstünde ayrı bir zaman çizelgesi olarak gösterilir) |
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

## Sipariş Alırken Toplanacak Bilgiler (Checklist)

Müşteriden şunları iste (form ya da DM üzerinden):

1. **Hangi şablon** istiyor (18 şablondan biri, ya da "sen seç" derse ilişki
   tanımına göre öner — sevgili için romantik şablonlardan biri, arkadaş için
   "Arkadaşıma Özel", doğum günü için "Doğum Günü Şöleni")
2. **İlişki tipi** (sevgili / arkadaş / aile — mektubun dilini belirler:
   romantik şablonlarda "aşkım" gibi ifadeler, Arkadaşıma Özel'de "dostum"
   gibi samimi ifadeler kullanılır)
3. **Partnerin/arkadaşın/kutlanan kişinin adı** (sayfada hitap edilecek isim)
4. **Sipariş vereninin adı** (imza/gönderen olarak)
5. **Özel tarih** (yıldönümü, buluşma, doğum günü vs. — geri sayım için)
6. **3-5 fotoğraf** (galeri için — yoksa placeholder ile teslim edip sonra
   müşterinin kendi eklemesi istenebilir)
7. **Mesaj/mektup içeriği** — ya müşteri kendi yazsın ya da "şunları anlat: nasıl
   tanıştık, en sevdiğim özelliği, ona ne hissettiriyor" gibi 3-4 madde versin,
   ben bunlardan akıcı bir mektup yazarım
8. **Şarkı adı ve sanatçı** (Spotify linki varsa onu da iste)
9. **Şablona özel ek bilgiler** (opsiyonel):
   - Doğum Günü Şöleni / Bebek Duyurusu → **dilek duvarı**: birden fazla
     kişiden (arkadaş grubu, aile) kısa mesaj, her biri isim + mesaj olarak
   - Evlilik Teklifi → **ilişki zaman çizelgesi**: 3-5 önemli an, her biri
     başlık + kısa açıklama olarak (ör. "İlk Tanıştığımız Gün: ...")
   - Teşekkür & Özür → **özür mü teşekkür mü** olduğu + 3-6 kısa neden maddesi
   - Aile Günü → **anne mi baba mı** olduğu
   - Mezuniyet / Yeni İş-Terfi → **tebrik duvarı** (isim + mesaj) ve varsa
     **yolculuk/kariyer zaman çizelgesi** (başlık + açıklama)
   - Evcil Hayvan Anısı → **birlikte geçirilen süre** (ör. "7 Yıl") — bu
     şablonda dil sakin ve tesellı edici tutulmalı, oyun/konfeti kullanılmaz
10. **Teslim tarihi/aciliyet** (aynı gün mü, 24 saat mi)

## Bir Siparişi Doldurma Adımları

1. Yukarıdaki checklist ile bilgileri topla (ya da `siparis-formu.html`'in
   ürettiği özet metni kullan). Bana şu formatta ilet: *"[Şablon adı] ile
   sipariş: partner adı X, gönderen Y, tarih Z, fotoğraflar [ekli/açıklama],
   mektup: [madde madde ya da tam metin], şarkı: [isim - sanatçı]"*
2. İlgili `templates/*.html` dosyasını aç.
3. `<script>` içindeki `CONFIG` nesnesini, yukarıdaki Veri Modeli tablosuna
   göre doldur. HTML/CSS'e dokunma — tüm içerik `CONFIG`'ten JS ile enjekte
   edilir. İnteraktif şablonlarda ayrıca JS içindeki `PUZZLE_IMAGE`, kazı
   kazan altındaki görsel/mesaj, ve hafıza kartlarındaki `SYMBOLS` dizisi de
   müşteriye göre güncellenir.
4. Fotoğraf URL'lerini müşterinin gönderdiği görsellerle değiştir (şimdilik
   `picsum.photos` placeholder kullanılıyor).
5. Dosyayı hızlıca gözden geçir (isim/tarih doğru mu), gerekiyorsa Vercel/
   Netlify'a sürükle-bırak ile yükle ya da doğrudan HTML dosyasını müşteriye
   gönder.
6. Linki/dosyayı müşteriye teslim et.

## Fiyatlandırma (hatırlatma)

- Başlangıç: 799 TL — hazır şablon, 1 galeri, geri sayım, 1 şarkı
- Premium: 1.299 TL — sınırsız revizyon, video arka plan seçeneği
- VIP: 1.899 TL — öncelikli aynı gün teslim + sesli mesaj/animasyon eklentisi
- **Oyunlu (Puzzle / Kazı Kazan / Hafıza Kartları): 1.599-2.199 TL** — gerçek bir
  mekanik içerdiği ve kolayca kopyalanamadığı için standart şablonlardan daha
  yüksek fiyatlandırılır; içerik pazarlamasında "bu sadece bir görsel değil,
  gerçek bir oyun" vurgusu öne çıkarılmalı
- **Doğum Günü Şöleni** ve **Arkadaşıma Özel**, standart Başlangıç/Premium/VIP
  fiyatlandırmasına dahildir (Doğum Günü Şöleni'ndeki üflenebilir pasta ve
  konfeti efekti bonus bir dokunuş olarak sunulur, ayrı ücretlendirilmez)

## Tanıtım Sitesi ve Sipariş Formu

- `index.html`: Şablon kataloğu `TEMPLATES` dizisi (dosyanın sonundaki
  `<script>` içinde) üzerinden otomatik render edilir. **Yeni bir şablon
  eklediğinde hem bu diziye hem de yukarıdaki Şablon Kataloğu tablolarına
  ekleme yapmayı unutma.**
- `siparis-formu.html`: Backend'i yok — müşteri formu doldurunca, JS bir
  özet metni üretir (yukarıdaki checklist ile birebir uyumlu format) ve
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
  (bkz. yukarıdaki Şablon Kataloğu tablosundaki stil açıklamaları).

## Notlar

- Fotoğraflar için şimdilik picsum.photos placeholder kullanılıyor — gerçek
  siparişte müşterinin gönderdiği fotoğraflarla değiştirilecek
- Şablonlara yeni tema eklemek istersen bu dosyaya (Klasör Yapısı, Şablon
  Kataloğu, Veri Modeli tabloları) ekleme yapmayı unutma, böylece süreç
  güncel kalır
- İleride otomasyona (form + veritabanı + otomatik üretim) geçilecekse bu
  dosyadaki veri modeli zaten hazır — detaylı plan için [ROADMAP.md](ROADMAP.md)
