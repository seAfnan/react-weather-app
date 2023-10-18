import { HStack, Image, Text } from "@chakra-ui/react";
// import logo from "../assets/logo.webp";
import { ColorModeSwitch } from "./ColorModeSwitch";

export const NavBar = () => {
  return (
    <HStack justifyContent="flex-end" padding="10px">
      {/* <Image src={logo} boxSize="60px"></Image> */}
      <ColorModeSwitch />
    </HStack>
  );
};
