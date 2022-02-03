import theme from "@/styles/theme";
import { createStandaloneToast, UseToastOptions } from "@chakra-ui/react";

const customToast = createStandaloneToast({ theme: theme });

const showToast = (option?: UseToastOptions | undefined) => {
  return customToast({
    status: "success",
    duration: 4000,
    isClosable: true,
    position: "top",
    ...option,
  });
};

export default showToast;
