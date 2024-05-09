import { Flex } from "@chakra-ui/react";
import Canvas from "../components/Canvas";
import Navbar from "../components/Navbar";
import SidebarMenu from "../components/SidebarMenu";
import SidebarComponents from "../components/SidebarComponents";
import SidebarProperties from "../components/SidebarProperties";


// App component
const Designer = () => {
  return (
    <Flex direction="column" h="100vh" minH='100vh' maxH='100vh' w='100vw' maxW='100vw'>
      <Navbar />
      {/* main content */}
      <Flex flex={1} overflow={'auto'}>

        <SidebarMenu />
        <SidebarComponents />
        <Canvas />
        <SidebarProperties />

      </Flex>
    </Flex>
  );
};

export default Designer;