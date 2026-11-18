export const creativeWebLevelCourses = [
  {
    id: 'intermediate-p5js', trackId: 'p5js', title: 'Intermediate p5.js', category: 'Game Development', level: 'Menengah', theme: 'pink', symbol: 'p5',
    description: 'Kuis konsep p5.js tentang transformasi, animasi, state interaksi, buffer gambar, dan vektor. Potongan kode merupakan contoh untuk dianalisis, bukan sketch atau framework yang dijalankan langsung oleh kuis.',
    chapters: [
      { title: 'Ruang dan Waktu Gambar', description: 'Menalar urutan transformasi, batas state gambar, dan kebijakan waktu animasi.' },
      { title: 'Interaksi dan Komposisi', description: 'Mengelola gesture, lapisan gambar, dan perubahan vektor tanpa efek samping tersembunyi.' }
    ],
    lessons: [
      {
        id: 'intermediate-p5js-01', title: 'Poros Lokal Setelah Translasi', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Transformasi p5.js mengubah sistem koordinat untuk perintah gambar berikutnya, bukan memindahkan angka yang tersimpan pada model. Dalam renderer 2D dengan mode sudut radian, translate lalu rotate membuat objek berputar terhadap titik asal lokal yang telah dipindahkan.', 'Urutan transformasi tidak dapat ditukar sembarangan. Titik lokal dipengaruhi rotasi sebelum ditempatkan pada posisi asal yang ditranslasikan. Karena sumbu y layar mengarah ke bawah, rotasi positif seperempat putaran tampak searah jarum jam.'],
        example: `// Asumsi: renderer 2D, transformasi awal identitas, angleMode(RADIANS).
translate(100, 50);
rotate(HALF_PI);
point(20, 0);`,
        task: ['Di koordinat kanvas mana titik lokal tersebut digambar?'], options: ['(120, 50)', '(100, 70)', '(-50, 120)', '(100, 30)'], answer: 1,
        hints: ['Rotasikan vektor lokal (20, 0) sebesar seperempat putaran positif.', 'Tambahkan posisi asal lokal (100, 50) setelah memperoleh vektor hasil rotasi.'],
        explanation: 'Vektor lokal menjadi (0, 20), kemudian translasi menghasilkan (100, 70). Jawaban (-50, 120) justru mencerminkan urutan transformasi yang berbeda.', xp: 15
      },
      {
        id: 'intermediate-p5js-02', title: 'Batas State dengan push dan pop', chapter: 0, type: 'quiz', language: 'text',
        intro: ['push() menyimpan state transformasi dan gaya gambar yang didukung, sedangkan pop() mengembalikannya. Pasangan ini memungkinkan fungsi menggambar komponen mengatur ruang lokalnya tanpa mengubah cara komponen berikutnya digambar.', 'Stack bekerja dari pasangan paling dalam ke luar. Pemulihan state gambar tidak menghapus piksel yang sudah digambar dan tidak memulihkan variabel JavaScript biasa. Pisahkan state renderer dari state model agar batas tanggung jawab fungsi tetap jelas.'],
        example: `// State awal: transformasi identitas.
let jumlah = 0;
fill("navy");
push();
translate(80, 0);
fill("orange");
jumlah += 1;
circle(0, 20, 10);
pop();
circle(10, 20, 10);`,
        task: ['Apa keadaan lingkaran terakhir dan variabel jumlah?'], options: ['Pusat (90, 20), warna orange, jumlah 1', 'Pusat (10, 20), warna navy, jumlah 0', 'Pusat (90, 20), warna navy, jumlah 0', 'Pusat (10, 20), warna navy, jumlah 1'], answer: 3,
        hints: ['pop memulihkan fill dan translasi, bukan semua perubahan dalam program.', 'jumlah merupakan variabel model, bukan bagian dari stack renderer.'],
        explanation: 'Lingkaran terakhir memakai transformasi awal dan fill navy. jumlah tetap 1 karena pop tidak membatalkan penugasan JavaScript; lingkaran pertama juga tidak terhapus.', xp: 15
      },
      {
        id: 'intermediate-p5js-03', title: 'Membatasi Lompatan Waktu', chapter: 0, type: 'quiz', language: 'text',
        intro: ['deltaTime mencatat selang frame dalam milidetik, tetapi animasi dekoratif tidak selalu perlu mengejar seluruh waktu yang lewat saat tab tersembunyi. Membatasi selang waktu dapat menghindari objek tiba-tiba melintasi kanvas ketika pengguna kembali.', 'Pembatasan adalah kebijakan pengalaman, bukan peningkatan akurasi waktu. Waktu simulasi akan tertinggal dari waktu nyata ketika batas aktif. Penghitung waktu ujian atau kalender harus memakai sumber waktu yang sesuai, bukan mengandalkan penjumlahan delta yang sengaja dipotong.'],
        example: `const dt = Math.min(deltaTime, 50) / 1000;
x += 80 * dt;
// Setelah tab kembali aktif, deltaTime teramati 2000 ms.`,
        task: ['Interpretasi mana benar untuk frame setelah tab kembali aktif?'], options: ['Objek bergerak 4 unit dan 1,95 detik tidak disimulasikan oleh langkah ini', 'Objek bergerak 160 unit karena waktu nyata selalu dikejar', 'Objek bergerak 4 unit dan seluruh 2 detik tetap tersimulasikan', 'Objek bergerak 0 unit karena Math.min menolak delta yang besar'], answer: 0,
        hints: ['Selang yang dipakai paling besar 0,05 detik.', 'Kode ini tidak mempunyai accumulator untuk menyimpan sisa waktu.'],
        explanation: '80 × 0,05 menghasilkan 4 unit. Sisa 1,95 detik dibuang dari langkah simulasi, sehingga gerak lebih tenang tetapi tidak menjaga kesetaraan dengan waktu nyata.', xp: 15
      },
      {
        id: 'intermediate-p5js-04', title: 'Gesture sebagai Transisi State', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Drag bukan sekadar memeriksa posisi pointer setiap frame. Gesture memiliki awal, pembaruan, dan akhir. Menyimpan objek yang dipilih saat mousePressed membuat gerakan tetap terhubung ke objek itu meskipun pointer kemudian keluar dari batasnya.', 'Offset antara pointer dan pusat objek perlu dipertahankan agar objek tidak meloncat saat pertama disentuh. State drag juga harus dibersihkan ketika gesture berakhir atau dibatalkan; keadaan hover saja tidak cukup untuk menentukan kepemilikan gesture.'],
        example: `// Contoh konseptual: hitTest dan objek sudah tersedia.
let dragging = false, offsetX = 0;
function mousePressed() {
  if (hitTest(mouseX, mouseY)) {
    dragging = true;
    offsetX = mouseX - objek.x;
  }
}
function mouseDragged() {
  if (dragging) objek.x = mouseX - offsetX;
}
// mouseReleased belum ditangani. Semua pelepasan pada skenario diterima kanvas.`,
        task: ['Perubahan mana mencegah drag berikutnya di ruang kosong menggerakkan objek lama?'], options: ['Setel offsetX menjadi nol di setiap draw', 'Uji hover saja dan hentikan drag saat pointer melewati tepi objek', 'Setel dragging menjadi false pada mouseReleased', 'Panggil mousePressed secara manual di setiap draw'], answer: 2,
        hints: ['Cari state yang masih tertinggal setelah tombol dilepas.', 'Gesture baru di ruang kosong tidak melewati cabang hitTest yang benar.'],
        explanation: 'mouseReleased harus mengakhiri kepemilikan gesture dengan membersihkan dragging. Pada aplikasi dengan sumber pembatalan lain, jalur pembatalan juga perlu cleanup; menghapus offset justru membuat posisi meloncat.', xp: 15
      },
      {
        id: 'intermediate-p5js-05', title: 'Cache Lapisan dan Invalidasi', chapter: 1, type: 'quiz', language: 'text',
        intro: ['createGraphics menghasilkan buffer gambar terpisah yang dapat dikomposisikan ke kanvas utama melalui image(). Lapisan latar yang mahal dapat digambar sekali, sedangkan objek interaktif tetap digambar tiap frame. Buffer harus dibuat pada tahap yang tepat, bukan terus dialokasikan dalam draw.', 'Cache hanya sah selama seluruh masukan pembentuknya tidak berubah. Ukuran kanvas, tema, atau parameter pola dapat membuat piksel lama tidak sesuai. Invalidasi berarti membangun ulang isi cache ketika masukan tersebut berubah, bukan menghapus cache pada setiap frame.'],
        example: `Sebuah peta dekoratif digambar ke buffer 600 × 400 berdasarkan tema aktif.
Setiap draw mengomposisikan buffer lalu menggambar penanda pointer.
Kanvas kemudian diubah menjadi 900 × 600 dan tema berganti menjadi gelap.`,
        task: ['Strategi mana menjaga cache tetap benar tanpa menggambar ulang peta setiap frame?'], options: ['Pertahankan buffer lama karena image selalu menghitung ulang isi peta', 'Sesuaikan ukuran buffer dan gambar ulang peta saat ukuran atau tema berubah', 'Buat createGraphics baru setiap kali pointer bergerak', 'Simpan penanda pointer ke buffer permanen tanpa membersihkan posisi sebelumnya'], answer: 1,
        hints: ['Piksel buffer tidak mengetahui bahwa data tema sudah berubah.', 'Bedakan masukan lapisan statis dari state pointer yang berubah cepat.'],
        explanation: 'Ukuran dan tema adalah dependensi cache sehingga perubahannya memicu pembangunan ulang. Komposisi image hanya menampilkan isi yang tersedia, bukan menjalankan kembali aturan pembentukan peta.', xp: 15
      },
      {
        id: 'intermediate-p5js-06', title: 'Komposisi Vektor Tanpa Mengubah Gaya', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Metode instance p5.Vector seperti add() dan mult() mengubah vektor penerimanya. Ini praktis untuk memperbarui posisi, tetapi berbahaya bila vektor gaya yang sama dipakai banyak partikel. Skala waktu tidak seharusnya mengubah konstanta gaya bersama.', 'Gunakan copy() untuk membuat vektor sementara ketika menggabungkan percepatan dan mengalikannya dengan selang waktu. Dengan integrasi Euler sederhana, perubahan kecepatan adalah percepatan total dikalikan dt; posisi dapat diperbarui dalam langkah terpisah.'],
        example: `const gravity = createVector(0, 10);
const wind = createVector(4, 0);
const velocity = createVector(1, 2);
const dt = 0.5;
velocity.add(gravity.copy().add(wind).mult(dt));`,
        task: ['Apa pasangan velocity dan gravity setelah operasi tersebut?'], options: ['velocity (3, 7), gravity (0, 10)', 'velocity (3, 7), gravity (2, 5)', 'velocity (5, 12), gravity (0, 10)', 'velocity (1, 7), gravity (4, 10)'], answer: 0,
        hints: ['Jumlah percepatan adalah (4, 10), lalu kalikan dengan 0,5.', 'Penerima add(wind) adalah salinan gravity, bukan gravity asli.'],
        explanation: 'Perubahan kecepatan adalah (2, 5), sehingga velocity menjadi (3, 7). gravity tetap (0, 10) karena semua komposisi gaya dilakukan pada salinannya.', xp: 15
      }
    ]
  },
  {
    id: 'intermediate-ui-ux-design', trackId: 'ui-ux-design', title: 'Intermediate UI/UX Design', category: 'Web Development', level: 'Menengah', theme: 'pink', symbol: 'UX',
    description: 'Kuis konsep UI/UX dengan skenario alur tugas, state aksesibel, pemulihan, dan evaluasi kegunaan. Contoh merupakan bahan analisis desain, bukan prototipe atau framework yang dieksekusi langsung.',
    chapters: [
      { title: 'Struktur dan Makna Interaksi', description: 'Menghubungkan alur tugas dengan struktur informasi dan state yang dapat dipahami.' },
      { title: 'Pemulihan dan Bukti Kegunaan', description: 'Merancang jalur pemulihan serta memilih evaluasi dan ukuran keberhasilan yang dapat ditindaklanjuti.' }
    ],
    lessons: [
      {
        id: 'intermediate-ui-ux-design-01', title: 'Satu Informasi, Beberapa Jalur Tugas', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Alur tugas menggambarkan langkah menuju suatu tujuan, sedangkan arsitektur informasi mengatur lokasi dan hubungan konten. Satu informasi dapat dibutuhkan pada beberapa alur tanpa harus diduplikasi menjadi halaman yang berkembang sendiri-sendiri.', 'Pemisahan ini membantu menjaga konsistensi sekaligus memberikan pintu masuk kontekstual. Struktur kanonis menyimpan makna yang sama, sementara tautan dari langkah tugas membawa konteks agar pengguna dapat kembali melanjutkan pekerjaan.'],
        example: `Peserta mencari syarat sertifikat dari halaman kursus dan dari layar pengajuan sertifikat.
Tim membuat dua halaman syarat yang dikelola terpisah. Salah satunya masih menyebut ambang nilai lama.
Pengguna perlu membaca syarat lalu kembali ke langkah pengajuan yang belum selesai.`,
        task: ['Rancangan mana paling langsung mengatasi inkonsistensi sambil menjaga kelanjutan tugas?'], options: ['Hapus tautan syarat dari layar pengajuan', 'Beri warna berbeda pada kedua versi syarat', 'Pindahkan seluruh pengajuan ke halaman katalog tanpa menyimpan progres', 'Gunakan sumber syarat kanonis dengan akses kontekstual dan jalur kembali yang mempertahankan progres'], answer: 3,
        hints: ['Dua pintu masuk tidak harus berarti dua sumber konten.', 'Keberhasilan tugas mencakup kemampuan melanjutkan setelah membaca informasi pendukung.'],
        explanation: 'Sumber kanonis mengurangi perbedaan isi, sementara akses kontekstual dan pemulihan posisi menjaga alur. Sekadar mengganti tampilan tidak memperbaiki model konten yang terpecah.', xp: 15
      },
      {
        id: 'intermediate-ui-ux-design-02', title: 'State Menunggu yang Tetap Terbaca', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Interaksi asinkron membutuhkan state idle, pending, berhasil, dan gagal yang dirancang secara eksplisit. Menonaktifkan pengiriman berulang dapat mencegah duplikasi, tetapi pengguna tetap memerlukan penjelasan tentang apa yang sedang terjadi dan tindakan apa yang tersedia.', 'Indikator visual perlu dilengkapi status yang dapat dikenali teknologi bantu tanpa mengumumkan perubahan secara berlebihan. Pembaruan status biasa tidak harus mengambil fokus; fokus yang meloncat justru dapat memutus pekerjaan keyboard atau pembacaan.'],
        example: `Prototipe formulir memiliki jeda pengiriman 3 detik.
Saat pending, tombol Kirim dicegah mengirim ulang, fokus input tidak diubah, tetapi hanya ada spinner tanpa teks.
Setelah gagal, masukan masih tersimpan dan tombol dapat digunakan lagi.`,
        task: ['Tambahan mana paling tepat menjelaskan transisi pending tanpa mengganggu posisi pengguna?'], options: ['Pindahkan fokus ke spinner setiap 100 ms', 'Hapus formulir selama pending agar pengguna menunggu', 'Sediakan status teks terprogram seperti role="status" yang diperbarui menjadi sedang mengirim lalu hasilnya', 'Gunakan role="alert" berulang untuk setiap frame animasi spinner'], answer: 2,
        hints: ['State yang terlihat oleh mata juga perlu mempunyai makna terprogram.', 'Pengumuman status dapat dilakukan tanpa memindahkan fokus.'],
        explanation: 'Status teks dengan pengumuman yang sesuai memberi umpan balik tanpa merebut fokus. Pengumuman per frame atau penghilangan formulir menambah gangguan tanpa menjelaskan hasil tindakan.', xp: 15
      },
      {
        id: 'intermediate-ui-ux-design-03', title: 'Kontras Tidak Menentukan Makna Status', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Kontras luminansi mengukur keterbedaan visual, bukan kejelasan arti. Dalam WCAG 2.2 tingkat AA, teks normal umumnya memerlukan rasio minimal 4,5:1. Lulus pemeriksaan itu tidak membuktikan bahwa status atau tindakan sudah dapat dipahami tanpa warna.', 'Desain tabel status perlu membedakan keterbacaan teks dari pengodean makna. Label yang menyatakan kondisi sebenarnya lebih berguna daripada label generik dengan warna berbeda, terutama ketika tabel dicetak monokrom atau dibaca teknologi bantu.'],
        example: `Tiga baris pesanan menampilkan teks "Status" dengan warna berbeda.
Rasio setiap teks terhadap latarnya sudah 5,2:1.
Merah berarti Ditolak, hijau berarti Disetujui, dan kuning berarti Perlu dokumen; arti hanya dijelaskan oleh legenda warna.`,
        task: ['Perbaikan mana menangani masalah yang belum diselesaikan oleh rasio kontras tersebut?'], options: ['Ganti teks generik dengan Ditolak, Disetujui, atau Perlu dokumen pada tiap baris', 'Naikkan semua rasio menjadi 7:1 tetapi tetap gunakan teks Status', 'Urutkan baris menurut warna tanpa menambahkan label status', 'Perbesar legenda warna saja dan pertahankan semua teks baris'], answer: 0,
        hints: ['Angka kontras tidak memberi nama pada kondisi pesanan.', 'Makna harus tetap terbaca ketika warna tidak tersedia.'],
        explanation: 'Label kondisi langsung menyampaikan makna yang sebelumnya hanya dikodekan lewat warna. Menaikkan rasio dapat membantu keterbacaan, tetapi tidak menyelesaikan ketergantungan pada warna.', xp: 15
      },
      {
        id: 'intermediate-ui-ux-design-04', title: 'Pemulihan setelah Aksi Optimistis Gagal', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Antarmuka optimistis memperbarui tampilan sebelum hasil operasi diketahui. Perasaan cepat ini memerlukan rencana pemulihan: aplikasi harus mengetahui item mana yang berubah, keadaan sebelumnya, dan apakah ada tindakan pengguna yang lebih baru.', 'Pemulihan tidak boleh sekadar menampilkan pesan sambil membiarkan UI menyatakan keberhasilan yang tidak terjadi. Pertahankan konteks, jelaskan hasil yang pasti, dan hindari percobaan ulang otomatis tanpa kendali bila operasi berpotensi menghasilkan duplikasi.'],
        example: `Dalam skenario prototipe, tiga dokumen langsung menghilang setelah aksi Arsipkan.
Hasil simulasi menyatakan seluruh pengarsipan gagal sebelum perubahan disimpan; tidak ada aksi lanjutan pengguna.
Fokus keyboard sebelumnya berada pada toolbar daftar.`,
        task: ['Respons pemulihan mana paling konsisten dengan hasil yang diketahui?'], options: ['Biarkan dokumen hilang dan tampilkan notifikasi sukses', 'Pulihkan tiga dokumen beserta pilihan sebelumnya, jelaskan kegagalan, dan sediakan Coba lagi tanpa memindahkan fokus sembarangan', 'Kosongkan seluruh daftar agar pengguna memuat ulang dari awal', 'Buat salinan baru dokumen setiap kali mencoba ulang'], answer: 1,
        hints: ['Hasil simulasi memastikan perubahan belum tersimpan.', 'Pemulihan seharusnya mengembalikan keadaan tugas, bukan menambah pekerjaan baru.'],
        explanation: 'Rollback pada skenario ini harus memulihkan item dan konteks seleksi karena operasi pasti gagal dan belum ada aksi baru. Pada hasil parsial atau tidak pasti, rekonsiliasi perlu lebih rinci daripada membatalkan semuanya.', xp: 15
      },
      {
        id: 'intermediate-ui-ux-design-05', title: 'Batas Bukti dari Prototipe', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Fidelitas prototipe perlu mencakup perilaku yang menjadi pertanyaan riset. Prototipe yang hanya memiliki jalur berhasil dapat menguji sebagian navigasi, tetapi tidak menyediakan bukti bahwa pengguna mampu pulih dari kesalahan atau menyunting pilihan sebelumnya.', 'Catat intervensi moderator dan batas simulasi sebagai bagian hasil, bukan sebagai kekurangan peserta. Ketika masalah terletak pada cabang yang belum dibuat, memperbaiki stimulus uji lebih berguna daripada menghitung semua hambatan sebagai kegagalan desain final.'],
        example: `Tujuan riset: peserta dapat mengubah jadwal setelah memilih slot yang ternyata penuh.
Prototipe hanya menghubungkan slot tersedia ke halaman selesai. Klik slot penuh tidak melakukan apa pun.
Moderator memberi tahu peserta agar menganggap pemesanan sudah berhasil.`,
        task: ['Langkah berikut mana paling tepat untuk memperoleh bukti tentang pemulihan?'], options: ['Laporkan semua peserta berhasil karena moderator menjelaskan hasilnya', 'Ukur kesukaan warna tombol sebagai pengganti kemampuan memulihkan jadwal', 'Tambahkan cabang slot penuh, pertahankan pilihan relevan, lalu uji ulang tugas tanpa membocorkan jalurnya', 'Hapus skenario slot penuh dari hasil dan klaim semua jalur telah diuji'], answer: 2,
        hints: ['Pertanyaan riset membutuhkan cabang kegagalan yang benar-benar dapat ditelusuri.', 'Penjelasan moderator tidak setara dengan keberhasilan mandiri.'],
        explanation: 'Cabang pemulihan harus terwakili agar perilaku peserta dapat diamati. Data sebelumnya hanya menunjukkan batas prototipe, bukan kemampuan pengguna menyelesaikan kondisi slot penuh.', xp: 15
      },
      {
        id: 'intermediate-ui-ux-design-06', title: 'Ukuran Kegunaan yang Mengarahkan Perbaikan', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Ukuran kegunaan membutuhkan definisi operasional sebelum pengujian. Keberhasilan mandiri berbeda dari keberhasilan setelah petunjuk, sedangkan waktu penyelesaian hanya pada peserta yang berhasil dapat menyembunyikan peserta yang terhenti sama sekali.', 'Ukuran agregat perlu disandingkan dengan lokasi hambatan. Persentase sampel kecil bukan estimasi presisi seluruh populasi, tetapi dapat membantu memprioritaskan perbaikan ketika pola kesalahan dan kondisi bantuan dicatat secara konsisten.'],
        example: `Dari 12 peserta, 8 menyelesaikan tugas tanpa bantuan dan 4 selesai setelah diberi petunjuk pada filter tanggal.
Median waktu 40 detik dihitung hanya dari 8 peserta mandiri.
Tim hendak memilih perbaikan untuk iterasi berikutnya.`,
        task: ['Ringkasan mana paling berguna dan sesuai dengan bukti?'], options: ['Keberhasilan 100% tanpa hambatan; median semua pengguna 40 detik', 'Keberhasilan 8% karena hanya peserta mandiri yang dihitung', 'Waktu 40 detik membuktikan filter tanggal tidak perlu diperbaiki', 'Keberhasilan mandiri 8/12; median 40 detik hanya untuk kelompok itu, dan filter tanggal perlu diteliti serta diuji ulang'], answer: 3,
        hints: ['Penyebut keberhasilan mandiri tetap seluruh peserta yang mencoba.', 'Kelompok yang diberi bantuan menunjukkan lokasi masalah yang dapat ditindaklanjuti.'],
        explanation: 'Ringkasan terakhir mempertahankan penyebut dan cakupan pengukuran waktu sambil menunjuk hambatan konkret. Menggabungkan hasil berbantuan dengan hasil mandiri akan melebihkan kemudahan penggunaan.', xp: 15
      }
    ]
  },
  {
    id: 'intermediate-lua', trackId: 'lua', title: 'Intermediate Lua', category: 'Game Development', level: 'Menengah', theme: 'blue', symbol: 'Lua',
    description: 'Kuis konsep Lua 5.4 melalui contoh closure leksikal, data jarang, metatable, kegagalan, modul, dan alias table. Kode dibaca sebagai contoh penalaran, bukan dijalankan oleh runtime Lua di kuis.',
    chapters: [
      { title: 'Lingkungan dan Pencarian Nilai', description: 'Menganalisis upvalue bersama, iterasi data jarang, dan kontrak lookup.' },
      { title: 'Batas Perubahan dan Modul', description: 'Memisahkan penanganan kegagalan, kepemilikan instance, dan penyalinan data.' }
    ],
    lessons: [
      {
        id: 'intermediate-lua-01', title: 'Upvalue Bersama dan Bayangan Lokal', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Closure menangkap variabel dari lingkungan leksikal, bukan mencari variabel berdasarkan nama di fungsi pemanggil. Dua fungsi yang dibuat dalam pemanggilan factory yang sama dapat berbagi satu upvalue sehingga perubahan lewat salah satunya terlihat oleh yang lain.', 'Deklarasi local dengan nama yang sama pada scope lain membentuk variabel berbeda. Menelusuri tempat deklarasi lebih andal daripada hanya mengikuti kemiripan nama, khususnya ketika API memisahkan fungsi pembaca dan penulis state privat.'],
        example: `local function buatSaldo()
  local saldo = 10
  return function(n) saldo = saldo + n end,
         function() return saldo end
end
local tambah, baca = buatSaldo()
do
  local saldo = 100
  tambah(5)
end
local hasil = baca()`,
        task: ['Berapa hasil setelah blok do selesai?'], options: ['100', '105', '15', '10'], answer: 2,
        hints: ['tambah dan baca dibuat dalam satu lingkungan buatSaldo.', 'saldo di blok do bukan upvalue milik tambah.'],
        explanation: 'Kedua closure berbagi saldo yang dimulai dari 10 lalu bertambah 5. Variabel lokal 100 hanya membayangi nama pada blok pemanggil dan tidak mengubah ikatan leksikal closure.', xp: 15
      },
      {
        id: 'intermediate-lua-02', title: 'Menjadwalkan Entri Jarang secara Terurut', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Pada table biasa Lua 5.4, ipairs berhenti pada indeks pertama yang nil sehingga tidak cocok untuk jadwal dengan nomor langkah yang sengaja berlubang. Operator # juga bukan penghitung seluruh entri pada table seperti itu karena batas urutannya tidak tunggal.', 'Jika kontrak memerlukan semua entri jarang dalam urutan numerik, kumpulkan kunci lalu urutkan secara eksplisit. pairs memberi akses ke entri yang ada tetapi tidak menjanjikan urutan; daftar kunci terpisah menjadikan aturan penjadwalan dapat diperiksa.'],
        example: `local jadwal = { [2] = "spawn", [7] = "bonus", [10] = "selesai" }
-- Tidak ada metatable; semua kunci integer positif.
-- Isi jadwal tidak berubah selama penelusuran.
-- Semua peristiwa harus diproses berdasarkan nomor langkah yang meningkat.`,
        task: ['Strategi mana memenuhi kontrak penelusuran tersebut?'], options: ['Kumpulkan kunci lewat pairs, table.sort daftar kunci, lalu baca jadwal untuk setiap kunci', 'Gunakan ipairs(jadwal) karena semua kuncinya angka', 'Gunakan pairs(jadwal) dan anggap urutannya selalu meningkat', 'Ulangi indeks 1 sampai #jadwal dan anggap # selalu sama dengan kunci maksimum'], answer: 0,
        hints: ['Menemukan semua kunci dan mengurutkannya adalah dua pekerjaan berbeda.', 'Daftar kunci hasil pengumpulan dapat dibuat padat meskipun table asal jarang.'],
        explanation: 'Pengumpulan dengan pairs diikuti pengurutan menghasilkan urutan 2, 7, 10 tanpa bergantung pada batas table. ipairs akan berhenti sejak indeks 1 yang kosong.', xp: 15
      },
      {
        id: 'intermediate-lua-03', title: 'Fallback yang Menghormati false', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Fungsi __index dapat menerapkan pencarian berlapis ketika field tidak tersimpan langsung pada objek. Dalam konfigurasi, false sering merupakan nilai sah untuk mematikan fitur, bukan tanda bahwa konfigurasi tidak tersedia.', 'Pola nilai or cadangan menyamakan false dengan nil. Untuk lookup yang membedakan keduanya, periksa nil secara eksplisit. Dengan demikian override dapat menonaktifkan fitur meskipun nilai bawaan mengaktifkannya.'],
        example: `local override = { suara = false }
local bawaan = { suara = true }
local config = setmetatable({}, {
  __index = function(_, key)
    local value = override[key]
    return value or bawaan[key]
  end
})`,
        task: ['Pengganti bagian return mana mempertahankan override false dan hanya memakai bawaan ketika override tidak ada?'], options: ['return bawaan[key] or value', 'if value ~= nil then return value end; return bawaan[key]', 'if value then return value end; return bawaan[key]', 'return value and bawaan[key]'], answer: 1,
        hints: ['Nilai tidak tersedia direpresentasikan oleh nil, bukan semua nilai falsy.', 'Syarat value ~= nil menerima false sebagai nilai yang tersedia.'],
        explanation: 'Pemeriksaan eksplisit terhadap nil menjaga false tetap menjadi keputusan pengguna. Kedua pola or dan pemeriksaan if value akan salah menganggap override false tidak tersedia.', xp: 15
      },
      {
        id: 'intermediate-lua-04', title: 'pcall Bukan Transaksi', chapter: 1, type: 'quiz', language: 'text',
        intro: ['pcall membatasi propagasi error dan mengembalikan status keberhasilan, tetapi tidak memutar balik perubahan yang telah dilakukan fungsi. Efek samping sebelum error tetap terjadi pada table yang dirujuk bersama.', 'Operasi yang harus berlaku seluruhnya atau tidak sama sekali perlu strategi sendiri, misalnya memvalidasi dahulu, menghitung pada salinan, lalu melakukan commit. Menangkap error tanpa memeriksa state dapat menyisakan keadaan setengah jadi yang tampak berhasil dipulihkan.'],
        example: `local pemain = { koin = 20, item = nil }
local ok = pcall(function()
  pemain.koin = pemain.koin - 5
  error("item tidak tersedia")
  pemain.item = "obor"
end)`,
        task: ['Apa keadaan ok, pemain.koin, dan pemain.item sesudah pcall?'], options: ['true, 15, "obor"', 'false, 20, nil', 'true, 20, nil', 'false, 15, nil'], answer: 3,
        hints: ['Pengurangan koin terjadi sebelum error.', 'Baris setelah error tidak dijalankan, tetapi perubahan terdahulu tidak dibatalkan.'],
        explanation: 'pcall menghasilkan false, koin tetap 15, dan item tetap nil. Jika pengurangan harus dibatalkan saat item gagal diperoleh, kontrak transaksi harus diimplementasikan secara terpisah.', xp: 15
      },
      {
        id: 'intermediate-lua-05', title: 'Modul sebagai Factory, Bukan Sesi Bersama', chapter: 1, type: 'quiz', language: 'text',
        intro: ['require menggunakan package.loaded untuk menyimpan hasil pemuatan modul. Bila modul mengembalikan satu table state, pemanggil dengan nama modul yang sama biasanya memperoleh referensi table itu lagi, bukan instance baru.', 'Modul yang menyediakan factory dapat memisahkan kode yang dibagikan dari state per sesi. Ini lebih jelas daripada menghapus cache modul untuk memaksa pemuatan ulang, yang dapat mengulangi efek inisialisasi dan menghasilkan hubungan dependensi yang sulit diprediksi.'],
        example: `-- Asumsi Lua 5.4: package.loaded tidak diubah dan loader mengembalikan table berikut.
-- Isi konseptual modul inventori:
return { barang = {} }

-- Dua konsumen:
local a = require("inventori")
local b = require("inventori")
a.barang[1] = "peta"
-- Kedua konsumen seharusnya memiliki inventori mandiri.`,
        task: ['Perubahan API mana paling tepat untuk memisahkan state kedua konsumen?'], options: ['Ganti nama lokal a menjadi inventoriA tanpa mengubah modul', 'Panggil require dengan nama sama dua kali lagi agar cache habis', 'Ekspor fungsi new yang membuat table barang baru, lalu panggil new untuk setiap konsumen', 'Pindahkan barang menjadi global agar semua konsumen dapat mengaksesnya'], answer: 2,
        hints: ['Nama variabel berbeda tidak berarti objek hasil require berbeda.', 'State mandiri perlu dibuat pada setiap pembuatan instance, bukan sekali saat modul dimuat.'],
        explanation: 'Factory membuat inventori baru sambil tetap menggunakan cache modul untuk kode API. Menghapus cache atau mengganti nama lokal tidak merupakan kontrak kepemilikan state yang baik.', xp: 15
      },
      {
        id: 'intermediate-lua-06', title: 'Salinan Bertingkat Sesuai Kepemilikan', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Menyalin pasangan key-value ke table baru menghasilkan salinan dangkal. Field yang berisi table masih menyimpan referensi ke objek lama, sehingga mengganti field luar berbeda dari memodifikasi isi field bersarang.', 'Salinan mendalam generik tidak selalu merupakan solusi terbaik karena graf dapat memiliki siklus, metatable, atau objek yang sengaja dibagikan. Untuk struktur kecil dengan kontrak jelas, salin cabang yang harus mandiri dan tetap bagikan cabang yang memang tidak boleh diubah.'],
        example: `local awal = { nama = "Nara", posisi = { x = 1, y = 2 } }
local salin = {}
for k, v in pairs(awal) do salin[k] = v end
-- Sisipkan satu baris di sini agar posisi salin mandiri.
salin.posisi.x = 9
-- Syarat: awal.posisi.x tetap 1 dan salin.posisi.y tetap 2.`,
        task: ['Baris mana memenuhi syarat untuk struktur ini?'], options: ['salin.posisi = { x = awal.posisi.x, y = awal.posisi.y }', 'salin.posisi = awal.posisi', 'salin = awal', 'salin.posisi = { x = awal.posisi.x }'], answer: 0,
        hints: ['Table posisi harus dibuat ulang, bukan hanya diberi nama baru.', 'Koordinat y juga bagian data yang wajib dipertahankan.'],
        explanation: 'Table posisi baru dengan x dan y memisahkan cabang mutable yang relevan. Penugasan referensi tetap membuat alias, sedangkan menyalin x saja melanggar syarat mempertahankan y.', xp: 15
      }
    ]
  },
  {
    id: 'expert-react', trackId: 'react', title: 'Expert React', category: 'Web Development', level: 'Expert', theme: 'blue', symbol: 'Re',
    description: 'Kuis konsep React 19 tentang identitas state, race, external store, memoization, kemurnian render, dan UI komposit aksesibel. Contoh hipotetis tidak menjalankan React, DOM, atau permintaan jaringan di kuis.',
    chapters: [
      { title: 'Identitas dan Sinkronisasi', description: 'Menentukan umur state dan menjaga hasil asinkron serta sumber data eksternal tetap konsisten.' },
      { title: 'Ketepatan Render dan Interaksi', description: 'Memeriksa kontrak optimasi, render yang dapat dibatalkan, dan navigasi komponen aksesibel.' }
    ],
    lessons: [
      {
        id: 'expert-react-01', title: 'Batas Identitas untuk Draft Akun', chapter: 0, type: 'quiz', language: 'text',
        intro: ['React menghubungkan state dengan posisi komponen dalam tree, tipe, dan key yang relevan. Mengganti props tidak otomatis mengulangi initializer useState. Untuk editor dengan draft lokal, keputusan apakah state dipertahankan atau direset harus mengikuti identitas dokumen yang sedang diedit.', 'Key dapat digunakan sebagai batas reset seluruh subtree yang disengaja. Namun key acak pada setiap render akan membuang state terlalu sering. Gunakan identitas stabil ketika aturan produk menyatakan draft lama harus dibuang saat berpindah entitas.'],
        example: `function Editor({ account }) {
  const [draft, setDraft] = useState(account.name);
  return <input value={draft} onChange={e => setDraft(e.target.value)} />;
}
// Kebijakan: pindah akun membuang draft lama; render ulang akun yang sama mempertahankannya.
// Parent menampilkan satu Editor pada posisi tree yang tetap.`,
        task: ['Pemanggilan parent mana sesuai dengan kebijakan identitas tersebut?'], options: ['<Editor account={account} key={Math.random()} />', '<Editor account={account} key={account.id} />', '<Editor account={account} key="editor" />', '<Editor account={account} key={account.name.length} />'], answer: 1,
        hints: ['Key harus berubah saat akun berubah, bukan saat render biasa terjadi.', 'Nama atau panjang nama bukan identitas akun yang unik dan stabil.'],
        explanation: 'account.id mereset subtree hanya ketika identitas akun berganti. Key konstan mempertahankan draft lama, sedangkan key acak membuat setiap render kehilangan state dan berpotensi kehilangan fokus.', xp: 15
      },
      {
        id: 'expert-react-02', title: 'Hasil Asinkron dari Closure Lama', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Setiap setup effect membentuk closure dengan nilai dari render terkait. Jika operasi asinkron untuk pilihan A selesai setelah pilihan B, callback A masih membawa konteks lama. Urutan penyelesaian tidak harus sama dengan urutan permintaan.', 'Cleanup dapat menandai hasil setup lama sebagai tidak lagi relevan. Penanda harus lokal untuk setiap setup, bukan satu flag global yang diaktifkan kembali oleh setup berikutnya. Updater state fungsional membantu membaca state terkini, tetapi tidak dengan sendirinya memvalidasi relevansi hasil terhadap pilihan aktif.'],
        example: `// React 19; loadMock stabil dan hanya mengembalikan Promise data lokal.
useEffect(() => {
  let ignore = false;
  loadMock(selectedId).then(result => {
    if (!ignore) setDetails(result);
  });
  return () => { ignore = true; };
}, [selectedId]);
// A dipilih, lalu B. B selesai lebih dahulu, A selesai paling akhir.
// Semua Promise berhasil; hasil lama tidak perlu ditampilkan.`,
        task: ['Mengapa hasil A tidak menimpa detail B dalam skenario ini?'], options: ['React otomatis membatalkan semua Promise dari effect lama', 'setDetails selalu mengurutkan pembaruan menurut selectedId', 'Dependency array membuat semua callback membaca selectedId terbaru', 'Cleanup setup A mengubah ignore milik closure A sehingga callback A melewati setDetails'], answer: 3,
        hints: ['Setiap pemanggilan setup memiliki variabel ignore sendiri.', 'Mengabaikan hasil berbeda dari menghentikan pekerjaan yang menghasilkan Promise.'],
        explanation: 'Cleanup menandai closure A sebagai usang, sehingga hasilnya tidak dipakai. Pekerjaan Promise dapat tetap selesai; aplikasi nyata juga memerlukan jalur error dan, jika didukung sumbernya, pembatalan pekerjaan.', xp: 15
      },
      {
        id: 'expert-react-03', title: 'Snapshot External Store yang Stabil', chapter: 0, type: 'quiz', language: 'text',
        intro: ['useSyncExternalStore menyediakan kontrak untuk membaca state di luar React secara konsisten dengan render. subscribe memasang notifikasi dan mengembalikan fungsi unsubscribe, sedangkan getSnapshot mengembalikan representasi state yang dapat dibandingkan oleh React.', 'Jika isi store tidak berubah, pemanggilan getSnapshot berulang harus memberikan nilai yang stabil menurut Object.is. Membuat objek baru tanpa perubahan dapat memicu pembaruan berulang; memodifikasi satu objek tanpa mengganti identitasnya juga dapat menyembunyikan perubahan. Snapshot immutable yang di-cache menyelesaikan kedua persoalan.'],
        example: `// Asumsi: aplikasi client-only React 19; subscribe stabil dan mengembalikan unsubscribe.
let snapshot = { count: 0 };
const getSnapshot = () => ({ ...snapshot });
function increment() {
  snapshot = { count: snapshot.count + 1 };
  emitChange();
}
const value = useSyncExternalStore(subscribe, getSnapshot);`,
        task: ['Perubahan mana memperbaiki kontrak snapshot tanpa mengubah cara increment bekerja?'], options: ['Jadikan getSnapshot = () => snapshot karena objek itu hanya diganti ketika state berubah', 'Bekukan hasil pertama selamanya dan abaikan increment', 'Kembalikan Math.random() agar React selalu mengetahui store hidup', 'Mutasikan snapshot.count dan tetap kembalikan satu objek lama untuk semua perubahan'], answer: 0,
        hints: ['increment sudah membuat objek baru saat data berubah.', 'Pelanggaran saat ini berasal dari salinan baru pada setiap pembacaan, bahkan tanpa perubahan data.'],
        explanation: 'Mengembalikan snapshot yang tersimpan menjaga identitas di antara perubahan dan menggantinya saat increment. Untuk SSR atau hidrasi, kontrak getServerSnapshot juga perlu dirancang; contoh ini sengaja client-only.', xp: 15
      },
      {
        id: 'expert-react-04', title: 'Comparator Memo dan Perilaku Callback', chapter: 1, type: 'quiz', language: 'text',
        intro: ['memo merupakan optimasi, bukan cara memperbaiki logika state. Comparator khusus hanya boleh menyatakan props setara ketika keluaran dan perilakunya memang sama. Fungsi prop dapat menutup nilai parent, sehingga mengabaikan identitas callback bisa mempertahankan closure lama.', 'Membandingkan hanya properti visual sering melewatkan perilaku saat klik. Pilih perbandingan bawaan terlebih dahulu, lalu ukur kebutuhan optimasi. Jika memakai comparator khusus, periksa setiap prop yang memengaruhi tampilan maupun interaksi, termasuk fungsi.'],
        example: `const SaveButton = memo(
  ({ label, onSave }) => <button onClick={onSave}>{label}</button>,
  (prev, next) => prev.label === next.label
);
// Parent membuat callback baru ketika documentId berubah:
<SaveButton label="Simpan" onSave={() => saveMock(documentId)} />
// documentId berubah dari A ke B; label tetap sama.`,
        task: ['Perbaikan mana menjaga tombol menyimpan dokumen yang sedang dipilih?'], options: ['Pertahankan comparator karena label adalah satu-satunya props yang digambar', 'Pakai useCallback dengan dependency kosong agar callback selalu beridentitas sama', 'Hapus comparator khusus atau bandingkan onSave juga sehingga perubahan perilaku memicu render', 'Mutasikan documentId pada objek DOM tombol tanpa memperbarui props'], answer: 2,
        hints: ['Callback dari render A masih membawa documentId A.', 'Kesetaraan props harus mencakup perilaku, bukan hanya teks tombol.'],
        explanation: 'Comparator yang mengabaikan onSave dapat mempertahankan handler untuk A. Perbandingan bawaan akan mendeteksi fungsi baru; comparator khusus yang benar juga tidak boleh mengabaikan perubahan fungsi tersebut.', xp: 15
      },
      {
        id: 'expert-react-05', title: 'Render yang Tidak Pernah Di-commit', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Pada React 19, render harus murni karena pekerjaan dapat diulang atau ditinggalkan sebelum commit. Menulis ke koleksi eksternal di badan komponen membuat jejak yang tidak dapat dibatalkan React, bahkan jika hasil UI tidak pernah ditampilkan.', 'Efek samping perlu ditempatkan sesuai peristiwa yang dimaksud. Jika catatan bermakna niat klik pengguna, tulis dalam event handler terkait. Jika bermakna sinkronisasi setelah commit, effect memerlukan setup dan cleanup yang sesuai; effect juga bukan jaminan eksekusi tepat satu kali.'],
        example: `const audit = [];
function SearchPanel({ query }) {
  audit.push({ event: "search-click", query });
  return <Results query={query} />;
}
// Audit dimaksudkan mencatat satu niat pencarian per klik tombol Cari.
// Render dapat diulang atau dibatalkan sebelum commit.`,
        task: ['Di mana pencatatan niat tersebut seharusnya dilakukan?'], options: ['Di useMemo agar mutasi audit menjadi bagian cache render', 'Di event handler tombol Cari, bukan di badan render', 'Di initializer useState agar pasti berjalan satu kali sepanjang aplikasi', 'Tetap di render dengan mematikan Strict Mode sebagai jaminan'], answer: 1,
        hints: ['Makna catatan adalah tindakan pengguna tertentu, bukan keberhasilan render.', 'Optimasi dan pengaturan mode pengembangan tidak mengubah kontrak kemurnian render.'],
        explanation: 'Handler Cari sesuai dengan kejadian yang ingin dicatat. Mutasi saat render dapat menghasilkan catatan untuk pekerjaan yang dibatalkan; useMemo maupun initializer tidak memberi jaminan efek samping tepat satu kali.', xp: 15
      },
      {
        id: 'expert-react-06', title: 'Fokus dan Pilihan pada Listbox', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Komponen komposit perlu membedakan fokus keyboard dari pilihan data. Dalam pola listbox dengan roving tabindex, satu option menjadi titik tab internal aktif, sementara tombol panah memindahkan fokus sesuai kontrak yang dipilih. Atribut ARIA saja tidak mengimplementasikan perilaku keyboard.', 'Pilihan dapat mengikuti fokus atau dikonfirmasi secara manual; pilih satu pola dan komunikasikan konsisten. Contoh ini memakai pilihan manual agar perpindahan fokus tidak langsung mengganti pratinjau mahal. Nama aksesibel, indikator fokus, serta aria-selected harus merefleksikan peran masing-masing.'],
        example: `Listbox berlabel "Tema pratinjau" memiliki option A, B, C; semuanya aktif.
Pola yang ditetapkan: roving tabindex, panah memindah fokus, Enter atau Space memilih.
Awalnya A dipilih dan terfokus. Pengguna menekan ArrowDown sekali.
Implementasi mengatur fokus DOM langsung pada option, bukan aria-activedescendant.`,
        task: ['State mana sesuai dengan pola setelah ArrowDown?'], options: ['B terfokus dan langsung dipilih; A tidak dipilih', 'A tetap terfokus, tetapi B dipilih tanpa perpindahan fokus', 'Semua option memiliki tabIndex=0 agar panah bekerja', 'B terfokus dengan tabIndex=0, A tabIndex=-1 tetapi masih aria-selected=true'], answer: 3,
        hints: ['Navigasi fokus tidak sama dengan konfirmasi pilihan pada pola manual.', 'Roving tabindex mempertahankan satu titik masuk Tab di dalam komposit.'],
        explanation: 'Fokus berpindah ke B, tetapi pilihan tetap A sampai Enter atau Space. Mengganti aria-selected saat panah ditekan akan melanggar pola pilihan manual yang dinyatakan dalam skenario.', xp: 15
      }
    ]
  },
  {
    id: 'expert-nodejs', trackId: 'nodejs', title: 'Expert Node.js', category: 'Web Development', level: 'Expert', theme: 'green', symbol: 'Node',
    description: 'Kuis konsep Node.js dengan API standar queueMicrotask, stream, AbortSignal, dan worker_threads. Semua contoh berupa analisis kode atau skenario lokal; kuis tidak menjalankan server, koneksi jaringan, maupun runtime Node.js.',
    chapters: [
      { title: 'Penjadwalan dan Aliran Terkendali', description: 'Menalar kelangsungan event loop, backpressure, dan propagasi kegagalan serta pembatalan.' },
      { title: 'Batas Pekerjaan dan Umur Proses', description: 'Merancang idempotensi, pemisahan pekerjaan CPU, dan shutdown yang memberi batas waktu.' }
    ],
    lessons: [
      {
        id: 'expert-nodejs-01', title: 'Microtask yang Tidak Memberi Giliran', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Callback microtask yang terus menjadwalkan microtask baru dapat menahan event loop dari melanjutkan fase lain. Memecah pekerjaan menjadi Promise atau queueMicrotask tidak otomatis memberi kesempatan timer dan callback I/O berjalan.', 'Untuk pekerjaan yang dapat dicicil, batasi banyak unit per giliran dan jadwalkan kelanjutan dengan mekanisme yang mengembalikan kendali ke event loop, seperti setImmediate. Ini berbeda dari memindahkan pekerjaan CPU berat ke worker; pencicilan tetap memakai thread JavaScript yang sama.'],
        example: `function pump() {
  processOneLocalJob(); // Satu pekerjaan pendek; antrean diasumsikan selalu berisi.
  queueMicrotask(pump);
}
queueMicrotask(pump);
setTimeout(reportProgress, 0);
// Contoh konseptual, tanpa I/O atau server nyata.`,
        task: ['Perubahan mana paling langsung mencegah starvation sambil mempertahankan pemrosesan bertahap?'], options: ['Proses sejumlah pekerjaan terbatas, lalu jadwalkan batch berikutnya dengan setImmediate', 'Ganti queueMicrotask dengan Promise.resolve().then pada setiap pekerjaan', 'Tambahkan lebih banyak timer tanpa mengubah pump', 'Proses seluruh antrean tak berujung dalam satu while loop'], answer: 0,
        hints: ['Mengganti satu sumber microtask dengan sumber microtask lain tidak memberi giliran baru.', 'Batch harus dibatasi agar callback yang sedang berjalan juga segera selesai.'],
        explanation: 'Batch terbatas dengan setImmediate mengembalikan kendali sehingga event loop dapat maju. Rantai microtask tak berujung dapat membuat reportProgress tidak mendapat kesempatan berjalan.', xp: 15
      },
      {
        id: 'expert-nodejs-02', title: 'write false Tetap Menerima Chunk', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Pada Writable standar Node.js, write(chunk) yang mengembalikan false memberi sinyal agar produsen berhenti menambahkan data sampai kapasitas pulih. Nilai false bukan penolakan chunk; chunk itu sudah diterima ke mekanisme penulisan atau buffer.', 'Backpressure menjaga laju produsen tidak terus melampaui konsumen. Setelah sinyal drain, lanjutkan dari chunk berikutnya, bukan mengulang chunk terakhir. Jalur error dan abort juga harus ditangani agar produsen tidak menunggu drain selamanya ketika stream gagal.'],
        example: `Sebuah Writable lokal menerima chunk A, B, C secara berurutan.
write(A) menghasilkan true; write(B) menghasilkan false.
Tidak ada error, abort, atau end selama menunggu. Chunk C belum dikirim.
Kemudian event drain diterima.`,
        task: ['Apa tindakan produsen yang benar sesudah drain?'], options: ['Kirim B lagi karena false berarti B ditolak', 'Buang C karena buffer pernah penuh', 'Lanjutkan dengan C tanpa mengirim ulang B', 'Kirim ulang A dan B untuk membangun ulang urutan'], answer: 2,
        hints: ['Bedakan penerimaan chunk dari izin menambah chunk berikutnya.', 'Backpressure tidak menyediakan protokol deduplikasi otomatis.'],
        explanation: 'B sudah diterima sehingga produsen melanjutkan dengan C. Mengulang B akan menggandakan data, sedangkan mengabaikan sinyal false dan terus menulis dapat membuat buffer membesar.', xp: 15
      },
      {
        id: 'expert-nodejs-03', title: 'Satu Jalur Error dan Abort untuk Pipeline', chapter: 0, type: 'quiz', language: 'text',
        intro: ['stream.pipeline menghubungkan tahap stream sekaligus mengelola propagasi kegagalan dan teardown. Varian Promise dari node:stream/promises dapat di-await sehingga keberhasilan atau kegagalan seluruh aliran masuk ke satu jalur penanganan.', 'AbortSignal menyampaikan permintaan pembatalan, tetapi pekerjaan tambahan di luar protokol stream harus ikut menghormatinya. Contoh ini mengasumsikan stream standar tanpa tugas eksternal tersembunyi. Penanganan error perlu membedakan penyelesaian normal dari pembatalan atau kerusakan transformasi.'],
        example: `import { pipeline } from "node:stream/promises";
const controller = new AbortController();
try {
  await pipeline(source, transform, sink, { signal: controller.signal });
  markComplete();
} catch (error) {
  recordFailure(error);
}
// Node.js modern dengan dukungan pipeline Promise dan AbortSignal.
// Ketiga stream lokal belum selesai ketika controller.abort() dipanggil.`,
        task: ['Hasil mana sesuai dengan kontrak pembatalan pipeline tersebut?'], options: ['markComplete tetap dipanggil karena abort dianggap end normal', 'Pipeline menolak dengan AbortError, menghancurkan stream terkait yang belum selesai, dan masuk catch', 'Hanya source berhenti; sink pasti dibiarkan terbuka tanpa teardown', 'Signal otomatis membatalkan semua pekerjaan JavaScript lain di proses'], answer: 1,
        hints: ['Abort bukan penanda bahwa seluruh data berhasil diproses.', 'Cakupan pipeline adalah stream yang dihubungkan, bukan setiap tugas dalam proses.'],
        explanation: 'Pembatalan menyebabkan pipeline gagal dengan AbortError dan melakukan teardown stream terkait. markComplete dilewati; pekerjaan di luar pipeline tetap memerlukan mekanisme pembatalan sendiri.', xp: 15
      },
      {
        id: 'expert-nodejs-04', title: 'Idempotensi Memerlukan Klaim Atomik', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Kunci idempotensi menghubungkan percobaan ulang operasi dengan satu hasil logis. Menyimpan respons setelah selesai saja belum mencegah dua permintaan serentak melakukan efek yang sama sebelum salah satunya menulis cache hasil.', 'Rancangan perlu klaim atomik atas kunci yang dicakup identitas pemilik serta fingerprint payload. Status sedang diproses dan selesai harus didefinisikan, dan payload berbeda dengan kunci sama tidak boleh dianggap percobaan ulang yang sah. Konsistensi efek dan catatan idempotensi saat crash juga merupakan bagian kontrak.'],
        example: `Skenario lokal tanpa server: dua handler simulasi milik akun yang sama menerima kunci K dan payload identik.
Keduanya membaca cache hasil kosong sebelum operasi penambahan kredit selesai.
Penyimpanan simulasi mendukung transaksi atomik untuk klaim, efek kredit, dan catatan hasil.`,
        task: ['Rancangan mana paling tepat mencegah kredit ganda pada skenario tersebut?'], options: ['Biarkan keduanya memproses lalu simpan respons yang selesai terakhir', 'Gunakan timestamp baru sebagai kunci untuk setiap percobaan ulang', 'Simpan hanya boolean selesai setelah efek tanpa memeriksa payload atau konkurensi', 'Klaim kunci scoped secara atomik, validasi fingerprint, izinkan satu pemroses, lalu commit efek dan hasil secara konsisten'], answer: 3,
        hints: ['Dua pembacaan cache kosong bukan bukti bahwa hanya satu pemroses akan berjalan.', 'Kunci sama dengan isi berbeda harus mempunyai respons konflik yang jelas.'],
        explanation: 'Klaim atomik menutup race awal, sedangkan transaksi menjaga efek dan hasil tidak terpisah saat gagal. Pemanggil duplikat dapat menunggu atau menerima status sedang diproses sesuai kontrak, lalu menggunakan hasil yang sama.', xp: 15
      },
      {
        id: 'expert-nodejs-05', title: 'Batas CPU pada Worker Thread', chapter: 1, type: 'quiz', language: 'text',
        intro: ['worker_threads menjalankan JavaScript pada thread lain sehingga komputasi CPU panjang tidak harus menahan event loop utama. Menambahkan async pada fungsi sinkron tidak memindahkan perhitungannya; kode tetap memakai thread pemanggil sampai benar-benar menyerahkan kendali.', 'Pemisahan kerja mempunyai biaya startup dan transfer data. Pool dengan jumlah worker serta antrean terbatas lebih terkendali untuk banyak pekerjaan daripada membuat worker tanpa batas. Objek pesan umumnya melalui structured clone kecuali memakai transfer atau memori bersama secara eksplisit.'],
        example: `Aplikasi analisis lokal menerima banyak tugas pencarian jalur yang masing-masing memakai CPU sekitar 200 ms.
UI pelaporan proses harus tetap responsif; input tugas berupa data yang dapat di-clone.
Tidak ada permintaan jaringan. Pengukuran menunjukkan komputasi jauh lebih mahal daripada pengiriman datanya.`,
        task: ['Pendekatan mana paling sesuai dengan batas kerja tersebut?'], options: ['Gunakan pool worker_threads terbatas dengan antrean berbatas dan kirim data tugas, bukan closure', 'Bungkus seluruh loop CPU dalam async function dan panggil di thread utama', 'Jadwalkan tiap loop lengkap melalui queueMicrotask agar otomatis paralel', 'Buat worker baru tanpa batas untuk semua tugas agar tidak perlu mengatur antrean'], answer: 0,
        hints: ['Concurrency Promise tidak identik dengan paralelisme CPU.', 'Jumlah pekerjaan yang diterima perlu disesuaikan dengan kapasitas worker.'],
        explanation: 'Pool memisahkan komputasi CPU dari event loop utama sambil mengendalikan overhead dan antrean. Fungsi async atau microtask tidak memindahkan loop sinkron ke thread lain.', xp: 15
      },
      {
        id: 'expert-nodejs-06', title: 'Shutdown dengan Batas Waktu', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Graceful shutdown adalah protokol penghentian, bukan satu pemanggilan process.exit(). Proses terlebih dahulu berhenti menerima pekerjaan baru, kemudian memberi pekerjaan yang sudah diterima kesempatan selesai sebelum sumber daya ditutup.', 'Menunggu tanpa batas juga tidak aman ketika suatu tugas macet. Tetapkan deadline, batalkan sisa pekerjaan secara kooperatif, tutup worker atau resource, dan bersihkan timer. Guard idempoten mencegah sinyal penghentian kedua memulai rangkaian cleanup yang tumpang tindih.'],
        example: `Simulasi proses lokal memiliki antrean masuk, dua pekerjaan aktif, pool worker, dan timer status.
Sinyal penghentian dapat diterima lebih dari sekali.
Kebijakan memberi pekerjaan aktif maksimal 5 detik untuk selesai; tidak ada server atau socket nyata.`,
        task: ['Urutan penghentian mana paling sesuai dengan kebijakan itu?'], options: ['Panggil process.exit(0), lalu coba menyimpan hasil pekerjaan aktif', 'Tetap terima pekerjaan selama menunggu antrean kosong tanpa deadline', 'Aktifkan guard shutdown, tutup penerimaan, tunggu sampai deadline, batalkan sisa, tutup resource serta timer, lalu akhiri dengan status yang sesuai', 'Hentikan timer saja dan biarkan pool worker serta antrean tetap aktif'], answer: 2,
        hints: ['Antrean tidak dapat terkuras bila pekerjaan baru terus diterima.', 'Deadline dan cleanup harus berlaku juga pada pekerjaan yang tidak selesai normal.'],
        explanation: 'Urutan tersebut membatasi durasi sekaligus melindungi pekerjaan yang sudah diterima. process.exit langsung dapat memotong penyelesaian atau output; menunggu tanpa deadline dapat membuat proses tidak pernah berhenti.', xp: 15
      }
    ]
  },
  {
    id: 'expert-p5js', trackId: 'p5js', title: 'Expert p5.js', category: 'Game Development', level: 'Expert', theme: 'pink', symbol: 'p5',
    description: 'Kuis konsep simulasi p5.js: determinisme, timestep tetap, partisi ruang, buffer, kepadatan piksel, dan invers transformasi. Contoh dianalisis secara konseptual tanpa menjalankan sketch atau renderer langsung.',
    chapters: [
      { title: 'Simulasi yang Dapat Diulang', description: 'Menetapkan kontrak determinisme, langkah waktu, dan pencarian tetangga.' },
      { title: 'Biaya Gambar dan Ruang Input', description: 'Memisahkan sumber dan tujuan buffer serta menghitung biaya piksel dan koordinat interaksi.' }
    ],
    lessons: [
      {
        id: 'expert-p5js-01', title: 'Seed Tidak Menggantikan Protokol Replay', chapter: 0, type: 'quiz', language: 'text',
        intro: ['randomSeed mengatur urutan pseudoacak milik random, sedangkan noiseSeed mengatur pola noise. Keduanya merupakan sumber yang berbeda. Menyetel seed sekali pada awal run membuat kondisi awal dapat diulang, tetapi tidak menyamakan jumlah pemanggilan atau urutan pembaruan secara otomatis.', 'Replay yang dapat diperiksa juga membutuhkan versi algoritme yang sama, langkah simulasi yang sama, dan input yang dikaitkan dengan tick. Jangan mengambil angka acak simulasi pada render yang frekuensinya berubah, karena jumlah frame akan menggeser urutan angka yang dikonsumsi.'],
        example: `Dua run memakai versi p5.js dan data awal yang sama.
Keduanya memanggil randomSeed(42), tetapi memakai noise tanpa noiseSeed.
Setiap draw mengambil random untuk gerak partikel; input disimpan berdasarkan frame render.
Run pertama menggambar 60 frame per detik, run kedua 30.`,
        task: ['Paket perubahan mana paling tepat untuk membuat replay simulasi dapat diulang dalam lingkungan yang sama?'], options: ['Panggil randomSeed(42) di setiap draw tanpa mengubah input', 'Seed random dan noise pada awal run, konsumsi acak dalam tick tetap berurutan, serta rekam input menurut tick', 'Tambahkan frameRate(60) dan anggap semua perangkat pasti menghasilkan jumlah frame identik', 'Ganti seed setiap frame menggunakan waktu nyata agar kedua run mengikuti jam'], answer: 1,
        hints: ['Seed hanya menentukan urutan sumber acak, bukan kapan urutan itu dikonsumsi.', 'Input dan simulasi perlu memakai garis waktu yang tidak bergantung pada frekuensi gambar.'],
        explanation: 'Determinisme memerlukan seed untuk kedua sumber, urutan pembaruan tetap, dan input bertanda tick. Ini bukan janji hasil bit-identik lintas versi atau semua platform; asumsi lingkungan yang sama tetap penting.', xp: 15
      },
      {
        id: 'expert-p5js-02', title: 'Accumulator Menyimpan Sisa Waktu', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Simulasi fixed timestep mengonsumsi waktu melalui langkah dengan durasi tetap, terpisah dari jumlah render. Accumulator menampung waktu yang belum diproses sehingga frame pendek dapat digabungkan dan frame panjang dapat menjalankan beberapa tick.', 'Batas langkah per frame mencegah kerja catch-up membesar tanpa kendali. Kebijakan untuk backlog harus eksplisit: menyimpan sisa mempertahankan utang waktu, sedangkan membuangnya mengurangi ketertinggalan dengan mengorbankan waktu simulasi. Interpolasi tampilan tidak boleh mengubah state otoritatif tick.'],
        example: `const stepMs = 10;
let accumulator = 5;
accumulator += 32; // Selang frame berikutnya.
let steps = 0;
while (accumulator >= stepMs && steps < 5) {
  simulate(stepMs / 1000);
  accumulator -= stepMs;
  steps++;
}
// Tidak ada penghapusan backlog atau perubahan lain.`,
        task: ['Berapa jumlah pemanggilan simulate dan sisa accumulator?'], options: ['4 pemanggilan dan sisa 0 ms', '5 pemanggilan dan sisa -13 ms', '3 pemanggilan dan sisa 2 ms', '3 pemanggilan dan sisa 7 ms'], answer: 3,
        hints: ['Waktu tersedia adalah sisa lama ditambah selang baru.', 'Loop hanya mengonsumsi kelipatan penuh 10 ms dan tidak membulatkan ke atas.'],
        explanation: 'Accumulator berisi 37 ms, sehingga tiga tick mengonsumsi 30 ms dan menyisakan 7 ms. Sisa itu dapat digabungkan dengan frame berikutnya; batas lima langkah belum tercapai.', xp: 15
      },
      {
        id: 'expert-p5js-03', title: 'Tetangga di Seberang Batas Sel', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Partisi grid mengurangi kandidat interaksi dibandingkan membandingkan semua pasangan partikel. Namun grid hanyalah broad phase: objek dalam sel berbeda masih dapat berdekatan, sedangkan objek pada sel sama belum tentu memenuhi batas jarak interaksi.', 'Untuk partikel titik dengan radius pencarian paling besar sama dengan lebar sel, periksa sel sendiri dan delapan sel tetangga pada grid 2D. Sesudah itu lakukan uji jarak sebenarnya dan hindari memproses pasangan yang sama dua kali jika efeknya simetris.'],
        example: `Lebar sel = 20 unit; radius interaksi = 10 unit.
Partikel A berada di (19, 10), B di (21, 10).
Indeks sel dihitung dengan floor(x / 20), floor(y / 20).
Implementasi hanya membandingkan partikel yang memiliki indeks sel identik.`,
        task: ['Perbaikan mana menghindari interaksi A dan B terlewat tanpa kembali memeriksa semua pasangan global?'], options: ['Periksa sel sendiri dan tetangga, lalu saring berdasarkan jarak 10 serta deduplikasi pasangan', 'Anggap semua partikel di sel berbeda pasti berjarak lebih dari 20', 'Perbesar radius gambar tanpa mengubah pencarian kandidat', 'Pilih hanya partikel dengan indeks array bersebelahan sebagai pasangan'], answer: 0,
        hints: ['Batas sel bukan dinding fisik; A dan B hanya terpisah dua unit.', 'Seleksi kandidat spasial tetap perlu diikuti pemeriksaan jarak yang tepat.'],
        explanation: 'A dan B berada di sel bersebelahan tetapi berjarak 2, sehingga keduanya harus menjadi kandidat. Pemeriksaan tetangga mempertahankan penyaringan spasial, dan uji jarak mencegah kandidat jauh dianggap berinteraksi.', xp: 15
      },
      {
        id: 'expert-p5js-04', title: 'Buffer Bergantian untuk Umpan Balik', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Efek jejak dapat dibentuk dari gambar frame sebelumnya yang diredupkan, kemudian ditambah objek baru. Ketika algoritme membutuhkan sumber lama yang tetap utuh sepanjang langkah, gunakan dua buffer terpisah agar pembacaan dan penulisan tidak saling mengubah masukan.', 'Pola ping-pong menetapkan satu buffer sebagai sumber dan yang lain sebagai tujuan, lalu menukar perannya setelah langkah selesai. Buffer tujuan dibersihkan sebelum diisi ulang. Keduanya dialokasikan sekali dan diperbarui ukurannya saat diperlukan, bukan dibuat ulang setiap frame.'],
        example: `Dua p5.Graphics 2D, A dan B, sudah berukuran sama.
Awal frame: A menyimpan jejak sebelumnya; B berisi data lama yang tidak relevan.
Algoritme konseptual membutuhkan seluruh gambar A sebagai sumber stabil untuk peredupan dan komposisi.`,
        task: ['Urutan operasi mana sesuai dengan kontrak sumber stabil?'], options: ['Bersihkan A, lalu salin A ke B dan tampilkan B', 'Tulis hasil bertahap ke A sambil terus mengambil sumber dari A yang sama', 'Bersihkan B, komposisikan A yang diredupkan ke B, gambar objek baru di B, tampilkan B, lalu tukar referensi', 'Buat A dan B merujuk p5.Graphics yang sama untuk menghemat seluruh penyimpanan'], answer: 2,
        hints: ['Buffer sumber tidak boleh berubah sebelum semua pembacaan langkah selesai.', 'Menukar referensi berbeda dari menyalin seluruh piksel kembali ke buffer lama.'],
        explanation: 'Menulis ke B sambil hanya membaca A menjaga sumber tetap utuh. Setelah penukaran, hasil B menjadi sumber frame berikutnya; alias pada satu buffer akan menghilangkan pemisahan tersebut.', xp: 15
      },
      {
        id: 'expert-p5js-05', title: 'Kepadatan Piksel Mengalikan Biaya', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Ukuran logis kanvas berbeda dari jumlah piksel backing store. Pada kanvas 2D dengan kepadatan d, lebar dan tinggi fisik sama-sama dikalikan d, sehingga jumlah piksel meningkat menurut d kuadrat.', 'Operasi loadPixels dan updatePixels yang mengolah seluruh kanvas dapat mahal pada layar berkepadatan tinggi. Mengurangi pixelDensity menjadi 1 dapat mengurangi data yang diproses dengan tradeoff ketajaman; keuntungan waktu nyata tetap harus diukur karena ada biaya lain di luar array piksel.'],
        example: `Asumsi: kanvas p5.js 2D logis 800 × 600, format RGBA 8-bit empat byte per piksel.
Bandingkan backing store pada pixelDensity(2) dan pixelDensity(1).
Perhitungan hanya mencakup satu array RGBA, tanpa overhead objek, buffer lain, atau salinan GPU.`,
        task: ['Perubahan jumlah byte mana benar ketika density diturunkan dari 2 ke 1?'], options: ['Dari 3.840.000 menjadi 1.920.000 byte, turun dua kali', 'Dari 7.680.000 menjadi 1.920.000 byte, menjadi seperempat', 'Dari 1.920.000 menjadi 480.000 byte karena kanal RGBA dihapus', 'Tetap 1.920.000 byte karena ukuran logis tidak berubah'], answer: 1,
        hints: ['Kalikan kedua dimensi dengan density sebelum menghitung piksel.', 'Setiap piksel tetap memiliki empat kanal satu byte.'],
        explanation: '800 × 600 × 2² × 4 = 7.680.000 byte; pada density 1 hasilnya 1.920.000. Pengurangan empat kali pada data tidak otomatis menjamin frame menjadi empat kali lebih cepat.', xp: 15
      },
      {
        id: 'expert-p5js-06', title: 'Membalik Transformasi untuk Hit Test', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Hit test objek yang digambar dalam ruang lokal harus menerima pointer dalam ruang yang sama. mouseX dan mouseY berada pada ruang kanvas, sehingga transformasi gambar perlu dibalik sebelum dibandingkan dengan geometri lokal.', 'Invers komposisi membatalkan operasi dari urutan kebalikannya pada koordinat hasil: kurangi translasi, batalkan rotasi, lalu batalkan skala untuk komposisi pada contoh. Skala nol tidak mempunyai invers, sehingga model interaksi harus menghindari atau menangani keadaan itu secara eksplisit.'],
        example: `// Renderer 2D, radian, transformasi awal identitas.
translate(100, 80);
rotate(HALF_PI);
scale(2);
// Objek didefinisikan dalam koordinat lokal.
// Pointer pada koordinat kanvas (160, 140); tidak ada transformasi CSS tambahan.`,
        task: ['Koordinat lokal pointer mana yang benar untuk hit test?'], options: ['(30, 30)', '(-30, 30)', '(60, -60)', '(30, -30)'], answer: 3,
        hints: ['Setelah mengurangi translasi, vektornya (60, 60).', 'Invers rotasi seperempat putaran mengubah (x, y) menjadi (y, -x), kemudian bagi dua.'],
        explanation: 'Pointer menjadi (60, 60) setelah translasi dibatalkan, lalu (60, -60) setelah invers rotasi, dan akhirnya (30, -30) setelah invers skala. Memakai koordinat kanvas langsung akan menguji geometri di ruang yang salah.', xp: 15
      }
    ]
  },
  {
    id: 'expert-ui-ux-design', trackId: 'ui-ux-design', title: 'Expert UI/UX Design', category: 'Web Development', level: 'Expert', theme: 'pink', symbol: 'UX',
    description: 'Kuis konsep UI/UX tingkat Expert memakai skenario WCAG 2.2, bias riset, lokalisasi, tata kelola sistem desain, pencegahan error, dan etika eksperimen. Skenario bukan audit otomatis atau UI framework yang dijalankan langsung.',
    chapters: [
      { title: 'Akses, Bukti, dan Konteks', description: 'Memodelkan semantik keyboard, keterbatasan riset, dan keputusan lokalisasi inklusif.' },
      { title: 'Tata Kelola dan Dampak', description: 'Mengelola perubahan sistem desain serta menilai pencegahan kesalahan dan etika metrik.' }
    ],
    lessons: [
      {
        id: 'expert-ui-ux-design-01', title: 'Semantik Tidak Mengimplementasikan Keyboard', chapter: 0, type: 'quiz', language: 'text',
        intro: ['WCAG 2.2 menilai hasil aksesibilitas seperti operabilitas keyboard, fokus terlihat, serta nama, peran, dan nilai yang dapat dikenali. Pola ARIA Authoring Practices membantu merancang widget, tetapi setiap detail tombol panah dalam pola bukan otomatis teks persyaratan WCAG.', 'Accordion yang sederhana dapat memakai heading berisi button native dengan aria-expanded dan hubungan ke panel. Button menyediakan perilaku aktivasi keyboard bawaan, tetapi pengembang tetap harus menyinkronkan state terbuka, visibilitas panel, dan urutan fokus anak yang tersembunyi.'],
        example: `Accordion bantuan memakai div role="button" dengan onClick saja.
aria-expanded selalu false, walau panel terlihat. Fokus outline dihapus.
Panel yang tertutup hanya dipindah keluar layar sehingga tautannya masih menerima Tab.
Tim menargetkan WCAG 2.2 AA dan tidak membutuhkan navigasi panah khusus.`,
        task: ['Perbaikan mana paling lengkap untuk model interaksi yang dinyatakan?'], options: ['Ganti pemicu dengan button native bernama jelas, sinkronkan aria-expanded, tampilkan fokus, dan keluarkan isi panel tertutup dari interaksi', 'Tambahkan role="region" ke semua elemen tanpa mengubah keyboard', 'Tambahkan handler ArrowDown saja dan pertahankan aria-expanded yang salah', 'Hapus semua tabindex dan anggap aria-controls otomatis menangani aktivasi serta fokus'], answer: 0,
        hints: ['Peran terprogram dan perilaku nyata harus cocok.', 'Konten yang tidak terlihat tidak boleh meninggalkan titik fokus tersembunyi dalam accordion ini.'],
        explanation: 'Rancangan pertama menangani aktivasi, state, fokus, dan panel tertutup secara bersama. ARIA tidak menambahkan event keyboard otomatis, dan navigasi panah khusus bukan kebutuhan yang ditetapkan dalam skenario.', xp: 15
      },
      {
        id: 'expert-ui-ux-design-02', title: 'Bias Sampel Tidak Hilang karena Banyak Angka', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Ukuran sampel yang besar dapat memperkecil ketidakpastian acak dalam sampel tanpa memperbaiki bias perekrutan. Jika hanya pengguna ahli desktop yang terwakili, rata-rata hasil mereka tidak otomatis menjelaskan pengalaman pengguna baru atau pengguna teknologi bantu.', 'Riset terukur perlu menyatakan populasi target, kerangka rekrutmen, tingkat respons, dan kondisi tugas. Pembobotan hanya membantu bila kelompok yang relevan memiliki data memadai dan asumsi bobot dapat dipertanggungjawabkan; kelompok yang sama sekali tidak diamati membutuhkan bukti baru.'],
        example: `Dari 1.000 undangan ke komunitas pengguna ahli desktop, 200 orang mengikuti uji dan 190 berhasil.
Produk juga dipakai pemula di ponsel dan pengguna pembaca layar, tetapi tidak ada peserta dari dua kelompok itu.
Tim ingin mengklaim 95% seluruh pengguna akan berhasil.`,
        task: ['Keputusan riset mana paling dapat dipertanggungjawabkan?'], options: ['Klaim 95% untuk semua pengguna karena jumlah peserta sudah lebih dari 100', 'Duplikasi baris data agar sampel terlihat lebih besar', 'Laporkan hasil dan keterbatasan sampel, rekrut kelompok yang belum terwakili, lalu bandingkan hasil per segmen sebelum generalisasi', 'Beri bobot besar pada kelompok tanpa peserta untuk menciptakan estimasi keberhasilannya'], answer: 2,
        hints: ['Ada bias cakupan dan kemungkinan bias respons, bukan hanya ukuran sampel.', 'Bobot tidak menghasilkan pengamatan untuk segmen yang kosong.'],
        explanation: 'Hasil 190/200 berlaku pada peserta yang diamati, dengan batas rekrutmen dan responsnya. Penelitian tambahan pada segmen yang hilang diperlukan sebelum memperluas klaim ke seluruh populasi produk.', xp: 15
      },
      {
        id: 'expert-ui-ux-design-03', title: 'Lokalisasi Bukan Membalik Semua Elemen', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Lokalisasi memengaruhi arah baca, panjang teks, format angka, mata uang, tanggal, dan cara menyebut tindakan. Antarmuka RTL tidak berarti seluruh karakter dan ikon harus dicerminkan; kode produk atau potongan teks LTR tetap perlu terbaca dalam arah yang sesuai.', 'Gunakan pemformatan berbasis locale untuk nilai dan struktur layout yang mendukung arah bahasa. Keputusan pencerminan ikon harus mengikuti makna, lalu diperiksa oleh pengguna setempat termasuk pengguna teknologi bantu. Bendera negara bukan pengganti nama bahasa karena satu bahasa dapat dipakai lintas negara.'],
        example: `Formulir tagihan dilokalkan ke bahasa Arab dengan tata letak RTL.
Nomor referensi "INV-2048" perlu tetap terbaca LTR; nominal harus mengikuti locale dan mata uang yang benar.
Usulan awal membalik seluruh halaman memakai transform: scaleX(-1), termasuk teks dan logo.`,
        task: ['Pendekatan mana paling tepat untuk memenuhi kebutuhan tanpa merusak makna?'], options: ['Gunakan scaleX(-1) untuk semua konten agar RTL selesai sekaligus', 'Atur arah dan layout RTL, isolasi referensi LTR secara semantik, format nominal dengan locale, dan uji ikon serta pembacaan bersama pengguna setempat', 'Pertahankan semua format angka dan arah bahasa asal agar data konsisten', 'Ganti setiap karakter Latin dalam referensi dengan ikon tanpa label'], answer: 1,
        hints: ['Arah layout berbeda dari mencerminkan bentuk glyph.', 'Kode referensi memiliki aturan baca yang tidak harus mengikuti arah paragraf sekitarnya.'],
        explanation: 'Lokalisasi yang tepat memisahkan arah, pemformatan, dan makna. Pencerminan visual seluruh halaman merusak teks serta logo dan tidak menyediakan struktur semantik yang benar untuk teknologi bantu.', xp: 15
      },
      {
        id: 'expert-ui-ux-design-04', title: 'Token Semantik sebagai Kontrak', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Sistem desain menyatukan kontrak komponen, bukan sekadar palet yang dibagikan. Token semantik seperti text-danger atau action-primary membawa maksud pemakaian, sehingga perubahan nilai atau makna dapat memengaruhi banyak produk sekaligus.', 'Tata kelola perlu pemilik keputusan, catatan alasan, pengujian lintas tema, dan jalur migrasi. Perubahan visual tidak selalu memerlukan versi mayor, tetapi perubahan kontrak yang mematahkan konsumen harus diumumkan serta dikelola, bukan disisipkan diam-diam dengan nama token yang sama.'],
        example: `Token status-critical dipakai teks error pada 12 aplikasi.
Tim branding ingin menggantinya dengan warna baru yang gagal kontras pada tema gelap, sekaligus mengubah artinya menjadi aksen dekoratif.
Aplikasi konsumen memperbarui paket desain secara bertahap, bukan serentak.`,
        task: ['Keputusan tata kelola mana paling tepat?'], options: ['Terbitkan penggantian diam-diam agar semua produk mengikuti brand', 'Minta tiap aplikasi menambal warna secara lokal tanpa pemilik kontrak', 'Hapus tema gelap dari pengujian supaya nilai baru lolos', 'Pisahkan token dekoratif, pertahankan makna status, uji aksesibilitas lintas tema, dan sediakan versi serta panduan migrasi bila kontrak berubah'], answer: 3,
        hints: ['Masalahnya meliputi perubahan makna dan kegagalan keterbacaan.', 'Konsumen tidak berpindah versi pada saat yang sama, sehingga kompatibilitas perlu direncanakan.'],
        explanation: 'Memisahkan makna token dan menguji tema menjaga kontrak status kritis. Versioning serta migrasi mengelola perubahan lintas produk; konsistensi brand tidak membenarkan regresi aksesibilitas.', xp: 15
      },
      {
        id: 'expert-ui-ux-design-05', title: 'Pencegahan Mendahului Konfirmasi', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Dialog konfirmasi dapat membantu keputusan berkonsekuensi besar, tetapi dialog generik pada setiap tindakan mendorong kebiasaan menyetujui tanpa membaca. Pencegahan error sebaiknya dimulai dari pembatasan masukan, kejelasan objek tindakan, serta pemeriksaan sebelum langkah yang tidak dapat dibatalkan.', 'Gunakan reversibilitas atau undo ketika tersedia, dan cadangkan konfirmasi bermakna untuk risiko yang benar-benar memerlukannya. Ringkasan konsekuensi harus konkret, misalnya siapa penerima dan apa yang akan dipindahkan, bukan sekadar pertanyaan apakah pengguna yakin.'],
        example: `Skenario desain: pemindahan saldo antaranggota bersifat tidak dapat dibatalkan setelah disahkan.
Kesalahan sering terjadi karena dua penerima memiliki nama mirip; dialog saat ini hanya berbunyi "Yakin?".
Tidak ada transfer nyata dalam kuis ini.`,
        task: ['Perubahan mana paling langsung mengurangi kesalahan penerima tanpa mengandalkan konfirmasi generik?'], options: ['Bedakan penerima dengan identitas relevan, validasi pilihan, lalu tampilkan ringkasan penerima dan nominal sebelum konfirmasi eksplisit', 'Tampilkan dialog Yakin dua kali dengan isi yang sama', 'Hilangkan semua ringkasan agar proses lebih cepat', 'Tambahkan tombol Undo meskipun sistem tidak mendukung pembatalan transfer'], answer: 0,
        hints: ['Kesalahan berasal dari identitas penerima yang ambigu sebelum persetujuan.', 'Jalur pemulihan tidak boleh dijanjikan bila operasi sebenarnya tidak dapat dibalik.'],
        explanation: 'Pembedaan penerima mencegah salah pilih, sedangkan ringkasan konsekuensi memberi dasar untuk konfirmasi. Dialog berulang tidak menambah informasi dan undo palsu menciptakan harapan pemulihan yang menyesatkan.', xp: 15
      },
      {
        id: 'expert-ui-ux-design-06', title: 'Eksperimen dengan Batas Etis', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Metrik utama eksperimen dapat meningkat sambil merugikan pengguna bila definisinya terlalu sempit. Retensi yang naik karena pembatalan disembunyikan berbeda dari retensi karena produk memberi manfaat. Keberhasilan bisnis perlu dibaca bersama pemahaman, kebebasan memilih, dan dampak setelah keputusan.', 'Tetapkan guardrail serta aturan penghentian sebelum eksperimen. Segmentasi dapat mengungkap beban yang tidak merata, tetapi pengumpulan data harus proporsional dan menghormati privasi. Jangan menunggu signifikansi statistik untuk memperbaiki pelanggaran akses atau pola manipulatif yang sudah jelas.'],
        example: `Varian langganan B menaikkan angka pelanggan bertahan 8%, tetapi tautan batal lebih sulit ditemukan.
Keluhan dan permintaan pengembalian dana meningkat; peserta uji mengira pembatalan tidak tersedia.
Tim hanya menetapkan retensi tujuh hari sebagai metrik kemenangan.`,
        task: ['Keputusan evaluasi mana paling tepat?'], options: ['Luncurkan B karena hanya metrik utama yang boleh memengaruhi keputusan', 'Sembunyikan data keluhan agar tidak mengganggu randomisasi', 'Jangan nyatakan B menang; pulihkan pembatalan yang mudah, lalu evaluasi retensi bersama keberhasilan pembatalan, pemahaman, keluhan, dan refund sebagai guardrail', 'Ganti nama pembatalan menjadi istilah yang kurang dikenal untuk menaikkan retensi lagi'], answer: 2,
        hints: ['Retensi karena hambatan keluar tidak membuktikan nilai produk.', 'Dampak setelah keputusan dapat mengungkap kerugian yang tidak terlihat pada metrik awal.'],
        explanation: 'Peningkatan retensi dalam skenario berasal dari hambatan dan salah pemahaman, sehingga bukan kemenangan yang layak. Akses pembatalan harus dipulihkan dan evaluasi perlu memasukkan guardrail yang melindungi pilihan pengguna.', xp: 15
      }
    ]
  },
  {
    id: 'expert-lua', trackId: 'lua', title: 'Expert Lua', category: 'Game Development', level: 'Expert', theme: 'blue', symbol: 'Lua',
    description: 'Kuis konsep Lua 5.4 tentang raw lookup, keterjangkauan weak reference, coroutine, urutan deterministik, penutupan resource, dan profiling. Potongan kode adalah contoh analisis, bukan eksekusi runtime Lua di aplikasi kuis.',
    chapters: [
      { title: 'Protokol Objek dan Eksekusi', description: 'Mencegah rekursi metatable serta menalar referensi lemah dan perpindahan kendali coroutine.' },
      { title: 'Determinisme dan Umur Resource', description: 'Menetapkan urutan data, cleanup terstruktur, dan optimasi berdasarkan pengukuran.' }
    ],
    lessons: [
      {
        id: 'expert-lua-01', title: 'rawget Memutus Rekursi Lookup', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Di dalam __index, membaca field yang hilang dari objek yang sama dapat kembali memanggil __index. Lookup bantuan yang tampak biasa dapat membentuk rekursi tanpa akhir jika field internalnya belum tersedia.', 'rawget membaca penyimpanan langsung tanpa menjalankan __index, sehingga cocok untuk memeriksa field internal dalam implementasi metatable. Tetap bedakan field tidak tersedia dari nilai false, dan gunakan rawset ketika penyimpanan internal juga harus melewati mekanisme __newindex.'],
        example: `local obj = setmetatable({}, {
  __index = function(self, key)
    local cache = self._cache
    if cache then return cache[key] end
    return nil
  end
})
local value = obj.unknown
-- _cache memang belum disimpan; tidak ada __newindex.`,
        task: ['Perubahan satu baris mana menghentikan rekursi untuk lookup tersebut?'], options: ['local cache = self["_cache"]', 'local cache = rawget(self, "_cache")', 'local cache = self._cache or {}', 'local cache = self[key]'], answer: 1,
        hints: ['Notasi titik dan kurung siku sama-sama melakukan lookup biasa.', 'Yang perlu dilewati adalah pemanggilan metamethod ketika _cache tidak ada.'],
        explanation: 'rawget mengembalikan nil langsung ketika _cache tidak tersimpan, lalu fungsi dapat mengembalikan nil. Menambah or {} tidak membantu karena rekursi terjadi sebelum operator or menerima hasil.', xp: 15
      },
      {
        id: 'expert-lua-02', title: 'Weak Value Masih Bisa Dijangkau Closure', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Table dengan __mode = "v" menyimpan nilai sebagai referensi lemah sehingga entri itu saja tidak mempertahankan objek collectable. Namun garbage collector mempertimbangkan seluruh graf keterjangkauan, bukan hanya jenis table yang pertama kali kita periksa.', 'Closure yang masih hidup dapat menyimpan upvalue kuat menuju objek yang juga berada di cache lemah. Penghapusan entri lemah bergantung pada tidak adanya jalur kuat dan proses koleksi; cache lemah bukan janji bahwa suatu objek langsung hilang saat satu variabel disetel nil.'],
        example: `local cache = setmetatable({}, { __mode = "v" })
local function buatPembaca()
  local data = { score = 7 }
  cache.item = data
  return function() return data.score end
end
local baca = buatPembaca()
collectgarbage("collect")
-- baca masih dipertahankan dan akan dipanggil setelah ini.`,
        task: ['Mengapa data tetap dapat dijangkau meskipun cache memakai weak values?'], options: ['Semua table yang pernah masuk cache tidak dapat dikoleksi lagi', 'collectgarbage selalu mengabaikan table yang memiliki field score', 'Weak values sebenarnya merupakan referensi kuat selama key berupa string', 'Closure baca yang masih hidup memiliki upvalue kuat menuju data'], answer: 3,
        hints: ['Ikuti referensi dari variabel baca ke lingkungan fungsi yang dikembalikan.', 'Kelemahan referensi cache tidak melemahkan referensi milik closure lain.'],
        explanation: 'baca mempertahankan data melalui upvalue sehingga objek belum menjadi sampah. Setelah jalur kuat dilepas objek dapat memenuhi syarat koleksi, tetapi tidak perlu mengandalkan waktu penghapusan cache yang persis.', xp: 15
      },
      {
        id: 'expert-lua-03', title: 'resume Mengembalikan Status Protokol', chapter: 0, type: 'quiz', language: 'text',
        intro: ['coroutine.resume mengembalikan boolean keberhasilan diikuti nilai dari yield atau return. Nilai true tidak berarti coroutine sudah selesai; status suspended dan dead membedakan coroutine yang masih dapat dilanjutkan dari yang sudah mengakhiri badan fungsi.', 'Argumen resume berikutnya menjadi hasil dari yield yang sedang tertunda. Dengan kontrak pesan yang jelas, pemanggil dapat memeriksa status, memahami arti payload, dan menghindari mencoba melanjutkan coroutine yang sudah dead. Ini adalah perpindahan kendali kooperatif, bukan thread paralel.'],
        example: `local co = coroutine.create(function()
  local command = coroutine.yield("ready")
  return command .. "!"
end)
local ok1, msg1 = coroutine.resume(co)
local ok2, msg2 = coroutine.resume(co, "go")
local status = coroutine.status(co)`,
        task: ['Apa nilai ok2, msg2, dan status setelah resume kedua?'], options: ['true, "go!", "dead"', 'true, "ready", "suspended"', 'false, "go!", "dead"', 'true, "ready!", "running"'], answer: 0,
        hints: ['Argumen go menjadi hasil ekspresi yield pada kelanjutan fungsi.', 'Return mengakhiri coroutine, berbeda dari yield yang menundanya.'],
        explanation: 'Resume kedua mengirim go ke yield, lalu fungsi mengembalikan go! dan selesai normal. Boolean tetap true karena selesai bukan error, sementara status dead menandakan tidak ada kelanjutan berikutnya.', xp: 15
      },
      {
        id: 'expert-lua-04', title: 'Urutan Stabil untuk Snapshot', chapter: 1, type: 'quiz', language: 'text',
        intro: ['pairs tidak menjanjikan urutan kunjungan table. Dua snapshot dengan pasangan data yang sama dapat menghasilkan urutan teks berbeda bila serializer memakai urutan iterasi sebagai bagian format, sehingga diff, hash, atau replay menjadi tidak stabil.', 'Tetapkan urutan kunci sebagai bagian kontrak serialisasi. Contoh sederhana dengan kunci ASCII string dapat mengurutkan daftar kunci menggunakan pembanding yang eksplisit. Untuk key campuran, nilai khusus, atau table bersiklus, serializer membutuhkan aturan tambahan; contoh ini sengaja membatasi domain.'],
        example: `local state = { beta = 2, alpha = 1, gamma = 3 }
-- Semua key adalah string ASCII huruf kecil, semua nilai integer kecil.
-- Locale pembanding tetap; table tidak dimutasi selama serialisasi.
-- Format yang diwajibkan: alpha=1;beta=2;gamma=3;`,
        task: ['Algoritme mana menjamin urutan format tersebut dalam asumsi yang diberikan?'], options: ['Gunakan pairs langsung karena Lua selalu mempertahankan urutan deklarasi', 'Gunakan ipairs karena semua nilai adalah integer', 'Kumpulkan key dengan pairs, table.sort key memakai a < b, lalu bangun fragmen mengikuti key terurut dan table.concat', 'Gunakan #state untuk menentukan urutan penulisan key'], answer: 2,
        hints: ['Jenis nilai tidak menentukan apakah ipairs dapat menelusuri key string.', 'Stabilitas berasal dari aturan urut eksplisit, bukan bentuk penyimpanan hash.'],
        explanation: 'Daftar key yang diurutkan memberi urutan alpha, beta, gamma sesuai kontrak. pairs sendiri tidak menjamin urutan, dan ipairs tidak menelusuri field bernama tersebut.', xp: 15
      },
      {
        id: 'expert-lua-05', title: 'Cleanup Terstruktur dengan Variabel close', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Lua 5.4 menyediakan variabel to-be-closed melalui atribut <close>. Nilainya harus memenuhi kontrak yang sesuai; pada objek table, metamethod __close dapat melakukan cleanup ketika scope ditinggalkan, termasuk melalui error yang mengurai stack.', 'Penutupan terstruktur berbeda dari finalizer __gc yang mengikuti siklus garbage collection. Cleanup sebaiknya terbatas, tahan pemanggilan sesuai protokol, dan tidak menutupi error asli dengan kegagalan baru. Contoh ini mengasumsikan __close selesai normal serta tidak menjalankan operasi eksternal.'],
        example: `local log = {}
local mt = { __close = function(self, err)
  log[#log + 1] = err and "gagal" or "normal"
end }
local ok = pcall(function()
  local resource <close> = setmetatable({}, mt)
  error("pekerjaan gagal")
end)
-- Sintaks khusus Lua 5.4; resource hanya simulasi table lokal.`,
        task: ['Apa keadaan ok dan log setelah pcall selesai?'], options: ['true dan {"normal"} karena __close menelan semua error', 'false dan {"gagal"} karena cleanup dipanggil saat scope keluar akibat error', 'false dan {} sampai collectgarbage dipanggil', 'true dan {"gagal"} karena adanya log menandakan pemulihan berhasil'], answer: 1,
        hints: ['Atribut <close> mengikat umur cleanup ke scope, bukan menunggu koleksi sampah.', 'Metamethod pada contoh tidak mengubah error menjadi keberhasilan.'],
        explanation: '__close dipanggil dengan informasi error saat scope ditinggalkan, lalu pcall melaporkan false. Ini perilaku Lua 5.4, bukan janji yang dapat dipakai begitu saja pada Lua 5.1 atau LuaJIT tanpa penyesuaian.', xp: 15
      },
      {
        id: 'expert-lua-06', title: 'Optimasi Berdasarkan Profil Alokasi', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Optimasi Lua perlu memisahkan waktu CPU, alokasi, dan jeda garbage collection pada beban yang representatif. Klaim bahwa satu gaya loop selalu lebih cepat tidak menggantikan pengukuran, terlebih implementasi Lua 5.4 standar berbeda dari runtime yang memakai JIT.', 'Menggabungkan prefix string yang terus membesar pada setiap iterasi dapat menyalin banyak data berulang. Mengumpulkan fragmen ke table padat lalu table.concat sering mengurangi pekerjaan ini, tetapi perubahan tetap harus diuji kesetaraan hasil serta dampak waktu dan memori puncaknya.'],
        example: `local text = ""
for i = 1, #fragments do
  text = text .. fragments[i]
end
-- fragments adalah urutan padat string yang sudah dibuat.
-- Profil pada Lua 5.4 standar menunjukkan loop ini dominan dalam waktu dan alokasi.
-- Output harus tetap sama persis tanpa pemisah tambahan.`,
        task: ['Eksperimen optimasi mana paling langsung menanggapi bukti profil?'], options: ['Matikan garbage collector permanen dan anggap semua alokasi selesai', 'Ubah semua string menjadi global tanpa mengubah penggabungan', 'Pindah ke coroutine dengan loop sama dan klaim otomatis paralel', 'Bandingkan table.concat(fragments) dengan baseline, periksa kesamaan output serta ukur waktu dan memori pada beban yang sama'], answer: 3,
        hints: ['Bottleneck yang terukur berasal dari konstruksi string, bukan perpindahan kendali.', 'Perubahan cepat tetapi menghasilkan pemisah baru tetap salah secara fungsional.'],
        explanation: 'table.concat menargetkan penggabungan prefix berulang dengan kontrak keluaran yang sama. Pengukuran ulang diperlukan untuk membuktikan manfaat; coroutine tidak memberi paralelisme CPU dan mematikan GC bukan perbaikan alokasi.', xp: 15
      }
    ]
  },
  {
    id: 'expert-phaser', trackId: 'phaser', title: 'Expert Phaser', category: 'Game Development', level: 'Expert', theme: 'purple', symbol: 'P3',
    description: 'Kuis konsep Phaser 3 tentang lifecycle scene, pool body, waktu fisika, snapshot lokal, kamera, dan loader. Contoh hanya dianalisis; kuis tidak menjalankan game, memuat aset nyata, atau mengakses jaringan.',
    chapters: [
      { title: 'Umur Objek dan Langkah Fisika', description: 'Mengendalikan listener lintas scene, pemakaian ulang body, serta batas waktu simulasi.' },
      { title: 'State, Kamera, dan Kesiapan Aset', description: 'Menyimpan model tanpa objek engine dan menalar ruang pointer serta lifecycle pemuatan.' }
    ],
    lessons: [
      {
        id: 'expert-phaser-01', title: 'Listener Bersama Melampaui Umur Scene', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Scene Phaser 3 dapat berhenti lalu dimulai kembali tanpa berarti semua emitter yang pernah disentuh scene ikut dihancurkan. Listener yang dipasang pada bus global milik aplikasi dapat bertahan setelah SHUTDOWN dan terpasang lagi pada create berikutnya.', 'Cleanup harus melepaskan listener milik scene tersebut menggunakan referensi handler dan context yang sama. Menghapus semua listener dari emitter bersama dapat merusak scene lain. Gunakan batas lifecycle yang sesuai: SHUTDOWN untuk penghentian run scene, bukan hanya DESTROY yang mungkin terjadi jauh kemudian.'],
        example: `// appBus adalah EventEmitter bersama di luar scene.
create() {
  const onScore = value => { this.score = value; };
  appBus.on("score", onScore);
  // Scene Play dapat dihentikan lalu dimulai berulang kali.
}
// Scene lain juga mendengarkan event score pada appBus.`,
        task: ['Tambahan cleanup mana paling tepat untuk tiap run scene?'], options: ['this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => appBus.off("score", onScore));', 'appBus.removeAllListeners("score") setiap kali create dipanggil', 'Pasang cleanup hanya di DESTROY dan abaikan SHUTDOWN', 'Pasang listener baru di setiap update agar state selalu mutakhir'], answer: 0,
        hints: ['Emitter bersama tidak dimiliki oleh satu scene.', 'Handler lokal yang sama tersedia bagi closure cleanup yang dipasang dalam create.'],
        explanation: 'Cleanup sekali saat SHUTDOWN melepaskan tepat listener run tersebut tanpa mengganggu pelanggan lain. Mengandalkan DESTROY saja dapat meninggalkan listener ketika scene sekadar dihentikan lalu direstart.', xp: 15
      },
      {
        id: 'expert-phaser-02', title: 'Aktif Kembali Tidak Berarti State Bersih', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Pooling menghindari pembuatan dan penghancuran objek terus-menerus, tetapi objek yang diambil kembali membawa state dari pemakaian sebelumnya. Pada Arcade Physics, status visible atau active pada Game Object tidak sama dengan body fisika yang enabled dan sudah berada pada posisi baru.', 'Gunakan kontrak reset yang lengkap untuk tiap jenis objek: aktifkan kembali body dan posisi, kemudian atur velocity, acceleration, gravitasi, serta metadata permainan yang diperlukan. Jangan menganggap properti seperti damage, owner, atau waktu hidup otomatis kembali ke nilai awal karena sprite kembali terlihat.'],
        example: `// Asumsi Phaser 3 Arcade Physics: bullet adalah Arcade Sprite yang dipakai ulang.
// Pemakaian lama berakhir dengan bullet.disableBody(true, true).
// Peluru baru harus muncul di (100, 80), tanpa gravitasi atau percepatan,
// bergerak ke kanan 300 unit/detik, damage 2, lifetime 800 ms.
// Body masih menyimpan konfigurasi dari pemakaian lama.`,
        task: ['Urutan reset mana paling sesuai dengan kontrak peluru baru?'], options: ['Hanya bullet.setVisible(true) karena body mengikuti visibilitas', 'Hanya bullet.setActive(true) lalu gunakan velocity lama', 'Panggil enableBody(true, 100, 80, true, true), setAllowGravity(false), setAcceleration(0, 0), setVelocity(300, 0), lalu set damage dan lifetime baru', 'Buat peluru tampak di posisi baru tetapi biarkan body disabled agar pool hemat CPU'], answer: 2,
        hints: ['enableBody dengan reset menyinkronkan posisi body dan Game Object.', 'Reset state engine tidak menginisialisasi field game buatan sendiri.'],
        explanation: 'Urutan tersebut mengaktifkan body pada posisi spawn serta menetapkan parameter gerak dan metadata baru. Visible atau active saja tidak menghidupkan body yang dinonaktifkan, dan reuse tanpa reset dapat membawa perilaku tembakan lama.', xp: 15
      },
      {
        id: 'expert-phaser-03', title: 'Velocity Fisika Bukan Perpindahan Render', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Pada Arcade Physics Phaser 3 dengan fixedStep aktif, engine mengintegrasikan body melalui langkah fisika sesuai konfigurasi world. update scene menerima delta frame render dalam milidetik, yang tidak boleh dianggap satu langkah fisika tepat pada semua kondisi.', 'Velocity dinyatakan per detik dan tidak perlu dikalikan delta sebelum diberikan ke body. Mengubah posisi sprite secara manual sambil engine mengintegrasikan velocity menambahkan jalur gerak kedua dan dapat mengacaukan respons tumbukan. Pada frame lambat, hubungan jumlah langkah fisika dan render perlu dipahami dari konfigurasi engine.'],
        example: `// Asumsi Phaser 3 Arcade Physics, fixedStep: true, fps: 60, timeScale normal.
// Gerak horizontal sepenuhnya dimiliki fisika, tanpa drag atau acceleration.
update(time, delta) {
  player.setVelocityX(240 * delta / 1000);
  player.x += 240 * delta / 1000;
}`,
        task: ['Perbaikan mana mempertahankan target kecepatan 240 unit per detik tanpa integrasi ganda?'], options: ['Kalikan velocity dengan delta dua kali agar sesuai fixedStep', 'Gunakan player.setVelocityX(240) dan hapus penambahan player.x manual', 'Pertahankan penambahan posisi dan setVelocityX(240) bersamaan', 'Gunakan delta sebagai velocity karena engine sudah mengetahui target 240'], answer: 1,
        hints: ['Satuan argumen velocity adalah unit per detik, bukan unit per frame.', 'Tetapkan satu pemilik pembaruan posisi body.'],
        explanation: 'Engine mengintegrasikan velocity 240 melalui langkah fisikanya sendiri. Perkalian delta pada velocity mengubah besar kecepatan secara salah, sedangkan penambahan x manual menggandakan jalur integrasi.', xp: 15
      },
      {
        id: 'expert-phaser-04', title: 'Snapshot Model Tanpa Referensi Engine', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Save-state sebaiknya merekam model permainan dalam data yang dapat diserialisasi, bukan instance Scene, Sprite, body, atau fungsi callback. Objek engine mengandung hubungan internal dan referensi yang tidak cocok menjadi kontrak penyimpanan jangka panjang.', 'Snapshot membutuhkan versi skema dan validasi saat dimuat. Untuk simulasi yang ingin dilanjutkan tepat, model juga perlu menyimpan waktu permainan serta state generator acak yang dikelola sendiri. Rekonstruksi objek visual dilakukan dari model setelah dependensi siap, bukan dengan menempelkan kembali referensi lama.'],
        example: `Permainan lokal perlu menyimpan posisi dan velocity pemain, skor, ID item yang sudah diambil, tick, serta state PRNG milik model.
Data akan diuji dengan JSON.stringify lalu JSON.parse di memori saja, tanpa file atau jaringan.
Referensi sprite dan scene memiliki hubungan siklis dan tidak menjadi bagian model.`,
        task: ['Bentuk snapshot mana paling tepat untuk pemulihan terkontrol?'], options: ['Seluruh this dari scene beserta callback dan display list', 'Hanya screenshot karena semua velocity dapat dipulihkan dari piksel', 'Referensi langsung player.body agar tidak perlu menyimpan angka', 'Objek data polos berversi berisi angka model, daftar ID stabil, tick, dan state PRNG; validasi lalu bangun ulang objek engine'], answer: 3,
        hints: ['JSON tidak menyimpan perilaku objek engine atau siklus referensinya.', 'Data yang diperlukan kelanjutan simulasi lebih banyak daripada posisi gambar saja.'],
        explanation: 'Snapshot model memisahkan kontrak simpan dari engine dan memungkinkan validasi atau migrasi skema. State PRNG yang dapat dipulihkan diperlukan bila kelanjutan acak harus konsisten; seed awal saja belum menyatakan posisi generator saat penyimpanan.', xp: 15
      },
      {
        id: 'expert-phaser-05', title: 'Pointer pada Kamera yang Tepat', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Koordinat pointer pada ruang game atau layar kamera berbeda dari koordinat world setelah kamera bergeser, zoom, atau berotasi. Perbandingan langsung pointer.x dengan posisi world sprite hanya benar pada konfigurasi transformasi tertentu.', 'Camera.getWorldPoint mengubah titik ke ruang world menggunakan transformasi kamera yang ditentukan. Pada permainan dengan beberapa kamera, pilih kamera yang memang menampilkan objek interaktif; angka world dari kamera lain tidak otomatis cocok. Jangan menerapkan faktor zoom lagi setelah konversi yang sudah lengkap.'],
        example: `// Asumsi Phaser 3: pointer.x/y sudah dinormalisasi Scale Manager ke koordinat game.
// Kamera main memiliki scroll, zoom, dan rotasi bukan nol.
// Klik diarahkan ke world yang ditampilkan main, bukan kamera minimap.
// Target menyimpan target.x dan target.y dalam ruang world.`,
        task: ['Langkah mana menghasilkan koordinat yang tepat untuk hit test target?'], options: ['Gunakan main.getWorldPoint(pointer.x, pointer.y), lalu bandingkan dengan geometri world target', 'Bandingkan pointer.x/y langsung karena Scale Manager juga membatalkan transformasi kamera', 'Tambahkan main.scrollX/Y saja dan abaikan zoom serta rotasi', 'Gunakan minimap.getWorldPoint karena semua kamera berbagi transformasi yang sama'], answer: 0,
        hints: ['Normalisasi ukuran game dan invers transformasi kamera adalah dua tahap berbeda.', 'Scroll saja tidak cukup ketika zoom dan rotasi juga diterapkan.'],
        explanation: 'Konversi lewat kamera main memperhitungkan transformasi kamera yang relevan. Menggunakan kamera lain atau hanya menambahkan scroll dapat menghasilkan titik world yang salah pada zoom atau rotasi.', xp: 15
      },
      {
        id: 'expert-phaser-06', title: 'Antrean Loader Belum Berarti Aset Siap', chapter: 1, type: 'quiz', language: 'text',
        intro: ['preload pada lifecycle scene Phaser 3 mengantrekan aset yang dibutuhkan sebelum create dijalankan setelah proses loader selesai. Pemanggilan load.image sendiri hanya mendaftarkan pekerjaan; ia tidak membuat texture siap dipakai pada baris berikutnya.', 'Pemuatan dinamis setelah create membutuhkan pengaturan kapan loader dimulai, kapan hasil diperiksa, dan bagaimana kegagalan ditangani. Event complete menunjukkan antrean selesai diproses, bukan jaminan semua aset berhasil. Scene yang berhenti saat pemuatan berjalan juga harus membersihkan listener miliknya agar callback tidak menyentuh UI usang.'],
        example: `Skenario tanpa pemuatan nyata: scene yang sudah aktif meminta texture opsional "badge".
Loader sedang idle, key badge belum ada, dan adegan harus tetap dapat digunakan jika aset gagal.
Kode usulan: this.load.image("badge", "badge.png"); lalu langsung this.add.image(40, 40, "badge").`,
        task: ['Protokol mana paling tepat untuk pemuatan dinamis pada skenario tersebut?'], options: ['Tambahkan image langsung karena load.image memblokir sampai berkas selesai', 'Panggil create secara manual berulang sampai texture muncul', 'Pasang listener penyelesaian dan kegagalan sebelum start loader, antrekan aset, mulai pemuatan, periksa texture tersedia sebelum membuat image, sediakan fallback dan cleanup saat shutdown', 'Tunggu event complete lalu anggap badge pasti tersedia tanpa memeriksa kegagalan'], answer: 2,
        hints: ['Antrean, proses pemuatan, dan ketersediaan texture merupakan state yang berbeda.', 'Kegagalan satu aset tetap dapat diikuti penyelesaian antrean loader.'],
        explanation: 'Protokol tersebut menangani kesiapan, kegagalan, serta umur scene. Berbeda dari alur preload awal, pemuatan dinamis pada loader idle perlu dimulai secara eksplisit; complete saja tidak membuktikan texture badge berhasil dimuat.', xp: 15
      }
    ]
  }
];
