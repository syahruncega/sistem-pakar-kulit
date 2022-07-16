import Layout from "@/components/Layout";
import DeleteDialog from "@/components/Modal/DeleteDialog";
import ChakraTable from "@/components/Table/ChakraTable";
import fetcher from "@/utils/fetcher";
import { Flex, Stack } from "@chakra-ui/react";
import { NextPage } from "next";
import { Column } from "react-table";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import ModalHasilDiagnosa from "@/components/Modal/ModalHasilDiagnosa";

const columns: Column[] = [
  {
    Header: "Nama Pasien",
    accessor: "pasien.namaPasien",
  },
  {
    Header: "NIK",
    accessor: "pasien.nik",
  },
  {
    Header: "Jenis Kelamin",
    accessor: "pasien.jenisKelamin",
  },
  {
    Header: "Hasil Diagnosa",
    accessor: (originalRow) => originalRow,
    Cell: ({ cell: { value } }) => {
      return (
        <Stack direction="row">
          <ModalHasilDiagnosa
            bahanPemutih={value.bahanPemutih}
            nilaiCF={value.nilaiCF}
          />
        </Stack>
      );
    },
  },
  {
    Header: "Aksi",
    accessor: (originalRow) => originalRow,
    Cell: ({ cell: { value } }) => {
      return (
        <Stack direction="row">
          <DeleteDialog
            title={"Hapus riwayat diagnosa?"}
            apiRoute={`/api/riwayat-diagnosa/${value.id}`}
            mutateKey={`/api/riwayat-diagnosa`}
          />
        </Stack>
      );
    },
  },
];

const RiwayatDiagnosa: NextPage<{}> = () => {
  const { data } = useSWR("/api/riwayat-diagnosa", fetcher);
  const { data: session }: any = useSession();
  if (!data || !session) {
    return null;
  }
  return (
    <Layout title="Riwayat Diagnosa - SP Kulit" header="Riwayat Diagnosa">
      <Flex w="full">
        <ChakraTable
          columns={columns}
          data={data}
          tableNumber={true}
          search={true}
        />
      </Flex>
    </Layout>
  );
};

export default RiwayatDiagnosa;
