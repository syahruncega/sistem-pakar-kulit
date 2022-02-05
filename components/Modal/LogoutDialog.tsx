import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  MenuItem,
  Text,
  Flex,
} from "@chakra-ui/react";
import { FC, MutableRefObject, useRef, useState } from "react";
import { signOut } from "next-auth/react";
import { LogoutBulkIcon } from "@/styles/iconsax";

const LogoutDialog: FC<{ isButton?: boolean }> = ({ isButton = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef: MutableRefObject<any> = useRef();

  return (
    <>
      {isButton ? (
        <Button
          colorScheme={"red"}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Logout
        </Button>
      ) : (
        <MenuItem
          icon={<LogoutBulkIcon fontSize={20} color={"red.500"} />}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Logout
        </MenuItem>
      )}

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {"Logout"}
            </AlertDialogHeader>

            <AlertDialogBody>{"Anda yakin akan logout?"}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} isDisabled={loading}>
                Batal
              </Button>
              <Button
                isLoading={loading}
                colorScheme="red"
                onClick={async () => {
                  setLoading(true);
                  await signOut();
                  setLoading(false);
                }}
                ml={3}
              >
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default LogoutDialog;
