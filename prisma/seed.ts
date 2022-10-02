import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const bcryptjs = require("bcryptjs");

function hasher(text: string) {
  const salt = bcryptjs.genSaltSync(10);
  return bcryptjs.hashSync(text, salt);
}

async function main() {
  await prisma.user.deleteMany();
  await prisma.bahanPemutih.deleteMany();
  await prisma.gejala.deleteMany();
  await prisma.basisPengetahuan.deleteMany();

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });
  await prisma.bahanPemutih.createMany({
    data: bahanPemutih,
    skipDuplicates: true,
  });
  await prisma.gejala.createMany({
    data: gejala,
    skipDuplicates: true,
  });
  await prisma.basisPengetahuan.createMany({
    data: basisPengetahuan,
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

const users = [
  {
    email: "admin@mail.com",
    name: "Admin",
    hash: hasher("admin"),
    role: "Admin",
    verified: true,
  },
];

const basisPengetahuan = [
  {
    rule: "R1",
    kaidah: "IF G002 AND G003 AND G004 AND G012 THEN P001",
    kodeBahanPemutih: "P001",
  },
  {
    rule: "R2",
    kaidah: "IF G003 AND G004 AND G005 AND G006 THEN P002",
    kodeBahanPemutih: "P002",
  },
  {
    rule: "R3",
    kaidah: "IF G004 AND G006 AND G007 AND G008 AND G010 THEN P003",
    kodeBahanPemutih: "P003",
  },
  {
    rule: "R4",
    kaidah: "IF G009 AND G011 AND G012 AND G013 THEN P004",
    kodeBahanPemutih: "P004",
  },
  {
    rule: "R5",
    kaidah: "IF G003 AND G009 AND G012 THEN P005",
    kodeBahanPemutih: "P005",
  },
  {
    rule: "R6",
    kaidah: "IF G012 AND G013 AND G014 THEN P006",
    kodeBahanPemutih: "P006",
  },
  {
    rule: "R7",
    kaidah: "IF G002 AND AND G012 AND G015 AND G016 THEN P007",
    kodeBahanPemutih: "P007",
  },
  {
    rule: "R8",
    kaidah: "IF G017 AND G0198AND G019 AND G020 AND G023 THEN P008",
    kodeBahanPemutih: "P008",
  },
  {
    rule: "R9",
    kaidah: "IF G002 AND G012 AND G021 AND G022 AND G023 THEN P009",
    kodeBahanPemutih: "P009",
  },
  {
    rule: "R10",
    kaidah:
      "IF G012 AND G024 AND G025 AND G026 AND G027 AND G028 AND G36 THEN P010",
    kodeBahanPemutih: "P010",
  },
  {
    rule: "R11",
    kaidah: "IF G027 AND G028 AND G029 AND G030 THEN P011",
    kodeBahanPemutih: "P011",
  },
  {
    rule: "R12",
    kaidah: "IF G001 AND G003 AND G012 AND G029 AND G030 THEN P012",
    kodeBahanPemutih: "P012",
  },
  {
    rule: "R13",
    kaidah: "IF G031 AND G032 AND G033 AND G034 AND G035 AND G037 THEN P013",
    kodeBahanPemutih: "P013",
  },
];

const bahanPemutih = [
  {
    kodeBahanPemutih: "P001",
    jenisBahanPemutih: "Hidroquinone",
    presentaseKadarMax: "2 %",
    solusi: `- Gunakan tabir surya dan batasi aktivitas yang membuat Anda terpapar sinar matahari secara langsung saat menggunakan hydroquinone, karena obat ini dapat menyebabkan kulit lebih sensitif terhadap sinar matahari.
-	Jangan menggunakan hydroquinone jika Anda alergi terhadap obat ini. Selalu beri tahu dokter tentang riwayat alergi yang Anda miliki, termasuk alergi sulfat.
-	Jangan menggunakan hydroquinone pada kulit yang mengalami biang keringat, terluka, terbakar sinar matahari, atau yang mudah mengalami iritasi.
-	Pada kasus gawat darurat atau overdosis, hubungi penyedia layanan gawat darurat lokal (112) atau segera ke unit gawat darurat rumah sakit terdekat.`,
  },
  {
    kodeBahanPemutih: "P002",
    jenisBahanPemutih: "Asam Retinoat",
    presentaseKadarMax: "0,0036% - 2%",
    solusi: `- Jangan menggunakan retinoid jika Anda alergi terhadap obat ini atau vitamin A. Beri tahu dokter tentang riwayat alergi yang Anda miliki.
-	Batasi aktivitas dengan paparan sinar matahari langsung dalam waktu lama.
-	Beri tahu dokter jika Anda sedang menggunakan obat, suplemen, atau produk herbal tertentu.
-	Segera temui dokter jika Anda mengalami reaksi alergi obat atau overdosis setelah menggunakan retinoid.`,
  },
  {
    kodeBahanPemutih: "P003",
    jenisBahanPemutih: "Merkury",
    presentaseKadarMax: "0,007% atau setara 70 ppm",
    solusi: `- Menghentikan pemaikaian krim.
-	Konsumsi air putih dengan rumus berat badan 100 kg minum konsumsi 3 liter air putih sehari (sesuaikan dengan berat badan Anda).
-	Lakukan diet sehat dan perbanyak makanan berserat.
-	Mengkonsumsi antioksidan yang kuat.`,
  },
  {
    kodeBahanPemutih: "P004",
    jenisBahanPemutih: "Resorcinol",
    presentaseKadarMax: "5 %",
    solusi: `- Hindari paparan sinar matahari dalam jangka waktu yang lama dan selalu gunakan pelindung kulit, seperti pakaian tertutup atau tabir surya, selama menjalani pengobatan dengan tretinoin topikal, karena obat ini bisa menyebabkan kulit lebih sensitif terhadap sinar matahari.
-	Segera temui dokter jika terjadi reaksi alergi obat atau overdosis setelah pemakaian.`,
  },
  {
    kodeBahanPemutih: "P005",
    jenisBahanPemutih: "Klorin",
    presentaseKadarMax: "12 %",
    solusi: `- Gunakan lotion lembut tanpa bahan pewangi untuk membantu melembabkan kulit.
- Jangan terlalu sering berenang dalam kolam yang mengandung klorin.
- Biasanya, ruam akibat klorin tidak sampai membutuhkan perawatan dokter. Namun, jika gejalanya semakin parah dan mengganggu aktivitas sehari-hari, Anda bisa mengonsultasikannya ke dokter.`,
  },
  {
    kodeBahanPemutih: "P006",
    jenisBahanPemutih: "Arbutin",
    presentaseKadarMax: "0,2 % – 2 %",
    solusi: `Jika terjadi gejala alergi, gunakan anti imflamasi dan juga pelembab. Tetapi jika gejala yang di timbulkan semakin parah dan mrngganggu segera konsultasikan ke dokter`,
  },

  {
    kodeBahanPemutih: "P007",
    jenisBahanPemutih: "Kojic Acid",
    presentaseKadarMax: "Aman jika kurang dari 1%",
    solusi: `Bagi sebagian orang, terutama yang memiliki kulit sensitif, krim dengan kandungan asam kojic bisa menyebabkan dermatitis kontak, yaitu sebuah reaksi iritasi atau alergi. 
    Jika Anda mengalami beberapa gejala alergi, segera hentikan pemakaian krim dan konsultasikan kepada dokter spesialis kulit. Namun, akan lebih baik jika Anda berkonsultasi dulu dengan dokter kulit sebelum menggunakan produk asam kojic sebagai perawatan kulit Anda.
    `,
  },
  {
    kodeBahanPemutih: "P008",
    jenisBahanPemutih: "Tretinoin",
    presentaseKadarMax: "Jerawat = 0,01% – 0,1%",
    solusi: `- Jangan menggunakan tretinoin topikal jika Anda alergi terhadap obat-obatan yang mengandung retinoid dan vitamin A.
-	Beri tahu dokter jika Anda atau keluarga Anda memiliki riwayat kanker kulit.
-	Hindari paparan sinar matahari dalam jangka waktu yang lama dan selalu gunakan pelindung kulit, seperti pakaian tertutup atau tabir surya, selama menjalani pengobatan.
-	Beri tahu dokter mengenai obat-obatan yang sedang digunakan, termasuk suplemen dan produk herbal.
-	Segera temui dokter jika terjadi reaksi alergi obat atau overdosis setelah menggunakan tretinoin topikal.`,
  },
  {
    kodeBahanPemutih: "P009",
    jenisBahanPemutih: "Benzoyl Peroxide",
    presentaseKadarMax: "0,7 %",
    solusi: `- Harap berhati-hati jika menggunakan benzoyl peroxide bersamaan dengan obat jerawat atau perawatan kulit lainnya karena dapat meningkatkan risiko terjadinya iritasi pada kulit.
- Hindari paparan sinar matahari terlalu lama selama menggunakan benzoyl peroxide. Obat ini dapat meningkatkan sensitivitas kulit terhadap sinar matahari.
- Segera temui dokter apabila terjadi reaksi alergi obat atau overdosis setelah menggunakan benzoyl peroxide.`,
  },
  {
    kodeBahanPemutih: "P010",
    jenisBahanPemutih: "Arsenic",
    presentaseKadarMax: "3 ppm",
    solusi: `Penanganan terbaik adalah menjauhkan diri dari paparan arsenik, karena belum ditemukan obat untuk mengatasi keracunan senyawa ini. Membaiknya kondisi tergantung pada tingkat keparahan dan lamanya gejala yang dialami.
    Proses cuci darah atau hemodialisis bisa membuang arsenik dalam darah, tapi hanya efektif jika arsenik belum terikat pada jaringan. Segera ke dokter jika Anda mengalami gejala dan keluhan yang semakin parah dan mengganggu,
    `,
  },
  {
    kodeBahanPemutih: "P011",
    jenisBahanPemutih: "AHA (Alpha Hydroxy Acid)",
    presentaseKadarMax: "10 %",
    solusi: `Jika terjadi gejala alergi, gunakan anti imflamasi dan juga pelembab. Tetapi jika gejala yang di timbulkan semakin parah dan mrngganggu segera konsultasikan ke dokter`,
  },
  {
    kodeBahanPemutih: "P012",
    jenisBahanPemutih: "Sodium Laureth Sulfate",
    presentaseKadarMax: "Tidak boleh lebih dari 1%",
    solusi: `jika Anda siapapun yang mungkin telah overdosis dari Sodium Laureth Sulfate, mohon pergi ke departemen darurat rumah sakit terdekat, rumah perawatan atau klinik terdekat. Bawalah kotak obat, atau label yang anda gunakan untuk membantu dokter dengan informasi yang diperlukan.`,
  },
  {
    kodeBahanPemutih: "P013",
    jenisBahanPemutih: "Steroid",
    presentaseKadarMax: "-",
    solusi: `Pada daerah kulit yang tipis atau lipatan, gunakalah steroid dengan potensi lemah. Hati-hati pada penggunaan sekitar mata, karena dapat menyebabkan glaukoma atau katarak. 
    Masyarakat tidak disarankan untuk mengonsumsi atau menambah-kurangi dosis obat ini tanpa petunjuk dokter, Pada penggunaan jangka panjang, dokter biasanya melakukan “tappering off” saat akan menghentikan pengobatan, yaitu dengan cara dosis obat diturunkan perlahan-lahan baru kemudian dihentikan.
    `,
  },
];

const gejala = [
  {
    kodeGejala: "G001",
    namaGejala: "Kulit terasa gatal",
    nilaiKepastian: 0.6,
    labelCukupYakin: "Kulit terasa gatal bersifat sementara?",
    labelSangatYakin:
      "Kulit terasa gatal dalam waktu berturut-turut dan memerah?",
    keterangan: "Kondisi dimana kulit merasakan sensasi gatal berlebih.",
    urlGambar: "",
  },
  {
    kodeGejala: "G002",
    namaGejala: "Kulit rasa terbakar",
    nilaiKepastian: 0.9,
    labelCukupYakin:
      "Kulit meraskan perih tetapi tidak memerah?                     ",
    labelSangatYakin: "Kulit terasa perih serta memerah?",
    keterangan:
      "Kondisi dimana kulit mengalami sensasi seperti terbakar umumnya terjadi di area wajah.",
    urlGambar: "",
  },
  {
    kodeGejala: "G003",
    namaGejala: "Kulit terasa kering",
    nilaiKepastian: 0.6,
    labelCukupYakin: "Tidak terasa kering?",
    labelSangatYakin: "Tekstur kulit menjadi lebih kering dari biasa?",
    keterangan: "Kulit menjadi lebih kering dari kondisi biasa.",
    urlGambar: "",
  },
  {
    kodeGejala: "G004",
    namaGejala: "Kulit terasa tersengat",
    nilaiKepastian: 0.4,
    labelCukupYakin: "Kulit terasa menyengat tidak begitu parah?",
    labelSangatYakin: "Kulit terasa sangat menyengat?",
    keterangan:
      "Pada kondisi  kulit mengalami sensasi seperti tertususk jarum kecil, selain area wajah.",
    urlGambar: "",
  },
  {
    kodeGejala: "G005",
    namaGejala: "Kulit bersisik",
    nilaiKepastian: 0.8,
    labelCukupYakin: "Kulit terasa gatal?",
    labelSangatYakin: "Kulit gatal dan kering?",
    keterangan:
      "Peradangan yang muncul akibat paparan suatu zat. Suatu kondisi dimana muncul sisik pada kulit menyerupai sisik ikan.",
    urlGambar: "/images/gejala/kulit-bersisik.jpeg",
  },
  {
    kodeGejala: "G006",
    namaGejala: "Kulit terasa gatal/terkelupas",
    nilaiKepastian: 0.6,
    labelCukupYakin: "Kulit gatal dan perih?",
    labelSangatYakin: "Kulit terkelupas ketika menggaruk?",
    keterangan: "Kondisi dimana kulit merasakan gatal dan kulit terkelupas.",
    urlGambar: "",
  },
  {
    kodeGejala: "G007",
    namaGejala: "Bintik hitam pada kulit",
    nilaiKepastian: 0.4,
    labelCukupYakin: "Muncul bintik tetapi dalam jumlah yang sedikit?",
    labelSangatYakin: "Terdapat begitu banyak bintik pada area yang di maksud?",
    keterangan:
      "Kondisi dimana muncul bercak hitam kecoklatan pada area wajah menonjol dan mneyebar di area kulit biasa terdapat di tulang hidung, pipi, leher atau lengan.",
    urlGambar: "/images/gejala/bintik-hitam-pada-kulit.jpg",
  },
  {
    kodeGejala: "G008",
    namaGejala: "Kulit memerah dan melepuh",
    nilaiKepastian: 0.6,
    labelCukupYakin: "Kulit memerah tanpa rasa melepuh?",
    labelSangatYakin: "Kulit terasa melepuh seperti habis terbakar?",
    keterangan:
      "Kondisi dimana kulit merasakan sensasi melepuh seperti terbakar dan juga menjadi kemerahan tanpa bintik.",
    urlGambar: "/images/gejala/kulit-memerah.jpg",
  },
  {
    kodeGejala: "G009",
    namaGejala: "Kulit kebiruan/kemerahan",
    nilaiKepastian: 0.9,
    labelCukupYakin: "Area terpapar tidak sampai seperti lebam?",
    labelSangatYakin: "Area kulit terpapar menjadi seperti lebam?",
    keterangan:
      "Kondisi dimana area sekitar kulit menjadi biru serta kemerahan.",
    urlGambar: "/images/gejala/kulit-kebiruan-dan-kemerahan.jpg",
  },
  {
    kodeGejala: "G010",
    namaGejala: "Nafas terasa sesak",
    nilaiKepastian: 0.8,
    labelCukupYakin: "Memiliki riwayat asma?",
    labelSangatYakin: "Sesak tetapi tidak memiliki riwayat asma?",
    keterangan: "",
    urlGambar: "",
  },
  {
    kodeGejala: "G011",
    namaGejala: "Kulit berwarna biru",
    nilaiKepastian: 0.4,
    labelCukupYakin: "Biru biasa tidak menghitam?",
    labelSangatYakin: "Kulit biru hingga agak kehitaman seperti membusuk?",
    keterangan:
      "Kondisi dimana kulit berubah warna menjadi kebiruan berbeda dengan warna lebam pada kulit biasa.",
    urlGambar: "/images/gejala/kulit-biru.png",
  },
  {
    kodeGejala: "G012",
    namaGejala: "Ruam kemerahan pada kulit",
    nilaiKepastian: 0.8,
    labelCukupYakin: "Ruam tetapi tidak gatal?",
    labelSangatYakin: "Muncul ruam dan terasa gatal?",
    keterangan:
      "Ruam pada kulit di tandai dengan kulit berwarna merah, perbedaan tekstur pada kulit.",
    urlGambar: "/images/gejala/ruam-kemerahan-pada-kulit.jpg",
  },
  {
    kodeGejala: "G013",
    namaGejala: "Breakout pada kulit",
    nilaiKepastian: 0.6,
    labelCukupYakin: "Muncul jerawat dengan ukuran besar pada permukaan kulit?",
    labelSangatYakin: "kulit berjerawat disertai kering dan terkelupas?",
    keterangan: "Breakout adalah kondisi kulit iritasi dan berjerawat",
    urlGambar: "/images/gejala/breakout-kulit.jpg",
  },
  {
    kodeGejala: "G014",
    namaGejala: "Bercak pada kulit",
    nilaiKepastian: 0.9,
    labelCukupYakin: "Tidak terdapat banyak bercak?",
    labelSangatYakin: "Banyak terdapat bercak hampir seluruh tubuh?",
    keterangan:
      "Kondisi dimana muncul bintik berwarna kecoklatan pada kulit dengan ukuran yang sedikit lebih besar dari bintik kecil pada kulit dengan jarak yang sedikit berjauhan.tidak berisi dan tidak gatal.",
    urlGambar: "/images/gejala/bercak-kulit.jpg",
  },
  {
    kodeGejala: "G015",
    namaGejala: "Kulit membengkak",
    nilaiKepastian: 0.8,
    labelCukupYakin: "Mata tidak berair?",
    labelSangatYakin: "Mata berair?",
    keterangan:
      "Kondisi bengkak menyerupai orang yang baru saja sengatan lebah. biasa terjadi di wajah area mata dan bibir.",
    urlGambar: "/images/gejala/kulit-bengkak.jpeg",
  },
  {
    kodeGejala: "G016",
    namaGejala: "Nyeri pada kulit",
    nilaiKepastian: 0.6,
    labelCukupYakin: "Nyeri tidak menyengat?",
    labelSangatYakin: "Nyeri menyengat?",
    keterangan:
      "Kondisi dimana terasa nyeri pada area kulit wajah bahkan area kulit pada bagian tubuh lainnya.",
    urlGambar: "",
  },
  {
    kodeGejala: "G017",
    namaGejala: "Kulit bengkak disertai memar dan kering",
    nilaiKepastian: 0.9,
    labelCukupYakin: "Kulit bengkak,memar dan tidak kering?",
    labelSangatYakin: "Kulit bengkak, memar serta kulit jadi lebih kering?",
    keterangan:
      "Pembengkakan di area kulit di sertai memar seperti terkena pukulan atau cedera benda tumpul.",
    urlGambar: "/images/gejala/kulit-bengkak-dan-memar.jpg",
  },
  {
    kodeGejala: "G018",
    namaGejala: "Sensasi menyengat pada kulit wajah",
    nilaiKepastian: 0.4,
    labelCukupYakin: "Tidak terasa panas dan perih?",
    labelSangatYakin: "Menyengat serta terasa panas dan perih?",
    keterangan:
      "Pada kondisi kulit mengalami sensasi menyengat seperti tertususk jarum kecil, terjadi di area kulit wajah.",
    urlGambar: "",
  },
  {
    kodeGejala: "G019",
    namaGejala: "Bertambah luka pada jerawat",
    nilaiKepastian: 0.5,
    labelCukupYakin: "Luka bertambah sedikit demi sedikit?",
    labelSangatYakin: "Bertambah luka sekaligus dalam jumlah banyak?",
    keterangan:
      "Kondisi dimana wajah yang berjerawat mengalami luka dan akan terus bertambah.",
    urlGambar: "/images/gejala/luka-pada-jerawat.jpg",
  },
  {
    kodeGejala: "G020",
    namaGejala: "Meninggalkan bekas terang/gelap pada area pemakaian",
    nilaiKepastian: 0.6,
    labelCukupYakin: "Tidak terjadi perubahan?",
    labelSangatYakin: "Bekas pada area pemakaian semakin gelap/terang?",
    keterangan:
      "Pada area pemakaian kosmetik meninggalkan bekas, biasanya leboh terang atau lebih gelap dari kondisi normal.",
    urlGambar: "",
  },
  {
    kodeGejala: "G021",
    namaGejala: "Kulit gatal dan bengkak",
    nilaiKepastian: 0.8,
    labelCukupYakin: "Kulit bengkak dan gatal tidak luka?",
    labelSangatYakin: "Kulit bengkak dan gatal disertai luka?",
    keterangan:
      "Kondisi dimana kulit mengalami bengkak pada area kulit lain selain wajah Dan di ikuti dengan rasa gatal.",
    urlGambar: "",
  },
  {
    kodeGejala: "G022",
    namaGejala: "Kulit terasa melepuh",
    nilaiKepastian: 0.5,
    labelCukupYakin: "Tidak terasa gatal pada area sekitar kulit?",
    labelSangatYakin: "Terasa gatal cukup hebat pada area sekitar kulit?",
    keterangan:
      "Kondisi dimana kulit seperti terbakar, umumnya disertai bintik-bintik pada kulit yang berisi air.",
    urlGambar: "/images/gejala/kulit-melepuh.jpg",
  },
  {
    kodeGejala: "G023",
    namaGejala: "Kulit kering dan mengelupas",
    nilaiKepastian: 0.6,
    labelCukupYakin: "Kulit kering tidak begitu mengelupas?",
    labelSangatYakin: "Kulit menjadi mudah terkelupas dan kering?",
    keterangan:
      "Kulit terlihat lebih kering dari kondisi biasa dan mudah terkelupas",
    urlGambar: "/images/gejala/kulit-kering-dan-mengelupas.jpg",
  },
  {
    kodeGejala: "G024",
    namaGejala: "Tumbuhnya kutil",
    nilaiKepastian: 0.8,
    labelCukupYakin: "Kutil berukuran sedang?",
    labelSangatYakin: "Kutil berukuran lebih besar?",
    keterangan:
      "Kutil merupakan benjolan yang timbul pada kulit, menyerupai kembang kol. Sebagian kutil ada yang berbentuk datar dan juga menonjol.",
    urlGambar: "/images/gejala/kutil.jpg",
  },
  {
    kodeGejala: "G025",
    namaGejala: "Perubahan pigmentasi",
    nilaiKepastian: 0.6,
    labelCukupYakin: "Warna kulit tidak rata juga tidak begitu gelap?",
    labelSangatYakin: "Perubahan warna kulit makin gelap?",
    keterangan:
      "Perubahan pigmentasi pada kulit ditandai dengan warna kulit yang tidak merata di sekitar area dahi,hidung dan pipi.",
    urlGambar: "/images/gejala/perubahan-pigmentasi.jpg",
  },
  {
    kodeGejala: "G026",
    namaGejala: "Lesi kulit",
    nilaiKepastian: 0.5,
    labelCukupYakin: "Benjolan pada kulit berukuran kecil?",
    labelSangatYakin: "Benjolan pada kulit berukuran lebih besar?",
    keterangan:
      "Perubahan abnormar yang terjadi pada area kulit. Lesi kulit muncul dalam beberapa bentuk seperti benjolan, luka ataupun lecet pada area kulit.",
    urlGambar: "/images/gejala/lesi-kulit.jpg",
  },
  {
    kodeGejala: "G027",
    namaGejala: "Kulit sensitif terhadap paparan sinar matahari",
    nilaiKepastian: 0.6,
    labelCukupYakin: "Tidak begitu mudah bereaksi jika terpapar?",
    labelSangatYakin: "Mudah bereaksi jika terpapar sinar matahari lama?",
    keterangan:
      "Kulit yang awalnya tidak begitu sensitif tehadap sinar matahari menjadi sangat sensitif terhadap paparan sinar matahari karena akan terjadi iritasi.",
    urlGambar: "",
  },
  {
    kodeGejala: "G028",
    namaGejala: "Kulit gatal dan sensasi terbakar",
    nilaiKepastian: 0.4,
    labelCukupYakin: "Terjadi tidak begitu sering?",
    labelSangatYakin: "Terjadi terus menerus tanpa jeda?",
    keterangan:
      "Kondisi dimana kulit akan mengalami gatal-gatal di ikuti dengan sensasi rasa seperti terbakar yang cukup menyengat.",
    urlGambar: "",
  },
  {
    kodeGejala: "G029",
    namaGejala: "Kulit mengelupas",
    nilaiKepastian: 0.9,
    labelCukupYakin: "Kulit mengelupas tipis?",
    labelSangatYakin: "kulit mengelupas agak tebal?",
    keterangan:
      "Kondisi dimana kulit mnegelupas setelah penggunaan skincare, tetapi tidak menimbulkan gatal-gatal pada kulit. Biasanya terjadi akibat kelebihan pemakaian atau alergi terhadap suatu produk.",
    urlGambar: "",
  },
  {
    kodeGejala: "G030",
    namaGejala: "Kulit terasa panas",
    nilaiKepastian: 0.6,
    labelCukupYakin: "Panas tidak menyengat?",
    labelSangatYakin: "Panas dan menyengat?",
    keterangan: "Kondisi dimana kulit mengalami panas seperti akan terbakar.",
    urlGambar: "",
  },
  {
    kodeGejala: "G031",
    namaGejala: "Wajah sensitif",
    nilaiKepastian: 0.8,
    labelCukupYakin: "Kulit memerah tanpa bruntus?",
    labelSangatYakin: "Kulit memerah disertai bruntus?",
    keterangan:
      "Wajah menjadi lebih sensitif terhadap paparan sinar matahari dan mudah memerah tetapi tidak menimbulkan efek gatal.",
    urlGambar: "",
  },
  {
    kodeGejala: "G032",
    namaGejala: "Muncul benjolan kecil putih atau merah pada kulit",
    nilaiKepastian: 0.6,
    labelCukupYakin: "Muncul dalam jumlah sedang?",
    labelSangatYakin: "Muncul dalam jumlah banyak?",
    keterangan:
      "Benjolan hampir meneyrupai kutil tetapi berwarna putih atau merah serta ukuran yang lebih kecil dari kutil.",
    urlGambar: "/images/gejala/benjolan-putih.jpg",
  },
  {
    kodeGejala: "G033",
    namaGejala: "Muncul Memar pada kulit",
    nilaiKepastian: 0.5,
    labelCukupYakin: "Kulit tampak memar biasa?",
    labelSangatYakin: "Kulit tampak memar seperti membusuk?",
    keterangan:
      "Kondisi dimana muncul memar serta tampak seperti pada kulit layaknya orang yang terjatuh atau cedera dan tidak terasa sakit.",
    urlGambar: "/images/gejala/memar.jpg",
  },
  {
    kodeGejala: "G034",
    namaGejala: "Muncul bercak merah, atau garis d bawah kulit",
    nilaiKepastian: 0.6,
    labelCukupYakin: "Muncul dalam jumlah sedang?",
    labelSangatYakin: "Muncul dalam jumlah banyak?",
    keterangan:
      "Bercak yang muncul pada kulit berwarna merah atau disertai dengan garis di bawah kulit yang bisa disebut strectmark biasa terdapat pada bagian perut, lengan atau paha.",
    urlGambar: "/images/gejala/stresmarck.jpg",
  },
  {
    kodeGejala: "G035",
    namaGejala: "kulit menjadi tipis dan rapuh",
    nilaiKepastian: 0.4,
    labelCukupYakin: "Kulit lebih Sensitif terhadap cuaca?",
    labelSangatYakin: "Tekstur kulit lebih tipis dan agak bersisik?",
    keterangan:
      "Kondisi dimana kulit menjadi sangat sensitif diantaranya terhadap lingkungan kondisi dingin atau panas, terlihat lebih tipis.",
    urlGambar: "",
  },
  {
    kodeGejala: "G036",
    namaGejala: "Perubahan pada kulit (kulit menggelap)",
    nilaiKepastian: 0.4,
    labelCukupYakin: "Perubahan tidak signifikan?",
    labelSangatYakin: "Perubahan cukup signifikan?",
    keterangan:
      "Perubahan kulit menjadi lebih gelap dari biasanya  pada area tertentu.",
    urlGambar: "/images/gejala/kulit-menjadi-gelap-sebagian.jpg",
  },
  {
    kodeGejala: "G037",
    namaGejala: "Muncul rambut halus pada wajah",
    nilaiKepastian: 0.6,
    labelCukupYakin: "Muncul sedikit dan tipis?",
    labelSangatYakin: "Muncul lebih banyak dan lumayan tebal?",
    keterangan:
      "Muncul atau bertambahnya rambut/bulu2 halus di area wajah. Banyak factor yang dapat menyebabkan tumbuhnya rambut halus pada wajah namum salah satunya penggunaan steroid berlebih. Biasa terdapat pada area dahi, di antara bawah hidung dan atas bibir juga di belakang pipi dekat telinga",
    urlGambar: "/images/gejala/rambut-halus-pada-wajah.jpg",
  },
];
