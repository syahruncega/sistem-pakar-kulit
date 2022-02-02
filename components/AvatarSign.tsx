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
import { FC } from "react";

const AvatarSign: FC<{}> = () => {
  return (
    <Menu>
      <MenuButton>
        <Flex align={"center"}>
          <Text
            fontFamily={"Barlow"}
            fontWeight={"medium"}
            color={"gray.600"}
            mr={2}
          >
            Syahrun Cega
          </Text>
          <Avatar
            name="Syahrun Cega"
            size={"sm"}
            src="https://bit.ly/broken-link"
          />
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem
          icon={<ProfileBulkIcon fontSize={20} color={"facebook.600"} />}
        >
          Profile
        </MenuItem>
        <MenuItem icon={<LogoutBulkIcon fontSize={20} color={"red.500"} />}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default AvatarSign;
