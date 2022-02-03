import { Flex, Text, Link, Box } from "@chakra-ui/react";
import React, { FC } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";

const NavItem: FC<{
  label: string;
  icon: JSX.Element;
  iconActive: JSX.Element;
  href: string;
}> = ({ label, icon, iconActive, href }) => {
  const router = useRouter();
  const active =
    label === "Dashboard"
      ? router.pathname === "/"
      : router.pathname.includes(href);
  return (
    <NextLink href={href} passHref>
      <Flex
        align="center"
        mt={3}
        cursor={"pointer"}
        _hover={{
          ".navItemIcon": { color: "white" },
          ".navItemLabel": { transform: "scale(1.04)" },
          ".navItemBoxIcon": { bgColor: "facebook.500" },
        }}
      >
        <Flex
          boxShadow={"md"}
          bgColor={active ? "facebook.500" : "facebook.100"}
          p={"6px"}
          align={"center"}
          justifyContent={"center"}
          rounded={"md"}
          mr={3}
          transition={"0.2s"}
          className="navItemBoxIcon"
        >
          {active ? iconActive : icon}
        </Flex>
        <Text
          className="navItemLabel"
          fontSize={14}
          style={{ transition: "0.15s" }}
          fontWeight={active ? "semibold" : "regular"}
          color={active ? "gray.800" : "gray.500"}
        >
          {label}
        </Text>
      </Flex>
    </NextLink>
  );
};

export default NavItem;
