import { FC } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Heading,
  Text,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import mdStyle from "@/styles/Markdown.module.css";
import { BahanPemutih } from "@prisma/client";

const ModalHasilDiagnosa: FC<{
  bahanPemutih: BahanPemutih;
  nilaiCF: number;
}> = ({ bahanPemutih, nilaiCF }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} size="xs">
        Lihat
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Hasil Diagnosa</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading size={"lg"} mb={2}>
              {bahanPemutih.jenisBahanPemutih}
            </Heading>
            <Heading size={"md"} mb={4}>{`Presentasi (${Math.round(
              nilaiCF * 100
            )} %)`}</Heading>
            <Text size={"md"} fontWeight="bold" mb={2}>
              {`Kadar Maksimal Penggunaan: ${bahanPemutih.presentaseKadarMax}`}
            </Text>
            <Text size={"md"} fontWeight="bold" mb={2}>
              Solusi:
            </Text>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              className={mdStyle.markdown}
            >
              {bahanPemutih.solusi}
            </ReactMarkdown>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="facebook" mr={3} onClick={onClose}>
              Tutup
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalHasilDiagnosa;
