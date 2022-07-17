import {
  ArrowLeftBoldIcon,
  TickSquareBoldIcon,
  TrushSquareBoldIcon,
} from "@/styles/iconsax";
import fetcher from "@/utils/fetcher";
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { BahanPemutih, BasisPengetahuan, Gejala } from "@prisma/client";
import { useSistemPakar } from "contexts/SistemPakarContext";
import { FC } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import useSWR from "swr";
import showToast from "../CustomToast";

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
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>();

  if (!dataGejala || !dataRule) {
    return null;
  }

  function getCFUser(value: string) {
    if (value === "Yakin") {
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
      if (data[`${gejala.kodeGejala}`] !== "") {
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

    if (selectedRule.length === 0) {
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
                <option value="Yakin">Yakin</option>
                <option value="Sangat Yakin">Sangat Yakin</option>
              </Select>
            </Flex>
          </FormControl>
        );
      })}
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
