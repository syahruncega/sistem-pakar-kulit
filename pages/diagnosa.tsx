import Layout from "@/components/Layout";
import fetcher from "@/utils/fetcher";
import { NextPage } from "next";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Button,
  FormControl,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";
import { useState } from "react";
import FormPasienModal from "@/components/Form/FormPasienModal";
import TabPilihGejala from "@/components/Tabs/TabPilihGejala";
import TabPilihPasien from "@/components/Tabs/TabPilihPasien";
import TabHasilDiagnosa from "@/components/Tabs/TabHasilDiagnosa";

const Diagnosa: NextPage<{}> = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Layout title="Diagnosa - SP Kulit" header="Diagnosa">
      <Flex w="full" bgColor={"white"} rounded="lg" boxShadow="lg">
        <Tabs
          isLazy
          index={tabIndex}
          variant="enclosed"
          p={4}
          overflow={"hidden"}
        >
          <TabList>
            <Tab fontWeight={"medium"}>Pasien</Tab>
            <Tab fontWeight={"medium"}>Gejala</Tab>
            <Tab fontWeight={"medium"}>Hasil Diagnosa</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TabPilihPasien setTabIndex={setTabIndex} />
            </TabPanel>
            <TabPanel>
              <TabPilihGejala setTabIndex={setTabIndex} />
            </TabPanel>
            <TabPanel>
              <TabHasilDiagnosa setTabIndex={setTabIndex} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Layout>
  );
};

export default Diagnosa;
