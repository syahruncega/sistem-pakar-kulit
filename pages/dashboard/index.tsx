import DashboardItem from "@/components/Dashboard/DashboardItem";
import Layout from "@/components/Dashboard/Layout";
import {
  ArrowRightBoldIcon,
  BookBulkIcon,
  BubbleBulkIcon,
  ClipboardTextBulkIcon,
  Profile2UserBulkIcon,
} from "@/styles/iconsax";
import fetcher from "@/utils/fetcher";
import { Button, Flex, Grid, Link } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import NextLink from "next/link";
import useSWR from "swr";

const Dashboard: NextPage = () => {
  const { data } = useSWR("/api/count", fetcher);
  const { data: session }: any = useSession();
  if (!data || !session) {
    return null;
  }

  const iconProps = {
    p: "8px",
    fontSize: 36,
    rounded: "full",
    mr: 3,
  };
  return (
    <Layout header="Dashboard" title="Dashboard - SP Kulit">
      <Flex flexDirection={"column"} w="full">
        <Grid templateColumns="repeat(3, 1fr)" gap={8} mb={8}>
          <DashboardItem
            href="/basis-pengetahuan"
            label="Basis Pengetahuan"
            value={`${data.basisPengetahuan}`}
            icon={
              <BookBulkIcon
                color={"pink.500"}
                bgColor={"pink.100"}
                {...iconProps}
              />
            }
          />
          <DashboardItem
            href="/gejala"
            label="Gejala"
            value={`${data.gejala}`}
            icon={
              <ClipboardTextBulkIcon
                color={"green.500"}
                bgColor={"green.100"}
                {...iconProps}
              />
            }
          />
          <DashboardItem
            href="/bahan-pemutih"
            label="Bahan Pemutih"
            value={`${data.bahanPemutih}`}
            icon={
              <BubbleBulkIcon
                color={"purple.500"}
                bgColor={"purple.100"}
                {...iconProps}
              />
            }
          />
        </Grid>
        {/* <Flex
          w="full"
          h="100px"
          bgColor={"white"}
          boxShadow="lg"
          rounded={"lg"}
          justifyContent="center"
          alignItems={"center"}
        >
          <NextLink href={"/diagnosa"} passHref>
            <Button
              as={Link}
              colorScheme={"facebook"}
              rightIcon={<ArrowRightBoldIcon mt={"2px"} color={"white"} />}
            >
              Mulai Diagnosa
            </Button>
          </NextLink>
        </Flex> */}
      </Flex>
    </Layout>
  );
};

export default Dashboard;
