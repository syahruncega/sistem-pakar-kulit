import { ArrowLeftBoldIcon, TickSquareBoldIcon } from "@/styles/iconsax";
import fetcher from "@/utils/fetcher";
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Select,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import { Gejala } from "@prisma/client";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useSWR from "swr";

const TabPilihGejala: FC<{ setTabIndex: Function }> = ({ setTabIndex }) => {
  const { data: dataGejala } = useSWR<Gejala[]>("/api/gejala", fetcher);
  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    getValues,
    reset,
    formState: { errors },
  } = useForm<any>();

  if (!dataGejala) {
    return null;
  }

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log(data);
  };

  return (
    <Flex
      flexDirection={"column"}
      as={"form"}
      mx={4}
      onSubmit={handleSubmit(onSubmit)}
    >
      {dataGejala.map((gejala, index) => {
        return (
          <FormControl key={gejala.id} my={2}>
            <Flex
              flexDirection={["column", "column", "row"]}
              justifyContent={"space-between"}
              align={["flex-start", "flex-start", "center"]}
            >
              <FormLabel fontWeight={"normal"} htmlFor={`${gejala.kodeGejala}`}>
                {`${index + 1}. ${gejala.namaGejala}`}
              </FormLabel>
              <Select
                id={`${gejala.kodeGejala}`}
                width={"200px"}
                placeholder="Pilih jika sesuai"
                {...register(`${gejala.kodeGejala}`)}
              >
                <option value="Tidak">Tidak</option>
                <option value="Mungkin">Mungkin</option>
                <option value="Cukup Yakin">Cukup Yakin</option>
                <option value="Yakin">Yakin</option>
                <option value="Sangat Yakin">Sangat Yakin</option>
              </Select>
            </Flex>
          </FormControl>
        );
      })}
      <Center>
        <Button
          colorScheme={"orange"}
          mr={4}
          onClick={() => {
            setTabIndex(0);
          }}
          rightIcon={<ArrowLeftBoldIcon mt={"2px"} />}
        >
          Kembali
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
