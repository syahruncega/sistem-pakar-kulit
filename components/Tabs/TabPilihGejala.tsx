import { TickSquareBoldIcon, TrushSquareBoldIcon } from "@/styles/iconsax";
import fetcher from "@/utils/fetcher";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { BahanPemutih, BasisPengetahuan, Gejala } from "@prisma/client";
import { useSistemPakar } from "contexts/SistemPakarContext";
import { FC } from "react";
import {
  Controller,
  SubmitHandler,
  useForm,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import useSWR from "swr";
import showToast from "../CustomToast";
import NextImage from "next/image";

interface BasisPengetahuanAll extends BasisPengetahuan {
  bahanPemutih: {
    [B in keyof BahanPemutih]?: string;
  };
}

interface SelectedRule extends BasisPengetahuanAll {
  cfValue: number;
}

const TabPilihGejala: FC<{ setTabIndex: Function }> = ({ setTabIndex }) => {
  const { data: dataGejala } = useSWR<Gejala[]>("/api/gejala", fetcher);
  const { data: dataRule } = useSWR<BasisPengetahuanAll[]>(
    "/api/basis-pengetahuan",
    fetcher
  );
  const { setJawaban, setDiagnosa } = useSistemPakar();
  const {
    handleSubmit,
    reset,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<any>();

  if (!dataGejala || !dataRule) {
    return null;
  }

  function getCFUser(value: string) {
    if (value === "Cukup Yakin") {
      return 0.5;
    } else if (value === "Sangat Yakin") {
      return 1;
    } else {
      return 0;
    }
  }

  function calculateRuleCF(value1: number, value2: number) {
    return value1 + value2 * (1.0 - value1);
  }

  const onSubmit: SubmitHandler<any> = async (data) => {
    //*FORWARD CHAINING
    let selectedRule: BasisPengetahuanAll[] = [];
    dataGejala.map((gejala) => {
      if (data[`${gejala.kodeGejala}`] !== "" && gejala.kodeGejala in data) {
        dataRule.map((rule) => {
          if (
            rule.kaidah.includes(gejala.kodeGejala) &&
            !selectedRule.includes(rule)
          ) {
            selectedRule.push(rule);
          }
        });
      }
    });

    if (Object.keys(data).length === 0 || selectedRule.length === 0) {
      showToast({
        title: "Terjadi kesalahan",
        description: "Harap memilih minimal satu gejala untuk mendiagnosa",
        status: "error",
      });
      return;
    }

    //*CERTAINTY FACTOR
    let certaintyFactor: SelectedRule[] = [];
    selectedRule.map((rule) => {
      //**Calculate CF Value
      let cfValue: number[] = [];
      dataGejala.map((gejala) => {
        if (rule.kaidah.includes(gejala.kodeGejala)) {
          cfValue.push(
            getCFUser(data[`${gejala.kodeGejala}`]) * gejala.nilaiKepastian
          );
        }
      });

      //**Calculate Combined CF Value (Rule)
      let combined = 0;
      for (let i = 1; i < cfValue.length; i++) {
        i === 1
          ? (combined = calculateRuleCF(cfValue[i - 1], cfValue[i]))
          : (combined = calculateRuleCF(combined, cfValue[i]));
      }
      certaintyFactor.push({ ...rule, cfValue: combined });
    });
    console.log(certaintyFactor);

    Object.keys(data).forEach((key) => {
      if (data[key] === "") {
        delete data[key];
      }
    });

    //Sort certainty Factor
    certaintyFactor.sort(function (a, b) {
      return b.cfValue - a.cfValue;
    });

    setJawaban({ pilihan: data, gejala: dataGejala });
    setDiagnosa(certaintyFactor);
    setTabIndex(1);
  };

  return (
    <Flex
      flexDirection={"column"}
      as={"form"}
      mx={4}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(4, 1fr)"]}
        gap={6}
        mb={8}
      >
        {dataGejala.map((gejala, index) => {
          return (
            <ModalGejala
              key={gejala.id}
              gejala={gejala}
              control={control}
              getValues={getValues}
              setValue={setValue}
            />
          );
        })}
      </Grid>
      <Center mt={2}>
        <Button
          colorScheme={"orange"}
          mr={4}
          onClick={() => {
            reset();
          }}
          rightIcon={<TrushSquareBoldIcon mt={"2px"} />}
        >
          Reset
        </Button>
        <Button
          type="submit"
          colorScheme={"facebook"}
          rightIcon={<TickSquareBoldIcon mt={"2px"} />}
        >
          Proses
        </Button>
      </Center>
    </Flex>
  );
};

export default TabPilihGejala;

const ModalGejala: FC<{
  gejala: Gejala;
  control: any;
  getValues: UseFormGetValues<any>;
  setValue: UseFormSetValue<any>;
}> = ({ gejala, control, getValues, setValue }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const gejalaValue = getValues(gejala.kodeGejala);
  return (
    <>
      <Flex
        direction={"row"}
        bg={
          gejalaValue == "" || gejalaValue == undefined
            ? "white"
            : gejalaValue == "Cukup Yakin"
            ? "teal.300"
            : "blue.300"
        }
        shadow={"md"}
        borderRadius="md"
        p={3}
        w={"100%"}
        onClick={onOpen}
        justifyContent="center"
        transition={"transform 0.3s"}
        _hover={{
          transform: "scale(1.1)",
          transition: "transform 0.3s",
          cursor: "pointer",
        }}
      >
        <Text textAlign={"center"} my="auto">
          {gejala.namaGejala}
        </Text>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent maxWidth={"600px"}>
          <ModalHeader>{gejala.namaGejala}</ModalHeader>
          <ModalCloseButton
            onClick={() => {
              setValue(gejala.kodeGejala, "");
              onClose();
            }}
          />
          <ModalBody>
            {gejala.urlGambar && (
              <Center>
                <AspectRatio
                  ratio={4 / 3}
                  w="200px"
                  borderRadius="md"
                  overflow={"hidden"}
                  mb={4}
                >
                  <NextImage
                    layout="fill"
                    objectFit="cover"
                    src={gejala.urlGambar}
                    placeholder={"blur"}
                    alt={gejala.namaGejala}
                    blurDataURL={gejala.urlGambar}
                  />
                </AspectRatio>
              </Center>
            )}

            <Text textAlign={"center"} mb={6}>
              {gejala.keterangan || ""}
            </Text>
            <Text
              textAlign={"center"}
              mb={6}
            >{`Apakah anda merasakan gejala ini?`}</Text>
            <FormControl>
              <Controller
                control={control}
                name={gejala.kodeGejala}
                defaultValue={""}
                render={({ field: { onChange, value } }) => (
                  <RadioGroup onChange={onChange} value={value}>
                    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                      <Stack
                        direction="column"
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        border={"2px #9ca3af dashed"}
                        rounded={"xl"}
                        p={2}
                      >
                        <Text textAlign={"center"}>
                          {gejala.labelCukupYakin}
                        </Text>
                        <Radio value="Cukup Yakin">Cukup Yakin</Radio>
                      </Stack>
                      <Stack
                        direction="column"
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        border={"2px #9ca3af dashed"}
                        rounded={"xl"}
                        p={2}
                      >
                        <Text textAlign={"center"}>
                          {gejala.labelSangatYakin}
                        </Text>
                        <Radio value="Sangat Yakin">Sangat Yakin</Radio>
                      </Stack>
                    </Grid>
                  </RadioGroup>
                )}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
