import { Box, Flex, Button, Text, Image, Link } from "@chakra-ui/react";
import type { NextPage } from "next";
import NextLink from "next/link";
import Shell from "@/components/Shell";

const Home: NextPage = () => {
  return (
    <Shell title="Home - e-Clinic">
      <Flex flexDirection="column" alignItems={"center"}>
        <Flex flexDirection={["column", "row", "row"]} alignItems={"center"}>
          <Box maxW={"340px"}>
            <Text
              fontSize={["3xl", "4xl", "5xl"]}
              fontWeight="bold"
              fontFamily={"inter"}
            >
              Deteksi dini penyakit kulit anda
            </Text>
            <NextLink href={"/diagnosa"} passHref>
              <Button
                as={Link}
                variant={"solid"}
                colorScheme={"facebook"}
                mt={4}
                mb={[4, 0]}
              >
                Mulai Diagnosa
              </Button>
            </NextLink>
          </Box>
          <Image
            src="./male-doctor.png"
            maxW={["240", "280", "340px"]}
            alt="Doctor"
          />
        </Flex>
        <Box
          maxW={"680px"}
          bg="white"
          px={6}
          py={4}
          borderRadius={20}
          shadow="lg"
        >
          <Text fontFamily={"barlow"} fontWeight="medium">
            Sistem pakar adalah cabang ilmu kecerdasan buatan juga bidang ilmu
            yang muncul bersama perkembangan teknologi dan ilmu komputer. Sistem
            pakar dirancang untuk meniru keahlian seorang pakar di bidangnya
            guna memodelkan kemampuan pemecahan masalah
          </Text>
        </Box>
      </Flex>
    </Shell>
  );
};

export default Home;
