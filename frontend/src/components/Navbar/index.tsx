import { Button, Flex } from "@chakra-ui/react";

// Top Navbar
const Navbar = () => {
  console.log('C - Navbar')
    return (
      <Flex justify="space-between" p={4} bg="gray.200">
        <Button variant="link">Home</Button>
        <Button variant="link">About</Button>
        {/* Add more navigation items */}
      </Flex>
    );
  };

export default Navbar;