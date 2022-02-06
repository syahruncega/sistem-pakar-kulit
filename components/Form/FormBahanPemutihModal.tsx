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
} from "@chakra-ui/react";
import { BahanPemutih, User } from "@prisma/client";
import validateEmail from "@/utils/validateEmail";

type BahanPemutihInput = {
  kodeBahanPemutih: string;
  jenisBahanPemutih: string;
};

const FormBahanPemutihModal: FC<{
  bahanPemutih?: BahanPemutih;
  isEdit?: boolean;
}> = ({ bahanPemutih, isEdit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPassword, setShowPassword] = useState(false);
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
  } = useForm<BahanPemutihInput>();

  const onSubmit: SubmitHandler<BahanPemutihInput> = async (data) => {
    setLoading(true);
    try {
      let res: AxiosResponse<any, any>;

      if (isEdit) {
        res = await axios.put(`/api/bahan-pemutih/${bahanPemutih?.id}`, {
          ...data,
        });
      } else {
        res = await axios.post("/api/bahan-pemutih", {
          ...data,
        });
      }

      if (res.data === "kodeBahanPemutih_unique") {
        showToast({
          title: "Terjadi kesalahan",
          description: "Kode bahan pemutih telah terdaftar, gunakan kode lain",
          status: "error",
        });
        setError("kodeBahanPemutih", {
          type: "manual",
          message: "Kode bahan pemutih telah terdaftar",
        });
        setFocus("kodeBahanPemutih");
        setLoading(false);
        return;
      }
      showToast({
        title: "Berhasil",
        description: "Data berhasil disimpan.",
      });

      if (isEdit) {
        mutate(
          "/api/bahan-pemutih",
          async (dataBahanPemutih: []) => {
            const filteredDataBahanPemutih = dataBahanPemutih.filter(
              (bahanPemutih: BahanPemutih) => bahanPemutih.id !== res.data.id
            );
            return [res.data, ...filteredDataBahanPemutih];
          },
          false
        );
      } else {
        mutate(
          "/api/bahan-pemutih",
          async (dataBahanPemutih: []) => {
            return [res.data, ...dataBahanPemutih];
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
          <ModalHeader>
            {isEdit ? "Edit Bahan Pemutih" : "Tambah Bahan Pemutih"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack flexDirection={"column"} maxW={"340px"} w={"full"}>
              <FormControl isInvalid={errors.kodeBahanPemutih && true}>
                <FormLabel htmlFor="kodeBahanPemutih">Kode</FormLabel>
                <Input
                  id="kodeBahanPemutih"
                  defaultValue={bahanPemutih?.kodeBahanPemutih || ""}
                  type={"text"}
                  placeholder="Kode Bahan Pemutih"
                  {...register("kodeBahanPemutih", {
                    required: "Kode wajib diisi",
                  })}
                />
                <FormErrorMessage>
                  {errors.kodeBahanPemutih?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.jenisBahanPemutih && true}>
                <FormLabel htmlFor="jenisBahanPemutih">Jenis</FormLabel>
                <Input
                  id="jenisBahanPemutih"
                  defaultValue={bahanPemutih?.jenisBahanPemutih || ""}
                  type={"text"}
                  placeholder="Jenis Bahan Pemutih"
                  {...register("jenisBahanPemutih", {
                    required: "Kode wajib diisi",
                  })}
                />
                <FormErrorMessage>
                  {errors.jenisBahanPemutih?.message}
                </FormErrorMessage>
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

export default FormBahanPemutihModal;
