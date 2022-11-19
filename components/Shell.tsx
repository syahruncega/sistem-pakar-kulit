import { FC } from "react";

import {
  chakra,
  Box,
  Flex,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  Container,
  Link,
} from "@chakra-ui/react";
import Head from "next/head";
import { AiOutlineMenu } from "react-icons/ai";

import NextLink from "next/link";
import { useSession } from "next-auth/react";

const Shell: FC<{ title?: string; header?: string }> = ({
  children,
  title,
  header,
}) => {
  const bg = "white";
  const mobileNav = useDisclosure();
  const { data: session } = useSession();
  return (
    <>
      <Head>{<title>{title ?? "e-Clinic"}</title>}</Head>
      <Box minH={"100vh"} bg="gray.100">
        <chakra.header
          bg={bg}
          borderColor="gray.300"
          borderBottomWidth={2}
          w="full"
          px={{
            base: 2,
            sm: 4,
          }}
          py={4}
          shadow="lg"
        >
          <Container maxW={"1000px"} px={6}>
            <Flex alignItems="center" justifyContent="space-between" mx="auto">
              <HStack spacing={4} display="flex" alignItems="center">
                <Box
                  display={{
                    base: "inline-flex",
                    md: "none",
                  }}
                >
                  <IconButton
                    display={{
                      base: "flex",
                      md: "none",
                    }}
                    aria-label="Open menu"
                    fontSize="20px"
                    color="gray.800"
                    _dark={{
                      color: "inherit",
                    }}
                    variant="ghost"
                    icon={<AiOutlineMenu />}
                    onClick={mobileNav.onOpen}
                  />
                  <VStack
                    pos="absolute"
                    top={0}
                    left={0}
                    right={0}
                    display={mobileNav.isOpen ? "flex" : "none"}
                    flexDirection="column"
                    p={2}
                    pb={4}
                    m={2}
                    bg={bg}
                    spacing={3}
                    rounded="sm"
                    shadow="sm"
                  >
                    <CloseButton
                      aria-label="Close menu"
                      justifySelf="self-start"
                      color={"gray"}
                      onClick={mobileNav.onClose}
                    />
                    {session && (
                      <NextLink href={"/dashboard/"} passHref>
                        <Button
                          as={Link}
                          variant="ghost"
                          colorScheme={"gray"}
                          size="md"
                          w="full"
                        >
                          Dashboard
                        </Button>
                      </NextLink>
                    )}

                    {/* <NextLink href={"/halaman-materi"} passHref>
                      <Button
                        as={Link}
                        variant="ghost"
                        colorScheme={"gray"}
                        size="md"
                        w="full"
                      >
                        Halaman Materi
                      </Button>
                    </NextLink> */}

                    <NextLink
                      href={
                        session?.user?.name ? "/dashboard/profil" : "/login"
                      }
                      passHref
                    >
                      <Button
                        as={Link}
                        variant="ghost"
                        colorScheme={"gray"}
                        size="md"
                        w="full"
                      >
                        {session?.user?.name
                          ? `Hi ${session.user?.name}`
                          : "Login"}
                      </Button>
                    </NextLink>
                  </VStack>
                </Box>
                <NextLink href={"/"} passHref>
                  <chakra.a
                    fontSize="2xl"
                    color={"black"}
                    fontWeight="bold"
                    fontFamily={"ubuntu"}
                    textColor={"gray.700"}
                  >
                    e-Clinic
                  </chakra.a>
                </NextLink>
              </HStack>
              <HStack spacing={3} display="flex" alignItems="center">
                <HStack
                  spacing={3}
                  display={{
                    base: "none",
                    md: "inline-flex",
                  }}
                  fontFamily="inter"
                >
                  {session && (
                    <NextLink href={"/dashboard/"} passHref>
                      <Button
                        as={Link}
                        variant="ghost"
                        colorScheme={"gray"}
                        size="md"
                      >
                        Dashboard
                      </Button>
                    </NextLink>
                  )}

                  {/* <NextLink href={"/halaman-materi"} passHref>
                    <Button
                      as={Link}
                      variant="ghost"
                      colorScheme={"gray"}
                      size="md"
                    >
                      Halaman Materi
                    </Button>
                  </NextLink> */}

                  <NextLink
                    href={session?.user?.name ? "/dashboard/profil" : "/login"}
                    passHref
                  >
                    <Button
                      as={Link}
                      variant="ghost"
                      colorScheme={"gray"}
                      size="md"
                    >
                      {session?.user?.name
                        ? `Hi ${session.user?.name}`
                        : "Login"}
                    </Button>
                  </NextLink>
                </HStack>
              </HStack>
            </Flex>
          </Container>
        </chakra.header>
        <Container maxW={"1000px"} p={6}>
          {header && (
            <chakra.h1
              textAlign={"center"}
              fontSize="3xl"
              fontFamily={"barlow"}
              fontWeight={"bold"}
              mb={6}
            >
              {header}
            </chakra.h1>
          )}

          {children}
        </Container>
      </Box>
    </>
  );
};

export default Shell;
