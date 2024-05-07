import { Flex, Box, Button, IconButton, Drawer } from "@chakra-ui/react";
import ComponentPalette from "./ComponentPalette";
import PropertiesPalette from "./PropertiesPalette";

// Top Navbar
const Navbar = () => {
  return (
    <Flex justify="space-between" p={4} bg="gray.200">
      <Button variant="link">Home</Button>
      <Button variant="link">About</Button>
      {/* Add more navigation items */}
    </Flex>
  );
};

// App component
const Designer = () => {
  return (
    <Flex direction="column" h="100vh" minH='100vh' maxH='100vh'>
      <Navbar />
      {/* main content */}
      <Flex justify="space-between" flex={1} overflow={'auto'}>
        <ComponentPalette />
        <Box>Center</Box>
        <PropertiesPalette />
        {/* <LeftSidebar />
        <MainContent />
        <RightSidebar /> */}
      </Flex>
    </Flex>
  );
};

export default Designer;