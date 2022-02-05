import FormUbahKataSandiModal from "@/components/Form/FormUbahKataSandiModal";
import FormUbahProfileModal from "@/components/Form/FormUbahProfileModal";
import Layout from "@/components/Layout";
import LogoutDialog from "@/components/Modal/LogoutDialog";
import { Avatar, Badge, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";

const Profil: NextPage<{}> = () => {
  const { data: session }: any = useSession();
  if (!session) {
    return null;
  }
  return (
    <Layout title="Profil - SP Kulit" header="Profil">
      <Flex
        w={"full"}
        flexDirection="column"
        rounded="lg"
        boxShadow={"lg"}
        bgColor="white"
        p={6}
      >
        <Flex>
          <Avatar size={"xl"} name={session.user?.name} src="#" mr={4} />
          <Flex flexDirection={"column"} w="full" h="max-content">
            <Flex flexDirection={"row"} alignItems="center">
              <Heading mr={4}>{session.user?.name}</Heading>
              <Badge colorScheme="green" h={"min-content"}>
                {session.user?.role}
              </Badge>
            </Flex>
            <Heading size={"lg"} color="gray.500">
              {session.user?.email}
            </Heading>
          </Flex>
        </Flex>
        <Flex mt={8} justifyContent="space-between">
          <Stack direction={"row"}>
            <FormUbahProfileModal user={session.user} />
            <FormUbahKataSandiModal user={session.user} />
          </Stack>
          <LogoutDialog isButton />
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Profil;
