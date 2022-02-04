import Layout from "@/components/Layout";
import FormPenggunaModal from "@/components/Form/FormPenggunaModal";
import DeleteDialog from "@/components/Modal/DeleteDialog";
import ChakraTable from "@/components/Table/ChakraTable";
import fetcher from "@/utils/fetcher";
import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Column } from "react-table";
import useSWR from "swr";
import FormResetSandiModal from "@/components/Form/FormResetSandiModal";

const columns: Column[] = [
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Nama Pengguna",
    accessor: "name",
  },
  {
    Header: "Role",
    accessor: "role",
  },

  {
    Header: "Aksi",
    accessor: (originalRow) => originalRow,
    Cell: ({ cell: { value } }) => {
      const router = useRouter();
      return (
        <Stack direction="row">
          <FormPenggunaModal isEdit user={value} />
          <FormResetSandiModal user={value} />
          <DeleteDialog
            title={"Hapus pengguna?"}
            apiRoute={`/api/user/${value.id}`}
            mutateKey={`/api/user`}
          />
        </Stack>
      );
    },
  },
];

const Pengguna: NextPage<{}> = () => {
  const { data } = useSWR("/api/user", fetcher);
  if (!data) {
    return null;
  }
  return (
    <Layout title="Pengguna - SP Kulit" header="Pengguna">
      <ChakraTable
        columns={columns}
        data={data}
        tableNumber={true}
        search={true}
        rightButton={<FormPenggunaModal />}
      />
    </Layout>
  );
};

export default Pengguna;
