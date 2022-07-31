import {
  ArrowLeftBoldIcon,
  PrinterBoldIcon,
  TickSquareBoldIcon,
} from "@/styles/iconsax";
import { Button, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { useSistemPakar } from "contexts/SistemPakarContext";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import mdStyle from "@/styles/Markdown.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { printHasilDiagnosa } from "@/utils/printHasilDiagnosa";
import { Gejala } from "@prisma/client";

const TabHasilDiagnosa: FC<{ setTabIndex: Function }> = ({ setTabIndex }) => {
  const { diagnosa, jawaban } = useSistemPakar();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
        <Button
          colorScheme={"telegram"}
          rightIcon={<PrinterBoldIcon mt={"2px"} />}
          mr={4}
          onClick={async () => {
            let gejalaPilihan: any[] = [];
            jawaban.gejala.map((v: Gejala) => {
              if (jawaban.pilihan[`${v.kodeGejala}`] !== undefined) {
                gejalaPilihan.push({
                  gejala: v.namaGejala,
                  jawaban: jawaban.pilihan[`${v.kodeGejala}`],
                });
              }
            });

            console.log(gejalaPilihan);
            await printHasilDiagnosa(
              diagnosa[0].bahanPemutih,
              Math.round(diagnosa[0].cfValue * 100).toString(),
              gejalaPilihan
            );
          }}
          isLoading={loading}
        >
          Cetak
        </Button>
      </Center>
    </Flex>
  );
};

export default TabHasilDiagnosa;
