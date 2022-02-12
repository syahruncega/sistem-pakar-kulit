import Layout from "@/components/Layout";
import FormPenggunaModal from "@/components/Form/FormPenggunaModal";
import DeleteDialog from "@/components/Modal/DeleteDialog";
import ChakraTable from "@/components/Table/ChakraTable";
import fetcher from "@/utils/fetcher";
import { Button, Flex, Stack } from "@chakra-ui/react";
import { NextPage } from "next";
import { Column } from "react-table";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import FormBahanPemutihModal from "@/components/Form/FormBahanPemutihModal";
import ModalSolusi from "@/components/Modal/ModalSolusi";

const columns: Column[] = [
  {
    Header: "Kode",
    accessor: "kodeBahanPemutih",
  },
  {
    Header: "Jenis",
    accessor: "jenisBahanPemutih",
  },
  {
    Header: "Presentase Kadar Max",
    accessor: "presentaseKadarMax",
  },
  {
    Header: "Solusi",
    accessor: (originalRow) => originalRow,
    Cell: ({ cell: { value } }) => {
      return (
        <Stack direction="row">
          <ModalSolusi solusi={value.solusi} />
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
          <FormBahanPemutihModal isEdit bahanPemutih={value} />
          <DeleteDialog
            title={"Hapus bahan pemutih?"}
            apiRoute={`/api/bahan-pemutih/${value.id}`}
            mutateKey={`/api/bahan-pemutih`}
          />
        </Stack>
      );
    },
  },
];

const BahanPemutih: NextPage<{}> = () => {
  const { data } = useSWR("/api/bahan-pemutih", fetcher);
  const { data: session }: any = useSession();
  if (!data || !session) {
    return null;
  }
  return (
    <Layout title="Bahan Pemutih - SP Kulit" header="Bahan Pemutih">
      <Flex w="full">
        <ChakraTable
          columns={columns}
          data={data}
          tableNumber={true}
          search={true}
          rightButton={<FormBahanPemutihModal />}
        />
      </Flex>
    </Layout>
  );
};

export default BahanPemutih;
