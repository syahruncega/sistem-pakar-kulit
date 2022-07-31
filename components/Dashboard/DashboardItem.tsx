import { FC } from "react";
import NextLink from "next/link";
import { Center, Flex, Heading, Text } from "@chakra-ui/react";

const DashboardItem: FC<{
  href: string;
  label: string;
  value: string;
  icon: JSX.Element;
}> = ({ href, label, icon, value }) => {
  return (
    <NextLink href={href} passHref>
      <Flex
        cursor={"pointer"}
        rounded={"lg"}
        bgColor={"white"}
        w="full"
        h={"auto"}
        boxShadow={"lg"}
        py={2}
        px={4}
        flexDir="column"
      >
        <Flex align={"center"}>
          {icon}
          <Text
            fontWeight={"medium"}
            fontSize={20}
            color={"gray.600"}
            fontFamily="Inter"
          >
            {label}
          </Text>
        </Flex>
        <Center>
          <Heading color={"gray.600"}>{value}</Heading>
        </Center>
      </Flex>
    </NextLink>
  );
};

export default DashboardItem;
