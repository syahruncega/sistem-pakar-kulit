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
    email: "syahruncega@gmail.com",
    name: "Syahrun Cega",
    hash: hasher("syahruncega"),
    role: "Admin",
    verified: true,
  },
  {
    email: "user@gmail.com",
    name: "User",
    hash: hasher("user"),
    role: "User",
    verified: true,
  },
];

const bahanPemutih = [
  {
    kodeBahanPemutih: "P001",
    jenisBahanPemutih: "Hidroquinone",
  },
  {
    kodeBahanPemutih: "P002",
    jenisBahanPemutih: "Asam Retinoat",
  },
  {
    kodeBahanPemutih: "P003",
    jenisBahanPemutih: "Merkury",
  },
  {
    kodeBahanPemutih: "P004",
    jenisBahanPemutih: "Resorcinol",
  },
  {
    kodeBahanPemutih: "P005",
    jenisBahanPemutih: "Klorin",
  },
  {
    kodeBahanPemutih: "P006",
    jenisBahanPemutih: "Arbutin",
  },
  {
    kodeBahanPemutih: "P007",
    jenisBahanPemutih: "Kojic Acid",
  },
  {
    kodeBahanPemutih: "P008",
    jenisBahanPemutih: "Tretinoin",
  },
  {
    kodeBahanPemutih: "P009",
    jenisBahanPemutih: "Benzoyl Peroxide",
  },
  {
    kodeBahanPemutih: "P010",
    jenisBahanPemutih: "Arsenic",
  },
  {
    kodeBahanPemutih: "P011",
    jenisBahanPemutih: "AHA (Alpha Hydroxy Acid)",
  },
  {
    kodeBahanPemutih: "P012",
    jenisBahanPemutih: "Sodium Laureth Sulfate",
  },
  {
    kodeBahanPemutih: "P013",
    jenisBahanPemutih: "Steroid",
  },
];

const gejala = [
  {
    kodeGejala: "G001",
    namaGejala: "Iritasi pada kulit",
    nilaiKepastian: 1.0,
  },
  {
    kodeGejala: "G002",
    namaGejala: "Kulit memerah (eritema)",
    nilaiKepastian: 1.0,
  },
  {
    kodeGejala: "G003",
    namaGejala: "Kulit terasa gatal",
    nilaiKepastian: 1.0,
  },
  {
    kodeGejala: "G004",
    namaGejala: "Kulit rasa terbakar",
    nilaiKepastian: 1.0,
  },
  {
    kodeGejala: "G005",
    namaGejala: "Kulit terasa kering",
    nilaiKepastian: 0.8,
  },
  {
    kodeGejala: "G006",
    namaGejala: "Kulit terasa tersengat",
    nilaiKepastian: 1.0,
  },
  {
    kodeGejala: "G007",
    namaGejala: "Kulit bersisik",
    nilaiKepastian: 0.6,
  },
  {
    kodeGejala: "G008",
    namaGejala: "Kulit terasa gatal/terkelupas",
    nilaiKepastian: 1.0,
  },
  {
    kodeGejala: "G009",
    namaGejala: "Kulit semacam pucat dan flek",
    nilaiKepastian: 1.0,
  },
  {
    kodeGejala: "G010",
    namaGejala: "Bintik hitam pada kulit",
    nilaiKepastian: 1.0,
  },
  {
    kodeGejala: "G011",
    namaGejala: "Kerusakan pada sistem pencernaan",
    nilaiKepastian: 0.8,
  },
  {
    kodeGejala: "G012",
    namaGejala: "Tremor fisik",
    nilaiKepastian: 0.6,
  },
  {
    kodeGejala: "G013",
    namaGejala: "Gangguan penglihatan",
    nilaiKepastian: 0.6,
  },
  {
    kodeGejala: "G014",
    namaGejala: "Berkurangnya fungsi otak",
    nilaiKepastian: 0.8,
  },
  {
    kodeGejala: "G015",
    namaGejala: "Kulit kebiruan/kemerahan",
    nilaiKepastian: 1.0,
  },
  {
    kodeGejala: "G016",
    namaGejala: "Iritasi mata",
    nilaiKepastian: 0.8,
  },
  {
    kodeGejala: "G017",
    namaGejala: "Sakit kepala berlanjut",
    nilaiKepastian: 1.0,
  },
  {
    kodeGejala: "G018",
    namaGejala: "Ruam kemerahan pada kulit",
    nilaiKepastian: 1.0,
  },
  {
    kodeGejala: "G019",
    namaGejala: "Breakout pada kulit",
    nilaiKepastian: 1.0,
  },
  {
    kodeGejala: "G020",
    namaGejala: "Bercak pada kulit",
    nilaiKepastian: 1.0,
  },
  {
    kodeGejala: "G021",
    namaGejala: "Kulit mengalami sensasi terbakar",
    nilaiKepastian: 1.0,
  },
  {
    kodeGejala: "G022",
    namaGejala: "Kulit membengkak",
    nilaiKepastian: 0.8,
  },
  {
    kodeGejala: "G023",
    namaGejala: "Nyeri pada kulit",
    nilaiKepastian: 0.8,
  },
  {
    kodeGejala: "G024",
    namaGejala: "Kulit bengkak disertai memar dan kering",
    nilaiKepastian: 0.6,
  },
  {
    kodeGejala: "G025",
    namaGejala: "Sensasi menyengat pada kulit wajah",
    nilaiKepastian: 1.0,
  },
  {
    kodeGejala: "G026",
    namaGejala: "Bertambah luka pada jerawat",
    nilaiKepastian: 0.8,
  },
  {
    kodeGejala: "G027",
    namaGejala: "Meninggalkan bekas terang/gelap pada area pemakaian",
    nilaiKepastian: 0.6,
  },
  {
    kodeGejala: "G028",
    namaGejala: "Kulit gatal dan bengkak",
    nilaiKepastian: 1.0,
  },
  {
    kodeGejala: "G029",
    namaGejala: "Kulit terasa melepuh",
    nilaiKepastian: 1.0,
  },
  {
    kodeGejala: "G030",
    namaGejala: "Kulit kering dan mengelupas",
    nilaiKepastian: 0.8,
  },
  {
    kodeGejala: "G031",
    namaGejala: "Tumbuhnya kutil",
    nilaiKepastian: 0.8,
  },
  {
    kodeGejala: "G032",
    namaGejala: "Munculnya garis putih pada kuku",
    nilaiKepastian: 0.6,
  },
  {
    kodeGejala: "G033",
    namaGejala: "Perubahan pigmentasi",
    nilaiKepastian: 1.0,
  },
  {
    kodeGejala: "G034",
    namaGejala: "Lesi kulit",
    nilaiKepastian: 1.0,
  },
  {
    kodeGejala: "G035",
    namaGejala: "Penebalan kulit telapak tangan, kaki dan dada",
    nilaiKepastian: 0.6,
  },
  {
    kodeGejala: "G036",
    namaGejala: "Bercak keras pada telapk kaki dan tangan",
    nilaiKepastian: 0.6,
  },
  {
    kodeGejala: "G037",
    namaGejala: "Iritasi ringan",
    nilaiKepastian: 0.4,
  },
  {
    kodeGejala: "G038",
    namaGejala: "Kulit sensitif terhadap paparan sinar matahari",
    nilaiKepastian: 0.8,
  },
  {
    kodeGejala: "G039",
    namaGejala: "Kulit gatal dan sensasi terbakar",
    nilaiKepastian: 1.0,
  },
  {
    kodeGejala: "G040",
    namaGejala: "Kulit mengelupas",
    nilaiKepastian: 1.0,
  },
  {
    kodeGejala: "G041",
    namaGejala: "Kulit terasa panas",
    nilaiKepastian: 1.0,
  },
  {
    kodeGejala: "G042",
    namaGejala: "Perih pada mata, memerah serta berair",
    nilaiKepastian: 1.0,
  },
  {
    kodeGejala: "G043",
    namaGejala: "Wajah sensistif (mudah memerah dalam paparan sinar matahari)",
    nilaiKepastian: 0.8,
  },
  {
    kodeGejala: "G044",
    namaGejala: "Muncul benjolan kecil putih atau merah pada kulit",
    nilaiKepastian: 1.0,
  },
  {
    kodeGejala: "G045",
    namaGejala: "Muncul memar pada kulit",
    nilaiKepastian: 1.0,
  },
  {
    kodeGejala: "G046",
    namaGejala: "Muncul bercak merah, ungu atau garis di bawah kulit",
    nilaiKepastian: 0.8,
  },
  {
    kodeGejala: "G047",
    namaGejala: "Kulit menjadi tipis dan rapuh",
    nilaiKepastian: 1.0,
  },
  {
    kodeGejala: "G048",
    namaGejala: "Perubahan pada kulit (kulit menggelap)",
    nilaiKepastian: 0.8,
  },
  {
    kodeGejala: "G049",
    namaGejala: "Muncul rambut halus pada wajah",
    nilaiKepastian: 0.8,
  },
];
