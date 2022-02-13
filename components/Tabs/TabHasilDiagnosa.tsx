import { ArrowLeftBoldIcon } from "@/styles/iconsax";
import { Button } from "@chakra-ui/react";
import { useSistemPakar } from "contexts/SistemPakarContext";
import { FC } from "react";

const TabHasilDiagnosa: FC<{ setTabIndex: Function }> = ({ setTabIndex }) => {
  const { pasien, diagnosa } = useSistemPakar();
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
      <Button
        colorScheme={"orange"}
        mr={4}
        onClick={() => {
          console.log(pasien);
          console.log(diagnosa);
        }}
      >
        Check
      </Button>
    </>
  );
};

export default TabHasilDiagnosa;
