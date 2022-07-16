import { ArrowLeftBoldIcon, TickSquareBoldIcon } from "@/styles/iconsax";
import { Button, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { useSistemPakar } from "contexts/SistemPakarContext";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import mdStyle from "@/styles/Markdown.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import axios, { AxiosResponse } from "axios";
import showToast from "../CustomToast";

const TabHasilDiagnosa: FC<{ setTabIndex: Function }> = ({ setTabIndex }) => {
  const { pasien, gejala, diagnosa } = useSistemPakar();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // async function saveToRiwayatDiagnosa() {
  //   setLoading(true);
  //   console.log(diagnosa[0].cfValue);
  //   try {
  //     const res = await axios.post("/api/riwayat-diagnosa", {
  //       idPasien: pasien.id,
  //       idBahanPemutih: diagnosa[0].bahanPemutih.id,
  //       gejala: gejala,
  //       detail: diagnosa,
  //       nilaiCF: diagnosa[0].cfValue,
  //     });
  //     showToast({
  //       title: "Berhasil",
  //       description: "Data berhasil disimpan.",
  //     });
  //     router.push("/");
  //   } catch (error: any) {
  //     showToast({
  //       title: "Terjadi Kesalahan",
  //       description: error.message,
  //       status: "error",
  //     });
  //   }
  //   setLoading(false);
  // }

  return (
    <Flex
      flexDirection={"column"}
      justifyContent="center"
      alignItems={"center"}
      mx={4}
      w="full"
    >
      <Heading
        size={"lg"}
        mb={2}
      >{`${diagnosa[0].bahanPemutih.jenisBahanPemutih}`}</Heading>
      <Heading size={"md"} mb={4}>{`Presentasi (${Math.round(
        diagnosa[0].cfValue * 100
      )} %)`}</Heading>
      <Text size={"md"} fontWeight="bold" mb={2}>
        {`Kadar Maksimal Penggunaan: ${diagnosa[0].bahanPemutih.presentaseKadarMax}`}
      </Text>
      <Text size={"md"} fontWeight="bold" mb={2}>
        Solusi:
      </Text>
      <ReactMarkdown remarkPlugins={[remarkGfm]} className={mdStyle.markdown}>
        {diagnosa[0].bahanPemutih.solusi}
      </ReactMarkdown>
      <Center mt={2}>
        <Button
          colorScheme={"green"}
          mr={4}
          onClick={() => {
            setTabIndex(0);
          }}
          rightIcon={<ArrowLeftBoldIcon mt={"2px"} />}
          disabled={loading}
        >
          Kembali
        </Button>
        <Button
          colorScheme={"facebook"}
          rightIcon={<TickSquareBoldIcon mt={"2px"} />}
          mr={4}
          onClick={() => router.push("/")}
          isLoading={loading}
        >
          Selesai
        </Button>
      </Center>
    </Flex>
  );
};

export default TabHasilDiagnosa;
