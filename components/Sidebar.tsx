import {
  BookBulkIcon,
  BubbleBulkIcon,
  ClipboardBulkIcon,
  ClipboardTextBulkIcon,
  ClipboardTickBulkIcon,
  ElementBulkIcon,
  Profile2UserBulkIcon,
  StickyNoteBulkIcon,
  UserEditBulkIcon,
} from "@/styles/iconsax";
import { Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { FC } from "react";
import NavItem from "./NavItem";

const Sidebar: FC<{}> = () => {
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
    <Flex
      position={"sticky"}
      mx={4}
      my={4}
      px={4}
      top={4}
      rounded={"lg"}
      boxShadow={"md"}
      bgColor={"white"}
      width={"280px"}
      display={["none", "none", "flex"]}
      flexDirection={"column"}
      //Bellow Option
      overflow={"auto"}
      height={"94vh"}
    >
      <Flex
        flexDirection={"column"}
        align={"center"}
        h="min-content"
        w={"full"}
        my={4}
      >
        <Heading size={"md"} color={"gray.500"}>
          Sistem Pakar Kulit
        </Heading>
      </Flex>
      <Divider />
      <Flex my={4} flexDirection={"column"}>
        <Text fontWeight={"extrabold"} fontSize={12} color={"gray.400"}>
          ADMIN
        </Text>
        <NavItem
          label="Pengguna"
          href="/pengguna"
          icon={<UserEditBulkIcon {...navItemProps} />}
          iconActive={<UserEditBulkIcon {...navItemPropsActive} />}
        />
      </Flex>
      <Divider />
      <Flex my={4} flexDirection={"column"}>
        <Text fontWeight={"extrabold"} fontSize={12} color={"gray.400"}>
          USER
        </Text>
        <NavItem
          label="Dashboard"
          href="/"
          icon={<ElementBulkIcon {...navItemProps} />}
          iconActive={<ElementBulkIcon {...navItemPropsActive} />}
          active={true}
        />
        <NavItem
          label="Halaman Materi"
          href="/halaman-materi"
          icon={<ClipboardBulkIcon {...navItemProps} />}
          iconActive={<ClipboardBulkIcon {...navItemPropsActive} />}
        />
      </Flex>
      <Divider />
      <Flex mt={2} mb={4} flexDirection={"column"}>
        <NavItem
          label="Basis Pengetahuan"
          href="/basis-pengetahuan"
          icon={<BookBulkIcon {...navItemProps} />}
          iconActive={<BookBulkIcon {...navItemPropsActive} />}
        />
        <NavItem
          label="Gejala"
          href="/gejala"
          icon={<ClipboardTextBulkIcon {...navItemProps} />}
          iconActive={<ClipboardTextBulkIcon {...navItemPropsActive} />}
        />
        <NavItem
          label="Penyakit"
          href="/penyakit"
          icon={<BubbleBulkIcon {...navItemProps} />}
          iconActive={<BubbleBulkIcon {...navItemPropsActive} />}
        />
        <NavItem
          label="Solusi"
          href="/solusi"
          icon={<ClipboardTickBulkIcon {...navItemProps} />}
          iconActive={<ClipboardTickBulkIcon {...navItemPropsActive} />}
        />
      </Flex>
      <Divider />
      <Flex my={4} flexDirection={"column"}>
        <Text fontWeight={"extrabold"} fontSize={12} color={"gray.400"}>
          DIAGNOSA
        </Text>
        <NavItem
          label="Pasien"
          href="/pasien"
          icon={<Profile2UserBulkIcon {...navItemProps} />}
          iconActive={<Profile2UserBulkIcon {...navItemPropsActive} />}
        />
        <NavItem
          label="Riwayat Diagnosa"
          href="/riwayat-diagnosa"
          icon={<StickyNoteBulkIcon {...navItemProps} />}
          iconActive={<StickyNoteBulkIcon {...navItemPropsActive} />}
        />
      </Flex>
    </Flex>
  );
};

export default Sidebar;
