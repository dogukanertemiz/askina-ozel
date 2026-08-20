# Sevgilime Özel — Sipariş & Teslimat Rehberi

Bu dosya, bir sipariş geldiğinde işi hızlıca yapabilmek için referans niteliğinde.
Bana (Claude) bu dosyayı ve gerekli sipariş bilgilerini verdiğinde, doğrudan
şablonu doldurup teslime hazır dosyayı üretebilirim.

## Şablon Kataloğu

| Şablon | Stil | Kime Uygun |
|---|---|---|
| **Tutkulu Gül** | Bordo / altın, iddialı & romantik | Klasik, tutkulu, "büyük jest" isteyen çiftler |
| **Mavi Rüya** | Pastel lacivert/lavanta, hayalperest | Uzak mesafe ilişkiler, "kavuşma" teması |
| **Bal Sarısı** | Sıcak turuncu/şeftali, samimi | Uzun süreli, sıcak/ev gibi hisseden ilişkiler |
| **Zeytin Dalı** | Adaçayı yeşili/toprak, sakin & doğal | Sade zevkli, "doğal" estetik isteyen çiftler |
| **Onyx Zarafet** | Siyah/şampanya altını, modern & lüks | Şık, minimal, "gösterişsiz lüks" isteyen çiftler |
| **Şeftali Tül** | Açık şeftali/pudra, masalsı & hayalperest | Genç, tatlı, "masal" temalı ilişkiler |

### Romantik Olmayan Şablonlar (Doğum Günü / Arkadaşlık)

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

Bu iki şablonda dil **romantik değil, samimi/arkadaşça** tutulmalı — mektup
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

Dosyalar `templates/` klasöründe duruyor. Her dosyanın içinde `DEĞİŞTİR:` yorumuyla
işaretlenmiş, doldurulması gereken alanlar var. İnteraktif şablonlarda ayrıca
JS içindeki `PUZZLE_IMAGE`, kazı kazan altındaki görsel/mesaj, ve hafıza
kartlarındaki `SYMBOLS` dizisi de müşteriye göre güncellenir.

**Önemli — mekanik çeşitliliği:** Katalogdaki her interaktif/oyunlu şablonun
"kapı" mekaniği **birbirinden farklı olmalı**, aksi halde şablonlar
"tekrarlayan" hissi verir (bu bir kez yaşandı ve düzeltildi). Şu an kullanılan
mekanikler:

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
kaydırma, çevirme/rotate, sesli komut, zamanlayıcı yarışı vb.).

## Sipariş Alırken Toplanacak Bilgiler (Checklist)

Müşteriden şunları iste (form ya da DM üzerinden):

1. **Hangi şablon** istiyor (9 şablondan biri, ya da "sen seç" derse ilişki
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

## Süreç

1. Yukarıdaki bilgileri müşteriden topla
2. Bana şu formatta ilet: *"[Şablon adı] ile sipariş: partner adı X, gönderen Y,
   tarih Z, fotoğraflar [ekli/açıklama], mektup: [madde madde ya da tam metin],
   şarkı: [isim - sanatçı]"*
3. İlgili şablon dosyasını alıp `DEĞİŞTİR:` alanlarını dolduracağım, sana
   teslime hazır tek bir HTML dosyası vereceğim
4. Dosyayı hızlıca gözden geçir (isim/tarih doğru mu), gerekiyorsa barındırma
   (Vercel/Netlify'a sürükle-bırak ile birkaç saniyede yayınlanabilir, ya da
   doğrudan HTML dosyasını müşteriye gönderebilirsin) yap
5. Linki/dosyayı müşteriye teslim et

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

## Notlar

- Fotoğraflar için şimdilik picsum.photos placeholder kullanılıyor — gerçek
  siparişte müşterinin gönderdiği fotoğraflarla değiştirilecek
- Şablonlara yeni tema eklemek istersen bu dosyaya ve tabloya ekleme yapmayı
  unutma, böylece süreç güncel kalır
- İleride otomasyona (form + veritabanı + otomatik üretim) geçilecekse bu
  dosyadaki veri modeli zaten `CLAUDE.md`'deki `pages` tablosuyla uyumlu
