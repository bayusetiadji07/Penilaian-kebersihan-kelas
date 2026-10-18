/**
 * Data Terstruktur Lomba Kebersihan Kelas SMPN 3 Besuki
 * Disusun oleh: Tono (Penulis Konten & UX Writer)
 */

export const DATA_SEKOLAH = {
  namaSekolah: "SMPN 3 Besuki",
  namaLomba: "Lomba Kebersihan & Kerapian Kelas Berseri",
  subjudul: "Mewujudkan Lingkungan Belajar Bersih, Sehat, Rapi, dan Ceria",
  tahunAjar: "2024/2025",
  periodeLomba: "Penilaian Mingguan & Bulanan",
  pemberiPenilaian: ["Tim Penilai OSIS", "Guru Pembina K7", "Tim Sarpras"],
  motto: "Kelas Bersih, Pikiran Jernih, Belajar Makin Raih Prestasi!"
};

export const DAFTAR_KELAS = [
  // Tingkat 7
  { id: "7a", nama: "Kelas 7A", tingkat: "7", zona: "Gedung Utama Lt. 1", waliKelas: "Ibu Rahmawati, S.Pd." },
  { id: "7b", nama: "Kelas 7B", tingkat: "7", zona: "Gedung Utama Lt. 1", waliKelas: "Bapak Ahmad Subagyo, S.Pd." },
  { id: "7c", nama: "Kelas 7C", tingkat: "7", zona: "Gedung Utama Lt. 1", waliKelas: "Ibu Siti Nurhaliza, M.Pd." },
  { id: "7d", nama: "Kelas 7D", tingkat: "7", zona: "Gedung Utama Lt. 1", waliKelas: "Bapak Bambang Hermanto, S.Pd." },

  // Tingkat 8
  { id: "8a", nama: "Kelas 8A", tingkat: "8", zona: "Gedung Timur Lt. 1", waliKelas: "Ibu Dewi Lestari, S.Pd." },
  { id: "8b", nama: "Kelas 8B", tingkat: "8", zona: "Gedung Timur Lt. 1", waliKelas: "Bapak Eko Prasetyo, S.T." },
  { id: "8c", nama: "Kelas 8C", tingkat: "8", zona: "Gedung Timur Lt. 2", waliKelas: "Ibu Fitriani, S.Pd." },
  { id: "8d", nama: "Kelas 8D", tingkat: "8", zona: "Gedung Timur Lt. 2", waliKelas: "Bapak Gunawan, S.Pd." },

  // Tingkat 9
  { id: "9a", nama: "Kelas 9A", tingkat: "9", zona: "Gedung Utara Lt. 2", waliKelas: "Ibu Handayani, M.Pd." },
  { id: "9b", nama: "Kelas 9B", tingkat: "9", zona: "Gedung Utara Lt. 2", waliKelas: "Bapak Indra Wijaya, S.Pd." },
  { id: "9c", nama: "Kelas 9C", tingkat: "9", zona: "Gedung Utara Lt. 2", waliKelas: "Ibu Julia Kartika, S.Pd." },
  { id: "9d", nama: "Kelas 9D", tingkat: "9", zona: "Gedung Utara Lt. 2", waliKelas: "Bapak Kurniawan, S.Pd." }
];

export const RUBRIK_PENILAIAN = [
  {
    id: "kat_lantai",
    namaKategori: "Kebersihan Lantai & Kolong Meja",
    bobotPersen: 30,
    deskripsi: "Menilai kebersihan permukaan lantai, sudut ruangan, dan area di bawah meja/kursi.",
    kriteriaList: [
      {
        id: "lantai_debu_sampah",
        nama: "Bebas Sampah & Debu",
        keterangan: "Lantai disapu bersih, tidak ada remahan, plastik, kertas, maupun debu menumpuk.",
        skala: {
          1: "Banyak sampah berserakan dan berdebu tebal di seluruh area.",
          2: "Terdapat sampah kecil atau debu di beberapa sudut ruangan.",
          3: "Lantai bersih dari sampah, hanya ada sedikit debu halus.",
          4: "Sangat bersih, mengkilat, dan bebas debu serta sampah sama sekali."
        }
      },
      {
        id: "kolong_meja",
        nama: "Kebersihan Kolong Meja & Kursi",
        keterangan: "Area bawah meja siswa dan guru tidak dijadikan tempat pembuangan sampah.",
        skala: {
          1: "Hampir seluruh kolong meja berisi sisa makanan/plastik.",
          2: "Lebih dari 3 kolong meja berisi sampah kemasan.",
          3: "Hanya 1-2 kolong meja yang masih ada sisa sampah kecil.",
          4: "Semua kolong meja 100% bersih dan tertata tanpa ada sampah."
        }
      }
    ]
  },
  {
    id: "kat_perabot",
    namaKategori: "Kerapian Perabot, Dinding & Jendela",
    bobotPersen: 25,
    deskripsi: "Menilai kelurusan tata letak perabot, kebersihan papan tulis, dinding, serta kaca jendela.",
    kriteriaList: [
      {
        id: "penataan_meja_kursi",
        nama: "Kelurusan & Kerapian Meja Kursi",
        keterangan: "Meja dan kursi tersusun rapi sesuai barisan, tidak berantakan.",
        skala: {
          1: "Posisi meja dan kursi berantakan tidak beraturan.",
          2: "Beberapa meja/kursi miring dan melenceng dari barisan.",
          3: "Meja dan kursi cukup rapi, barisan terlihat sejajar.",
          4: "Tata letak meja dan kursi sangat simetris, rapi, dan kokoh."
        }
      },
      {
        id: "papan_tulis_dinding",
        nama: "Kebersihan Papan Tulis, Kaca & Dinding",
        keterangan: "Papan tulis bersih setelah KBM, kaca tidak buram, dinding bebas coretan liar.",
        skala: {
          1: "Papan tulis kotor, kaca berdebu/berbercak, dinding ada coretan liar.",
          2: "Papan tulis belum terhapus bersih dan ada debu tebal di ambang jendela.",
          3: "Papan tulis bersih, kaca disapu, dinding relatif bersih.",
          4: "Papan tulis bersih siap pakai, kaca bening, dinding terawat tanpa coretan."
        }
      }
    ]
  },
  {
    id: "kat_sanitasi",
    namaKategori: "Sanitasi & Pengelolaan Sampah",
    bobotPersen: 25,
    deskripsi: "Menilai ketersediaan, kerapian, dan pemisahan tempat sampah serta kelengkapan cuci tangan.",
    kriteriaList: [
      {
        id: "tempat_sampah",
        nama: "Ketersediaan & Pemilahan Tempat Sampah",
        keterangan: "Tempat sampah berpenutup, terpisah (organik/anorganik), dan tidak meluap.",
        skala: {
          1: "Tidak ada tempat sampah atau tempat sampah meluap kotor.",
          2: "Ada tempat sampah tapi tanpa pemilahan dan kotor.",
          3: "Tempat sampah rapi, ada pemilahan tapi belum terbiasa konsisten.",
          4: "Tempat sampah bersih berpenutup, terpisah dengan benar, dan tidak menumpuk."
        }
      },
      {
        id: "alat_kebersihan",
        nama: "Penyimpanan Alat Kebersihan",
        keterangan: "Sapu, pengki, sulak, dan kain pel disimpan rapi di sudut khusus kebersihan.",
        skala: {
          1: "Alat kebersihan berserakan di depan atau tengah kelas.",
          2: "Alat kebersihan ditumpuk sembarangan di belakang pintu.",
          3: "Alat kebersihan diletakkan di sudut kelas tapi kurang tertata.",
          4: "Alat kebersihan tergantung/tersusun rapi di tempat khusus yang bersih."
        }
      }
    ]
  },
  {
    id: "kat_edukasi",
    namaKategori: "Atribut Kelas & Sudut Edukasi",
    bobotPersen: 20,
    deskripsi: "Menilai kelengkapan struktur kelas, jadwal piket, serta kreativitas sudut baca/pajangan.",
    kriteriaList: [
      {
        id: "kelengkapan_kelompok",
        nama: "Kelengkapan Kelengkapan Kelas (Piket, Presiden, Burung Garuda)",
        keterangan: "Pajangan simbol negara, foto presiden/wapres, serta jadwal piket terpasang baik.",
        skala: {
          1: "Simbol negara dan atribut kelas tidak ada atau rusak.",
          2: "Atribut ada tapi dipasang miring/kurang lengkap.",
          3: "Atribut kelas lengkap dan terpasang rapi.",
          4: "Atribut kelas sangat lengkap, estetik, dan terawat sempurna."
        }
      },
      {
        id: "sudut_baca_kreativitas",
        nama: "Kreativitas Sudut Baca & Dekorasi Edukatif",
        keterangan: "Adanya pojok baca yang rapi/kreativitas hasil karya siswa yang bermanfaat.",
        skala: {
          1: "Tidak ada sudut baca atau dekorasi sama sekali.",
          2: "Ada sudut baca tetapi berdebu dan buku tidak tertata.",
          3: "Sudut baca rapi dengan beberapa karya siswa terisi.",
          4: "Sudut baca sangat menarik, nyaman, rapi, serta penuh inspirasi karya siswa."
        }
      }
    ]
  }
];

export const TEKS_UX = {
  panduanPenjuryan: {
    judul: "Ringkasan Penilaian & Peringkat Kelas",
    petunjuk: [
      "Halaman utama menampilkan Dashboard Ringkasan secara langsung saat aplikasi dibuka.",
      "Ketuk salah satu kelas pada daftar menu di sebelah kiri untuk mulai melakukan penilaian.",
      "Hasil perubahan di Panel Admin akan langsung tersinkronisasi ke Dashboard secara real-time."
    ]
  },
  panduanAdmin: {
    judul: "Panel Pengaturan & Manajemen Kelas",
    petunjuk: [
      "Panel Admin hanya muncul ketika dipilih melalui menu sidebar dan melewati verifikasi sandi.",
      "Setiap perubahan Nama Sekolah, Judul Lomba, Tahun Ajaran, atau Daftar Kelas akan otomatis memperbarui Dashboard utama secara real-time.",
      "Seluruh perubahan data akan tersimpan aman secara otomatis di perangkat ini."
    ]
  },
  kategoriPenghargaan: [
    { nama: "Juara Utama 1", batasSkor: 90, lencana: "🏆 Terbersih & Terbaik", deskripsi: "Kelas teladan dengan standar kebersihan tertinggi" },
    { nama: "Juara Utama 2", batasSkor: 82, lencana: "🥈 Sangat Rapi & Asri", deskripsi: "Kelas dengan kerapian dan penataan luar biasa" },
    { nama: "Juara Utama 3", batasSkor: 75, lencana: "🥉 Bersih Memuaskan", deskripsi: "Kelas dengan tingkat kebersihan sangat baik" },
    { nama: "Apresiasi Bintang", batasSkor: 65, lencana: "⭐ Cukup Rapi", deskripsi: "Kelas yang menunjukkan progres kebersihan positif" },
    { nama: "Perlu Pembinaan", batasSkor: 0, lencana: "🌱 Perlu Tingkatkan Piket", deskripsi: "Membutuhkan motivasi ekstra dari regu piket harian" }
  ],
  pesanApresiasi: {
    sangatBaik: "Luar biasa! Pertahankan terus semangat gotong royong dan kebersihan kelas kalian!",
    baik: "Bagus sekali! Sedikit peningkatan kerapian akan membuat kelas kalian kian sempurna.",
    cukup: "Sudah cukup baik. Ayo tingkatkan kekompakan regu piket kelas kalian!",
    kurang: "Jangan patah semangat! Jadikan evaluasi ini sebagai motivasi untuk berbenah lebih baik."
  },
  labelTombol: {
    simpan: "Simpan Penilaian Kelas",
    simpanPengaturan: "Simpan Perubahan Identitas",
    tambahKelas: "Tambah Kelas ke Daftar",
    cetak: "Cetak Rekapitulasi",
    reset: "Atur Ulang Formulir",
    lihatDetail: "Lihat Rincian Nilai",
    ekspor: "Ekspor Rekap CSV"
  }
};