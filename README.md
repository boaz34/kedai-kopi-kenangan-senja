# ☕ Kedai Kopi Kenangan Senja

![Kenangan Senja Banner](https://img.shields.io/badge/Kedai%20Kopi-Kenangan%20Senja-d4af37?style=for-the-badge&logo=coffeescript&logoColor=black)
![Alpine.js](https://img.shields.io/badge/Alpine.js-v3.x-8bc34a?style=for-the-badge&logo=alpine.dot.js&logoColor=white)
![Vanilla CSS](<https://img.shields.io/badge/Styling-Vanilla%20CSS%20(Glassmorphism)-1572B6?style=for-the-badge&logo=css3&logoColor=white>)
![SweetAlert2](https://img.shields.io/badge/Alerts-SweetAlert2-FF4B4B?style=for-the-badge)

**Kedai Kopi Kenangan Senja** adalah aplikasi web _e-commerce_ bergaya modern dan responsif yang dirancang untuk memberikan pengalaman pemesanan kopi yang elegan, interaktif, dan cepat. Proyek ini mengusung estetika desain **Premium Dark Glassmorphism** yang dipadukan dengan reaktivitas tinggi menggunakan **Alpine.js**.

---

## ✨ Fitur Unggulan

### 🎨 1. Desain Premium & Glassmorphism

- **Ambient Glow Blobs & Gold Accent**: Latar belakang bernuansa gelap elegan dengan sentuhan gradien emas khas _Kenangan Senja_ (`#d4af37`).
- **Glassmorphism UI**: Efek kaca transparan (_backdrop blur_) pada Navbar, Modal Detail Produk, Sidebar Keranjang Belanja, dan Kartu Menu/Produk.
- **Responsif & Mobile-Friendly**: Tampilan yang beradaptasi secara mulus di berbagai ukuran layar (Desktop, Tablet, dan Mobile) dilengkapi dengan navigasi menu Hamburger.

### ⚡ 2. Interaktivitas & Reaktivitas Modern (Alpine.js)

- **Live Search & Highlighting**: Pencarian instan di seluruh katalog (berdasarkan nama, deskripsi, atau kategori) dengan fitur penyorotan kata kunci (_highlight match_) pada hasil pencarian.
- **Filter Kategori Dinamis**: Navigasi tab untuk menyaring produk secara cepat (✨ _Semua_, ☕ _Coffee_, 🥛 _Milk Based_, 🍫 _Non-Coffee_).

### 🛒 3. Keranjang Belanja & Checkout Aman

- **Persistensi Data (`localStorage`)**: Keranjang belanja tersimpan di browser sehingga tidak akan hilang meskipun halaman diperbarui atau ditutup.
- **Client-Side Security Validation**: Verifikasi dan kalkulasi ulang harga dilakukan langsung berdasarkan database `CATALOG` asli (_Single Source of Truth_) untuk mencegah manipulasi harga dari konsol browser.
- **Integrasi WhatsApp Checkout**: Mengirim format pesanan yang terstruktur dan rapi langsung ke WhatsApp admin/kasir, dilengkapi dengan validasi nomor HP standar Indonesia (08x/62x) dan _cooldown timer_ anti-spam.

### 🔔 4. Notifikasi & Dialog Profesional

- **SweetAlert2 Glass Theme**: Popup notifikasi (_toast_) ketika barang ditambahkan ke keranjang dan dialog konfirmasi penghapusan keranjang yang telah dikustomisasi agar selaras dengan tema _Glassmorphism_.

---

## 🛠️ Teknologi yang Digunakan (Tech Stack)

| Teknologi            | Fungsi                                                                                       |
| :------------------- | :------------------------------------------------------------------------------------------- |
| **HTML5 Semantic**   | Struktur kerangka dasar dan aksesibilitas web                                                |
| **Vanilla CSS3**     | Desain sistem kustom (_Design Tokens_, _Keyframe Animations_, Flexbox/Grid, _Glassmorphism_) |
| **Alpine.js (v3.x)** | _State Management_ dan reaktivitas DOM ringan (`$store`, `x-data`, `x-for`, `x-show`)        |
| **SweetAlert2**      | Dialog alert dan notifikasi _toast_ modern                                                   |
| **Feather Icons**    | Ikonografi minimalis dan bersih                                                              |

---

## 📂 Struktur Proyek

```text
c:\Users\User\Documents\Kedai Kopi\
│
├── index.html           # Struktur utama halaman web & template Alpine.js
├── css/
│   └── style.css        # Sistem desain kustom (Glassmorphism, Responsive)
├── js/
│   └── script.js        # Interaksi DOM aksesibilitas (Tombol Esc, klik backdrop)
├── src/
│   └── app.js           # Logika core Alpine.js (Katalog, Store UI & Cart, Checkout WA)
└── img/                 # Aset gambar menu, produk, latar belakang, dan ikon sprite
```

---

## 🚀 Cara Menjalankan Secara Lokal

Karena proyek ini dibangun menggunakan **Vanilla Web Components & Client-Side Scripting**, Anda tidak perlu melakukan instalasi _node modules_ atau proses _build_ yang rumit!

1. **Klona Repositori (Clone):**

   ```bash
   git clone https://github.com/boaz34/kedai-kopi-kenangan-senja.git
   cd kedai-kopi-kenangan-senja
   ```

2. **Buka di Browser:**
   - Cukup klik ganda pada file `index.html` untuk membukanya langsung di browser pilihan Anda.
   - _(Rekomendasi)_ Gunakan ekstensi **Live Server** di Visual Studio Code untuk mendapatkan pengalaman _hot-reload_ saat melakukan modifikasi kode.

---

## 📝 Catatan Pengembang

- **Komentar Kode**: Seluruh komentar di dalam _codebase_ (`app.js`, `style.css`, `script.js`) ditulis dengan gaya bahasa Indonesia yang pendek, santai, namun informatif agar memudahkan pembacaan kode dengan cepat.
- **Modifikasi Katalog**: Untuk menambah atau mengubah menu kopi, cukup edit array `CATALOG` di dalam file `src/app.js`. Seluruh fitur pencarian, filter, dan perhitungan otomatis akan beradaptasi secara dinamis.

---

<p align="center">
  Dibuat dengan ❤️ untuk para pecinta kopi & pengembangan web modern.<br>
  <strong>&copy; 2026 Kedai Kopi Kenangan Senja</strong>
</p>
