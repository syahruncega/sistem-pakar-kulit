import Layout from "@/components/Dashboard/Layout";
import FormPenggunaModal from "@/components/Form/FormPenggunaModal";
import DeleteDialog from "@/components/Modal/DeleteDialog";
import ChakraTable from "@/components/Table/ChakraTable";
import fetcher from "@/utils/fetcher";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  Stack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { Column } from "react-table";
import useSWR from "swr";
import FormResetSandiModal from "@/components/Form/FormResetSandiModal";
import { useSession } from "next-auth/react";

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
  const { data: session }: any = useSession();
  if (!data || !session) {
    return null;
  }
  return (
    <Layout title="Pengguna - SP Kulit" header="Pengguna">
      {session.user?.role === "Admin" ? (
        <Flex w="full">
          <ChakraTable
            columns={columns}
            data={data}
            tableNumber={true}
            search={true}
            rightButton={<FormPenggunaModal />}
          />
        </Flex>
      ) : (
        <Flex justifyContent={"center"} width={"full"} mt={4}>
          <Alert
            status="warning"
            maxWidth={"400px"}
            flexDirection={"column"}
            rounded={"md"}
            justifyContent={"center"}
            boxShadow={"xl"}
          >
            <Flex mb={2}>
              <AlertIcon />
              <AlertTitle mr={2}>Akses ditolak</AlertTitle>
            </Flex>
            <AlertDescription textAlign={"center"}>
              Anda tidak memiliki hak untuk mengakses halaman ini. Silahkan
              hubungi admin.
            </AlertDescription>
          </Alert>
        </Flex>
      )}
    </Layout>
  );
};

export default Pengguna;
