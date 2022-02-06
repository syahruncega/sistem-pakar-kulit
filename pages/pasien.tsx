import Layout from "@/components/Layout";
import DeleteDialog from "@/components/Modal/DeleteDialog";
import ChakraTable from "@/components/Table/ChakraTable";
import fetcher from "@/utils/fetcher";
import { Flex, Stack } from "@chakra-ui/react";
import { NextPage } from "next";
import { Column } from "react-table";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import FormPasienModal from "@/components/Form/FormPasienModal";

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
    accessor: "usia",
  },
  {
    Header: "Aksi",
    accessor: (originalRow) => originalRow,
    Cell: ({ cell: { value } }) => {
      return (
        <Stack direction="row">
          <FormPasienModal isEdit pasien={value} />
          <DeleteDialog
            title={"Hapus pasien?"}
            apiRoute={`/api/pasien/${value.id}`}
            mutateKey={`/api/pasien`}
          />
        </Stack>
      );
    },
  },
];

const Pasien: NextPage<{}> = () => {
  const { data } = useSWR("/api/pasien", fetcher);
  const { data: session }: any = useSession();
  if (!data || !session) {
    return null;
  }
  return (
    <Layout title="Pasien - SP Kulit" header="Pasien">
      <Flex w="full">
        <ChakraTable
          columns={columns}
          data={data}
          tableNumber={true}
          search={true}
          rightButton={<FormPasienModal />}
        />
      </Flex>
    </Layout>
  );
};

export default Pasien;
