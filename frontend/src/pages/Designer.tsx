import { Box, Flex, Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import Canvas from "../components/Canvas";
import Navbar from "../components/Navbar";
import SidebarMenu from "../components/SidebarMenu";
import SidebarComponents from "../components/SidebarComponents";
import SidebarProperties from "../components/SidebarProperties";
import { DndContext, DragEndEvent, DragMoveEvent, DragOverlay, pointerWithin } from '@dnd-kit/core';
import { restrictToWindowEdges, snapCenterToCursor } from "@dnd-kit/modifiers";
import PaletteComponent from "../components/SidebarComponents/Component";
import { compTypes } from "../config/components";
import useDesignerStore from "../stores/designer";
import { ReactNode } from "react";
import { LuMove } from "react-icons/lu";


const Designer = () => {

  const { setDraggingId, draggingId, isResizing, moveComponent, addComponent, components } = useDesignerStore();

  function handleDragEnd(event: DragEndEvent) {
    setDraggingId(null);
    if (event.active.data.current?.componentId && event.over) {
      // move component
      moveComponent(event.active.data.current.componentId, event.over.data.current?.componentId, event.over.data.current?.location)
    } else if (event.over) {
      // add new component (componentId is null)
      addComponent(event.active.data.current?.componentType, event.over.data.current?.componentId, event.over.data.current?.location)
    }
  }

  function handleDragCancel() {
    setDraggingId(null);
  }

  function handleDragMove(event: DragMoveEvent) {
    setDraggingId(event.active.id as string)
  }

  let overlayComp: ReactNode;
  if (!isResizing && draggingId) {
    if (draggingId?.startsWith('draggable_')) {
      overlayComp = <Box>
        <Tag size={'md'} key={'md'} variant='solid' colorScheme='blackAlpha'>
          <TagLeftIcon boxSize='15px' as={LuMove} />
          <TagLabel>{components[draggingId.replace('draggable_', '')].name}</TagLabel>
        </Tag>
      </Box>
    } else {
      overlayComp = <PaletteComponent
        style={{ opacity: '0.6' }}
        name={compTypes[draggingId as keyof typeof compTypes].name}
        icon={compTypes[draggingId as keyof typeof compTypes].icon}
      />
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
          onDragCancel={handleDragCancel}
          modifiers={[restrictToWindowEdges]}
          onDragMove={!draggingId ? handleDragMove : undefined}
          collisionDetection={pointerWithin}
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