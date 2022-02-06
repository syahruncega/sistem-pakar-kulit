import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import showToast from "../CustomToast";
import {
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputRightAddon,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { Pasien } from "@prisma/client";

type PasienInput = {
  namaPasien: string;
  nik: string;
  jenisKelamin: string;
  usia: string;
};

const FormPasienModal: FC<{
  pasien?: Pasien;
  isEdit?: boolean;
}> = ({ pasien, isEdit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    getValues,
    reset,
    formState: { errors },
  } = useForm<PasienInput>();

  const onSubmit: SubmitHandler<PasienInput> = async (data) => {
    setLoading(true);
    try {
      let res: AxiosResponse<any, any>;

      if (isEdit) {
        res = await axios.put(`/api/pasien/${pasien?.id}`, {
          ...data,
        });
      } else {
        res = await axios.post("/api/pasien", {
          ...data,
        });
      }

      if (res.data === "nik_unique") {
        showToast({
          title: "Terjadi kesalahan",
          description: "NIK telah terdaftar",
          status: "error",
        });
        setError("nik", {
          type: "manual",
          message: "NIK telah terdaftar",
        });
        setFocus("nik");
        setLoading(false);
        return;
      }
      showToast({
        title: "Berhasil",
        description: "Data berhasil disimpan.",
      });

      if (isEdit) {
        mutate(
          "/api/pasien",
          async (dataPasien: []) => {
            const filteredDataPasien = dataPasien.filter(
              (pasien: Pasien) => pasien.id !== res.data.id
            );
            return [res.data, ...filteredDataPasien];
          },
          false
        );
      } else {
        mutate(
          "/api/pasien",
          async (dataPasien: []) => {
            return [res.data, ...dataPasien];
          },
          false
        );
      }
    } catch (error: any) {
      showToast({
        title: "Terjadi Kesalahan",
        description: error.message,
        status: "error",
      });
    }
    onClose();
    setLoading(false);
  };

  return (
    <>
      {isEdit ? (
        <Button
          size={"xs"}
          colorScheme={"green"}
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
            reset();
          }}
        >
          Edit
        </Button>
      ) : (
        <Button
          onClick={() => {
            onOpen();
            reset();
          }}
          colorScheme={"facebook"}
        >
          Tambah
        </Button>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>{isEdit ? "Edit Pasien" : "Tambah Pasien"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack flexDirection={"column"} maxW={"340px"} w={"full"}>
              <FormControl isInvalid={errors.namaPasien && true}>
                <FormLabel htmlFor="namaPasien">Nama Pasien</FormLabel>
                <Input
                  id="namaPasien"
                  defaultValue={pasien?.namaPasien || ""}
                  type={"text"}
                  placeholder="Nama Pasien"
                  {...register("namaPasien", {
                    required: "Nama pasien wajib diisi",
                  })}
                />
                <FormErrorMessage>
                  {errors.namaPasien?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.nik && true}>
                <FormLabel htmlFor="nik">NIK</FormLabel>
                <Input
                  id="nik"
                  maxLength={16}
                  defaultValue={pasien?.nik || ""}
                  type={"text"}
                  placeholder="NIK"
                  {...register("nik", {
                    required: "NIK wajib diisi",
                    validate: (value) => {
                      const num = /^\d*$/;
                      if (num.test(value) === false) {
                        return "NIK harus berupa angka";
                      }
                      if (value.length !== 16) {
                        return "NIK harus 16 digit";
                      }
                    },
                  })}
                />
                <FormErrorMessage>{errors.nik?.message}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Jenis Kelamin</FormLabel>

                <RadioGroup defaultValue={pasien?.jenisKelamin || "Laki-laki"}>
                  <Stack direction="row" spacing={6}>
                    <Radio value="Laki-laki" {...register("jenisKelamin")}>
                      Laki-laki
                    </Radio>
                    <Radio value="Perempuan" {...register("jenisKelamin")}>
                      Perempuan
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
              <FormControl isInvalid={errors.usia && true}>
                <FormLabel>Usia</FormLabel>
                <NumberInput defaultValue={pasien?.usia || 0} min={0}>
                  <NumberInputField
                    {...register("usia", {
                      required: "Usia wajib diisi",
                    })}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormErrorMessage>{errors.usia?.message}</FormErrorMessage>
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="facebook"
              mr={3}
              type="submit"
              isLoading={loading}
            >
              Simpan
            </Button>
            <Button
              colorScheme={"orange"}
              isDisabled={loading}
              mr={4}
              onClick={() => {
                reset();
              }}
            >
              Reset
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Batal
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FormPasienModal;
