import Layout from "@/components/Dashboard/Layout";
import DeleteDialog from "@/components/Modal/DeleteDialog";
import ChakraTable from "@/components/Table/ChakraTable";
import fetcher from "@/utils/fetcher";
import { Flex, Stack } from "@chakra-ui/react";
import { NextPage } from "next";
import { Column } from "react-table";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import FormGejalaModal from "@/components/Form/FormGejalaModal";
import ModalDetailGejala from "@/components/Modal/ModalDetailGejala";

const columns: Column[] = [
  {
    Header: "Kode",
    accessor: "kodeGejala",
  },
  {
    Header: "Nama Gejala",
    accessor: "namaGejala",
  },
  {
    Header: "Nilai Kepastian",
    accessor: "nilaiKepastian",
  },
  {
    Header: "Keterangan",
    accessor: (originalRow) => originalRow,
    Cell: ({ cell: { value } }) => {
      return <ModalDetailGejala gejala={value} />;
    },
  },
  {
    Header: "Aksi",
    accessor: (originalRow) => originalRow,
    Cell: ({ cell: { value } }) => {
      return (
        <Stack direction="row">
          <FormGejalaModal isEdit gejala={value} />
          <DeleteDialog
            title={"Hapus gejala?"}
            apiRoute={`/api/gejala/${value.id}`}
            mutateKey={`/api/gejala`}
          />
        </Stack>
      );
    },
  },
];

const Gejala: NextPage<{}> = () => {
  const { data } = useSWR("/api/gejala", fetcher);
  const { data: session }: any = useSession();
  if (!data || !session) {
    return null;
  }
  return (
    <Layout title="Gejala - SP Kulit" header="Gejala">
      <Flex w="full">
        <ChakraTable
          columns={columns}
          data={data}
          tableNumber={true}
          search={true}
          rightButton={<FormGejalaModal />}
        />
      </Flex>
    </Layout>
  );
};

export default Gejala;
