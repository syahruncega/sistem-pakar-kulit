import axios, { AxiosResponse } from "axios";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import showToast from "../CustomToast";
import {
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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
} from "@chakra-ui/react";
import { Gejala } from "@prisma/client";
import { GejalaInput } from "@/utils/types";

const FormGejalaModal: FC<{
  gejala?: Gejala;
  isEdit?: boolean;
}> = ({ gejala, isEdit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    reset,
    formState: { errors },
  } = useForm<GejalaInput>();

  const onSubmit: SubmitHandler<GejalaInput> = async (data) => {
    setLoading(true);
    try {
      let res: AxiosResponse<any, any>;

      if (isEdit) {
        res = await axios.put(`/api/gejala/${gejala?.id}`, {
          ...data,
        });
      } else {
        res = await axios.post("/api/gejala", {
          ...data,
        });
      }

      if (res.data === "kodeGejala_unique") {
        showToast({
          title: "Terjadi kesalahan",
          description: "Kode gejala telah terdaftar, gunakan kode lain",
          status: "error",
        });
        setError("kodeGejala", {
          type: "manual",
          message: "Kode gejala telah terdaftar",
        });
        setFocus("kodeGejala");
        setLoading(false);
        return;
      }
      showToast({
        title: "Berhasil",
        description: "Data berhasil disimpan.",
      });

      if (isEdit) {
        mutate(
          "/api/gejala",
          async (dataGejala: []) => {
            const filteredDataGejala = dataGejala.filter(
              (gejala: Gejala) => gejala.id !== res.data.id
            );
            return [res.data, ...filteredDataGejala];
          },
          false
        );
      } else {
        mutate(
          "/api/gejala",
          async (dataGejala: []) => {
            return [res.data, ...dataGejala];
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
          <ModalHeader>{isEdit ? "Edit Gejala" : "Tambah Gejala"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack flexDirection={"column"} maxW={"340px"} w={"full"}>
              <FormControl isInvalid={errors.kodeGejala && true}>
                <FormLabel htmlFor="kodeGejala">Kode</FormLabel>
                <Input
                  id="kodeGejala"
                  defaultValue={gejala?.kodeGejala || ""}
                  type={"text"}
                  placeholder="Kode Gejala"
                  {...register("kodeGejala", {
                    required: "Kode wajib diisi",
                  })}
                />
                <FormErrorMessage>
                  {errors.kodeGejala?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.namaGejala && true}>
                <FormLabel htmlFor="namaGejala">Nama Gejala</FormLabel>
                <Input
                  id="namaGejala"
                  defaultValue={gejala?.namaGejala || ""}
                  type={"text"}
                  placeholder="Nama Gejala"
                  {...register("namaGejala", {
                    required: "Nama gejala wajib diisi",
                  })}
                />
                <FormErrorMessage>
                  {errors.namaGejala?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.namaGejala && true}>
                <FormLabel>Nilai Kepastian</FormLabel>
                <NumberInput defaultValue={gejala?.nilaiKepastian || 0} min={0}>
                  <NumberInputField
                    {...register("nilaiKepastian", {
                      required: "Nilai kepastian wajib diisi",
                    })}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormErrorMessage>
                  {errors.nilaiKepastian?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.keterangan && true}>
                <FormLabel htmlFor="keterangan">Keterangan</FormLabel>
                <Textarea
                  id="keterangan"
                  defaultValue={gejala?.keterangan || ""}
                  placeholder="Keterangan"
                  {...register("keterangan", {
                    required: "Keterangan wajib diisi",
                  })}
                />
                <FormErrorMessage>
                  {errors.keterangan?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.labelCukupYakin && true}>
                <FormLabel htmlFor="labelCukupYakin">
                  Label Cukup Yakin
                </FormLabel>
                <Input
                  id="labelCukupYakin"
                  defaultValue={gejala?.labelCukupYakin || ""}
                  type={"text"}
                  placeholder="Label Cukup Yakin"
                  {...register("labelCukupYakin", {
                    required: "Label cukup yakin wajib diisi",
                  })}
                />
                <FormErrorMessage>
                  {errors.labelCukupYakin?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.labelSangatYakin && true}>
                <FormLabel htmlFor="labelSangatYakin">
                  Label sangat yakin
                </FormLabel>
                <Input
                  id="labelSangatYakin"
                  defaultValue={gejala?.labelSangatYakin || ""}
                  type={"text"}
                  placeholder="Label sangat yakin"
                  {...register("labelSangatYakin", {
                    required: "Label sangat yakin wajib diisi",
                  })}
                />
                <FormErrorMessage>
                  {errors.labelSangatYakin?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.urlGambar && true}>
                <FormLabel htmlFor="urlGambar">Url gambar</FormLabel>
                <Input
                  id="urlGambar"
                  defaultValue={gejala?.urlGambar || ""}
                  type={"text"}
                  placeholder="Url gambar"
                  {...register("urlGambar")}
                />
                <FormErrorMessage>{errors.urlGambar?.message}</FormErrorMessage>
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

export default FormGejalaModal;
