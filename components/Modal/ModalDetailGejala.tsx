import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { FC } from "react";

const ModalDetailGejala: FC<{
  title: string;
  description: string;
}> = ({ title, description }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button colorScheme="teal" size="xs" ml={4} onClick={onOpen}>
        Detail
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW={600}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={6}>{description}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalDetailGejala;
