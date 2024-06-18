import { Box, Flex, Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import Canvas from "../components/Canvas";
import Navbar from "../components/Navbar";
import SidebarMenu from "../components/SidebarMenu";
import SidebarComponents from "../components/SidebarComponents";
import SidebarProperties from "../components/SidebarProperties";
import { DndContext, DragEndEvent, DragMoveEvent, DragOverlay, PointerSensor, pointerWithin, useSensor, useSensors } from '@dnd-kit/core';
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import PaletteComponent from "../components/SidebarComponents/Component";
import { compTypes } from "../config/components";
import useDesignerStore from "../stores/designer";
import { ReactNode } from "react";
import { LuMove } from "react-icons/lu";


const Designer = () => {

  // const { setDraggingId, draggingId, isResizing, moveComponent, addComponent, components } = useDesignerStore();
  const setDraggingId = useDesignerStore((state) => state.setDraggingId);
  const draggingId = useDesignerStore((state) => state.draggingId);
  const isResizing = useDesignerStore((state) => state.isResizing);
  const moveComponent = useDesignerStore((state) => state.moveComponent);
  const addComponent = useDesignerStore((state) => state.addComponent);
  const setSelectedId = useDesignerStore((state) => state.setSelectedId);
  // const components = useDesignerStore((state) => state.components);
  // const setDraggingId = () => (null), draggingId = null, isResizing = false, moveComponent = () => (null), addComponent = () => (null), components = []

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
    setDraggingId(event.active.id as string);
    setSelectedId(null);
  }

  let overlayComp: ReactNode;
  if (!isResizing && draggingId) {
    if (draggingId?.startsWith('draggable_')) {
      overlayComp = <Box>
        <Tag size={'md'} key={'md'} variant='solid' colorScheme='blackAlpha'>
          <TagLeftIcon boxSize='15px' as={LuMove} />
          {/* removed to avoud components dependency high up in the dom tree */}
          {/* <TagLabel>{components[draggingId.replace('draggable_', '')].name}</TagLabel> */}
          <TagLabel>moving</TagLabel>
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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // otherwise onClick events ignored;
        // move 5px before dragging starts; else "normal" events
        distance: 5
      }
    }),)

  return (
    <Flex direction="column" h="100vh" minH='100vh' maxH='100vh' w='100vw' maxW='100vw'>
      <Navbar />
      {/* main content */}
      <Flex flex={1} overflow={'hidden'}>

        <SidebarMenu />
        <DndContext
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
          // modifiers={[restrictToWindowEdges]}
          onDragMove={!draggingId ? handleDragMove : undefined}
          collisionDetection={pointerWithin}
          sensors={sensors}
        >
          <SidebarComponents />
          {/* <Canvas /> */}
          <Flex
            flex={1}
            border={'1px solid orange'}
            flexDirection={'column'}
            alignContent={'center'}
            justifyContent={'center'}
            overflowY={'hidden'}
            overflowX={'auto'}
          >

            {/* canvas */}
            <Flex
              border={'1px solid red'}
              flexDirection={'column'}
              overflow={'auto'}
              minW={'360px'}
              m={'0 auto'}
              minH={'min(calc(100%), 760px)'}
              maxW={'360px'}
              maxH={'760px'}
            >
              <p>test11</p>
              <p>test12</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test99</p>
            </Flex>


          </Flex>
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