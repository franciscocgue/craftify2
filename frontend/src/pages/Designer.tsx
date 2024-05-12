import { Box, Flex, Text } from "@chakra-ui/react";
import Canvas from "../components/Canvas";
import Navbar from "../components/Navbar";
import SidebarMenu from "../components/SidebarMenu";
import SidebarComponents from "../components/SidebarComponents";
import SidebarProperties from "../components/SidebarProperties";
import { DndContext, DragOverlay, closestCenter, pointerWithin, rectIntersection } from '@dnd-kit/core';
import { useState } from "react";
import Component from "../components/SidebarComponents/Component";
import { compTypes } from "../helpers/components";
import Draggable from "../helpers/Draggable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import useDesignerStore from "../stores/designer";
import { cornersOfRectangle } from "@dnd-kit/core/dist/utilities/algorithms/helpers";


// App component
const Designer = () => {

  // const [draggingId_, setDraggingId] = useState(null);
  const { setDraggingId, draggingId } = useDesignerStore();

  function handleDragEnd(event) {
    console.log('END DRAG')
    console.log(event)
    setDraggingId(null);
    // if (event.over && event.over.id === 'canvas') {
    //   console.log('dropped');
    // }
  }

  function handleDragStart(event) {
    setDraggingId(event.active.id)
  }

  function handleDragOver(event) {
    // console.log('dragging OVER')
    // console.log(event)
  }


  return (
    <Flex direction="column" h="100vh" minH='100vh' maxH='100vh' w='100vw' maxW='100vw'>
      <Navbar />
      {/* main content */}
      <Flex flex={1} overflow={'hidden'}>

        <SidebarMenu />
        <DndContext
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          modifiers={[restrictToWindowEdges]}
          onDragOver={handleDragOver}
          collisionDetection={pointerWithin}
        // collisionDetection={rectIntersection}
        >
          <SidebarComponents />
          <Canvas />
          <DragOverlay dropAnimation={null}>
            {draggingId === 'draggable_TEST' && <Box p={0.5} bg={'rgba(255, 255, 255, 0.5)'} w={'max-content'} borderRadius={'7px'} border={'1px solid blue'}><Text fontSize='xs'>moving container</Text></Box>}
            {draggingId && draggingId !== 'draggable_TEST' && <Component style={{ opacity: '0.4' }} name={compTypes[draggingId].name} icon={compTypes[draggingId].icon} />}
            {!draggingId && null}
          </DragOverlay>
        </DndContext>
        <SidebarProperties />

      </Flex>
    </Flex>
  );
};

export default Designer;