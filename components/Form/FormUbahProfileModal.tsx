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
  FormHelperText,
} from "@chakra-ui/react";
import { User } from "@prisma/client";
import validateEmail from "@/utils/validateEmail";
import { signOut } from "next-auth/react";
var bcrypt = require("bcryptjs");

type UserInputs = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  role: string;
};

const FormUbahProfileModal: FC<{ user?: User }> = ({ user }) => {
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
  } = useForm<UserInputs>();

  const onSubmit: SubmitHandler<UserInputs> = async (data) => {
    setLoading(true);
    try {
      const res = await axios.put(`/api/user/${user?.id}`, {
        ...data,
        hash: user?.hash,
      });

      if (res.data === "email_unique") {
        showToast({
          title: "Terjadi kesalahan",
          description: "Email telah terdaftar, silahkan gunakan email lain",
          status: "error",
        });
        setError("email", {
          type: "manual",
          message: "Email telah terdaftar",
        });
        setFocus("email");
        setLoading(false);
        return;
      }
      showToast({
        title: "Berhasil",
        description: "Data berhasil disimpan.",
      });
      signOut();
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
      <Button
        onClick={() => {
          onOpen();
          reset();
        }}
        colorScheme={"green"}
      >
        Ubah Profil
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>{"Ubah Profil"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack flexDirection={"column"} maxW={"340px"} w={"full"}>
              <FormControl isInvalid={errors.email && true}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  defaultValue={user?.email || ""}
                  type={"email"}
                  placeholder="Email"
                  {...register("email", {
                    required: "Email wajib diisi",
                    validate: (value) => {
                      if (!validateEmail(value)) {
                        return "Format email salah";
                      }
                    },
                  })}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.name && true}>
                <FormLabel htmlFor="namaPengguna">Nama Pengguna</FormLabel>
                <Input
                  id="namaPengguna"
                  placeholder="Nama Pengguna"
                  defaultValue={user?.name || ""}
                  type={"text"}
                  {...register("name", {
                    required: "Nama pengguna wajib diisi",
                  })}
                />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.password && true}>
                <FormLabel htmlFor="kataSandi">Kata Sandi</FormLabel>
                <Input
                  id="kataSandi"
                  placeholder="Kata Sandi"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Kata sandi wajib diisi",
                    validate: (value) => {
                      if (!bcrypt.compareSync(value, user?.hash)) {
                        return "Kata sandi salah";
                      }
                    },
                  })}
                />
                <FormHelperText>
                  Masukkan kata sandi untuk mengganti profil
                </FormHelperText>
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>

              <Checkbox
                defaultChecked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              >
                Tampilkan kata sandi
              </Checkbox>
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

export default FormUbahProfileModal;
