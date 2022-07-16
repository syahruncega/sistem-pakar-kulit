import DashboardItem from "@/components/DashboardItem";
import Layout from "@/components/Layout";
import {
  ArrowRightBoldIcon,
  BookBulkIcon,
  BubbleBulkIcon,
  ClipboardTextBulkIcon,
  Profile2UserBulkIcon,
} from "@/styles/iconsax";
import fetcher from "@/utils/fetcher";
import { Button, Flex, Grid, Link, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import NextLink from "next/link";
import useSWR from "swr";

const Home: NextPage = () => {
  return <Text>Index</Text>;
};

export default Home;
