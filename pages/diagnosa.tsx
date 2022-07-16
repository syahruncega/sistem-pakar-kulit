import { NextPage } from "next";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import TabPilihGejala from "@/components/Tabs/TabPilihGejala";
import TabHasilDiagnosa from "@/components/Tabs/TabHasilDiagnosa";
import Shell from "@/components/Shell";

const Diagnosa: NextPage<{}> = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Shell title="Diagnosa - SP Kulit" header="Diagnosa">
      <Flex w="full" bgColor={"white"} rounded="lg" boxShadow="lg">
        <Tabs
          isLazy
          index={tabIndex}
          variant="enclosed"
          p={4}
          overflow={"hidden"}
        >
          <TabList>
            {/* <Tab fontWeight={"medium"}>Pasien</Tab> */}
            <Tab fontWeight={"medium"}>Gejala</Tab>
            <Tab fontWeight={"medium"}>Hasil Diagnosa</Tab>
          </TabList>
          <TabPanels>
            {/* <TabPanel>
              <TabPilihPasien setTabIndex={setTabIndex} />
            </TabPanel> */}
            <TabPanel>
              <TabPilihGejala setTabIndex={setTabIndex} />
            </TabPanel>
            <TabPanel>
              <TabHasilDiagnosa setTabIndex={setTabIndex} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Shell>
  );
};

export default Diagnosa;
