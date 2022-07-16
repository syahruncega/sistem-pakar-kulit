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
    kaidah: "IF G001 AND G002 AND G005 AND G006 THEN P001",
    kodeBahanPemutih: "P001",
  },
  {
    rule: "R2",
    kaidah: "IF G001 AND G005 AND G006 AND G007 AND G008 THEN P002",
    kodeBahanPemutih: "P002",
  },
  {
    rule: "R3",
    kaidah: "IF G001 AND  G005 AND G009 AND G010 AND G011 AND G034 THEN P003",
    kodeBahanPemutih: "P003",
  },
  {
    rule: "R4",
    kaidah: "IF G001 AND G012 AND G013 AND G014 THEN P004",
    kodeBahanPemutih: "P004",
  },
  {
    rule: "R5",
    kaidah: "IF G001 AND G005 AND G012 AND G015 THEN P005",
    kodeBahanPemutih: "P005",
  },
  {
    rule: "R6",
    kaidah: "IF G001 AND G002 AND G016 AND G017 THEN P006",
    kodeBahanPemutih: "P006",
  },
  {
    rule: "R7",
    kaidah: "IF G001 AND G002 AND G015 AND G018 AND G020 THEN P007",
    kodeBahanPemutih: "P007",
  },
  {
    rule: "R8",
    kaidah: "IF G021 AND G022 AND G023 AND G024 AND G035 THEN P008",
    kodeBahanPemutih: "P008",
  },
  {
    rule: "R9",
    kaidah: "IF G015 AND G018 AND G025 AND G026 AND G027 THEN P009",
    kodeBahanPemutih: "P009",
  },
  {
    rule: "R10",
    kaidah: "IF G015 AND G028 AND G029 AND G030 AND G031 AND G042 THEN P010",
    kodeBahanPemutih: "P010",
  },
  {
    rule: "R11",
    kaidah: "IF G032 AND G033 AND G034 THEN P011",
    kodeBahanPemutih: "P011",
  },
  {
    rule: "R12",
    kaidah: "IF G003 AND G005 AND G007 AND G015 AND G035 AND G036 THEN P012",
    kodeBahanPemutih: "P012",
  },
  {
    rule: "R13",
    kaidah: "IF G037AND G038 AND G039 AND G040 AND G041 AND G043 THEN P013",
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
    namaGejala: "Iritasi pada kulit",
    nilaiKepastian: 0.5,
  },
  {
    kodeGejala: "G002",
    namaGejala: "Kulit memerah (eritema)",
    nilaiKepastian: 0.8,
  },
  {
    kodeGejala: "G003",
    namaGejala: "Kulit terasa gatal",
    nilaiKepastian: 0.6,
  },
  {
    kodeGejala: "G004",
    namaGejala: "Kulit rasa terbakar",
    nilaiKepastian: 0.9,
  },
  {
    kodeGejala: "G005",
    namaGejala: "Kulit terasa kering",
    nilaiKepastian: 0.6,
  },
  {
    kodeGejala: "G006",
    namaGejala: "Kulit terasa tersengat",
    nilaiKepastian: 0.4,
  },
  {
    kodeGejala: "G007",
    namaGejala: "Kulit bersisik",
    nilaiKepastian: 0.8,
  },
  {
    kodeGejala: "G008",
    namaGejala: "Kulit terasa gatal/terkelupas",
    nilaiKepastian: 0.6,
  },
  {
    kodeGejala: "G009",
    namaGejala: "Kulit semacam pucat dan flek",
    nilaiKepastian: 0.6,
  },
  {
    kodeGejala: "G010",
    namaGejala: "Bintik hitam pada kulit",
    nilaiKepastian: 0.4,
  },
  {
    kodeGejala: "G011",
    namaGejala: "Kulit memerah dan melepuh",
    nilaiKepastian: 0.6,
  },
  {
    kodeGejala: "G012",
    namaGejala: "Kulit kebiruan/kemerahan",
    nilaiKepastian: 0.9,
  },
  {
    kodeGejala: "G013",
    namaGejala: "Nafas terasa sesak",
    nilaiKepastian: 0.8,
  },
  {
    kodeGejala: "G014",
    namaGejala: "Kulit berwarna biru",
    nilaiKepastian: 0.4,
  },
  {
    kodeGejala: "G015",
    namaGejala: "Ruam kemerahan pada kulit",
    nilaiKepastian: 0.5,
  },
  {
    kodeGejala: "G016",
    namaGejala: "Breakout pada kulit",
    nilaiKepastian: 0.6,
  },
  {
    kodeGejala: "G017",
    namaGejala: "Bercak pada kulit",
    nilaiKepastian: 0.9,
  },
  {
    kodeGejala: "G018",
    namaGejala: "Kulit mengalami sensasi terbakar",
    nilaiKepastian: 0.4,
  },
  {
    kodeGejala: "G019",
    namaGejala: "Kulit membengkak",
    nilaiKepastian: 0.8,
  },
  {
    kodeGejala: "G020",
    namaGejala: "Nyeri pada kulit",
    nilaiKepastian: 0.6,
  },
  {
    kodeGejala: "G021",
    namaGejala: "Kulit bengkak disertai memar dan kering",
    nilaiKepastian: 0.9,
  },
  {
    kodeGejala: "G022",
    namaGejala: "Sensasi menyengat pada kulit wajah",
    nilaiKepastian: 0.4,
  },
  {
    kodeGejala: "G023",
    namaGejala: "Bertambah luka pada jerawat",
    nilaiKepastian: 0.5,
  },
  {
    kodeGejala: "G024",
    namaGejala: "Meninggalkan bekas terang/gelap pada area pemakaian",
    nilaiKepastian: 0.6,
  },
  {
    kodeGejala: "G025",
    namaGejala: "Kulit gatal dan bengkak",
    nilaiKepastian: 0.8,
  },
  {
    kodeGejala: "G026",
    namaGejala: "Kulit terasa melepuh",
    nilaiKepastian: 0.5,
  },
  {
    kodeGejala: "G027",
    namaGejala: "Kulit kering dan mengelupas",
    nilaiKepastian: 0.6,
  },
  {
    kodeGejala: "G028",
    namaGejala: "Tumbuhnya kutil",
    nilaiKepastian: 0.8,
  },
  {
    kodeGejala: "G029",
    namaGejala: "Kulit menjadi gelap",
    nilaiKepastian: 0.5,
  },
  {
    kodeGejala: "G030",
    namaGejala: "Perubahan pigmentasi",
    nilaiKepastian: 0.6,
  },
  {
    kodeGejala: "G031",
    namaGejala: "Lesi kulit",
    nilaiKepastian: 0.5,
  },
  {
    kodeGejala: "G032",
    namaGejala: "Iritasi ringan",
    nilaiKepastian: 0.8,
  },
  {
    kodeGejala: "G033",
    namaGejala: "Kulit sensitif terhadap paparan sinar matahari",
    nilaiKepastian: 0.6,
  },
  {
    kodeGejala: "G034",
    namaGejala: "Kulit gatal dan sensasi terbakar",
    nilaiKepastian: 0.4,
  },
  {
    kodeGejala: "G035",
    namaGejala: "Kulit mengelupas",
    nilaiKepastian: 0.9,
  },
  {
    kodeGejala: "G036",
    namaGejala: "Kulit terasa panas",
    nilaiKepastian: 0.6,
  },
  {
    kodeGejala: "G037",
    namaGejala: "Wajah sensistif (mudah memerah dalam paparan sinar matahari)",
    nilaiKepastian: 0.8,
  },
  {
    kodeGejala: "G038",
    namaGejala: "Muncul benjolan kecil putih atau merah pada kulit",
    nilaiKepastian: 0.6,
  },
  {
    kodeGejala: "G039",
    namaGejala: "Muncul memar pada kulit",
    nilaiKepastian: 0.5,
  },
  {
    kodeGejala: "G040",
    namaGejala: "Muncul bercak merah, ungu atau garis di bawah kulit",
    nilaiKepastian: 0.6,
  },
  {
    kodeGejala: "G041",
    namaGejala: "Kulit menjadi tipis dan rapuh",
    nilaiKepastian: 0.4,
  },
  {
    kodeGejala: "G042",
    namaGejala: "Perubahan pada kulit (kulit menggelap)",
    nilaiKepastian: 0.4,
  },
  {
    kodeGejala: "G043",
    namaGejala: "Muncul rambut halus pada wajah",
    nilaiKepastian: 0.6,
  },
];
