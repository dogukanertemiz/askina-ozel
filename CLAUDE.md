# Kalpte Saklı — Proje Rehberi

Bu depo, "Kalpte Saklı" kişiye özel sürpriz web sayfası hizmetinin tüm statik
kodunu barındırır: tanıtım sitesi, sipariş formu ve müşteriye teslim edilen
19 şablon. Bu dosya hem teknik/veri modeli tarafını hem de sipariş alma &
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
| `timeCapsuleDate` | ISO datetime (opsiyonel) | Bu tarih gelince `timeCapsuleMessage` otomatik açılır ("anı kutusu") |
| `timeCapsuleMessage` | string (opsiyonel) | `timeCapsuleDate` ile birlikte kullanılan, o tarihte ortaya çıkan gizli mesaj |

Bu iki alan **tüm 19 şablonda ortak** olarak bulunur (standart, interaktif, dual-mode
fark etmeksizin) — her şablonun footer'ından hemen önce bir kapsül alanı vardır.
Ayrıca her şablonun footer'ının altında, sipariş formundan bağımsız, otomatik gelen
iki özellik daha var: **ziyaret sayacı**
("Bu sayfayı X. kez açıyorsun ♡", localStorage tabanlı, tarayıcıya özel) ve **"QR Kodu
Göster" / "Linki Kopyala"** butonları (QR kodu `api.qrserver.com` üzerinden üretilir —
projedeki "yalnızca Google Fonts harici bağımlı" kuralının bilinçli istisnalarından
biridir — diğeri Supabase, bkz. aşağıdaki "Backend & Admin Paneli" bölümü — API
anahtarı gerektirmez ve sayfa içeriğini üçüncü tarafa göndermez, sadece görsel
üretimi için URL'yi kullanır).

**Anı kutusu — ton uyumu:** Alan teknik olarak her şablonda çalışsa da,
"gizli bir mesaj otomatik açılır" çerçevesi her şablonun tonuna uymayabilir.
**Evcil Hayvan Anısı**'nda (bilinçli olarak sakin/tesellı edici, sürpriz
mekaniği yok) ve **Teşekkür & Özür**'ün "özür" modunda bu alanı boş bırak —
gecikmeli bir "sürpriz" o bağlamda yersiz kaçar. Diğer şablonlarda
(özellikle romantik ve kutlama temalı olanlarda) rahatça kullanılabilir.

### Erişim kilidi (opsiyonel — tüm şablonlarda ortak)

| Alan | Tip | Açıklama |
|---|---|---|
| `accessType` | enum (opsiyonel) | `null` \| `"tarih"` \| `"sifre"` \| `"pin"` — doluysa sayfa açılmadan önce tam ekran bir "erişim kilidi" gösterilir |
| `accessQuestion` | string (opsiyonel) | Kilit ekranında cevap alanının üstünde gösterilen ipucu/soru metni (ör. "İlk Kahve Tarihimiz", "En Sevdiğim Renk", "Doğum Yılım") — hangi tip seçildiyse ona uygun bir ipucu yazılmalı |
| `accessDate` | string (opsiyonel) | `accessType` "tarih" ise doğru cevap (`YYYY-MM-DD`) — çevirmeli gün / ay (yazıyla, ör. "Mayıs") / yıl seçiciyle karşılaştırılır |
| `accessPassword` | string (opsiyonel) | `accessType` "sifre" ise doğru cevap — düz metin, büyük/küçük harf farketmez |
| `accessPin` | string (opsiyonel) | `accessType` "pin" ise doğru cevap — 4 haneli rakam, ayrı kutulu bir PIN girişiyle karşılaştırılır |

Sayfa yüklenir yüklenmez (envelope/oyun mekaniğinden bile önce) tam ekran bir
kilit ekranı çıkar; doğru cevap girilene kadar arkadaki içerik görülemez/scroll
edilemez (`document.documentElement.style.overflow` kilitlenir). Doğru cevap
girilince kilit `sessionStorage`'a yazılır — aynı tarayıcı sekmesinde tekrar
sorulmaz, ama yeni bir ziyarette (yeni sekme/tarayıcı) tekrar sorulur. `accessType`
boş/`null` bırakılırsa (varsayılan) kilit ekranı hiç render edilmez, sayfa eskisi
gibi direkt açılır — geriye dönük tamamen uyumlu. Sipariş formunda "Erişim
kilidi" bölümünde toplanır (adım 7, Ekstra Dokunuşlar), `orders` tablosunda
`access_type` / `access_question` / `access_date` / `access_password` /
`access_pin` kolonlarına, admin panelinde sipariş detayının "Erişim Kilidi"
satırına yazılır (cevap **sadece admin panelinde**, WhatsApp özet metnine
bilerek eklenmez — sırrı kazara müşteriye iletmemek için).

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

1. **Hangi şablon** istiyor (19 şablondan biri, ya da "sen seç" derse ilişki
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

- Başlangıç: 200 TL — hazır şablon (7 stilden biri), 1 galeri, geri sayım, 1 şarkı
- **İnteraktif: 300 TL** — Puzzle Aşkı / Kazı Kazan Sürprizi / Hafıza Kartları
  arasından biri; gerçek bir mekanik içerdiği ve kolayca kopyalanamadığı için
  Başlangıç'tan daha yüksek fiyatlandırılır; içerik pazarlamasında "bu sadece
  bir görsel değil, gerçek bir oyun" vurgusu öne çıkarılmalı. Sipariş formunda
  1. adımda bu 3 şablondan biri seçilirse, 2. adımda "Başlangıç (200 TL)"
  seçeneği otomatik devre dışı kalır (`syncPackageToTemplate()`) — aksi halde
  müşteri interaktif bir şablonu Başlangıç fiyatına alabilirdi.
- Özel Tasarım: 500 TL — sınırsız revizyon, öncelikli/aynı gün teslim. Sipariş
  formunda "Aynı gün / acil" teslim seçeneği, 2. adımda Özel Tasarım paketi
  seçilmediği sürece devre dışıdır (`syncUrgencyToPackage()`) — aksi halde
  herkes ekstra ücret ödemeden en hızlı teslimi seçebilirdi.
- Anı kutusu (`timeCapsuleDate` / `timeCapsuleMessage`) ücretsizdir, tüm
  paketlere dahildir.
- **Doğum Günü Şöleni** ve **Arkadaşıma Özel**, standart Başlangıç/Özel Tasarım
  fiyatlandırmasına dahildir (Doğum Günü Şöleni'ndeki üflenebilir pasta ve
  konfeti efekti bonus bir dokunuş olarak sunulur, ayrı ücretlendirilmez)

## Tanıtım Sitesi ve Sipariş Formu

- `index.html`: Şablon kataloğu `TEMPLATES` dizisi (dosyanın sonundaki
  `<script>` içinde) üzerinden otomatik render edilir. **Yeni bir şablon
  eklediğinde hem bu diziye hem de yukarıdaki Şablon Kataloğu tablolarına
  ekleme yapmayı unutma.**
- `siparis-formu.html`: Müşteri formu doldurup **"Özeti Oluştur"**a basınca,
  JS bir özet metni üretir ve `resultCard`'ı gösterir — ama sipariş bu
  aşamada **henüz veritabanına kaydedilmez**. Müşteri özeti gözden geçirip
  **"✓ Siparişi Onayla"** butonuna basınca `saveOrderToDatabase()` çağrılır
  ve sipariş gerçekten oluşur (admin panelinde ancak o zaman görünür). Bu
  bilinçli bir onay adımı — yanlışlıkla ya da bilgi kontrol edilmeden
  sipariş oluşmasın diye. Onaylandıktan (ya da kayıt hata verdiğinde) sonra
  "Metni Kopyala" / "E-posta ile Gönder" butonları ve altında bir "bir bilgini
  yanlış girdiysen bize ulaş" iletişim notu (WhatsApp + e-posta linki) açılır
  — bilinçli olarak "WhatsApp ile Gönder" diye ayrı bir aksiyon butonu YOK,
  WhatsApp sadece düzeltme/iletişim kanalı olarak sunuluyor (sipariş zaten
  onaylayınca otomatik kaydediliyor). `BUSINESS.whatsapp` ve
  `BUSINESS.email` değerlerini gerçek bilgilerle güncelle (`siparis-formu.html`
  dosyasının sonundaki `<script>` bloğunda, `DEĞİŞTİR:` yorumuyla işaretli).
- `index.html` footer'ındaki iletişim linkleri de aynı şekilde
  `DEĞİŞTİR:` yorumuyla işaretli placeholder'lardır.

## Alan Adı (Domain)

Site artık kendi alan adında yayında: **`kalptesakli.com.tr`** (Natro'dan
alındı, düz Latin harfleriyle — Türkçe "ı" içeren `kalptesaklı.com.tr`
varyasyonu Punycode kodlamasına (`xn--kalptesakl-6ub.com.tr`) çevrildiği
için farklı bir domain sayılıyor ve karışıklığa yol açtığından
kullanılmıyor). DNS yönetimi Natro üzerinde değil (Natro'da hosting
hizmeti olmadan DNS Zone Editor'e erişilemiyor), **ücretsiz Cloudflare**
hesabı üzerinden yapılıyor:

- Natro'daki "DNS Değiştir" ekranından nameserver'lar Cloudflare'e
  (`donna.ns.cloudflare.com` / `rocky.ns.cloudflare.com`) yönlendirildi.
- Cloudflare DNS kayıtları: `@` → A → `76.76.21.21` (Vercel), `www` → CNAME
  → `cname.vercel-dns.com` — ikisi de **Proxied** (turuncu bulut, Cloudflare
  CDN/SSL katmanı aktif).
- Domain, Vercel'deki `askina-ozel` projesine custom domain olarak eklendi
  (`kalptesakli.com.tr` + `www.kalptesakli.com.tr`, www → apex redirect).
- **`askina-ozel.vercel.app` hâlâ çalışıyor ve dahili olarak kullanılıyor**
  — `deploy-order` Edge Function'ı şablonları oradan çekiyor (bkz. aşağıdaki
  `TEMPLATE_SITE_BASE`), müşteriye giden ana site linki artık
  `kalptesakli.com.tr` olmalı.

## Backend & Admin Paneli (Supabase)

Proje artık tamamen statik değil — gerçek dosya yükleme ve kalıcı sipariş
kaydı için **Supabase** (Postgres + Storage + Auth) kullanılıyor. Bu,
"yalnızca Google Fonts harici bağımlı" kuralının bilinçli istisnasıdır
(bkz. `@supabase/supabase-js` CDN script'i, `siparis-formu.html` ve
`admin.html`'de).

- **Proje**: `xbugzmxcdjdnqikdoelb` (Supabase org: "Kalpte Saklı", bölge:
  eu-central-1). Panel: `https://supabase.com/dashboard/project/xbugzmxcdjdnqikdoelb`
- **`orders` tablosu** — her sipariş bir satır: şablon, paket, fiyat, kişi
  bilgileri, mektup, fotoğraf yolları, şablona özel bilgiler (jsonb), anı
  kutusu, iletişim, `status` (yeni/hazırlanıyor/teslim edildi), `paid`
  (ödendi mi — **elle işaretlenir**, gerçek bir ödeme entegrasyonu şu an
  yok), `admin_note` (dahili not).
- **`order-photos` storage bucket'ı** — private (public değil); her
  siparişin fotoğrafları `{orderId}/{dosyaAdı}` yolunda saklanır.
- **Güvenlik (RLS)**: `orders` tablosuna herkes INSERT yapabilir (sipariş
  formu), ama **sadece giriş yapmış (authenticated) kullanıcı** SELECT/UPDATE
  yapabilir — yani siparişleri ve ciroyu sadece admin panelinden giriş
  yapan görebilir. Aynı mantık `order-photos` için de geçerli.
  ⚠️ **Önemli platform notu**: Bu projede `orders` tablosuna doğrudan
  `anon` rolüyle REST üzerinden INSERT denemesi, RLS politikası doğru
  kurulmuş olsa bile PostgREST/gateway katmanında sebebi belirsiz şekilde
  reddediliyordu (fotoğraf yüklemede bu sorun yok). Bu yüzden sipariş
  oluşturma, `public.create_order(jsonb)` adlı bir **`SECURITY DEFINER`
  RPC fonksiyonu** üzerinden yapılıyor — client `sb.rpc('create_order', ...)`
  çağırıyor, tabloya doğrudan `insert()` çağırmıyor. Yeni bir alan eklersen
  hem `orders` tablosuna hem bu RPC fonksiyonuna eklemen gerekir.
- **Admin girişi**: E-posta + şifre (`admin.html`). Giriş ekranında alan
  "Kullanıcı adı" olarak gösteriliyor — `admin` yazılırsa `resolveLoginEmail()`
  bunu arka planda gerçek e-postaya (`kalptesakli0@gmail.com`) çeviriyor,
  Supabase Auth'a hep gerçek e-posta gidiyor (Supabase e-posta olmayan bir
  "kullanıcı adı" ile kullanıcı oluşturmaya izin vermiyor, bu yüzden gerçek
  e-posta backend'de aynı kalıp sadece arayüzde basitleştirildi). Gerçek
  e-postayı doğrudan yazmak da hâlâ çalışır. Sadece önceden Supabase
  Auth'ta oluşturulmuş tek bir kullanıcı (`kalptesakli0@gmail.com`) giriş
  yapabilir; proje genelinde yeni kullanıcı kaydı kapalı
  (`disable_signup: true`) — başka biri kayıt olmaya çalışsa bile hesap
  oluşmaz. "Şifremi unuttum" linki Supabase'in e-posta servisi üzerinden bir
  sıfırlama linki gönderir (bu servis ücretsiz katmanda yavaş/güvenilmez
  olabilir — magic link girişinin ilk denemede terk edilme sebebi buydu).
  Yeni bir admin eklemek/e-postayı ya da şifreyi değiştirmek için Supabase
  panelinden Authentication → Users'a git.
  - Yönetici erişimi olan anahtarlar (**access token**, **service_role
    key**, **db şifresi**) hiçbir dosyada saklanmıyor — sadece kurulum
    sırasında kullanıldı. Gerekirse Supabase panelinden yenilenebilir/iptal
    edilebilir.
- **Ciro**: Admin panelindeki "Toplam Ciro" rakamı, `paid = true` işaretli
  siparişlerin `package_price` toplamıdır — gerçek bir ödeme ağ geçidine
  bağlı değildir (ödeme hâlâ WhatsApp/elden alınıyor, admin panelinden elle
  "Ödendi" işaretlenir). İleride iyzico gibi gerçek bir ödeme sağlayıcısı
  bağlanırsa, bu alan otomatik güncellenecek şekilde değiştirilebilir.

### Canlıya Alma ("🚀 Canlıya Al" butonu)

Bir siparişi müşteriye teslim edilecek gerçek bir linke dönüştürmek artık elle
şablon doldurup Vercel'e sürüklemek yerine admin panelinden tek tıkla yapılır.

- **Nasıl çalışır**: `admin.html`'de bir siparişin detayını açtığında
  "Canlı Sayfa" bölümünde **🚀 Canlıya Al** butonu var. Tıklandığında
  `sb.functions.invoke('deploy-order', {body:{order_id}})` çağrılır — bu,
  Supabase Edge Function'ı olan `supabase/functions/deploy-order/index.ts`'i
  tetikler. Fonksiyon: (1) çağıranın gerçekten giriş yapmış admin olduğunu
  doğrular, (2) siparişi `service_role` ile okur, (3) ilgili şablonu
  `askina-ozel.vercel.app/templates/{slug}.html`'den çeker, (4) fotoğraflar
  için uzun ömürlü (~5 yıl) imzalı Storage URL'leri üretir, (5) şablonun
  `CONFIG` nesnesini regex tabanlı olarak siparişteki verilerle doldurur —
  hem evrensel alanlar (partnerName, letter, photos, songName, timeCapsule...)
  hem de şablona özel alanlar (`order.template_extra.fields` üzerinden, bkz.
  `siparis-formu.html`'deki `TEMPLATE_EXTRAS`/`collectTemplateExtrasStructured()`),
  (6) doldurulmuş tek dosyalık HTML'i Vercel API'siyle **mevcut "askina-ozel"
  projesinin içinde, `target` belirtmeden (= preview) ayrı bir deployment**
  olarak yükler — Vercel token'ı sadece bu tek projeye deploy izniyle sınırlı
  olduğu için yeni proje oluşturamıyor; bu yüzden her sipariş kendi rastgele
  `askina-ozel-xxxxxxx.vercel.app` adresini alır ama hepsi aynı proje altında
  toplanır. `target: "production"` KESİNLİKLE gönderilmemeli — bu, deployment'ı
  ana canlı siteye (`askina-ozel.vercel.app`) alias'layıp gerçek tanıtım
  sitesinin üzerine yazar (bu bir kez yaşandı, hemen fark edilip düzeltildi).
  (7) `orders.live_url`, `orders.deployment_id` ve `orders.deployed_at`
  alanlarını günceller ve linki admin paneline döner. Eğer sipariş daha önce
  deploy edilmişse ("Yeniden Canlıya Al"), yeni deployment başarıyla oluşur
  oluşmaz eski deployment Vercel'den silinir (arkada öksüz/eski içerikli
  linkler birikmesin diye).
  ⚠️ **Vercel projesi "Deployment Protection / SSO" ayarı kapatıldı**
  (`ssoProtection: null`, proje ayarlarından ya da `PATCH /v9/projects/...`
  ile) — açık olsaydı bu preview linkleri müşteri tarayıcısında Vercel giriş
  ekranına yönlendirirdi. Teslim edilen sayfalar zaten "linki bilen görsün"
  mantığıyla çalıştığı için (rastgele/tahmin edilemez URL) bu kapalı ayar
  ürünün amacıyla uyumlu; tekrar açılırsa Canlıya Al linkleri çalışmaz olur.
- **Linki müşteriye gönderme**: Deploy bittikten sonra admin panelinde
  "🔗 Sayfayı Aç" ve "📋 Linki Kopyala" butonları belirir; link
  `buildOrderSummaryText()`'e de otomatik eklenir ("📋 Özeti Kopyala" ile
  WhatsApp'a yapıştırılabilir). Bilgiler değişirse (yeni fotoğraf, düzeltilen
  mektup vb.) aynı buton "🚀 Yeniden Canlıya Al" olarak tekrar çalıştırılabilir
  — yeni bir deployment daha oluşturur, YENİ bir link üretir (aynı linki
  korumaz — proje bazında değil deployment bazında link verildiği için).
- **Canlıdan kaldırma ("🗑 Canlıdan Kaldır")**: Aynı Edge Function'ı
  `{order_id, action:'takedown'}` ile çağırır — kayıtlı `deployment_id`'yi
  Vercel'den siler (link 404 döner hale gelir), `orders.live_url` /
  `deployment_id` / `deployed_at` alanlarını `null`'a çeker. Admin panelinde
  buton tekrar "🚀 Canlıya Al" haline döner. Süresi dolan/iptal edilen bir
  siparişi ya da hatalı doldurulmuş bir sayfayı hemen erişilemez kılmak için
  kullanılır; şablon dosyası ya da sipariş kaydı silinmez, sadece canlı
  deployment kaldırılır — istenirse aynı veriyle tekrar "Canlıya Al" yapılabilir.
- **Gerekli Edge Function secret'ları** (`supabase secrets set` ile,
  `supabase/functions/deploy-order` dizininden): `VERCEL_TOKEN` (Vercel
  personal access token, sadece "askina-ozel" projesine deploy izinli) ve
  `VERCEL_TEAM_ID` (`team_sH66rM4R1JToQFBTSNpnTIIB`, "ttyedekparca" takımı —
  token bu takıma bağlı olduğu için zorunlu, yoksa "forbidden" hatası alınır).
  `SUPABASE_URL`/`SUPABASE_ANON_KEY`/`SUPABASE_SERVICE_ROLE_KEY` Supabase
  tarafından fonksiyona otomatik enjekte edilir, ayrıca eklenmez. Fonksiyon
  `--no-verify-jwt` ile deploy edildi (gateway seviyesinde değil, fonksiyon
  içinde `auth.getUser()` ile daha katı bir admin-oturum kontrolü yapılıyor).
- **QR kod**: Şablonlardaki QR buton `api.qrserver.com` ile `location.href`'i
  kodluyor — yani sayfa yerelde (`file://`) açıkken anlamsız bir QR üretir,
  sayfa Canlıya Al ile gerçek bir `vercel.app` linkine taşındıktan sonra
  QR de otomatik olarak o linki gösterip çalışır hale gelir (ayrı bir aktivasyon
  gerekmez).

### Yapay Zeka ile Mektup Yazma ("✨ Yapay Zeka ile Yaz" butonu)

Sipariş formunda müşteri mektup için iki mod seçebilir: "Kendim yazacağım"
(tam metin) ya da "Siz yazın, ben anlatayım" (sadece 3-4 soruya kısa cevap:
nasıl tanıştınız, en sevdiği özelliği, ne hissettiriyor, ek not). İkinci
modda `orders.letter` alanına ham maddeler + `"(Bu maddelerden akıcı bir
mektup yazılacak)"` notu kaydedilir — bu, canlıya alınmadan önce birinin
gerçek bir mektuba çevirmesi gerektiğinin işaretidir.

- **Nasıl çalışır**: Admin panelinde bir siparişin "Mektup" bölümü artık
  düzenlenebilir bir textarea. **"✨ Yapay Zeka ile Yaz"** butonuna basınca
  `sb.functions.invoke('generate-letter', {body:{order_id}})` çağrılır — bu,
  `supabase/functions/generate-letter/index.ts` Edge Function'ını tetikler.
  Fonksiyon: (1) admin doğrulaması yapar (deploy-order ile aynı desen), (2)
  siparişi okur, (3) şablona göre bir ton rehberi seçer (`TEMPLATE_TONE` —
  ör. `evcil-hayvan-anisi` için "sakin ve teselli edici, şakacı olmaz",
  `arkadasima-ozel` için "romantik değil, 'dostum' gibi ifadeler"), (4) bu
  bağlamla **Google Gemini API**'ye (`gemini-3.6-flash`) bir prompt gönderir,
  (5) üretilen metni **kaydetmeden** admin paneline döner.
- **Admin gözden geçirir**: Üretilen taslak textarea'ya dolar, admin
  isterse düzenler, sonra **"Kaydet"** butonuyla `orders.letter` alanına
  yazar. Bu adım bilinçli olarak otomatik değil — yapay zeka çıktısının
  müşteriye gitmeden önce mutlaka bir kez okunması için.
- **Gerekli secret** (`supabase secrets set` ile): `GEMINI_API_KEY` —
  [aistudio.google.com/apikey](https://aistudio.google.com/apikey)'dan
  alınan, ücretsiz katmanlı bir Google Gemini API anahtarı (kredi kartı
  gerektirmez). Fonksiyon `--no-verify-jwt` ile deploy edildi.

## Tasarım Notları

- Tüm sayfalar tek dosyalık, bağımsız HTML'dir (inline CSS/JS). Harici
  bağımlılıklar bilinçli olarak sınırlı tutulur: Google Fonts (tüm sayfalar),
  `api.qrserver.com` (şablonlardaki QR kod butonu) ve Supabase JS istemcisi
  (`siparis-formu.html` ve `admin.html` — bkz. yukarıdaki Backend bölümü).
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
