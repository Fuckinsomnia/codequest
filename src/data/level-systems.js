export const systemsLevelCourses = [
  {
    id: 'intermediate-command-line', trackId: 'command-line', title: 'Intermediate Command Line', category: 'Computer Science', level: 'Menengah', theme: 'green', symbol: 'CLI',
    description: 'Kuis konsep Bash dan perbandingan scope PowerShell tentang argumen, status, aliran, serta lingkungan proses. Semua contoh adalah bahan analisis lokal, bukan instruksi menjalankan shell atau terminal interaktif.',
    chapters: [
      { title: 'Kontrak Pemanggilan', description: 'Mempertahankan batas argumen dan membaca status perintah maupun pipeline secara tepat.' },
      { title: 'Aliran dan Lingkungan', description: 'Menelusuri descriptor, iterasi path yang aman, dan pewarisan variabel lingkungan.' }
    ],
    lessons: [
      {
        id: 'intermediate-command-line-01', title: 'Meneruskan Vektor Argumen Utuh', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Dalam Bash, argumen adalah urutan string, bukan satu kalimat yang boleh dipecah ulang sesuka hati. String kosong, spasi di tengah nama, dan karakter bintang dapat menjadi bagian data yang sah. Pembungkus perintah perlu mempertahankan batas setiap elemen urutan tersebut.', 'Ekspansi "$@" menghasilkan satu argumen untuk setiap parameter posisi, termasuk parameter kosong. Sebaliknya, "$*" menggabungkannya menjadi satu string dengan pemisah dari IFS. Ekspansi tanpa kutipan dapat memicu pemisahan kata dan perluasan pola nama berkas.'],
        example: 'Bash, analisis saja; IFS bawaan.\nset -- "dua kata" "" "*.txt"\n# Sebuah fungsi penerima dipanggil dengan: penerima "$@"\n# penerima hanya mencatat daftar argumen, tanpa membuka berkas.',
        task: ['Daftar argumen mana yang diterima fungsi tersebut?'], options: ['["dua", "kata", "*.txt"]', '["dua kata", "", "*.txt"]', '["dua kata  *.txt"]', '["dua kata", "*.txt"]'], answer: 1,
        hints: ['Kutipan tidak menghapus argumen yang panjangnya nol.', 'Bintang di dalam ekspansi berkuotasi tetap menjadi data, bukan pencarian berkas.'],
        explanation: '"$@" mempertahankan ketiga parameter secara terpisah: teks berspasi, string kosong, dan pola literal. Menggabungkan dengan "$*" lalu memecah kembali tidak dapat memulihkan batas aslinya secara umum.', xp: 15
      },
      {
        id: 'intermediate-command-line-02', title: 'Status Harus Ditangkap Sebelum Berubah', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Parameter $? pada Bash menunjukkan status perintah terakhir yang telah selesai. Ia bukan riwayat kegagalan yang menetap. Perintah pencatatan yang berhasil dapat mengganti status gagal sebelum kode pengambil keputusan sempat membacanya.', 'Simpan status segera jika perlu melaporkan pesan terlebih dahulu. Penugasan sederhana tanpa substitusi perintah biasanya berhasil dengan status nol, tetapi ekspansi di sisi kanan sudah membaca status sebelumnya. Ini menjelaskan mengapa variabel salinan dan $? berikutnya dapat berbeda.'],
        example: 'Bash; errexit tidak aktif, printf diasumsikan berhasil.\nfalse\nstatus=$?\nprintf "%s\\n" "pemeriksaan selesai"\n# Amati status dan $? tepat setelah printf.',
        task: ['Apa pasangan nilai status dan $? pada titik pengamatan?'], options: ['0 dan 0', '1 dan 1', '0 dan 1', '1 dan 0'], answer: 3,
        hints: ['Builtin false selesai dengan status 1.', 'Variabel status tidak ikut berubah ketika printf selesai.'],
        explanation: 'status menyimpan 1 dari false, sedangkan $? menjadi 0 karena printf berhasil. Pesan keluaran tidak membuktikan keberhasilan operasi awal; keputusan harus memakai status yang memang terkait operasi itu.', xp: 15
      },
      {
        id: 'intermediate-command-line-03', title: 'Pipefail Memilih Kegagalan Paling Kanan', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Pipeline Bash memiliki status gabungan yang berbeda dari status tiap anggotanya. Tanpa pipefail, status gabungan mengikuti perintah paling kanan. Akibatnya, pembaca yang selesai normal dapat menutupi kegagalan penghasil data di sebelah kiri.', 'Dengan pipefail, status gabungan mengikuti perintah paling kanan yang statusnya bukan nol, atau nol jika semuanya berhasil. Ia tidak memilih kegagalan pertama menurut waktu maupun menjumlahkan kode kesalahan. PIPESTATUS dapat dipakai untuk mengamati status tiap anggota, tetapi harus ditangkap sebelum perintah lain menggantinya.'],
        example: 'Skenario Bash, bukan perintah untuk dijalankan.\nPipeline tiga tahap lokal: penghasil | penyaring | penghitung\nStatus tahap dari kiri: 7, 3, 0.\nBandingkan pipefail nonaktif dengan pipefail aktif.',
        task: ['Berapa status gabungan tanpa pipefail dan dengan pipefail?'], options: ['0 dan 3', '0 dan 7', '3 dan 3', '0 dan 10'], answer: 0,
        hints: ['Tanpa pipefail hanya tahap terakhir yang menentukan status gabungan.', 'Paling kanan yang gagal adalah tahap kedua, bukan tahap pertama.'],
        explanation: 'Statusnya 0 lalu 3. Pipefail memperlihatkan kegagalan yang tersembunyi, tetapi status tunggal tetap tidak menceritakan semua tahap; diagnosis rinci memerlukan status masing-masing proses.', xp: 15
      },
      {
        id: 'intermediate-command-line-04', title: 'Descriptor Disalin pada Saat Redirection', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Bash memproses redirection dari kiri ke kanan. Bentuk 2>&1 menyalin tujuan descriptor 1 saat langkah itu diproses ke descriptor 2. Ia tidak membuat hubungan dinamis yang mengikuti setiap perubahan tujuan stdout sesudahnya.', 'Urutan redirection menentukan apakah pesan diagnosis ikut dibuang atau tetap terlihat. Menalar tabel descriptor setelah setiap langkah lebih akurat daripada membaca seluruh redirection sebagai satu instruksi serentak. Contoh ini hanya memakai /dev/null, bukan berkas pengguna.'],
        example: 'Bash, contoh lokal untuk dibaca; awalnya stdout dan stderr menuju terminal.\n{ printf "%s\\n" "data"; printf "%s\\n" "diagnosis" >&2; } 2>&1 >/dev/null',
        task: ['Teks mana yang tetap menuju terminal menurut urutan redirection ini?'], options: ['Hanya data', 'Data dan diagnosis', 'Hanya diagnosis', 'Tidak ada keduanya'], answer: 2,
        hints: ['Saat 2>&1 diproses, descriptor 1 masih menunjuk terminal.', 'Redirection berikutnya hanya memindahkan descriptor 1 ke /dev/null.'],
        explanation: 'Diagnosis tetap menuju terminal melalui descriptor 2 yang sebelumnya menyalin tujuan stdout lama. Data dibuang melalui descriptor 1. Membalik urutan menjadi >/dev/null 2>&1 akan membuang keduanya.', xp: 15
      },
      {
        id: 'intermediate-command-line-05', title: 'Iterasi Path Tanpa Memecah Nama', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Nama berkas tidak terbatas pada kata tanpa spasi. Pada sistem POSIX, nama juga dapat mengandung baris baru atau diawali tanda minus. Menafsirkan keluaran daftar berkas sebagai kata-kata shell dapat mengubah satu nama menjadi beberapa argumen yang berbeda.', 'Untuk kumpulan kecil yang sudah diketahui, array Bash menjaga batas nama tanpa parsing teks tambahan. Kutip ekspansi array dan variabel loop. Awalan ./ pada path relatif juga membedakan nama bertanda minus dari opsi bagi banyak utilitas, meskipun kontrak opsi tetap bergantung pada program tujuan.'],
        example: 'Bash; data literal, tidak ada akses berkas.\npaths=("./catatan tim.txt" "./-ringkas.txt" "./pola*.txt")\n# Tugas loop hanya mencetak setiap path pada satu pemanggilan printf.',
        task: ['Loop mana menjaga ketiga path sebagai data utuh tanpa ekspansi pola?'], options: ['for p in ${paths[*]}; do printf "%s\\n" "$p"; done', 'for p in "${paths[@]}"; do printf "%s\\n" "$p"; done', 'for p in "${paths[*]}"; do printf "%s\\n" "$p"; done', 'for p in "${paths[@]}"; do printf "%s\\n" $p; done'], answer: 1,
        hints: ['Array perlu diperluas menjadi beberapa elemen, bukan satu gabungan.', 'Menjaga batas pada loop saja belum cukup jika argumen printf kemudian tidak dikutip.'],
        explanation: '"${paths[@]}" mengeluarkan tiap elemen array secara terpisah dan "$p" mempertahankannya saat diteruskan. Bentuk tanpa kutipan membuka peluang word splitting atau globbing; bentuk "${paths[*]}" menggabungkan semua path menjadi satu iterasi.', xp: 15
      },
      {
        id: 'intermediate-command-line-06', title: 'Lingkungan Sementara Berbeda Antar-Shell', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Proses anak menerima salinan lingkungan dari proses pembuatnya. Dalam Bash, penugasan di depan pemanggilan executable eksternal dapat memberi nilai khusus hanya untuk pemanggilan itu. Ini berbeda dari mengubah variabel shell induk secara permanen.', 'PowerShell memiliki sintaks dan aturan scope berbeda: penugasan $env:MODE mengubah lingkungan proses PowerShell saat ini, yang kemudian diwariskan kepada anak berikutnya. Perubahan tersebut tidak otomatis mengubah konfigurasi lingkungan tingkat pengguna atau mesin. Jangan memindahkan idiom Bash ke PowerShell tanpa menilai perbedaannya.'],
        example: 'Dua skenario terpisah, tanpa menjalankan executable nyata.\nBash: MODE=awal; export MODE; lalu MODE=uji pemeriksa-lokal\nPowerShell: $env:MODE = "awal"; lalu $env:MODE = "uji"; & pemeriksa-lokal\nAsumsi pemeriksa-lokal adalah proses anak biasa yang langsung selesai.',
        task: ['Setelah proses anak selesai, apa nilai MODE di masing-masing proses shell induk?'], options: ['Bash uji; PowerShell uji', 'Bash awal; PowerShell awal', 'Bash uji; PowerShell awal', 'Bash awal; PowerShell uji'], answer: 3,
        hints: ['Penugasan prefiks Bash dibatasi pada pemanggilan executable eksternal dalam skenario ini.', 'Penugasan $env: di PowerShell sudah mengubah lingkungan proses induknya sendiri.'],
        explanation: 'Bash mempertahankan awal, sedangkan proses PowerShell menyimpan uji. Kedua anak melihat uji, tetapi cara menyiapkan lingkungan anak tidak memiliki efek scope yang sama pada kedua shell.', xp: 15
      }
    ]
  },
  {
    id: 'intermediate-git-github', trackId: 'git-github', title: 'Intermediate Git & GitHub', category: 'Computer Science', level: 'Menengah', theme: 'orange', symbol: 'Git',
    description: 'Kuis konsep DAG commit, preservasi konflik, pemulihan, stash, rebase, dan peninjauan. Diagram repositori fiktif hanya dianalisis; aplikasi tidak menjalankan Git, shell, atau operasi remote.',
    chapters: [
      { title: 'Riwayat dan Pemulihan', description: 'Membedakan hubungan commit, keputusan penggabungan, dan pembatalan perubahan yang sudah dibagikan.' },
      { title: 'Konteks Kolaborasi', description: 'Menjaga staging saat menyela pekerjaan dan memahami identitas commit serta cakupan review.' }
    ],
    lessons: [
      {
        id: 'intermediate-git-github-01', title: 'Snapshot Sama Tidak Berarti Leluhur Sama', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Objek commit menyimpan hubungan ke induknya selain menunjuk snapshot pohon berkas. Grafik commit adalah directed acyclic graph: menelusuri induk bergerak ke riwayat sebelumnya tanpa kembali membentuk siklus. Kesamaan isi berkas tidak menambahkan hubungan induk baru.', 'Cherry-pick menyalin perubahan sebagai commit baru pada konteks lain, bukan memindahkan identitas commit sumber. Karena itu dua branch dapat memiliki isi akhir sama tetapi tetap menyimpang secara ancestry. Penilaian fast-forward memakai keterjangkauan commit, bukan perbandingan isi folder saja.'],
        example: 'DAG fiktif; panah dari induk ke anak.\nA -> B -> C (main)\nA -> D -> E (fitur)\nSnapshot C sama persis dengan snapshot E.\nTidak ada hubungan induk lain.',
        task: ['Apakah main dapat fast-forward ke E hanya berdasarkan DAG ini?'], options: ['Ya, karena snapshot C dan E sama', 'Ya, karena keduanya berawal di A', 'Tidak, karena C bukan leluhur E', 'Tidak, karena fast-forward selalu membutuhkan merge commit'], answer: 2,
        hints: ['Fast-forward hanya memajukan penunjuk sepanjang riwayat yang sudah ada.', 'Telusuri induk E: D lalu A, bukan C.'],
        explanation: 'C tidak berada pada rantai leluhur E sehingga memindahkan main dari C ke E bukan fast-forward. Pohon berkas yang identik tidak mengubah struktur DAG atau menyatukan identitas commit.', xp: 15
      },
      {
        id: 'intermediate-git-github-02', title: 'Konflik Dapat Memuat Dua Kebutuhan Sah', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Penyelesaian konflik bukan lomba memilih sisi kiri atau kanan. Dua perubahan pada bagian yang sama dapat membawa persyaratan yang sama-sama harus dipertahankan. Snapshot dasar membantu mengidentifikasi maksud masing-masing perubahan sebelum merancang hasil gabungannya.', 'Penyelesaian semantik sebaiknya diuji terhadap kedua perilaku yang disepakati. Sekadar menghapus penanda konflik atau memilih satu versi utuh belum membuktikan hasil benar. Pemeriksaan diff hasil dan tes kasus batas melindungi perubahan yang mudah hilang saat menggabungkan.'],
        example: 'Skenario fungsi validasi lokal.\nDasar: semua nama diterima.\nBranch utama: menolak nama kosong setelah trim.\nBranch fitur: menolak nama lebih dari 40 karakter setelah trim.\nSpesifikasi gabungan: kedua aturan wajib berlaku.',
        task: ['Penyelesaian mana menjaga maksud kedua perubahan?'], options: ['Validasi hasil trim dengan panjang 1 sampai 40, disertai tes kosong dan terlalu panjang', 'Ambil versi utama seluruhnya karena menjadi target merge', 'Ambil versi fitur seluruhnya karena commit-nya lebih baru', 'Gabungkan penanda konflik lalu biarkan tes memilih sisi saat berjalan'], answer: 0,
        hints: ['Kedua aturan memakai teks setelah trim, jadi satu hasil normalisasi dapat dipakai bersama.', 'Kasus kosong dan kasus panjang berlebih memeriksa kebutuhan yang berbeda.'],
        explanation: 'Rentang panjang 1–40 setelah trim memenuhi kedua persyaratan. Pemilihan sisi berdasarkan nama branch atau waktu commit tidak memberikan jaminan semantik dan dapat menghapus validasi yang sah.', xp: 15
      },
      {
        id: 'intermediate-git-github-03', title: 'Membatalkan Perubahan yang Sudah Dibagikan', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Revert membuat commit baru yang menerapkan kebalikan perubahan commit terpilih terhadap konteks saat ini. Riwayat lama tetap terlihat. Reset memindahkan penunjuk branch dan, bergantung pada modenya, dapat mengubah index atau working tree; ia bukan sinonim pembatalan yang aman untuk kolaborasi.', 'Jika rekan sudah membangun pekerjaan di atas commit yang dibagikan, mempertahankan ancestry biasanya lebih mudah dikoordinasikan daripada menulis ulang riwayat itu. Revert tetap membutuhkan pemeriksaan: perubahan berikutnya dapat bergantung pada kode yang dibatalkan atau menimbulkan konflik.'],
        example: 'Riwayat fiktif bersama: A -> B -> C.\nB memperkenalkan perilaku keliru; C adalah perbaikan tampilan yang masih dibutuhkan.\nRekan lain sudah memiliki C. Tim ingin membatalkan efek B tanpa menghapus C dari riwayat.',
        task: ['Strategi mana paling sesuai dengan batasan tersebut?'], options: ['Memindahkan branch kembali ke A dan meminta semua clone mengikuti', 'Menghapus nama branch agar efek B hilang dari semua clone', 'Mengganti pesan commit B tanpa mengubah snapshot', 'Membuat commit revert atas B, menyesuaikan konflik dan menguji C tetap berfungsi'], answer: 3,
        hints: ['Tujuannya membatalkan efek, bukan menghilangkan bukti commit yang sudah dibagikan.', 'Perubahan C tetap perlu diperiksa terhadap keadaan setelah pembatalan B.'],
        explanation: 'Commit revert menjaga A, B, dan C sebagai riwayat yang dapat ditelusuri sambil merekam pembatalan baru. Menggeser branch ke A tidak mempertahankan C pada ujung riwayat dan menimbulkan masalah sinkronisasi bagi rekan.', xp: 15
      },
      {
        id: 'intermediate-git-github-04', title: 'Stash Juga Menyimpan Batas Staging', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Stash dapat merekam keadaan working tree sekaligus index sehingga pekerjaan sementara tidak hanya berupa satu patch datar. Perbedaan yang sudah di-stage dan yang belum di-stage menyatakan pilihan untuk commit berikutnya, sehingga batas itu bisa penting saat pekerjaan dilanjutkan.', 'Pemulihan dengan apply --index mencoba mengembalikan keadaan index selain perubahan working tree. Tanpa opsi tersebut, pemisahan staging asli tidak dijanjikan untuk dipulihkan. Keberhasilan tetap bergantung pada konteks dan konflik; apply tidak otomatis membuang entri stash setelah berhasil.'],
        example: 'Skenario repositori lokal fiktif; hanya berkas terlacak.\nAwal: perubahan A di-stage; perubahan B di berkas lain belum di-stage.\nStash dibuat, lalu diterapkan kembali pada basis yang sama dan bersih dengan apply --index.\nAsumsi pemulihan berhasil tanpa konflik.',
        task: ['Keadaan mana yang diharapkan setelah pemulihan tersebut?'], options: ['A dan B sama-sama di-stage; stash terhapus', 'A kembali di-stage, B belum di-stage; entri stash masih ada', 'A dan B menjadi commit baru; index kosong', 'Hanya B dipulihkan karena stash tidak menyimpan index'], answer: 1,
        hints: ['--index meminta pemulihan keadaan staging, bukan pembuatan commit.', 'apply berbeda dari pop dalam perlakuan terhadap entri stash yang berhasil diterapkan.'],
        explanation: 'A kembali ke index dan B tetap sebagai perubahan working tree di luar index. Entri stash dipertahankan oleh apply. Konflik dapat menghalangi pemulihan index pada konteks lain, sehingga asumsi basis bersih penting.', xp: 15
      },
      {
        id: 'intermediate-git-github-05', title: 'Rebase Mengganti Identitas Rantai Commit', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Rebase memutar ulang perubahan commit di atas basis baru. Parent adalah bagian isi objek commit, sehingga perubahan parent mengubah ID commit meskipun patch atau pesan terlihat sama. Commit turunan ikut membutuhkan identitas baru karena merujuk parent yang baru.', 'Branch lain yang masih menunjuk commit lama tidak otomatis dipindahkan hanya karena branch fitur di-rebase. Tautan review, tanda tangan, dan pekerjaan rekan dapat tetap mengacu riwayat lama. Inilah sebabnya rebase pada riwayat bersama membutuhkan koordinasi, bukan sekadar menganggapnya perapian tampilan.'],
        example: 'Sebelum: A -> B -> C pada fitur; A -> D pada main.\nBranch catatan menunjuk C.\nRebase fitur ke D menghasilkan D -> Bbaru -> Cbaru.\nAsumsi tidak ada pembaruan referensi tambahan seperti update-refs.',
        task: ['Pernyataan mana benar tentang identitas dan branch catatan?'], options: ['Bbaru tetap ber-ID B karena patch sama', 'Catatan otomatis menunjuk Cbaru karena nama pesannya sama', 'Bbaru dan Cbaru ber-ID baru; catatan masih menunjuk C', 'Rebase menyisipkan D tanpa mengubah ID B maupun C'], answer: 2,
        hints: ['Parent berbeda sudah cukup untuk mengubah identitas objek commit.', 'Skenario mengecualikan mekanisme pembaruan referensi tambahan.'],
        explanation: 'Perubahan parent membentuk commit baru untuk B dan kemudian C. Catatan tetap merujuk C lama karena referensi itu tidak ikut diperbarui. Kesamaan patch bukan kesamaan objek commit.', xp: 15
      },
      {
        id: 'intermediate-git-github-06', title: 'Persetujuan Review Terikat pada Perubahan', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Review menilai isi tertentu beserta konteks integrasinya, bukan menjamin semua perubahan masa depan pada branch yang sama. Commit tambahan setelah persetujuan dapat mengubah asumsi yang sudah diperiksa, meskipun judul pull request tetap sama.', 'Alur peninjauan yang baik memperlihatkan selisih sejak peninjauan terakhir dan memeriksa hasil integrasi terhadap target terkini. Status CI harus dihubungkan dengan commit yang benar. Tes yang hijau pada snapshot lama tidak otomatis membuktikan snapshot baru aman untuk digabungkan.'],
        example: 'PR fiktif disetujui pada commit P.\nSetelah itu, Q menambahkan perubahan parser dan target main maju ke R.\nSatu-satunya hasil tes yang tercatat masih milik P terhadap target lama.',
        task: ['Langkah review mana paling kuat sebelum keputusan penggabungan?'], options: ['Tinjau perubahan P ke Q dan validasi kandidat integrasi Q terhadap R', 'Gabungkan karena judul PR tidak berubah sejak persetujuan', 'Cukup baca pesan Q tanpa memeriksa diff atau hasil tes baru', 'Anggap tes P berlaku untuk Q selama penulis commit sama'], answer: 0,
        hints: ['Ada dua perubahan konteks: ujung PR dan target integrasinya.', 'Identitas penulis tidak menyamakan perilaku dua snapshot.'],
        explanation: 'Peninjauan delta dan pengujian kandidat integrasi terkini menghubungkan persetujuan dengan kode yang benar-benar akan digabungkan. Hasil lama tetap berguna sebagai bukti historis, tetapi bukan pengganti pemeriksaan perubahan baru.', xp: 15
      }
    ]
  },
  {
    id: 'intermediate-cpp', trackId: 'cpp', title: 'Intermediate C++', category: 'Computer Science', level: 'Menengah', theme: 'blue', symbol: 'C++',
    description: 'Kuis konsep C++17 tentang RAII, kepemilikan, move, referensi, iterator, dan jaminan exception. Potongan kode lokal hanya dibaca untuk penalaran; tidak ada eksekusi kompiler atau program.',
    chapters: [
      { title: 'Kepemilikan yang Terlihat', description: 'Menelusuri konstruksi gagal, hubungan smart pointer, dan pemilihan operasi move atau copy.' },
      { title: 'Kontrak Akses dan Kegagalan', description: 'Membedakan akses const, validitas iterator, serta perubahan keadaan yang atomik terhadap exception.' }
    ],
    lessons: [
      {
        id: 'intermediate-cpp-01', title: 'RAII Saat Konstruktor Belum Selesai', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Jika konstruktor melempar exception, objek lengkap belum berhasil dibentuk sehingga destructornya sendiri tidak dipanggil. Namun subobjek dasar dan anggota yang sudah selesai dikonstruksi dibersihkan dalam urutan kebalikan konstruksi. RAII tetap bekerja sebelum objek luar sempat siap dipakai.', 'Menyimpan sumber daya dalam anggota pemilik seperti unique_ptr menghindari ketergantungan pada destructor objek luar untuk jalur gagal ini. Pointer mentah yang hanya dibebaskan oleh destructor luar justru dapat bocor ketika konstruktor gagal. Destructor pembersih juga sebaiknya tidak menambah exception baru saat unwinding.'],
        example: 'C++17; cuplikan konseptual dengan header standar yang sesuai.\nstruct Paket {\n    std::unique_ptr<int> data = std::make_unique<int>(9);\n    Paket() { throw std::runtime_error("validasi gagal"); }\n    ~Paket() { /* pencatatan saja */ }\n};\n// Alokasi data berhasil; exception konstruktor ditangkap pemanggil.',
        task: ['Pembersihan mana terjadi pada kegagalan konstruksi Paket?'], options: ['~Paket berjalan lebih dahulu lalu anggota data', 'Tidak ada destructor berjalan karena objek luar gagal', 'Integer bocor sampai pemanggil menghapusnya manual', 'Destructor data membebaskan integer; ~Paket tidak dipanggil'], answer: 3,
        hints: ['Bedakan objek lengkap dari anggota yang sudah selesai dibentuk.', 'Anggota data memiliki destructor pemiliknya sendiri.'],
        explanation: 'Anggota data sudah terbangun sehingga dihancurkan saat unwinding dan membebaskan integer. Destructor Paket tidak dipanggil untuk objek yang konstruksinya tidak selesai; keamanan berasal dari RAII pada subobjek.', xp: 15
      },
      {
        id: 'intermediate-cpp-02', title: 'Tautan Balik Tidak Harus Ikut Memiliki', chapter: 0, type: 'quiz', language: 'text',
        intro: ['shared_ptr menghitung jumlah pemilik kuat, bukan semua objek yang masih dapat dijangkau dari akar program. Dua objek yang saling menyimpan shared_ptr dapat mempertahankan hitungan masing-masing meskipun seluruh pemilik dari luar sudah dilepas. Reference counting saja tidak mengumpulkan siklus tersebut.', 'weak_ptr menyatakan hubungan pengamatan tanpa menambah pemilik kuat. Operasi lock menghasilkan shared_ptr sementara jika objek masih hidup, sehingga pemakai dapat memeriksa ketersediaan dengan aman. Penentuan arah kepemilikan harus mengikuti model domain, bukan mengganti semua pointer menjadi shared_ptr.'],
        example: 'Model lokal: Folder memiliki Dokumen melalui shared_ptr.\nDokumen perlu dapat melihat Folder induknya, tetapi tidak bertugas memperpanjang umur Folder.\nSaat pemilik luar Folder dilepas, keduanya seharusnya dapat dibersihkan.',
        task: ['Jenis hubungan Dokumen ke Folder mana paling sesuai?'], options: ['shared_ptr agar kedua arah sama-sama kuat', 'weak_ptr yang diperiksa melalui lock sebelum akses', 'unique_ptr kedua yang dibuat dari pointer mentah Folder yang sama', 'Referensi kuat global yang tidak pernah dilepas'], answer: 1,
        hints: ['Tautan balik hanya pengamatan, bukan kepemilikan domain.', 'Menambah dua pemilik tunggal untuk satu alamat justru melanggar kontrak pelepasan.'],
        explanation: 'weak_ptr memutus siklus kepemilikan kuat sekaligus menyediakan pemeriksaan masa hidup melalui lock. Dua unique_ptr atas objek sama dapat menyebabkan double deletion, sedangkan shared_ptr dua arah mempertahankan siklus.', xp: 15
      },
      {
        id: 'intermediate-cpp-03', title: 'std::move Tidak Menghapus const', chapter: 0, type: 'quiz', language: 'text',
        intro: ['std::move adalah cast yang mengizinkan ekspresi diperlakukan sebagai rvalue; ia tidak sendiri memindahkan byte atau memanggil destructor. Operasi yang benar-benar dipilih tetap ditentukan oleh overload dan kualifikasi tipe. Karena itu nama move tidak menjamin konstruktor move akan digunakan.', 'Konstruktor move umum menerima T&& agar dapat mengubah sumber. Jika sumber const, std::move menghasilkan const T&& yang tidak dapat diikat ke T&& non-const. Konstruktor copy yang menerima const T& masih dapat digunakan, sehingga kode terlihat memindah tetapi sebenarnya menyalin.'],
        example: 'C++17; header <string> dan <utility>.\nconst std::string asal = "arsip";\nstd::string tujuan = std::move(asal);',
        task: ['Operasi apa yang dipilih untuk membentuk tujuan?'], options: ['Copy string, karena move constructor biasa tidak menerima sumber const', 'Move string sambil menghapus const dari asal', 'Pemindahan paksa yang pasti mengosongkan asal', 'Kesalahan sintaks karena std::move hanya boleh pada unique_ptr'], answer: 0,
        hints: ['Cast rvalue mempertahankan kualifikasi const.', 'const reference pada copy constructor dapat menerima ekspresi tersebut.'],
        explanation: 'Konstruktor copy dipilih. std::move(asal) bertipe const std::string&&, sedangkan move constructor membutuhkan std::string&&. Isi asal tetap arsip; std::move bukan perintah untuk mengabaikan kontrak const.', xp: 15
      },
      {
        id: 'intermediate-cpp-04', title: 'Const Reference Bukan Snapshot', chapter: 1, type: 'quiz', language: 'text',
        intro: ['const reference melarang mutasi melalui jalur akses itu, tetapi tidak selalu membuat objek yang dirujuk menjadi immutable. Jika objek aslinya non-const, alias lain yang sah masih boleh mengubahnya. Pembacaan melalui const reference kemudian melihat keadaan objek yang sama.', 'Kontrak ini berbeda dari membuat salinan untuk membekukan nilai. Ia juga tidak memberi sinkronisasi antarthread. Dalam contoh satu thread, perubahan sah melalui pemilik terlihat berurutan; dalam konkurensi, validitas alias dan kualifikasi const tidak menggantikan aturan data race.'],
        example: 'C++17, satu thread.\nstd::vector<int> nilai{4, 8};\nconst std::vector<int>& lihat = nilai;\nnilai[0] = 6;\nint hasil = lihat[0];',
        task: ['Apa nilai hasil dan alasan yang tepat?'], options: ['4, karena const reference membekukan keadaan awal', 'Tidak terdefinisi, karena semua perubahan objek beralias const dilarang', '6, karena lihat merujuk vector yang sama tanpa menyalinnya', '0, karena akses const menginisialisasi ulang elemen'], answer: 2,
        hints: ['Objek nilai sendiri tidak dideklarasikan const.', 'Tidak ada operasi pembentukan vector baru saat lihat diikat.'],
        explanation: 'hasil bernilai 6. const membatasi operasi melalui lihat, bukan perubahan melalui nilai yang tetap non-const. Snapshot mandiri memerlukan penyalinan atau rancangan data immutable yang sesuai.', xp: 15
      },
      {
        id: 'intermediate-cpp-05', title: 'Erase Membatalkan Iterator Mulai dari Titiknya', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Validitas iterator vector tidak hanya bergantung pada alokasi ulang. Erase menggeser elemen berikutnya dan membatalkan iterator serta referensi pada atau sesudah posisi yang dihapus, termasuk end lama. Iterator yang menunjuk sebelum posisi penghapusan tetap valid.', 'Alamat yang tampak masih berada di buffer bukan bukti bahwa iterator lama boleh digunakan. Kontrak container menentukan validitasnya. Untuk melanjutkan loop setelah penghapusan, iterator hasil erase biasanya merupakan jalur yang tepat, bukan menaikkan iterator lama yang sudah invalid.'],
        example: 'C++17; vector berisi {10, 20, 30, 40}.\na = v.begin();\nb = v.begin() + 2;\ne = v.end();\nv.erase(v.begin() + 1);\n// Tidak ada pemakaian iterator invalid dalam cuplikan ini.',
        task: ['Iterator lama mana yang masih dijamin valid setelah erase?'], options: ['a, b, dan e karena kapasitas tidak berubah', 'Hanya a', 'a dan e, tetapi bukan b', 'Tidak ada, karena erase selalu membatalkan seluruh iterator'], answer: 1,
        hints: ['Posisi yang dihapus adalah elemen kedua.', 'end lama juga berada sesudah posisi penghapusan.'],
        explanation: 'Hanya a menunjuk sebelum titik erase. b dan e invalid walaupun buffer tidak dialokasikan ulang. Kapasitas yang cukup bukan jaminan untuk iterator pada elemen yang digeser.', xp: 15
      },
      {
        id: 'intermediate-cpp-06', title: 'Menyiapkan Pengganti Sebelum Commit Keadaan', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Basic exception guarantee menjaga invariant dan mencegah kebocoran, tetapi nilai objek boleh berubah setelah gagal. Strong guarantee lebih ketat: operasi yang gagal tidak memiliki efek yang dapat diamati pada keadaan sasaran. No-throw guarantee menyatakan operasi tidak melempar sama sekali.', 'Pola menyiapkan salinan sementara lalu melakukan swap tanpa exception dapat memberi strong guarantee. Semua langkah yang mungkin gagal dilakukan sebelum keadaan lama diganti. Syarat pentingnya adalah efek samping lain tidak bocor dan langkah commit benar-benar tidak melempar.'],
        example: 'Kontrak konseptual C++17 untuk penyimpanan dalam memori.\n1. Bangun calon dari salinan keadaan lama.\n2. Validasi dan ubah calon; keduanya boleh melempar, tanpa efek eksternal.\n3. swap keadaan dengan calon; swap dijamin noexcept.\nDestructor calon juga tidak melempar.',
        task: ['Jaminan apa yang diberikan operasi ini terhadap keadaan sasaran?'], options: ['Hanya basic, karena setiap operasi yang bisa melempar pasti mengubah sasaran', 'No-throw, karena swap tidak melempar', 'Tidak ada jaminan, karena ada objek sementara', 'Strong: kegagalan sebelum swap membiarkan sasaran tetap seperti semula'], answer: 3,
        hints: ['Keadaan lama belum disentuh ketika calon sedang disiapkan.', 'Langkah persiapan tetap boleh melempar, sehingga keseluruhan operasi bukan no-throw.'],
        explanation: 'Pola tersebut memberi strong guarantee dengan asumsi yang dinyatakan. Kegagalan persiapan hanya membuang calon, sedangkan commit swap tidak gagal. Noexcept pada satu langkah tidak membuat seluruh operasi menjadi no-throw.', xp: 15
      }
    ]
  },
  {
    id: 'intermediate-c-sharp', trackId: 'c-sharp', title: 'Intermediate C#', category: 'Computer Science', level: 'Menengah', theme: 'purple', symbol: 'C#',
    description: 'Kuis konsep C# tentang nullable reference, generic, IDisposable, materialisasi LINQ, pembatalan Task, dan record immutable. Contoh data memori hanya dianalisis, tanpa kompiler atau eksekusi lingkungan.',
    chapters: [
      { title: 'Kontrak Tipe dan Umur', description: 'Menilai peringatan null, variance generic, serta kepemilikan objek disposable.' },
      { title: 'Nilai dan Waktu Evaluasi', description: 'Memahami kedalaman snapshot, pembatalan kooperatif, dan pembaruan record tanpa mutasi.' }
    ],
    lessons: [
      {
        id: 'intermediate-c-sharp-01', title: 'Operator Penekan Null Bukan Pemeriksaan', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Nullable reference types memberi analisis statis tentang kemungkinan null, bukan representasi objek baru yang otomatis menolak null saat runtime. Tanda ! setelah ekspresi meminta kompiler mempercayai programmer dan menekan peringatan tertentu. Ia tidak menyisipkan validasi atau membuat nilai pengganti.', 'Pemeriksaan pola atau guard clause dapat mempersempit keadaan null yang diketahui dan memberi perilaku runtime yang nyata. Gunakan penekanan peringatan hanya jika invariant benar-benar dibuktikan oleh konteks lain. Menyembunyikan peringatan tidak memperbaiki data yang memang kosong.'],
        example: 'C# dengan nullable reference types aktif.\nstring? kode = null;\n// Usulan yang sedang direview: int panjang = kode!.Length;\n// Kebutuhan: nilai null harus menghasilkan panjang 0.',
        task: ['Pengganti mana memenuhi kebutuhan sekaligus menangani null secara nyata?'], options: ['int panjang = kode!.Length;', 'int panjang = ((string)kode).Length;', 'int panjang = kode is string isi ? isi.Length : 0;', 'int panjang = kode.Length!;'], answer: 2,
        hints: ['! tidak mengubah nilai runtime kode.', 'Pola is string hanya berhasil untuk referensi string yang bukan null.'],
        explanation: 'Pola tersebut memilih 0 saat kode null dan membaca Length hanya ketika ada string. Null-forgiving maupun cast tidak menciptakan objek; dereference null pada usulan awal tetap menimbulkan NullReferenceException.', xp: 15
      },
      {
        id: 'intermediate-c-sharp-02', title: 'Variance Mengikuti Arah Pemakaian Tipe', chapter: 0, type: 'quiz', language: 'text',
        intro: ['List<T> bersifat invariant karena menyediakan pembacaan dan penulisan elemen. Jika List<string> dapat diperlakukan sebagai List<object>, pemakai dapat memasukkan objek bukan string dan merusak kontrak daftar asal. Kesamaan hierarki elemen tidak otomatis diwariskan ke semua generic container.', 'Interface penghasil seperti IEnumerable<out T> dapat kovarian untuk konversi tipe referensi. Sebuah urutan string aman dibaca sebagai urutan object karena setiap string adalah object. Variance ini tidak memberi izin menulis elemen object ke sumber dan tidak berlaku dengan cara yang sama untuk tipe nilai seperti int.'],
        example: 'C#; using System.Collections.Generic.\nList<string> nama = new() { "Nara", "Dito" };\n// Konsumen hanya perlu membaca setiap elemen sebagai object.',
        task: ['Penugasan mana valid tanpa menyalin isi koleksi?'], options: ['IEnumerable<object> lihat = nama;', 'List<object> lihat = nama;', 'ICollection<object> lihat = nama;', 'IList<object> lihat = nama;'], answer: 0,
        hints: ['Cari interface yang hanya menghasilkan T dan mendeklarasikan out T.', 'Interface yang membolehkan Add dengan object akan mengancam daftar string.'],
        explanation: 'IEnumerable<string> dapat dikonversi secara kovarian ke IEnumerable<object>. List, ICollection, dan IList pada pilihan lain invariant. Konversi ini mengubah antarmuka pembacaan, bukan membuat daftar baru.', xp: 15
      },
      {
        id: 'intermediate-c-sharp-03', title: 'Using Tidak Mencabut Semua Alias', chapter: 0, type: 'quiz', language: 'text',
        intro: ['IDisposable menyatakan operasi pelepasan sumber daya yang deterministik. Using memanggil Dispose saat scope berakhir, termasuk jalur exception, tetapi tidak menghapus objek dari memori atau menetapkan semua referensi lain menjadi null. Garbage collection dan disposal memiliki tujuan berbeda.', 'Alias terhadap objek disposable masih dapat tersimpan setelah scope pemilik berakhir. Karena itu kepemilikan perlu jelas: peminjam tidak boleh menganggap sumber daya tetap dapat digunakan setelah pemilik menutupnya. Perilaku anggota setelah disposal bergantung pada kontrak tipe, bukan hanya keberadaan referensi.'],
        example: 'C#; contoh sumber daya memori, bukan berkas.\nSystem.IO.MemoryStream alias;\nusing (var stream = new System.IO.MemoryStream(new byte[] { 5 }))\n{\n    alias = stream;\n}\n// Pertimbangkan pemanggilan alias.ReadByte() setelah blok.',
        task: ['Apa perilaku ReadByte menurut kontrak MemoryStream setelah disposal?'], options: ['Membaca 5 karena alias mencegah disposal', 'Menghasilkan -1 karena Dispose sama dengan mencapai akhir stream', 'Membuat salinan stream baru yang masih terbuka', 'Melempar ObjectDisposedException meskipun alias tidak null'], answer: 3,
        hints: ['Using menutup objek yang sama dengan yang dirujuk alias.', 'Referensi hidup tidak menjamin sumber daya masih terbuka.'],
        explanation: 'ReadByte memerlukan stream terbuka dan melempar ObjectDisposedException setelah Dispose. Alias tidak otomatis menjadi null maupun memperpanjang masa pakai sumber daya. Aturan anggota lain harus dinilai dari kontrak MemoryStream masing-masing.', xp: 15
      },
      {
        id: 'intermediate-c-sharp-04', title: 'Materialisasi Membekukan Keanggotaan, Bukan Objek', chapter: 1, type: 'quiz', language: 'text',
        intro: ['ToList pada LINQ to Objects langsung mengenumerasi sumber dan membuat daftar hasil. Keanggotaan serta urutan hasil pada saat itu menjadi tersimpan, tetapi untuk elemen berupa objek referensi, daftar baru biasanya menyimpan referensi yang sama. Materialisasi bukan penyalinan mendalam.', 'Perubahan properti pada objek yang sudah masuk hasil dapat terlihat melalui kedua daftar. Predicate Where juga tidak dievaluasi ulang otomatis hanya karena properti berubah. Jika snapshot nilai yang terisolasi dibutuhkan, proyeksikan ke nilai immutable atau salinan yang kedalamannya sesuai kebutuhan.'],
        example: 'C#; Barang adalah class mutable dengan properti int Stok.\nvar barang = new Barang { Stok = 2 };\nvar sumber = new List<Barang> { barang };\nvar snapshot = sumber.Where(b => b.Stok > 0).ToList();\nbarang.Stok = 0;\nsumber.Clear();',
        task: ['Apa pasangan snapshot.Count dan snapshot[0].Stok setelah semua langkah?'], options: ['0 dan tidak ada elemen karena Clear merambat', '1 dan 0', '1 dan 2', '0 dan tidak ada elemen karena predicate dijalankan ulang'], answer: 1,
        hints: ['Daftar hasil berbeda dari sumber, tetapi elemen di dalamnya adalah referensi yang sama.', 'Where sudah selesai dievaluasi ketika ToList selesai.'],
        explanation: 'snapshot tetap memiliki satu elemen, dan objek itu kini memiliki Stok 0. Clear hanya menghapus keanggotaan pada sumber. Untuk membekukan stok 2, snapshot harus menyimpan salinan nilai, bukan referensi Barang mutable yang sama.', xp: 15
      },
      {
        id: 'intermediate-c-sharp-05', title: 'Permintaan Batal Tidak Memaksa Task Berhenti', chapter: 1, type: 'quiz', language: 'text',
        intro: ['CancellationToken menyampaikan permintaan pembatalan secara kooperatif. Cancel pada sumber token tidak menghentikan thread secara paksa dan tidak mengubah semua Task terkait menjadi canceled. Kode harus memeriksa token atau meneruskannya ke operasi yang mendukung pembatalan.', 'Operasi yang sudah menyelesaikan seluruh pekerjaan dapat tetap menghasilkan sukses meskipun permintaan batal datang. Kontrak harus menjelaskan titik pemeriksaan yang bermakna. Untuk loop terbatas, pemeriksaan di antara unit kerja memungkinkan penghentian tanpa meninggalkan invariant dalam keadaan setengah diperbarui.'],
        example: 'C#; metode tidak membaca token.\nstatic async Task<int> HitungAsync(CancellationToken token)\n{\n    await Task.Yield();\n    return 12;\n}\n// Token sudah diminta batal sebelum pemanggilan; tidak ada exception lain.',
        task: ['Apa hasil await HitungAsync(token) menurut badan metode tersebut?'], options: ['Selalu melempar karena parameter bertipe CancellationToken', 'Menghasilkan 0 sebagai nilai default pembatalan', 'Menghasilkan 12 dengan penyelesaian sukses', 'Task tidak pernah selesai sampai token diaktifkan kembali'], answer: 2,
        hints: ['Task.Yield tidak menerima token dari parameter metode.', 'Tipe parameter tidak menyisipkan ThrowIfCancellationRequested secara otomatis.'],
        explanation: 'Metode tetap mengembalikan 12 karena tidak mengamati permintaan pembatalan. Token canceled bukan interupsi paksa. Implementasi yang ingin menghormatinya perlu menetapkan titik pemeriksaan atau memakai operasi yang menerima token.', xp: 15
      },
      {
        id: 'intermediate-c-sharp-06', title: 'Pembaruan Record Tanpa Mengubah Nilai Lama', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Record class menyediakan kesetaraan berbasis nilai untuk anggotanya dan mendukung ekspresi with untuk membuat salinan dengan perubahan terpilih. Pada positional record sederhana, properti init membatasi penetapan setelah inisialisasi. Pola ini memudahkan menyimpan keadaan sebelum dan sesudah pembaruan.', 'Record tidak otomatis menjadikan seluruh grafik objek immutable. Namun record yang hanya memuat string immutable dan int dapat dipakai sebagai nilai yang tidak dimutasi dalam rancangan ini. With bersifat dangkal; jika anggota berupa daftar mutable, kedua versi masih dapat berbagi daftar tersebut.'],
        example: 'C# modern.\npublic record Skor(string Nama, int Poin);\nvar awal = new Skor("Laras", 8);\nvar baru = awal with { Poin = 11 };\nvar setara = new Skor("Laras", 8);',
        task: ['Pernyataan mana benar untuk ketiga record?'], options: ['awal.Poin tetap 8 dan awal == setara bernilai true', 'awal.Poin menjadi 11 karena with mengedit instance asal', 'awal == setara bernilai false karena selalu membandingkan identitas', 'baru dan awal adalah instance yang sama dengan dua nilai Poin'], answer: 0,
        hints: ['With menghasilkan objek hasil pembaruan, bukan mengubah awal.', 'Operator kesetaraan record membandingkan nilai anggota yang relevan.'],
        explanation: 'awal tetap menyimpan Poin 8 dan setara memiliki nilai anggota yang sama, sehingga kesetaraan record bernilai true. baru merupakan instance berbeda dengan Poin 11. Keamanan berbagi anggota di sini berasal dari string dan int, bukan jaminan deep immutability semua record.', xp: 15
      }
    ]
  },
  {
    id: 'expert-command-line', trackId: 'command-line', title: 'Expert Command Line', category: 'Computer Science', level: 'Expert', theme: 'green', symbol: 'CLI',
    description: 'Kuis konsep Bash tentang framing stream, batas proses, pengecualian errexit, sinyal, dan trap pembersihan. Semua contoh terbatas dan lokal untuk dianalisis, bukan instruksi eksekusi shell atau tindakan pada berkas pengguna.',
    chapters: [
      { title: 'Batas Data dan Proses', description: 'Mempertahankan nama dengan delimiter tepat serta memahami kehilangan data dan scope pada pipeline.' },
      { title: 'Kegagalan yang Dirancang', description: 'Menganalisis status bersyarat, penghentian konsumen, dan pembersihan terpusat tanpa menutupi kegagalan.' }
    ],
    lessons: [
      {
        id: 'expert-command-line-01', title: 'Nama Berbaris Baru Memerlukan Framing', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Pada model path POSIX, baris baru boleh menjadi bagian nama, sedangkan byte NUL tidak boleh berada di dalam nama. Protokol satu nama per baris karena itu tidak cukup untuk semua path sah. Delimiter NUL memberi batas record yang tidak ambigu untuk domain tersebut.', 'Dalam Bash, read -r mencegah pemrosesan backslash dan -d dengan string kosong memilih delimiter NUL. IFS kosong mencegah pemangkasan whitespace tepi. Stream berdelimiter NUL harus mengalir langsung antartahap; variabel string Bash bukan wadah untuk menyimpan byte NUL di tengah data.'],
        example: 'Bash, data literal saja; tidak membuka path.\njumlah=0\nwhile IFS= read -r -d "" path; do\n    jumlah=$((jumlah + 1))\ndone < <(printf "%s\\0" $\'./dua\\nbaris.txt\' "./akhir.txt")\n# Ekspansi $\'...\' membentuk nama pertama dengan satu newline di tengah.',
        task: ['Berapa record yang dibaca, dan bagaimana newline pada nama pertama diperlakukan?'], options: ['Tiga record karena setiap newline menjadi batas', 'Dua record, tetapi newline dihapus oleh read -r', 'Satu record karena NUL digabung ke nama pertama', 'Dua record; newline tetap bagian nama pertama'], answer: 3,
        hints: ['Delimiter read di sini NUL, bukan newline.', 'Format printf menambahkan satu NUL sesudah setiap argumen nama.'],
        explanation: 'Loop membaca dua record utuh. Newline internal tidak menjadi delimiter dan dipertahankan. IFS=, -r, serta -d "" menyelesaikan masalah yang berbeda; menghilangkan salah satunya dapat mengubah nama tertentu.', xp: 15
      },
      {
        id: 'expert-command-line-02', title: 'Substitusi Perintah Bukan Kanal Byte Transparan', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Substitusi perintah Bash mengumpulkan stdout menjadi teks, tetapi membuang seluruh newline di bagian akhir hasil. Mengutip ekspansinya mencegah pemisahan kata setelah pengumpulan, bukan membatalkan penghilangan newline yang sudah terjadi. Kehilangan itu dapat merusak protokol yang membedakan payload berdasarkan byte terakhir.', 'Untuk pengolahan byte yang harus persis, gunakan aliran langsung dengan framing yang disepakati, bukan memaksa payload melalui variabel shell. Sentinel kadang membantu kasus teks tertentu, tetapi harus memiliki kontrak yang benar; ia tidak menjadikan variabel Bash mampu menyimpan byte NUL.'],
        example: 'Skenario Bash dengan dua payload berbeda.\nPayload A: byte h, i.\nPayload B: byte h, i, newline, newline.\nKeduanya ditangkap lewat nilai=$(penghasil) dan kemudian diteruskan sebagai "$nilai".\nPenghasil lokal hanya mengirim payload yang ditetapkan dan selesai.',
        task: ['Mengapa penerima tidak dapat membedakan kedua payload setelah penangkapan itu?'], options: ['Substitusi perintah membuang semua karakter whitespace, termasuk spasi internal', 'Keduanya menjadi hi karena newline di ujung dibuang sebelum ekspansi berkuotasi', 'Kutipan ganda menambahkan dua newline pada payload A', 'Exit status penghasil menggantikan seluruh stdout dengan angka'], answer: 1,
        hints: ['Yang dihapus adalah newline di ujung, bukan setiap whitespace di seluruh teks.', 'Informasi yang sudah hilang tidak dipulihkan oleh kutipan saat pemanggilan berikutnya.'],
        explanation: 'Kedua hasil variabel menjadi string hi. Kutipan menjaga batas argumen tetapi tidak menjaga byte newline yang dibuang oleh command substitution. Desain protokol byte sebaiknya mempertahankan stream dan delimiting dari awal sampai akhir.', xp: 15
      },
      {
        id: 'expert-command-line-03', title: 'Lokasi Loop Menentukan Pemilik Keadaan', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Bash biasanya menjalankan setiap komponen pipeline dalam lingkungan subshell. Variabel yang diubah di sana tidak ditulis kembali ke shell induk. Opsi lastpipe dapat mengubah perilaku tahap terakhir dalam kondisi tertentu, sehingga asumsi opsi harus disebutkan saat menalar hasil.', 'Redirection dari process substitution memungkinkan loop berjalan pada shell saat ini, sementara penghasil data berjalan terpisah. Ini memindahkan tempat akumulasi keadaan tanpa menganggap proses anak dapat mengekspor variabel ke induknya. Komunikasi antarproses tetap memerlukan kanal eksplisit seperti stream.'],
        example: 'Bash; lastpipe nonaktif dan tidak memakai errexit. Kedua kasus mulai dari n=0.\nKasus A:\nprintf "%s\\n" satu dua tiga | while IFS= read -r baris; do n=$((n+1)); done\nKasus B:\nwhile IFS= read -r baris; do n=$((n+1)); done < <(printf "%s\\n" satu dua tiga)\n# Amati n di shell induk setelah masing-masing kasus selesai.',
        task: ['Apa nilai n pada kasus A dan B di shell induk?'], options: ['0 dan 3', '3 dan 3', '3 dan 0', '0 dan 0'], answer: 0,
        hints: ['Pada A, loop adalah komponen pipeline yang memiliki lingkungan subshell.', 'Pada B, loop tidak berada di dalam pipeline; hanya sumber inputnya yang terpisah.'],
        explanation: 'Kasus A mengubah n milik subshell sehingga induk tetap 0. Kasus B mengubah n pada shell induk menjadi 3. Perbedaan ini menyangkut kepemilikan keadaan proses, bukan jumlah baris yang dihasilkan.', xp: 15
      },
      {
        id: 'expert-command-line-04', title: 'Errexit Dipengaruhi Konteks Pengujian', chapter: 1, type: 'quiz', language: 'text',
        intro: ['set -e pada Bash bukan sistem exception yang seragam. Ada konteks tempat status gagal justru sedang diuji, seperti kondisi if, sehingga shell tidak langsung keluar. Jika sebuah fungsi dipanggil dalam konteks yang mengabaikan errexit, perintah dalam badan fungsi itu juga dapat berjalan tanpa penghentian yang dibayangkan penulisnya.', 'Fungsi penting perlu meneruskan kegagalan secara eksplisit daripada berharap set -e akan selalu menghentikan setiap langkah. Pesan penutup yang berhasil dapat membuat status fungsi menjadi nol dan menyembunyikan kegagalan sebelumnya. Analisis ini memerlukan konteks pemanggilan, bukan hanya membaca badan fungsi.'],
        example: 'Bash, cuplikan analisis; semua printf berhasil.\nset -e\nperiksa() {\n    false\n    printf "%s\\n" "langkah berikutnya"\n}\nif periksa; then\n    printf "%s\\n" "cabang sukses"\nfi',
        task: ['Apa perilaku cuplikan tersebut dalam konteks if ini?'], options: ['Shell langsung keluar pada false sebelum mencetak apa pun', 'Fungsi berhenti pada false, lalu if tetap masuk cabang sukses', 'Kedua pesan tercetak karena errexit diabaikan dalam konteks pengujian fungsi ini', 'Hanya langkah berikutnya tercetak, karena status fungsi selalu status perintah pertamanya'], answer: 2,
        hints: ['Pemanggilan periksa merupakan kondisi if.', 'Tanpa return eksplisit, status fungsi berasal dari perintah terakhir yang dijalankan.'],
        explanation: 'False tidak menghentikan badan fungsi dalam konteks tersebut. Printf terakhir berhasil sehingga fungsi mengembalikan nol dan cabang sukses berjalan. Pola pemeriksaan eksplisit seperti langkah || return menjaga propagasi kegagalan tanpa bergantung pada pengecualian errexit.', xp: 15
      },
      {
        id: 'expert-command-line-05', title: 'Konsumen Selesai Dulu Dapat Memicu SIGPIPE', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Ketika konsumen menutup ujung baca pipe lebih awal, produsen yang masih menulis dapat menerima SIGPIPE. Ini bisa merupakan konsekuensi wajar dari operasi mengambil sebagian data, bukan bukti bahwa produsen gagal memahami input. Timing dan buffering menentukan apakah penulisan berikutnya benar-benar menemui pipe tertutup.', 'Pipefail membuat status produsen tersebut terlihat pada status pipeline walaupun konsumen selesai sukses. Kontrak sistem harus membedakan penghentian awal yang disengaja dari kerusakan data. Menelan semua kegagalan sama kelirunya dengan menganggap semua SIGPIPE sebagai kegagalan bisnis yang identik.'],
        example: 'Skenario Bash fiktif dengan pipefail aktif.\nProdusen hanya memiliki 100 record lokal, jadi pekerjaan terbatas.\nKonsumen mengambil satu record lalu menutup pipe dengan status 0.\nPengamatan yang ditetapkan: produsen kemudian menerima SIGPIPE dan status shell-nya 141; PIPESTATUS adalah [141, 0].',
        task: ['Kesimpulan mana paling tepat dari pengamatan tersebut?'], options: ['Pipeline berstatus 141; nilai itu perlu ditafsirkan terhadap kontrak konsumsi parsial', 'Pipeline berstatus 0 karena konsumen selalu menentukan hasil saat pipefail aktif', 'Produsen pasti menghasilkan record pertama yang salah', 'Menonaktifkan semua pemeriksaan error adalah satu-satunya solusi yang benar'], answer: 0,
        hints: ['Gunakan status yang benar-benar diamati, bukan menganggap SIGPIPE selalu muncul pada setiap ukuran data.', 'Konsumen sengaja berhenti setelah satu record.'],
        explanation: 'Dengan status yang diberikan, pipefail menghasilkan 141. Itu menunjukkan produsen terputus oleh penutupan pipe, bukan otomatis salah data. Penanganan harus khusus pada kontrak penghentian awal, tanpa menyembunyikan kegagalan lain yang tidak diharapkan.', xp: 15
      },
      {
        id: 'expert-command-line-06', title: 'Trap Terpusat Menjaga Status dan Pembersihan', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Trap EXIT dapat memusatkan pembersihan saat Bash keluar normal melalui exit, sedangkan trap TERM dapat menerjemahkan sinyal menjadi keputusan keluar yang terkontrol. Handler harus menyimpan $? sebelum operasi pencatatan atau pembersihan mengubahnya. Pembersihan idempoten juga memudahkan jalur yang mungkin dipanggil lebih dari sekali.', 'Trap bukan jaminan universal: SIGKILL tidak dapat ditangkap, dan kegagalan mesin dapat melewati seluruh handler. Dalam cuplikan pendidikan ini, pembersihan hanya mengubah flag memori. Tidak ada penghapusan berkas atau pengiriman sinyal sungguhan; kita hanya menelusuri jalur kejadian yang dinyatakan.'],
        example: 'Bash, skenario saja.\naktif=1\nbersih() { aktif=0; printf "%s\\n" "sumber lokal dilepas"; }\ntrap \'rc=$?; trap - EXIT; bersih; exit "$rc"\' EXIT\ntrap \'exit 143\' TERM\n# Diasumsikan satu TERM ditangani saat shell berada di titik aman.\n# Tidak ada sinyal tambahan; printf berhasil.',
        task: ['Apa hasil jalur TERM tersebut untuk pemanggilan bersih dan status akhir?'], options: ['bersih tidak dipanggil karena TERM selalu melewati EXIT', 'bersih dipanggil sekali, tetapi status menjadi 0 dari printf', 'bersih dipanggil dua kali dan status akhir menjadi 1', 'bersih dipanggil sekali dan status akhir tetap 143'], answer: 3,
        hints: ['Handler TERM memanggil exit 143, yang memicu handler EXIT.', 'rc disimpan sebelum bersih dan trap EXIT dinonaktifkan sebelum exit terakhir.'],
        explanation: 'EXIT menyimpan 143, menonaktifkan trap EXIT, menjalankan bersih sekali, lalu keluar dengan rc yang disimpan. Keberhasilan printf tidak menutupi status akhir. Jaminan ini hanya untuk jalur tertangani yang dinyatakan, bukan SIGKILL atau semua kegagalan proses.', xp: 15
      }
    ]
  },
  {
    id: 'expert-git-github', trackId: 'git-github', title: 'Expert Git & GitHub', category: 'Computer Science', level: 'Expert', theme: 'orange', symbol: 'Git',
    description: 'Kuis konsep investigasi riwayat Git, ancestry, revert merge, commit atomik, batas provenance, dan respons rahasia terpapar. Semua repositori dan insiden adalah skenario fiktif; tidak ada eksekusi shell, Git, atau operasi akun nyata.',
    chapters: [
      { title: 'Bukti dari Riwayat', description: 'Menilai prasyarat bisect, titik temu DAG, dan makna pembatalan merge terhadap ancestry.' },
      { title: 'Riwayat yang Dapat Dipercaya', description: 'Merancang unit perubahan yang dapat diuji serta membatasi klaim tanda tangan dan pemulihan insiden.' }
    ],
    lessons: [
      {
        id: 'expert-git-github-01', title: 'Bisect Membutuhkan Predikat yang Dapat Diulang', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Bisect mempersempit rentang antara commit good dan bad menggunakan hasil pengujian di titik tengah. Penalaran hasilnya bergantung pada predikat yang konsisten dan batas perubahan perilaku yang sesuai dengan pencarian. Tes yang bergantung waktu, jaringan, atau cache berbeda dapat menandai commit sama sebagai dua keadaan yang bertentangan.', 'Commit yang tidak bisa diuji karena masalah fixture berbeda dari commit yang memperlihatkan regresi sasaran. Penandaan skip mempertahankan ketidakpastian, tetapi terlalu banyak skip dapat membuat pelaku tidak dapat ditentukan secara unik. Fixture lokal, seed tetap, dan isolasi keadaan membantu menghasilkan bukti yang bisa direproduksi.'],
        example: 'Riwayat lokal fiktif C0 sampai C8.\nTes regresi membaca layanan waktu luar: C4 kadang good, kadang bad.\nC5 bahkan tidak dapat membangun fixture akibat perubahan format yang tidak terkait regresi.\nTim belum memiliki predikat deterministik.',
        task: ['Pendekatan mana membuat investigasi bisect paling dapat dipertanggungjawabkan?'], options: ['Anggap semua kegagalan fixture sebagai bad agar pencarian cepat selesai', 'Ganti ketergantungan luar dengan fixture deterministik dan bedakan commit tidak teruji sebagai skip', 'Ulangi tes sampai memperoleh good lalu abaikan semua hasil bad', 'Pilih commit paling baru yang menyentuh berkas tanpa memeriksa perilaku'], answer: 1,
        hints: ['Tidak dapat diuji tidak identik dengan menunjukkan bug yang sedang dicari.', 'Batas good/bad harus berdasarkan predikat yang tetap untuk commit yang sama.'],
        explanation: 'Predikat deterministik mengurangi klasifikasi palsu, sedangkan skip menyatakan ketiadaan bukti secara jujur. Skip dapat menghasilkan beberapa kandidat; bisect tidak menjamin satu pelaku bila data uji ambigu atau regresi hilang-muncul di sepanjang rentang.', xp: 15
      },
      {
        id: 'expert-git-github-02', title: 'Merge-Base Memakai Ancestry, Bukan Waktu', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Merge-base mencari best common ancestor: leluhur bersama yang tidak dikalahkan oleh leluhur bersama lain yang lebih dekat melalui hubungan turunan. Waktu author dan committer tidak menentukan hubungan ini, karena jam dapat berbeda dan metadata waktu bukan sisi DAG.', 'Pada riwayat tertentu, terutama pola criss-cross merge, lebih dari satu merge-base terbaik dapat ada. Pada DAG sederhana, menelusuri himpunan leluhur tiap ujung lalu menghapus kandidat yang merupakan leluhur kandidat bersama lain cukup untuk memahami hasilnya. Kesamaan snapshot tidak termasuk kriteria.'],
        example: 'DAG fiktif, daftar parent lengkap:\nA: tidak ada parent\nB: A\nC: B\nD: B\nM: C dan D\nE: D\nBandingkan ujung M dengan E; timestamp sengaja tidak diberikan.',
        task: ['Commit mana merupakan merge-base terbaik M dan E pada DAG ini?'], options: ['A, karena merupakan akar semua commit', 'B, karena tempat branch pertama kali bercabang', 'M, karena merge commit selalu menjadi basis', 'D, karena leluhur bersama lain adalah leluhur D'], answer: 3,
        hints: ['M memiliki D sebagai salah satu parent, dan E juga memiliki parent D.', 'B memang leluhur bersama, tetapi berada sebelum D.'],
        explanation: 'D adalah leluhur M dan E serta lebih dekat daripada B dan A dalam hubungan ancestry. M bukan leluhur E. Pilihan ini tidak membutuhkan timestamp maupun perbandingan isi berkas.', xp: 15
      },
      {
        id: 'expert-git-github-03', title: 'Revert Merge Tidak Menghapus Ingatan Ancestry', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Untuk membatalkan merge, Git perlu mengetahui parent yang diperlakukan sebagai mainline. Pilihan -m 1 berarti menghitung kebalikan perubahan merge relatif terhadap parent pertama, bukan membatalkan parent pertama itu sendiri. Hasilnya tetap sebuah commit baru dalam riwayat.', 'Revert mengubah isi pohon, tetapi tidak menghapus hubungan merge lama. Commit dari branch fitur yang sudah menjadi leluhur tetap dianggap pernah digabungkan. Menggabungkan ujung fitur yang sama lagi tidak otomatis memperkenalkan kembali perubahan yang telah dibatalkan; pemulihan memerlukan rancangan perubahan yang eksplisit.'],
        example: 'Skenario fiktif:\nM adalah merge dengan parent pertama P di main dan parent kedua F di fitur.\nR adalah revert M relatif ke parent pertama, tanpa konflik.\nMain kini di R; fitur masih tepat di F dan tidak memiliki commit baru.',
        task: ['Mengapa merge ulang F ke main tidak otomatis mengembalikan efek fitur?'], options: ['F tetap leluhur R melalui M, walaupun perubahan isi M sudah dibatalkan', 'Revert mengganti ID F sehingga Git tidak dapat menemukannya', 'Opsi -m 1 menghapus branch fitur dari semua repositori', 'Git melarang semua merge setelah satu revert'], answer: 0,
        hints: ['Pisahkan efek pada snapshot dari hubungan parent.', 'R tetap mempunyai M di belakangnya dalam riwayat.'],
        explanation: 'Ancestry tetap mencakup F, sehingga tidak ada commit fitur baru untuk diintegrasikan dari ujung yang sama. Mengembalikan efek membutuhkan perubahan baru yang disengaja, misalnya pembatalan revert setelah analisis, bukan menganggap merge lama dilupakan.', xp: 15
      },
      {
        id: 'expert-git-github-04', title: 'Commit Atomik Menjaga Unit Bukti', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Commit atomik menyatakan satu perubahan logis yang dapat dipahami dan diuji sebagai unit. Atomik tidak selalu berarti hanya satu berkas atau beberapa baris. Perubahan API, seluruh pemanggilnya, dan tes kontraknya mungkin harus bergerak bersama agar setiap titik riwayat tetap bermakna.', 'Riwayat yang memisahkan deklarasi dari pembaruan pemanggil tanpa mekanisme kompatibilitas menghasilkan commit yang rusak sementara. Ini menyulitkan bisect dan revert karena kegagalan build bukan lagi bukti regresi sasaran. Refactoring yang tidak terkait sebaiknya dipisahkan agar hubungan sebab-akibat tetap terlihat.'],
        example: 'Rencana perubahan lokal fiktif:\nA. Ubah nama parameter wajib pada API dan perbarui seluruh pemanggil serta tesnya.\nB. Format ulang modul lain yang tidak memakai API itu.\nTidak tersedia shim kompatibilitas untuk nama parameter lama.',
        task: ['Pembagian commit mana paling mendukung bisect dan pembatalan selektif?'], options: ['Satu commit deklarasi, lalu satu commit pemanggil meskipun commit pertama tidak dapat dibangun', 'Satu commit untuk tiap berkas tanpa mempertimbangkan dependensi', 'Satu commit logis untuk A yang dapat diuji, dan commit terpisah untuk B', 'Gabungkan A dan B agar jumlah commit sesedikit mungkin'], answer: 2,
        hints: ['Atomisitas mengikuti satuan perubahan perilaku, bukan jumlah berkas.', 'Pemformatan modul lain tidak diperlukan untuk menjaga kontrak API baru.'],
        explanation: 'API, pemanggil, dan tesnya membentuk unit kompatibilitas yang perlu berubah bersama pada asumsi tanpa shim. Memisahkan format ulang menjaga diff relevan dan memungkinkan pembatalan atau investigasi tanpa perubahan yang tidak terkait.', xp: 15
      },
      {
        id: 'expert-git-github-05', title: 'Tanda Tangan Membatasi Klaim Provenance', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Tanda tangan commit mengikat isi commit yang diverifikasi dengan kunci penandatangan menurut mekanisme kriptografi yang digunakan. Kepercayaan pada identitas pemilik kunci, status pencabutan, dan keamanan kunci tetap merupakan persoalan terpisah. Commit valid secara kriptografis masih dapat berisi bug atau perubahan berbahaya.', 'Tanda tangan sumber juga tidak otomatis menghubungkan biner unduhan dengan sumber tersebut. Hubungan itu membutuhkan bukti proses build, identitas builder, dependensi, dan artefak yang sesuai. Memisahkan provenance sumber dari provenance artefak mencegah label verified dipakai sebagai jaminan keamanan universal.'],
        example: 'Audit fiktif memverifikasi tanda tangan commit K dengan kunci tepercaya.\nSebuah berkas aplikasi bernama hasil-K ditawarkan sebagai build K.\nTidak ada attestation build, pemeriksaan reproduksibilitas, atau bukti pengaitan artefak ke K.',
        task: ['Klaim mana didukung oleh bukti yang tersedia?'], options: ['Biner pasti dibangun dari K karena namanya menyebut K', 'Objek commit K lolos verifikasi tanda tangan; asal biner dan keamanan kode belum terbukti', 'K bebas kerentanan karena kunci penandatangan dipercaya', 'Seluruh dependensi build otomatis ikut ditandatangani oleh tanda tangan commit'], answer: 1,
        hints: ['Objek yang diverifikasi adalah commit, bukan biner dengan nama serupa.', 'Keaslian asal data dan kebenaran perilaku adalah dua sifat berbeda.'],
        explanation: 'Verifikasi mendukung integritas dan keterkaitan commit dengan kunci dalam model kepercayaan audit. Ia tidak membuktikan biner berasal dari commit itu, seluruh dependensi aman, atau kode tidak memiliki kerentanan.', xp: 15
      },
      {
        id: 'expert-git-github-06', title: 'Pemulihan Rahasia Mencakup Salinan Turunan', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Paparan rahasia bukan hanya masalah satu file di ujung branch. Nilai dapat sudah tersalin ke fork, clone, log CI, cache, atau artefak. Menghapus referensi riwayat di satu tempat tidak menjamin seluruh salinan hilang maupun menghentikan penggunaan kredensial yang masih berlaku.', 'Respons yang bertanggung jawab memisahkan containment dari pembersihan dan pencegahan. Pemilik layanan dapat mencabut atau merotasi kredensial, menilai log pemakaian, lalu mengoordinasikan penanganan salinan sesuai kebijakan. Pemeriksaan sebelum commit, redaksi log, dan deteksi rahasia pada CI mengurangi peluang pengulangan tanpa memasukkan rahasia asli ke tes.'],
        example: 'Latihan insiden fiktif, tanpa nilai rahasia nyata.\nToken uji pernah masuk commit dan tercetak di log CI; salinannya mungkin ada di fork.\nTim sudah merencanakan pembersihan riwayat utama, tetapi token belum dicabut.',
        task: ['Prioritas respons mana paling tepat untuk mengurangi dampak sekaligus mencegah pengulangan?'], options: ['Selesaikan pembersihan branch utama dulu lalu anggap semua fork otomatis bersih', 'Ganti nama file token agar alat pencari tidak menemukannya', 'Publikasikan token di tiket agar semua orang dapat memastikan nilai yang sama', 'Koordinasikan pencabutan atau rotasi segera, audit pemakaian dan salinan, lalu perbaiki kontrol pencegahan'], answer: 3,
        hints: ['Kredensial yang masih berlaku dapat digunakan meskipun branch utama sudah bersih.', 'Pencegahan perlu mencakup log dan artefak, bukan hanya isi repository.'],
        explanation: 'Pencabutan atau rotasi melalui pemilik berwenang membatasi pemakaian lanjutan, sementara audit menilai dampak dan lokasi paparan. Pembersihan tetap perlu dikoordinasikan tetapi tidak membuktikan semua clone bersih. Pencegahan harus mencakup alur commit dan keluaran CI tanpa menyebarkan token lagi.', xp: 15
      }
    ]
  },
  {
    id: 'expert-cpp', trackId: 'cpp', title: 'Expert C++', category: 'Computer Science', level: 'Expert', theme: 'blue', symbol: 'C++',
    description: 'Kuis konsep C++17 tentang lifetime view, rule of zero, noexcept, konkurensi, invariant atomik, dan biaya algoritma. Cuplikan adalah bahan analisis lokal termasuk diagnosis kode keliru, bukan eksekusi kompiler atau program.',
    chapters: [
      { title: 'Lifetime dan Operasi Khusus', description: 'Membuktikan umur data non-owning serta memilih komposisi pemilik dan kontrak move yang jujur.' },
      { title: 'Jaminan yang Tidak Otomatis', description: 'Membedakan keamanan kepemilikan, transaksi keadaan bersama, dan kompleksitas menurut kategori iterator.' }
    ],
    lessons: [
      {
        id: 'expert-cpp-01', title: 'View Tidak Memperpanjang Umur Pemilik', chapter: 0, type: 'quiz', language: 'text',
        intro: ['std::string_view hanya menyimpan pandangan non-owning ke urutan karakter. Menyalin view menyalin alamat dan panjang, bukan karakter atau kepemilikannya. Saat string pemilik berakhir atau buffer-nya invalid, view dapat tetap memiliki ukuran yang tampak masuk akal tetapi tidak lagi menunjuk data hidup.', 'Validitas tidak dapat dibuktikan dengan melihat apakah contoh kecil kebetulan mencetak teks yang diharapkan. Small string optimization dan memori yang belum tertimpa dapat menyamarkan bug lifetime. Antarmuka harus mengembalikan nilai owning atau mengikat peminjaman pada pemilik yang jelas masih hidup.'],
        example: 'C++17, cuplikan keliru untuk direview, bukan dieksekusi.\nstd::string_view label() {\n    std::string lokal = "nomor-27";\n    return lokal;\n}\n// Pemanggil ingin menyimpan hasil dan membaca karakternya setelah fungsi kembali.',
        task: ['Perbaikan antarmuka mana menjamin data hasil dimiliki pemanggil tanpa bergantung pada lifetime lokal?'], options: ['Tetap string_view tetapi tambahkan std::move(lokal)', 'Kembalikan const std::string& ke lokal', 'Kembalikan std::string by value', 'Salin string_view dua kali sebelum membaca karakter'], answer: 2,
        hints: ['Perlu ada pemilik karakter yang hidup setelah fungsi selesai.', 'Memindahkan atau menyalin view tidak memindahkan kepemilikan buffer.'],
        explanation: 'std::string by value memberi hasil owning; elision atau move dapat menghindari salinan yang tidak perlu. View dan referensi ke lokal sama-sama tidak memperpanjang lifetime string lokal. Membaca karakter melalui view yang dangling tidak memiliki perilaku terdefinisi.', xp: 15
      },
      {
        id: 'expert-cpp-02', title: 'Rule of Zero Menyerahkan Kontrak ke Anggota', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Rule of zero mendorong tipe menyusun anggota yang sudah mengelola sumber daya, tanpa menulis destructor, copy, atau move khusus jika tidak diperlukan. Operasi khusus implisit mengikuti kemampuan anggota tersebut. Ini mengurangi peluang membebaskan dua kali atau lupa memindahkan satu field baru.', 'Anggota unique_ptr membuat copy biasa tidak tersedia, tetapi dapat dipindahkan. Destructor yang ditulis sendiri, meskipun hanya untuk pencatatan, dapat menekan pembentukan move implisit sehingga perlu penilaian ulang. Tidak menulis operasi khusus dapat menjadi keputusan semantik yang disengaja, bukan kelalaian.'],
        example: 'C++17; header <memory>, <string>, <utility>.\nstruct Paket {\n    std::unique_ptr<int> data;\n    std::string label;\n};\nPaket a{std::make_unique<int>(17), "lokal"};\nPaket b = std::move(a);\n// Tidak ada operasi khusus buatan sendiri pada Paket.',
        task: ['Mengapa pemindahan ini dapat bekerja tanpa move constructor buatan sendiri?'], options: ['Move implisit memindahkan anggota; unique_ptr juga membuat copy biasa tidak tersedia', 'Kompiler menyalin integer mentah lalu membiarkan dua unique_ptr memiliki alamat sama', 'Rule of zero membuat semua anggota bersifat shared ownership', 'Setiap struct selalu dapat disalin meskipun anggotanya melarang copy'], answer: 0,
        hints: ['Operasi khusus implisit memanfaatkan operasi masing-masing anggota.', 'unique_ptr mendukung transfer kepemilikan, bukan duplikasi pemilik tunggal.'],
        explanation: 'Move implisit Paket memindahkan data dan label sesuai kontrak tipenya. b memiliki integer dan a.data menjadi kosong; copy Paket tidak tersedia karena unique_ptr tidak dapat disalin. Tidak menulis destructor membantu mempertahankan pembentukan move implisit pada rancangan ini.', xp: 15
      },
      {
        id: 'expert-cpp-03', title: 'Noexcept Move Menentukan Strategi Relokasi', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Saat vector mengalokasikan ulang, ia perlu membangun elemen di buffer baru tanpa merusak keadaan lama jika proses gagal. Move yang bisa melempar setelah mengubah sumber dapat menyulitkan rollback. Untuk tipe copyable, implementasi dapat memilih copy ketika move tidak noexcept demi mempertahankan strong guarantee.', 'Noexcept adalah janji perilaku, bukan sekadar petunjuk performa yang boleh ditambahkan untuk memaksa optimasi. Exception yang keluar dari fungsi noexcept memanggil std::terminate. Jika tipe hanya bisa dipindah dan move-nya dapat melempar, beberapa jaminan vector pada jalur kegagalan juga menjadi lebih lemah.'],
        example: 'Skenario C++17 dengan T copyable.\nCopy T dapat membentuk salinan tanpa mengubah sumber; move T berpotensi melempar setelah memodifikasi sumber.\nSaat reserve membutuhkan buffer baru, implementasi memilih copy elemen lama.\nPengembang mengusulkan menandai move noexcept tanpa menghapus penyebab exception.',
        task: ['Penilaian mana tepat atas strategi vector dan usulan tersebut?'], options: ['Copy dipilih karena vector tidak pernah mendukung move', 'Noexcept aman ditambahkan karena exception otomatis dialihkan ke copy', 'Exception dari move noexcept otomatis mengembalikan buffer lama', 'Copy membantu rollback; noexcept palsu dapat mengakhiri proses melalui std::terminate'], answer: 3,
        hints: ['Strong guarantee membutuhkan keadaan lama tetap tersedia saat konstruksi buffer baru gagal.', 'Noexcept tidak menangkap exception yang melanggar janjinya.'],
        explanation: 'Copy menjaga sumber lama sehingga buffer baru yang gagal dibangun dapat dibuang. Move yang sungguh tidak melempar memungkinkan relokasi aman tanpa copy, tetapi sekadar mengubah deklarasi tidak memperbaiki implementasi dan dapat memicu std::terminate.', xp: 15
      },
      {
        id: 'expert-cpp-04', title: 'Reference Count Aman Bukan Berarti Payload Aman', chapter: 1, type: 'quiz', language: 'text',
        intro: ['shared_ptr memungkinkan instance pemilik yang berbeda berbagi control block secara aman untuk operasi kepemilikan yang didukung. Jaminan itu tidak otomatis berlaku pada objek yang ditunjuk. Lifetime yang masih sah hanya membuktikan objek belum dihancurkan, bukan bahwa akses bersamaan pada field-nya tersinkronisasi.', 'Dua akses yang bertentangan pada memori non-atomic dari thread berbeda tanpa hubungan happens-before merupakan data race dan menyebabkan undefined behavior. Masalahnya lebih serius daripada sekadar satu increment yang hilang. Payload memerlukan mutex, atomik yang sesuai, atau desain tanpa keadaan mutable bersama.'],
        example: 'C++17, skenario analisis yang tidak dieksekusi.\nstruct Hitung { int nilai = 0; };\nDua shared_ptr terpisah, p dan q, dibuat sebelum thread dimulai dan menunjuk Hitung yang sama.\nThread A melakukan p->nilai++; thread B melakukan q->nilai++;\nTidak ada sinkronisasi di antara increment. Kedua thread kemudian di-join.',
        task: ['Jaminan apa yang sebenarnya berlaku untuk nilai payload?'], options: ['Pasti 2 karena shared_ptr menyinkronkan seluruh objek', 'Tidak ada hasil terdefinisi yang dijamin karena increment payload mengalami data race', 'Pasti 1 karena control block menserialkan penulisan terakhir', 'Join setelah kedua increment secara retroaktif menghilangkan data race'], answer: 1,
        hints: ['p dan q berbeda sebagai objek pemilik, tetapi menunjuk satu int yang sama.', 'Join menunggu penyelesaian; ia tidak mengurutkan dua penulisan yang sudah saling balapan.'],
        explanation: 'Reference counting menjaga lifetime, bukan operasi nilai++. Akses payload tersebut memiliki data race sehingga bukan sekadar hasil 1 atau 2 yang boleh diasumsikan. Sinkronisasi harus melindungi akses yang bertentangan saat terjadi.', xp: 15
      },
      {
        id: 'expert-cpp-05', title: 'Dua Atomik Bukan Satu Transaksi', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Sequential consistency memberi urutan total yang konsisten untuk operasi atomik terkait, tetapi setiap load atau store tetap merupakan operasi tersendiri. Urutan total dapat menyisipkan pembacaan di antara dua pembaruan, sehingga invariant lintas field tidak otomatis terlihat sebagai satu snapshot.', 'Jika pembaca harus melihat dua field dari versi keadaan yang sama, unit sinkronisasi harus mencakup pasangan tersebut. Satu mutex untuk seluruh pembaruan dan pembacaan, atau publikasi satu snapshot immutable dengan protokol lifetime yang benar, dapat membentuk batas konsistensi yang memang dibutuhkan.'],
        example: 'C++17, seluruh operasi atomik memakai memory_order_seq_cst.\nAwal: x=0, y=0. Satu penulis menyimpan x=1 lalu y=1.\nSatu pembaca memuat x lalu y.\nUrutan yang mungkin: load x -> store x -> store y -> load y.\nKebutuhan aplikasi: pembaca harus melihat pasangan (0,0) atau (1,1), bukan campuran.',
        task: ['Perubahan desain mana memenuhi kebutuhan pasangan konsisten tersebut?'], options: ['Mengganti semua operasi dengan relaxed agar pembaca lebih cepat', 'Menambahkan satu fence tanpa mengubah batas dua load terpisah', 'Melindungi kedua store dan kedua load dengan mutex yang sama sebagai dua critical section utuh', 'Mempertahankan seq_cst karena urutan total sudah melarang pasangan campuran'], answer: 2,
        hints: ['Urutan contoh sah dan menghasilkan x lama bersama y baru.', 'Kebutuhan mencakup dua field sekaligus, bukan atomisitas tiap field secara terpisah.'],
        explanation: 'Mutex yang sama untuk seluruh pasangan mencegah pembaca menyela pembaruan maupun penulis menyela snapshot pembaca. Seq_cst saja mengizinkan hasil (0,1) sesuai urutan yang diberikan; fence bukan mekanisme transaksi multi-field.', xp: 15
      },
      {
        id: 'expert-cpp-06', title: 'Perbandingan Logaritmik Dapat Menyembunyikan Langkah Linear', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Kompleksitas algoritma pustaka perlu dibaca menurut operasi yang dihitung dan kategori iterator. std::lower_bound melakukan jumlah perbandingan logaritmik pada rentang terurut, tetapi untuk iterator non-random-access, mencapai titik tengah memerlukan langkah iterator berulang.', 'std::list memiliki iterator bidirectional, bukan random-access. Karena itu lower_bound generik pada list dapat memerlukan jumlah increment linear meskipun perbandingannya logaritmik. Pada vector, akses tengah dapat dihitung langsung. Struktur container menentukan biaya gerak yang tidak terlihat dari nama binary search.'],
        example: 'C++17; std::list<int> terurut berisi n elemen.\nPencarian memakai std::lower_bound(data.begin(), data.end(), target).\nAsumsi perbandingan integer dan satu langkah iterator masing-masing O(1); tidak ada indeks tambahan.',
        task: ['Pasangan batas biaya mana tepat untuk perbandingan dan langkah iterator pada kasus terburuk?'], options: ['O(log n) perbandingan dan O(n) langkah iterator', 'O(log n) perbandingan dan O(log n) langkah iterator', 'O(n) perbandingan dan O(1) langkah iterator', 'O(n²) perbandingan dan O(n²) langkah iterator'], answer: 0,
        hints: ['List tidak dapat menghitung alamat elemen tengah dengan penjumlahan indeks.', 'Bedakan jumlah keputusan membagi rentang dari biaya mencapai posisi keputusan.'],
        explanation: 'lower_bound membatasi perbandingan secara logaritmik, tetapi pergerakan iterator list dapat linear. Mengklaim waktu logaritmik hanya dari jumlah perbandingan mengabaikan biaya navigasi pada container non-random-access.', xp: 15
      }
    ]
  },
  {
    id: 'expert-c-sharp', trackId: 'c-sharp', title: 'Expert C#', category: 'Computer Science', level: 'Expert', theme: 'purple', symbol: 'C#',
    description: 'Kuis konsep C# tentang async disposal, konteks kelanjutan, batas pembatalan, pembaruan thread-safe, query EF secara konseptual, dan profil alokasi. Seluruh contoh dianalisis tanpa kompiler, dependensi EF, koneksi basis data, atau eksekusi lingkungan.',
    chapters: [
      { title: 'Batas Operasi Asinkron', description: 'Menentukan kapan sumber daya selesai dilepas, konteks yang dibutuhkan, dan kapan pembatalan masih sah.' },
      { title: 'Konkurensi dan Biaya Nyata', description: 'Membedakan pembaruan atomik dari callback, lokasi evaluasi query, serta alokasi dari waktu CPU.' }
    ],
    lessons: [
      {
        id: 'expert-c-sharp-01', title: 'Return Tetap Menunggu Async Disposal', chapter: 0, type: 'quiz', language: 'text',
        intro: ['IAsyncDisposable menyediakan DisposeAsync untuk pelepasan yang dapat membutuhkan kelanjutan asinkron. Await using menyusun pelepasan itu pada jalur keluar scope, termasuk ketika badan memilih return. Menentukan nilai kembalian belum berarti Task pemanggil sudah selesai sukses sebelum disposal ditunggu.', 'Pelepasan dapat memiliki kontrak kegagalannya sendiri, dan exception di sana dapat mencegah hasil sukses diterima. Token pembatalan operasi juga tidak otomatis menjadi parameter DisposeAsync. Kebijakan cleanup perlu dirancang agar sumber daya tetap ditangani ketika pekerjaan utama diminta berhenti.'],
        example: 'C# modern; simulasi objek lokal tanpa I/O.\nstatic async Task<int> BacaAsync()\n{\n    await using var lease = new LeaseMemori();\n    return 7;\n}\nLeaseMemori.DisposeAsync menunggu satu langkah simulasi terbatas lalu menandai tertutup.\nPada varian gagal, langkah disposal melempar exception.',
        task: ['Kapan pemanggil menerima hasil 7 dari await BacaAsync()?'], options: ['Segera saat return dijumpai, tanpa menunggu disposal', 'Sebelum disposal, karena DisposeAsync selalu fire-and-forget', 'Setelah DisposeAsync berhasil selesai; jika disposal melempar, await tidak menghasilkan sukses 7', 'Hanya jika pemanggil memanggil DisposeAsync lagi secara manual'], answer: 2,
        hints: ['Await using mengikutsertakan disposal dalam penyelesaian metode.', 'Menghitung nilai return dan menyelesaikan Task adalah dua kejadian berbeda.'],
        explanation: 'Keluar scope menunggu DisposeAsync sebelum metode selesai sukses. Exception disposal diteruskan melalui Task, sehingga 7 tidak diterima sebagai hasil sukses pada varian gagal. Await using tidak mengubah disposal menjadi pekerjaan latar yang boleh diabaikan.', xp: 15
      },
      {
        id: 'expert-c-sharp-02', title: 'ConfigureAwait Bukan Pemilih Thread Tetap', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Await biasa dapat menangkap SynchronizationContext yang relevan, misalnya konteks UI, untuk menjadwalkan kelanjutan. ConfigureAwait(false) menyatakan bahwa kelanjutan await tersebut tidak perlu dikembalikan ke konteks yang ditangkap. Ini bukan perintah untuk selalu membuat thread baru atau memilih satu thread pool tertentu.', 'Kebijakan itu berlaku pada await yang bersangkutan, bukan otomatis pada seluruh rantai pemanggilan. Kode pustaka dapat menghindari ketergantungan pada UI, sementara lapisan UI tetap bertanggung jawab melakukan pembaruan kontrol pada konteks yang benar. Await yang sudah selesai juga dapat berlanjut secara sinkron.'],
        example: 'Skenario C# lokal; tidak ada pemblokiran thread.\nSebuah helper dipanggil dari konteks UI.\nHelper menunggu Task simulasi yang belum selesai memakai ConfigureAwait(false).\nTask diselesaikan sekali oleh pekerja simulasi, lalu helper ingin memperbarui kontrol UI.',
        task: ['Asumsi konteks mana yang aman untuk kode sesudah await di helper?'], options: ['Tidak mengandalkan konteks UI; pembaruan UI perlu dikembalikan melalui lapisan atau mekanisme konteks yang tepat', 'Pasti berada pada thread baru yang khusus dibuat untuk helper', 'Pasti kembali ke UI karena pemanggilan awal berasal dari UI', 'Semua await pada pemanggil juga otomatis kehilangan konteks UI'], answer: 0,
        hints: ['False menghapus kebutuhan kembali ke konteks yang ditangkap, bukan memberi identitas thread baru.', 'Kebijakan penjadwalan perlu dianalisis pada tiap await.'],
        explanation: 'Helper tidak memiliki jaminan berada di UI setelah await tersebut. Lapisan UI dapat menunggu helper dengan kebijakan konteksnya sendiri lalu melakukan pembaruan, atau memakai dispatcher yang sesuai. ConfigureAwait(false) bukan pengaturan global maupun jaminan perpindahan thread.', xp: 15
      },
      {
        id: 'expert-c-sharp-03', title: 'Titik Komit Membatasi Pembatalan', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Pembatalan kooperatif perlu memiliki batas semantik, terutama ketika operasi mengubah keadaan yang dapat diamati. Sebelum commit, pekerjaan persiapan dapat dibuang tanpa efek. Sesudah commit, melempar exception canceled tidak otomatis membatalkan perubahan dan dapat membuat pemanggil salah menganggap tidak ada efek.', 'Kontrak dapat menetapkan bahwa pembatalan hanya dihormati sebelum commit dan hasil yang sudah berhasil harus tetap dilaporkan. Untuk skenario yang mengizinkan percobaan ulang, identitas operasi atau mekanisme idempotensi membantu mencegah efek ganda. Token sendiri bukan transaksi maupun protokol deduplikasi.'],
        example: 'Simulasi transaksi memori, tanpa layanan luar.\nKontrak: permintaan batal diterima hanya sebelum snapshot saldo baru dipublikasikan.\nSnapshot untuk operasi O17 sudah dipublikasikan secara atomik dan hasil sukses sudah diketahui.\nToken baru diminta batal sebelum metode mengembalikan hasil; efek O17 tidak di-rollback.',
        task: ['Perilaku mana sesuai dengan kontrak dan keadaan yang sudah terjadi?'], options: ['Selalu lempar canceled agar status token menjadi satu-satunya sumber kebenaran', 'Kembalikan hasil sukses O17; jangan menyatakan pembatalan tanpa efek setelah commit', 'Jalankan transfer sekali lagi supaya pembatalan terkompensasi', 'Ubah token menjadi tidak batal lalu ulangi semua langkah diam-diam'], answer: 1,
        hints: ['Kontrak menyebut batas pembatalan sebelum publikasi, bukan setiap baris metode.', 'Snapshot sudah berubah dan tidak dibatalkan oleh mekanisme lain.'],
        explanation: 'Hasil sukses harus dilaporkan sesuai kontrak karena operasi sudah committed. ThrowIfCancellationRequested setelah titik ini akan menyampaikan makna yang keliru. Jika kontrak lain membolehkan hasil tidak pasti, ia memerlukan protokol eksplisit, bukan menganggap canceled menjamin nol efek.', xp: 15
      },
      {
        id: 'expert-c-sharp-04', title: 'Callback ConcurrentDictionary Bisa Diulang', chapter: 1, type: 'quiz', language: 'text',
        intro: ['ConcurrentDictionary menjaga operasi pembaruan internal agar aman digunakan bersama, tetapi delegate pada AddOrUpdate dapat dipanggil lebih dari sekali akibat persaingan. Implementasi dapat menghitung calon nilai lalu mencoba lagi karena nilai lama sudah berubah. Callback tidak menjadi transaksi exactly-once hanya karena container thread-safe.', 'Delegate yang murni dapat dihitung ulang tanpa efek tambahan di luar dictionary. Pencatatan kejadian bisnis, pengiriman pesan, atau pengubahan koleksi lain di dalamnya membutuhkan desain terpisah jika jumlah pelaksanaannya penting. Keberhasilan pembaruan dan jumlah percobaan menghitung nilai bukan metrik yang sama.'],
        example: 'C#; dictionary lokal digunakan oleh dua Task terbatas.\ncounts.AddOrUpdate("kuis", 1, (key, old) => {\n    CatatKejadianBisnis();\n    return old + 1;\n});\nKebutuhan: satu kejadian bisnis per operasi yang diterima, bukan per percobaan callback.',
        task: ['Revisi mana paling tepat terhadap callback ini?'], options: ['Pertahankan efek samping karena AddOrUpdate menjamin delegate tepat sekali', 'Ganti return dengan old++ agar callback menjadi atomik seluruhnya', 'Tambahkan delay pada callback agar persaingan pasti hilang', 'Jadikan callback murni dan rancang pencatatan berdasarkan konfirmasi operasi, bukan jumlah panggilan delegate'], answer: 3,
        hints: ['Thread-safe pada container tidak menjamin callback pengguna hanya dicoba sekali.', 'Perhitungan ulang nilai harus aman bila hasil percobaan sebelumnya tidak dipakai.'],
        explanation: 'Callback murni seperti (key, old) => old + 1 aman untuk dicoba ulang. Jika pencatatan perlu terikat tepat pada pembaruan, gunakan protokol atau sinkronisasi yang mencakup keduanya; sekadar menaruh efek samping di delegate tidak memberi jaminan itu.', xp: 15
      },
      {
        id: 'expert-c-sharp-05', title: 'AsEnumerable Memindahkan Batas Evaluasi', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Pada query provider seperti EF, IQueryable membangun ekspresi yang dapat diterjemahkan menjadi operasi penyimpanan. AsEnumerable mengubah antarmuka untuk operator berikutnya menjadi LINQ to Objects; ia sendiri tidak langsung mematerialisasi seluruh hasil. Enumerasi berikutnya tetap memicu pengambilan data dari bagian query provider yang mendahuluinya.', 'Filter dan proyeksi yang dapat diterjemahkan sebaiknya tetap berada sebelum batas lokal bila itu sesuai semantik. Fungsi lokal yang tidak dapat diterjemahkan perlu dijalankan setelah data yang relevan dibatasi. Materi ini menilai model query saja, tanpa memasang EF atau memakai koneksi basis data.'],
        example: 'Skenario provider konseptual: 1.000 baris, hanya 10 Aktif. Provider menerjemahkan Where(Aktif) dan Select(Id).\nA: query.Where(x => x.Aktif).Select(x => x.Id).AsEnumerable().Where(LolosLokal).ToList()\nB: query.AsEnumerable().Where(x => x.Aktif).Select(x => x.Id).Where(LolosLokal).ToList()\nLolosLokal menerima Id dan tidak dapat diterjemahkan provider.',
        task: ['Perbedaan pengambilan data mana benar saat kedua hasil dienumerasi penuh?'], options: ['A dan B pasti meminta semua baris karena keduanya memakai ToList', 'AsEnumerable segera membuat cache sehingga B tidak melakukan query', 'A meminta 10 Id dari provider; B membawa 1.000 baris sebelum filter lokal', 'LolosLokal pada A otomatis diterjemahkan karena ada Where sebelumnya'], answer: 2,
        hints: ['Temukan operator yang masih terikat pada IQueryable sebelum AsEnumerable.', 'Mengubah batas evaluasi tidak sama dengan langsung menjalankan materialisasi.'],
        explanation: 'A menempatkan filter dan proyeksi pada provider sehingga hanya Id dari 10 baris aktif diperlukan. Pada B, filter Aktif baru berjalan secara lokal setelah baris diambil. AsEnumerable bukan ToList, dan fungsi lokal tetap berada di sisi aplikasi.', xp: 15
      },
      {
        id: 'expert-c-sharp-06', title: 'Alokasi dan Waktu CPU Perlu Diukur Terpisah', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Boxing mengubah nilai bertipe value type menjadi objek, yang dapat menambah alokasi saat nilai dimasukkan ke wadah object. Profil alokasi membantu menemukan jumlah dan sumber objek tersebut. Namun banyaknya alokasi tidak langsung menyatakan berapa besar persentase waktu CPU yang dihabiskan pada jalur itu.', 'Pengukuran perlu menggunakan beban representatif, warmup yang cukup, dan metrik yang sesuai seperti byte per operasi, aktivitas GC, serta latensi. Mengganti representasi data dapat mengurangi tekanan memori, tetapi klaim kecepatan harus diverifikasi terpisah. Pooling atau optimasi agresif tidak otomatis lebih baik daripada menghindari boxing yang memang tidak diperlukan.'],
        example: 'C#; batch lokal berisi 1.000 int.\nImplementasi menyimpannya dalam List<object> melalui Add(i).\nProfil setelah warmup menunjukkan boxing Int32 pada jalur Add, sedangkan sebagian besar waktu CPU berada pada serialisasi.\nKontrak tidak membutuhkan elemen heterogen bertipe object.',
        task: ['Eksperimen optimasi mana paling beralasan dari bukti tersebut?'], options: ['Tambahkan Task untuk setiap Add agar boxing dihapus oleh penjadwal', 'Coba List<int> untuk menghindari boxing, lalu ukur alokasi dan latensi secara terpisah', 'Anggap menghapus boxing pasti menghilangkan seluruh waktu serialisasi', 'Aktifkan pooling semua objek tanpa memeriksa biaya dan lifetime-nya'], answer: 1,
        hints: ['Wadah generic bertipe int dapat menyimpan nilai tanpa boxing setiap elemen.', 'Metrik alokasi dan hotspot CPU pada skenario menunjukkan dua biaya berbeda.'],
        explanation: 'List<int> sesuai kontrak dan dapat menghilangkan boxing di jalur penambahan, walaupun backing array dan proses lain masih dapat mengalokasi. Efek pada GC serta latensi perlu diukur; bukti ini tidak menjamin serialisasi atau total waktu menjadi jauh lebih cepat.', xp: 15
      }
    ]
  },
  {
    id: 'expert-java', trackId: 'java', title: 'Expert Java', category: 'Computer Science', level: 'Expert', theme: 'orange', symbol: 'Java',
    description: 'Kuis konsep Java tentang PECS dua arah, suppressed exception, happens-before, virtual thread menurut versi JDK, record, dan collector paralel. Semua contoh lokal untuk dibaca, bukan layanan kompiler atau instruksi menjalankan lingkungan.',
    chapters: [
      { title: 'Kontrak Tipe dan Visibilitas', description: 'Menyusun batas generic, menelusuri kegagalan penutupan, dan membuktikan publikasi antar-thread.' },
      { title: 'Skalabilitas dan Nilai', description: 'Membatasi klaim virtual thread serta menjaga immutability dan hukum penggabungan collector.' }
    ],
    lessons: [
      {
        id: 'expert-java-01', title: 'PECS Menghubungkan Producer dan Consumer', chapter: 0, type: 'quiz', language: 'text',
        intro: ['PECS memakai extends untuk sumber yang menghasilkan T dan super untuk tujuan yang menerima T. Kedua sisi dapat digabung pada satu metode transfer sehingga elemen dibaca secara aman dari keluarga subtype dan dimasukkan ke koleksi suatu supertype. Wildcard menyatakan batas penggunaan, bukan mengubah invariance List itu sendiri.', 'List<? super T> aman menerima T tetapi pembacaan umumnya hanya dijamin bertipe Object, karena tipe koleksi konkretnya dapat lebih luas. Tanda tangan metode perlu menjaga hubungan satu T di antara sumber dan tujuan. Cast mentah menghapus pemeriksaan itu dan dapat memindahkan kegagalan ke runtime.'],
        example: 'Java, transfer koleksi lokal; java.util.List.\nstatic <T> void salin(List<? extends T> sumber, List<? super T> tujuan) {\n    for (T nilai : sumber) tujuan.add(nilai);\n}\nList<Integer> sumber = List.of(2, 5);\nList<Number> tujuan = new java.util.ArrayList<>();\nsalin(sumber, tujuan);',
        task: ['Mengapa pemanggilan tersebut aman secara tipe tanpa raw type atau cast?'], options: ['Ada T yang sesuai: Integer dapat dibaca dari sumber dan diterima oleh tujuan Number melalui batas super', 'List<Integer> otomatis menjadi subtype List<Number>', 'Wildcard super menjamin setiap elemen tujuan dapat dibaca sebagai Integer', 'Kompiler mengabaikan tipe tujuan karena metode mengembalikan void'], answer: 0,
        hints: ['Sumber memproduksi nilai, sedangkan tujuan mengonsumsi nilai tersebut.', 'Keamanan pemanggilan tidak memerlukan List<Integer> diwariskan dari List<Number>.'],
        explanation: 'Batas extends dan super menghubungkan tipe yang dapat diproduksi sumber dengan yang boleh diterima tujuan; misalnya T=Integer memenuhi batas tersebut. Ini berbeda dari konversi langsung antardua List invariant, dan tidak menjanjikan pembacaan tujuan selalu berupa Integer.', xp: 15
      },
      {
        id: 'expert-java-02', title: 'Kegagalan Penutupan Menjadi Suppressed', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Try-with-resources menutup sumber daya dalam urutan kebalikan deklarasi. Jika badan try sudah melempar exception, kegagalan close berikutnya biasanya ditambahkan sebagai suppressed exception pada exception utama itu. Dengan demikian penyebab awal tidak diam-diam diganti oleh kegagalan pembersihan.', 'Urutan dan kedudukan exception penting ketika membaca diagnosis berlapis. Jika badan selesai normal, aturan pemilihan exception utama berbeda karena kegagalan close pertama dapat menjadi yang utama. Selalu nyatakan apakah konstruksi sumber daya berhasil dan apakah badan try sendiri gagal sebelum menelusuri penutupan.'],
        example: 'Simulasi Java lokal dengan AutoCloseable tanpa I/O.\ntry (Sumber a = buatA(); Sumber b = buatB()) {\n    throw Eutama;\n}\nAsumsi: konstruksi a dan b berhasil. close b melempar EB, close a melempar EA.\nEutama, EB, dan EA adalah tiga instance exception berbeda; suppression aktif.',
        task: ['Exception mana diterima pemanggil dan apa urutan suppressed-nya?'], options: ['EA sebagai utama; suppressed [EB, Eutama]', 'EB sebagai utama; suppressed [EA, Eutama]', 'Eutama sebagai utama; suppressed [EB, EA]', 'Eutama sebagai utama; tidak ada informasi kegagalan close'], answer: 2,
        hints: ['b ditutup sebelum a karena dideklarasikan belakangan.', 'Badan try sudah memiliki exception utama sebelum kedua close dicoba.'],
        explanation: 'Eutama tetap exception utama. Penutupan b lalu a menambahkan EB kemudian EA sebagai suppressed. Menangkap hanya pesan utama tanpa memeriksa suppressed dapat menyembunyikan kegagalan pembersihan yang relevan.', xp: 15
      },
      {
        id: 'expert-java-03', title: 'Volatile Memublikasikan Penulisan Sebelumnya', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Dalam Java Memory Model, penulisan volatile dapat membentuk hubungan happens-before dengan pembacaan volatile berikutnya yang relevan. Efek ini mencakup penulisan biasa sebelum publikasi, bukan hanya variabel volatile itu sendiri. Pola tersebut dapat memublikasikan data yang sudah disiapkan oleh satu penulis.', 'Jaminan harus mengikuti urutan operasi yang tepat. Membaca payload sebelum flag tidak memperoleh bukti yang sama, dan mengubah payload lagi sesudah publikasi memerlukan protokol tambahan. Volatile juga tidak mengubah rangkaian read-modify-write pada beberapa field menjadi transaksi atomik.'],
        example: 'Java, objek disiapkan sebelum dua thread dimulai.\nint payload = 0;\nvolatile boolean siap = false;\nPenulis sekali saja: payload = 42; lalu siap = true.\nPembaca sekali saja: jika membaca siap == true, baca payload.\nTidak ada penulis lain atau perubahan payload sesudah publikasi; tidak ada loop menunggu.',
        task: ['Jika pembaca mengamati siap bernilai true, nilai payload apa yang dijamin pada pembacaan setelahnya?'], options: ['Boleh 0 atau 42 karena payload sendiri tidak volatile', 'Selalu 0 karena field biasa tidak pernah dipublikasikan', 'Tidak ada jaminan kecuali pembaca menambahkan Thread.sleep', '42, melalui hubungan happens-before dari publikasi volatile'], answer: 3,
        hints: ['Penulisan payload mendahului penulisan siap pada thread penulis.', 'Pembacaan siap yang true terjadi sebelum pembacaan payload pada thread pembaca.'],
        explanation: 'Rantai urutan program dan sinkronisasi volatile membuat penulisan payload=42 happens-before pembacaan payload setelah flag true. Tidak perlu volatile pada payload untuk pola publikasi satu kali ini, tetapi mutasi sesudah publikasi tidak tercakup oleh bukti yang sama.', xp: 15
      },
      {
        id: 'expert-java-04', title: 'Virtual Thread Tidak Menghapus Semua Batas Blocking', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Virtual thread dapat meningkatkan kapasitas pekerjaan yang banyak menunggu dengan mengurangi kebutuhan satu platform thread untuk tiap tugas. Ia tidak menambah jumlah inti CPU atau mempercepat komputasi murni secara otomatis. Skalabilitas tetap dipengaruhi lock bersama, layanan tujuan, dan jenis operasi blocking.', 'Pada JDK 21, blocking ketika virtual thread berada di blok synchronized dapat menyebabkan pinning pada carrier. Perilaku monitor ini berubah pada JDK yang lebih baru, termasuk JDK 24, sehingga klaim harus menyebut versi. Mengurangi pinning juga tidak menghapus serialisasi logis pada satu lock atau seluruh batas kode native.'],
        example: 'Skenario analisis khusus JDK 21.\nTiga virtual thread melakukan operasi I/O simulasi yang terbatas dan akhirnya selesai.\nMasing-masing menunggu sambil memegang monitor synchronized yang sama.\nTidak ada program atau layanan nyata yang dijalankan dalam pelajaran ini.',
        task: ['Penilaian skalabilitas mana paling tepat untuk skenario dan versi tersebut?'], options: ['Virtual thread menjamin ketiganya memakai satu carrier tanpa pinning apa pun', 'Blocking dalam synchronized dapat menahan carrier pada JDK 21, dan monitor bersama tetap membatasi konkurensi', 'Mengganti platform thread dengan virtual thread pasti mempercepat bagian CPU tiga kali', 'Pinning pada monitor identik di semua versi JDK dan tidak perlu diperiksa lagi'], answer: 1,
        hints: ['Pisahkan efisiensi penjadwalan thread dari eksklusivitas monitor bersama.', 'Versi JDK merupakan bagian dari asumsi, bukan detail yang boleh diabaikan.'],
        explanation: 'Pada JDK 21, blocking sambil memegang monitor dapat mem-pin carrier; selain itu monitor yang sama menserialkan akses. Versi baru memperbaiki pinning terkait monitor, tetapi tidak membatalkan kebutuhan mengevaluasi lock contention, blocking native, atau batas CPU.', xp: 15
      },
      {
        id: 'expert-java-05', title: 'Record Memerlukan Defensive Copy pada Komponen Mutable', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Record Java membuat field komponen final, tetapi final pada referensi tidak membuat objek yang dirujuk menjadi immutable. Jika record menyimpan List mutable milik pemanggil, perubahan dari luar dapat mengubah nilai yang terlihat melalui record dan bahkan memengaruhi kesetaraan atau hash-nya.', 'Defensive copy saat konstruksi memisahkan keanggotaan koleksi dari sumber. List.copyOf menghasilkan daftar yang tidak dapat dimodifikasi melalui antarmukanya, tetapi tidak menyalin setiap objek elemen secara mendalam. Untuk elemen String yang immutable, kombinasi ini cukup untuk kontrak daftar nama yang stabil dalam contoh.'],
        example: 'Java 17+; java.util.List dan ArrayList.\nrecord Tim(List<String> nama) {\n    Tim { nama = List.copyOf(nama); }\n}\nvar asal = new java.util.ArrayList<>(List.of("Mira"));\nvar tim = new Tim(asal);\nasal.add("Joko");',
        task: ['Pernyataan mana benar tentang tim.nama() setelah perubahan asal?'], options: ['Tetap berisi Mira saja, dan penambahan lewat tim.nama().add ditolak', 'Ikut berisi Mira dan Joko karena field record hanya final', 'Tetap berisi Mira tetapi add lewat accessor tetap diizinkan', 'Semua elemen disalin mendalam, termasuk jika nanti tipenya objek mutable'], answer: 0,
        hints: ['Compact constructor mengganti parameter yang kemudian disimpan pada field komponen.', 'List.copyOf memberi daftar unmodifiable, bukan deep clone elemen arbitrer.'],
        explanation: 'Keanggotaan tim dipisahkan dari ArrayList asal dan daftar hasil tidak menerima add. Elemen String aman dibagi karena immutable. Jika elemennya mutable, salinan daftar saja tidak menjamin seluruh isi record tidak berubah.', xp: 15
      },
      {
        id: 'expert-java-06', title: 'Collector Paralel Membutuhkan Penggabungan Asosiatif', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Collector pada stream paralel dapat mengakumulasi bagian data secara terpisah lalu menggabungkan hasilnya. Agar perubahan pengelompokan tidak mengubah makna, operasi penggabungan harus memenuhi hukum yang sesuai, termasuk asosiativitas. Urutan elemen yang tetap tidak cukup jika penempatan tanda kurung dapat mengubah hasil.', 'Untuk toMap dengan kunci berulang, fungsi merge menentukan cara menyatukan nilai pada kunci yang sama. Fungsi murni dan asosiatif memudahkan hasil konsisten tanpa efek samping lintas partisi. Mutable container juga harus disediakan sesuai kontrak collector, bukan satu map global yang dibagi sembarangan.'],
        example: 'Java; tiga data lokal berkode K memiliki nilai 10, 3, dan 2.\nTujuan: total nilai per kode. Semua jumlah muat dalam int.\nKandidat merge pada Collectors.toMap: (a, b) -> a - b.\nPengelompokan (10 - 3) - 2 memberi 5, sedangkan 10 - (3 - 2) memberi 9.',
        task: ['Fungsi merge mana memenuhi tujuan total dan hukum penggabungan pada data tersebut?'], options: ['(a, b) -> a - b, karena urutan input tidak berubah', '(a, b) -> a, karena total berarti nilai pertama', 'Integer::sum tanpa efek samping, menghasilkan total 15', 'Integer::max, karena menghindari tabrakan kunci dengan memilih 10'], answer: 2,
        hints: ['Pengurangan tidak asosiatif walaupun kedua pengelompokan menjaga urutan 10, 3, 2.', 'Tujuan domain adalah penjumlahan, bukan pemilihan nilai pertama atau terbesar.'],
        explanation: 'Penjumlahan menghasilkan 15 dan asosiatif pada rentang nilai yang dinyatakan. Pengurangan menghasilkan nilai bergantung pengelompokan, sedangkan first-wins atau max menjawab pertanyaan domain yang berbeda. Paralelisasi membutuhkan hukum operasi, bukan sekadar API yang menerima lambda.', xp: 15
      }
    ]
  },
  {
    id: 'expert-data-structures-and-algorithms', trackId: 'data-structures-and-algorithms', title: 'Expert Data Structures & Algorithms', category: 'Computer Science', level: 'Expert', theme: 'yellow', symbol: 'DSA',
    description: 'Kuis konsep pembuktian dan tradeoff algoritma: amortisasi, union-find, Dijkstra, dynamic programming, topological sort, dan trie. Contoh graf serta data terbatas dianalisis di atas kertas, tanpa kompiler, shell, atau eksekusi lingkungan.',
    chapters: [
      { title: 'Biaya dan Prasyarat', description: 'Membuktikan biaya rangkaian operasi, invariant disjoint set, dan asumsi finalisasi jarak terpendek.' },
      { title: 'Bukti Keadaan dan Representasi', description: 'Menjaga urutan dynamic programming, menafsirkan simpul tersisa, dan menukar ruang trie dengan biaya navigasi.' }
    ],
    lessons: [
      {
        id: 'expert-data-structures-and-algorithms-01', title: 'Biaya Mahal Sesekali Tidak Menentukan Amortisasi', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Analisis amortized membatasi biaya rata-rata per operasi dalam satu rangkaian terburuk, bukan rata-rata dari input acak. Dynamic array yang menggandakan kapasitas kadang menyalin semua elemen, tetapi biaya besar itu dipisahkan oleh banyak append murah. Deret geometrik membatasi total penyalinan sepanjang rangkaian.', 'Jika kapasitas tumbuh dua kali lipat, jumlah elemen yang disalin pada resize adalah 1 + 2 + 4 dan seterusnya sampai pangkat dua terakhir sebelum ukuran akhir. Jumlah tersebut kurang dari dua kali jumlah append, sehingga total penulisan tetap linear. Satu append pemicu resize masih dapat berbiaya linear meskipun amortisasinya konstan.'],
        example: 'Array dinamis lokal mulai kosong dengan kapasitas 1.\nAda tepat 9 append, tanpa penghapusan. Saat penuh, kapasitas digandakan dan semua elemen lama disalin.\nModel biaya: satu unit tiap penulisan elemen baru atau salinan elemen; biaya allocator tidak dihitung.',
        task: ['Berapa total penulisan untuk sembilan append, dan kelas biaya amortized untuk pola pertumbuhan ini?'], options: ['9 penulisan; setiap append selalu worst-case O(1)', '24 penulisan; append amortized O(1) meskipun satu append bisa O(n)', '17 penulisan; append amortized O(log n)', '45 penulisan; append amortized O(n)'], answer: 1,
        hints: ['Resize menyalin 1, 2, 4, lalu 8 elemen.', 'Tambahkan juga sembilan penulisan nilai baru, bukan hanya salinan.'],
        explanation: 'Totalnya 9 + 1 + 2 + 4 + 8 = 24 penulisan. Secara umum deret penyalinan dibatasi O(n), sehingga n append membutuhkan O(n) total dan O(1) amortized. Append kesembilan sendiri menyalin delapan elemen lalu menulis satu nilai baru.', xp: 15
      },
      {
        id: 'expert-data-structures-and-algorithms-02', title: 'Rank Union-Find Bukan Tinggi Terkini', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Union-find dengan union by rank menggabungkan akar ber-rank lebih kecil di bawah akar ber-rank lebih besar, dan menaikkan rank saat dua rank sama digabung. Path compression kemudian memperpendek jalur find dengan mengubah parent menuju akar. Kedua heuristik bekerja pada aspek yang berbeda.', 'Setelah kompresi, rank tidak harus sama dengan tinggi pohon aktual. Rank dipertahankan sebagai ukuran historis yang mendukung invariant dan analisis biaya; menurunkannya setiap kali bentuk pohon berubah bukan bagian algoritma standar. Kombinasi heuristik memberi biaya amortized inverse-Ackermann, bukan janji bahwa setiap find selalu satu langkah.'],
        example: 'Disjoint set lokal dengan 8 elemen dibangun memakai union by rank dari pasangan rank sama.\nAkar R mencapai rank 3 dan tinggi pohon 3.\nFind dengan full path compression kemudian dilakukan pada seluruh elemen, sehingga semua nonakar langsung menunjuk R.',
        task: ['Apa rank R menurut algoritma standar setelah kompresi tersebut?'], options: ['1, karena rank wajib selalu sama dengan tinggi aktual', '0, karena find menginisialisasi ulang metadata akar', '8, karena rank berubah menjadi jumlah anggota himpunan', 'Tetap 3; tinggi aktual boleh turun tanpa menurunkan rank'], answer: 3,
        hints: ['Path compression mengubah parent, bukan melakukan union dua akar rank sama.', 'Rank berbeda dari ukuran himpunan dan dari tinggi yang selalu dihitung ulang.'],
        explanation: 'Rank R tetap 3 walaupun tinggi aktual menjadi 1. Metadata rank historis dan aturan kenaikannya digunakan dalam pembuktian batas kompleksitas. Inverse-Ackermann adalah batas amortized rangkaian operasi, bukan pengukuran langkah identik untuk setiap find.', xp: 15
      },
      {
        id: 'expert-data-structures-and-algorithms-03', title: 'Finalisasi Dijkstra Memerlukan Bobot Nonnegatif', chapter: 0, type: 'quiz', language: 'text',
        intro: ['Dijkstra memfinalisasi simpul berjarak tentatif minimum dengan alasan bahwa melanjutkan jalur melalui simpul yang belum diproses tidak dapat memperkecil biaya di bawah jarak tersebut. Alasan ini bergantung pada bobot sisi yang nonnegatif. Tidak adanya siklus negatif saja belum cukup untuk membenarkan langkah finalisasi itu.', 'Sisi negatif dapat membawa jalur dari simpul yang sementara terlihat lebih jauh kembali ke simpul yang sudah difinalisasi dengan biaya lebih kecil. Algoritma lain atau metode khusus DAG dapat menangani kondisi yang sesuai. Pemilihan algoritma harus mengikuti prasyarat pembuktiannya, bukan sekadar keberadaan priority queue.'],
        example: 'Graf berarah lokal dengan tiga simpul, tanpa sisi lain:\nS -> A berbobot 2\nS -> B berbobot 5\nB -> A berbobot -4\nVersi Dijkstra memfinalisasi simpul sekali dan tidak membuka kembali simpul final. Tidak ada siklus.',
        task: ['Apa kegagalan finalisasi pada graf tersebut?'], options: ['A difinalisasi pada 2, padahal jalur S-B-A memiliki biaya 1', 'B tidak pernah dapat dicapai karena ada sisi negatif keluar dari B', 'Graf memiliki siklus negatif sehingga semua jarak adalah minus tak hingga', 'Tidak ada kegagalan karena larangan siklus sudah cukup untuk Dijkstra'], answer: 0,
        hints: ['Sesudah S, jarak tentatif A lebih kecil daripada B.', 'Hitung biaya jalur yang melewati B setelah A dipilih.'],
        explanation: 'A dipilih dengan jarak 2 sebelum B, tetapi 5 + (-4) = 1 adalah jarak sebenarnya. Sisi negatif merusak bukti bahwa jarak final tidak dapat membaik. Graf ini tanpa siklus, sehingga penyebabnya bukan siklus negatif melainkan prasyarat nonnegatif yang dilanggar.', xp: 15
      },
      {
        id: 'expert-data-structures-and-algorithms-04', title: 'Arah Loop Membuktikan Knapsack Nol-Satu', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Pada knapsack 0/1, setiap item boleh dipakai paling banyak sekali. DP dua dimensi memisahkan baris sebelum item diproses dari baris setelahnya. Ketika ruang dipadatkan menjadi satu array, urutan pembaruan harus mempertahankan makna membaca keadaan baris sebelumnya.', 'Untuk item berbobot w, iterasi kapasitas menurun membuat dp[c-w] belum diperbarui oleh item yang sedang diproses. Iterasi menaik justru dapat membaca hasil yang baru memasukkan item itu, lalu memakainya lagi. Bukti invariant urutan inilah yang membedakan kompresi ruang yang benar dari perubahan diam-diam menjadi unbounded knapsack.'],
        example: 'Data lokal: kapasitas 6; hanya satu item dengan berat 3 dan nilai 4.\ndp[0..6] mula-mula 0; dp[c] berarti nilai maksimum dengan kapasitas paling banyak c.\nTransisi: dp[c] = max(dp[c], dp[c-3] + 4).\nSetiap item hanya boleh diambil sekali.',
        task: ['Urutan kapasitas mana benar dan mengapa?'], options: ['Naik dari 3 ke 6, supaya dp[3] yang baru bernilai 4 dapat dipakai lagi', 'Naik atau turun sama saja karena max selalu menghasilkan nilai benar', 'Turun dari 6 ke 3, agar sumber transisi masih mewakili keadaan sebelum item ini', 'Hanya perbarui dp[3], karena kapasitas lebih besar tidak boleh menyimpan item yang sama'], answer: 2,
        hints: ['Pada iterasi naik, dp[6] membaca dp[3] yang sudah memuat item.', 'Kapasitas 6 boleh menyimpan item berat 3 sekali meskipun ada ruang tersisa.'],
        explanation: 'Urutan menurun menjaga invariant baris sebelumnya dan menghasilkan dp[6]=4. Urutan menaik menghasilkan 8 dengan mengambil item yang sama dua kali, melanggar 0/1. Ini adalah pembuktian dependensi keadaan, bukan sekadar preferensi arah loop.', xp: 15
      },
      {
        id: 'expert-data-structures-and-algorithms-05', title: 'Sisa Topological Sort Tidak Semuanya Anggota Siklus', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Algoritma Kahn mengeluarkan simpul ber-indegree nol dan mengurangi indegree tetangganya. Jika antrean habis sebelum semua simpul keluar, graf berarah memiliki siklus. Namun simpul yang tersisa dapat mencakup turunan siklus yang tidak pernah terbebas dari prasyaratnya.', 'Deteksi keberadaan siklus dan identifikasi tepat anggota siklus adalah dua tugas berbeda. Strongly connected components dapat membantu membedakan anggota siklus dari simpul yang hanya terhalang olehnya. Menandai semua simpul tersisa sebagai pelaku siklus dapat memberi diagnosis dependensi yang salah.'],
        example: 'Graf berarah lokal dengan simpul A, B, C, D, E, F.\nSisi lengkap: A->B, B->A, B->C, D->E. F terisolasi.\nKahn mengeluarkan D, E, dan F, lalu tidak ada simpul ber-indegree nol lagi.',
        task: ['Kesimpulan mana tepat tentang A, B, dan C yang tersisa?'], options: ['Ketiganya pasti berada pada satu siklus A-B-C-A', 'A dan B membentuk siklus; C hanya terhalang karena bergantung pada B', 'Tidak ada siklus karena beberapa simpul berhasil dikeluarkan', 'C membentuk self-loop yang tidak perlu dicantumkan pada daftar sisi'], answer: 1,
        hints: ['Tidak ada sisi keluar C pada daftar lengkap.', 'C tetap memiliki sisi masuk dari B yang tidak pernah dikeluarkan.'],
        explanation: 'A dan B saling mengunci pada siklus dua simpul. C tidak memiliki jalur kembali sehingga bukan anggota siklus, tetapi indegree-nya tidak pernah menjadi nol. Jumlah keluaran yang kurang dari jumlah simpul mendeteksi siklus tanpa otomatis mengidentifikasi semua anggotanya.', xp: 15
      },
      {
        id: 'expert-data-structures-and-algorithms-06', title: 'Trie Terkompresi Menukar Node dengan Pemeriksaan Label', chapter: 1, type: 'quiz', language: 'text',
        intro: ['Trie satu karakter per node dapat memboroskan ruang bila setiap node menyediakan tabel anak sebesar alfabet padahal hanya sedikit cabang terisi. Rantai panjang dengan satu anak juga menambah objek dan pointer. Representasi sparse mengurangi slot kosong, sedangkan radix trie menggabungkan rantai menjadi label sisi multikarakter.', 'Kompresi tidak menghapus kebutuhan membandingkan karakter pada label maupun menyimpan informasi kunci. Pencarian prefix dapat berhenti di tengah label sisi, sehingga implementasi harus menangani kasus itu secara benar. Biaya ruang aktual bergantung pada penyimpanan label, overhead node, dan representasi anak, bukan sekadar klaim semua operasi menjadi konstan.'],
        example: 'Kumpulan lokal: sensor/ruang/utara, sensor/ruang/selatan, sensor/taman/utara.\nImplementasi awal memakai trie per karakter dengan 128 slot anak di setiap node.\nAda banyak slot kosong dan rantai satu anak. Query prefix seperti sensor/ru harus tetap didukung.',
        task: ['Rancangan mana langsung menargetkan kedua sumber pemborosan tanpa menghilangkan semantik prefix?'], options: ['Perbesar setiap tabel anak menjadi 256 slot agar lookup lebih seragam', 'Ganti dengan hash seluruh kata dan anggap hash prefix sama dengan hash kata lengkap', 'Buang semua karakter pada rantai satu anak tanpa menyimpan label penggantinya', 'Evaluasi radix trie dengan anak sparse dan perbandingan label sisi, termasuk prefix yang berakhir di tengah label'], answer: 3,
        hints: ['Slot anak kosong dan jumlah node rantai adalah dua biaya yang berbeda.', 'Karakter yang tidak lagi diwakili node tersendiri tetap harus diwakili dalam label.'],
        explanation: 'Anak sparse mengurangi slot kosong dan kompresi radix mengurangi node pada rantai tunggal. Pencarian tetap harus memeriksa karakter dan menangani prefix parsial pada label. Ukuran label serta overhead representasi perlu diukur; kompresi node bukan bukti ruang atau waktu O(1).', xp: 15
      }
    ]
  }
];
