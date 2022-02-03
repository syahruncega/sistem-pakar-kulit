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

      <Flex bgColor={"gray.100"} minH={"100vh"}>
        <Sidebar />

        <Flex flexDirection={"column"} w="full" mr={6}>
          <Flex
            h={"58px"}
            w={"full"}
            my={4}
            px={4}
            mx={2}
            top={4}
            rounded={"lg"}
            bgColor={"white"}
            boxShadow={"sm"}
            alignItems={"center"}
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
          <Flex mx={2} my={2} w="full">
            {children}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Layout;
