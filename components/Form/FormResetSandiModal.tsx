import axios from "axios";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import showToast from "../CustomToast";
import {
  Checkbox,
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
} from "@chakra-ui/react";
import { User } from "@prisma/client";

type UserInputs = {
  password: string;
  confirmPassword: string;
};

const FormResetSandiModal: FC<{ user?: User }> = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const {
    register,
    handleSubmit,
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

      showToast({
        title: "Berhasil",
        description: "Data berhasil disimpan.",
      });

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
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
          reset();
        }}
        size={"xs"}
        colorScheme={"orange"}
      >
        Reset Sandi
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Reset Kata Sandi</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack flexDirection={"column"} maxW={"340px"} w={"full"}>
              <FormControl isInvalid={errors.password && true}>
                <FormLabel htmlFor="kataSandi">Kata Sandi Baru</FormLabel>
                <Input
                  id="kataSandi"
                  placeholder="Kata Sandi Baru"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Kata sandi wajib diisi",
                  })}
                />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>

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

export default FormResetSandiModal;
