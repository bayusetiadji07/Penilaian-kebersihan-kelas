# 🏆 Lomba Kebersihan & Kerapian Kelas — SMPN 3 Besuki

Aplikasi web interaktif untuk penilaian lomba kebersihan dan kerapian kelas secara objektif, transparan, dan real-time di lingkungan **SMPN 3 Besuki**. Dirancang khusus dengan antarmuka modern yang estetik dan terstruktur untuk mendukung juri penilai (Tim OSIS, Pembina K7, dan Sarpras).

---

## ✨ Fitur Utama
1. **Rubrik Penilaian Terstruktur (Bobot & Skala 1-4):**
   - Kebersihan Lantai & Kolong Meja (Bobot 30%)
   - Kerapian Perabot, Dinding & Jendela (Bobot 25%)
   - Sanitasi & Pengelolaan Sampah (Bobot 25%)
   - Atribut Kelas & Sudut Edukasi (Bobot 20%)
2. **Papan Peringkat Real-Time (Leaderboard):** Otomatis menghitung skor akhir berdasarkan bobot kategori dan mengelompokkan predikat juara secara transparan.
3. **Panel Pengaturan Admin Berproteksi Sandi:** Halaman khusus administrator yang dilindungi kata sandi (`admin123`) untuk mengubah identitas sekolah, nama lomba, subjudul, tahun ajaran, serta menambah/menghapus daftar kelas. Setiap perubahan langsung tersinkronisasi ke halaman utama.
4. **Penyimpanan Lokal Persisten:** Data nilai dan pengaturan tersimpan aman di browser (*localStorage*) sehingga tidak akan hilang saat berpindah halaman atau me-refresh aplikasi.
5. **Dukungan Offline-First (PWA):** Dapat diinstal dan digunakan tanpa koneksi internet saat juri berkeliling ke ruang-ruang kelas.
6. **Ekspor Data Rekapitulasi:** Unduh hasil penilaian seluruh kelas dalam format CSV untuk dilaporkan kepada pihak sekolah.

---

## 📱 Panduan Penggunaan untuk Juri & Panitia

### 1. Cara Memulai Penilaian
- Buka aplikasi di browser (Desktop maupun Smartphone).
- Pada menu **Daftar Kelas** di bilah sisi (*sidebar*) sebelah kiri, pilih kelas yang akan dinilai (contoh: *Kelas 7A*, *8B*, dll.).
- Halaman penilaian khusus kelas tersebut akan terbuka dengan rubrik lengkap.

### 2. Mengisi Skor Rubrik
- Untuk setiap kriteria, amati kondisi kelas secara objektif dan pilih skor dari **1 (Perlu Peningkatan)** hingga **4 (Sangat Baik / Sempurna)** berdasarkan panduan skala yang tersedia.
- Total skor sementara akan dihitung secara langsung di bagian atas layar.
- Berikan catatan atau saran membangun pada kolom catatan di bagian bawah formulir.
- Klik tombol **Simpan Penilaian Kelas**.

### 3. Menggunakan Panel Pengaturan Admin (Berproteksi Kata Sandi)
- Klik menu **Pengaturan Admin** pada bagian navigasi utama di bilah sisi (*sidebar*).
- Masukkan kata sandi administrator pada kotak dialog autentikasi yang muncul (Sandi default: `admin123`), lalu klik **Masuk Admin**.
- **Identitas Lembaga & Lomba:** Ubah Nama Sekolah, Nama Lomba, Subjudul, atau Tahun Ajaran sesuai kebutuhan kegiatan Anda, lalu klik **Simpan Perubahan Identitas**. Perubahan akan langsung terlihat di halaman utama aplikasi secara real-time.
- **Manajemen Daftar Kelas:** Isi formulir "Tambah Kelas Baru" dengan memasukkan Nama Kelas, Nama Wali Kelas, Zona/Gedung, serta Tingkat, lalu klik **Tambah Kelas ke Daftar**. Kelas baru akan langsung muncul di daftar navigasi sidebar dan dashboard penilaian. Anda juga dapat menghapus kelas dari tabel daftar aktif jika diperlukan.

### 4. Memantau Peringkat & Ekspor
- Kembali ke menu **Dashboard Ringkasan** untuk melihat peringkat sementara seluruh kelas secara real-time.
- Klik tombol **Ekspor Rekap CSV** di bagian bawah bilah sisi untuk mengunduh rekapitulasi penilaian.

---

## 🛠️ Instalasi Mode Offline (PWA)
Aplikasi ini mendukung *Progressive Web App*. Untuk menggunakannya tanpa kuota internet di area sekolah:
1. Buka aplikasi melalui browser perangkat seluler (Chrome / Safari).
2. Ketuk menu browser (*tiga titik* di kanan atas atau tombol *Bagikan*).
3. Pilih **"Tambahkan ke Layar Utama"** (*Add to Home Screen*) atau **"Instal Aplikasi"**.
4. Aplikasi kini dapat diakses langsung dari ikon di layar beranda perangkat Anda dalam mode offline penuh.

---
*© 2024/2025 SMPN 3 Besuki — Dibuat dengan ❤️ oleh Tim Rakitly & Panitia Lomba K7.*