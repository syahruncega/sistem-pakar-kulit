import {
  AspectRatio,
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
import NextImage from "next/image";

const ModalMateri: FC<{
  alt: string;
  img: string;
  description: string;
}> = ({ alt, img, description }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Detail</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={600}>
          <ModalHeader>{alt}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AspectRatio
              ratio={4 / 3}
              w="full"
              borderRadius="md"
              overflow={"hidden"}
              mb={4}
            >
              <NextImage
                layout="fill"
                objectFit="cover"
                src={img}
                placeholder={"blur"}
                alt={alt}
                blurDataURL={img}
              />
            </AspectRatio>
            {description}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalMateri;
