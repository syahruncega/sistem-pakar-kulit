import ModalMateri from "@/components/Modal/ModalMateri";
import Shell from "@/components/Shell";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Grid,
  Image,
  Text,
} from "@chakra-ui/react";
import { NextPage } from "next";
import NextImage from "next/image";
import React from "react";

const materi = [
  {
    img: "/images/hidroquinone.jpg",
    alt: "Hidroquinone",
    description:
      "Hidroquinone adalah senyawa organik aromatik yang merupakan jenis fenol. Senyawa ini memiliki dua gugus hidroksil yang terikat pada cincin benzena dalam posisi para. Pada penggunaan hidroquinone biasanya  akan muncul rasa terbakar ringan, menyengat, kemerahan, dan menyebabkan kulit kering. Penggunaan hidroquinone dalam jangka panjang juga beresiko menyebabkan ochronosis, kondisi pigmentasi biru kehitaman dan bintik-bintik seperti kaviar yang berkembang di kulit.",
  },
  {
    img: "/images/arbutin.jpg",
    alt: "Arbutin",
    description:
      "Arbutin adalah glikosida; hidrokuinon glikosilasi diekstraksi dari tanaman bearberry dalam genus Arctostaphylos di antara banyak tanaman obat lainnya, terutama dalam keluarga Ericaceae. Beberapa orang yang memiliki kondisi kulit yang sangat sensitif, akan mudah bereaksi terhadap bahan aktif di dalam produk skincare.",
  },
  {
    img: "/images/arsenic.jpg",
    alt: "Arsenic",
    description:
      "Arsen, arsenik, atau arsenikum adalah unsur kimia dalam tabel periodik yang memiliki simbol As dan nomor atom 33. Ini adalah bahan metaloid yang terkenal beracun dan memiliki tiga bentuk alotropik; kuning, hitam, dan abu-abu. Arsenik juga digunakan secara industri dalam pengolahan kaca, pigmen, tekstil, kertas, perekat logam, pengawet kayu, dan amunisi.  Arsenik juga digunakan dalam proses penyamakan kulit, pestisida, aditif pakan, dan obat-obatan",
  },
  {
    img: "/images/asam-retinoat.jpeg",
    alt: "Asam Retinoat",
    description:
      "Retinoic acid atau asam retinoat merupakan salah satu bahan untuk perawatan kecantikan yang memiliki vitamin A derivative. Asam retinoat atau retinoic acid ini termasuk dalam jenis obat topikal yang tentunya hanya digunakan pada area luar tubuh yaitu kulit yang berjerawat. Awal masa penggunaan retinoic acid, biasanya penderita akan mengalami efek samping samping seperti wajah memerah, gatal hingga kulit mengelupas. Pada beberapa kasus, efek samping yang ditimbulkan dari penggunaan obat asam retinoat ini dapat menyebabkan kondisi jerawat semakin lebih parah. Zat yang terkandung pada asam retinoat ini memang dapat mengakibatkan kulit menjadi kering, kemerahan dan mengelupas.",
  },
  {
    img: "/images/benzoyl-peroxide.jpg",
    alt: "Benzoyl Peroxide",
    description:
      "Benzoyl peroxide (benzoil peroksida) adalah obat oles (topikal) yang umum digunakan untuk mengatasi jerawat. Obat ini mengandung zat antibakteri yang berfungsi membunuh Propionibacterium acnes atau P. acnes, bakteri utama penyebab jerawat.",
  },
  {
    img: "/images/klorin.jpg",
    alt: "Klorin",
    description:
      "Klorin merupakan zat kimia yang sering digunakan sebagai bahan disinfektan. Klorin tersedia dalam bentuk padat, cair, maupun gas. Efek klorin sangat negatif untuk kosmetik. Klorin dapat menyebabkan hilangnya kelembaban kulit dan rambut sehingga terlihat keriput dan kering. Kontak dengan cairan klorin dapat menyebabkan kulit dan mata terbakar, Melalui inhalasi uap panas dan absorbsi melaui kulit.",
  },
  {
    img: "/images/kojic-acid.jpg",
    alt: "Kojic Acid",
    description:
      "Asam kojic adalah bahan yang ampuh untuk mencerahkan kulit. Senyawa ini terbuat dari beberapa jenis jamur, di antaranya Acetobacter, Penicillium, dan Aspergillus. Asam kojic cocok sebagai perawatan anti-aging karena mampu menyamarkan noda hitam.Karena mampu menghambat enzim tirosinase, senyawa ini bisa mengurangi produksi melanin sehingga noda hitam tampak samar. Meski mampu mencerahkan kulit, rupanya ada beberapa keluhan yang mungkin saja timbul saat menggunakan asam kojic.Dermatitis kontak merupakan efek samping kojic acid yang cukup umum. Kondisi ini biasanya muncul pada konsentrasi di atas 1%.",
  },
  {
    img: "/images/merkury.jpg",
    alt: "Merkuri",
    description:
      "Merkuri adalah cairan logam perak atau disebut air raksa (Hydrargyrum ). Logam ini adalah logam yang ada secara alami,satu-satunya logam pada suhu kamar (25°C) berwujud cair. Merkuri merupakan unsur transisi dalam susunan tabel periodik unsur, di mana merkuri ada pada golongan II B dan periode 6. Bahaya merkuri pada kosmetik dijelaskan sebagai tanda tanda yang akan ditunjukkan oleh pengguna kosmetik yang mengandung merkuri yang membahayakan kesehatan anda. Efek merkuri pada kosmetik memang tidak akan langsung kelihatan dalam penggunaan satu atau dua kali. Tetapi akan terlihat dampaknya ketika seseorang menggunakan produk mengandung merkuri dalam jangka yang panjang.",
  },
  {
    img: "/images/resorcinol.jpg",
    alt: "Resorcinol",
    description:
      "Resorsinol adalah obat yang bekerja dengan menghancurkan kulit kasar, bersisik, atau mengeras. Resorsinol juga membasmi kuman di kulit untuk membantu melawan infeksi. resorcinol merupakan EDC yang sering digunakan sebagai pengawet, antiseptik dan desinfektan pada produk pewarna rambut, shampoo, serta produk perawatan topikal untuk mengobati jerawat, eksim, dan psoriasis. Dalam dosis yang tinggi, resorcinol termasuk zat beracun dan dapat mengganggu fungsi sistem saraf pusat dan menyebabkan masalah pernapasan.",
  },
  {
    img: "/images/sodium-laureth-sulfate.jpg",
    alt: "Sodium Laureth Sulfate",
    description:
      "Sodium lauryl sulfate atau SLS dikenal sebagai surfaktan yang sering digunakan sebagai bahan pembersih dan pembentuk busa pada banyak produk. Selain itu, SLS juga kerap digunakan sebagai bahan tambahan makanan, biasanya sebagai pengemulsi atau pengental. Sodium lauryl sulfate atau SLS banyak digunakan sebagai surfaktan dalam produk pembersih, kosmetik, dan produk perawatan pribadi. Sama seperti obat pada umumnya, penggunaan sodium lauryl sulfate dapat menimbulkan efek samping. Akan tetapi, reaksinya bisa jadi berbeda-beda, tergantung dari dosis obat, usia, dan daya tahan tubuh masing-masing orang.",
  },
  {
    img: "/images/steroid.jpg",
    alt: "Steroid",
    description:
      "Steroid merupakan krim anti radang yang memiliki efek hipopigmentasi atau dapat memutihkan. Efek tersebut yang sering disalahgunakan oleh produsen kosmetik illegal. Pada awal pemakaian, memang akan memberikan efek yang memukau, dimana kulit wajah terlihat kinclong, glowing dan merona. Namun pemakaian dalam jangka panjang akan mengakibatkan kulit menjadi meradang. Pada orang awam sering dikenal istilah “kulit tipis”, pembuluh darah kelihatan, kulit menjadi lebih sensitif, wajah memerah, atau wajah menghitam (flek) yang tidak bisa hilang total lagi (irreversible). Jika pemakaian krim dihentikan secara mendadak biasanya timbul jerawat dan kulit akan memerah.",
  },
  {
    img: "/images/tretinoin.jpg",
    alt: "Tretinoin",
    description:
      "Tretinoin merupakan salah satu jenis retinoid yang seringkali dimanfaatkan untuk mengobati jerawat.Selama ini, jarang yang mengetahui bahwa tretinoin dapat dijadikan sebagai formula untuk obat produk anti-aging. Jangan menggunakan obat ini apabila kamu memiliki riwayat alergi dengan tretinoin ataupun produk yang serupa, seperti isotretinoin.",
  },
  {
    img: "/images/aha.jpg",
    alt: "AHA (Alpha Hidroxy Acid)",
    description:
      "AHA (Alpha Hidroxy Acid) adalah exfoliant kimia yang digunakan untuk mengelupas permukaan kulit dari tumpukan sel-sel kulit mati dengan cara menghancurkan ikatan antar sel sehingga sel kulit yang mati lebih mudah lepas. Jika digunakan dalam konsentrasi yang cukup tinggi dan dalam jangka panjang, fungsi AHA dapat memengaruhi lapisan kulit yang lebih dalam",
  },
];

const HalamanMateri: NextPage<{}> = () => {
  console.log(materi);
  return (
    <Shell title="Home - e-Clinic" header="Halaman Materi">
      <Grid templateColumns="repeat(3, 1fr)" gap={8}>
        {materi.map((data) => (
          <Box key={data.img} bg="white" shadow={"md"} borderRadius="md" p={3}>
            <Text fontWeight={"medium"} mb={2}>
              {data.alt}
            </Text>
            <AspectRatio
              ratio={4 / 3}
              w="full"
              borderRadius="md"
              overflow={"hidden"}
            >
              <NextImage
                layout="fill"
                objectFit="cover"
                src={data.img}
                placeholder={"blur"}
                alt={data.alt}
                blurDataURL={data.img}
              />
            </AspectRatio>
            <Center mt={2}>
              <ModalMateri
                alt={data.alt}
                img={data.img}
                description={data.description}
              />
            </Center>
          </Box>
        ))}
      </Grid>
    </Shell>
  );
};

export default HalamanMateri;
