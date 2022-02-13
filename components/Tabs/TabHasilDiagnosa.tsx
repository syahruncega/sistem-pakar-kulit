import { ArrowLeftBoldIcon } from "@/styles/iconsax";
import { Button } from "@chakra-ui/react";
import { FC } from "react";

const TabHasilDiagnosa: FC<{ setTabIndex: Function }> = ({ setTabIndex }) => {
  return (
    <>
      <Button
        colorScheme={"orange"}
        mr={4}
        onClick={() => {
          setTabIndex(1);
        }}
        rightIcon={<ArrowLeftBoldIcon mt={"2px"} />}
      >
        Kembali
      </Button>
    </>
  );
};

export default TabHasilDiagnosa;
