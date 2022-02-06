import { Avatar, Flex, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";
import { FC } from "react";
import AvatarSign from "./AvatarSign";
import Sidebar from "./Sidebar";

const Layout: FC<{ title?: string; header?: string }> = ({
  title,
  header,
  children,
}) => {
  return (
    <>
      <Head>{title ? <title>{title}</title> : <title>SP Kulit</title>}</Head>

      <Flex bgColor={"gray.100"} minH={"100vh"} px={6}>
        <Sidebar />

        <Flex flexDirection={"column"} w="full" overflow={"auto"}>
          <Flex
            h={"58px"}
            my={4}
            px={4}
            top={4}
            align={"center"}
            rounded={"lg"}
            bgColor={"white"}
            boxShadow={"sm"}
            justifyContent={"space-between"}
            position={"sticky"}
            zIndex="overlay"
          >
            <Text
              fontFamily={"Inter"}
              fontWeight={"semibold"}
              fontSize={20}
              color={"gray.600"}
            >
              {header}
            </Text>
            <AvatarSign />
          </Flex>
          <Flex mt={2} mb={4}>
            {children}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Layout;
