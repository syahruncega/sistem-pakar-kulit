/* eslint-disable react-hooks/rules-of-hooks */
import { EyeBulkIcon, EyeSlashBulkIcon } from "@/styles/iconsax";
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type EmailPassword = {
  email: string;
  password: string;
};

const Login: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<EmailPassword>();

  const onSubmit: SubmitHandler<EmailPassword> = async ({
    email,
    password,
  }) => {
    setLoading(true);

    try {
      const res: any = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });

      if (res.error === "Email") {
        setError("email", {
          type: "manual",
          message: "Email anda tidak terdaftar",
        });
      }
      if (res.error === "Password") {
        setError("password", {
          type: "manual",
          message: "Kata sandi yang anda masukkan salah",
        });
        setValue("password", "");
      }
      if (res.error === null) {
        router.push("/dashboard");
      }
    } catch (error) {
      setErrorMessage(error as any);
    }

    setLoading(false);
  };

  return (
    <Center minH={"100vh"} bgColor={"gray.100"}>
      <Stack
        as="form"
        w="full"
        minW={"340px"}
        maxW={"450px"}
        mx={6}
        py={6}
        px={8}
        spacing="24px"
        align="center"
        bgColor={"white"}
        rounded={"lg"}
        boxShadow={"lg"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl id="email">
          <FormLabel fontFamily={"inter"}>Email</FormLabel>
          <InputGroup>
            <Input
              type="email"
              placeholder="Email"
              isInvalid={errors.email && true}
              {...register("email", { required: "Email harus diisi" })}
            />
          </InputGroup>
          {errors.email && (
            <Text
              fontSize={"sm"}
              mt={1}
              color={useColorModeValue("red.600", "red.400")}
            >
              {errors.email?.message}
            </Text>
          )}
        </FormControl>
        <FormControl id="password">
          <Flex justifyContent="space-between" fontFamily={"inter"}>
            <FormLabel>Kata Sandi</FormLabel>
            {/* <ForgotPasswordModal /> */}
          </Flex>
          <InputGroup>
            {/* <InputLeftElement
                pointerEvents="none"
                children={<KeyBoldIcon boxSize={6} color="gray.600" />}
              /> */}
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Kata Sandi"
              isInvalid={errors.password && true}
              {...register("password", {
                required: "Kata sandi harus diisi",
              })}
            />
            <InputRightElement>
              <IconButton
                size="xs"
                aria-label="Show"
                onClick={() => setShowPassword(!showPassword)}
                icon={
                  showPassword ? (
                    <EyeSlashBulkIcon boxSize={4} />
                  ) : (
                    <EyeBulkIcon boxSize={4} />
                  )
                }
              />
            </InputRightElement>
          </InputGroup>
          {errors.password && (
            <Text
              fontSize={"sm"}
              mt={1}
              color={useColorModeValue("red.600", "red.400")}
            >
              {errors.password?.message}
            </Text>
          )}
        </FormControl>
        <Button
          colorScheme="facebook"
          width="max-content"
          type="submit"
          isLoading={loading}
          paddingX={10}
        >
          Login
        </Button>
      </Stack>
    </Center>
  );
};

export default Login;
