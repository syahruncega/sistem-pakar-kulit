import {
  AspectRatio,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Gejala } from "@prisma/client";
import React, { FC } from "react";
import NextImage from "next/image";

const ModalDetailGejala: FC<{
  gejala: Gejala;
}> = ({ gejala }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button colorScheme="teal" size="xs" ml={4} onClick={onOpen}>
        Detail
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW={600}>
          <ModalHeader>{gejala.namaGejala}</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={6}>{gejala.keterangan}</ModalBody>
          {gejala.urlGambar && (
            <Center>
              <AspectRatio
                ratio={4 / 3}
                w="200px"
                borderRadius="md"
                overflow={"hidden"}
                mb={4}
              >
                <NextImage
                  layout="fill"
                  objectFit="cover"
                  src={gejala.urlGambar}
                  placeholder={"blur"}
                  alt={gejala.namaGejala}
                  blurDataURL={gejala.urlGambar}
                />
              </AspectRatio>
            </Center>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalDetailGejala;
