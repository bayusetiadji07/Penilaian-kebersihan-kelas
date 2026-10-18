# 🏆 Lomba Kebersihan & Kerapian Kelas — SMPN 3 Besuki

Aplikasi web interaktif untuk penilaian lomba kebersihan dan kerapian kelas secara objektif, transparan, dan real-time di lingkungan **SMPN 3 Besuki**. Dirancang khusus dengan antarmuka modern yang estetik dan terstruktur untuk mendukung juri penilai (Tim OSIS, Pembina K7, dan Sarpras).

---

## ✨ Fitur Utama
1. **Dashboard sebagai Halaman Utama:** Saat aplikasi dibuka, halaman awal langsung menampilkan Dashboard ringkasan peringkat dan statistik penilaian secara transparan.
2. **Rubrik Penilaian Terstruktur (Bobot & Skala 1-4):**
   - Kebersihan Lantai & Kolong Meja (Bobot 30%)
   - Kerapian Perabot, Dinding & Jendela (Bobot 25%)
   - Sanitasi & Pengelolaan Sampah (Bobot 25%)
   - Atribut Kelas & Sudut Edukasi (Bobot 20%)
3. **Papan Peringkat & Sinkronisasi Real-Time:** Otomatis menghitung skor akhir berdasarkan bobot kategori. Setiap perubahan yang dilakukan pada Panel Pengaturan Admin langsung tersinkronisasi ke dashboard dan sidebar tanpa perlu memuat ulang halaman.
4. **Panel Pengaturan Admin Berproteksi Sandi:** Halaman khusus administrator yang dilindungi kata sandi (`admin123`) dan hanya muncul saat dipilih melalui menu navigasi sidebar. Digunakan untuk mengubah identitas sekolah, nama lomba, subjudul, tahun ajaran, serta menambah/menghapus daftar kelas.
5. **Penyimpanan Lokal Persisten:** Data nilai dan pengaturan tersimpan aman di browser (*localStorage*) sehingga tidak akan hilang saat berpindah halaman atau me-refresh aplikasi.
6. **Dukungan Offline-First (PWA) & Ekspor CSV:** Dapat diinstal dan digunakan tanpa koneksi internet serta mendukung ekspor rekapitulasi penilaian dalam format CSV.

---

## 📱 Panduan Penggunaan untuk Juri & Panitia

### 1. Navigasi Awal & Dashboard
- Saat pertama kali membuka aplikasi, Anda akan langsung disajikan **Dashboard Ringkasan** yang menampilkan statistik kelas dinilai dan papan peringkat sementara.
- Panel Admin disembunyikan secara default dan hanya dapat diakses melalui tombol **Pengaturan Admin** di sidebar.

### 2. Cara Memulai Penilaian Kelas
- Pada menu **Daftar Kelas** di bilah sisi (*sidebar*) sebelah kiri, pilih kelas yang akan dinilai (contoh: *Kelas 7A*, *8B*, dll.).
- Halaman penilaian khusus kelas tersebut akan terbuka dengan rubrik lengkap.
- Amati kondisi kelas secara objektif dan pilih skor dari **1** hingga **4**, lalu klik **Simpan Penilaian Kelas**. Hasilnya langsung memperbarui dashboard.

### 3. Menggunakan Panel Pengaturan Admin & Sinkronisasi Real-Time
- Klik menu **Pengaturan Admin** pada bagian navigasi utama di bilah sisi.
- Masukkan kata sandi administrator (`admin123`) pada kotak dialog autentikasi yang muncul, lalu klik **Masuk Admin**.
- **Identitas Lembaga & Lomba:** Ubah Nama Sekolah, Nama Lomba, Subjudul, atau Tahun Ajaran sesuai kebutuhan, lalu klik **Simpan Perubahan Identitas**. Perubahan akan langsung terlihat di header, banner dashboard, dan seluruh halaman secara real-time.
- **Manajemen Daftar Kelas:** Tambahkan kelas baru atau hapus kelas yang ada dari daftar aktif. Perubahan daftar kelas akan langsung memperbarui menu navigasi sidebar, tabel leaderboard, dan statistik rekapitulasi secara otomatis.

### 4. Ekspor Data Rekapitulasi
- Klik tombol **Ekspor Rekap CSV** di bagian bawah bilah sisi untuk mengunduh rekapitulasi penilaian seluruh kelas dalam format CSV.

---

## 🛠️ Instalasi Mode Offline (PWA)
Aplikasi ini mendukung *Progressive Web App*. Untuk menggunakannya tanpa kuota internet di area sekolah:
1. Buka aplikasi melalui browser perangkat seluler (Chrome / Safari).
2. Ketuk menu browser (*tiga titik* di kanan atas atau tombol *Bagikan*).
3. Pilih **"Tambahkan ke Layar Utama"** (*Add to Home Screen*) atau **"Instal Aplikasi"**.
4. Aplikasi kini dapat diakses langsung dari ikon di layar beranda perangkat Anda dalam mode offline penuh.

---
*© 2024/2025 SMPN 3 Besuki — Dibuat dengan ❤️ oleh Tim Rakitly & Panitia Lomba K7.*