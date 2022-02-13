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
  Textarea,
} from "@chakra-ui/react";
import { BahanPemutih, BasisPengetahuan, User } from "@prisma/client";
import validateEmail from "@/utils/validateEmail";

type BasisPengetahuanInput = {
  rule: string;
  kaidah: string;
};

const FormBasisPengetahuanModal: FC<{
  basisPengetahuan?: BasisPengetahuan;
  isEdit?: boolean;
}> = ({ basisPengetahuan, isEdit }) => {
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
  } = useForm<BasisPengetahuanInput>();

  const onSubmit: SubmitHandler<BasisPengetahuanInput> = async (data) => {
    setLoading(true);
    try {
      let res: AxiosResponse<any, any>;

      if (isEdit) {
        res = await axios.put(
          `/api/basis-pengetahuan/${basisPengetahuan?.id}`,
          {
            ...data,
          }
        );
      } else {
        res = await axios.post("/api/basis-pengetahuan", {
          ...data,
        });
      }

      if (res.data === "rule_unique") {
        showToast({
          title: "Terjadi kesalahan",
          description: "Kode rule telah terdaftar, gunakan kode lain",
          status: "error",
        });
        setError("rule", {
          type: "manual",
          message: "Kode rule telah terdaftar",
        });
        setFocus("rule");
        setLoading(false);
        return;
      }
      showToast({
        title: "Berhasil",
        description: "Data berhasil disimpan.",
      });

      if (isEdit) {
        mutate(
          "/api/basis-pengetahuan",
          async (dataBasisPengetahuan: []) => {
            const filteredDataBasisPengetahuan = dataBasisPengetahuan.filter(
              (basisPengetahuan: BasisPengetahuan) =>
                basisPengetahuan.id !== res.data.id
            );
            return [res.data, ...filteredDataBasisPengetahuan];
          },
          false
        );
      } else {
        mutate(
          "/api/basis-pengetahuan",
          async (dataBasisPengetahuan: []) => {
            return [res.data, ...dataBasisPengetahuan];
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
            {isEdit ? "Edit Basis Pengetahuan" : "Tambah Basis Pengetahuan"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack flexDirection={"column"} maxW={"340px"} w={"full"}>
              <FormControl isInvalid={errors.rule && true}>
                <FormLabel htmlFor="rule">Rule</FormLabel>
                <Input
                  id="rule"
                  defaultValue={basisPengetahuan?.rule || ""}
                  type={"text"}
                  placeholder="Rule"
                  {...register("rule", {
                    required: "Kode wajib diisi",
                  })}
                />
                <FormErrorMessage>{errors.rule?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.kaidah && true}>
                <FormLabel htmlFor="kaidah">Kaidah</FormLabel>
                <Textarea
                  id="kaidah"
                  defaultValue={basisPengetahuan?.kaidah || ""}
                  type={"text"}
                  placeholder="Kaidah"
                  {...register("kaidah", {
                    required: "Kaidah wajib diisi",
                  })}
                />
                <FormErrorMessage>{errors.kaidah?.message}</FormErrorMessage>
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

export default FormBasisPengetahuanModal;
