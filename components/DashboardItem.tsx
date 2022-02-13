import { FC } from "react";
import NextLink from "next/link";
import { Center, Flex, Heading, Text } from "@chakra-ui/react";

const DashboardItem: FC<{
  href: string;
  label: string;
  icon: JSX.Element;
  color: string;
}> = ({ href, label, icon, color }) => {
  return (
    <NextLink href={href} passHref>
      <Flex
        cursor={"pointer"}
        rounded={"lg"}
        bgColor={"white"}
        w="full"
        h={"100px"}
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
          <Heading color={"gray.600"}>20</Heading>
        </Center>
      </Flex>
    </NextLink>
  );
};

export default DashboardItem;
