import { LogoutBulkIcon, ProfileBulkIcon } from "@/styles/iconsax";
import {
  Avatar,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Button,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { FC } from "react";
import LogoutDialog from "../Modal/LogoutDialog";
import NextLink from "next/link";

const AvatarSign: FC<{}> = () => {
  const { data: session } = useSession();

  return (
    <Menu>
      <MenuButton as={Button} variant="ghost">
        <Flex align={"center"}>
          <Text
            fontWeight={"medium"}
            display={["none", "none", "flex"]}
            color={"gray.600"}
            mr={3}
          >
            {session?.user?.name}
          </Text>
          <Avatar name={session?.user?.name!} size={"sm"} src="#" />
        </Flex>
      </MenuButton>
      <MenuList>
        <NextLink href={"/dashboard/profil"} passHref>
          <MenuItem
            icon={<ProfileBulkIcon fontSize={20} color={"facebook.600"} />}
          >
            Profile
          </MenuItem>
        </NextLink>
        <LogoutDialog />
      </MenuList>
    </Menu>
  );
};

export default AvatarSign;
