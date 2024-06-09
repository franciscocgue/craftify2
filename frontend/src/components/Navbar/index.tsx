import { Button, Flex, Icon, useColorMode } from "@chakra-ui/react";
import { MdDarkMode } from "react-icons/md";
import { MdSunny } from "react-icons/md";

const ToggleColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode}>
      {colorMode === 'light' ? <Icon as={MdDarkMode}/> : <Icon as={MdSunny}/>}
    </Button>
  );
};

// Top Navbar
const Navbar = () => {

  console.log('C - Navbar')
  
    return (
      <Flex justify="space-between" p={4}>
        <Button variant="link">Home</Button>
        <ToggleColorMode />
        <Button variant="link">About</Button>
      </Flex>
    );
  };

export default Navbar;
