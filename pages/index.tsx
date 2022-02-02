import Layout from "@/components/Layout";
import { Flex, Heading, Stack } from "@chakra-ui/react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Layout header="Dashboard">
      <Heading>Hello World!</Heading>
    </Layout>
  );
};

export default Home;
