import Layout from "@/components/Layout";
import DeleteDialog from "@/components/Modal/DeleteDialog";
import ChakraTable from "@/components/Table/ChakraTable";
import fetcher from "@/utils/fetcher";
import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Column } from "react-table";
import useSWR from "swr";

const columns: Column[] = [
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Nama Lengkap",
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
          <Button
            colorScheme="green"
            size="xs"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Edit
          </Button>
          <Button
            colorScheme="orange"
            size="xs"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Reset Sandi
          </Button>
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
      />
    </Layout>
  );
};

export default Pengguna;
