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
import { User } from "@prisma/client";
import validateEmail from "@/utils/validateEmail";

type UserInputs = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  role: string;
};

const FormPenggunaModal: FC<{ user?: User; isEdit?: boolean }> = ({
  user,
  isEdit,
}) => {
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
      let res: AxiosResponse<any, any>;

      if (isEdit) {
        res = await axios.put(`/api/user/${user?.id}`, {
          ...data,
          hash: user?.hash,
        });
      } else {
        res = await axios.post("/api/user", {
          ...data,
        });
      }

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

      if (isEdit) {
        mutate(
          "/api/user",
          async (dataUser: []) => {
            const filteredDataUser = dataUser.filter(
              (user: User) => user.id !== res.data.id
            );
            return [res.data, ...filteredDataUser];
          },
          false
        );
      } else {
        mutate(
          "/api/user",
          async (dataUser: []) => {
            return [res.data, ...dataUser];
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
            {isEdit ? "Edit Pengguna" : "Tambah Pengguna"}
          </ModalHeader>
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
              <FormControl isInvalid={errors.role && true}>
                <FormLabel htmlFor="role">Role</FormLabel>
                <Select id="role" {...register("role")}>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </Select>
                <FormErrorMessage>{errors.role?.message}</FormErrorMessage>
              </FormControl>

              {!isEdit && (
                <FormControl isInvalid={errors.password && true}>
                  <FormLabel htmlFor="kataSandi">Kata Sandi</FormLabel>
                  <Input
                    id="kataSandi"
                    placeholder="Kata Sandi"
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: isEdit ? false : "Kata sandi wajib diisi",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.password?.message}
                  </FormErrorMessage>
                </FormControl>
              )}

              {!isEdit && (
                <FormControl isInvalid={errors.confirmPassword && true}>
                  <FormLabel htmlFor="konfirmasiKataSandi">
                    Konfirmasi Kata Sandi
                  </FormLabel>
                  <Input
                    id="konfirmasiKataSandi"
                    placeholder="Konfirmasi Kata Sandi"
                    type={showPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      validate: (value) => {
                        if (value !== getValues("password"))
                          return "Kata sandi tidak sesuai";
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.confirmPassword?.message}
                  </FormErrorMessage>
                </FormControl>
              )}

              {!isEdit && (
                <Checkbox
                  defaultChecked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                >
                  Tampilkan kata sandi
                </Checkbox>
              )}
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

export default FormPenggunaModal;
