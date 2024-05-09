import { Flex } from "@chakra-ui/react";
import Canvas from "../components/Canvas";
import Navbar from "../components/Navbar";
import SidebarMenu from "../components/SidebarMenu";
import SidebarComponents from "../components/SidebarComponents";
import SidebarProperties from "../components/SidebarProperties";
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { useState } from "react";
import Component from "../components/SidebarComponents/Component";
import { compTypes } from "../helpers/components";
import Draggable from "../helpers/Draggable";


// App component
const Designer = () => {

  const [draggingId, setDraggingId] = useState(null);

  function handleDragEnd(event) {
    setDraggingId(null);
    if (event.over && event.over.id === 'canvas') {
      console.log('dropped');
    }
  }
  function handleDragStart(event) {
    setDraggingId(event.active.id)
  }

  return (
    <Flex direction="column" h="100vh" minH='100vh' maxH='100vh' w='100vw' maxW='100vw'>
      <Navbar />
      {/* main content */}
      <Flex flex={1} overflow={'hidden'}>

        <SidebarMenu />
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
          <SidebarComponents />
          <Canvas />
          <DragOverlay dropAnimation={null}>
            {draggingId ?
              <Component name={compTypes[draggingId].name} icon={compTypes[draggingId].icon} />
              : null}
          </DragOverlay>
        </DndContext>
        <SidebarProperties />

      </Flex>
    </Flex>
  );
};

export default Designer;