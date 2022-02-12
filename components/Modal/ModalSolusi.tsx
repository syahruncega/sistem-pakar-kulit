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
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import mdStyle from "@/styles/Markdown.module.css";

const ModalSolusi: FC<{ solusi: string }> = ({ solusi }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} size="xs">
        Lihat
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Solusi</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              className={mdStyle.markdown}
            >
              {solusi}
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

export default ModalSolusi;
