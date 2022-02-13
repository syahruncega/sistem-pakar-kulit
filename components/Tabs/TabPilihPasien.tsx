import fetcher from "@/utils/fetcher";
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Select,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import { Gejala } from "@prisma/client";
import { useSistemPakar } from "contexts/SistemPakarContext";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Column } from "react-table";
import useSWR from "swr";
import FormPasienModal from "../Form/FormPasienModal";
import ChakraTable from "../Table/ChakraTable";

const TabPilihPasien: FC<{ setTabIndex: Function }> = ({ setTabIndex }) => {
  const { data: dataPasien } = useSWR<Gejala[]>("/api/pasien", fetcher);
  const { setPasien } = useSistemPakar();

  if (!dataPasien) {
    return null;
  }

  const columns: Column[] = [
    {
      Header: "Nama Pasien",
      accessor: "namaPasien",
    },
    {
      Header: "NIK",
      accessor: "nik",
    },
    {
      Header: "Jenis Kelamin",
      accessor: "jenisKelamin",
    },
    {
      Header: "Usia",
      accessor: (originalRow: any) => `${originalRow.usia} Tahun`,
    },
    {
      Header: "Aksi",
      accessor: (originalRow) => originalRow,
      Cell: ({ cell: { value } }) => {
        return (
          <Button
            size={"xs"}
            colorScheme="teal"
            onClick={() => {
              setPasien(value);
              setTabIndex(1);
            }}
          >
            Pilih
          </Button>
        );
      },
    },
  ];

  return (
    <ChakraTable
      columns={columns}
      data={dataPasien}
      tableNumber={true}
      search={true}
      rightButton={<FormPasienModal />}
    />
  );
};

export default TabPilihPasien;
