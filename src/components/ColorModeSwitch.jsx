import { HStack, Text, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

export const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  const toggleIcon = () => {
    // Toggle the color mode when the icons are clicked
    toggleColorMode();
  };

  return (
    <HStack spacing={2} onClick={toggleIcon} cursor="pointer">
      {colorMode === "dark" ? (
        <>
          <SunIcon boxSize={5} color="yellow.400" />
          <Text>Light</Text>
        </>
      ) : (
        <>
          <MoonIcon boxSize={5} color="gray.400" />
          <Text>Dark</Text>
        </>
      )}
    </HStack>
  );
};
