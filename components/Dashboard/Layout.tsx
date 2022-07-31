import {
  Box,
  Button,
  CloseButton,
  Divider,
  Flex,
  IconButton,
  Link,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import { FC } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import AvatarSign from "./AvatarSign";
import Sidebar from "./Sidebar";
import NextLink from "next/link";
import NavItem from "./NavItem";
import {
  BookBulkIcon,
  BubbleBulkIcon,
  ClipboardTextBulkIcon,
  ElementBulkIcon,
  UserEditBulkIcon,
} from "@/styles/iconsax";

const Layout: FC<{ title?: string; header?: string }> = ({
  title,
  header,
  children,
}) => {
  const mobileNav = useDisclosure();
  const navItemProps = {
    fontSize: 16,
    color: "facebook.500",
    className: "navItemIcon",
    transition: "0.2s",
  };
  const navItemPropsActive = {
    fontSize: 16,
    color: "white",
    className: "navItemIconActive",
    transition: "0.2s",
  };
  return (
    <>
      <Head>{<title>{title ?? "e-Clinic"}</title>}</Head>

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
                p={2}
                pb={4}
                m={2}
                bg={"white"}
                spacing={3}
                rounded="sm"
                shadow="sm"
                alignItems={"start"}
              >
                <CloseButton
                  aria-label="Close menu"
                  justifySelf="self-start"
                  color={"gray"}
                  onClick={mobileNav.onClose}
                />
                <NavItem
                  label="Dashboard"
                  href="/dashboard"
                  icon={<ElementBulkIcon {...navItemProps} />}
                  iconActive={<ElementBulkIcon {...navItemPropsActive} />}
                />
                <Divider mt={4} mb={2} />

                <Text fontWeight={"extrabold"} fontSize={12} color={"gray.400"}>
                  ADMIN
                </Text>
                <NavItem
                  label="Pengguna"
                  href="/dashboard/pengguna"
                  icon={<UserEditBulkIcon {...navItemProps} />}
                  iconActive={<UserEditBulkIcon {...navItemPropsActive} />}
                />
                <NavItem
                  label="Gejala"
                  href="/dashboard/gejala"
                  icon={<ClipboardTextBulkIcon {...navItemProps} />}
                  iconActive={<ClipboardTextBulkIcon {...navItemPropsActive} />}
                />
                <NavItem
                  label="Basis Pengetahuan"
                  href="/dashboard/basis-pengetahuan"
                  icon={<BookBulkIcon {...navItemProps} />}
                  iconActive={<BookBulkIcon {...navItemPropsActive} />}
                />
                <NavItem
                  label="Bahan Pemutih"
                  href="/dashboard/bahan-pemutih"
                  icon={<BubbleBulkIcon {...navItemProps} />}
                  iconActive={<BubbleBulkIcon {...navItemPropsActive} />}
                />
              </VStack>
            </Box>
            <Text
              fontFamily={"Inter"}
              fontWeight={"semibold"}
              fontSize={[16, 18, 20]}
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
