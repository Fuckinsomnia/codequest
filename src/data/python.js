export default {
  id: 'python',
  title: 'Python',
  category: 'Data Science',
  level: 'Pemula',
  description: 'Belajar Python lewat 43 tantangan berbahasa Indonesia: dari pesan pertama hingga pengolahan data dengan fungsi, objek, dan modul standar. Semua latihan dapat dijalankan secara lokal tanpa akun.',
  theme: 'blue',
  symbol: 'Py',
  chapters: [
    { title: 'Langkah Pertama', description: 'Kenali urutan program, keluaran teks, komentar, dan hitungan sederhana.' },
    { title: 'Variabel & Data', description: 'Simpan nilai, ubah tipe data, baca masukan, dan susun laporan singkat.' },
    { title: 'Percabangan', description: 'Gunakan perbandingan dan logika untuk memilih tindakan berdasarkan kondisi.' },
    { title: 'Perulangan', description: 'Ulangi pekerjaan secara terukur dengan for, while, dan kendali alur.' },
    { title: 'List', description: 'Kelola kumpulan data melalui indeks, irisan, perubahan, dan penyaringan.' },
    { title: 'Fungsi', description: 'Susun perhitungan menjadi bagian kecil yang menerima data dan mengembalikan hasil.' },
    { title: 'Kelas & Objek', description: 'Modelkan benda dengan atribut, metode, pewarisan, dan hubungan antarobjek.' },
    { title: 'Modul Standar', description: 'Olah angka, tanggal, frekuensi, dan JSON menggunakan pustaka bawaan Python.' },
  ],
  lessons: [
    {
      id: 'python-01',
      title: 'Sapaan dari Kebun',
      chapter: 0,
      type: 'code',
      language: 'python',
      intro: [
        'Program Python menjalankan instruksi dari atas ke bawah. Fungsi print() mengirimkan nilai ke keluaran teks. Untuk mencetak kalimat, letakkan kalimat itu di dalam tanda kutip dan masukkan ke dalam kurung print().',
        'Teks di dalam tanda kutip disebut string. Tanda kutipnya tidak ikut dicetak, tetapi spasi, huruf besar, dan tanda baca di dalamnya tetap dipertahankan. Setiap pemanggilan print() biasanya diakhiri dengan baris baru.',
      ],
      example: `print("Pos belajar sudah siap.")`,
      task: [
        'Gunakan print() untuk menampilkan kalimat Selamat datang di Kebun Kode!',
        'Cetak hanya satu baris; perhatikan huruf besar dan tanda serunya.',
      ],
      starter: `# Kirim satu sapaan untuk pengunjung kebun.
`,
      solution: `print("Selamat datang di Kebun Kode!")`,
      expected: 'Selamat datang di Kebun Kode!',
      hints: [
        'Kalimat biasa perlu dibungkus tanda kutip agar dibaca sebagai teks, bukan nama perintah.',
        'Letakkan "Selamat datang di Kebun Kode!" di dalam kurung pemanggilan print().',
      ],
      xp: 15,
    },
    {
      id: 'python-02',
      title: 'Papan Informasi Tiga Baris',
      chapter: 0,
      type: 'code',
      language: 'python',
      intro: [
        'Beberapa instruksi print() dapat membentuk pengumuman yang mudah dibaca. Python menjalankan instruksi pertama sebelum instruksi berikutnya, sehingga urutan baris kode menentukan urutan pesan yang terlihat.',
        'Tidak perlu menambahkan baris kosong untuk memisahkan tiga pesan menjadi tiga baris. Setiap print() sudah berpindah baris setelah mencetak isinya. Sebaliknya, print() tanpa isi akan menghasilkan satu baris kosong tambahan.',
      ],
      example: `print("RUANG BACA")
print("Tutup pukul 16.00")
print("Rapikan kursi setelah dipakai")`,
      task: [
        'Cetak KEBUN WARGA pada baris pertama dan Buka pukul 07.00 pada baris kedua.',
        'Cetak Bawa botol minum pada baris ketiga menggunakan pemanggilan print() terpisah.',
        'Jangan tambahkan judul lain atau baris kosong di antara pesan.',
      ],
      starter: `# Susun pengumuman mulai dari nama tempat, lalu jam, lalu pengingat.
`,
      solution: `print("KEBUN WARGA")
print("Buka pukul 07.00")
print("Bawa botol minum")`,
      expected: 'KEBUN WARGA\nBuka pukul 07.00\nBawa botol minum',
      hints: [
        'Gunakan tiga pemanggilan print(), masing-masing berisi satu pesan.',
        'Mulai dengan print("KEBUN WARGA"), lalu letakkan kedua pesan berikutnya pada baris kode selanjutnya.',
      ],
      xp: 15,
    },
    {
      id: 'python-03',
      title: 'Pesan dengan Kutipan',
      chapter: 0,
      type: 'code',
      language: 'python',
      intro: [
        'String Python dapat memakai tanda kutip tunggal atau ganda sebagai pembatas. Keduanya membentuk jenis data yang sama. Pembatas awal dan akhir harus cocok agar Python mengetahui bagian mana yang merupakan isi teks.',
        'Jika isi kalimat memuat kutip ganda, gunakan kutip tunggal di bagian luar. Sebaliknya, pembatas kutip ganda memudahkan penulisan teks yang mengandung kutip tunggal. Kutip di dalam isi string akan ikut tercetak.',
      ],
      example: `print('Dimas berpesan, "Simpan benihnya."')
print("Label ini bertuliskan 'Bayam'.")`,
      task: [
        'Cetak Rani berkata, "Ayo belajar!" lengkap dengan kutip gandanya.',
        'Pada baris berikutnya, cetak Hari ini kita belajar \'Python\'. lengkap dengan kutip tunggal dan titiknya.',
      ],
      starter: `# Pilih pembatas string yang berbeda dari tanda kutip di dalam pesan.
`,
      solution: `print('Rani berkata, "Ayo belajar!"')
print("Hari ini kita belajar 'Python'.")`,
      expected: 'Rani berkata, "Ayo belajar!"\nHari ini kita belajar \'Python\'.',
      hints: [
        'Pembatas string tidak ikut tampil, sedangkan tanda kutip yang berada di antara pembatas akan tampil.',
        'Bungkus kalimat pertama dengan kutip tunggal dan kalimat kedua dengan kutip ganda.',
      ],
      xp: 15,
    },
    {
      id: 'python-04',
      title: 'Catatan Penjaga',
      chapter: 0,
      type: 'code',
      language: 'python',
      intro: [
        'Komentar menjelaskan alasan atau maksud kode kepada pembacanya. Di luar string, tanda # membuat Python mengabaikan sisa baris tersebut. Komentar tidak menjadi keluaran dan tidak mengubah urutan instruksi yang benar-benar dijalankan.',
        'Menambahkan # di depan sebuah instruksi juga berguna untuk menonaktifkannya sementara. Berbeda dengan menghapus kode, cara ini mempertahankan catatan yang dapat diperiksa kembali. Gunakan komentar yang menjelaskan tujuan, bukan sekadar mengulang isi setiap baris.',
      ],
      example: `# Nama ruang ditampilkan sebelum statusnya.
print("Gudang alat")
# print("Pesan pemeriksaan")
print("Siap dipakai")`,
      task: [
        'Pertahankan keluaran Inventaris dimulai dan Inventaris selesai dalam urutan itu.',
        'Nonaktifkan baris print("Pesan percobaan") dengan komentar, bukan dengan menghapusnya.',
        'Tambahkan satu komentar yang menjelaskan tujuan program.',
      ],
      starter: `print("Inventaris dimulai")
print("Pesan percobaan")
print("Inventaris selesai")`,
      solution: `# Tampilkan penanda awal dan akhir pemeriksaan inventaris.
print("Inventaris dimulai")
# print("Pesan percobaan")
print("Inventaris selesai")`,
      expected: 'Inventaris dimulai\nInventaris selesai',
      hints: [
        'Baris yang diawali # tetap ada dalam kode, tetapi tidak dijalankan.',
        'Ubah baris tengah menjadi # print("Pesan percobaan") dan tulis komentar penjelas di atas program.',
      ],
      xp: 15,
    },
    {
      id: 'python-05',
      title: 'Hitung Persediaan Bibit',
      chapter: 0,
      type: 'code',
      language: 'python',
      intro: [
        'Selain teks, print() dapat menampilkan hasil ekspresi matematika. Angka yang tidak dibungkus tanda kutip dapat dijumlahkan dengan +, dikurangi dengan -, dikalikan dengan *, atau dibagi dengan /. Python menghitung ekspresi sebelum mencetak hasilnya.',
        'Perkalian dan pembagian didahulukan dari penjumlahan dan pengurangan. Gunakan tanda kurung untuk mengubah urutan hitungan. Operator / menghasilkan bilangan pecahan bertipe float, sehingga hasil enam dapat ditampilkan sebagai 6.0.',
      ],
      example: `print(9 + 4)
print(3 * 7)
print((10 + 2) / 3)`,
      task: [
        'Cetak hasil penjumlahan 12 bibit dan 8 bibit pada baris pertama.',
        'Cetak jumlah bibit dari 6 baki yang masing-masing berisi 4 bibit pada baris kedua.',
        'Cetak hasil pembagian total 18 + 6 bibit ke 4 wadah pada baris ketiga; gunakan ekspresi, bukan angka hasil yang diketik langsung.',
      ],
      starter: `# Hitung tiga kebutuhan bibit langsung di dalam print().
`,
      solution: `print(12 + 8)
print(6 * 4)
print((18 + 6) / 4)`,
      expected: '20\n24\n6.0',
      hints: [
        'Jangan beri tanda kutip pada ekspresi hitungan; kutip akan membuatnya dicetak sebagai teks.',
        'Hitungan terakhir perlu kurung: print((18 + 6) / 4).',
      ],
      xp: 15,
    },
    {
      id: 'python-06',
      title: 'Label Rak yang Berubah',
      chapter: 1,
      type: 'code',
      language: 'python',
      intro: [
        'Variabel adalah nama yang merujuk pada suatu nilai. Penugasan dengan = menghubungkan nama di sebelah kiri dengan nilai di sebelah kanan. Nama yang deskriptif, seperti jumlah atau tanaman, membantu orang memahami data tanpa menebak artinya.',
        'Nilai yang dirujuk sebuah variabel dapat diperbarui. Dalam jumlah = jumlah + 3, Python membaca nilai lama, menambahkan tiga, lalu menyimpan hasilnya dengan nama yang sama. Tanda = melakukan penugasan, bukan menguji kesamaan.',
      ],
      example: `alat = "Sekop"
stok = 7
print(alat)
print(stok)
stok = stok - 2
print(stok)`,
      task: [
        'Buat variabel tanaman berisi "Kemangi" dan jumlah berisi bilangan bulat 12.',
        'Cetak tanaman, lalu jumlah, masing-masing pada baris tersendiri.',
        'Tambahkan 3 pada nilai jumlah menggunakan variabel itu sendiri, lalu cetak nilai terbarunya.',
      ],
      starter: `# Simpan nama tanaman dan stok sebelum menerima tiga pot tambahan.
`,
      solution: `tanaman = "Kemangi"
jumlah = 12
print(tanaman)
print(jumlah)
jumlah = jumlah + 3
print(jumlah)`,
      expected: 'Kemangi\n12\n15',
      hints: [
        'Nama tanaman merupakan string, sedangkan jumlah harus berupa angka tanpa kutip agar dapat dijumlahkan.',
        'Setelah dua print() pertama, gunakan jumlah = jumlah + 3 lalu print(jumlah).',
      ],
      xp: 15,
    },
    {
      id: 'python-07',
      title: 'Kemasan Panen',
      chapter: 1,
      type: 'code',
      language: 'python',
      intro: [
        'Pembagian tidak selalu bertujuan menghasilkan pecahan. Operator // menghasilkan pembagian yang dibulatkan ke bawah, sedangkan % menghasilkan sisanya. Untuk jumlah barang positif, keduanya menjawab berapa kemasan penuh yang terbentuk dan berapa barang yang tersisa.',
        'Python juga menyediakan ** untuk perpangkatan. Ekspresi 3 ** 2 berarti tiga dikalikan dengan dirinya sendiri sebanyak dua faktor, bukan tiga dikali dua. Simpan data awal dalam variabel agar rumus tetap berguna ketika jumlah barang berubah.',
      ],
      example: `jeruk = 23
isi_kotak = 5
print(jeruk // isi_kotak)
print(jeruk % isi_kotak)
print(3 ** 3)`,
      task: [
        'Dengan 29 tomat dan kapasitas 6 per kotak, cetak banyaknya kotak penuh menggunakan //.',
        'Cetak sisa tomat menggunakan %, pada baris berikutnya.',
        'Cetak 2 pangkat 5 menggunakan ** sebagai jumlah label cadangan.',
      ],
      starter: `tomat = 29
kapasitas = 6
`,
      solution: `tomat = 29
kapasitas = 6
print(tomat // kapasitas)
print(tomat % kapasitas)
print(2 ** 5)`,
      expected: '4\n5\n32',
      hints: [
        'Kotak penuh tidak boleh menghitung kotak yang baru terisi sebagian; sisa dihitung terpisah.',
        'Dua ekspresi pertama adalah tomat // kapasitas dan tomat % kapasitas. Ekspresi ketiga adalah 2 ** 5.',
      ],
      xp: 15,
    },
    {
      id: 'python-08',
      title: 'Mengubah Teks Menjadi Angka',
      chapter: 1,
      type: 'code',
      language: 'python',
      intro: [
        'Nilai "8" merupakan string, bukan bilangan delapan. Fungsi int() mengubah teks bilangan bulat menjadi integer, sedangkan float() menerima teks bilangan pecahan dengan titik desimal. Konversi ini diperlukan sebelum data teks dipakai dalam hitungan.',
        'Arah konversi dapat dibalik dengan str(). Hasilnya bisa digabungkan dengan string lain memakai +. Konversi hanya berhasil untuk isi yang sesuai: int("delapan") akan gagal, sehingga latihan ini menyediakan teks angka yang sudah valid.',
      ],
      example: `jarak = float("3.5")
peserta = int("6")
print(jarak * 2)
print("Peserta: " + str(peserta))`,
      task: [
        'Konversikan suhu_teks menjadi float, tambahkan 1.5, lalu cetak hasilnya.',
        'Konversikan jumlah_teks menjadi int, tambahkan 2, lalu cetak hasilnya tanpa mengubah nilai jumlah asli.',
        'Cetak Jumlah: 8 dengan menggabungkan teks "Jumlah: " dan str(jumlah).',
      ],
      starter: `suhu_teks = "27.5"
jumlah_teks = "8"
`,
      solution: `suhu_teks = "27.5"
jumlah_teks = "8"
suhu = float(suhu_teks)
jumlah = int(jumlah_teks)
print(suhu + 1.5)
print(jumlah + 2)
print("Jumlah: " + str(jumlah))`,
      expected: '29.0\n10\nJumlah: 8',
      hints: [
        'Suhu memerlukan float karena memiliki pecahan; jumlah memerlukan int karena berupa bilangan bulat.',
        'Gunakan suhu = float(suhu_teks) dan jumlah = int(jumlah_teks), lalu lakukan hitungan di dalam print().',
      ],
      xp: 15,
    },
    {
      id: 'python-09',
      title: 'Tiket Penyiraman',
      chapter: 1,
      type: 'code',
      language: 'python',
      intro: [
        'Fungsi input() membaca satu baris masukan dan mengembalikannya sebagai string tanpa karakter pindah baris di ujungnya. Jika baris tersebut berisi jumlah barang, ubah hasilnya dengan int() sebelum mengalikan atau menjumlahkannya.',
        'Latihan ini menyediakan dua baris masukan secara otomatis: Mira dan 4. Panggil input() tanpa pesan agar tidak menambahkan teks ke keluaran yang diperiksa. print() dapat menerima beberapa nilai dipisahkan koma; secara bawaan, nilai-nilai itu dicetak dengan pemisah satu spasi.',
      ],
      example: `# Jika masukan dua barisnya adalah Tono lalu 3:
nama = input()
jam = int(input())
print("Peminjam:", nama)
print("Biaya:", jam * 2000)`,
      task: [
        'Baca nama pemesan dari baris pertama dan jumlah tiket dari baris kedua, tepat dua kali input() tanpa pesan.',
        'Setiap tiket berharga 2500. Hitung total biaya dari jumlah tiket yang dibaca.',
        'Cetak Pesanan: diikuti nama, lalu Total: diikuti biaya pada baris berikutnya; gunakan satu spasi setelah titik dua.',
      ],
      starter: `harga_tiket = 2500
# Masukan yang tersedia: Mira pada baris pertama, 4 pada baris kedua.
`,
      solution: `harga_tiket = 2500
nama = input()
jumlah = int(input())
print("Pesanan:", nama)
print("Total:", jumlah * harga_tiket)`,
      expected: 'Pesanan: Mira\nTotal: 10000',
      hints: [
        'Simpan input() pertama sebagai nama. Bungkus input() kedua dengan int() agar perkaliannya berupa hitungan angka.',
        'Gunakan nama = input(), jumlah = int(input()), lalu print("Total:", jumlah * harga_tiket) untuk baris biaya.',
      ],
      xp: 15,
      stdin: 'Mira\n4\n',
    },
    {
      id: 'python-10',
      title: 'Ringkasan Tabungan Alat',
      chapter: 1,
      type: 'code',
      language: 'python',
      intro: [
        'F-string memudahkan penyisipan nilai ke dalam kalimat. Tambahkan huruf f sebelum pembatas string, lalu tulis nama variabel atau ekspresi di antara kurung kurawal. Python menghitung bagian di dalam kurung kurawal ketika string dibuat.',
        'Format seperti :.1f menampilkan satu angka di belakang titik desimal. Ini mengatur tampilan, bukan mengubah nilai asli variabel. Gunakan format yang konsisten ketika melaporkan persentase agar pembaca dapat membandingkan hasil dengan mudah.',
      ],
      example: `terkumpul = 45
target = 60
persen = terkumpul / target * 100
print(f"Kemajuan: {persen:.1f}%")`,
      task: [
        'Hitung saldo setelah saldo_awal ditambah setoran, lalu hitung persentasenya terhadap target.',
        'Cetak Saldo alat: 75000 menggunakan f-string dan nilai saldo yang dihitung.',
        'Cetak Target tercapai: 62.5% pada baris kedua; format persentase dengan satu angka desimal.',
      ],
      starter: `saldo_awal = 45000
setoran = 30000
target = 120000
`,
      solution: `saldo_awal = 45000
setoran = 30000
target = 120000
saldo = saldo_awal + setoran
persen = saldo / target * 100
print(f"Saldo alat: {saldo}")
print(f"Target tercapai: {persen:.1f}%")`,
      expected: 'Saldo alat: 75000\nTarget tercapai: 62.5%',
      hints: [
        'Persentase dihitung sebagai bagian dibagi target, kemudian dikali seratus.',
        'Sisipkan saldo dengan {saldo}, dan sisipkan persentase dengan {persen:.1f} lalu tambahkan tanda % di luar kurung kurawal.',
      ],
      xp: 15,
    },
    {
      id: 'python-11',
      title: 'Pemeriksaan Tandon',
      chapter: 2,
      type: 'code',
      language: 'python',
      intro: [
        'Operator perbandingan menghasilkan nilai boolean: True atau False. Gunakan > dan < untuk membandingkan besar nilai, >= dan <= untuk menyertakan batas, serta == untuk memeriksa kesamaan. Berbeda dari =, operator == tidak menyimpan nilai baru.',
        'Boolean dapat disimpan dalam variabel atau langsung dicetak. Membaca hasil perbandingan sebelum membuat percabangan membantu memastikan bahwa aturan batas sudah benar, misalnya apakah tandon yang tepat mencapai batas dianggap cukup.',
      ],
      example: `isi = 40
minimum = 40
print(isi >= minimum)
print(isi < minimum)
print(isi == 50)`,
      task: [
        'Cetak hasil perbandingan apakah isi 75 lebih besar atau sama dengan minimum 60.',
        'Cetak apakah isi sama dengan kapasitas 100.',
        'Cetak apakah isi tidak sama dengan 0 menggunakan !=; setiap hasil boolean berada pada baris tersendiri.',
      ],
      starter: `isi = 75
minimum = 60
kapasitas = 100
`,
      solution: `isi = 75
minimum = 60
kapasitas = 100
print(isi >= minimum)
print(isi == kapasitas)
print(isi != 0)`,
      expected: 'True\nFalse\nTrue',
      hints: [
        'Perbandingan langsung dapat diletakkan di dalam print(); tidak perlu menulis string "True" atau "False".',
        'Tiga ekspresinya adalah isi >= minimum, isi == kapasitas, dan isi != 0.',
      ],
      xp: 15,
    },
    {
      id: 'python-12',
      title: 'Alarm Tanah Kering',
      chapter: 2,
      type: 'code',
      language: 'python',
      intro: [
        'Pernyataan if menjalankan blok kode hanya ketika kondisinya bernilai True. Akhiri baris if dengan titik dua, lalu beri indentasi pada instruksi yang menjadi bagian blok tersebut. Empat spasi adalah kebiasaan yang umum dipakai dalam Python.',
        'Instruksi yang kembali rata kiri berada di luar blok if dan tetap dijalankan sesudah pemeriksaan kondisi. Perbedaan indentasi ini memungkinkan program menampilkan peringatan hanya saat perlu, tetapi selalu mencatat bahwa pemeriksaan sudah selesai.',
      ],
      example: `suhu = 34
if suhu > 32:
    print("Buka ventilasi")
print("Sensor selesai dibaca")`,
      task: [
        'Jika kelembapan kurang dari 35, cetak Siram petak sekarang.',
        'Setelah blok if, selalu cetak Pemeriksaan selesai.',
        'Gunakan nilai kelembapan 28 yang sudah tersedia dan indentasi empat spasi untuk isi if.',
      ],
      starter: `kelembapan = 28
`,
      solution: `kelembapan = 28
if kelembapan < 35:
    print("Siram petak sekarang")
print("Pemeriksaan selesai")`,
      expected: 'Siram petak sekarang\nPemeriksaan selesai',
      hints: [
        'Kondisi kelembapan < 35 benar untuk nilai awal, sehingga pesan penyiraman perlu berada di dalam blok if.',
        'Tulis if kelembapan < 35: lalu indentasikan pesan pertama. Pesan Pemeriksaan selesai harus kembali rata kiri.',
      ],
      xp: 15,
    },
    {
      id: 'python-13',
      title: 'Pilihan Jalur Pengiriman',
      chapter: 2,
      type: 'code',
      language: 'python',
      intro: [
        'Blok else menyediakan pilihan ketika kondisi if bernilai False. Dalam pasangan if dan else, tepat satu cabang dijalankan. Ini cocok untuk dua hasil yang saling meniadakan, seperti pengiriman dekat atau pengiriman jauh.',
        'Letakkan else sejajar dengan if dan akhiri dengan titik dua. Perhatikan aturan batas: jarak tepat tiga kilometer harus termasuk jalur dekat jika syaratnya adalah paling jauh tiga kilometer. Operator <= menyatakan aturan tersebut secara langsung.',
      ],
      example: `berat = 7
if berat <= 5:
    print("Pakai tas kecil")
else:
    print("Pakai keranjang")`,
      task: [
        'Untuk jarak paling jauh 3 km, program harus mencetak Antar dengan sepeda.',
        'Untuk jarak lebih dari 3 km, program harus mencetak Antar dengan gerobak motor.',
        'Gunakan if/else dan jarak_km 5 yang diberikan, sehingga hanya pilihan yang sesuai yang dicetak.',
      ],
      starter: `jarak_km = 5
`,
      solution: `jarak_km = 5
if jarak_km <= 3:
    print("Antar dengan sepeda")
else:
    print("Antar dengan gerobak motor")`,
      expected: 'Antar dengan gerobak motor',
      hints: [
        'Buat satu kondisi untuk jalur dekat; cabang else otomatis menangani jarak lainnya.',
        'Gunakan if jarak_km <= 3: untuk pesan sepeda dan letakkan pesan gerobak motor di dalam else.',
      ],
      xp: 15,
    },
    {
      id: 'python-14',
      title: 'Kategori Tinggi Bibit',
      chapter: 2,
      type: 'code',
      language: 'python',
      intro: [
        'Rangkaian if, elif, dan else memilih satu dari beberapa cabang. Python memeriksa kondisi dari atas dan berhenti pada cabang pertama yang benar. Kondisi di bagian berikutnya tidak lagi diperiksa setelah sebuah cabang dipilih.',
        'Untuk mengelompokkan nilai berdasarkan ambang, urutan pemeriksaan sangat penting. Jika ambang tertinggi diperiksa lebih dulu, cabang berikutnya hanya menangani nilai yang belum memenuhi ambang tersebut. Cara ini mengurangi pengulangan syarat.',
      ],
      example: `umur_hari = 19
if umur_hari >= 30:
    print("Tanaman dewasa")
elif umur_hari >= 14:
    print("Tanaman muda")
else:
    print("Kecambah")`,
      task: [
        'Kategorikan tinggi minimal 20 cm sebagai Siap pindah, tinggi minimal 10 tetapi kurang dari 20 sebagai Tumbuh, dan sisanya sebagai Awal.',
        'Gunakan satu rangkaian if/elif/else dengan pemeriksaan ambang terbesar lebih dulu.',
        'Dengan tinggi_cm 14, cetak hanya nama kategori yang sesuai.',
      ],
      starter: `tinggi_cm = 14
`,
      solution: `tinggi_cm = 14
if tinggi_cm >= 20:
    print("Siap pindah")
elif tinggi_cm >= 10:
    print("Tumbuh")
else:
    print("Awal")`,
      expected: 'Tumbuh',
      hints: [
        'Nilai 14 gagal memenuhi syarat minimal 20, tetapi memenuhi syarat minimal 10.',
        'Mulai dengan if tinggi_cm >= 20:, lanjutkan elif tinggi_cm >= 10:, lalu else: untuk kategori Awal.',
      ],
      xp: 15,
    },
    {
      id: 'python-15',
      title: 'Izin Membuka Rumah Bibit',
      chapter: 2,
      type: 'code',
      language: 'python',
      intro: [
        'Operator and menghasilkan kondisi benar ketika kedua syaratnya benar. Operator or memerlukan setidaknya satu syarat benar, sedangkan not membalik nilai kebenaran. Kombinasi ini membantu menerjemahkan aturan yang melibatkan beberapa keadaan sekaligus.',
        'Gunakan tanda kurung untuk menegaskan kelompok aturan yang dimaksud. Misalnya, bukti kartu atau izin pendamping bisa menjadi satu kelompok pilihan, lalu kelompok itu digabungkan dengan syarat keselamatan yang wajib dipenuhi.',
      ],
      example: `punya_tiket = False
undangan = True
hujan = False
boleh_masuk = (punya_tiket or undangan) and not hujan
print(boleh_masuk)`,
      task: [
        'Hitung boleh_buka: harus ada kartu anggota ATAU pendamping, dan ruang TIDAK sedang dirawat.',
        'Gunakan or, and, serta not dengan tiga boolean yang sudah disediakan.',
        'Jika boleh_buka benar, cetak Akses dibuka; jika tidak, cetak Tunggu petugas.',
      ],
      starter: `kartu_anggota = False
ada_pendamping = True
sedang_dirawat = False
`,
      solution: `kartu_anggota = False
ada_pendamping = True
sedang_dirawat = False
boleh_buka = (kartu_anggota or ada_pendamping) and not sedang_dirawat
if boleh_buka:
    print("Akses dibuka")
else:
    print("Tunggu petugas")`,
      expected: 'Akses dibuka',
      hints: [
        'Kelompokkan dua cara mendapat izin dengan or, lalu pastikan sedang_dirawat bernilai salah.',
        'Ekspresi izinnya adalah (kartu_anggota or ada_pendamping) and not sedang_dirawat. Gunakan hasilnya sebagai kondisi if.',
      ],
      xp: 15,
    },
    {
      id: 'python-16',
      title: 'Pemeriksaan Kode Pesanan',
      chapter: 2,
      type: 'code',
      language: 'python',
      intro: [
        'Sebuah if dapat diletakkan di dalam blok if lain. Percabangan bersarang berguna ketika pemeriksaan kedua hanya masuk akal setelah pemeriksaan pertama berhasil, misalnya memeriksa jumlah pesanan hanya setelah kode pesanan dikenali.',
        'Pada string, operator in memeriksa apakah teks tertentu muncul sebagai bagian dari string lain. Pemeriksaan ini peka terhadap huruf besar. Dalam percabangan bersarang, indentasi else menentukan apakah ia berpasangan dengan pemeriksaan luar atau pemeriksaan di dalam.',
      ],
      example: `kode = "BUKU-12"
jumlah = 2
if "BUKU" in kode:
    if jumlah > 0:
        print("Pesanan buku diterima")
    else:
        print("Jumlah belum diisi")
else:
    print("Kode bukan buku")`,
      task: [
        'Periksa apakah "BENIH" terdapat di dalam kode. Jika tidak, cetak Kode tidak dikenal.',
        'Jika kode dikenali, periksa jumlah: minimal 10 mencetak Siapkan paket besar, selain itu mencetak Siapkan paket kecil.',
        'Gunakan percabangan bersarang dengan kode "BENIH-24" dan jumlah 12; cetak satu keputusan saja.',
      ],
      starter: `kode = "BENIH-24"
jumlah = 12
`,
      solution: `kode = "BENIH-24"
jumlah = 12
if "BENIH" in kode:
    if jumlah >= 10:
        print("Siapkan paket besar")
    else:
        print("Siapkan paket kecil")
else:
    print("Kode tidak dikenal")`,
      expected: 'Siapkan paket besar',
      hints: [
        'Pemeriksaan jumlah berada di dalam cabang kode yang dikenali, sehingga baris if keduanya perlu indentasi.',
        'Gunakan if "BENIH" in kode: di luar, lalu if jumlah >= 10: di dalamnya. Else untuk kode tidak dikenal harus rata kiri.',
      ],
      xp: 15,
    },
    {
      id: 'python-17',
      title: 'Nomor Petak Berurutan',
      chapter: 3,
      type: 'code',
      language: 'python',
      intro: [
        'Perulangan for menjalankan satu blok untuk setiap nilai dalam sebuah urutan. Fungsi range() menyediakan urutan bilangan bulat tanpa perlu menuliskan setiap bilangan satu per satu. Variabel perulangan berubah mengikuti nilai yang sedang dikunjungi.',
        'Bentuk range(mulai, berhenti) menyertakan nilai mulai tetapi tidak menyertakan nilai berhenti. Jadi, untuk mencetak nomor satu sampai empat, batas berhentinya harus lima. Indentasi menentukan instruksi mana yang diulang.',
      ],
      example: `for nomor in range(3, 6):
    print(f"Rak {nomor}")`,
      task: [
        'Gunakan satu for dan range() untuk menghasilkan nomor 1 sampai 4.',
        'Untuk setiap nomor, cetak Petak diikuti satu spasi dan nomornya, satu petak per baris.',
      ],
      starter: `# Buat label empat petak tanpa menulis empat print() terpisah.
`,
      solution: `for nomor in range(1, 5):
    print(f"Petak {nomor}")`,
      expected: 'Petak 1\nPetak 2\nPetak 3\nPetak 4',
      hints: [
        'Nilai kedua range() adalah batas yang tidak ikut dihasilkan.',
        'Gunakan for nomor in range(1, 5): dan cetak f"Petak {nomor}" di dalam bloknya.',
      ],
      xp: 15,
    },
    {
      id: 'python-18',
      title: 'Isi Ember Bertahap',
      chapter: 3,
      type: 'code',
      language: 'python',
      intro: [
        'Perulangan while mengulangi blok selama kondisinya benar. Kondisi diperiksa sebelum setiap putaran, sehingga blok bisa tidak berjalan sama sekali jika syarat awal sudah salah. Bentuk ini cocok ketika jumlah putaran bergantung pada keadaan yang berubah.',
        'Variabel yang menentukan kondisi harus diperbarui agar perulangan dapat selesai. Operator += adalah bentuk singkat penambahan lalu penugasan. Pada latihan ini, volume bertambah dua liter setiap putaran dan akhirnya mencapai batas yang menghentikan pengisian.',
      ],
      example: `sisa = 9
while sisa > 0:
    print(f"Sisa {sisa}")
    sisa -= 3
print("Hitungan selesai")`,
      task: [
        'Mulai dari volume 0 dan ulangi pengisian selama volume kurang dari 6.',
        'Di setiap putaran, tambahkan 2 pada volume terlebih dahulu, lalu cetak Volume: diikuti nilai baru.',
        'Setelah perulangan berhenti, cetak Ember siap.',
      ],
      starter: `volume = 0
batas = 6
`,
      solution: `volume = 0
batas = 6
while volume < batas:
    volume += 2
    print(f"Volume: {volume}")
print("Ember siap")`,
      expected: 'Volume: 2\nVolume: 4\nVolume: 6\nEmber siap',
      hints: [
        'Cetak sesudah volume diperbarui agar keluaran pertama adalah 2, bukan 0.',
        'Gunakan while volume < batas:, lalu volume += 2 di dalamnya. Pesan Ember siap berada di luar blok.',
      ],
      xp: 15,
    },
    {
      id: 'python-19',
      title: 'Akumulasi Iuran Harian',
      chapter: 3,
      type: 'code',
      language: 'python',
      intro: [
        'Akumulator adalah variabel yang menyimpan hasil sementara selama perulangan. Untuk penjumlahan, nilainya biasanya dimulai dari nol. Setiap putaran menambahkan kontribusi baru, sehingga nilai akhir merupakan gabungan seluruh putaran.',
        'Variabel akumulator harus dibuat sebelum perulangan. Jika diisi nol di dalam blok, hasil sebelumnya akan terhapus pada setiap putaran. Letakkan print() setelah perulangan jika yang dibutuhkan hanya total akhir, bukan semua total sementara.',
      ],
      example: `total = 0
for hari in range(1, 4):
    total += hari * 200
print(f"Total kupon: {total}")`,
      task: [
        'Selama hari 1 sampai 5, iuran pada hari ke-n adalah n dikali 1000.',
        'Gunakan akumulator total dan perulangan untuk menjumlahkan seluruh iuran.',
        'Cetak hanya Total iuran: 15000 setelah semua hari diproses.',
      ],
      starter: `total = 0
# Tambahkan iuran lima hari ke total yang sama.
`,
      solution: `total = 0
for hari in range(1, 6):
    total += hari * 1000
print(f"Total iuran: {total}")`,
      expected: 'Total iuran: 15000',
      hints: [
        'Jumlah yang ditambahkan berubah bersama variabel hari: 1000, 2000, hingga 5000.',
        'Di dalam for hari in range(1, 6):, tulis total += hari * 1000. Cetak total sesudah blok berakhir.',
      ],
      xp: 15,
    },
    {
      id: 'python-20',
      title: 'Seleksi Nomor Pengambilan',
      chapter: 3,
      type: 'code',
      language: 'python',
      intro: [
        'continue melewati sisa instruksi pada putaran saat ini dan melanjutkan ke putaran berikutnya. break berbeda: perintah ini langsung menghentikan perulangan terdekat. Keduanya membantu menangani nilai yang harus dilewati atau batas yang menghentikan pencarian.',
        'Urutan pemeriksaan memengaruhi hasil. Periksa batas berhenti sebelum memproses nomor, lalu abaikan nomor yang tidak memenuhi syarat. Untuk membedakan genap dan ganjil, sisa pembagian sebuah nomor dengan dua dapat diperiksa memakai %.',
      ],
      example: `for nomor in range(1, 10):
    if nomor > 5:
        break
    if nomor == 3:
        continue
    print(nomor)`,
      task: [
        'Jelajahi nomor 1 sampai 10 menggunakan range(1, 11), tetapi hentikan perulangan dengan break saat nomor lebih besar dari 7.',
        'Lewati nomor genap menggunakan continue dan pemeriksaan sisa pembagian dengan dua.',
        'Cetak nomor ganjil yang tersisa, masing-masing pada baris tersendiri.',
      ],
      starter: `# Batas layanan adalah nomor 7; hanya nomor ganjil yang diumumkan.
`,
      solution: `for nomor in range(1, 11):
    if nomor > 7:
        break
    if nomor % 2 == 0:
        continue
    print(nomor)`,
      expected: '1\n3\n5\n7',
      hints: [
        'Sisa pembagian nol berarti nomor genap. Perintah print() harus berada setelah pemeriksaan continue.',
        'Di dalam for, periksa nomor > 7 untuk break, lalu nomor % 2 == 0 untuk continue, baru cetak nomor.',
      ],
      xp: 15,
    },
    {
      id: 'python-21',
      title: 'Koordinat Persemaian',
      chapter: 3,
      type: 'code',
      language: 'python',
      intro: [
        'Perulangan bersarang menempatkan sebuah perulangan di dalam perulangan lain. Untuk setiap satu putaran luar, seluruh putaran dalam dijalankan kembali dari awal. Pola ini sesuai untuk mengunjungi koordinat baris dan kolom sebuah susunan.',
        'Jumlah pekerjaan keseluruhan merupakan hasil kali banyaknya putaran luar dan dalam. Dua baris dengan tiga kolom menghasilkan enam koordinat. Gunakan nama variabel yang berbeda agar posisi baris tidak tertimpa oleh posisi kolom.',
      ],
      example: `for rak in range(1, 4):
    for tingkat in range(1, 3):
        print(f"R{rak}-T{tingkat}")`,
      task: [
        'Gunakan perulangan luar untuk baris 1 sampai 2 dan perulangan dalam untuk kolom 1 sampai 3.',
        'Cetak setiap koordinat dengan format B1-K1, menggunakan nilai baris dan kolom yang sedang dikunjungi.',
        'Selesaikan semua kolom pada baris pertama sebelum pindah ke baris kedua.',
      ],
      starter: `jumlah_baris = 2
jumlah_kolom = 3
`,
      solution: `jumlah_baris = 2
jumlah_kolom = 3
for baris in range(1, jumlah_baris + 1):
    for kolom in range(1, jumlah_kolom + 1):
        print(f"B{baris}-K{kolom}")`,
      expected: 'B1-K1\nB1-K2\nB1-K3\nB2-K1\nB2-K2\nB2-K3',
      hints: [
        'Kedua batas akhir range() perlu ditambah satu karena nilai berhenti tidak ikut dihasilkan.',
        'Print berada dua tingkat indentasi di dalam for baris lalu for kolom, dengan string f"B{baris}-K{kolom}".',
      ],
      xp: 15,
    },
    {
      id: 'python-22',
      title: 'Isi Keranjang',
      chapter: 4,
      type: 'code',
      language: 'python',
      intro: [
        'List menyimpan beberapa nilai dalam satu urutan. Penulisannya memakai kurung siku dengan elemen dipisahkan koma. Setiap elemen memiliki indeks mulai dari nol, sehingga elemen pertama diakses dengan daftar[0], bukan daftar[1].',
        'Indeks negatif menghitung dari belakang: -1 menunjuk elemen terakhir. Fungsi len() memberikan banyaknya elemen. Pastikan indeks masih berada dalam rentang list karena meminta elemen yang tidak ada akan menimbulkan kesalahan.',
      ],
      example: `alat = ["cangkul", "selang", "sarung tangan"]
print(alat[0])
print(alat[-1])
print(len(alat))`,
      task: [
        'Gunakan list panen yang tersedia untuk mencetak elemen pertama, lalu elemen terakhir.',
        'Cetak banyaknya elemen panen menggunakan len() pada baris ketiga.',
        'Akses elemen melalui indeks, bukan dengan mengetik ulang nama sayurnya di print().',
      ],
      starter: `panen = ["bayam", "kangkung", "tomat", "terung"]
`,
      solution: `panen = ["bayam", "kangkung", "tomat", "terung"]
print(panen[0])
print(panen[-1])
print(len(panen))`,
      expected: 'bayam\nterung\n4',
      hints: [
        'Elemen pertama memiliki indeks 0 dan elemen terakhir dapat dijangkau dengan indeks -1.',
        'Gunakan print(panen[0]), print(panen[-1]), lalu print(len(panen)).',
      ],
      xp: 15,
    },
    {
      id: 'python-23',
      title: 'Cuplikan Jadwal Jaga',
      chapter: 4,
      type: 'code',
      language: 'python',
      intro: [
        'Slicing mengambil bagian urutan dengan bentuk daftar[mulai:berhenti]. Indeks mulai disertakan, sedangkan indeks berhenti tidak. Hasil slicing merupakan list baru dan tidak mengubah urutan asal, sehingga aman dipakai untuk membuat cuplikan jadwal.',
        'Batas yang dihilangkan berarti awal atau akhir urutan. Bentuk [:3] mengambil tiga elemen pertama, sedangkan [-2:] mengambil dua elemen terakhir. Bagian ketiga adalah langkah; [::2] mengambil setiap elemen kedua mulai dari indeks nol.',
      ],
      example: `nomor = [10, 20, 30, 40, 50, 60]
print(nomor[1:4])
print(nomor[-3:])
print(nomor[::3])`,
      task: [
        'Dari list hari, cetak tiga hari pertama menggunakan slicing.',
        'Cetak dua hari terakhir menggunakan indeks awal negatif.',
        'Cetak hari pada indeks 0, 2, dan 4 menggunakan langkah 2; tampilkan setiap hasil sebagai list Python.',
      ],
      starter: `hari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
`,
      solution: `hari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
print(hari[:3])
print(hari[-2:])
print(hari[::2])`,
      expected: "['Senin', 'Selasa', 'Rabu']\n['Jumat', 'Sabtu']\n['Senin', 'Rabu', 'Jumat']",
      hints: [
        'Tidak perlu membuat list baru secara manual; tulis ekspresi slicing langsung di dalam print().',
        'Tiga potongan yang diperlukan adalah hari[:3], hari[-2:], dan hari[::2].',
      ],
      xp: 15,
    },
    {
      id: 'python-24',
      title: 'Perbarui Daftar Bekal',
      chapter: 4,
      type: 'code',
      language: 'python',
      intro: [
        'List bersifat mutable: isinya dapat berubah setelah dibuat. Penugasan ke suatu indeks mengganti satu elemen, append() menambahkan elemen di akhir, dan remove() menghapus kemunculan pertama nilai yang cocok. Metode dipanggil dengan titik setelah nama list.',
        'Metode yang mengubah list seperti append() dan remove() mengembalikan None, bukan list hasil perubahan. Karena itu, jalankan metodenya pada baris tersendiri lalu cetak listnya. remove() memerlukan nilai yang benar-benar ada agar tidak menimbulkan kesalahan.',
      ],
      example: `alat = ["sapu", "kain", "ember"]
alat[0] = "sikat"
alat.append("sabun")
alat.remove("kain")
print(alat)`,
      task: [
        'Ganti "teh" pada indeks 1 dengan "air" melalui penugasan indeks.',
        'Tambahkan "pisang" di akhir menggunakan append(), lalu hapus "biskuit" menggunakan remove().',
        'Cetak list bekal setelah semua perubahan selesai.',
      ],
      starter: `bekal = ["roti", "teh", "biskuit"]
`,
      solution: `bekal = ["roti", "teh", "biskuit"]
bekal[1] = "air"
bekal.append("pisang")
bekal.remove("biskuit")
print(bekal)`,
      expected: "['roti', 'air', 'pisang']",
      hints: [
        'Lakukan tiga perubahan pada list yang sama; jangan menugaskan hasil append() kembali ke bekal.',
        'Gunakan bekal[1] = "air", bekal.append("pisang"), lalu bekal.remove("biskuit") sebelum print(bekal).',
      ],
      xp: 15,
    },
    {
      id: 'python-25',
      title: 'Audit Panen Harian',
      chapter: 4,
      type: 'code',
      language: 'python',
      intro: [
        'For dapat mengunjungi nilai dalam list secara langsung. Saat nomor urut juga diperlukan, enumerate() menghasilkan pasangan nomor dan nilai. Argumen start=1 membuat penomoran laporan dimulai dari satu tanpa mengubah indeks asli list.',
        'Pasangan tersebut dapat diterima oleh dua variabel di kepala for, misalnya hari dan berat. Pola ini menghindari pengelolaan indeks secara manual. Akumulator tetap dapat dipakai untuk menghitung total sambil mencetak rincian setiap elemen.',
      ],
      example: `air_liter = [3, 5, 4]
total = 0
for sesi, liter in enumerate(air_liter, start=1):
    print(f"Sesi {sesi}: {liter} L")
    total += liter
print(f"Total: {total} L")`,
      task: [
        'Jelajahi panen_kg dengan enumerate(..., start=1) agar hari diberi nomor 1 sampai 4.',
        'Cetak setiap rincian dalam format Hari 1: 4 kg, dengan nomor dan berat sesuai datanya.',
        'Akumulasikan berat, lalu cetak Total: 18 kg setelah seluruh rincian.',
      ],
      starter: `panen_kg = [4, 6, 3, 5]
total = 0
`,
      solution: `panen_kg = [4, 6, 3, 5]
total = 0
for hari, berat in enumerate(panen_kg, start=1):
    print(f"Hari {hari}: {berat} kg")
    total += berat
print(f"Total: {total} kg")`,
      expected: 'Hari 1: 4 kg\nHari 2: 6 kg\nHari 3: 3 kg\nHari 4: 5 kg\nTotal: 18 kg',
      hints: [
        'Gunakan dua variabel di kepala for: satu menerima nomor dari enumerate(), satu lagi menerima berat dari list.',
        'Tulis for hari, berat in enumerate(panen_kg, start=1):, cetak rinciannya, dan tambahkan berat ke total di dalam blok.',
      ],
      xp: 15,
    },
    {
      id: 'python-26',
      title: 'Urutkan Sampel Ukuran',
      chapter: 4,
      type: 'code',
      language: 'python',
      intro: [
        'Fungsi sorted() menghasilkan list baru yang sudah diurutkan, sementara list asal tetap sama. Sebaliknya, metode sort() mengubah list asal. Memilih sorted() berguna ketika urutan pengamatan awal masih diperlukan untuk pelacakan data.',
        'Fungsi min() dan max() mengambil nilai terkecil dan terbesar dari kumpulan angka. Selisih keduanya disebut rentang. Pada latihan ini list tidak kosong, sehingga nilai minimum dan maksimum selalu tersedia dan dapat dihitung tanpa penanganan khusus.',
      ],
      example: `tinggi = [12, 9, 15, 11]
terurut = sorted(tinggi)
print(terurut)
print(tinggi)
print(max(tinggi) - min(tinggi))`,
      task: [
        'Buat variabel terurut dari sorted(ukuran), lalu cetak hasil urutan menaiknya.',
        'Cetak ukuran untuk membuktikan urutan data asal tidak berubah.',
        'Hitung selisih nilai terbesar dan terkecil, lalu cetak Rentang: 8.',
      ],
      starter: `ukuran = [18, 12, 20, 15]
`,
      solution: `ukuran = [18, 12, 20, 15]
terurut = sorted(ukuran)
print(terurut)
print(ukuran)
rentang = max(ukuran) - min(ukuran)
print(f"Rentang: {rentang}")`,
      expected: '[12, 15, 18, 20]\n[18, 12, 20, 15]\nRentang: 8',
      hints: [
        'Jangan memakai ukuran.sort() karena itu akan mengubah urutan data yang harus dicetak pada baris kedua.',
        'Gunakan terurut = sorted(ukuran) dan rentang = max(ukuran) - min(ukuran), lalu cetak ketiga hasil sesuai urutan tugas.',
      ],
      xp: 15,
    },
    {
      id: 'python-27',
      title: 'Saring Berat Layak Kirim',
      chapter: 4,
      type: 'code',
      language: 'python',
      intro: [
        'List comprehension membuat list baru dari sebuah perulangan dalam satu ekspresi. Bentuk dasarnya adalah [ekspresi for nilai in sumber]. Tambahkan if di belakang untuk memasukkan hanya elemen yang memenuhi syarat tertentu.',
        'Penyaringan dan perubahan nilai dapat dilakukan sekaligus. Syarat memeriksa nilai dari sumber, lalu ekspresi menentukan nilai yang dimasukkan ke hasil. List asal tidak berubah, sehingga berat sebelum penyesuaian tetap dapat dipakai untuk laporan lain.',
      ],
      example: `panjang = [3, 8, 5, 10]
potongan = [nilai * 2 for nilai in panjang if nilai >= 6]
print(potongan)
print(sum(potongan))`,
      task: [
        'Dari berat_gram, pilih hanya berat minimal 200 gram menggunakan list comprehension.',
        'Kurangi setiap berat yang lolos dengan 10 gram untuk memperhitungkan kemasan, lalu simpan hasilnya sebagai bersih.',
        'Cetak bersih, kemudian cetak Total bersih: 660 gram menggunakan sum(bersih).',
      ],
      starter: `berat_gram = [180, 250, 210, 160, 230]
`,
      solution: `berat_gram = [180, 250, 210, 160, 230]
bersih = [berat - 10 for berat in berat_gram if berat >= 200]
print(bersih)
print(f"Total bersih: {sum(bersih)} gram")`,
      expected: '[240, 200, 220]\nTotal bersih: 660 gram',
      hints: [
        'Syarat if memakai berat asli, sedangkan ekspresi di bagian depan memakai berat yang sudah dikurangi kemasan.',
        'Susun comprehension sebagai [berat - 10 for berat in berat_gram if berat >= 200], lalu jumlahkan list hasilnya.',
      ],
      xp: 15,
    },
    {
      id: 'python-28',
      title: 'Pengumuman yang Bisa Dipakai Ulang',
      chapter: 5,
      type: 'code',
      language: 'python',
      intro: [
        'Fungsi mengelompokkan instruksi dengan sebuah nama agar dapat dipanggil kembali. Definisikan fungsi memakai def, nama fungsi, kurung, dan titik dua. Instruksi di dalamnya harus berindentasi, sama seperti blok perulangan atau percabangan.',
        'Mendefinisikan fungsi tidak langsung menjalankan isinya. Blok baru dieksekusi ketika nama fungsi dipanggil dengan kurung. Fungsi tanpa parameter cocok untuk sebuah tindakan tetap, seperti membacakan dua baris pengingat yang selalu sama.',
      ],
      example: `def buka_loket():
    print("Loket dibuka")
    print("Siapkan kartu")

buka_loket()
buka_loket()`,
      task: [
        'Definisikan fungsi pengingat() tanpa parameter yang mencetak Cek keran lalu Tutup pagar.',
        'Panggil pengingat() dua kali setelah definisinya.',
        'Biarkan kedua print() berada di dalam fungsi, sehingga keluarannya menjadi empat baris.',
      ],
      starter: `# Satukan dua pesan penutupan kebun dalam fungsi bernama pengingat.
`,
      solution: `def pengingat():
    print("Cek keran")
    print("Tutup pagar")

pengingat()
pengingat()`,
      expected: 'Cek keran\nTutup pagar\nCek keran\nTutup pagar',
      hints: [
        'Definisi dimulai dengan def pengingat():, tetapi masih diperlukan pemanggilan agar ada keluaran.',
        'Indentasikan kedua print() di bawah def, lalu tulis pengingat() dua kali tanpa indentasi setelah blok fungsi.',
      ],
      xp: 15,
    },
    {
      id: 'python-29',
      title: 'Label untuk Setiap Wadah',
      chapter: 5,
      type: 'code',
      language: 'python',
      intro: [
        'Parameter adalah nama masukan yang ditulis pada definisi fungsi. Argumen adalah nilai nyata yang diberikan saat fungsi dipanggil. Dengan parameter, satu fungsi dapat menjalankan pola kerja yang sama untuk data yang berbeda.',
        'Argumen posisi dipasangkan dengan parameter berdasarkan urutannya. Jika definisinya menerima nama lalu jumlah, panggilan juga harus mengirim nama lalu jumlah. Nama parameter hanya dipakai di dalam fungsi untuk merujuk data panggilan tersebut.',
      ],
      example: `def label_alat(nama, jumlah):
    print(f"{nama}: {jumlah} unit")

label_alat("Sekop", 3)
label_alat("Ember", 5)`,
      task: [
        'Buat fungsi label_wadah(tanaman, jumlah) yang mencetak nama tanaman, titik dua, satu spasi, jumlah, dan kata pot.',
        'Panggil fungsi untuk Selada dengan jumlah 8, kemudian Cabai dengan jumlah 5.',
        'Gunakan parameter di dalam f-string, bukan nama tanaman tetap di dalam definisi.',
      ],
      starter: `# Dua wadah berbeda akan memakai pola label yang sama.
`,
      solution: `def label_wadah(tanaman, jumlah):
    print(f"{tanaman}: {jumlah} pot")

label_wadah("Selada", 8)
label_wadah("Cabai", 5)`,
      expected: 'Selada: 8 pot\nCabai: 5 pot',
      hints: [
        'Definisi memiliki dua parameter yang dipisahkan koma di dalam kurung.',
        'Isi fungsi dengan print(f"{tanaman}: {jumlah} pot"), lalu panggil label_wadah("Selada", 8) dan label_wadah("Cabai", 5).',
      ],
      xp: 15,
    },
    {
      id: 'python-30',
      title: 'Mengembalikan Luas Petak',
      chapter: 5,
      type: 'code',
      language: 'python',
      intro: [
        'return mengirim nilai hasil fungsi kepada kode yang memanggilnya. Berbeda dari print(), return tidak menampilkan teks. Nilai yang dikembalikan dapat disimpan, dijumlahkan, atau diteruskan ke fungsi lain sebelum akhirnya ditampilkan.',
        'Fungsi yang hanya mencetak tetapi tidak mengembalikan nilai menghasilkan None. Jika hasil diperlukan untuk hitungan berikutnya, pilih return. Pada perhitungan luas, memisahkan proses menghitung dari menampilkan membuat fungsi dapat digunakan untuk beberapa petak sekaligus.',
      ],
      example: `def keliling(panjang, lebar):
    return 2 * (panjang + lebar)

pagar = keliling(5, 2)
print(f"Pagar: {pagar} meter")`,
      task: [
        'Definisikan luas(panjang, lebar) yang mengembalikan hasil perkalian kedua parameter tanpa mencetak dari dalam fungsi.',
        'Hitung luas petak berukuran 6 × 3 dan 4 × 2, lalu jumlahkan kedua hasil pemanggilan.',
        'Cetak Total luas: 26 m2 dari jumlah luas yang dihitung.',
      ],
      starter: `panjang_a = 6
lebar_a = 3
panjang_b = 4
lebar_b = 2
`,
      solution: `def luas(panjang, lebar):
    return panjang * lebar

panjang_a = 6
lebar_a = 3
panjang_b = 4
lebar_b = 2
total = luas(panjang_a, lebar_a) + luas(panjang_b, lebar_b)
print(f"Total luas: {total} m2")`,
      expected: 'Total luas: 26 m2',
      hints: [
        'Hasil fungsi harus berupa angka agar dua pemanggilannya bisa dijumlahkan.',
        'Gunakan return panjang * lebar di dalam luas(), lalu jumlahkan luas(panjang_a, lebar_a) dan luas(panjang_b, lebar_b).',
      ],
      xp: 15,
    },
    {
      id: 'python-31',
      title: 'Tarif Kompos Bawaan',
      chapter: 5,
      type: 'code',
      language: 'python',
      intro: [
        'Parameter dapat memiliki nilai bawaan yang dipakai ketika pemanggil tidak memberikan argumen tersebut. Tulis nilai bawaan dengan = di definisi, misalnya harga=1500. Parameter tanpa nilai bawaan harus diletakkan sebelum parameter dengan nilai bawaan.',
        'Argumen bernama memperjelas nilai yang ingin diubah, seperti harga=2000 pada saat pemanggilan. Nilai itu hanya berlaku untuk panggilan tersebut. Nilai bawaan tetap tersedia untuk panggilan lain yang tidak menyebut harga.',
      ],
      example: `def biaya_antar(jarak, tarif=2000):
    return jarak * tarif

print(biaya_antar(3))
print(biaya_antar(3, tarif=2500))`,
      task: [
        'Buat fungsi biaya_kompos(kg, harga=1500) yang mengembalikan kg dikali harga.',
        'Cetak hasil pembelian 4 kg menggunakan harga bawaan.',
        'Cetak hasil pembelian 4 kg dengan argumen bernama harga=2000 pada baris berikutnya.',
      ],
      starter: `jumlah_kg = 4
# Bandingkan harga biasa dengan harga kemasan khusus.
`,
      solution: `def biaya_kompos(kg, harga=1500):
    return kg * harga

jumlah_kg = 4
print(biaya_kompos(jumlah_kg))
print(biaya_kompos(jumlah_kg, harga=2000))`,
      expected: '6000\n8000',
      hints: [
        'Panggilan pertama cukup memberi jumlah kilogram karena harga sudah memiliki nilai bawaan.',
        'Definisikan def biaya_kompos(kg, harga=1500): dengan return kg * harga, lalu gunakan harga=2000 hanya pada panggilan kedua.',
      ],
      xp: 15,
    },
    {
      id: 'python-32',
      title: 'Racik Laporan Hemat Air',
      chapter: 5,
      type: 'code',
      language: 'python',
      intro: [
        'Fungsi kecil dapat digabungkan dengan meneruskan hasil satu fungsi sebagai argumen fungsi berikutnya. Pemisahan ini membuat aturan hitungan dan cara penyajian dapat diperiksa sendiri-sendiri. Fungsi penghitung tidak perlu mengetahui kalimat laporan.',
        'Variabel yang dibuat di dalam fungsi bersifat lokal terhadap pemanggilan fungsi itu. Untuk membawa hasil keluar, gunakan return, bukan bergantung pada perubahan variabel global. Aliran data menjadi jelas: masukan masuk melalui parameter dan hasil keluar melalui return.',
      ],
      example: `def sisa_stok(awal, dipakai):
    sisa = awal - dipakai
    return sisa

def buat_label(jumlah):
    return f"Sisa alat: {jumlah}"

hasil = sisa_stok(15, 4)
print(buat_label(hasil))`,
      task: [
        'Buat hitung_hemat(sebelum, sesudah) yang menyimpan selisih sebagai variabel lokal hemat, lalu mengembalikannya.',
        'Buat format_laporan(liter) yang mengembalikan string Hemat air: diikuti nilai liter dan satuan L.',
        'Hitung penghematan dari 120 ke 85 liter, teruskan hasilnya ke format_laporan(), dan cetak laporan tersebut.',
      ],
      starter: `sebelum = 120
sesudah = 85
`,
      solution: `def hitung_hemat(sebelum, sesudah):
    hemat = sebelum - sesudah
    return hemat

def format_laporan(liter):
    return f"Hemat air: {liter} L"

sebelum = 120
sesudah = 85
hasil = hitung_hemat(sebelum, sesudah)
print(format_laporan(hasil))`,
      expected: 'Hemat air: 35 L',
      hints: [
        'Fungsi pertama mengembalikan angka, sedangkan fungsi kedua mengembalikan string. Hanya kode pemanggil yang mencetak.',
        'Gunakan hemat = sebelum - sesudah di fungsi pertama dan return f"Hemat air: {liter} L" di fungsi kedua.',
      ],
      xp: 15,
    },
    {
      id: 'python-33',
      title: 'Ringkasan Data yang Aman',
      chapter: 5,
      type: 'code',
      language: 'python',
      intro: [
        'Return dapat menghentikan fungsi lebih awal ketika suatu kondisi khusus ditemukan. Pola ini berguna untuk menangani data kosong sebelum menjalankan hitungan yang membutuhkan elemen, seperti pembagian dengan jumlah data atau pengambilan nilai terbesar.',
        'Fungsi juga dapat mengembalikan beberapa nilai sebagai tuple, misalnya return total, rata. Pemanggil dapat membongkar tuple itu ke dua variabel. Dengan kesepakatan hasil yang konsisten, daftar kosong dan daftar berisi data tetap dapat diproses dengan cara yang sama.',
      ],
      example: `def rentang_data(angka):
    if len(angka) == 0:
        return 0, 0
    return min(angka), max(angka)

terkecil, terbesar = rentang_data([6, 2, 9])
print(terkecil, terbesar)`,
      task: [
        'Buat ringkas(data): jika list kosong, kembalikan pasangan 0 dan 0.0; selain itu kembalikan jumlah dan rata-ratanya.',
        'Panggil fungsi untuk [6, 9, 12], bongkar hasilnya, lalu cetak Total: 27 dan Rata-rata: 9.0 pada dua baris.',
        'Panggil lagi dengan list kosong dan cetak Kosong: 0 | 0.0; format semua rata-rata dengan satu angka desimal.',
      ],
      starter: `pengamatan = [6, 9, 12]
data_kosong = []
`,
      solution: `def ringkas(data):
    if len(data) == 0:
        return 0, 0.0
    total = sum(data)
    return total, total / len(data)

pengamatan = [6, 9, 12]
data_kosong = []
total, rata = ringkas(pengamatan)
print(f"Total: {total}")
print(f"Rata-rata: {rata:.1f}")
total_kosong, rata_kosong = ringkas(data_kosong)
print(f"Kosong: {total_kosong} | {rata_kosong:.1f}")`,
      expected: 'Total: 27\nRata-rata: 9.0\nKosong: 0 | 0.0',
      hints: [
        'Periksa len(data) == 0 sebelum membagi. Kedua jalur harus mengembalikan dua nilai agar pembongkaran hasil tetap berhasil.',
        'Setelah return 0, 0.0 untuk data kosong, hitung total = sum(data) dan return total, total / len(data).',
      ],
      xp: 15,
    },
    {
      id: 'python-34',
      title: 'Kartu Tanaman Berbentuk Objek',
      chapter: 6,
      type: 'code',
      language: 'python',
      intro: [
        'Kelas mendefinisikan bentuk objek yang memiliki data dan perilaku. Gunakan class untuk membuat kelas, lalu panggil nama kelas untuk membuat objeknya. Metode __init__ dijalankan ketika objek baru dibuat dan biasanya dipakai untuk menyiapkan atribut awal.',
        'Parameter self merujuk pada objek yang sedang ditangani. Penugasan self.nama menyimpan atribut pada objek tersebut, sedangkan nama tanpa self hanyalah variabel lokal. Atribut objek dapat dibaca dari luar dengan notasi titik, misalnya objek.nama.',
      ],
      example: `class Alat:
    def __init__(self, nama, berat):
        self.nama = nama
        self.berat = berat

sekop = Alat("Sekop kecil", 2)
print(f"{sekop.nama}: {sekop.berat} kg")`,
      task: [
        'Definisikan kelas Tanaman dengan __init__(self, nama, umur_hari) yang menyimpan kedua data sebagai atribut objek.',
        'Buat objek bibit dengan nama "Kemangi" dan umur 12 hari.',
        'Baca atribut objek untuk mencetak Kemangi berumur 12 hari.',
      ],
      starter: `# Modelkan satu tanaman dengan dua atribut: nama dan umur_hari.
`,
      solution: `class Tanaman:
    def __init__(self, nama, umur_hari):
        self.nama = nama
        self.umur_hari = umur_hari

bibit = Tanaman("Kemangi", 12)
print(f"{bibit.nama} berumur {bibit.umur_hari} hari")`,
      expected: 'Kemangi berumur 12 hari',
      hints: [
        'Definisi __init__ berada satu tingkat di dalam class; penugasan atribut berada satu tingkat lagi di dalam metode.',
        'Simpan self.nama = nama dan self.umur_hari = umur_hari, lalu buat bibit = Tanaman("Kemangi", 12).',
      ],
      xp: 15,
    },
    {
      id: 'python-35',
      title: 'Tandon yang Bisa Diisi',
      chapter: 6,
      type: 'code',
      language: 'python',
      intro: [
        'Metode adalah fungsi yang menjadi bagian dari kelas. Metode menerima self agar dapat membaca atau mengubah atribut objek. Saat dipanggil sebagai objek.metode(...), Python memberikan self secara otomatis; pemanggil hanya menyediakan argumen lainnya.',
        'Perubahan atribut tetap tersimpan setelah metode selesai. Ini memungkinkan objek mewakili keadaan yang berkembang, seperti volume tandon sesudah beberapa kali diisi. Gunakan atribut pada self, bukan variabel lokal baru, ketika perubahan harus bertahan.',
      ],
      example: `class Penghitung:
    def __init__(self):
        self.nilai = 0

    def tambah(self, banyak):
        self.nilai += banyak

kunjungan = Penghitung()
kunjungan.tambah(4)
kunjungan.tambah(3)
print(kunjungan.nilai)`,
      task: [
        'Tambahkan metode isi(self, liter) pada kelas Tandon yang menambahkan liter ke atribut volume.',
        'Buat satu tandon, lalu panggil isi(7) dan isi(5) pada objek yang sama.',
        'Cetak Volume tandon: 12 L dengan membaca volume setelah kedua pengisian.',
      ],
      starter: `class Tandon:
    def __init__(self):
        self.volume = 0

# Tambahkan metode isi di dalam kelas, lalu lakukan dua pengisian.
`,
      solution: `class Tandon:
    def __init__(self):
        self.volume = 0

    def isi(self, liter):
        self.volume += liter

tandon = Tandon()
tandon.isi(7)
tandon.isi(5)
print(f"Volume tandon: {tandon.volume} L")`,
      expected: 'Volume tandon: 12 L',
      hints: [
        'Metode isi harus sejajar dengan __init__ di dalam kelas dan memperbarui self.volume.',
        'Isi metode dengan self.volume += liter. Setelah tandon = Tandon(), panggil tandon.isi(7) lalu tandon.isi(5).',
      ],
      xp: 15,
    },
    {
      id: 'python-36',
      title: 'Dua Keranjang, Dua Persediaan',
      chapter: 6,
      type: 'code',
      language: 'python',
      intro: [
        'Setiap objek dapat memiliki keadaan sendiri meskipun dibuat dari kelas yang sama. Untuk list milik masing-masing objek, buat list itu di dalam __init__ melalui self. Menaruh list sebagai atribut kelas justru dapat membuatnya dipakai bersama oleh seluruh objek.',
        'Perbedaan ini penting ketika objek mewakili wadah terpisah. Menambahkan barang ke keranjang pertama seharusnya tidak mengubah keranjang kedua. Pengujian dengan dua objek membantu menemukan data yang tidak sengaja terbagi.',
      ],
      example: `class BukuCatatan:
    def __init__(self):
        self.catatan = []

    def tulis(self, teks):
        self.catatan.append(teks)

pagi = BukuCatatan()
sore = BukuCatatan()
pagi.tulis("Pagar terbuka")
print(pagi.catatan)
print(sore.catatan)`,
      task: [
        'Buat kelas Keranjang dengan atribut instance isi berupa list kosong dan metode tambah(self, barang) yang memakai append().',
        'Buat objek utara dan selatan. Tambahkan "wortel" dan "lobak" ke utara, serta "tomat" ke selatan.',
        'Cetak isi utara lalu isi selatan sebagai dua list; barang masing-masing keranjang harus terpisah.',
      ],
      starter: `# Buat list isi baru setiap kali sebuah Keranjang dibuat.
`,
      solution: `class Keranjang:
    def __init__(self):
        self.isi = []

    def tambah(self, barang):
        self.isi.append(barang)

utara = Keranjang()
selatan = Keranjang()
utara.tambah("wortel")
utara.tambah("lobak")
selatan.tambah("tomat")
print(utara.isi)
print(selatan.isi)`,
      expected: "['wortel', 'lobak']\n['tomat']",
      hints: [
        'Pastikan self.isi = [] berada di dalam __init__, bukan langsung di bawah class sebagai isi = [].',
        'Metode tambah berisi self.isi.append(barang). Buat dua objek dengan dua pemanggilan Keranjang() yang terpisah.',
      ],
      xp: 15,
    },
    {
      id: 'python-37',
      title: 'Paket Benih Turunan',
      chapter: 6,
      type: 'code',
      language: 'python',
      intro: [
        'Pewarisan membuat kelas baru berdasarkan kelas yang sudah ada. Tulis kelas induk di dalam kurung pada deklarasi kelas anak. Kelas anak mewarisi metode induk, tetapi dapat menambahkan data atau menyediakan versi metode yang lebih khusus.',
        'super().__init__(...) memanggil penyiapan atribut dari kelas induk sehingga kode umum tidak perlu disalin. Ketika kelas anak mendefinisikan metode dengan nama yang sama, pemanggilan pada objek anak memakai versi anak tersebut; perilaku ini disebut overriding.',
      ],
      example: `class Alat:
    def __init__(self, nama):
        self.nama = nama

    def label(self):
        return self.nama

class AlatListrik(Alat):
    def __init__(self, nama, watt):
        super().__init__(nama)
        self.watt = watt

    def label(self):
        return f"{self.nama}: {self.watt} W"

print(AlatListrik("Pompa", 80).label())`,
      task: [
        'Pertahankan kelas Paket yang tersedia dan buat kelas PaketBenih(Paket) dengan parameter nama dan jumlah.',
        'Pakai super().__init__(nama), simpan jumlah, lalu override label() agar mengembalikan nama diikuti " - ", jumlah, dan " benih".',
        'Cetak label Paket("Kompos"), lalu label PaketBenih("Bayam", 40) pada baris berikutnya.',
      ],
      starter: `class Paket:
    def __init__(self, nama):
        self.nama = nama

    def label(self):
        return f"Paket {self.nama}"

# Tambahkan kelas anak tanpa mengubah perilaku label Paket biasa.
`,
      solution: `class Paket:
    def __init__(self, nama):
        self.nama = nama

    def label(self):
        return f"Paket {self.nama}"

class PaketBenih(Paket):
    def __init__(self, nama, jumlah):
        super().__init__(nama)
        self.jumlah = jumlah

    def label(self):
        return f"{self.nama} - {self.jumlah} benih"

print(Paket("Kompos").label())
print(PaketBenih("Bayam", 40).label())`,
      expected: 'Paket Kompos\nBayam - 40 benih',
      hints: [
        'Kelas induk tetap menangani nama. Kelas anak hanya menambahkan jumlah dan mengganti cara membuat label.',
        'Di __init__ anak, panggil super().__init__(nama) lalu self.jumlah = jumlah. Label anak mengembalikan f"{self.nama} - {self.jumlah} benih".',
      ],
      xp: 15,
    },
    {
      id: 'python-38',
      title: 'Kebun sebagai Kumpulan Petak',
      chapter: 6,
      type: 'code',
      language: 'python',
      intro: [
        'Komposisi membentuk objek yang menyimpan objek lain. Sebuah kebun memiliki beberapa petak, tetapi kebun bukan jenis petak; hubungan seperti ini lebih tepat dimodelkan dengan komposisi daripada pewarisan. List dapat menyimpan objek sebagaimana menyimpan angka atau string.',
        'Metode pengelola dapat mengunjungi objek-objek anggotanya dan menggabungkan atribut mereka. Setiap kelas memegang tanggung jawab yang jelas: Petak menyimpan data satu area, sedangkan Kebun mengelola kumpulan area dan menghitung totalnya.',
      ],
      example: `class Wadah:
    def __init__(self, kapasitas):
        self.kapasitas = kapasitas

class Gudang:
    def __init__(self):
        self.wadah = []

    def kapasitas_total(self):
        return sum(item.kapasitas for item in self.wadah)

gudang = Gudang()
gudang.wadah.append(Wadah(10))
gudang.wadah.append(Wadah(15))
print(gudang.kapasitas_total())`,
      task: [
        'Lengkapi kelas Kebun dengan tambah(self, petak) untuk menyimpan objek Petak ke self.petak.',
        'Tambahkan total_luas(self) yang memakai perulangan dan akumulator untuk menjumlahkan atribut luas seluruh petak, lalu mengembalikan total.',
        'Masukkan Petak("Timur", 12) dan Petak("Barat", 8), lalu cetak Jumlah petak: 2 dan Luas kebun: 20 m2 pada dua baris.',
      ],
      starter: `class Petak:
    def __init__(self, nama, luas):
        self.nama = nama
        self.luas = luas

class Kebun:
    def __init__(self):
        self.petak = []

# Tambahkan kedua metode Kebun sebelum membuat objek kebunnya.
`,
      solution: `class Petak:
    def __init__(self, nama, luas):
        self.nama = nama
        self.luas = luas

class Kebun:
    def __init__(self):
        self.petak = []

    def tambah(self, petak):
        self.petak.append(petak)

    def total_luas(self):
        total = 0
        for petak in self.petak:
            total += petak.luas
        return total

kebun = Kebun()
kebun.tambah(Petak("Timur", 12))
kebun.tambah(Petak("Barat", 8))
print(f"Jumlah petak: {len(kebun.petak)}")
print(f"Luas kebun: {kebun.total_luas()} m2")`,
      expected: 'Jumlah petak: 2\nLuas kebun: 20 m2',
      hints: [
        'Self.petak adalah list objek, sehingga elemen di dalamnya memiliki atribut .luas yang dapat dijumlahkan.',
        'Metode tambah memakai self.petak.append(petak). Di total_luas, ulangi for petak in self.petak: lalu total += petak.luas dan return total sesudah perulangan.',
      ],
      xp: 15,
    },
    {
      id: 'python-39',
      title: 'Rencana Bedeng dengan Math',
      chapter: 7,
      type: 'code',
      language: 'python',
      intro: [
        'Modul adalah kumpulan fungsi dan nilai yang dapat digunakan melalui import. Pustaka standar Python sudah menyertakan math untuk operasi matematika umum. Setelah import math, panggil fungsi dengan awalan modul, misalnya math.sqrt() untuk akar kuadrat.',
        'Math.ceil() membulatkan ke atas menuju bilangan bulat, berguna ketika kebutuhan harus dipenuhi dengan kemasan utuh. Sementara itu, format f-string mengatur tampilan pecahan tanpa mengubah rumus. Gunakan data tetap agar perhitungan dapat diulang dengan hasil yang sama.',
      ],
      example: `import math

sisi = math.sqrt(49)
kantong = math.ceil(17 / 4)
print(f"Sisi: {sisi:.1f}")
print(f"Kantong: {kantong}")`,
      task: [
        'Impor math dan hitung sisi bedeng persegi dengan luas 81 menggunakan math.sqrt().',
        'Hitung kebutuhan karung untuk 26 kg kompos jika satu karung menampung 5 kg; gunakan math.ceil() agar semuanya tertampung.',
        'Cetak Sisi bedeng: 9.0 m dan Karung: 6 pada dua baris, dengan sisi satu angka desimal.',
      ],
      starter: `luas = 81
kompos_kg = 26
kapasitas_karung = 5
`,
      solution: `import math

luas = 81
kompos_kg = 26
kapasitas_karung = 5
sisi = math.sqrt(luas)
karung = math.ceil(kompos_kg / kapasitas_karung)
print(f"Sisi bedeng: {sisi:.1f} m")
print(f"Karung: {karung}")`,
      expected: 'Sisi bedeng: 9.0 m\nKarung: 6',
      hints: [
        'Jumlah karung harus dibulatkan ke atas, bukan dipotong dengan //, karena ada kompos tersisa.',
        'Gunakan sisi = math.sqrt(luas) dan karung = math.ceil(kompos_kg / kapasitas_karung), lalu format sisi dengan :.1f.',
      ],
      xp: 15,
    },
    {
      id: 'python-40',
      title: 'Rata-rata Bukan Selalu Wakil Terbaik',
      chapter: 7,
      type: 'code',
      language: 'python',
      intro: [
        'Modul statistics menyediakan ukuran ringkas untuk data numerik. Mean adalah jumlah seluruh nilai dibagi banyaknya data, sedangkan median adalah nilai tengah setelah data diurutkan. Keduanya menggambarkan pusat data, tetapi bereaksi berbeda terhadap nilai yang sangat besar.',
        'Satu pengamatan yang jauh dari nilai lain dapat menarik mean, sementara median lebih sedikit terpengaruh. Bandingkan keduanya sebelum menyimpulkan nilai yang mewakili data. Fungsi ini memerlukan data yang tidak kosong; latihan menyediakan lima pengamatan yang valid.',
      ],
      example: `from statistics import mean, median

waktu = [4, 5, 5, 6, 20]
print(f"Mean: {mean(waktu):.1f}")
print(f"Median: {median(waktu):.1f}")`,
      task: [
        'Impor mean dan median langsung dari statistics.',
        'Hitung kedua ukuran dari panen_kg, tanpa menghapus pengamatan 30.',
        'Cetak Rata-rata: 12.4 kg lalu Median: 8.0 kg; gunakan satu angka desimal untuk keduanya.',
      ],
      starter: `panen_kg = [7, 8, 8, 9, 30]
`,
      solution: `from statistics import mean, median

panen_kg = [7, 8, 8, 9, 30]
print(f"Rata-rata: {mean(panen_kg):.1f} kg")
print(f"Median: {median(panen_kg):.1f} kg")`,
      expected: 'Rata-rata: 12.4 kg\nMedian: 8.0 kg',
      hints: [
        'Setelah from statistics import mean, median, kedua fungsi dapat dipanggil tanpa awalan statistics.',
        'Sisipkan mean(panen_kg) dan median(panen_kg) ke f-string masing-masing dengan format :.1f.',
      ],
      xp: 15,
    },
    {
      id: 'python-41',
      title: 'Tanggal Pindah Tanam',
      chapter: 7,
      type: 'code',
      language: 'python',
      intro: [
        'Modul datetime menyediakan objek date untuk tanggal dan timedelta untuk selang waktu. Bentuk date(tahun, bulan, hari) membuat tanggal tertentu. Penjumlahan dengan timedelta(days=n) memindahkan tanggal sebanyak n hari, termasuk ketika melewati batas bulan.',
        'Mengurangi dua date menghasilkan timedelta yang memiliki atribut days. Metode isoformat() menampilkan tanggal sebagai YYYY-MM-DD, sehingga hasilnya tidak bergantung pada bahasa sistem. Tanggal awal latihan ditentukan secara tetap, bukan diambil dari jam perangkat.',
      ],
      example: `from datetime import date, timedelta

mulai = date(2026, 1, 28)
selesai = mulai + timedelta(days=7)
print(selesai.isoformat())
print((selesai - mulai).days)`,
      task: [
        'Impor date dan timedelta, lalu buat tanggal mulai 20 Februari 2026.',
        'Hitung tanggal pindah tanam tepat 14 hari setelah mulai menggunakan timedelta, bukan dengan menuliskan tanggal hasil secara langsung.',
        'Cetak Pindah tanam: 2026-03-06 dan Jeda: 14 hari; hitung jeda dari selisih kedua tanggal.',
      ],
      starter: `tahun = 2026
bulan = 2
hari = 20
jeda_hari = 14
`,
      solution: `from datetime import date, timedelta

tahun = 2026
bulan = 2
hari = 20
jeda_hari = 14
mulai = date(tahun, bulan, hari)
pindah = mulai + timedelta(days=jeda_hari)
jeda = (pindah - mulai).days
print(f"Pindah tanam: {pindah.isoformat()}")
print(f"Jeda: {jeda} hari")`,
      expected: 'Pindah tanam: 2026-03-06\nJeda: 14 hari',
      hints: [
        'Biarkan datetime menangani panjang bulan. Penambahan empat belas langsung ke nomor hari bukan cara yang aman.',
        'Gunakan pindah = mulai + timedelta(days=jeda_hari), lalu baca pindah.isoformat() dan (pindah - mulai).days.',
      ],
      xp: 15,
    },
    {
      id: 'python-42',
      title: 'Rekap Permintaan Benih',
      chapter: 7,
      type: 'code',
      language: 'python',
      intro: [
        'Dictionary memetakan kunci ke nilai, berbeda dari list yang memakai indeks posisi. Counter dari modul collections adalah bentuk khusus pemetaan untuk menghitung frekuensi. Counter(daftar) membuat setiap nilai berbeda menjadi kunci dan menyimpan banyak kemunculannya.',
        'Nilai frekuensi dapat dibaca dengan hitungan[kunci], dan kunci yang belum ada bernilai nol pada Counter. Mengulangi Counter mengunjungi kuncinya, bukan mengulang seluruh data awal. Gunakan sorted() pada kunci agar urutan laporan alfabetis ditentukan secara eksplisit.',
      ],
      example: `from collections import Counter

pilihan = ["teh", "air", "teh", "susu"]
hitungan = Counter(pilihan)
for nama in sorted(hitungan):
    print(f"{nama}: {hitungan[nama]}")
print(hitungan["kopi"])`,
      task: [
        'Buat Counter dari permintaan yang tersedia.',
        'Jelajahi kunci yang sudah diurutkan dengan sorted() dan cetak nama: jumlah untuk setiap jenis benih.',
        'Setelah laporan alfabetis, cetak tomat: 0 dengan membaca kunci "tomat" dari Counter, bukan angka nol yang ditulis langsung.',
      ],
      starter: `permintaan = ["cabai", "bayam", "cabai", "terung", "bayam", "cabai"]
`,
      solution: `from collections import Counter

permintaan = ["cabai", "bayam", "cabai", "terung", "bayam", "cabai"]
hitungan = Counter(permintaan)
for nama in sorted(hitungan):
    print(f"{nama}: {hitungan[nama]}")
print(f"tomat: {hitungan['tomat']}")`,
      expected: 'bayam: 2\ncabai: 3\nterung: 1\ntomat: 0',
      hints: [
        'Counter menerima seluruh list sekaligus. Sorted(hitungan) memberikan urutan kunci, lalu frekuensi dibaca melalui nama kunci itu.',
        'Gunakan hitungan = Counter(permintaan), for nama in sorted(hitungan):, dan hitungan[nama] untuk jumlah. Akses hitungan["tomat"] setelah perulangan.',
      ],
      xp: 15,
    },
    {
      id: 'python-43',
      title: 'Laporan Panen dalam JSON',
      chapter: 7,
      type: 'code',
      language: 'python',
      intro: [
        'JSON adalah format teks untuk menyimpan struktur data seperti objek, daftar, angka, dan string. Modul json dapat memprosesnya sepenuhnya di memori. json.loads() mengubah string JSON menjadi objek Python, sedangkan json.dumps() mengubah objek Python kembali menjadi teks JSON.',
        'Objek JSON menjadi dictionary Python, yang ditulis sebagai pasangan kunci: nilai di dalam kurung kurawal. Data daftar di dalamnya menjadi list. Akses nilai melalui kunci, tambahkan hasil perhitungan, lalu gunakan sort_keys=True saat menghasilkan JSON agar urutan kunci laporan konsisten.',
        'Latihan penutup ini menggabungkan fungsi, penjumlahan list, dan pertukaran data terstruktur. Tidak ada berkas yang dibaca atau ditulis: sumber JSON adalah string tetap, dan laporan akhir hanya dicetak ke keluaran.',
      ],
      example: `import json

teks = '{"alat": "ember", "stok": [2, 3]}'
data = json.loads(teks)
ringkasan = {"alat": data["alat"], "total": sum(data["stok"])}
print(json.dumps(ringkasan, sort_keys=True))`,
      task: [
        'Buat fungsi buat_laporan(teks) yang membaca JSON dengan json.loads() dan mengembalikan dictionary berisi kunci kebun, sesi, serta total.',
        'Ambil nama kebun dari data, hitung sesi dengan len() pada list panen, dan total dengan sum() pada list yang sama.',
        'Panggil fungsi dengan sumber yang tersedia, lalu cetak hasil json.dumps(laporan, sort_keys=True) memakai pengaturan pemisah bawaan; jangan mencetak dictionary mentah.',
      ],
      starter: `sumber = '{"kebun": "Melati", "panen": [5, 8, 7]}'
# Ubah teks sumber menjadi ringkasan, lalu kembalikan ke format JSON.
`,
      solution: `import json

def buat_laporan(teks):
    data = json.loads(teks)
    return {
        "kebun": data["kebun"],
        "sesi": len(data["panen"]),
        "total": sum(data["panen"]),
    }

sumber = '{"kebun": "Melati", "panen": [5, 8, 7]}'
laporan = buat_laporan(sumber)
print(json.dumps(laporan, sort_keys=True))`,
      expected: '{"kebun": "Melati", "sesi": 3, "total": 20}',
      hints: [
        'Setelah json.loads(), data["panen"] adalah list angka yang bisa langsung diberikan ke len() dan sum().',
        'Kembalikan {"kebun": data["kebun"], "sesi": len(data["panen"]), "total": sum(data["panen"])} dari fungsi, lalu serialisasikan dengan json.dumps(..., sort_keys=True).',
      ],
      xp: 15,
    },
  ],
};
