import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { FC, MutableRefObject, useRef, useState } from "react";
import { useSWRConfig } from "swr";
import showToast from "../CustomToast";

const DeleteDialog: FC<{
  title: string;
  apiRoute: string;
  mutateKey: string;
  data?: any;
  message?: string;
  isDisabled?: boolean;
}> = ({
  title,
  data,
  apiRoute,
  mutateKey,
  isDisabled = false,
  message = "Data yang telah dihapus tidak dapat dikembalikan.",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef: MutableRefObject<any> = useRef();
  const { mutate } = useSWRConfig();

  const deleteData = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(apiRoute, { data: data });
      mutate(
        mutateKey,
        async (tableData: []) => {
          const filteredData = tableData.filter(
            (data: any) => data.id !== res.data.id
          );
          return [...filteredData];
        },
        false
      );
      showToast({
        title: "Data Terhapus",
        description: "Data berhasil dihapus.",
      });
    } catch (error: any) {
      showToast({
        status: "error",
        title: "Terjadi Kesalahan",
        description: error.message,
      });
    }
    setLoading(false);
    onClose();
  };

  return (
    <>
      <Button
        isDisabled={isDisabled}
        colorScheme="red"
        size="xs"
        onClick={(e) => {
          if (!isDisabled) {
            e.stopPropagation();
            setIsOpen(true);
          }
        }}
      >
        Hapus
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>{message}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} isDisabled={loading}>
                Batal
              </Button>
              <Button
                isLoading={loading}
                colorScheme="red"
                onClick={deleteData}
                ml={3}
              >
                Hapus
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteDialog;
