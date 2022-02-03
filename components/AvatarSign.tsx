import { LogoutBulkIcon, ProfileBulkIcon } from "@/styles/iconsax";
import {
  Avatar,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { FC } from "react";
import LogoutDialog from "./Modal/LogoutDialog";

const AvatarSign: FC<{}> = () => {
  const { data: session } = useSession();

  return (
    <Menu>
      <MenuButton>
        <Flex align={"center"}>
          <Text fontWeight={"medium"} color={"gray.600"} mr={2}>
            {session?.user?.name}
          </Text>
          <Avatar name="Syahrun Cega" size={"sm"} src="#" />
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem
          icon={<ProfileBulkIcon fontSize={20} color={"facebook.600"} />}
        >
          Profile
        </MenuItem>
        <LogoutDialog />
      </MenuList>
    </Menu>
  );
};

export default AvatarSign;
