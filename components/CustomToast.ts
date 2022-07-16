import theme from "@/styles/theme";
import { createStandaloneToast, UseToastOptions } from "@chakra-ui/toast";

const { toast } = createStandaloneToast({ theme: theme }) as any;

const showToast = (option?: UseToastOptions | undefined) => {
  return toast({
    status: "success",
    duration: 4000,
    isClosable: true,
    position: "top",
    ...option,
  });
};

export default showToast;
