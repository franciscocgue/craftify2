import { Box, Flex, Text } from "@chakra-ui/react";
import Canvas from "../components/Canvas";
import Navbar from "../components/Navbar";
import SidebarMenu from "../components/SidebarMenu";
import SidebarComponents from "../components/SidebarComponents";
import SidebarProperties from "../components/SidebarProperties";
import { DndContext, DragOverlay, pointerWithin } from '@dnd-kit/core';
import Component from "../components/SidebarComponents/Component";
import { compTypes } from "../helpers/components";
import { restrictToWindowEdges, snapCenterToCursor } from "@dnd-kit/modifiers";
// import { snapVertCenterToCursor } from "../helpers/dnd-kit";
import useDesignerStore from "../stores/designer";
import { useState } from "react";


// App component
const Designer = () => {

  // const [draggingId_, setDraggingId] = useState(null);
  const { setDraggingId, draggingId, isResizing } = useDesignerStore();

  const [hasMoved, setHasMoved] = useState(false);
  const [delayHandler, setDelayHandler] = useState(null);

  function handleDragEnd(event) {
    console.log('END DRAG')
    // console.log(event)
    setDraggingId(null);
    // if (event.over && event.over.id === 'canvas') {
    //   console.log('dropped');
    // }
  }

  // function handleDragStart(event) {
  //   // setDraggingId(event.active.id)
  //   console.log('STart dragging')
  // }

  function handleDragMove(event) {
    setDraggingId(event.active.id)
    console.log(event.active.id)
  }

  function handleDragOver(event) {
    // console.log('dragging OVER')
    // console.log(event)
  }

  let overlayComp = 'test';
  if (!isResizing && draggingId) {
    if (draggingId?.startsWith('draggable_')) {
      overlayComp = <Box p={0.5} bg={'rgba(255, 255, 255, 0.5)'} w={'max-content'} borderRadius={'7px'} border={'1px solid blue'}><Text fontSize='xs'>moving {draggingId}</Text></Box>
    } else {
      overlayComp = <Component style={{ opacity: '0.4' }} name={compTypes[draggingId].name} icon={compTypes[draggingId].icon} />
    }
  } else {
    overlayComp = null;
  }

  return (
    <Flex direction="column" h="100vh" minH='100vh' maxH='100vh' w='100vw' maxW='100vw'>
      <Navbar />
      {/* main content */}
      <Flex flex={1} overflow={'hidden'}>

        <SidebarMenu />
        <DndContext
          onDragEnd={handleDragEnd}
          // onDragStart={handleDragStart}
          modifiers={[restrictToWindowEdges]}
          onDragOver={handleDragOver}
          onDragMove={!draggingId ? handleDragMove : undefined}
          collisionDetection={pointerWithin}
        // collisionDetection={rectIntersection}
        >
          <SidebarComponents />
          <Canvas />
          <DragOverlay style={{ width: 'auto', height: 'auto' }} dropAnimation={null} modifiers={[snapCenterToCursor]}>
            {overlayComp}
          </DragOverlay>
        </DndContext>
        <SidebarProperties />

      </Flex>
    </Flex>
  );
};

export default Designer;