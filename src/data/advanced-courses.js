export const advancedCourses = [
  {
    id: 'intermediate-python', title: 'Intermediate Python', category: 'Computer Science', level: 'Menengah', theme: 'blue', symbol: 'Py',
    description: 'Kuis pengetahuan konsep Python tentang koleksi, iterasi, penanganan kegagalan, dan pemodelan objek. Contoh dibaca untuk dianalisis, bukan dijalankan oleh kompiler di aplikasi.',
    chapters: [
      { title: 'Data dan Iterasi', description: 'Menalar referensi objek, transformasi koleksi, dan iterasi hemat memori.' },
      { title: 'Program yang Tangguh', description: 'Memahami kontrak kesalahan, pengelolaan sumber daya, dan keadaan objek.' }
    ],
    lessons: [
      {
        id: 'intermediate-python-01', title: 'Salinan Tidak Selalu Mandiri', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Variabel Python menyimpan referensi ke objek. Penugasan b = a tidak menyalin daftar; keduanya menunjuk objek yang sama. list.copy() membuat daftar luar baru, tetapi elemen yang berupa objek tetap dirujuk bersama.', 'Perbedaan salinan dangkal dan mendalam penting untuk data bersarang. Mengganti elemen daftar luar berbeda dari mengubah isi daftar di dalamnya. Telusuri objek mana yang benar-benar berubah sebelum memilih strategi penyalinan.'],
        example: 'asal = [[1], [2]]\nsalinan = asal.copy()\nsalinan[0].append(9)\nprint(asal)',
        task: ['Apa yang dicetak oleh contoh tersebut?'], options: ['[[1, 9], [2]]', '[[1], [2]]', '[[9], [2]]', '[[1], [2], [9]]'], answer: 0,
        hints: ['copy() hanya membuat wadah luar yang baru.', 'append dipanggil pada daftar dalam pertama, yang masih dipakai kedua wadah.'],
        explanation: 'Hasilnya [[1, 9], [2]] karena daftar dalam pertama dibagi bersama. Kekeliruan umum adalah menganggap copy() menyalin seluruh kedalaman struktur.', xp: 15
      },
      {
        id: 'intermediate-python-02', title: 'Menyaring dengan Comprehension', chapter: 0, type: 'quiz', language: 'text',
        intro: ['List comprehension menyatukan iterasi, penyaringan, dan transformasi menjadi ekspresi pembentuk daftar. Bagian if setelah for menentukan elemen sumber yang lolos; ekspresi di depan menentukan nilai yang disimpan.', 'Urutan ini memungkinkan kita membaca aturan tanpa menebak efek samping. Gunakan comprehension untuk transformasi singkat dan murni. Jika logika berisi banyak cabang atau operasi eksternal, perulangan biasa lebih mudah diperiksa.'],
        example: 'nilai = [1, 2, 3, 4]\nhasil = [n * n for n in nilai if n % 2 == 0]',
        task: ['Apa isi hasil setelah ekspresi dievaluasi?'], options: ['[1, 9]', '[4, 16]', '[2, 4]', '[1, 4, 9, 16]'], answer: 1,
        hints: ['Operator % memberi sisa pembagian; sisa nol saat dibagi dua berarti genap.', 'Penyaringan memakai n asli, kemudian nilai yang lolos dikuadratkan.'],
        explanation: 'Hanya 2 dan 4 yang lolos, lalu diubah menjadi 4 dan 16. Jangan menyamakan ekspresi keluaran dengan syarat penyaringan.', xp: 15
      },
      {
        id: 'intermediate-python-03', title: 'Generator Berjalan Bertahap', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Fungsi yang menggunakan yield menghasilkan generator. Pemanggilan fungsi membuat iterator, sementara badan fungsi dilanjutkan ketika nilai berikutnya diminta. Keadaan lokal dipertahankan di antara dua yield.', 'Generator cocok untuk aliran data besar karena tidak harus membangun semua hasil sekaligus. Namun, generator menyimpan posisi konsumsi. Mengubah sisa generator menjadi daftar tidak mengulang nilai yang sudah diambil dengan next().'],
        example: 'def nomor():\n    yield 10\n    yield 20\n    yield 30\n\ng = nomor()\nawal = next(g)\nsisa = list(g)',
        task: ['Apa nilai sisa?'], options: ['[10, 20, 30]', '[10]', '[20, 30]', '[]'], answer: 2,
        hints: ['next(g) mengambil hasil yield pertama.', 'list(g) melanjutkan iterator yang sama, bukan memanggil nomor() kembali.'],
        explanation: 'sisa berisi [20, 30] karena 10 sudah dikonsumsi. Generator bukan koleksi yang otomatis memulai penelusuran ulang dari awal.', xp: 15
      },
      {
        id: 'intermediate-python-04', title: 'Menangkap Kesalahan yang Tepat', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Exception memisahkan jalur berhasil dari jalur gagal. Tangkap tipe kesalahan yang memang dapat dipulihkan oleh bagian program tersebut. Penangkapan terlalu luas dapat menyembunyikan bug yang seharusnya terlihat saat pengembangan.', 'Blok else pada try dijalankan jika badan try selesai tanpa exception. Ia bukan pasangan kondisi nilai benar atau salah. Konversi angka dan validasi rentang adalah dua persoalan terpisah: masukan dapat berhasil dikonversi tetapi tetap tidak memenuhi aturan bisnis.'],
        example: 'try:\n    umur = int("dua")\nexcept ValueError:\n    pesan = "Gunakan angka bulat"\nelse:\n    pesan = "Konversi berhasil"',
        task: ['Mengapa pesan berisi "Gunakan angka bulat"?'], options: ['else selalu berjalan sebelum except', 'int mengembalikan nol untuk teks nonangka', 'Semua string memicu TypeError', 'int("dua") menimbulkan ValueError yang ditangkap'], answer: 3,
        hints: ['int menerima string, tetapi isinya harus mewakili bilangan bulat yang valid.', 'Exception yang cocok memindahkan alur ke except dan melewati else.'],
        explanation: 'Jenis argumennya diterima, tetapi nilainya tidak dapat ditafsirkan sebagai integer sehingga terjadi ValueError. Jangan menganggap konversi gagal menghasilkan nilai bawaan nol.', xp: 15
      },
      {
        id: 'intermediate-python-05', title: 'Sumber Daya dan with', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Berkas terbuka merupakan sumber daya yang perlu ditutup. Pernyataan with memakai protokol context manager untuk menjalankan langkah masuk dan keluar blok secara terstruktur. Ini mengurangi ketergantungan pada pemanggilan close() manual.', 'Untuk objek berkas dari open(), keluar dari blok akan menutup berkas, termasuk ketika pembacaan memicu exception. Penutupan tidak berarti exception otomatis diabaikan; kesalahan tetap dapat diteruskan kepada pemanggil.'],
        example: 'with open("catatan.txt", encoding="utf-8") as berkas:\n    isi = berkas.read()\n# Blok with telah berakhir.',
        task: ['Jika open berhasil tetapi read menimbulkan exception, apa perilaku context manager berkas?'], options: ['Berkas ditutup dan exception tetap diteruskan', 'Berkas tetap terbuka sampai close dipanggil manual', 'Berkas ditutup dan exception selalu diabaikan oleh with', 'Pembacaan diulang otomatis sebelum berkas ditutup'], answer: 0,
        hints: ['Langkah keluar context manager juga dijalankan pada jalur exception.', 'Pengelolaan umur sumber daya berbeda dari penanganan isi kesalahan.'],
        explanation: 'Context manager berkas menutup sumber daya tanpa menelan exception pembacaan. with bukan mekanisme untuk mengubah kegagalan menjadi keberhasilan.', xp: 15
      },
      {
        id: 'intermediate-python-06', title: 'Keadaan Milik Setiap Objek', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Atribut instance menyimpan keadaan yang dimiliki satu objek. Atribut kelas berada pada kelas dan dapat dipakai bersama oleh instance. Perbedaan ini sangat terasa ketika nilainya berupa koleksi yang bisa diubah.', 'Daftar untuk barang setiap keranjang sebaiknya dibuat di __init__ dan ditempelkan pada self. Jika daftar diletakkan sebagai atribut kelas, pemanggilan append melalui satu instance dapat terlihat oleh instance lain yang merujuk daftar kelas tersebut.'],
        example: 'class Keranjang:\n    def __init__(self):\n        self.barang = []\n\na = Keranjang()\nb = Keranjang()\na.barang.append("buku")',
        task: ['Apa isi b.barang pada rancangan ini?'], options: ['["buku"]', '[]', 'None', 'Atribut barang tidak tersedia pada b'], answer: 1,
        hints: ['__init__ dipanggil untuk setiap instance baru.', 'Literal [] di dalam __init__ membuat objek daftar baru setiap kali baris itu dijalankan.'],
        explanation: 'b.barang tetap kosong karena setiap keranjang memiliki daftar sendiri. Daftar mutable sebagai atribut kelas justru berpotensi membuat keadaan terbagi tanpa sengaja.', xp: 15
      }
    ]
  },
  {
    id: 'numpy', title: 'NumPy', category: 'Data Science', level: 'Menengah', theme: 'blue', symbol: 'Np',
    description: 'Kuis konsep komputasi array: bentuk, sumbu, broadcasting, seleksi, dan tipe numerik. Seluruh contoh dapat dipelajari tanpa layanan berbayar.',
    chapters: [
      { title: 'Cara Array Berpikir', description: 'Membaca dimensi dan operasi numerik tanpa perulangan Python manual.' },
      { title: 'Seleksi dan Ketelitian', description: 'Membedakan view, mask, serta dampak pemilihan tipe data.' }
    ],
    lessons: [
      {
        id: 'numpy-01', title: 'Shape Bukan Jumlah Elemen', chapter: 0, type: 'quiz', language: 'text',
        intro: ['ndarray memiliki shape yang menyatakan panjang tiap dimensi. Array berbentuk (2, 3) memiliki dua baris dan tiga kolom, sehingga total elemennya enam. ndim menghitung banyak sumbu, bukan banyak nilai.', 'reshape mengatur ulang cara indeks mengelompokkan elemen tanpa menambah atau mengurangi jumlahnya. Satu dimensi boleh ditulis -1 agar NumPy menghitungnya, asalkan total elemen dapat dibagi sesuai dimensi lain.'],
        example: 'import numpy as np\na = np.arange(12).reshape(3, -1)',
        task: ['Berapa a.shape?'], options: ['(4, 3)', '(3, 12)', '(3, 4)', '(12, 3)'], answer: 2,
        hints: ['arange(12) menghasilkan dua belas elemen dari 0 hingga 11.', 'Tiga baris harus membagi dua belas elemen secara merata.'],
        explanation: 'Shape menjadi (3, 4) karena 12 / 3 = 4. -1 adalah dimensi yang dihitung, bukan ukuran negatif yang benar-benar disimpan.', xp: 15
      },
      {
        id: 'numpy-02', title: 'Reduksi Mengikuti Sumbu', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Operasi reduksi seperti sum menggabungkan banyak nilai menjadi lebih sedikit nilai. Parameter axis menyebut sumbu yang dikurangi. Pada matriks, axis=0 menggabungkan sepanjang baris sehingga menghasilkan satu jumlah per kolom.', 'Bayangkan sumbu yang disebut hilang dari shape hasil jika keepdims tidak diaktifkan. Untuk bentuk (2, 3), reduksi axis=0 menghasilkan bentuk (3,), sedangkan axis=1 menghasilkan bentuk (2,).'],
        example: 'import numpy as np\na = np.array([[1, 2, 3], [4, 5, 6]])\nhasil = a.sum(axis=0)',
        task: ['Apa isi hasil?'], options: ['[6, 15]', '[1, 2, 3, 4, 5, 6]', '21', '[5, 7, 9]'], answer: 3,
        hints: ['axis=0 mereduksi sumbu pertama, yaitu sumbu baris.', 'Kolom pertama menjumlahkan 1 dan 4.'],
        explanation: 'Setiap kolom dijumlahkan sehingga hasilnya [5, 7, 9]. Menafsirkan axis=0 sebagai perintah menghasilkan satu nilai per baris akan membalik maknanya.', xp: 15
      },
      {
        id: 'numpy-03', title: 'Broadcasting dari Dimensi Belakang', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Broadcasting memungkinkan operasi elemen-per-elemen pada shape yang berbeda tetapi kompatibel. NumPy membandingkan dimensi dari sisi paling kanan. Dua ukuran kompatibel jika sama atau salah satunya bernilai satu.', 'Vektor dengan tiga elemen dapat ditambahkan ke setiap baris matriks yang memiliki tiga kolom. Ini bukan perkalian matriks dan tidak berarti NumPy menerima sembarang bentuk; pasangan ukuran yang berbeda dan bukan satu tetap gagal.'],
        example: 'import numpy as np\na = np.array([[1, 2, 3], [4, 5, 6]])\nb = np.array([10, 20, 30])\nc = a + b',
        task: ['Apa baris kedua c?'], options: ['[14, 25, 36]', '[11, 22, 33]', '[44, 55, 66]', '[60, 60, 60]'], answer: 0,
        hints: ['b disejajarkan dengan sumbu kolom yang panjangnya tiga.', 'Tambahkan tiap elemen b ke posisi kolom yang sama pada baris [4, 5, 6].'],
        explanation: 'Baris kedua adalah [4+10, 5+20, 6+30]. Broadcasting memperluas dimensi yang kompatibel secara konseptual, bukan menjumlahkan seluruh vektor menjadi satu skalar.', xp: 15
      },
      {
        id: 'numpy-04', title: 'Slice Dapat Berbagi Memori', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Basic slicing pada ndarray umumnya menghasilkan view yang berbagi penyimpanan dengan array asal. Mengubah elemen view dapat mengubah array asal, meskipun nama variabelnya berbeda. Ini berbeda dari slicing list Python yang membuat daftar luar baru.', 'Gunakan copy() ketika hasil potongan harus diubah secara mandiri. Sebaliknya, view bermanfaat saat ingin menghindari salinan data besar. Pilihan ini menyangkut semantik perubahan, bukan hanya kecepatan.'],
        example: 'import numpy as np\na = np.array([10, 20, 30, 40])\nb = a[1:3]\nb[0] = 99',
        task: ['Apa isi a setelah penugasan terakhir?'], options: ['[10, 20, 30, 40]', '[10, 99, 30, 40]', '[99, 20, 30, 40]', '[10, 99, 99, 40]'], answer: 1,
        hints: ['b[0] menunjuk elemen pertama potongan, yaitu a[1].', 'Tidak ada copy() dalam contoh, sehingga potongan berbagi data.'],
        explanation: 'a[1] berubah menjadi 99 karena b merupakan view. Mengasumsikan semua hasil seleksi NumPy adalah salinan akan menimbulkan perubahan data tak terduga.', xp: 15
      },
      {
        id: 'numpy-05', title: 'Mask Boolean dengan Dua Syarat', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Perbandingan pada array menghasilkan array boolean dengan satu hasil per elemen. Array boolean itu dapat menjadi mask untuk memilih nilai yang memenuhi kriteria. Penggabungan dua mask memakai & untuk dan serta | untuk atau.', 'Setiap perbandingan perlu diberi tanda kurung karena prioritas operator. Operator and Python bukan pengganti &: and mengharapkan kebenaran satu objek, sedangkan kita membutuhkan keputusan terpisah untuk setiap elemen.'],
        example: 'import numpy as np\na = np.array([5, 10, 15, 20])\npilihan = a[(a >= 10) & (a < 20)]',
        task: ['Nilai mana yang dipilih?'], options: ['[5, 10, 15]', '[10, 15, 20]', '[10, 15]', '[15, 20]'], answer: 2,
        hints: ['Batas bawah memakai >= sehingga 10 ikut.', 'Batas atas memakai < sehingga 20 tidak ikut.'],
        explanation: '10 dan 15 memenuhi kedua syarat sekaligus. Perhatikan perbedaan batas inklusif dan eksklusif, bukan hanya angka batasnya.', xp: 15
      },
      {
        id: 'numpy-06', title: 'Tipe Data Membatasi Nilai', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Array NumPy memiliki dtype yang mengatur representasi elemen. Array integer tidak menyediakan bagian pecahan. Ketika nilai pecahan dimasukkan ke array integer, nilainya dikonversi mengikuti tipe tujuan, bukan otomatis mengubah seluruh array menjadi float.', 'Untuk pengukuran yang memerlukan desimal, pilih dtype float sejak pembuatan atau konversikan dengan astype(float). Keputusan tipe juga memengaruhi memori dan jangkauan angka; tipe paling kecil tidak selalu paling tepat untuk perhitungan.'],
        example: 'import numpy as np\na = np.array([1, 2, 3], dtype=np.int64)\na[0] = 2.9',
        task: ['Berapa nilai a[0] setelah penugasan?'], options: ['2.9', '3', '0', '2'], answer: 3,
        hints: ['dtype tetap int64 setelah penugasan elemen.', 'Konversi float positif ke integer ini membuang bagian pecahan, bukan membulatkan ke terdekat.'],
        explanation: 'Nilai tersimpan adalah 2. Array tidak menaikkan dtype secara otomatis hanya karena satu penugasan membutuhkan pecahan.', xp: 15
      }
    ]
  },
  {
    id: 'pandas', title: 'Pandas', category: 'Data Science', level: 'Menengah', theme: 'purple', symbol: 'Pd',
    description: 'Kuis konsep pengolahan tabel: indeks, nilai hilang, agregasi, penggabungan, dan data waktu menggunakan contoh lokal.',
    chapters: [
      { title: 'Membaca dan Membersihkan', description: 'Menetapkan unit baris, memilih data, dan menangani ketidaklengkapan secara sadar.' },
      { title: 'Mengubah Data Menjadi Ringkasan', description: 'Mengagregasi, memeriksa relasi tabel, dan membentuk ringkasan waktu.' }
    ],
    lessons: [
      {
        id: 'pandas-01', title: 'Baris, Kolom, dan Unit Pengamatan', chapter: 0, type: 'quiz', language: 'text',
        intro: ['DataFrame adalah tabel berlabel dengan kolom yang dapat memiliki tipe berbeda. Sebelum menganalisisnya, tentukan arti satu baris. Jika satu baris berarti transaksi, pelanggan yang berulang tidak otomatis merupakan data duplikat.', 'shape melaporkan jumlah baris dan kolom, bukan banyak nilai unik. Memahami unit pengamatan mencegah kita menghitung transaksi sebagai pelanggan atau menghapus pembelian sah hanya karena nama pelanggannya sama.'],
        example: 'import pandas as pd\ndf = pd.DataFrame({"pelanggan": ["Ayu", "Ayu", "Bima"], "total": [20, 35, 10]})',
        task: ['Jika setiap baris adalah transaksi, pernyataan mana yang benar?'], options: ['Ada 3 transaksi dan 2 pelanggan unik', 'Ada 2 transaksi dan 3 pelanggan unik', 'Ada 3 pelanggan unik karena ada 3 baris', 'Baris kedua harus dihapus karena nama Ayu berulang'], answer: 0,
        hints: ['Hitung jumlah baris untuk transaksi.', 'Keunikan pelanggan dihitung dari label berbeda, bukan banyak kemunculannya.'],
        explanation: 'Terdapat tiga transaksi dengan dua nama pelanggan berbeda. Pengulangan sebuah atribut tidak cukup untuk menyimpulkan bahwa seluruh baris adalah duplikat.', xp: 15
      },
      {
        id: 'pandas-02', title: 'loc Memilih Label, iloc Memilih Posisi', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Indeks DataFrame adalah label baris dan tidak harus dimulai dari nol. loc memilih berdasarkan label, sedangkan iloc memakai posisi integer mulai dari nol. Label berupa angka tetap merupakan label ketika digunakan melalui loc.', 'Pembedaan ini penting setelah penyaringan karena label lama sering dipertahankan. Jangan menganggap indeks yang terlihat seperti angka selalu menunjukkan urutan posisi saat ini. Pilih metode berdasarkan makna seleksi yang diinginkan.'],
        example: 'import pandas as pd\ndf = pd.DataFrame({"skor": [70, 90]}, index=[10, 20])\nnilai = df.iloc[1]["skor"]',
        task: ['Apa nilai dari seleksi tersebut?'], options: ['70', '90', '20', 'KeyError karena label 1 tidak ada'], answer: 1,
        hints: ['iloc[1] berarti baris pada posisi kedua.', 'Label baris kedua adalah 20, tetapi kolom skor pada baris itu bernilai 90.'],
        explanation: 'Hasilnya 90 karena iloc memakai posisi. Tidak adanya label 1 hanya relevan jika seleksinya menggunakan loc[1].', xp: 15
      },
      {
        id: 'pandas-03', title: 'Nilai Hilang Bukan Selalu Nol', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Nilai hilang menandakan informasi tidak tersedia, bukan otomatis pengukuran nol. Pandas menyediakan isna() untuk mendeteksinya. Mengisi nilai hilang dengan nol tanpa alasan domain dapat mengubah ringkasan statistik secara besar.', 'Banyak agregasi, termasuk mean(), melewati nilai hilang secara bawaan. Karena itu, laporkan juga jumlah pengamatan yang benar-benar tersedia. Rata-rata dari data lengkap yang sedikit tidak memiliki konteks yang sama dengan rata-rata seluruh populasi.'],
        example: 'import pandas as pd\ns = pd.Series([10.0, None, 30.0])\nrata = s.mean()',
        task: ['Berapa nilai rata dengan perilaku bawaan mean()?'], options: ['40 / 3', '0', '20.0', 'Nilai hilang karena satu elemen kosong'], answer: 2,
        hints: ['mean() memakai skipna=True secara bawaan.', 'Hanya dua angka tersedia yang masuk pembilang dan penyebut.'],
        explanation: 'Rata-rata adalah (10 + 30) / 2 = 20. Mengisi nilai kosong dengan nol lebih dulu akan menghasilkan pertanyaan statistik yang berbeda.', xp: 15
      },
      {
        id: 'pandas-04', title: 'groupby Memisahkan Lalu Merangkum', chapter: 1, type: 'quiz', language: 'text',
        intro: ['groupby membagi baris berdasarkan kunci kelompok, menerapkan operasi, lalu menggabungkan hasil. Kunci dapat berupa kategori seperti kota atau produk. Agregasi sum menghitung total dalam setiap kelompok, bukan jumlah kelompoknya.', 'Pilih fungsi agregasi sesuai pertanyaan. count menghitung nilai tidak kosong, size menghitung baris, dan sum menjumlahkan nilai numerik. Ketiganya bisa berbeda ketika data memiliki nilai hilang atau nilai berulang.'],
        example: 'import pandas as pd\ndf = pd.DataFrame({"kota": ["Solo", "Malang", "Solo"], "unit": [2, 4, 3]})\nringkas = df.groupby("kota")["unit"].sum()',
        task: ['Berapa ringkas.loc["Solo"]?'], options: ['2', '3', '9', '5'], answer: 3,
        hints: ['Solo muncul pada baris pertama dan ketiga.', 'Operasinya sum pada kolom unit, bukan count pada nama kota.'],
        explanation: 'Total Solo adalah 2 + 3 = 5. Banyaknya dua baris Solo bukan hasil yang diminta oleh sum.', xp: 15
      },
      {
        id: 'pandas-05', title: 'Merge dan Kardinalitas Relasi', chapter: 1, type: 'quiz', language: 'text',
        intro: ['merge menghubungkan tabel melalui satu atau lebih kunci. Pada relasi banyak-ke-satu, beberapa transaksi boleh memakai satu kode produk, tetapi tabel produk harus memiliki satu baris per kode. Duplikasi kunci di tabel referensi dapat menggandakan baris hasil.', 'Parameter validate membantu memeriksa asumsi relasi, bukan memperbaiki data secara diam-diam. Gunakan many_to_one ketika kunci kiri boleh berulang dan kunci kanan harus unik. Left join mempertahankan semua baris kiri, termasuk yang tidak mendapat pasangan.'],
        example: 'gabung = transaksi.merge(\n    produk, on="kode", how="left", validate="many_to_one"\n)\n# transaksi: kode A, A, B\n# produk: kode A, B, masing-masing satu baris',
        task: ['Jika tabel produk mendapat baris kedua berkode A, apa yang dilakukan validate="many_to_one"?'], options: ['Menolak merge dengan kesalahan validasi', 'Memilih produk A yang pertama tanpa peringatan', 'Menghapus transaksi A yang berulang', 'Mengubah left join menjadi inner join'], answer: 0,
        hints: ['Bagian one merujuk ke keunikan kunci tabel kanan.', 'Validasi memeriksa kontrak, bukan memilih pasangan secara acak.'],
        explanation: 'Merge ditolak karena kunci kanan tidak lagi unik. Tanpa pemeriksaan, beberapa pasangan untuk A dapat memperbanyak baris dan membesar-besarkan total.', xp: 15
      },
      {
        id: 'pandas-06', title: 'Tanggal Perlu Tipe Waktu', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Tanggal yang masih berupa string belum memiliki semantik kalender. pd.to_datetime mengubahnya menjadi nilai waktu agar operasi seperti pengelompokan bulan dan selisih hari dapat dilakukan. Format eksplisit membantu menghindari salah tafsir urutan tanggal.', 'resample mengelompokkan data ke interval waktu ketika indeksnya berupa waktu yang sesuai. Kode MS berarti awal bulan sebagai label interval. Menjumlahkan data harian menjadi bulanan berbeda dari menghitung rata-rata harian.'],
        example: 'import pandas as pd\ndf = pd.DataFrame({"tanggal": ["2026-01-03", "2026-01-20", "2026-02-02"], "unit": [2, 3, 4]})\ndf["tanggal"] = pd.to_datetime(df["tanggal"], format="%Y-%m-%d")\nbulanan = df.set_index("tanggal")["unit"].resample("MS").sum()',
        task: ['Berapa total unit pada kelompok Januari 2026?'], options: ['2.5', '5', '9', '2'], answer: 1,
        hints: ['Dua tanggal pertama berada dalam bulan yang sama.', 'sum menjumlahkan unit dalam interval, bukan menghitung jumlah tanggalnya.'],
        explanation: 'Januari memiliki total 2 + 3 = 5. Label awal bulan tidak berarti hanya transaksi pada tanggal pertama yang dihitung.', xp: 15
      }
    ]
  },
  {
    id: 'matplotlib', title: 'Matplotlib', category: 'Data Science', level: 'Menengah', theme: 'orange', symbol: 'Mpl',
    description: 'Kuis konsep visualisasi untuk memilih grafik, memahami objek gambar, serta menyampaikan data secara jelas dan dapat diakses.',
    chapters: [
      { title: 'Menyusun Grafik', description: 'Mengenali Figure dan Axes serta memilih representasi tren dan hubungan.' },
      { title: 'Visualisasi yang Jujur', description: 'Menafsirkan distribusi, merancang label, dan menyimpan hasil dengan tepat.' }
    ],
    lessons: [
      {
        id: 'matplotlib-01', title: 'Figure Menampung Axes', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Figure adalah wadah keseluruhan gambar, sedangkan Axes adalah area tempat data digambar beserta sumbu dan labelnya. Satu Figure dapat menampung beberapa Axes. Istilah Axes tidak hanya berarti satu garis sumbu x atau y.', 'Antarmuka berorientasi objek membuat tujuan operasi lebih jelas. Ketika memegang referensi ax, kita dapat menambahkan judul atau data pada panel yang tepat tanpa bergantung pada panel aktif global.'],
        example: 'import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.plot([1, 2, 3], [4, 2, 5])\nax.set_title("Pengunjung Harian")',
        task: ['Objek mana yang menerima judul panel grafik dalam contoh?'], options: ['Modul plt melalui perubahan variabel global', 'Daftar [1, 2, 3]', 'Objek Axes bernama ax', 'Objek garis sumbu y saja'], answer: 2,
        hints: ['Perhatikan objek di sebelah kiri .set_title().', 'Judul panel adalah bagian dari area plot, bukan isi daftar data.'],
        explanation: 'ax adalah Axes tempat judul panel dipasang. Figure menyediakan wadah gambar, tetapi set_title pada contoh ini bekerja pada satu panel.', xp: 15
      },
      {
        id: 'matplotlib-02', title: 'Garis Menyatakan Urutan', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Grafik garis menghubungkan titik sesuai urutan masukan. Ia cocok ketika urutan memiliki arti, seperti waktu. Matplotlib tidak otomatis mengurutkan nilai x sebelum menghubungkannya.', 'Data waktu yang belum terurut dapat menghasilkan garis bolak-balik yang memberi kesan perubahan palsu. Urutkan pasangan x dan y bersama-sama agar hubungan antarnilai tetap benar; mengurutkan hanya x akan merusak pasangan pengamatan.'],
        example: 'hari = [3, 1, 2]\npengunjung = [30, 10, 20]\n# Setiap nilai pengunjung berpasangan dengan hari pada posisi yang sama.',
        task: ['Langkah mana yang tepat sebelum membuat garis kronologis?'], options: ['Urutkan pengunjung saja dari terbesar', 'Urutkan hari saja tanpa mengubah pengunjung', 'Ganti semua nilai hari dengan rata-ratanya', 'Urutkan pasangan (hari, pengunjung) berdasarkan hari'], answer: 3,
        hints: ['Satu titik dibentuk oleh sepasang nilai yang tidak boleh dipisahkan.', 'Tujuannya bergerak dari hari 1 ke hari 2 lalu hari 3.'],
        explanation: 'Pasangan harus diurutkan bersama berdasarkan hari. Mengurutkan satu daftar saja dapat memasangkan hari dengan jumlah pengunjung yang salah.', xp: 15
      },
      {
        id: 'matplotlib-03', title: 'Scatter untuk Hubungan Dua Angka', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Scatter plot menampilkan satu titik untuk setiap pasangan dua variabel numerik. Ia membantu melihat pola hubungan, pencilan, dan kelompok tanpa menghubungkan titik sebagai urutan yang tidak ada.', 'Pola naik pada scatter menunjukkan asosiasi, bukan bukti sebab-akibat. Faktor ketiga atau cara pengambilan sampel dapat menjelaskan hubungan. Transparansi titik dapat membantu ketika banyak pengamatan saling menumpuk.'],
        example: 'import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.scatter([1, 2, 3, 4], [55, 65, 67, 80], alpha=0.7)\nax.set_xlabel("Jam belajar")\nax.set_ylabel("Skor latihan")',
        task: ['Kesimpulan mana yang paling tepat dari pola titik yang cenderung naik?'], options: ['Jam belajar dan skor tampak berasosiasi positif pada sampel', 'Setiap tambahan satu jam pasti menaikkan skor semua orang', 'Grafik membuktikan tidak ada faktor lain yang memengaruhi skor', 'Urutan titik membuktikan perubahan skor satu orang dari hari ke hari'], answer: 0,
        hints: ['Dua variabel bergerak searah, tetapi tidak ada rancangan eksperimen dalam contoh.', 'Titik dapat berasal dari orang berbeda, bukan rangkaian waktu orang yang sama.'],
        explanation: 'Scatter mendukung pengamatan asosiasi pada data yang tersedia. Menyatakan sebab-akibat atau jaminan individual melampaui informasi grafik.', xp: 15
      },
      {
        id: 'matplotlib-04', title: 'Histogram Mengelompokkan Rentang', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Histogram membagi rentang numerik menjadi bin dan menghitung banyak pengamatan di setiap bin. Ia menggambarkan distribusi satu variabel, berbeda dari diagram batang yang biasanya membandingkan kategori.', 'Pilihan batas bin memengaruhi pola yang terlihat. Pada histogram NumPy yang digunakan Matplotlib, semua bin kecuali yang terakhir menutup batas kiri dan membuka batas kanan; bin terakhir juga memasukkan batas paling kanan.'],
        example: 'import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\njumlah, batas, batang = ax.hist([1, 2, 2, 3, 4], bins=[0, 2, 4])',
        task: ['Berapa jumlah pengamatan pada dua bin tersebut?'], options: ['[3, 2]', '[1, 4]', '[1, 3]', '[2, 3]'], answer: 1,
        hints: ['Bin pertama adalah [0, 2), jadi nilai 2 tidak termasuk.', 'Bin terakhir adalah [2, 4] dan memasukkan nilai 4.'],
        explanation: 'Bin pertama hanya memuat 1, sementara bin kedua memuat 2, 2, 3, dan 4. Kesalahan batas interval dapat membuat hitungan terlihat tidak konsisten.', xp: 15
      },
      {
        id: 'matplotlib-05', title: 'Label Membantu Membaca dengan Adil', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Grafik yang baik menjelaskan apa yang diukur dan satuannya. Diagram batang menggunakan panjang sebagai petunjuk kuantitas, sehingga titik awal nol biasanya penting agar perbedaan tidak dibesar-besarkan secara visual.', 'Warna sebaiknya bukan satu-satunya pembeda seri karena kemampuan melihat warna dan kondisi cetak berbeda. Label langsung, pola arsiran, atau simbol dapat menambahkan saluran informasi. Keterangan juga perlu menyebut unit, bukan hanya nama variabel umum.'],
        example: 'Rancangan: batang penjualan toko A = 100 dan B = 110.\nSumbu y dimulai pada 95, tanpa satuan. Dua toko dibedakan hanya dengan merah dan hijau.',
        task: ['Perbaikan mana paling langsung membuat perbandingan lebih jujur dan mudah diakses?'], options: ['Mulai sumbu y pada 99 agar selisih lebih menonjol', 'Hapus angka sumbu supaya grafik lebih bersih', 'Mulai dari nol, tulis satuan, dan beri label nama toko', 'Gunakan dua warna yang lebih mirip tanpa label'], answer: 2,
        hints: ['Panjang batang dibaca sebagai besaran, sehingga pemotongan dasar dapat menyesatkan.', 'Nama toko dan satuan tetap bisa dibaca tanpa membedakan warna.'],
        explanation: 'Dasar nol mempertahankan perbandingan panjang, sementara satuan dan label memperjelas makna. Dekorasi warna saja tidak menyelesaikan masalah interpretasi atau aksesibilitas.', xp: 15
      },
      {
        id: 'matplotlib-06', title: 'Menyimpan Figure yang Tepat', chapter: 1, type: 'quiz', language: 'text',
        intro: ['savefig mengekspor gambar ke format yang ditentukan nama berkas atau parameter format. PNG menyimpan raster, sedangkan SVG dapat mempertahankan unsur vektor. DPI terutama memengaruhi resolusi keluaran raster, bukan kebenaran data.', 'Memanggil fig.savefig menegaskan Figure mana yang disimpan ketika ada beberapa gambar. bbox_inches="tight" membantu menyertakan batas konten secara rapat. Simpan sebelum menutup Figure agar alur pembuatan dan ekspor jelas.'],
        example: 'import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.bar(["A", "B"], [12, 18])\nax.set_ylabel("Jumlah buku")\nfig.savefig("buku.png", dpi=150, bbox_inches="tight")\nplt.close(fig)',
        task: ['Apa peran dpi=150 pada penyimpanan PNG ini?'], options: ['Mengubah jumlah data menjadi 150 titik', 'Memaksa sumbu y berakhir pada 150', 'Mengubah PNG menjadi format vektor', 'Menentukan kerapatan piksel keluaran raster'], answer: 3,
        hints: ['DPI berkaitan dengan titik per inci pada ukuran gambar.', 'Ekspor mengatur representasi gambar, bukan nilai data pada batang.'],
        explanation: 'DPI menentukan resolusi raster bersama ukuran Figure. Menaikkan DPI tidak menambah pengamatan atau mengubah PNG menjadi vektor.', xp: 15
      }
    ]
  },
  {
    id: 'machine-learning', title: 'Machine Learning', category: 'AI', level: 'Menengah', theme: 'purple', symbol: 'ML',
    description: 'Kuis konsep pembelajaran mesin dari perumusan target sampai evaluasi dan pipeline bebas kebocoran. Latihan tidak membutuhkan API berbayar.',
    chapters: [
      { title: 'Merancang Eksperimen', description: 'Menentukan target, memisahkan data, dan menyiapkan fitur secara benar.' },
      { title: 'Menguji Kegunaan Model', description: 'Membandingkan baseline, menafsirkan metrik, dan mencegah kebocoran evaluasi.' }
    ],
    lessons: [
      {
        id: 'machine-learning-01', title: 'Target Menentukan Jenis Masalah', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Pada supervised learning, contoh pelatihan memiliki fitur masukan dan target yang diketahui. Klasifikasi memprediksi kelas diskret, sedangkan regresi memprediksi besaran numerik. Bentuk penyimpanan target saja tidak menentukan jenis masalah.', 'Kode kelas 0 dan 1 tetap dapat mewakili kategori, bukan ukuran kontinu. Tentukan terlebih dahulu keputusan yang ingin didukung model serta informasi yang tersedia saat prediksi dilakukan. Fitur yang baru diketahui setelah kejadian tidak boleh dianggap masukan yang sah.'],
        example: 'Masukan: panjang pesan dan jumlah tautan.\nTarget: 0 = bukan spam, 1 = spam.\nTujuan: memilih salah satu dari dua kategori untuk pesan baru.',
        task: ['Bagaimana masalah ini dikategorikan?'], options: ['Klasifikasi biner terawasi', 'Regresi karena target ditulis sebagai angka', 'Clustering tanpa label', 'Prediksi deret waktu karena pesan memiliki panjang'], answer: 0,
        hints: ['Target sudah diketahui untuk contoh pelatihan.', 'Angka 0 dan 1 berfungsi sebagai nama kategori.'],
        explanation: 'Ini klasifikasi biner karena model memilih dua kelas dengan label pelatihan. Representasi numerik label tidak otomatis membuat tugas menjadi regresi.', xp: 15
      },
      {
        id: 'machine-learning-02', title: 'Data Uji Harus Menyerupai Masa Depan', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Data pelatihan dipakai untuk mempelajari parameter, data validasi untuk memilih rancangan, dan data uji untuk evaluasi akhir. Pemisahan harus meniru penggunaan nyata, bukan hanya memenuhi persentase tertentu.', 'Untuk memprediksi masa depan dari riwayat waktu, pembagian kronologis menghindari belajar dari informasi masa depan. Pengacakan dapat mencampurkan pola sesudah tanggal prediksi ke pelatihan. Data dari entitas yang sama juga kadang perlu dikelompokkan agar evaluasi tidak terlalu mudah.'],
        example: 'Tersedia penjualan bulanan Januari 2023–Desember 2025.\nModel akan digunakan untuk meramalkan bulan setelah Desember 2025.',
        task: ['Pembagian evaluasi mana paling sesuai dengan tujuan tersebut?'], options: ['Latih pada bulan acak termasuk Desember 2025, uji pada Januari 2023', 'Latih pada periode awal dan uji pada periode akhir yang belum dilihat', 'Gunakan semua bulan untuk pelatihan sekaligus pengujian', 'Urutkan penjualan dari kecil ke besar lalu belah di tengah'], answer: 1,
        hints: ['Saat penggunaan nyata, masa depan belum tersedia bagi model.', 'Pemisahan harus menjaga arah waktu dari pelatihan ke pengujian.'],
        explanation: 'Pembagian kronologis meniru prediksi terhadap periode yang belum terjadi. Pengacakan bebas dapat menghasilkan perkiraan kinerja yang tidak sesuai untuk peramalan.', xp: 15
      },
      {
        id: 'machine-learning-03', title: 'Belajar Skala Hanya dari Data Latih', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Standardisasi biasanya mengurangi rata-rata fitur lalu membaginya dengan simpangan baku. Nilai rata-rata dan simpangan baku merupakan parameter transformasi yang dipelajari dari data, meskipun tahap ini bukan model prediksi utama.', 'Parameter praproses harus dipelajari hanya pada data pelatihan, lalu digunakan tanpa penyesuaian pada validasi atau uji. Menghitung skala dari semua data membiarkan distribusi data uji memengaruhi proses pengembangan dan membuat evaluasi tidak benar-benar terpisah.'],
        example: 'from sklearn.preprocessing import StandardScaler\nscaler = StandardScaler()\nX_latih_s = scaler.fit_transform(X_latih)\nX_uji_s = scaler.transform(X_uji)',
        task: ['Mengapa data uji memakai transform, bukan fit_transform?'], options: ['Karena data uji tidak boleh memiliki angka negatif', 'Karena transform menghapus semua fitur kategorikal', 'Agar data uji memakai parameter skala yang dipelajari dari data latih', 'Agar ukuran data uji berubah menjadi ukuran data latih'], answer: 2,
        hints: ['fit mempelajari parameter dari kumpulan yang diberikan.', 'Tujuan evaluasi adalah menguji prosedur yang sudah ditetapkan tanpa belajar lagi dari data uji.'],
        explanation: 'transform menggunakan rata-rata dan skala hasil pelatihan. Melakukan fit lagi pada data uji mengubah prosedur berdasarkan informasi yang seharusnya ditahan.', xp: 15
      },
      {
        id: 'machine-learning-04', title: 'Baseline Membuka Makna Akurasi', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Baseline adalah strategi sederhana yang menjadi pembanding awal, misalnya selalu memprediksi kelas mayoritas. Tanpa baseline, angka evaluasi yang tampak tinggi bisa tidak lebih berguna daripada aturan yang tidak mempelajari fitur apa pun.', 'Ketimpangan kelas membuat akurasi mudah menipu. Jika kejadian penting jarang muncul, model yang selalu menjawab tidak dapat terlihat sangat akurat sambil gagal menemukan seluruh kejadian penting. Ukur juga kinerja kelas yang menjadi fokus keputusan.'],
        example: 'Dari 1.000 pesan uji, 950 bukan spam dan 50 spam.\nBaseline selalu memprediksi bukan spam.',
        task: ['Berapa akurasi baseline tersebut?'], options: ['5%', '50%', '100%', '95%'], answer: 3,
        hints: ['Akurasi adalah jumlah prediksi benar dibagi jumlah seluruh contoh.', 'Semua 950 pesan bukan spam benar, sedangkan 50 spam salah.'],
        explanation: 'Akurasi baseline adalah 950/1.000 = 95%, walaupun tidak satu pun spam ditemukan. Akurasi tinggi saja belum membuktikan kegunaan model pada kelas langka.', xp: 15
      },
      {
        id: 'machine-learning-05', title: 'Precision dan Recall Menjawab Hal Berbeda', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Precision mengukur proporsi prediksi positif yang benar: TP dibagi TP+FP. Recall mengukur proporsi kasus positif sebenarnya yang berhasil ditemukan: TP dibagi TP+FN. Penyebut yang berbeda mencerminkan biaya keputusan yang berbeda.', 'Jika melewatkan kasus berbahaya sangat mahal, recall layak diperhatikan. Namun menaikkan recall dapat menambah alarm palsu, tergantung ambang keputusan. Pilih metrik dan ambang berdasarkan kebutuhan, bukan sekadar satu angka terbesar.'],
        example: 'Sistem mendeteksi 8 kasus positif dengan benar (TP).\nAda 2 kasus positif yang terlewat (FN) dan 4 alarm palsu (FP).',
        task: ['Berapa recall untuk kelas positif?'], options: ['80%', '66,7%', '57,1%', '20%'], answer: 0,
        hints: ['Recall membandingkan temuan benar dengan semua kasus positif sebenarnya.', 'Kasus positif sebenarnya berjumlah TP + FN = 10.'],
        explanation: 'Recall = 8/(8+2) = 80%. Membagi dengan TP+FP menghasilkan precision, bukan recall.', xp: 15
      },
      {
        id: 'machine-learning-06', title: 'Pipeline Menjaga Batas Validasi', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Cross-validation melatih dan menilai model pada beberapa pembagian data. Setiap pembagian harus memiliki proses belajar yang mandiri, termasuk imputasi, penskalaan, dan seleksi fitur. Praproses yang sudah di-fit pada seluruh data merusak batas ini.', 'Pipeline menggabungkan transformasi dan estimator agar proses fit dilakukan ulang di bagian pelatihan setiap fold. Setelah memilih rancangan, data uji akhir tetap disimpan untuk penilaian terpisah. Pipeline tidak membuat fitur yang berasal dari masa depan menjadi sah.'],
        example: 'from sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.model_selection import cross_val_score\nmodel = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000))\nskor = cross_val_score(model, X_latih, y_latih, cv=5)',
        task: ['Apa keuntungan utama scaler diletakkan di dalam pipeline pada contoh?'], options: ['Scaler mempelajari semua fold sekaligus agar hasil lebih stabil', 'Scaler di-fit hanya pada bagian pelatihan setiap fold', 'Pipeline menjamin skor uji mencapai 100%', 'Cross-validation tidak lagi membutuhkan target'], answer: 1,
        hints: ['cross_val_score melatih salinan pipeline untuk tiap pembagian.', 'Transformasi yang memiliki parameter belajar harus mengikuti batas data yang sama dengan model.'],
        explanation: 'Setiap fold mempelajari scaler dari bagian latihnya saja, sehingga bagian validasi tidak bocor ke praproses. Pipeline mengatur prosedur, bukan menjamin akurasi.', xp: 15
      }
    ]
  },
  {
    id: 'gen-ai', title: 'GenAI', category: 'AI', level: 'Pemula', theme: 'pink', symbol: 'Gen',
    description: 'Kuis konsep AI generatif, konteks, verifikasi, dan privasi. Alur latihan dapat disimulasikan di kertas atau memakai model lokal tanpa API berbayar.',
    chapters: [
      { title: 'Memahami Keluaran Generatif', description: 'Mempelajari token, variasi keluaran, serta instruksi yang dapat diperiksa.' },
      { title: 'Menggunakan AI dengan Kritis', description: 'Memeriksa klaim, memahami retrieval, dan menjaga data saat bekerja lokal.' }
    ],
    lessons: [
      {
        id: 'gen-ai-01', title: 'Token dan Batas Konteks', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Model bahasa memproses teks sebagai token, yaitu unit yang bisa berupa kata, potongan kata, tanda baca, atau bagian karakter. Jumlah token tidak selalu sama dengan jumlah kata dan dapat berbeda menurut tokenizer serta bahasa.', 'Jendela konteks membatasi banyak token yang dapat diproses dalam satu interaksi. Instruksi, riwayat percakapan, dokumen, dan ruang keluaran menggunakan anggaran yang perlu diperhitungkan sesuai model. Dokumen panjang perlu dipilih atau dipecah, bukan diasumsikan selalu muat.'],
        example: 'Simulasi anggaran model: total konteks 4.096 token.\nInstruksi dan dokumen memakai 3.500 token.\nAlur ini menyisihkan sisa konteks untuk jawaban.',
        task: ['Dalam simulasi tersebut, berapa token paling banyak tersisa untuk jawaban?'], options: ['4.096', '3.500', '596', '7.596'], answer: 2,
        hints: ['Gunakan anggaran total dikurangi token yang sudah dipakai.', 'Jumlah ini adalah token, bukan jaminan jumlah kata.'],
        explanation: 'Sisa anggaran adalah 4.096 - 3.500 = 596 token. Jangan menghitung masukan dan keluaran seolah keduanya mendapat seluruh anggaran yang sama dalam simulasi ini.', xp: 15
      },
      {
        id: 'gen-ai-02', title: 'Sampling Bukan Pengukur Kebenaran', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Model bahasa menghasilkan kelanjutan berdasarkan distribusi token. Sampling memilih dari distribusi tersebut, sedangkan temperature mengubah seberapa tajam distribusinya sebelum pemilihan. Nilai lebih rendah biasanya membuat keluaran lebih terkonsentrasi pada pilihan berpeluang tinggi.', 'Temperature tidak memeriksa apakah klaim sesuai kenyataan. Jawaban yang konsisten masih dapat salah, dan perilaku deterministik tidak selalu dijamin oleh satu parameter saja. Gunakan sumber dan pengujian untuk ketepatan, bukan menganggap pengaturan variasi sebagai mesin verifikasi.'],
        example: 'Dua rancangan memakai model dan pertanyaan yang sama.\nRancangan A: temperature rendah.\nRancangan B: temperature lebih tinggi.\nKeduanya tetap membutuhkan pemeriksaan fakta.',
        task: ['Pernyataan mana paling tepat mengenai penurunan temperature?'], options: ['Menjamin seluruh fakta benar', 'Menambah dokumen sumber ke konteks secara otomatis', 'Menghapus kemungkinan keluaran berbahaya', 'Biasanya mengurangi variasi pilihan token, bukan menjamin kebenaran'], answer: 3,
        hints: ['Parameter ini bekerja pada distribusi pemilihan token.', 'Peluang kelanjutan teks dan kebenaran sebuah klaim adalah dua hal berbeda.'],
        explanation: 'Temperature mengatur variasi sampling. Kesalahan faktual tetap mungkin muncul, termasuk dalam jawaban yang terdengar tegas dan berulang secara konsisten.', xp: 15
      },
      {
        id: 'gen-ai-03', title: 'Instruksi yang Dapat Diperiksa', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Prompt yang terarah menyebut tujuan, masukan, batasan, dan bentuk keluaran. Instruksi konkret mempermudah penilaian hasil dibanding permintaan kabur seperti buat yang bagus. Contoh keluaran dapat menunjukkan struktur, tetapi tidak menggantikan pemeriksaan isi.', 'Pisahkan data sumber dari perintah dengan penanda yang jelas. Jika jawaban harus bersumber dari teks tertentu, jelaskan perilaku ketika informasi tidak tersedia. Model perlu diberi ruang untuk menyatakan tidak diketahui, bukan didorong mengisi kekosongan dengan dugaan.'],
        example: 'Sumber: "Perpustakaan buka Selasa sampai Sabtu, pukul 09.00–17.00."\nKebutuhan: jawaban singkat tentang jam layanan yang hanya memakai sumber tersebut.',
        task: ['Instruksi tambahan mana paling membantu mengurangi tebakan di luar sumber?'], options: ['Jika informasi tidak ada dalam sumber, jawab "tidak disebutkan"', 'Selalu jawab semua pertanyaan walaupun sumber tidak memuatnya', 'Tambahkan rincian yang terdengar wajar agar lengkap', 'Utamakan keyakinan bahasa daripada bukti sumber'], answer: 0,
        hints: ['Batas sumber harus disertai aturan saat jawaban tidak ditemukan.', 'Kelengkapan semu dapat mendorong model menambahkan informasi yang tidak tersedia.'],
        explanation: 'Aturan tidak disebutkan memberikan jalur keluaran yang jujur saat bukti kurang. Prompt membantu mengarahkan perilaku, tetapi hasil tetap perlu diperiksa.', xp: 15
      },
      {
        id: 'gen-ai-04', title: 'Verifikasi Klaim, Bukan Nada Bicara', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Halusinasi adalah keluaran yang tampak masuk akal tetapi tidak didukung atau tidak sesuai fakta. Model dapat mengarang kutipan, judul, atau detail bibliografi. Format yang rapi dan nada percaya diri tidak membuktikan adanya sumber nyata.', 'Verifikasi dilakukan dengan membuka sumber yang relevan dan memeriksa klaim yang tepat. Untuk kode, pengujian lokal membantu memeriksa perilaku tetapi tidak membuktikan semua sifat keamanan. Tingkat pemeriksaan harus mengikuti dampak kesalahan.'],
        example: 'AI menyebut sebuah aturan kampus dan memberi judul dokumen, tetapi dokumen itu belum diperiksa.\nRingkasan akan dipakai mahasiswa untuk menentukan tenggat pendaftaran.',
        task: ['Tindakan paling tepat sebelum menerbitkan ringkasan adalah apa?'], options: ['Percaya karena judul dokumennya sangat rinci', 'Periksa dokumen resmi dan cocokkan pasal serta tanggal berlaku', 'Minta model mengulang jawaban dengan nada lebih yakin', 'Hapus tautan sumber supaya pembaca tidak bingung'], answer: 1,
        hints: ['Tenggat memiliki konsekuensi nyata dan bisa berubah antarperiode.', 'Sumber harus benar-benar ada serta mendukung klaim, bukan sekadar disebut oleh model.'],
        explanation: 'Pemeriksaan dokumen resmi menguji keberadaan, isi, dan keberlakuan aturan. Meminta keyakinan tambahan dari model tidak menghasilkan bukti independen.', xp: 15
      },
      {
        id: 'gen-ai-05', title: 'RAG Mengambil Bukti sebelum Menjawab', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Retrieval-augmented generation menggabungkan pencarian dokumen dengan pembuatan jawaban. Dokumen dipecah menjadi bagian yang dapat dicari; bagian relevan kemudian dimasukkan ke konteks model. Retrieval ini tidak sama dengan melatih ulang bobot model.', 'Kualitas jawaban bergantung pada cakupan sumber, kualitas pencarian, dan kemampuan model memakai bukti. Dokumen yang diambil adalah data, bukan instruksi berwenang. Teks berbahaya di dalam dokumen tidak boleh mengubah aturan aplikasi atau memerintahkan pengungkapan rahasia.'],
        example: 'Alur lokal: pertanyaan → cari potongan panduan perpustakaan → sertakan potongan dan identitas sumber → model menyusun jawaban → pengguna memeriksa rujukan.',
        task: ['Bagian mana yang membedakan alur RAG ini dari pertanyaan tanpa retrieval?'], options: ['Model wajib terhubung ke API berbayar', 'Bobot model diperbarui setiap kali pengguna bertanya', 'Potongan dokumen relevan diambil dan dimasukkan ke konteks', 'Jawaban selalu benar karena memiliki rujukan'], answer: 2,
        hints: ['Retrieval berarti mengambil informasi dari kumpulan sumber.', 'Memasukkan bukti ke konteks berbeda dari memperbarui parameter model.'],
        explanation: 'Ciri utamanya adalah pengambilan sumber relevan untuk menjadi konteks. RAG dapat dijalankan lokal dan tetap dapat gagal jika sumber atau penalarannya keliru.', xp: 15
      },
      {
        id: 'gen-ai-06', title: 'Lokal Tetap Memerlukan Tata Kelola Data', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Model lokal menjalankan inferensi pada perangkat sendiri, sehingga tidak harus mengirim prompt ke API pihak lain. Namun, aplikasi pendamping, telemetry, plugin, sinkronisasi folder, atau log dapat menciptakan jalur data tambahan. Kata lokal saja belum menjelaskan seluruh aliran data.', 'Gunakan data sintetis untuk latihan, batasi akses berkas, dan periksa konfigurasi jaringan serta pencatatan. Lisensi model dan kemampuan perangkat juga perlu diperiksa. Kuis konsep dapat dikerjakan tanpa memasang model atau mengunggah informasi pribadi sama sekali.'],
        example: 'Latihan: merangkum lima catatan dukungan buatan.\nRancangan aman: nama fiktif, tanpa kredensial, model lokal, folder khusus, pemeriksaan log dan koneksi jaringan.',
        task: ['Kebijakan mana paling tepat untuk log pada latihan lokal tersebut?'], options: ['Simpan seluruh prompt tanpa pembatasan karena tidak memakai API', 'Hapus riwayat di layar saja dan anggap semua log ikut terhapus', 'Nonaktifkan jaringan tetapi biarkan log sensitif dapat dibaca semua akun', 'Periksa data yang dicatat, batasi akses log, dan hindari menyimpan informasi sensitif'], answer: 3,
        hints: ['Pemrosesan lokal dan penyimpanan lokal adalah dua aktivitas berbeda.', 'Riwayat percakapan, log debug, dan folder tersinkron dapat memperpanjang umur data.'],
        explanation: 'Log dapat menyimpan informasi setelah inferensi selesai. Menjalankan model lokal mengurangi ketergantungan pengiriman ke layanan luar, tetapi tidak otomatis menyelesaikan semua persoalan privasi.', xp: 15
      }
    ]
  },
  {
    id: 'intermediate-javascript', title: 'Intermediate JavaScript', category: 'Web Development', level: 'Menengah', theme: 'yellow', symbol: 'JS+',
    description: 'Kuis konsep JavaScript lanjutan tentang closure, transformasi data, modul, dan alur asinkron tanpa berpura-pura mengeksekusi kode.',
    chapters: [
      { title: 'Fungsi dan Data', description: 'Menalar lingkungan leksikal, agregasi, dan penyalinan objek.' },
      { title: 'Batas Modul dan Waktu', description: 'Membedakan ekspor, urutan Promise, dan penanganan kegagalan async.' }
    ],
    lessons: [
      {
        id: 'intermediate-javascript-01', title: 'Closure Menyimpan Akses Lingkungan', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Closure memungkinkan fungsi mengakses variabel dari lingkungan leksikal tempat fungsi dibuat, bahkan setelah fungsi luar selesai. Yang dipertahankan adalah akses ke binding, bukan selalu salinan nilai saat fungsi diciptakan.', 'Pola ini berguna untuk keadaan privat seperti penghitung. Setiap pemanggilan fungsi pembuat menghasilkan lingkungan baru, sedangkan beberapa pemanggilan fungsi hasil yang sama memakai keadaan lingkungan yang sama.'],
        example: 'function buatPenghitung() {\n  let jumlah = 0;\n  return () => ++jumlah;\n}\nconst hitung = buatPenghitung();\nhitung();\nconst hasil = hitung();',
        task: ['Berapa nilai hasil setelah dua kali memanggil hitung?'], options: ['2', '1', '0', 'undefined'], answer: 0,
        hints: ['Kedua pemanggilan memakai fungsi hitung yang sama.', 'Operator ++ di depan menaikkan jumlah sebelum mengembalikan nilainya.'],
        explanation: 'Pemanggilan pertama menyimpan jumlah 1, lalu pemanggilan kedua menghasilkan 2. Fungsi luar tidak dipanggil ulang setiap kali closure digunakan.', xp: 15
      },
      {
        id: 'intermediate-javascript-02', title: 'reduce Membawa Akumulator', chapter: 0, type: 'quiz', language: 'text',
        intro: ['reduce menggabungkan elemen array melalui akumulator. Nilai awal eksplisit menetapkan titik mula dan tipe hasil, sekaligus membuat perilaku array kosong lebih mudah dipahami. Callback mengembalikan akumulator untuk langkah berikutnya.', 'Berbeda dari map yang biasanya menghasilkan satu keluaran per masukan, reduce dapat menghasilkan satu total atau struktur lain. Untuk penjumlahan, nilai awal nol berarti array kosong memiliki hasil nol tanpa memerlukan cabang tambahan.'],
        example: 'const harga = [10, 20, 30];\nconst total = harga.reduce((akumulasi, nilai) => akumulasi + nilai, 5);',
        task: ['Berapa total pada contoh?'], options: ['60', '65', '35', '5'], answer: 1,
        hints: ['Angka 5 adalah nilai awal akumulator, bukan indeks awal.', 'Setiap harga ditambahkan ke akumulator yang berjalan.'],
        explanation: 'Totalnya 5 + 10 + 20 + 30 = 65. Argumen kedua reduce bukan batas jumlah elemen yang diproses.', xp: 15
      },
      {
        id: 'intermediate-javascript-03', title: 'Spread Hanya Menyalin Lapisan Luar', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Object spread menyalin properti milik sendiri yang enumerable ke objek baru. Untuk properti yang nilainya objek, nilai tersebut masih berupa referensi ke objek yang sama. Karena itu, spread bukan penyalinan mendalam otomatis.', 'Ketika memperbarui data bersarang secara immutable, salin setiap lapisan yang berubah. Lapisan yang tidak berubah boleh tetap berbagi referensi. Strategi ini membantu mendeteksi perubahan berdasarkan identitas tanpa mengubah keadaan lama.'],
        example: 'const asal = { profil: { kota: "Solo" } };\nconst salinan = { ...asal };\nsalinan.profil.kota = "Bogor";',
        task: ['Apa nilai asal.profil.kota setelah perubahan?'], options: ['"Solo"', 'undefined', '"Bogor"', 'Terjadi TypeError karena asal memakai const'], answer: 2,
        hints: ['const membatasi penugasan ulang binding, bukan membekukan isi objek.', 'Properti profil di kedua objek merujuk objek bersarang yang sama.'],
        explanation: 'Nilai asal ikut menjadi Bogor karena profil dibagi bersama. Objek luar baru tidak membuat semua objek di dalamnya menjadi mandiri.', xp: 15
      },
      {
        id: 'intermediate-javascript-04', title: 'Named Export Memiliki Nama Kontrak', chapter: 1, type: 'quiz', language: 'text',
        intro: ['ES module dapat menyediakan named export dan default export. Named import menggunakan nama ekspor yang tersedia, dengan opsi alias lokal melalui as. Default import mengikuti mekanisme berbeda dan tidak otomatis tersedia untuk modul yang hanya memiliki named export.', 'Modul membantu membatasi ketergantungan dan memperjelas antarmuka. Nama berkas, lokasi relatif, serta aturan lingkungan tetap perlu benar. Memahami bentuk ekspor mencegah kesalahan impor sebelum fungsi sempat dipanggil.'],
        example: '// hitung.js\nexport const tambah = (a, b) => a + b;\n// Modul ini tidak memiliki default export.',
        task: ['Impor mana yang sesuai dari berkas tetangga dalam lingkungan ES module?'], options: ['import tambah from "./hitung.js";', 'import { default as tambah } from "./hitung.js";', 'import { hitung } from "./hitung.js";', 'import { tambah } from "./hitung.js";'], answer: 3,
        hints: ['Ekspor yang tersedia bernama tambah.', 'Kurung kurawal pada import memilih named export, bukan default export.'],
        explanation: 'Named export tambah diimpor dengan import { tambah }. Menggunakan default import membutuhkan default export yang memang tidak disediakan contoh.', xp: 15
      },
      {
        id: 'intermediate-javascript-05', title: 'Promise Menunggu Stack Selesai', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Kode sinkron pada tugas saat ini berjalan sampai call stack selesai. Callback then pada Promise yang sudah fulfilled dijadwalkan sebagai microtask; callback tersebut tidak menyela baris sinkron berikutnya.', 'Memahami urutan ini membantu membaca log dan pembaruan keadaan. Asinkron bukan berarti semua operasi langsung berjalan paralel. Penjadwalan callback dan pekerjaan komputasi berat merupakan persoalan berbeda.'],
        example: 'console.log("A");\nPromise.resolve().then(() => console.log("B"));\nconsole.log("C");',
        task: ['Bagaimana urutan log dari potongan kode ini?'], options: ['A, C, B', 'A, B, C', 'B, A, C', 'C, B, A'], answer: 0,
        hints: ['Dua console.log di luar then berjalan sinkron.', 'Callback then baru dijalankan setelah pekerjaan sinkron saat ini selesai.'],
        explanation: 'A dan C dicetak terlebih dahulu, kemudian microtask mencetak B. Promise yang sudah selesai tetap tidak membuat then berjalan sinkron di tempat pendaftarannya.', xp: 15
      },
      {
        id: 'intermediate-javascript-06', title: 'await Membawa Rejection ke try', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Fungsi async selalu mengembalikan Promise. await menunggu penyelesaian Promise tanpa memblokir seluruh thread untuk menanti I/O. Jika Promise ditolak, await melempar alasan penolakan pada titik tersebut di dalam fungsi async.', 'try/catch dapat menangani penolakan yang di-await dalam blok try. Jangan lupa mengembalikan atau menunggu Promise yang ingin ditangani; pekerjaan yang dilepas tanpa await memiliki jalur kegagalan tersendiri.'],
        example: 'async function muat() {\n  try {\n    await Promise.reject(new Error("gagal"));\n    return "berhasil";\n  } catch {\n    return "cadangan";\n  }\n}',
        task: ['Jika pemanggil melakukan await muat(), nilai apa yang diterima?'], options: ['"berhasil"', '"cadangan"', 'undefined', 'Objek Error yang otomatis menjadi nilai sukses'], answer: 1,
        hints: ['Penolakan terjadi tepat di await dalam try.', 'catch mengembalikan nilai biasa, sehingga Promise fungsi async dipenuhi dengan nilai tersebut.'],
        explanation: 'Pemanggil menerima cadangan karena catch memulihkan kegagalan dengan nilai kembalian. Return berhasil tidak tercapai setelah await melempar.', xp: 15
      }
    ]
  },
  {
    id: 'react', title: 'React', category: 'Web Development', level: 'Menengah', theme: 'blue', symbol: 'Re',
    description: 'Kuis konsep antarmuka React: props, snapshot state, formulir, identitas daftar, efek, dan sumber kebenaran bersama.',
    chapters: [
      { title: 'UI sebagai Hasil State', description: 'Memahami aliran props, pembaruan state, dan input terkontrol.' },
      { title: 'Identitas dan Sinkronisasi', description: 'Memilih key stabil, membersihkan efek, dan mengangkat state bersama.' }
    ],
    lessons: [
      {
        id: 'react-01', title: 'Props Mengalir dari Induk', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Komponen React menerima props sebagai masukan untuk menghasilkan UI. Props sebaiknya diperlakukan sebagai data baca-saja. Komponen anak tidak mengubah props secara langsung untuk meminta perubahan pada pemilik data.', 'Jika anak perlu memicu perubahan, induk dapat menyediakan callback. Pola ini mempertahankan aliran data yang jelas: data turun melalui props, sedangkan kejadian dikirim kembali melalui pemanggilan fungsi yang disepakati.'],
        example: 'function Tombol({ jumlah, onTambah }) {\n  return <button onClick={onTambah}>Jumlah: {jumlah}</button>;\n}',
        task: ['Bagaimana Tombol sebaiknya meminta induk menambah jumlah?'], options: ['Menjalankan jumlah++ pada props', 'Mengubah DOM teks tombol secara manual sebagai sumber data', 'Memanggil callback onTambah saat diklik', 'Menyimpan ulang seluruh props dalam variabel global'], answer: 2,
        hints: ['Induk tetap menjadi pemilik nilai jumlah.', 'onTambah sudah disediakan sebagai saluran kejadian.'],
        explanation: 'Anak memanggil onTambah dan induk memperbarui data miliknya. Mutasi props tidak menyediakan mekanisme pembaruan state React yang benar.', xp: 15
      },
      {
        id: 'react-02', title: 'State Adalah Snapshot Render', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Nilai state yang dibaca sebuah render merupakan snapshot. Memanggil setter menjadwalkan pembaruan, bukan mengganti variabel lokal pada baris berikutnya. Beberapa pembaruan dalam satu kejadian dapat diproses bersama.', 'Jika nilai baru bergantung pada nilai sebelumnya, bentuk updater fungsional menerima hasil pembaruan sebelumnya dalam antrean. Ini berbeda dari dua kali mengirim nilai hitungan + 1 yang dihitung dari snapshot yang sama.'],
        example: '// hitungan bernilai 0 pada render saat ini.\nfunction tambahDua() {\n  setHitungan(n => n + 1);\n  setHitungan(n => n + 1);\n}',
        task: ['Berapa hitungan pada render berikutnya setelah tambahDua dipanggil sekali?'], options: ['0', '1', '3', '2'], answer: 3,
        hints: ['Updater pertama mengubah 0 menjadi 1.', 'Updater kedua menerima hasil updater pertama, bukan snapshot awal.'],
        explanation: 'Kedua updater diterapkan berurutan sehingga hasilnya 2. Dua pemanggilan setHitungan(hitungan + 1) dari snapshot nol justru sama-sama meminta nilai 1.', xp: 15
      },
      {
        id: 'react-03', title: 'Input Terkontrol Memiliki Pemilik Nilai', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Input terkontrol menerima value dari state React. Agar pengguna dapat mengubah isinya, onChange harus memperbarui state berdasarkan kejadian input. Tampilan kemudian mengikuti nilai state pada render berikutnya.', 'Pola ini memudahkan validasi dan reset formulir karena sumber nilainya jelas. Gunakan nilai awal string untuk input teks agar tidak berpindah antara mode tidak terkontrol dan terkontrol selama umur komponen.'],
        example: 'const [nama, setNama] = useState("");\nreturn <input value={nama} onChange={e => setNama(e.target.value)} />;',
        task: ['Apa sumber kebenaran nilai input pada contoh?'], options: ['State nama', 'Nilai DOM yang dikelola tanpa pembaruan state', 'Atribut defaultValue yang menetapkan nilai awal saja', 'Parameter kejadian e yang disimpan permanen oleh input'], answer: 0,
        hints: ['Atribut value diisi dari nama.', 'onChange menyimpan teks terbaru kembali ke state yang sama.'],
        explanation: 'State nama menentukan nilai input. DOM menerima nilai tersebut, tetapi bukan penyimpanan terpisah yang dibiarkan berbeda dari state.', xp: 15
      },
      {
        id: 'react-04', title: 'Key Menjaga Identitas Item', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Key membantu React mengenali item di antara saudara dalam sebuah daftar saat terjadi penyisipan, penghapusan, atau perubahan urutan. Key bukan sekadar cara menghilangkan peringatan; ia berhubungan dengan identitas komponen dan state lokalnya.', 'Gunakan ID stabil dari data jika tersedia. Indeks posisi tidak stabil untuk daftar yang dapat diurutkan ulang. Nilai acak yang dibuat setiap render juga mengganti identitas terus-menerus dan dapat mereset state item.'],
        example: 'const tugas = [\n  { id: "t-7", judul: "Baca" },\n  { id: "t-9", judul: "Latihan" }\n];\n// Pengguna boleh mengubah urutan tugas.',
        task: ['Pilihan key mana paling tepat saat memetakan tugas menjadi komponen?'], options: ['key={index}', 'key={item.id}', 'key={Math.random()}', 'key="tugas" untuk semua item'], answer: 1,
        hints: ['ID tetap melekat pada tugas walaupun posisinya berubah.', 'Key harus membedakan saudara dan stabil antar-render.'],
        explanation: 'item.id mempertahankan identitas tugas saat urutan berubah. Indeks melacak posisi, nilai acak tidak stabil, dan key sama tidak membedakan item.', xp: 15
      },
      {
        id: 'react-05', title: 'Effect Perlu Membersihkan Langganan', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Effect digunakan untuk menyinkronkan komponen dengan sistem eksternal seperti timer, event browser, atau koneksi. Nilai yang dapat langsung dihitung dari props dan state biasanya tidak memerlukan effect tambahan.', 'Fungsi yang dikembalikan effect adalah cleanup. React memanggilnya sebelum setup berikutnya ketika dependensi berubah dan saat komponen dilepas. Pada mode pengembangan tertentu, siklus tambahan membantu menemukan cleanup yang tidak benar.'],
        example: 'useEffect(() => {\n  const id = setInterval(() => setDetik(d => d + 1), 1000);\n  return () => clearInterval(id);\n}, []);',
        task: ['Apa tujuan fungsi cleanup dalam contoh?'], options: ['Mengembalikan detik ke nol setiap kali render selesai', 'Memulai interval pengganti sebelum interval lama berakhir', 'Menghentikan interval agar tidak terus berjalan setelah tidak diperlukan', 'Mencegah render ulang saat nilai detik bertambah'], answer: 2,
        hints: ['setInterval membuat pekerjaan berulang di luar siklus render.', 'clearInterval membatalkan pekerjaan dengan identitas timer yang sama.'],
        explanation: 'Cleanup menghentikan timer yang dipasang oleh effect. Tanpanya, timer dapat tetap berjalan atau menumpuk ketika setup terjadi kembali.', xp: 15
      },
      {
        id: 'react-06', title: 'Mengangkat State untuk Dua Tampilan', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Dua komponen yang perlu menampilkan keadaan yang sama sebaiknya tidak menyimpan salinan independen tanpa alasan. Duplikasi state mudah menghasilkan tampilan yang saling bertentangan ketika hanya satu salinan diperbarui.', 'Mengangkat state berarti memindahkan kepemilikannya ke leluhur bersama terdekat. Nilai dan callback lalu diteruskan ke anak yang memerlukan. Data turunan, seperti jumlah item, dapat dihitung dari state utama agar tidak perlu disinkronkan secara manual.'],
        example: 'PanelKeranjang menampilkan daftar barang.\nLencanaHeader menampilkan jumlah barang yang sama.\nKeduanya berada di bawah komponen Toko.',
        task: ['Rancangan mana paling menjaga keduanya tetap konsisten?'], options: ['Simpan dua array terpisah lalu harapkan selalu sama', 'Hitung jumlah hanya sekali saat halaman dibuka', 'Biarkan LencanaHeader membaca teks DOM PanelKeranjang', 'Simpan barang di Toko dan turunkan daftar serta jumlahnya melalui props'], answer: 3,
        hints: ['Carilah pemilik bersama bagi data yang dipakai kedua komponen.', 'Jumlah barang dapat diturunkan dari panjang daftar, bukan state kedua.'],
        explanation: 'Satu daftar di Toko menjadi sumber kebenaran bagi kedua tampilan. Menyimpan jumlah secara terpisah menambah kewajiban sinkronisasi yang sebenarnya tidak perlu.', xp: 15
      }
    ]
  },
  {
    id: 'nodejs', title: 'Node.js', category: 'Web Development', level: 'Menengah', theme: 'green', symbol: 'Node',
    description: 'Kuis konsep runtime server lokal: modul, I/O asinkron, HTTP, validasi, dan penanganan konfigurasi tanpa layanan berbayar.',
    chapters: [
      { title: 'Runtime di Luar Browser', description: 'Memahami event loop, batas modul, dan pembacaan berkas asinkron.' },
      { title: 'Server Lokal yang Jelas', description: 'Menyusun respons HTTP, memvalidasi masukan, dan menjaga konfigurasi.' }
    ],
    lessons: [
      {
        id: 'nodejs-01', title: 'Asinkron Tidak Membuat CPU Tak Terbatas', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Node.js menjalankan JavaScript pada event loop utama sambil memakai mekanisme lain untuk berbagai pekerjaan I/O. Menunggu disk atau jaringan secara asinkron memungkinkan event loop melayani pekerjaan lain selama hasil belum tersedia.', 'Perulangan komputasi berat yang berjalan sinkron tetap menghalangi thread JavaScript utama. Menaruh loop di fungsi async tidak otomatis memindahkannya ke thread lain. Pekerjaan CPU besar dapat dibagi, dipindahkan ke worker, atau dirancang ulang sesuai kebutuhan.'],
        example: 'async function berat() {\n  let total = 0;\n  for (let i = 0; i < 1000000000; i++) total += i;\n  return total;\n}',
        task: ['Apa dampak utama memanggil fungsi ini pada thread server utama?'], options: ['Loop tetap dapat menahan event loop selama komputasi', 'Kata async otomatis membuat worker thread baru', 'Semua iterasi berjalan serentak di jaringan', 'Node melewati loop karena fungsi mengembalikan Promise'], answer: 0,
        hints: ['Tidak ada operasi yang menyerahkan komputasi ke worker dalam contoh.', 'async mengatur hasil dan penggunaan await, bukan memindahkan seluruh badan fungsi.'],
        explanation: 'Loop sinkron tetap memakai thread utama sampai selesai. Membungkus komputasi berat dalam fungsi async tidak menyelesaikan pemblokiran CPU.', xp: 15
      },
      {
        id: 'nodejs-02', title: 'Modul Bawaan Tidak Perlu Dipasang', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Node menyediakan modul bawaan seperti fs, path, dan http. Prefiks node: memperjelas bahwa impor merujuk modul bawaan, bukan paket pihak ketiga. Modul tersebut tersedia dari runtime tanpa instalasi paket terpisah.', 'ES module dapat digunakan dalam berkas .mjs atau melalui konfigurasi paket yang sesuai. Bedakan mekanisme modul dari asal modul: paket pihak ketiga dan modul bawaan sama-sama bisa diimpor, tetapi kebutuhan pemasangannya berbeda.'],
        example: '// Contoh dalam berkas .mjs\nimport { join } from "node:path";\nconst lokasi = join("data", "catatan.txt");',
        task: ['Apa yang diperlukan untuk memperoleh modul node:path pada contoh?'], options: ['Memasang paket npm bernama path agar prefiks node: dikenali', 'Runtime Node.js yang mendukung ES module; tidak perlu memasang paket path', 'Membuat berkas lokal path.js sebelum impor dapat diselesaikan', 'Memuat objek window di Node sebelum mengakses utilitas path'], answer: 1,
        hints: ['Prefiks node: menandai modul bawaan runtime.', 'Ekstensi .mjs menjelaskan mode modul dalam contoh.'],
        explanation: 'path disertakan dalam Node.js. Memasang paket bernama mirip tidak diperlukan untuk menggunakan modul bawaan tersebut.', xp: 15
      },
      {
        id: 'nodejs-03', title: 'Berkas Teks dan Encoding', chapter: 0, type: 'quiz', language: 'text',
        intro: ['API node:fs/promises menyediakan operasi berkas yang mengembalikan Promise. readFile membaca seluruh isi berkas; tanpa encoding, hasilnya Buffer berisi byte. Dengan encoding utf8, hasilnya string yang telah didekode.', 'Pilih representasi sesuai kebutuhan. Berkas biner sebaiknya tidak diperlakukan sebagai teks, sedangkan parsing JSON membutuhkan teks yang valid. Untuk berkas sangat besar, streaming dapat lebih tepat daripada menampung semuanya sekaligus.'],
        example: 'import { readFile } from "node:fs/promises";\nconst isi = await readFile("catatan.txt", "utf8");',
        task: ['Jika pembacaan berhasil, tipe JavaScript apa yang dimiliki isi?'], options: ['Promise yang belum selesai', 'Buffer karena semua berkas selalu biner', 'string', 'Objek JSON yang otomatis diparsing'], answer: 2,
        hints: ['await mengambil nilai pemenuhan Promise.', 'Argumen utf8 meminta hasil teks, bukan Buffer mentah.'],
        explanation: 'isi merupakan string. Membaca teks tidak otomatis melakukan JSON.parse, dan await membuat variabel menerima hasil pembacaan, bukan Promise-nya.', xp: 15
      },
      {
        id: 'nodejs-04', title: 'Respons HTTP Memiliki Status dan Isi', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Respons HTTP terdiri dari status, header, dan badan. Status membantu klien memahami hasil permintaan, sedangkan Content-Type menjelaskan format badan. Mengirim JSON membutuhkan serialisasi objek menjadi teks, bukan menulis objek JavaScript langsung sebagai badan.', 'Setiap jalur penanganan permintaan harus menyelesaikan respons atau meneruskan kendali secara jelas. Pada modul http bawaan, res.end mengakhiri respons. Server latihan dapat diikat ke alamat loopback agar ditujukan untuk akses lokal.'],
        example: 'import { createServer } from "node:http";\ncreateServer((req, res) => {\n  res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });\n  res.end(JSON.stringify({ status: "siap" }));\n}).listen(3000, "127.0.0.1");',
        task: ['Baris mana yang menyerialisasi data sekaligus menyelesaikan respons?'], options: ['import { createServer } from "node:http";', 'createServer((req, res) => {', 'res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });', 'res.end(JSON.stringify({ status: "siap" }));'], answer: 3,
        hints: ['JSON.stringify menghasilkan teks JSON dari objek.', 'end menandai bahwa tidak ada lagi badan respons yang akan dikirim.'],
        explanation: 'res.end menerima hasil serialisasi dan menutup aliran respons. writeHead hanya mengatur status serta header, bukan menyelesaikan seluruh badan.', xp: 15
      },
      {
        id: 'nodejs-05', title: 'Validasi Lebih Ketat daripada Konversi', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Masukan HTTP berasal dari luar batas kepercayaan server. Konversi tipe tidak sama dengan validasi aturan. Sebagai contoh, parseInt dapat membaca awalan angka dari string yang masih memiliki karakter lain, sehingga tidak selalu cocok untuk pemeriksaan format ketat.', 'Untuk bilangan bulat positif dengan digit desimal saja, periksa format terlebih dahulu lalu jangkauan angka hasilnya. Validasi di browser membantu pengalaman pengguna, tetapi server tetap harus memvalidasi karena permintaan dapat dibuat tanpa browser.'],
        example: 'function validJumlah(teks) {\n  return /^[0-9]+$/.test(teks) &&\n    Number.isSafeInteger(Number(teks)) && Number(teks) > 0;\n}\n// Masukan yang diperiksa: "12abc"',
        task: ['Bagaimana validJumlah memperlakukan "12abc"?'], options: ['Menolaknya karena mengandung karakter bukan digit', 'Menerimanya sebagai 12 seperti parseInt', 'Menerimanya karena ada setidaknya satu digit di mana pun dalam teks', 'Menerimanya setelah pola otomatis membuang karakter selain digit'], answer: 0,
        hints: ['^ dan $ mengharuskan seluruh string cocok dengan pola.', '[0-9]+ hanya menerima satu atau lebih digit desimal pada pola ini.'],
        explanation: 'Masukan ditolak karena seluruh teks tidak terdiri dari digit. Mengandalkan parseInt saja bisa menerima awalan 12 dan mengabaikan bagian abc.', xp: 15
      },
      {
        id: 'nodejs-06', title: 'Environment Tetap Perlu Diperiksa', chapter: 1, type: 'quiz', language: 'text',
        intro: ['process.env menyediakan nilai konfigurasi lingkungan sebagai string atau undefined jika tidak ada. Nilai port, batas ukuran, atau mode aplikasi perlu dikonversi dan divalidasi sebelum dipakai. Anggapan bahwa nama variabel menentukan tipe dapat menimbulkan perilaku keliru.', 'Konfigurasi sensitif tidak perlu ditanam di kode atau dicetak ke log. Pesan kesalahan untuk pengguna sebaiknya tidak membocorkan detail internal, sementara log operasional tetap cukup untuk diagnosis tanpa menyimpan rahasia. Latihan server lokal tidak memerlukan kredensial layanan berbayar.'],
        example: '// Lingkungan berisi PORT=3000\nconst portTeks = process.env.PORT;\nconst hasil = portTeks + 1;',
        task: ['Apa nilai hasil dalam keadaan lingkungan tersebut?'], options: ['3001 sebagai number', '"30001" sebagai string', '3000 sebagai number', 'undefined'], answer: 1,
        hints: ['Nilai PORT dibaca sebagai string "3000".', 'Operator + dengan string melakukan penggabungan teks.'],
        explanation: 'Hasilnya string 30001. Konversikan dengan Number lalu validasi rentang port sebelum menggunakan nilai sebagai angka.', xp: 15
      }
    ]
  },
  {
    id: 'p5js', title: 'p5.js', category: 'Game Development', level: 'Pemula', theme: 'pink', symbol: 'p5',
    description: 'Kuis konsep gambar dan animasi interaktif p5.js: koordinat, frame, input, koleksi objek, dan gerak berbasis waktu.',
    chapters: [
      { title: 'Kanvas dan Gerak', description: 'Mengenali siklus sketch, sistem koordinat, dan pembaruan posisi.' },
      { title: 'Interaksi yang Terukur', description: 'Menguji area klik, menggambar kumpulan objek, dan memakai delta waktu.' }
    ],
    lessons: [
      {
        id: 'p5js-01', title: 'setup Sekali, draw Berulang', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Dalam sketch p5.js, setup dipanggil sekali saat inisialisasi dan biasanya dipakai untuk membuat kanvas. draw kemudian dipanggil berulang selama loop aktif. Perubahan state antar-panggilan draw membentuk animasi.', 'background di awal draw membersihkan frame sebelumnya dengan warna tertentu. Tanpa pembersihan, bentuk yang bergerak dapat meninggalkan jejak. Kedua perilaku bisa disengaja, tetapi perlu dipilih berdasarkan hasil visual yang diinginkan.'],
        example: 'function setup() { createCanvas(400, 300); }\nfunction draw() {\n  background(240);\n  circle(mouseX, mouseY, 30);\n}',
        task: ['Mengapa background ditempatkan di dalam draw pada contoh?'], options: ['Untuk membuat kanvas baru setiap gerakan mouse', 'Untuk menghentikan pemanggilan draw berikutnya', 'Untuk membersihkan gambar lama sebelum menggambar posisi terbaru', 'Untuk mengubah diameter lingkaran menjadi 240'], answer: 2,
        hints: ['draw mengulangi langkah-langkahnya untuk setiap frame.', 'Tanpa pembersihan, posisi lingkaran dari frame sebelumnya tetap terlihat.'],
        explanation: 'background membersihkan frame lama sehingga lingkaran mengikuti mouse tanpa jejak. createCanvas sudah dijalankan saat setup dan tidak perlu diulang.', xp: 15
      },
      {
        id: 'p5js-02', title: 'Koordinat Layar Bertambah ke Bawah', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Dengan transformasi bawaan p5.js, titik (0, 0) berada di kiri atas kanvas. Nilai x bertambah ke kanan, sedangkan nilai y bertambah ke bawah. Ini berbeda dari diagram matematika yang sering menggambar y positif ke atas.', 'Bentuk juga memiliki aturan jangkar. circle memakai pusat, sedangkan rect secara bawaan memakai sudut kiri atas. Mengetahui titik acuan membantu menempatkan elemen dan menghitung batas tumbukan secara konsisten.'],
        example: 'createCanvas(400, 300);\ncircle(100, 80, 20);\n// Pusat berikutnya direncanakan pada (100, 110).',
        task: ['Ke arah mana pusat lingkaran berpindah?'], options: ['30 piksel ke kiri', '30 piksel ke kanan', '30 piksel ke atas', '30 piksel ke bawah'], answer: 3,
        hints: ['Koordinat x tidak berubah.', 'Nilai y meningkat dari 80 menjadi 110 dalam sistem layar bawaan.'],
        explanation: 'Lingkaran bergerak 30 piksel ke bawah. Menggunakan intuisi y positif ke atas dari bidang matematika akan membalik arah gerak di kanvas.', xp: 15
      },
      {
        id: 'p5js-03', title: 'Posisi Perlu Disimpan antar-Frame', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Animasi sederhana menyimpan posisi lalu memperbaruinya setiap frame. Variabel yang dideklarasikan di luar draw dapat mempertahankan nilainya antar-panggilan. Jika posisi diinisialisasi ulang di dalam draw, geraknya bisa tampak berhenti.', 'Urutan pembaruan dan penggambaran juga menentukan posisi yang terlihat pada frame pertama. Contoh ini menggambar setelah memperbarui x. Perhitungan frame membantu memahami keadaan tanpa harus menjalankan sketch.'],
        example: 'let x = 10;\nfunction draw() {\n  background(240);\n  x += 2;\n  circle(x, 50, 20);\n}',
        task: ['Berapa nilai x yang dipakai menggambar pada pemanggilan draw ketiga?'], options: ['16', '12', '14', '10'], answer: 0,
        hints: ['Setiap pemanggilan menambah dua pada nilai sebelumnya.', 'Mulai dari 10, lalu lakukan pembaruan tiga kali sebelum gambar ketiga.'],
        explanation: 'Urutannya 12, 14, lalu 16. Nilai x tidak kembali ke 10 karena inisialisasinya berada di luar draw.', xp: 15
      },
      {
        id: 'p5js-04', title: 'Klik di Dalam Lingkaran', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Interaksi membutuhkan pengujian apakah posisi pointer berada di area objek. Untuk lingkaran, ukur jarak pointer dari pusat lalu bandingkan dengan radius. Diameter yang dipakai menggambar adalah dua kali radius.', 'Pengujian dengan <= memasukkan titik tepat di tepi sebagai bagian area aktif. Pastikan koordinat pointer dan objek berada pada sistem koordinat yang sama, terutama jika sketch memakai translasi atau skala.'],
        example: 'const pusatX = 100, pusatY = 100, diameter = 40;\nconst kena = dist(mouseX, mouseY, pusatX, pusatY) <= diameter / 2;\n// Pointer berada di (115, 100).',
        task: ['Apakah kena bernilai true, dan mengapa?'], options: ['Tidak, karena radiusnya 10', 'Ya, karena jarak 15 lebih kecil dari radius 20', 'Tidak, karena pointer harus persis di pusat', 'Ya, karena setiap titik pada kanvas termasuk lingkaran'], answer: 1,
        hints: ['Diameter 40 berarti radius 20.', 'Koordinat y sama, sehingga jaraknya hanya selisih x.'],
        explanation: 'Jarak pointer ke pusat adalah 15 dan masih dalam radius 20. Membandingkan dengan diameter akan membuat area klik terlalu besar.', xp: 15
      },
      {
        id: 'p5js-05', title: 'Array Menyimpan Banyak Partikel', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Array objek memungkinkan satu aturan gerak diterapkan pada banyak partikel. Setiap objek dapat menyimpan x, y, dan kecepatan sendiri. Perulangan mengurangi duplikasi kode tanpa mengharuskan semua partikel memiliki keadaan yang sama.', 'Pisahkan pembaruan keadaan dari penggambaran secara konseptual. Mengubah p.x memengaruhi objek partikel yang sedang diproses, sedangkan circle hanya memakai keadaan itu untuk menghasilkan gambar. Pemisahan ini memudahkan pemeriksaan logika gerak.'],
        example: 'const partikel = [{ x: 10, vx: 2 }, { x: 30, vx: -1 }];\nfor (const p of partikel) {\n  p.x += p.vx;\n}\n// Satu langkah pembaruan telah selesai.',
        task: ['Apa pasangan posisi x setelah satu langkah?'], options: ['[12, 31]', '[8, 29]', '[12, 29]', '[10, 30]'], answer: 2,
        hints: ['Partikel pertama memiliki kecepatan positif dua.', 'Partikel kedua memiliki kecepatan negatif satu sehingga bergerak ke kiri.'],
        explanation: 'Posisi menjadi 10+2=12 dan 30-1=29. Satu aturan pembaruan tetap menghasilkan arah berbeda karena keadaan setiap objek berbeda.', xp: 15
      },
      {
        id: 'p5js-06', title: 'Kecepatan per Detik, Bukan per Frame', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Menambah posisi dengan angka tetap setiap frame membuat laju animasi bergantung pada banyak frame yang dihasilkan perangkat. deltaTime p5.js menyatakan selang waktu frame dalam milidetik, sehingga gerak dapat disesuaikan dengan waktu yang benar-benar lewat.', 'Jika kecepatan dinyatakan piksel per detik, kalikan dengan deltaTime / 1000 untuk memperoleh perpindahan frame. Pada aplikasi nyata, selang sangat besar setelah tab tidak aktif mungkin perlu dibatasi agar simulasi tidak meloncat terlalu jauh.'],
        example: 'const kecepatan = 120; // piksel per detik\nx += kecepatan * (deltaTime / 1000);\n// Untuk langkah ini, deltaTime = 25 milidetik.',
        task: ['Berapa pertambahan x pada langkah tersebut?'], options: ['120 piksel', '3.000 piksel', '0,12 piksel', '3 piksel'], answer: 3,
        hints: ['25 milidetik sama dengan 0,025 detik.', 'Perpindahan adalah kecepatan dikalikan waktu dalam satuan yang cocok.'],
        explanation: '120 × 0,025 = 3 piksel. Mengabaikan pembagian 1000 mencampur detik dan milidetik sehingga gerak menjadi seribu kali lebih besar.', xp: 15
      }
    ]
  },
  {
    id: 'command-line', title: 'Command Line', category: 'Computer Science', level: 'Pemula', theme: 'green', symbol: 'CLI',
    description: 'Kuis konsep terminal dengan contoh Bash dan utilitas POSIX: lokasi kerja, argumen, aliran teks, redirection, dan status proses. Bukan terminal interaktif.',
    chapters: [
      { title: 'Lokasi dan Argumen', description: 'Membaca path, daftar berkas, dan pengelompokan argumen shell.' },
      { title: 'Menghubungkan Proses', description: 'Menalar pipe, penyimpanan keluaran, serta status keberhasilan perintah.' }
    ],
    lessons: [
      {
        id: 'command-line-01', title: 'Path Relatif Memerlukan Titik Awal', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Shell menjalankan perintah dengan direktori kerja tertentu. Path absolut dimulai dari akar sistem berkas, sedangkan path relatif ditafsirkan dari direktori kerja. pwd menampilkan lokasi kerja saat ini; cd mengubah lokasi tersebut.', 'Komponen .. menunjuk direktori induk dan . menunjuk direktori saat ini. Contoh kursus menggunakan aturan path Bash/POSIX. Bentuk drive Windows berbeda, meskipun Git Bash dapat menyediakan pemetaan untuk mengaksesnya.'],
        example: 'Lokasi kerja: /home/sari/proyek/web\nPath relatif: ../data/nilai.csv\nAsumsi: tidak ada symbolic link pada jalur ini.',
        task: ['Path absolut mana yang ditunjuk?'], options: ['/home/sari/proyek/data/nilai.csv', '/home/sari/proyek/web/data/nilai.csv', '/home/sari/data/nilai.csv', '/data/nilai.csv'], answer: 0,
        hints: ['Satu .. naik dari web ke proyek.', 'Setelah naik, lanjutkan ke data lalu nilai.csv.'],
        explanation: 'Path berada di /home/sari/proyek/data/nilai.csv. .. hanya naik satu tingkat, bukan langsung ke direktori rumah atau akar.', xp: 15
      },
      {
        id: 'command-line-02', title: 'Berkas Tersembunyi Tetap Ada', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Pada kebiasaan Unix, nama yang diawali titik tidak ditampilkan oleh ls biasa. Berkas seperti .gitignore tetap merupakan berkas normal; tersembunyi di daftar bawaan bukan berarti terenkripsi atau terlindungi.', 'Opsi -a meminta ls menampilkan entri yang diawali titik, sedangkan -l memilih format rinci. Membaca opsi dengan sadar membantu membedakan persoalan tampilan dari persoalan izin akses atau keberadaan data.'],
        example: 'Isi direktori: app.js, .gitignore, gambar/\nPerintah pertama: ls\nPerintah kedua: ls -a',
        task: ['Apa alasan .gitignore muncul pada perintah kedua tetapi dapat tidak terlihat pada perintah pertama?'], options: ['-a menyertakan isi subdirektori secara rekursif', '-a menyertakan entri yang namanya diawali titik', '-a memilih format panjang beserta ukuran dan pemilik', '-a hanya menyertakan berkas yang diubah hari ini'], answer: 1,
        hints: ['Konvensi nama bertitik memengaruhi daftar bawaan.', 'Perintah daftar tidak membuat atau menghapus berkas hanya karena opsi tampilannya berubah.'],
        explanation: 'ls -a menampilkan entri bertitik. Sifat tersembunyi ini bukan mekanisme keamanan dan tidak mencegah berkas dibaca oleh pengguna yang memiliki izin.', xp: 15
      },
      {
        id: 'command-line-03', title: 'Kutipan Menjaga Satu Argumen', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Shell memecah teks perintah menjadi nama program dan argumen. Spasi tanpa kutipan biasanya memisahkan argumen. Path yang mengandung spasi perlu dikutip agar program menerima satu nama lengkap, bukan beberapa potongan.', 'Dalam Bash, kutip ganda tetap mengizinkan ekspansi variabel, sedangkan kutip tunggal mempertahankan isi secara literal. Pilih kutipan berdasarkan apakah nilai variabel memang perlu diperluas. Ini mencegah kesalahan penamaan sekaligus argumen tak sengaja.'],
        example: 'cp "laporan akhir.txt" "arsip/laporan akhir.txt"',
        task: ['Berapa argumen path yang diterima cp pada contoh?'], options: ['Enam karena setiap kata dihitung', 'Empat karena ada dua spasi', 'Dua: path sumber dan path tujuan', 'Satu karena semua kutipan digabung'], answer: 2,
        hints: ['Setiap pasangan kutip ganda mengelompokkan satu path.', 'cp berada di luar hitungan argumen karena merupakan nama program.'],
        explanation: 'cp menerima dua argumen path, masing-masing tetap mengandung spasi. Tanpa kutipan, pemisahan kata dapat menghasilkan argumen yang berbeda dari maksud pengguna.', xp: 15
      },
      {
        id: 'command-line-04', title: 'Pipe Menghubungkan Aliran Keluaran', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Program terminal biasanya memiliki standard input, standard output, dan standard error. Pipe | menghubungkan standard output perintah kiri ke standard input perintah kanan. Berkas sumber tidak otomatis diubah hanya karena isinya mengalir melalui pipe.', 'Perintah yang membaca stdin dapat dirangkai menjadi transformasi kecil. Standard error tidak ikut masuk pipe biasa, sehingga pesan kegagalan dapat tetap muncul di terminal. Bedakan data keluaran dari pesan diagnosis saat membaca hasil rangkaian.'],
        example: 'sort nama.txt | uniq\nIsi nama.txt:\nBima\nAyu\nBima',
        task: ['Dengan urutan alfabet Ayu sebelum Bima, apa keluaran rangkaian sort nama.txt | uniq?'], options: ['Bima, Ayu, Bima pada tiga baris', 'Ayu, Bima, Bima pada tiga baris', 'Hanya Ayu pada satu baris', 'Ayu lalu Bima, masing-masing pada satu baris'], answer: 3,
        hints: ['Dua baris Bima awalnya dipisahkan oleh Ayu.', 'Pengurutan membuat nilai yang sama berada berdampingan.'],
        explanation: 'Hasilnya Ayu lalu Bima. sort mengelompokkan nama sama dan uniq menggabungkan pengulangan yang bersebelahan; tanpa uniq, Bima tetap muncul dua kali. Pipe tidak menulis ulang berkas asal.', xp: 15
      },
      {
        id: 'command-line-05', title: 'Menimpa dan Menambahkan Keluaran', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Redirection > mengarahkan standard output ke berkas dan biasanya mengosongkan isi lama sebelum menulis. Operator >> menambahkan keluaran di akhir. Keduanya ditangani shell, bukan harus dipahami oleh program penghasil teks.', 'Periksa nama tujuan sebelum redirection karena data yang tertimpa tidak otomatis memiliki tombol undo. Jangan menulis keluaran ke berkas yang juga sedang dibaca oleh perintah yang sama tanpa memahami kapan shell membuka dan mengosongkan tujuan.'],
        example: 'Asumsi Bash biasa, tanpa opsi noclobber.\nstatus.txt sudah berisi dua baris.\nPerintah: printf "selesai\\n" > status.txt',
        task: ['Apa isi status.txt setelah perintah berhasil?'], options: ['Hanya satu baris: selesai', 'Dua baris lama diikuti selesai', 'Dua baris lama tanpa perubahan', 'Empat salinan kata selesai'], answer: 0,
        hints: ['Operator yang digunakan adalah >, bukan >>.', 'Shell membuka tujuan untuk penulisan yang menimpa isi lama.'],
        explanation: 'Isi lama diganti menjadi satu baris selesai. Gunakan >> jika niatnya menambahkan, tetapi tetap pastikan path tujuan benar.', xp: 15
      },
      {
        id: 'command-line-06', title: 'Status Keluar Mengendalikan Rangkaian', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Proses mengembalikan exit status ketika selesai. Dalam kebiasaan shell, nol berarti berhasil dan nilai bukan nol menandakan kegagalan atau kondisi khusus yang ditentukan program. Status bukan jumlah baris keluaran yang tercetak.', 'Operator && menjalankan perintah kanan hanya jika perintah kiri berhasil. Ini berguna untuk langkah yang bergantung pada prasyarat. Operator ; tidak memiliki syarat tersebut dan tetap melanjutkan setelah perintah sebelumnya selesai.'],
        example: 'mkdir hasil && cp ringkasan.txt hasil/\nAsumsi: mkdir gagal dan mengembalikan status bukan nol.',
        task: ['Apa yang dilakukan shell terhadap perintah cp?'], options: ['Menjalankannya sebagai pemulihan hanya karena mkdir gagal', 'Tidak menjalankannya karena syarat && tidak terpenuhi', 'Menjalankannya bersamaan dengan mkdir seperti rangkaian pipe', 'Menjalankannya setelah mkdir selesai tanpa memeriksa statusnya',], answer: 1,
        hints: ['Bagian kanan && bergantung pada keberhasilan kiri.', 'Contoh secara eksplisit menetapkan bahwa mkdir gagal.'],
        explanation: 'cp dilewati karena mkdir mengembalikan status bukan nol. && bukan sekadar pemisah visual seperti titik koma.', xp: 15
      }
    ]
  },
  {
    id: 'git-github', title: 'Git & GitHub', category: 'Computer Science', level: 'Pemula', theme: 'orange', symbol: 'Git',
    description: 'Kuis konsep versi lokal dan kolaborasi GitHub: staging, commit, branch, konflik, pengecualian berkas, dan sinkronisasi remote.',
    chapters: [
      { title: 'Riwayat Lokal', description: 'Membedakan working tree, staging area, commit, dan branch.' },
      { title: 'Kolaborasi yang Terkendali', description: 'Memahami konflik, batas .gitignore, serta perbedaan fetch dan push.' }
    ],
    lessons: [
      {
        id: 'git-github-01', title: 'Staging Memilih Snapshot Berikutnya', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Git membedakan working tree, staging area atau index, dan commit. Mengedit berkas mengubah working tree. git add menyalin keadaan terpilih ke index untuk commit berikutnya; ia tidak membuat pemantauan otomatis terhadap semua perubahan selanjutnya.', 'Pemisahan ini memungkinkan commit yang fokus, tetapi perlu pemeriksaan sebelum menyimpan. git diff menunjukkan perubahan yang belum di-stage, sedangkan git diff --staged menunjukkan perbedaan index terhadap commit terakhir.'],
        example: '1. app.js berisi versi A.\n2. git add app.js\n3. app.js diedit menjadi versi B.\n4. git commit -m "Simpan perubahan terpilih"\nTidak ada git add kedua dan tidak memakai commit -a.',
        task: ['Versi app.js mana yang masuk commit?'], options: ['Versi B karena selalu memakai berkas terbaru', 'Gabungan otomatis A dan B', 'Versi A yang sudah berada di staging area', 'Tidak ada versi karena edit setelah add selalu membatalkan staging'], answer: 2,
        hints: ['git add mengambil keadaan pada saat perintah dijalankan.', 'Edit berikutnya tetap berada di working tree sampai di-stage lagi.'],
        explanation: 'Commit merekam versi A dari index. Versi B tetap menjadi perubahan working tree yang belum tercakup dalam commit tersebut.', xp: 15
      },
      {
        id: 'git-github-02', title: 'Commit Lokal Bukan Unggahan', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Commit menyimpan snapshot beserta metadata dan hubungan ke commit induk dalam repositori lokal. Git dapat membuat riwayat tanpa koneksi internet. GitHub adalah layanan kolaborasi yang dapat menyimpan remote, bukan komponen wajib untuk commit lokal.', 'Pesan commit sebaiknya menjelaskan tujuan perubahan agar riwayat mudah dipahami. Mengirim commit ke remote merupakan langkah terpisah, biasanya melalui push. Pemisahan ini membuat pekerjaan lokal dapat diperiksa sebelum dibagikan.'],
        example: 'Pengembang membuat commit saat laptop tidak terhubung internet.\nRepositori lokal memiliki remote GitHub, tetapi belum ada push setelah commit itu.',
        task: ['Di mana commit baru tersebut sudah tersedia?'], options: ['Otomatis pada semua clone rekan kerja', 'Hanya dalam riwayat browser GitHub', 'Tidak tersimpan karena internet mati', 'Dalam repositori lokal, belum tentu pada remote'], answer: 3,
        hints: ['Git menyimpan objek commit pada penyimpanan repositori lokal.', 'Konfigurasi remote tidak otomatis mengunggah setiap perubahan.'],
        explanation: 'Commit berhasil tersimpan secara lokal. Remote dan clone rekan baru mendapatkannya setelah langkah sinkronisasi yang sesuai.', xp: 15
      },
      {
        id: 'git-github-03', title: 'Branch Adalah Penunjuk Riwayat', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Branch Git adalah nama yang menunjuk commit dan bergerak ketika commit baru dibuat pada branch itu. Membuat branch tidak menyalin seluruh folder proyek menjadi direktori lain. HEAD biasanya menunjukkan branch yang sedang aktif.', 'Branch mendukung pengembangan terpisah sebelum perubahan digabungkan. Memilih branch bukan jaminan perubahan working tree yang belum disimpan akan hilang; Git dapat mempertahankannya atau menolak perpindahan jika berpotensi tertimpa.'],
        example: 'Keadaan awal: branch main aktif dan working tree bersih.\nPerintah: git switch -c fitur-kuis',
        task: ['Apa hasil utama perintah tersebut?'], options: ['Membuat branch fitur-kuis pada commit saat ini dan berpindah ke sana', 'Membuat branch fitur-kuis tetapi tetap berada di main', 'Berpindah ke fitur-kuis yang harus sudah ada tanpa membuat branch', 'Mengganti nama branch main menjadi fitur-kuis'], answer: 0,
        hints: ['Opsi -c pada switch berarti membuat branch baru.', 'Tidak ada remote atau path direktori tujuan dalam perintah ini.'],
        explanation: 'Branch fitur-kuis dibuat dan menjadi branch aktif. Operasi branch bekerja pada penunjuk riwayat, bukan menggandakan seluruh proyek ke folder terpisah.', xp: 15
      },
      {
        id: 'git-github-04', title: 'Konflik Membutuhkan Keputusan Isi', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Konflik merge terjadi ketika Git tidak dapat menggabungkan perubahan secara otomatis dengan aman. Penanda konflik menunjukkan bagian yang membutuhkan keputusan manusia. Sisi lokal tidak selalu paling benar, dan sisi lain tidak selalu harus dibuang.', 'Penyelesaian melibatkan memahami maksud kedua perubahan, mengedit hasil yang diinginkan, menghapus penanda, menguji perilaku, lalu menandai berkas terselesaikan dengan git add. Commit merge kemudian menyimpan hasil penyelesaian sesuai alur merge yang sedang berlangsung.'],
        example: '<<<<<<< HEAD\nconst batas = 10;\n=======\nconst batas = 20;\n>>>>>>> fitur-batas\nKebutuhan yang disepakati tim: batas baru harus 20.',
        task: ['Isi akhir mana yang tepat sebelum berkas di-stage sebagai penyelesaian?'], options: ['Pertahankan semua penanda agar Git memilih nanti', 'const batas = 20; tanpa penanda konflik', 'Dua deklarasi const batas sekaligus tanpa penanda', 'Berkas kosong agar tidak ada perbedaan'], answer: 1,
        hints: ['Persyaratan tim sudah menetapkan nilai yang diinginkan.', 'Penanda konflik bukan bagian JavaScript yang valid untuk hasil akhir.'],
        explanation: 'Hasilnya satu deklarasi bernilai 20 tanpa penanda. git add menandai hasil pilihan sebagai terselesaikan; ia tidak menentukan sendiri keputusan bisnisnya.', xp: 15
      },
      {
        id: 'git-github-05', title: '.gitignore Bukan Penghapus Rahasia', chapter: 1, type: 'quiz', language: 'text',
        intro: ['.gitignore mengatur berkas yang belum dilacak agar biasanya tidak ditawarkan untuk penambahan. Aturan ini tidak otomatis menghapus berkas yang sudah dilacak, dan tidak menghapus data dari commit lama.', 'Jika kredensial pernah masuk riwayat yang dibagikan, anggap kredensial itu terpapar dan lakukan pencabutan atau rotasi. Pembersihan riwayat adalah pekerjaan terkoordinasi yang terpisah. Pencegahan terbaik adalah tidak menaruh rahasia pada berkas yang akan di-commit.'],
        example: 'Berkas .env sudah pernah di-commit dan di-push.\nPengembang kemudian menambahkan baris .env ke .gitignore.',
        task: ['Pernyataan mana yang benar setelah perubahan .gitignore itu saja?'], options: ['Salinan rahasia di remote langsung dihapus dari commit lama', 'Berkas otomatis berhenti terlacak pada commit berikutnya', 'Berkas tetap terlacak dan riwayat lama masih dapat memuat rahasia', 'Git menyamarkan isi .env saat commit lama dilihat pengguna lain'], answer: 2,
        hints: ['Aturan ignore terutama bekerja untuk berkas yang belum dilacak.', 'Snapshot commit sebelumnya tidak berubah hanya karena aturan ignore baru.'],
        explanation: 'Berkas yang sudah dilacak tidak otomatis berhenti dilacak dan riwayat tetap ada. Rahasia terpapar perlu dicabut atau dirotasi, bukan sekadar disembunyikan dari daftar berkas.', xp: 15
      },
      {
        id: 'git-github-06', title: 'Fetch Mengambil Tanpa Menggabungkan', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Remote-tracking branch seperti origin/main mencatat keadaan branch remote yang terakhir diketahui. git fetch mengambil objek dan memperbarui referensi remote-tracking sesuai konfigurasi, tanpa otomatis menggabungkannya ke branch kerja saat ini.', 'git pull menambahkan langkah integrasi setelah mengambil data, sedangkan push mengirim perubahan lokal ke remote. Memisahkan pengambilan dan integrasi memberi kesempatan meninjau perubahan sebelum merge atau rebase yang disengaja.'],
        example: 'Branch main lokal aktif dengan working tree bersih.\nRekan menambahkan commit ke main di remote origin.\nPengembang menjalankan git fetch origin dengan konfigurasi remote standar.',
        task: ['Apa yang terjadi pada branch main lokal hanya karena fetch tersebut?'], options: ['Main lokal otomatis dimajukan jika tidak memiliki commit tambahan', 'Commit baru langsung digabungkan ke main melalui merge commit', 'Main lokal otomatis di-rebase ke origin/main', 'Main lokal tetap pada commit sebelumnya; origin/main dapat diperbarui'], answer: 3,
        hints: ['Fetch memperbarui pengetahuan tentang remote.', 'Integrasi ke branch aktif adalah langkah terpisah dari pengambilan data.'],
        explanation: 'Fetch dapat memajukan origin/main tanpa memindahkan main lokal. Menyamakan fetch dengan pull menghilangkan perbedaan penting antara mengambil dan mengintegrasikan.', xp: 15
      }
    ]
  },
  {
    id: 'github-copilot', title: 'GitHub Copilot', category: 'AI', level: 'Pemula', theme: 'purple', symbol: 'Co',
    description: 'Kuis konsep kolaborasi dengan asisten kode melalui simulasi usulan dan review. Tidak memerlukan langganan, akun, atau panggilan API Copilot.',
    chapters: [
      { title: 'Memberi Konteks yang Berguna', description: 'Memahami batas usulan, menyusun permintaan, dan menjaga kerahasiaan konteks.' },
      { title: 'Memverifikasi Sebelum Menerima', description: 'Menguji perilaku, memeriksa keamanan, dan meninjau perubahan kecil.' }
    ],
    lessons: [
      {
        id: 'github-copilot-01', title: 'Usulan Kode Bukan Bukti Kebenaran', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Asisten kode seperti GitHub Copilot menyarankan teks berdasarkan konteks yang tersedia. Usulan dapat mempercepat penulisan, tetapi tetap bisa salah memahami persyaratan, memakai API yang tidak ada, atau mengabaikan kasus batas.', 'Penerimaan usulan adalah keputusan pengembang, bukan stempel bahwa kode sudah benar. Dalam kursus ini kita menilai contoh usulan secara konseptual, sehingga tidak perlu mengakses fitur berbayar atau mengirim kode proyek ke layanan apa pun.'],
        example: 'Persyaratan: diskon berlaku untuk total minimal 100.\nUsulan: function dapatDiskon(total) { return total > 100; }',
        task: ['Untuk total tepat 100, bagaimana hasil menurut kontrak dibandingkan hasil usulan?'], options: ['Kontrak true, tetapi usulan false', 'Kontrak false, tetapi usulan true', 'Kontrak dan usulan sama-sama true', 'Kontrak dan usulan sama-sama false'], answer: 0,
        hints: ['Minimal berarti ambang batas ikut diterima.', 'Coba substitusikan total = 100 ke kondisi usulan.'],
        explanation: 'Kasus tepat di ambang membutuhkan >= 100. Kode yang tampak wajar secara sintaks tetap dapat melanggar satu kata penting dalam persyaratan.', xp: 15
      },
      {
        id: 'github-copilot-02', title: 'Permintaan Menyebut Kontrak dan Batas', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Permintaan yang berguna menjelaskan masukan, keluaran, batasan, dan kasus tepi. Menyebut bahasa serta versi lingkungan membantu mencegah usulan API yang tidak cocok. Kriteria penerimaan lebih berguna daripada kata-kata umum seperti modern atau canggih.', 'Untuk tugas kecil, sertakan contoh perilaku yang diharapkan serta aturan tentang dependensi dan mutasi. Instruksi ini mempersempit ruang solusi, tetapi tetap perlu diverifikasi lewat pembacaan kode dan tes yang tidak sekadar meniru usulan.'],
        example: 'Tugas: fungsi JavaScript untuk menghapus duplikasi daftar ID.\nKebutuhan nyata: urutan kemunculan pertama dipertahankan dan array masukan tidak diubah.',
        task: ['Permintaan mana paling jelas menyampaikan kontrak tersebut?'], options: ['Buat fungsi paling keren untuk array', 'Buat fungsi uniqueIds tanpa dependensi, pertahankan urutan pertama, jangan mutasi input, dan sertakan tes array kosong', 'Perbaiki semua kode yang mungkin terkait sekaligus', 'Gunakan sebanyak mungkin pustaka agar terlihat lengkap'], answer: 1,
        hints: ['Kontrak harus menyebut sifat keluaran dan efek terhadap input.', 'Kasus kosong merupakan contoh batas yang bisa diuji secara langsung.'],
        explanation: 'Permintaan kedua memberi batas perilaku yang konkret dan dapat diperiksa. Detail yang relevan lebih membantu daripada pujian gaya atau perluasan lingkup tanpa tujuan.', xp: 15
      },
      {
        id: 'github-copilot-03', title: 'Konteks Minimum Tanpa Rahasia', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Asisten membutuhkan konteks untuk memahami kode, tetapi tidak semua data proyek perlu disertakan. Token akses, kata sandi, data pelanggan, dan isi kontrak privat bukan bahan contoh yang aman. Gunakan contoh sintetis dan potongan terkecil yang cukup untuk menjelaskan persoalan.', 'Jangan menganggap berkas yang terbuka atau tercantum di prompt selalu diproses dengan kebijakan yang sama di semua produk. Periksa konfigurasi serta kebijakan organisasi. Jika tidak jelas, pilih simulasi lokal dengan data buatan daripada mengirim informasi sensitif.'],
        example: 'Bug parsing dapat direproduksi dengan satu objek JSON.\nData produksi berisi nama pelanggan, alamat, dan token akses.\nStruktur yang penting hanya field tanggal dan jumlah.',
        task: ['Konteks mana paling tepat untuk meminta bantuan?'], options: ['Seluruh dump produksi beserta token supaya lengkap', 'Tangkapan layar panel rahasia agar model melihat semua detail', 'Contoh JSON sintetis dengan tanggal dan jumlah yang mereproduksi bug', 'Berkas .env karena selalu dibutuhkan untuk masalah parsing'], answer: 2,
        hints: ['Pertahankan struktur yang menyebabkan bug, bukan identitas orang atau kredensial.', 'Informasi yang tidak memengaruhi reproduksi dapat dikeluarkan dari konteks.'],
        explanation: 'Contoh sintetis yang minimal mempertahankan nilai diagnostik tanpa membocorkan data nyata. Kelengkapan konteks tidak berarti harus menyertakan semua isi sistem.', xp: 15
      },
      {
        id: 'github-copilot-04', title: 'Tes Harus Berasal dari Persyaratan', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Tes yang dibuat dari implementasi dapat mengabadikan kesalahan implementasi yang sama. Turunkan kasus uji dari kontrak yang disepakati, termasuk kondisi batas, masukan kosong, serta masukan tidak valid yang memang didefinisikan.', 'Asisten dapat membantu menyarankan kasus, tetapi pengembang perlu menilai apakah tes benar-benar membedakan solusi benar dari salah. Tes yang hanya memeriksa contoh normal sering melewatkan off-by-one dan perilaku ekstrem.'],
        example: 'Kontrak: usia 17 tahun ke atas boleh mendaftar.\nUsulan implementasi: return usia > 17;\nTes yang sudah ada: usia 20 menghasilkan true.',
        task: ['Tes tambahan mana paling langsung mengungkap kesalahan usulan?'], options: ['Usia 25 menghasilkan true', 'Usia 40 menghasilkan true', 'Usia 18 menghasilkan true', 'Usia 17 harus menghasilkan true'], answer: 3,
        hints: ['Implementasi dan kontrak berbeda tepat pada nilai ambang.', 'Cari kasus yang menghasilkan jawaban berbeda pada > dan >=.'],
        explanation: 'Usia 17 seharusnya diterima, tetapi usulan menolaknya. Menambah banyak tes jauh di atas ambang tidak menguji perbedaan yang menyebabkan bug.', xp: 15
      },
      {
        id: 'github-copilot-05', title: 'Review Keamanan pada Query', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Usulan kode perlu diperiksa terhadap batas kepercayaan, terutama saat mengolah masukan pengguna. Menggabungkan masukan langsung ke SQL dapat membuat isi masukan ditafsirkan sebagai sintaks query, bukan data biasa.', 'Gunakan parameter binding yang disediakan driver database. Cara penulisan placeholder berbeda antar-driver, tetapi prinsipnya sama: struktur query terpisah dari nilai. Jangan menganggap escape manual sederhana atau usulan asisten otomatis menyelesaikan seluruh persoalan keamanan.'],
        example: 'Contoh dengan driver SQLite yang mendukung parameter ?: \ndb.get("SELECT nama FROM pengguna WHERE id = ?", [id], callback);',
        task: ['Mengapa pola parameter tersebut lebih tepat daripada menyambung id ke string SQL?'], options: ['Nilai id dikirim sebagai data terikat, bukan bagian sintaks SQL', 'Parameter memeriksa bahwa pemanggil berhak membaca baris hasil', 'Parameter menjamin id selalu sesuai semua aturan bisnis aplikasi', 'Parameter mengenkripsi nilai id sebelum dikirim ke database'], answer: 0,
        hints: ['Perhatikan pemisahan string query dan array nilai.', 'Pencegahan injeksi berbeda dari otorisasi siapa yang boleh membaca hasil.'],
        explanation: 'Parameter binding memisahkan data dari sintaks query. Otorisasi dan validasi kebutuhan aplikasi tetap diperlukan; query terparameter bukan pengganti seluruh lapisan keamanan.', xp: 15
      },
      {
        id: 'github-copilot-06', title: 'Diff Kecil Lebih Mudah Dipertanggungjawabkan', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Usulan asisten dapat mengubah lebih banyak daripada yang diminta, misalnya menambah dependensi, memodifikasi konfigurasi, atau mengganti antarmuka publik. Diff adalah tempat memeriksa lingkup nyata perubahan, bukan hanya ringkasan yang menyertainya.', 'Terima perubahan kecil yang dapat dijelaskan, jalankan pemeriksaan lokal yang relevan, dan baca dokumentasi API dari sumber yang sesuai. Paket yang disebut asisten belum tentu ada atau aman. Keputusan memasang dependensi harus terpisah dari sekadar menerima saran teks.'],
        example: 'Permintaan hanya memperbaiki format tanggal.\nUsulan mengubah formatter, menambahkan paket asing, dan menghapus dua tes gagal.\nBelum ada alasan untuk perubahan paket atau penghapusan tes.',
        task: ['Langkah review mana paling tepat?'], options: ['Terima seluruh diff agar tes terlihat hijau', 'Batasi perubahan pada kebutuhan, periksa API, dan pertahankan atau perbaiki tes yang relevan', 'Hapus semua tes lain agar tidak mengganggu', 'Pasang paket tanpa memeriksa asalnya karena disebut asisten'], answer: 1,
        hints: ['Tes gagal dapat mengungkap cacat, bukan sekadar menghalangi penyelesaian.', 'Perubahan di luar lingkup membutuhkan alasan yang dapat diperiksa.'],
        explanation: 'Review harus mempertahankan lingkup dan bukti perilaku. Menghapus tes atau menambah dependensi tanpa alasan dapat menyembunyikan bug dan memperluas permukaan masalah.', xp: 15
      }
    ]
  },
  {
    id: 'ui-ux-design', title: 'UI/UX Design', category: 'Web Development', level: 'Pemula', theme: 'pink', symbol: 'UX',
    description: 'Kuis konsep desain berpusat pada pengguna: riset, struktur informasi, wireframe, aksesibilitas, formulir, dan pengujian tugas.',
    chapters: [
      { title: 'Memahami Kebutuhan', description: 'Merumuskan tugas pengguna, mengelompokkan informasi, dan menguji alur sederhana.' },
      { title: 'Menguji Kemudahan Penggunaan', description: 'Menyediakan akses alternatif, umpan balik jelas, dan bukti dari observasi.' }
    ],
    lessons: [
      {
        id: 'ui-ux-design-01', title: 'Riset Mencari Perilaku, Bukan Pujian', chapter: 0, type: 'quiz', language: 'text',
        intro: ['UX berfokus pada pengalaman mencapai tujuan, sedangkan UI mencakup unsur antarmuka yang dipakai selama proses itu. Riset awal membantu memahami konteks, hambatan, dan kebiasaan sebelum tim menentukan solusi.', 'Pertanyaan yang menggiring dapat membuat peserta menyetujui gagasan pewawancara. Minta contoh kejadian nyata dan langkah yang dilakukan, bukan sekadar pendapat apakah fitur yang diusulkan terdengar bagus. Perilaku masa lalu memberi rincian yang dapat ditelusuri.'],
        example: 'Tim ingin membantu mahasiswa menemukan latihan yang sesuai.\nWawancara dilakukan sebelum mendesain halaman katalog baru.',
        task: ['Pertanyaan mana paling sedikit menggiring dan paling berorientasi perilaku?'], options: ['Kamu pasti ingin katalog kami yang lebih modern, bukan?', 'Apakah tombol biru kami sudah sempurna?', 'Ceritakan terakhir kali kamu mencari latihan; langkah apa yang kamu lakukan?', 'Setujukah bahwa solusi kami pasti paling cepat?'], answer: 2,
        hints: ['Cari pertanyaan terbuka tentang kejadian konkret.', 'Hindari memasukkan penilaian positif terhadap solusi ke dalam pertanyaan.'],
        explanation: 'Pertanyaan tentang pengalaman terakhir membuka cerita proses dan hambatan nyata. Pertanyaan yang meminta persetujuan terhadap solusi cenderung menghasilkan bias konfirmasi.', xp: 15
      },
      {
        id: 'ui-ux-design-02', title: 'Struktur Informasi Mengikuti Cara Mencari', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Arsitektur informasi mengatur hubungan, kelompok, dan label konten agar pengguna dapat menemukan yang dibutuhkan. Struktur organisasi pembuat aplikasi belum tentu cocok dengan cara pengguna memikirkan tugas mereka.', 'Card sorting dapat membantu melihat cara peserta mengelompokkan topik, sedangkan tree testing memeriksa apakah orang dapat menemukan tujuan melalui struktur navigasi. Label yang familier biasanya lebih mudah dipahami daripada singkatan internal tanpa penjelasan.'],
        example: 'Katalog latihan dikelompokkan menurut nama tim internal: Tim A, Tim B, Tim C.\nPengguna baru mencari latihan berdasarkan bahasa dan tingkat kesulitan.',
        task: ['Perubahan struktur mana paling sesuai dengan bukti kebutuhan tersebut?'], options: ['Mengganti Tim A menjadi Divisi A tanpa mengubah kelompok', 'Mengurutkan semua latihan berdasarkan nama pembuat', 'Menyembunyikan kategori agar pengguna membuka satu per satu', 'Menyediakan kelompok bahasa dan filter tingkat kesulitan yang berlabel jelas'], answer: 3,
        hints: ['Tujuan pengguna menyebut dua dimensi pencarian yang nyata.', 'Struktur internal tim tidak perlu menjadi struktur navigasi pengguna.'],
        explanation: 'Bahasa dan tingkat kesulitan sesuai dengan cara pengguna mencari. Pergantian nama internal saja tidak memperbaiki ketidakcocokan model informasi.', xp: 15
      },
      {
        id: 'ui-ux-design-03', title: 'Wireframe Menguji Alur Lebih Awal', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Wireframe adalah rancangan sederhana yang menekankan susunan, hierarki, dan alur, bukan detail visual akhir. Ia berguna untuk menguji apakah pengguna memahami langkah utama sebelum tim menghabiskan waktu pada warna, ilustrasi, dan animasi.', 'Tingkat fidelitas perlu mengikuti pertanyaan yang diuji. Untuk menilai apakah tombol lanjut mudah ditemukan, sketsa kasar mungkin cukup. Untuk memeriksa keterbacaan tipografi akhir atau kontras warna, diperlukan representasi yang lebih mendekati hasil sebenarnya.'],
        example: 'Tim belum tahu apakah alur pilih kursus → pilih bab → mulai latihan dapat dipahami.\nAnggaran waktu desain terbatas dan gaya visual belum diputuskan.',
        task: ['Artefak awal mana paling tepat untuk menjawab ketidakpastian tersebut?'], options: ['Wireframe alur yang dapat ditelusuri langkah demi langkah', 'Animasi logo beresolusi tinggi', 'Panduan bayangan kartu yang sangat rinci', 'Poster promosi tanpa navigasi'], answer: 0,
        hints: ['Pertanyaan riset menyangkut urutan tindakan, bukan dekorasi.', 'Pilih artefak termurah yang tetap dapat mewakili alur untuk diuji.'],
        explanation: 'Wireframe alur memungkinkan pengujian langkah utama dengan biaya perubahan rendah. Memoles identitas visual lebih dulu tidak menjawab apakah navigasi dapat dipahami.', xp: 15
      },
      {
        id: 'ui-ux-design-04', title: 'Aksesibilitas Tidak Bergantung pada Warna Saja', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Informasi penting perlu tersedia melalui lebih dari satu petunjuk visual. Status yang hanya dibedakan oleh merah dan hijau dapat sulit dibaca oleh sebagian pengguna atau pada layar dengan kondisi tertentu. Teks dan ikon berlabel dapat memperjelas makna.', 'Interaksi juga perlu dapat dijalankan dengan keyboard, dengan indikator fokus yang terlihat dan elemen semantik yang sesuai. Kontras yang baik membantu keterbacaan, tetapi tidak menggantikan label, urutan fokus, atau pesan yang dapat dikenali teknologi bantu.'],
        example: 'Formulir menandai kolom salah hanya dengan garis merah.\nTidak ada teks kesalahan, dan indikator fokus dihapus dari semua input.',
        task: ['Perbaikan mana paling langsung menangani kedua masalah tersebut?'], options: ['Ganti merah menjadi hijau tanpa menambahkan teks', 'Tambahkan pesan kesalahan terkait input dan pulihkan indikator fokus yang jelas', 'Hilangkan semua batas input agar tampilan sederhana', 'Tampilkan instruksi hanya ketika mouse diarahkan ke ikon kecil'], answer: 1,
        hints: ['Kesalahan harus dijelaskan dengan makna, bukan warna saja.', 'Pengguna keyboard perlu tahu elemen mana yang sedang menerima input.'],
        explanation: 'Pesan terkait input menyampaikan masalah dan indikator fokus menunjukkan posisi interaksi. Warna baru saja tidak menyediakan informasi atau navigasi yang sebelumnya hilang.', xp: 15
      },
      {
        id: 'ui-ux-design-05', title: 'Pesan Kesalahan Menawarkan Jalan Keluar', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Validasi formulir sebaiknya memberi tahu apa yang salah dan bagaimana memperbaikinya tanpa menyalahkan pengguna. Pertahankan masukan yang masih valid agar pengguna tidak mengulang pekerjaan. Letakkan pesan dekat bagian terkait dan pastikan tetap dapat ditemukan.', 'Waktu umpan balik juga penting. Menampilkan kesalahan sebelum pengguna sempat mengisi dapat mengganggu, sementara baru memberi tahu setelah semua data dihapus sangat merugikan. Pilih pemicu yang sesuai konteks dan jelaskan format sebelum pengguna menebak-nebak.'],
        example: 'Aturan nama pengguna: 3–20 karakter, hanya huruf, angka, dan garis bawah.\nMasukan: "an".\nData lain pada formulir sudah valid.',
        task: ['Respons antarmuka mana paling membantu pemulihan?'], options: ['Tampilkan "Error 400" lalu kosongkan seluruh formulir', 'Tutup formulir tanpa penjelasan', 'Tampilkan "Nama pengguna minimal 3 karakter" di dekat kolom dan pertahankan data lain', 'Ubah semua kolom menjadi merah tanpa pesan'], answer: 2,
        hints: ['Masalah spesifik pada contoh adalah panjang yang kurang.', 'Pengguna tidak perlu mengulang data yang tidak bermasalah.'],
        explanation: 'Pesan spesifik menunjukkan tindakan perbaikan sambil menjaga pekerjaan yang sudah selesai. Kode kesalahan teknis saja tidak menjelaskan apa yang perlu dilakukan pengguna.', xp: 15
      },
      {
        id: 'ui-ux-design-06', title: 'Uji Kegunaan Mengamati Tugas', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Uji kegunaan mengamati peserta mencoba tugas yang realistis. Moderator memberi tujuan tanpa membocorkan langkah yang sedang diuji. Keberhasilan, kesalahan, kebingungan, dan komentar peserta bersama-sama memberi petunjuk untuk perbaikan.', 'Sampel kecil dapat menemukan masalah penting, tetapi tidak membenarkan klaim statistik tentang semua pengguna. Pisahkan observasi dari interpretasi, dan catat apakah peserta berhasil mandiri atau hanya setelah dibantu moderator. Bantuan dapat menyembunyikan masalah navigasi.'],
        example: 'Tujuan uji: melihat apakah peserta menemukan latihan Python pemula.\nModerator hendak membacakan satu instruksi awal.',
        task: ['Instruksi mana paling menjaga validitas pengamatan?'], options: ['Klik menu kiri, pilih Python, lalu pilih Pemula', 'Tombol yang benar berwarna biru; gunakan itu', 'Kalau bingung, saya akan langsung menunjukkan semua langkah', 'Temukan satu latihan Python untuk orang yang baru mulai belajar'], answer: 3,
        hints: ['Sebutkan hasil yang ingin dicapai, bukan rute yang harus diikuti.', 'Jika langkah dibocorkan, kesulitan menemukan navigasi tidak lagi dapat diamati.'],
        explanation: 'Instruksi terakhir menyatakan tujuan tanpa memberikan solusi. Mengarahkan klik sejak awal mengubah uji penemuan alur menjadi sekadar mengikuti petunjuk.', xp: 15
      }
    ]
  },
  {
    id: 'cpp', title: 'C++', category: 'Computer Science', level: 'Pemula', theme: 'blue', symbol: 'C++',
    description: 'Kuis konsep C++ tentang tipe, masukan, referensi, vector, umur sumber daya, dan tahapan build. Contoh tidak memakai kompiler dalam aplikasi.',
    chapters: [
      { title: 'Nilai dan Hubungan Objek', description: 'Membedakan pembagian integer, kegagalan input, serta salinan dan referensi.' },
      { title: 'Koleksi dan Umur Program', description: 'Menalar vector, RAII, serta perbedaan kompilasi dan linking.' }
    ],
    lessons: [
      {
        id: 'cpp-01', title: 'Tipe Operand Menentukan Pembagian', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Dalam C++, pembagian dua operand integer menghasilkan pembagian integer dengan bagian pecahan dibuang menuju nol. Tipe variabel tujuan tidak mengubah operasi yang sudah terjadi di sebelah kanan penugasan.', 'Jika hasil pecahan diperlukan, setidaknya satu operand harus berupa tipe floating-point sebelum pembagian dilakukan. Konversi setelah pembagian hanya mengubah representasi hasil integer yang telah kehilangan pecahannya.'],
        example: 'double a = 5 / 2;\ndouble b = 5.0 / 2;',
        task: ['Apa nilai a dan b?'], options: ['a = 2.0 dan b = 2.5', 'a = 2.5 dan b = 2.5', 'a = 2.0 dan b = 2.0', 'a = 3.0 dan b = 2.5'], answer: 0,
        hints: ['Operand pada ekspresi pertama sama-sama integer.', 'Literal 5.0 membuat ekspresi kedua menggunakan pembagian floating-point.'],
        explanation: '5/2 menghasilkan integer 2 lalu dikonversi menjadi 2.0. Pada ekspresi kedua, pembagian floating-point mempertahankan pecahan 0.5.', xp: 15
      },
      {
        id: 'cpp-02', title: 'Masukan Dapat Gagal Diparsing', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Operator ekstraksi >> mencoba membaca nilai sesuai tipe tujuan. Masukan yang tidak cocok dapat menempatkan stream dalam keadaan gagal. Program perlu memeriksa keadaan stream sebelum mengandalkan hasil pembacaan.', 'Pemeriksaan if (std::cin >> nilai) menggabungkan usaha membaca dengan pengujian keberhasilan. Validasi domain tetap terpisah: angka negatif mungkin berhasil diparsing sebagai int tetapi tidak sah untuk jumlah barang.'],
        example: '#include <iostream>\nint main() {\n    int jumlah{};\n    if (std::cin >> jumlah) {\n        std::cout << "terbaca";\n    } else {\n        std::cout << "format salah";\n    }\n}\n// Pengguna memasukkan: abc',
        task: ['Cabang mana yang dijalankan untuk masukan abc?'], options: ['Cabang terbaca karena jumlah sudah diinisialisasi nol', 'Cabang format salah karena ekstraksi integer gagal', 'Cabang terbaca karena stream menerima karakter sebelum memeriksa tipenya', 'Tidak ada cabang karena stream otomatis melempar exception pada setiap kegagalan format'], answer: 1,
        hints: ['Huruf abc tidak mewakili integer yang dapat dibaca operator tersebut.', 'Kondisi if menguji keadaan hasil operasi stream.'],
        explanation: 'Ekstraksi gagal sehingga cabang else dijalankan. Masukan yang gagal tidak boleh dianggap sudah menjadi angka valid hanya karena variabel tujuannya bertipe int.', xp: 15
      },
      {
        id: 'cpp-03', title: 'Referensi Menunjuk Objek yang Sama', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Parameter yang diterima by value adalah salinan nilai argumen. Parameter referensi seperti int& merujuk objek pemanggil, sehingga perubahan melalui referensi dapat terlihat di luar fungsi. Referensi bukan objek integer kedua yang mandiri.', 'Gunakan const reference ketika ingin menghindari salinan objek besar tetapi tidak perlu mengubahnya. Pilihan bentuk parameter menyatakan kontrak mutasi kepada pembaca, bukan hanya pilihan optimasi.'],
        example: 'void naik(int& n) { n += 1; }\nint skor = 4;\nnaik(skor);',
        task: ['Berapa skor setelah naik dipanggil?'], options: ['4 karena parameter selalu disalin', '0 karena referensi mengosongkan sumber', '5 karena n merujuk skor', 'Terjadi kesalahan karena int tidak bisa menjadi argumen'], answer: 2,
        hints: ['Tanda & berada pada deklarasi parameter n.', 'Penambahan dilakukan pada objek yang dirujuk, bukan salinan terpisah.'],
        explanation: 'skor menjadi 5 karena parameter int& mengacu pada skor milik pemanggil. Tanpa &, perubahan pada parameter by value tidak akan mengubah skor.', xp: 15
      },
      {
        id: 'cpp-04', title: 'Ukuran Vector Berbeda dari Kapasitas', chapter: 1, type: 'quiz', language: 'text',
        intro: ['std::vector menyimpan urutan elemen dengan ukuran yang dapat berubah. size menunjukkan jumlah elemen yang benar-benar ada, sedangkan capacity menunjukkan ruang penyimpanan yang tersedia sebelum alokasi ulang diperlukan.', 'reserve meminta kapasitas minimum tanpa membuat elemen baru. resize mengubah jumlah elemen. Mengakses indeks di luar size tetap tidak sah meskipun kapasitas cukup; kapasitas bukan izin untuk memakai elemen yang belum dibentuk.'],
        example: '#include <vector>\nstd::vector<int> nilai;\nnilai.reserve(10);\nnilai.push_back(7);',
        task: ['Berapa nilai.size() setelah tiga baris operasi tersebut?'], options: ['10', '11', '0', '1'], answer: 3,
        hints: ['reserve menyiapkan ruang, bukan menambahkan sepuluh angka.', 'Hanya ada satu push_back yang membuat satu elemen.'],
        explanation: 'size adalah 1, sementara capacity setidaknya 10. Menyamakan ukuran dan kapasitas dapat menyebabkan akses di luar elemen vector yang valid.', xp: 15
      },
      {
        id: 'cpp-05', title: 'RAII Mengikat Sumber Daya ke Umur Objek', chapter: 1, type: 'quiz', language: 'text',
        intro: ['RAII mengikat kepemilikan sumber daya ke objek yang umurnya terkelola. Konstruktor menyiapkan objek, dan destructor melakukan pembersihan ketika objek berakhir. Pola ini dipakai oleh berkas, lock, dan smart pointer.', 'std::unique_ptr menyatakan kepemilikan tunggal terhadap objek dinamis. Ketika unique_ptr keluar dari scope, objek yang dimilikinya dihancurkan secara otomatis. Pemindahan kepemilikan berbeda dari menyalin pemilik sehingga dua pihak sama-sama mencoba membebaskan objek.'],
        example: '#include <memory>\nvoid contoh() {\n    auto nilai = std::make_unique<int>(42);\n}\n// contoh() selesai secara normal.',
        task: ['Apa yang terjadi pada integer yang dimiliki nilai ketika fungsi selesai?'], options: ['Dibebaskan melalui destructor unique_ptr', 'Selalu bocor karena tidak ada delete manual', 'Disalin otomatis ke semua pemanggil', 'Tetap hidup selamanya sebagai variabel global'], answer: 0,
        hints: ['nilai adalah objek lokal dengan kepemilikan terhadap integer.', 'unique_ptr menyediakan pembersihan ketika pemiliknya dihancurkan.'],
        explanation: 'Destructor unique_ptr membebaskan objek yang dimilikinya. Menambahkan delete manual pada objek yang masih dimiliki dapat justru menyebabkan pembebasan ganda.', xp: 15
      },
      {
        id: 'cpp-06', title: 'Deklarasi Belum Menyediakan Definisi', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Kompilasi menerjemahkan unit sumber dan memeriksa banyak aturan bahasa. Linking menghubungkan definisi fungsi serta data yang dibutuhkan dari berbagai unit objek atau pustaka. Kesalahan pada dua tahap ini memiliki penyebab berbeda.', 'Deklarasi fungsi memberi tahu nama, tipe hasil, dan parameter kepada kompiler, tetapi tidak menyediakan implementasinya. Jika fungsi dipanggil dan tidak ada definisi yang disertakan saat linking, executable lengkap tidak dapat dibentuk.'],
        example: 'int hitung(int);\nint main() {\n    return hitung(3);\n}\n// Tidak ada definisi hitung pada berkas atau pustaka yang ditautkan.',
        task: ['Masalah apa yang diharapkan pada proses build biasa?'], options: ['Executable terbentuk dan hitung memakai implementasi kosong bawaan', 'Linking gagal karena definisi hitung tidak ditemukan', 'Kompilasi selalu menolak deklarasi fungsi tanpa badan pada baris yang sama', 'Build selesai, tetapi exception baru muncul saat hitung dipanggil'], answer: 1,
        hints: ['Tanda titik koma setelah deklarasi bukan badan fungsi.', 'Pemanggilan membutuhkan implementasi nyata pada hasil akhir build.'],
        explanation: 'Deklarasi cukup untuk memeriksa bentuk pemanggilan, tetapi linker tetap membutuhkan definisi. Jangan menyamakan signature yang diketahui dengan implementasi yang tersedia.', xp: 15
      }
    ]
  },
  {
    id: 'c-sharp', title: 'C#', category: 'Computer Science', level: 'Pemula', theme: 'purple', symbol: 'C#',
    description: 'Kuis konsep C# modern tentang tipe nilai, null, properti, kontrak interface, LINQ, dan Task. Contoh merupakan bahan analisis, bukan kompiler daring.',
    chapters: [
      { title: 'Data dan Objek', description: 'Membaca operasi bertipe, nilai opsional, dan aturan keadaan objek.' },
      { title: 'Abstraksi dan Pekerjaan Tertunda', description: 'Memahami interface, evaluasi LINQ, serta alur async dan await.' }
    ],
    lessons: [
      {
        id: 'c-sharp-01', title: 'var Tetap Bertipe Statis', chapter: 0, type: 'quiz', language: 'text',
        intro: ['var meminta kompiler menyimpulkan tipe variabel lokal dari ekspresi awal. Ia tidak membuat variabel bebas berubah tipe seperti wadah dinamis. Setelah tipe disimpulkan, aturan tipe yang sama tetap berlaku untuk operasi berikutnya.', 'Tipe operand menentukan operasi aritmetika. Dua integer menghasilkan pembagian integer, sementara literal seperti 2.0 bertipe double. var akan menyimpan tipe hasil ekspresi tersebut, bukan mengubah cara ekspresi dihitung.'],
        example: 'var hasil = 5 / 2;\nvar pecahan = 5 / 2.0;',
        task: ['Pernyataan mana yang benar tentang kedua variabel?'], options: ['Keduanya dynamic dengan nilai 2.5', 'hasil bertipe double dengan nilai 2.5', 'hasil bertipe int bernilai 2; pecahan bertipe double bernilai 2.5', 'var membuat kedua deklarasi tidak valid'], answer: 2,
        hints: ['Pada ekspresi pertama, kedua operand adalah int.', 'Literal 2.0 membuat ekspresi kedua menggunakan operasi double.'],
        explanation: 'Inferensi menghasilkan int untuk hasil dan double untuk pecahan. var menyimpulkan tipe statis; ia tidak memulihkan pecahan yang hilang dari pembagian integer.', xp: 15
      },
      {
        id: 'c-sharp-02', title: 'Nullable Menyatakan Nilai yang Bisa Tidak Ada', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Tipe nilai seperti int biasanya selalu memiliki nilai. Bentuk nullable int? menambahkan kemungkinan null untuk mewakili ketiadaan. Ini berguna ketika nol memiliki arti nyata dan tidak boleh disamakan dengan data yang belum tersedia.', 'Operator ?? memilih nilai cadangan hanya ketika operand kiri null. Ia tidak menganggap nol atau angka negatif sebagai ketiadaan. Pilih cadangan berdasarkan kebutuhan domain agar informasi yang tidak tersedia tidak tersembunyi tanpa sengaja.'],
        example: 'int? stok = null;\nint tampil = stok ?? 0;\nstok = 7;\nint berikutnya = stok ?? 0;',
        task: ['Apa pasangan nilai tampil dan berikutnya?'], options: ['null dan 7', '0 dan 0', '7 dan 7', '0 dan 7'], answer: 3,
        hints: ['Penugasan tampil terjadi sebelum stok berubah.', '?? memakai operand kanan hanya ketika nilai kiri null.'],
        explanation: 'tampil menerima cadangan 0, sedangkan berikutnya menerima 7. Mengubah stok kemudian tidak mengubah nilai int yang sudah disimpan dalam tampil.', xp: 15
      },
      {
        id: 'c-sharp-03', title: 'Properti Membatasi Perubahan Keadaan', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Properti menyediakan antarmuka untuk membaca atau menulis keadaan objek. Akses setter dapat dibatasi, misalnya private set, agar kode luar membaca nilai tetapi tidak menetapkannya sembarangan. Metode publik kemudian menjaga aturan perubahan.', 'Enkapsulasi berguna ketika objek memiliki invariant, yaitu kondisi yang harus selalu benar. Untuk dompet, saldo tidak boleh berkurang karena setoran negatif. Menyimpan validasi di satu jalur perubahan membuat kontrak lebih mudah dipertahankan.'],
        example: 'public class Dompet\n{\n    public decimal Saldo { get; private set; }\n    public void Setor(decimal jumlah)\n    {\n        if (jumlah <= 0) throw new System.ArgumentOutOfRangeException(nameof(jumlah));\n        Saldo += jumlah;\n    }\n}',
        task: ['Mengapa Saldo menggunakan private set pada rancangan ini?'], options: ['Agar kode luar tidak melewati validasi dengan menetapkan saldo langsung', 'Agar Saldo tidak bisa dibaca dari luar kelas', 'Agar hanya konstruktor yang boleh mengubah Saldo setelah objek dibuat', 'Agar setiap objek Dompet berbagi saldo yang sama'], answer: 0,
        hints: ['Getter tetap public melalui deklarasi properti.', 'Setter dibatasi, sedangkan metode Setor menyediakan jalur perubahan yang diperiksa.'],
        explanation: 'private set mencegah penetapan langsung dari pemanggil luar sehingga aturan dapat dijaga melalui metode kelas. Ini tidak membuat properti statis atau menutup akses bacanya.', xp: 15
      },
      {
        id: 'c-sharp-04', title: 'Interface Menetapkan Kemampuan', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Interface mendefinisikan kontrak kemampuan yang dapat disediakan beberapa tipe. Kode yang menerima interface dapat bekerja dengan berbagai implementasi tanpa mengetahui detail penyimpanannya. Ini mengurangi ketergantungan pada satu kelas konkret.', 'Implementasi harus memenuhi anggota yang diwajibkan kontrak. Interface tidak berarti semua kelas pelaksana berbagi keadaan atau algoritma yang sama. Pengujian juga dapat memakai implementasi sederhana untuk menggantikan sistem eksternal.'],
        example: 'public interface IPenyimpan\n{\n    void Simpan(string teks);\n}\npublic class PenyimpanMemori : IPenyimpan\n{\n    public string Terakhir { get; private set; } = "";\n    public void Simpan(string teks) { Terakhir = teks; }\n}',
        task: ['Apa yang dijamin oleh kontrak IPenyimpan pada contoh?'], options: ['Setiap implementasi harus memakai media penyimpanan yang sama', 'Implementasi menyediakan operasi Simpan yang menerima string', 'Setiap implementasi memiliki properti publik Terakhir', 'Operasi Simpan mengembalikan string yang baru disimpan'], answer: 1,
        hints: ['Lihat anggota yang dideklarasikan di dalam interface.', 'Penyimpanan memori hanyalah satu pilihan implementasi.'],
        explanation: 'Kontrak menjamin tersedianya Simpan(string), bukan lokasi atau teknologi penyimpanan. Mengikat pemanggil pada kontrak memungkinkan implementasi diganti dengan lebih mudah.', xp: 15
      },
      {
        id: 'c-sharp-05', title: 'LINQ Dapat Dievaluasi Belakangan', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Banyak operator LINQ pada IEnumerable, termasuk Where, memakai deferred execution. Membuat query belum tentu menelusuri sumber saat itu juga. Nilai biasanya dihasilkan ketika query dienumerasi, misalnya oleh foreach atau ToList().', 'Jika sumber berubah sebelum enumerasi, hasil query dapat mencerminkan keadaan baru. Gunakan materialisasi seperti ToList ketika perlu snapshot pada saat tertentu. Memahami waktunya membantu menghindari pembacaan ulang sumber yang mahal atau hasil yang mengejutkan.'],
        example: 'using System.Collections.Generic;\nusing System.Linq;\nvar angka = new List<int> { 1, 2, 3 };\nvar genap = angka.Where(n => n % 2 == 0);\nangka.Add(4);\nvar hasil = genap.ToList();',
        task: ['Apa isi hasil ketika query dienumerasi?'], options: ['Hanya 2 karena query sudah dibekukan', '1, 2, 3, 4 karena Where tidak menyaring', '2 dan 4', 'Daftar kosong karena sumber pernah berubah'], answer: 2,
        hints: ['Where menyimpan aturan penyaringan dan sumber, bukan langsung membuat daftar hasil.', 'ToList dipanggil setelah angka 4 ditambahkan.'],
        explanation: 'Hasil memuat 2 dan 4 karena enumerasi terjadi setelah perubahan sumber. ToList sebelum Add akan menghasilkan snapshot yang berbeda.', xp: 15
      },
      {
        id: 'c-sharp-06', title: 'Task dan await Menyampaikan Hasil', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Metode async yang menghasilkan nilai umumnya mengembalikan Task<T>. await melanjutkan metode setelah tugas selesai dan menghasilkan nilai T, atau meneruskan exception jika tugas gagal. Task mewakili penyelesaian pekerjaan, bukan otomatis thread khusus.', 'Hindari menganggap penundaan asinkron sama dengan memblokir thread menggunakan tidur sinkron. Untuk menangani kegagalan yang diharapkan, letakkan await di dalam try/catch yang sesuai. Nama async tidak membuat pekerjaan CPU berat otomatis berjalan di latar belakang.'],
        example: 'using System.Threading.Tasks;\nstatic async Task<int> AmbilNilaiAsync()\n{\n    await Task.Delay(10);\n    return 7;\n}\n// Di dalam metode async lain:\n// int nilai = await AmbilNilaiAsync();',
        task: ['Apa yang diterima variabel nilai setelah await selesai dengan sukses?'], options: ['Objek thread baru', 'Task<int> yang belum selesai', 'Angka 10 dari durasi penundaan', 'Angka 7 dari hasil metode'], answer: 3,
        hints: ['Tipe Task<int> menyatakan bahwa hasil suksesnya adalah int.', 'Task.Delay mengatur penundaan, sedangkan return menentukan hasil metode.'],
        explanation: 'await mengambil hasil int bernilai 7. Tanpa await, pemanggilan metode memberikan Task<int>, bukan langsung nilai akhirnya.', xp: 15
      }
    ]
  },
  {
    id: 'java', title: 'Java', category: 'Computer Science', level: 'Pemula', theme: 'orange', symbol: 'Java',
    description: 'Kuis konsep Java dasar tentang tipe, perulangan, string, objek, koleksi, dan sumber daya. Seluruh contoh untuk pembacaan konsep secara lokal.',
    chapters: [
      { title: 'Nilai dan Alur', description: 'Memahami tipe aritmetika, batas array, dan kesetaraan isi teks.' },
      { title: 'Objek dan Koleksi', description: 'Menjaga keadaan kelas, memakai generic collection, dan menutup sumber daya.' }
    ],
    lessons: [
      {
        id: 'java-01', title: 'Pelebaran Tipe Tidak Mengembalikan Pecahan', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Java memiliki tipe primitif seperti int dan double dengan aturan operasi yang ditetapkan saat kompilasi. Ekspresi yang membagi dua int melakukan pembagian integer. Menyimpan hasilnya ke double baru terjadi setelah pembagian tersebut.', 'Untuk rata-rata yang membutuhkan pecahan, ubah salah satu operand sebelum membagi. Cast pada keseluruhan hasil setelah pembagian terlambat untuk mempertahankan pecahan. Posisi konversi dalam ekspresi menentukan informasi yang masih tersedia.'],
        example: 'int jumlah = 7;\nint banyak = 2;\ndouble rata = (double) jumlah / banyak;',
        task: ['Berapa nilai rata?'], options: ['3.5', '3.0', '4.0', '2.0'], answer: 0,
        hints: ['Cast diterapkan pada jumlah sebelum operasi pembagian.', 'Satu operand double membuat pembagian dilakukan sebagai floating-point.'],
        explanation: 'rata bernilai 3.5 karena konversi terjadi sebelum pembagian. Bentuk (double) (jumlah / banyak) akan terlebih dahulu menghasilkan integer 3.', xp: 15
      },
      {
        id: 'java-02', title: 'Indeks Array Berakhir Sebelum length', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Array Java memiliki panjang tetap dan indeks dimulai dari nol. Untuk array dengan length tiga, indeks validnya 0, 1, dan 2. Mengakses indeks sama dengan length melewati elemen terakhir dan memicu exception.', 'Perulangan yang menelusuri seluruh array biasanya memakai kondisi i < data.length. Variabel akumulator perlu diinisialisasi sebelum loop agar hasil tiap iterasi dapat dikumpulkan. Penelusuran manual beberapa langkah membantu menemukan kesalahan batas.'],
        example: 'int[] angka = {2, 4, 6};\nint total = 0;\nfor (int i = 0; i < angka.length; i++) {\n    total += angka[i];\n}',
        task: ['Apa nilai total setelah loop selesai?'], options: ['6', '12', '10', 'Terjadi exception karena i dimulai dari nol'], answer: 1,
        hints: ['Loop mengunjungi indeks 0, 1, dan 2.', 'Kondisi < mencegah akses indeks 3.'],
        explanation: 'Totalnya 2 + 4 + 6 = 12. Indeks nol justru merupakan awal yang benar; mengganti < menjadi <= akan menimbulkan akses di luar batas.', xp: 15
      },
      {
        id: 'java-03', title: 'Isi String Berbeda dari Identitas Objek', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Untuk referensi objek Java, operator == memeriksa apakah kedua referensi menunjuk objek yang sama. String menyediakan equals untuk membandingkan isi karakter. Dua objek String terpisah dapat memiliki isi yang sama.', 'String literal dapat memakai mekanisme interning, sehingga beberapa contoh == tampak berhasil secara kebetulan terhadap isi. Jangan mengandalkan kebetulan identitas itu untuk aturan bisnis. Jika salah satu referensi mungkin null, gunakan pola perbandingan yang aman terhadap null.'],
        example: 'String a = new String("belajar");\nString b = new String("belajar");\nboolean samaIsi = a.equals(b);\nboolean samaObjek = a == b;',
        task: ['Apa nilai samaIsi dan samaObjek?'], options: ['false dan false', 'true dan true', 'true dan false', 'false dan true'], answer: 2,
        hints: ['Kedua pemanggilan new membentuk objek berbeda.', 'equals pada String membandingkan urutan karakter.'],
        explanation: 'Isinya sama tetapi identitas objek berbeda. Menggunakan == untuk kesetaraan teks dapat menghasilkan bug yang muncul hanya pada cara pembentukan string tertentu.', xp: 15
      },
      {
        id: 'java-04', title: 'Konstruktor Menyiapkan Keadaan Sah', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Konstruktor dipanggil saat instance dibuat dan dapat memastikan objek dimulai dalam keadaan yang sah. Field private membatasi akses langsung dari luar kelas, sementara metode publik menyediakan operasi yang memang diizinkan.', 'this merujuk instance saat ini dan membantu membedakan field dari parameter bernama sama. Validasi dalam konstruktor mencegah objek tidak valid tersebar ke bagian program lain yang menganggap aturan awal sudah dipenuhi.'],
        example: 'class Produk {\n    private final int harga;\n    Produk(int harga) {\n        if (harga < 0) throw new IllegalArgumentException("Harga negatif");\n        this.harga = harga;\n    }\n    int getHarga() { return harga; }\n}',
        task: ['Apa yang terjadi saat kode mencoba new Produk(-5)?'], options: ['Objek dibuat dengan harga nol secara otomatis', 'Objek dibuat, lalu exception baru muncul ketika getHarga dipanggil', 'Konstruktor mengembalikan null sebagai tanda kegagalan tanpa exception', 'Konstruktor melempar IllegalArgumentException dan pembuatan tidak selesai normal'], answer: 3,
        hints: ['Periksa kondisi sebelum this.harga mendapat nilai.', 'final membatasi penugasan field, sedangkan validasi dilakukan oleh kondisi if.'],
        explanation: 'Nilai negatif memicu exception sebelum konstruktor selesai. Validasi tidak mengoreksi harga atau menunggu getter dipanggil; ekspresi new tidak selesai normal.', xp: 15
      },
      {
        id: 'java-05', title: 'List Bertipe Menjaga Kontrak Elemen', chapter: 1, type: 'quiz', language: 'text',
        intro: ['List menyatakan koleksi berurutan yang dapat memiliki ukuran berubah, dan ArrayList merupakan salah satu implementasinya. Generic seperti List<String> memberi kompiler informasi tentang tipe elemen yang boleh dimasukkan dan diambil.', 'Keamanan tipe membantu menemukan kesalahan sebelum program berjalan. Berbeda dari array, penambahan pada ArrayList tidak dibatasi panjang awal yang tetap. Namun indeks tetap dimulai dari nol dan hanya posisi elemen yang benar-benar ada yang dapat diakses.'],
        example: 'import java.util.ArrayList;\nimport java.util.List;\nList<String> nama = new ArrayList<>();\nnama.add("Ayu");\nnama.add("Bima");\nString kedua = nama.get(1);',
        task: ['Apa nilai kedua?'], options: ['"Bima"', '"Ayu"', '"1"', 'Terjadi kesalahan kompilasi karena get dianggap menghasilkan Object, bukan String'], answer: 0,
        hints: ['add menambahkan elemen ke akhir daftar.', 'Indeks 1 menunjuk elemen kedua, bukan elemen pertama.'],
        explanation: 'Elemen pada indeks 1 adalah Bima. Parameter generic menjaga tipe String, sementara indeks tetap mengikuti aturan urutan berbasis nol.', xp: 15
      },
      {
        id: 'java-06', title: 'try-with-resources Menutup Berkas', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Sumber daya seperti pembaca berkas perlu ditutup setelah digunakan. try-with-resources menerima objek yang mendukung AutoCloseable dan menutupnya saat blok berakhir, termasuk ketika ada exception di dalam blok.', 'Pengelolaan penutupan berbeda dari keputusan menangani exception. Contoh metode dapat mendeklarasikan throws IOException agar kegagalan diteruskan kepada pemanggil. Pemanggil kemudian menentukan apakah perlu mencoba ulang, menampilkan pesan, atau membatalkan operasi.'],
        example: 'import java.io.BufferedReader;\nimport java.io.IOException;\nimport java.nio.file.Files;\nimport java.nio.file.Path;\nclass Pembaca {\n    static String barisPertama(Path path) throws IOException {\n        try (BufferedReader reader = Files.newBufferedReader(path)) {\n            return reader.readLine();\n        }\n    }\n}',
        task: ['Jika reader berhasil dibuat tetapi readLine gagal, bagaimana sumber dayanya ditangani?'], options: ['Reader tetap terbuka karena hanya return yang dapat menutupnya', 'Penutupan reader tetap diupayakan oleh try-with-resources, lalu kegagalan diteruskan', 'Reader ditutup hanya jika pemanggil menambahkan blok finally sendiri', 'throws IOException menelan exception sehingga reader dapat terus dipakai'], answer: 1,
        hints: ['Aturan penutupan berlaku juga saat keluar blok karena exception.', 'throws menyatakan kemungkinan penerusan exception, bukan penanganannya.'],
        explanation: 'try-with-resources tetap menjalankan close pada jalur gagal. Deklarasi throws tidak menelan exception; pemanggil tetap menerima kegagalan sesuai aturan exception Java.', xp: 15
      }
    ]
  },
  {
    id: 'intermediate-java', title: 'Intermediate Java', category: 'Computer Science', level: 'Menengah', theme: 'orange', symbol: 'J+',
    description: 'Kuis konsep Java menengah: generic, stream, kontrak hash, Optional, konkurensi, dan tes berbasis perilaku.',
    chapters: [
      { title: 'Abstraksi Data', description: 'Menggunakan batas tipe, transformasi deklaratif, dan kesetaraan yang konsisten.' },
      { title: 'Keandalan Program', description: 'Menyatakan ketiadaan, melindungi pembaruan bersama, dan memeriksa kontrak lewat tes.' }
    ],
    lessons: [
      {
        id: 'intermediate-java-01', title: 'Wildcard untuk Membaca Keluarga Tipe', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Generic Java bersifat invariant: List<Integer> bukan subtype List<Number>. Wildcard ? extends Number menyatakan daftar dari suatu tipe tertentu yang merupakan Number atau turunannya, sehingga elemen aman dibaca sebagai Number.', 'Tipe elemen sebenarnya tetap tidak diketahui oleh metode penerima. Karena daftar itu bisa berupa List<Double>, menambahkan Integer bukan operasi aman. Prinsip producer extends membantu memilih batas untuk sumber data yang dibaca.'],
        example: 'static double jumlah(java.util.List<? extends Number> angka) {\n    double total = 0;\n    for (Number n : angka) total += n.doubleValue();\n    return total;\n}',
        task: ['Operasi mana aman secara tipe pada parameter angka tersebut?'], options: ['Menambahkan sembarang Integer dengan angka.add(1)', 'Menambahkan sembarang Double dengan angka.add(1.5)', 'Membaca setiap elemen sebagai Number', 'Menganggap parameter selalu List<Integer>'], answer: 2,
        hints: ['Batas extends menjamin tipe atas untuk pembacaan.', 'Tipe elemen tepatnya bisa Integer, Double, atau turunan Number lain.'],
        explanation: 'Semua elemen dapat dibaca sebagai Number. Penambahan angka konkret tidak aman karena metode tidak mengetahui subtype yang sebenarnya dimiliki daftar.', xp: 15
      },
      {
        id: 'intermediate-java-02', title: 'Pipeline Stream Berakhir pada Operasi Terminal', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Stream menyatakan pipeline pemrosesan elemen. Operasi antara seperti filter dan map umumnya bersifat lazy, sedangkan operasi terminal seperti sum memicu konsumsi pipeline. Stream bukan koleksi penyimpanan baru yang bebas dipakai berulang.', 'Susunan operasi menentukan makna hasil. filter memilih elemen berdasarkan nilai saat itu, map mengubahnya, dan reduksi menggabungkan keluaran. Hindari efek samping tersembunyi agar perilaku pipeline mudah dipahami dan diuji.'],
        example: 'int hasil = java.util.List.of(1, 2, 3, 4).stream()\n    .filter(n -> n % 2 == 0)\n    .mapToInt(n -> n * 3)\n    .sum();',
        task: ['Berapa jumlah setelah pipeline menyaring angka genap dan mengalikannya dengan tiga?'], options: ['10', '30', '6', '18'], answer: 3,
        hints: ['Filter mempertahankan 2 dan 4.', 'Keduanya dikalikan tiga sebelum dijumlahkan.'],
        explanation: 'Hasilnya 6 + 12 = 18. sum mengonsumsi nilai setelah filter dan transformasi, bukan menjumlahkan daftar awal secara langsung.', xp: 15
      },
      {
        id: 'intermediate-java-03', title: 'equals dan hashCode Harus Sepakat', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Koleksi berbasis hash menggunakan hashCode untuk memilih area pencarian dan equals untuk memeriksa kesetaraan. Dua objek yang dianggap sama oleh equals wajib memiliki hashCode yang sama. Kebalikannya tidak wajib: tabrakan hash tetap mungkin terjadi.', 'Jika field yang menentukan hash berubah setelah objek menjadi kunci HashMap, pencarian dapat gagal menemukan posisi yang diharapkan. Kunci immutable mempermudah menjaga kontrak ini. Override equals tanpa hashCode yang konsisten merupakan kesalahan desain umum.'],
        example: 'Dua objek Akun berbeda memiliki id yang sama.\nequals menganggap keduanya setara berdasarkan id.\nKelas akan digunakan sebagai kunci HashMap.',
        task: ['Syarat mana yang wajib dipenuhi hashCode untuk kedua objek setara tersebut?'], options: ['Keduanya harus menghasilkan hashCode yang sama', 'Keduanya harus menghasilkan hashCode berbeda', 'HashMap tidak pernah memakai hashCode jika equals tersedia', 'hashCode harus berupa angka acak setiap pemanggilan'], answer: 0,
        hints: ['Kesetaraan harus membawa objek ke area pencarian hash yang konsisten.', 'Tabrakan boleh terjadi untuk objek berbeda, tetapi objek setara tidak boleh memiliki hash berbeda.'],
        explanation: 'Objek yang setara harus memiliki hashCode sama. Hash berbeda dapat membuat koleksi mencari di lokasi yang tidak sesuai sebelum sempat membandingkan equals.', xp: 15
      },
      {
        id: 'intermediate-java-04', title: 'Optional Memodelkan Hasil yang Tidak Ditemukan', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Optional<T> mewakili hasil yang mungkin berisi satu nilai atau kosong. Ia dapat memperjelas kontrak metode pencarian sehingga pemanggil harus mempertimbangkan ketiadaan. Memanggil get tanpa memeriksa keadaan hanya memindahkan potensi kegagalan.', 'map mengubah nilai jika tersedia dan tetap menghasilkan Optional kosong jika tidak. orElse menyediakan nilai cadangan, sedangkan orElseGet menerima pemasok yang baru dipanggil ketika diperlukan. Pilih bentuk sesuai biaya pembuatan cadangan.'],
        example: 'java.util.Optional<String> nama = java.util.Optional.empty();\nint panjang = nama.map(String::length).orElse(0);',
        task: ['Apa nilai panjang?'], options: ['null', '0', '-1', 'Terjadi exception karena map wajib memiliki nilai'], answer: 1,
        hints: ['map pada Optional kosong tidak memanggil fungsi transformasinya.', 'orElse dipakai ketika hasil Optional masih kosong.'],
        explanation: 'panjang menjadi 0 dari cadangan. Optional kosong dapat diproses melalui map tanpa exception; get tanpa nilai justru akan gagal.', xp: 15
      },
      {
        id: 'intermediate-java-05', title: 'Increment Bersama Membutuhkan Atomisitas', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Operasi count++ pada int melibatkan pembacaan, penambahan, dan penulisan. Dua thread dapat membaca nilai lama yang sama lalu menulis hasil sama, sehingga satu pembaruan hilang. volatile membantu visibilitas, tetapi tidak menjadikan rangkaian increment otomatis atomik.', 'AtomicInteger menyediakan operasi seperti incrementAndGet yang atomik untuk satu nilai. Untuk invariant yang melibatkan beberapa field atau langkah, penguncian atau rancangan konkurensi lain mungkin masih dibutuhkan. Pilih alat berdasarkan keseluruhan aturan yang harus dijaga.'],
        example: 'java.util.concurrent.atomic.AtomicInteger hitung =\n    new java.util.concurrent.atomic.AtomicInteger(0);\n// Dua thread masing-masing memanggil hitung.incrementAndGet() sekali.\n// Keduanya telah selesai dan tidak ada operasi lain.',
        task: ['Berapa hitung.get() setelah kedua thread selesai?'], options: ['0', '1', '2', '3'], answer: 2,
        hints: ['Setiap incrementAndGet menaikkan nilai sebagai operasi atomik.', 'Pembacaan get tidak menambah nilai.'],
        explanation: 'Hasilnya 2 karena kedua kenaikan tercatat. Mengganti AtomicInteger dengan volatile int dan count++ tidak memberi jaminan atomisitas yang sama.', xp: 15
      },
      {
        id: 'intermediate-java-06', title: 'Tes Memeriksa Kontrak, Bukan Detail Internal', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Unit test menilai perilaku unit kecil melalui masukan dan hasil yang dapat diamati. Pola arrange, act, assert memisahkan persiapan, pemanggilan, dan pemeriksaan. Tes yang terlalu bergantung pada detail private mudah rusak saat refactoring yang sebenarnya tidak mengubah perilaku.', 'Kasus batas dan jalur kegagalan perlu diambil dari kontrak. Jika operasi dilarang mengubah saldo ketika penarikan gagal, tes harus memeriksa exception sekaligus saldo setelah kegagalan. Menilai pesan sukses saja tidak cukup untuk menjaga invariant.'],
        example: 'Kontrak Rekening.tarik: menolak jumlah melebihi saldo dengan IllegalArgumentException dan tidak mengubah saldo.\nKeadaan awal: saldo 50.\nTindakan: tarik 70.',
        task: ['Pemeriksaan tes mana paling lengkap untuk kontrak tersebut?'], options: ['Hanya memastikan exception terjadi tanpa membaca saldo sesudahnya', 'Hanya memastikan saldo tetap 50 tanpa memeriksa jenis kegagalan', 'Mengharapkan nilai kembalian false dan tidak ada exception', 'Memastikan IllegalArgumentException terjadi dan saldo tetap 50'], answer: 3,
        hints: ['Kontrak menyebut dua perilaku pada jalur gagal.', 'Kegagalan operasi tidak boleh meninggalkan perubahan keadaan sebagian.'],
        explanation: 'Tes perlu memeriksa jenis kegagalan dan invariant saldo. Exception saja belum membuktikan bahwa keadaan objek tidak sempat berubah sebelum kegagalan.', xp: 15
      }
    ]
  },
  {
    id: 'data-structures-and-algorithms', title: 'Data Structures & Algorithms', category: 'Computer Science', level: 'Menengah', theme: 'yellow', symbol: 'DSA',
    description: 'Kuis konsep analisis algoritma dan struktur data: kompleksitas, array, linked list, stack, queue, hash, pohon, dan penelusuran graf.',
    chapters: [
      { title: 'Biaya dan Bentuk Penyimpanan', description: 'Mengukur pertumbuhan kerja serta memilih urutan, tumpukan, dan antrean.' },
      { title: 'Mencari dan Menelusuri', description: 'Mengenali kontrak hash, urutan pohon pencarian, dan jalur terpendek tak berbobot.' }
    ],
    lessons: [
      {
        id: 'data-structures-and-algorithms-01', title: 'Big O Mengukur Pertumbuhan', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Notasi Big O menjelaskan batas pertumbuhan biaya ketika ukuran masukan meningkat. Ia bukan waktu dalam detik dan tidak memperhitungkan semua detail perangkat. Untuk membandingkan algoritma, nyatakan ukuran input dan operasi yang dihitung.', 'Dua loop bersarang yang masing-masing menelusuri n elemen melakukan sekitar n × n langkah jika tidak ada penghentian awal. Konstanta dan suku berorde lebih rendah diabaikan dalam kelas pertumbuhan, tetapi tetap dapat memengaruhi kecepatan pada data kecil.'],
        example: 'hitung = 0\nuntuk setiap i dari 0 sampai n-1:\n    untuk setiap j dari 0 sampai n-1:\n        hitung = hitung + 1\nAsumsi: penambahan dan perbandingan berbiaya konstan.',
        task: ['Apa kompleksitas waktu paling ketat dalam pilihan berikut?'], options: ['O(n²)', 'O(n)', 'O(log n)', 'O(1)'], answer: 0,
        hints: ['Loop dalam dijalankan penuh untuk setiap iterasi loop luar.', 'Kalikan banyak iterasi kedua loop, bukan menjumlahkannya.'],
        explanation: 'Ada n² kenaikan hitung sehingga kompleksitasnya O(n²). Dua loop berurutan dapat menghasilkan O(n), tetapi dua loop bersarang pada contoh mengalikan pekerjaan.', xp: 15
      },
      {
        id: 'data-structures-and-algorithms-02', title: 'Array dan Linked List Memiliki Biaya Berbeda', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Array menyediakan akses berdasarkan indeks dengan menghitung lokasi elemen, sehingga akses acak biasanya O(1). Linked list menyimpan hubungan antar-node dan perlu menelusuri tautan untuk mencapai posisi yang belum diketahui.', 'Penyisipan pada linked list dapat O(1) jika node atau tautan yang diperlukan sudah tersedia, tetapi mencari lokasi penyisipannya tetap dapat O(n). Bandingkan seluruh operasi yang dilakukan, bukan hanya langkah terakhir setelah lokasi berhasil ditemukan.'],
        example: 'Struktur: singly linked list dengan n node, hanya referensi head yang tersedia.\nTugas: membaca elemen pada indeks n-1.\nTidak ada indeks tambahan atau referensi tail yang menyimpan nilai tujuan.',
        task: ['Berapa kompleksitas penelusuran untuk tugas tersebut?'], options: ['O(1) karena semua koleksi memiliki indeks', 'O(n) karena tautan harus diikuti dari head', 'O(log n) karena indeksnya angka', 'O(n²) karena setiap node harus dibandingkan dengan semua node'], answer: 1,
        hints: ['Node terakhir tidak dapat dihitung alamatnya dari head seperti elemen array.', 'Setiap langkah mengikuti satu tautan ke node berikutnya.'],
        explanation: 'Penelusuran melewati jumlah node yang sebanding dengan n. Keuntungan penyisipan linked list tidak berarti akses posisi arbitrer menjadi konstan.', xp: 15
      },
      {
        id: 'data-structures-and-algorithms-03', title: 'Stack dan Queue Memilih Urutan Berbeda', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Stack mengikuti last in, first out: elemen terakhir yang masuk dikeluarkan lebih dulu. Queue mengikuti first in, first out: elemen yang paling lama menunggu dilayani lebih dulu. Nama operasinya bisa berbeda, tetapi kontrak urutanlah yang menentukan perilaku.', 'Stack cocok untuk undo dan penelusuran bertingkat, sedangkan queue cocok untuk antrean kerja dan penelusuran lapis demi lapis. Pilih struktur berdasarkan urutan pemrosesan yang diminta, bukan karena implementasinya sama-sama dapat memakai array.'],
        example: 'Masukkan A, lalu B, lalu C ke stack kosong dan queue kosong.\nLakukan satu pop pada stack dan satu dequeue pada queue.',
        task: ['Elemen apa yang keluar dari stack dan queue secara berurutan?'], options: ['A dan C', 'B dan B', 'C dan A', 'C dan C'], answer: 2,
        hints: ['Stack mengambil yang terakhir masuk.', 'Queue mengambil yang paling dahulu masuk.'],
        explanation: 'Stack mengeluarkan C, sedangkan queue mengeluarkan A. Urutan kedatangan yang sama menghasilkan keluaran berbeda karena kebijakan aksesnya berbeda.', xp: 15
      },
      {
        id: 'data-structures-and-algorithms-04', title: 'Tabrakan Hash Tidak Berarti Kunci Sama', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Hash table memetakan kunci ke lokasi atau bucket melalui fungsi hash. Ruang hash terbatas sehingga dua kunci berbeda dapat menghasilkan hash yang sama. Struktur harus memiliki strategi penanganan tabrakan dan pemeriksaan kesetaraan kunci.', 'Pencarian sering memiliki biaya rata-rata O(1) dengan asumsi distribusi hash dan faktor muatan yang baik, tetapi bukan jaminan universal untuk kasus terburuk. Kunci juga harus menjaga perilaku hash serta kesetaraannya selama disimpan.'],
        example: 'Fungsi hash latihan: h(k) = k mod 5.\nKunci yang disimpan: 12 dan 17.\nKeduanya menghasilkan bucket 2.',
        task: ['Apa kesimpulan yang benar?'], options: ['12 dan 17 harus dianggap sebagai kunci yang sama', 'Hash table tidak boleh menyimpan dua kunci tersebut', 'Nilai kedua kunci pasti harus identik', 'Terjadi tabrakan; implementasi perlu tetap membedakan kedua kunci'], answer: 3,
        hints: ['Sisa pembagian yang sama tidak membuat angka asalnya sama.', 'Hash mempersempit lokasi pencarian, sedangkan kesetaraan menentukan kecocokan kunci.'],
        explanation: 'Keduanya bertabrakan pada bucket yang sama tetapi tetap merupakan kunci berbeda. Menganggap hash sebagai identitas unik akan menyebabkan data tertukar atau hilang.', xp: 15
      },
      {
        id: 'data-structures-and-algorithms-05', title: 'Pohon Pencarian Memiliki Invariant Urutan', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Binary search tree untuk kunci unik menjaga semua kunci subtree kiri lebih kecil dari node dan semua kunci subtree kanan lebih besar. Aturan ini memungkinkan pencarian memilih satu arah berdasarkan perbandingan.', 'Penelusuran inorder mengunjungi subtree kiri, node, lalu subtree kanan sehingga menghasilkan urutan menaik. Biaya pencarian mengikuti tinggi pohon: pohon seimbang dapat setinggi O(log n), sedangkan pohon yang miring dapat menjadi O(n). Nama binary saja tidak menjamin keseimbangan.'],
        example: 'Pohon pencarian dengan akar 8.\nAnak kiri 8 adalah 3; anak kanan 8 adalah 10.\nAnak kiri 3 adalah 1; anak kanan 3 adalah 6.\nNode 1, 6, dan 10 tidak memiliki anak.\nTidak ada kunci duplikat.',
        task: ['Apa urutan kunjungan inorder?'], options: ['1, 3, 6, 8, 10', '8, 3, 1, 6, 10', '1, 6, 3, 10, 8', '10, 8, 6, 3, 1'], answer: 0,
        hints: ['Selesaikan subtree kiri sebelum mengunjungi node induk.', 'Pada pohon pencarian valid dengan kunci unik, inorder menghasilkan urutan naik.'],
        explanation: 'Urutannya 1, 3, 6, 8, 10 sesuai kiri-node-kanan. Memulai dari akar merupakan pola preorder, bukan inorder.', xp: 15
      },
      {
        id: 'data-structures-and-algorithms-06', title: 'BFS Menemukan Jarak pada Graf Tak Berbobot', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Breadth-first search memakai queue untuk menelusuri graf berdasarkan lapisan jarak dari titik awal. Pada graf tak berbobot, setiap sisi dianggap berbiaya sama, sehingga kunjungan pertama dapat menetapkan jarak dengan jumlah sisi paling sedikit.', 'Tandai node saat dimasukkan ke queue agar node yang sama tidak dijadwalkan berulang melalui tetangga berbeda. Untuk graf berbobot tidak seragam, BFS biasa tidak menjamin biaya total minimum; algoritma harus sesuai dengan makna biaya yang dicari.'],
        example: 'Graf tak berarah, setiap sisi berbobot sama:\nA terhubung ke B dan C.\nB terhubung ke A dan D.\nC terhubung ke A dan D.\nD terhubung ke B, C, dan E.\nE terhubung ke D.',
        task: ['Berapa jarak terpendek dari A ke E dalam jumlah sisi?'], options: ['2', '3', '4', '5'], answer: 1,
        hints: ['E hanya dapat dicapai melalui D.', 'D dapat dicapai dari A melalui B atau C dalam dua sisi.'],
        explanation: 'Jalur A-B-D-E atau A-C-D-E memiliki tiga sisi. Menghitung jumlah node pada jalur akan menghasilkan empat, tetapi yang ditanyakan adalah jumlah sisi.', xp: 15
      }
    ]
  },
  {
    id: 'lua', title: 'Lua', category: 'Game Development', level: 'Pemula', theme: 'blue', symbol: 'Lua',
    description: 'Kuis konsep Lua 5.4 untuk scripting: table, truthiness, iterasi, closure, metatable, dan pemuatan modul dengan penanganan kesalahan.',
    chapters: [
      { title: 'Data Scripting', description: 'Mengenali table sebagai wadah utama, nilai nil, dan batas iterasi urutan.' },
      { title: 'Menyusun Perilaku', description: 'Mengelola keadaan lokal, berbagi metode, dan memulihkan kegagalan modul.' }
    ],
    lessons: [
      {
        id: 'lua-01', title: 'Table Menggabungkan Urutan dan Kunci', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Table merupakan struktur data utama Lua dan dapat menyimpan pasangan kunci-nilai. Bagian urutan yang ditulis tanpa kunci eksplisit pada konstruktor dimulai dari indeks 1. Kunci string dapat diakses melalui kurung siku atau notasi titik jika namanya sesuai identifier.', 'Angka 1 dan string "1" adalah dua kunci berbeda. Sebuah table juga dapat memuat data urutan dan field bernama sekaligus, tetapi rancangan yang jelas membantu pembaca memahami apakah wadah itu dimaksudkan sebagai daftar, kamus, atau objek.'],
        example: 'local barang = {"pedang", "ramuan"}\nbarang.pemilik = "Nara"\nlocal pertama = barang[1]',
        task: ['Apa nilai pertama?'], options: ['nil karena indeks pertama selalu 0', '"ramuan"', '"pedang"', '"Nara"'], answer: 2,
        hints: ['Elemen tanpa kunci pada konstruktor mendapat indeks 1 lalu 2.', 'Field pemilik memiliki kunci string terpisah dari bagian urutan.'],
        explanation: 'barang[1] bernilai pedang. Kebiasaan indeks nol dari bahasa lain tidak berlaku pada urutan table yang dibentuk dengan cara ini.', xp: 15
      },
      {
        id: 'lua-02', title: 'Hanya false dan nil yang Falsy', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Dalam kondisi Lua, hanya false dan nil yang dianggap salah. Angka nol dan string kosong tetap dianggap benar. Perbedaan ini penting ketika memindahkan logika dari bahasa yang memiliki aturan truthiness lain.', 'Operator or mengembalikan operand pertama jika dianggap benar, atau operand kedua jika yang pertama salah. Karena nol dianggap benar, pola nilai or cadangan mempertahankan nol. Pola ini juga mengganti false, sehingga tidak selalu cocok jika false merupakan nilai sah yang perlu dibedakan dari nil.'],
        example: 'local stok = 0\nlocal tampil = stok or 10',
        task: ['Apa nilai tampil?'], options: ['10 karena nol dianggap kosong', 'false', 'nil', '0 karena nol truthy di Lua'], answer: 3,
        hints: ['Periksa daftar nilai falsy Lua, bukan aturan bahasa lain.', 'or mengembalikan operand, bukan selalu boolean.'],
        explanation: 'tampil tetap 0. Hanya false dan nil yang memicu pemilihan cadangan pada pola ini, sehingga nol tidak diganti dengan 10.', xp: 15
      },
      {
        id: 'lua-03', title: 'ipairs Berhenti pada Lubang Pertama', chapter: 0, type: 'quiz', language: 'text',
        intro: ['ipairs menelusuri indeks integer berurutan mulai dari 1 dan berhenti saat menemukan nilai nil pertama. pairs dapat menelusuri pasangan kunci yang ada, tetapi urutan kunjungannya tidak dijamin. Pilih iterator berdasarkan bentuk data yang sebenarnya.', 'Memberi nilai nil pada suatu kunci menghapus entri itu dari table. Table yang memiliki lubang pada bagian urutan tidak boleh diperlakukan seolah panjangnya selalu jelas; operator # pada table berlubang tidak memberikan janji jumlah semua entri.'],
        example: 'local data = { [1] = "A", [3] = "C" }\nlocal hasil = ""\nfor i, nilai in ipairs(data) do\n  hasil = hasil .. nilai\nend',
        task: ['Apa isi hasil setelah loop?'], options: ['"A"', '"AC"', '"C"', '"A nil C"'], answer: 0,
        hints: ['Indeks 2 tidak ada sehingga bernilai nil.', 'ipairs tidak melompati lubang untuk mencari indeks 3.'],
        explanation: 'Hanya A yang dikunjungi karena iterasi berhenti pada indeks 2. Menganggap ipairs sama dengan semua pasangan table akan melewatkan perbedaan penting ini.', xp: 15
      },
      {
        id: 'lua-04', title: 'Closure Membawa Keadaan Lokal', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Fungsi Lua dapat mengakses variabel lokal dari scope luarnya melalui closure. Variabel yang ditangkap tetap tersedia bagi fungsi hasil meskipun fungsi pembuatnya sudah selesai. Ini berguna untuk membuat keadaan privat tanpa variabel global.', 'Setiap pemanggilan fungsi pembuat dapat menghasilkan kelompok keadaan yang mandiri. Dua closure yang dibuat lewat dua pemanggilan berbeda tidak harus berbagi penghitung, meskipun badan fungsi keduanya sama.'],
        example: 'local function buatPenghitung()\n  local n = 0\n  return function()\n    n = n + 1\n    return n\n  end\nend\nlocal a = buatPenghitung()\nlocal b = buatPenghitung()\na()\na()\nlocal hasil = b()',
        task: ['Berapa hasil pemanggilan pertama b setelah a dipanggil dua kali?'], options: ['3 karena semua closure berbagi satu n', '1 karena b memiliki keadaan lokal sendiri', '2 karena a dipanggil dua kali', '0 karena closure tidak dapat mengubah variabel luar'], answer: 1,
        hints: ['buatPenghitung dipanggil dua kali untuk membuat dua lingkungan lokal.', 'Pemanggilan a tidak menyentuh n yang ditangkap oleh b.'],
        explanation: 'b menghasilkan 1 pada pemanggilan pertamanya. Nama variabel n yang sama dalam fungsi pembuat tidak berarti seluruh hasil pembuat berbagi satu variabel global.', xp: 15
      },
      {
        id: 'lua-05', title: '__index Menyediakan Pencarian Cadangan', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Metatable dapat mengatur perilaku khusus suatu table. Field __index digunakan ketika kunci yang dicari tidak tersedia secara langsung. Jika __index berupa table lain, pencarian dilanjutkan ke table tersebut, sehingga metode atau nilai bawaan dapat dibagikan.', 'Membaca nilai melalui __index tidak otomatis menyalinnya menjadi field milik objek. Penugasan biasa ke field objek tetap dapat membuat nilai lokal yang menutupi nilai bawaan. Pahami perbedaan pencarian dan penyimpanan agar keadaan antarobjek tidak tertukar.'],
        example: 'local dasar = { energi = 100 }\nlocal pemain = setmetatable({}, { __index = dasar })\nlocal sebelum = pemain.energi\npemain.energi = 80\nlocal asal = dasar.energi',
        task: ['Apa pasangan nilai sebelum dan asal?'], options: ['nil dan 80', '100 dan 80', '100 dan 100', '80 dan 100'], answer: 2,
        hints: ['Pembacaan awal memakai nilai cadangan dari dasar.', 'Tidak ada __newindex, sehingga penugasan energi membuat field pada pemain.'],
        explanation: 'sebelum adalah 100 dari pencarian cadangan, dan dasar tetap 100. Menulis pemain.energi tidak otomatis mengubah table yang menjadi __index.', xp: 15
      },
      {
        id: 'lua-06', title: 'Modul dan Panggilan Terlindungi', chapter: 1, type: 'quiz', language: 'text',
        intro: ['require memuat modul berdasarkan nama melalui mekanisme pencarian Lua dan menyimpan hasil pemuatan agar modul yang sama tidak selalu dieksekusi ulang. Modul lazimnya mengembalikan table berisi fungsi atau konfigurasi yang menjadi antarmukanya.', 'pcall memanggil fungsi secara terlindungi dan mengembalikan status boolean diikuti hasil atau informasi kesalahan. Ini dapat membantu menyediakan cadangan untuk komponen opsional, tetapi kegagalan komponen wajib sebaiknya tidak disembunyikan. Bedakan tidak tersedianya fitur tambahan dari kerusakan inti program.'],
        example: 'local ok, konfigurasi = pcall(require, "tema_opsional")\nif not ok then\n  konfigurasi = { warna = "biru" }\nend\n-- Asumsi: require gagal menemukan modul tema_opsional.',
        task: ['Apa keadaan ok dan konfigurasi.warna setelah blok if?'], options: ['true dan "biru"', 'false dan nil', 'true dan nil', 'false dan "biru"'], answer: 3,
        hints: ['pcall mengembalikan false ketika fungsi yang dipanggil menimbulkan kesalahan.', 'Blok if mengganti informasi kesalahan dengan table konfigurasi cadangan.'],
        explanation: 'ok tetap false, sedangkan konfigurasi diganti menjadi table dengan warna biru. Memberi cadangan tidak mengubah status awal pemanggilan menjadi sukses.', xp: 15
      }
    ]
  }
];
