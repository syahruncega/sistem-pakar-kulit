import Layout from "@/components/Layout";
import DeleteDialog from "@/components/Modal/DeleteDialog";
import ChakraTable from "@/components/Table/ChakraTable";
import fetcher from "@/utils/fetcher";
import { Flex, Stack } from "@chakra-ui/react";
import { NextPage } from "next";
import { Column } from "react-table";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import FormBasisPengetahuanModal from "@/components/Form/FormBasisPengetahuanModal";

const columns: Column[] = [
  {
    Header: "Rule",
    accessor: "rule",
  },
  {
    Header: "Kaidah",
    accessor: "kaidah",
  },
  {
    Header: "Aksi",
    accessor: (originalRow) => originalRow,
    Cell: ({ cell: { value } }) => {
      return (
        <Stack direction="row">
          <FormBasisPengetahuanModal isEdit basisPengetahuan={value} />
          <DeleteDialog
            title={"Hapus basis pengetahuan?"}
            apiRoute={`/api/basis-pengetahuan/${value.id}`}
            mutateKey={`/api/basis-pengetahuan`}
          />
        </Stack>
      );
    },
  },
];

const BasisPengetahuan: NextPage<{}> = () => {
  const { data } = useSWR("/api/basis-pengetahuan", fetcher);
  const { data: session }: any = useSession();
  if (!data || !session) {
    return null;
  }
  return (
    <Layout title="Basis Pengetahuan - SP Kulit" header="Basis Pengetahuan">
      <Flex w="full">
        <ChakraTable
          columns={columns}
          data={data}
          tableNumber={true}
          search={true}
          rightButton={<FormBasisPengetahuanModal />}
        />
      </Flex>
    </Layout>
  );
};

export default BasisPengetahuan;
