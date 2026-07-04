# Product Requirements Document (PRD)
**Platform Pembiayaan Syariah Berbasis Link E-Commerce (Tijara)**

**Dokumen ID:** PRD-TIJARA-002
**Tanggal:** 4 Juli 2026
**Status:** Final (Berdasarkan Feedback User)
**Versi:** 2.0

---

## 1. Pendahuluan & Latar Belakang
Banyak pengguna e-commerce di Indonesia membutuhkan akses pembiayaan yang fleksibel untuk membeli barang kebutuhan tanpa harus menggunakan kartu kredit konvensional atau terjebak dalam skema pinjaman digital yang mengandung unsur riba. Dokumen ini merumuskan kebutuhan produk untuk platform pembiayaan alternatif berbasis syariah dengan nama **Tijara**.

Sistem ini mengadopsi kemudahan bagi pengguna di mana mereka cukup menyalin tautan (link) produk dari marketplace populer (seperti Shopee/Tokopedia) dan menempelkannya ke dalam platform untuk mendapatkan kalkulasi cicilan serta pengajuan pembiayaan secara instan dengan akad syariah yang jelas. Seluruh identitas visual dan logika perhitungan disesuaikan secara khusus untuk platform Tijara.

## 2. Prinsip Pembiayaan Syariah (Skema Akad)
Platform ini akan beroperasi menggunakan skema **Akad Murabahah** (Jual Beli Berbasis Keuntungan) yang dikombinasikan dengan **Akad Wakalah bil Ujrah** (Perwakilan dengan Imbalan Jasa) untuk proses pengadaan barang:

* **Wakalah bil Ujrah:** Platform memberikan kuasa kepada pengguna untuk bertindak atas nama platform dalam memilih dan memastikan spesifikasi barang yang ada di e-commerce.
* **Murabahah:** Platform membeli barang tersebut dari merchant e-commerce secara tunai, kemudian menjualnya kembali kepada pengguna dengan harga perolehan ditambah margin keuntungan (ribhun) yang disepakati di awal sebesar **4,5% per bulan**. Pengguna membayar secara tangguh (cicilan) sesuai tenor yang dipilih secara bebas oleh nasabah.

> **Kepatuhan Syariah (Shariah Compliance)**
> Harga jual total (harga barang + margin) dan nilai cicilan per bulan bersifat tetap (fixed) sejak awal akad ditandatangani. Tidak ada pemberlakuan bunga berbunga atau denda keterlambatan yang bersifat akumulatif (riba), melainkan menggunakan sistem ta'zir (denda sosial untuk dana kebajikan) jika terjadi kelalaian sengaja.

## 3. Alur Pengguna Utama (Core User Journey)
Proses utama dari sisi pengguna dirancang sesederhana mungkin dengan 4 langkah utama:

1.  **Langkah 1: Pencarian Barang**
    User mencari barang di e-commerce, lalu menyalin (copy) URL produk tersebut.
2.  **Langkah 2: Input Link**
    User menempelkan (paste) link ke kolom input di platform Tijara dan menekan tombol konfirmasi.
3.  **Langkah 3: Simulasi Instan & Bebas Tenor**
    Sistem membaca data produk. User bebas memasukkan/memilih tenor cicilan, lalu sistem menampilkan kalkulasi.
4.  **Langkah 4: Pengajuan**
    User menyetujui simulasi dan melanjutkan ke proses pengajuan pembiayaan syariah (KYC).

## 4. Spesifikasi Fungsional (Functional Requirements)

### 4.1. Modul Pengurai Tautan (Link Parser / Scraper Engine)
| ID Kebutuhan | Deskripsi Fitur | Aturan Bisnis & Validasi |
| :--- | :--- | :--- |
| **REQ-F-001** | Validasi URL Input | Sistem hanya menerima URL dari domain yang diizinkan (marketplace terverifikasi). Jika domain tidak dikenal, tampilkan pesan galat. |
| **REQ-F-002** | Ekstraksi Data Otomatis (Scraping) | Sistem mengekstrak informasi: Nama Produk, Harga Pokok (HPP), Gambar Utama, Deskripsi Singkat. |

### 4.2. Kalkulator Simulasi Pembiayaan Syariah (Dinamis)
| ID Kebutuhan | Deskripsi Fitur | Aturan Bisnis & Validasi |
| :--- | :--- | :--- |
| **REQ-F-004** | Pemilihan Tenor Bebas (Custom) | User dibebaskan untuk menentukan sendiri jumlah bulan tenor melalui input field atau slider. (Batas maksimal tenor dapat dikonfigurasi, misal 24 bulan). |
| **REQ-F-005** | Kalkulasi Margin (Ribhun) Flat | Sistem menghitung margin keuntungan secara flat sebesar 4,5% per bulan. <br>*Formula: Total Margin = Harga Pokok Penjualan (HPP) × 4,5% × Jumlah Bulan Tenor* |
| **REQ-F-006** | Display Transparan & Real-time | Menampilkan rincian yang langsung diperbarui setiap kali input tenor diubah: Harga Asli Barang, Total Margin, Nilai Angsuran per Bulan, dan Total Keseluruhan. |

### 4.3. Manajemen Pengajuan & KYC (Know Your Customer)
Proses bagi pengguna untuk melengkapi data legalitas sebelum pembiayaan disetujui.
* **Pengisian Data Diri:** Nama lengkap, NIK, alamat domisili, informasi pekerjaan, dan kontak darurat.
* **Upload Dokumen:** Foto KTP dan Swafoto (Selfie) bersama KTP.
* **Persetujuan Akad Digital:** Menampilkan teks Akad Murabahah & Wakalah secara digital yang wajib disetujui oleh pengguna.

## 5. Spesifikasi Teknis & Rekomendasi Arsitektur
| Komponen | Teknologi Rekomendasi | Alasan Pemilihan |
| :--- | :--- | :--- |
| **Frontend Platform** | Next.js (React Framework) | Mendukung SSR untuk kecepatan muat awal dan ramah SEO, penting untuk pertumbuhan platform. |
| **Antarmuka & Desain UI** | Tailwind CSS | Mempercepat pengembangan tata letak dan memastikan simulasi form input dan slider responsif di mobile. |
| **Backend API Engine** | Node.js / Python | Dibutuhkan untuk menangani engine scraping link marketplace secara asinkron. |
