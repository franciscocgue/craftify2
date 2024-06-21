import { Box, Button, Flex, Tag, TagLabel, TagLeftIcon, position, useStatStyles } from "@chakra-ui/react";
import Canvas from "../components/Canvas";
import Navbar from "../components/Navbar";
import SidebarMenu from "../components/SidebarMenu";
import SidebarComponents from "../components/SidebarComponents";
import SidebarProperties from "../components/SidebarProperties";
import { DndContext, DragEndEvent, DragMoveEvent, DragOverlay, PointerSensor, pointerWithin, useDraggable, useDroppable, useSensor, useSensors } from '@dnd-kit/core';
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import PaletteComponent from "../components/SidebarComponents/Component";
import { compTypes } from "../config/components";
import useDesignerStore from "../stores/designer";
import { ReactNode, useRef, useState } from "react";
import { LuMove } from "react-icons/lu";
import { NumberSize, Resizable } from "re-resizable";
import { MdDragIndicator } from "react-icons/md";


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
              // avoid overlapping with scrollbar
              // @TODO: maybe better solution (inner div); alternatively, add pr to total width to keep effective width 
              pr={'5px'}
            >
              <ResizableWrapper />
            </Flex>
          </Flex>
          <DragOverlay style={{ width: 'auto', height: 'auto' }} dropAnimation={null}>
            {overlayComp}
          </DragOverlay>
        </DndContext>
        <SidebarProperties />

      </Flex>
    </Flex>
  );
};


// sample component; include overlay to hide functionality?
const CompX = () => {
  return <Button
    w={'100%'}
    h={'100%'}
  >
    Click me!
  </Button>
}


function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable_test',
  });
  // const style = transform ? {
  //   transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  // } : {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  // };


  return (
    <button ref={setNodeRef}
      // style={style}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2,
      }}
      {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}


function DroppableSide(props) {
  const { isOver: isOverTop, setNodeRef: setNodeRefTop } = useDroppable({
    id: 'droppable_top',
    disabled: !props.top
  });
  const { isOver: isOverBottom, setNodeRef: setNodeRefBottom } = useDroppable({
    id: 'droppable_bottom',
    disabled: !props.bottom
  });
  const { isOver: isOverLeft, setNodeRef: setNodeRefLeft } = useDroppable({
    id: 'droppable_left',
    disabled: !props.left
  });
  const { isOver: isOverRight, setNodeRef: setNodeRefRight } = useDroppable({
    id: 'droppable_right',
    disabled: !props.right
  });

  const styleTop = {
    position: 'absolute',
    width: '100%',
    height: '50%',
    top: 0,
    left: 0,
  };

  const styleTopHighlight = {
    backgroundColor: isOverTop ? 'green' : undefined,
    position: 'absolute',
    width: '100%',
    height: '6px',
    top: '-2px',
    right: 0,
  };

  const styleBottom = {
    position: 'absolute',
    width: '100%',
    height: '50%',
    top: '50%',
    left: 0,
  };

  const styleBottomHighlight = {
    backgroundColor: isOverBottom ? 'green' : undefined,
    position: 'absolute',
    width: '100%',
    height: '6px',
    bottom: '-2px',
    right: 0,
  };
  const styleLeft = {
    position: 'absolute',
    width: '50%',
    height: '100%',
    top: 0,
    left: 0,
  };

  const styleLeftHighlight = {
    backgroundColor: isOverLeft ? 'green' : undefined,
    position: 'absolute',
    width: '6px',
    height: '100%',
    left: '-2px',
    top: 0,
  };

  const styleRight = {
    position: 'absolute',
    width: '50%',
    height: '100%',
    top: 0,
    right: 0,
  };

  const styleRightHighlight = {
    backgroundColor: isOverRight ? 'green' : undefined,
    position: 'absolute',
    width: '6px',
    height: '100%',
    right: '-2px',
    top: 0,
  };

  console.log(props.top)

  return (
    <>
      {/* top */}
      {props.top && <div ref={setNodeRefTop} style={styleTop} />}
      {props.top && <div style={styleTopHighlight} />}
      {/* bottom */}
      {props.bottom && <div ref={setNodeRefBottom} style={styleBottom} />}
      {props.bottom && <div style={styleBottomHighlight} />}
      {/* left */}
      {props.left && <div ref={setNodeRefLeft} style={styleLeft} />}
      {props.left && <div style={styleLeftHighlight} />}
      {/* right */}
      {props.right && <div ref={setNodeRefRight} style={styleRight} />}
      {props.right && <div style={styleRightHighlight} />}
    </>
  );
}


const ResizableWrapper = () => {

  const refResizable = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const draggingId = useDesignerStore((state) => state.draggingId);


  return <>
    <Resizable
      ref={refResizable}
      defaultSize={{ width: '200px', height: '50px' }}
      style={{ margin: '40px 0 0 0' }}
      // resizing enabled only if comp selected!
      enable={isSelected ? { top: true, right: true, bottom: true, left: true, topRight: true, bottomRight: true, bottomLeft: true, topLeft: true } : false}
      onResizeStop={(e, __, elem, d: NumberSize) => {
        console.log(elem.style.width)
        console.log(elem.style.height)
      }}
    >
      {/* why div? to handle click & mouse events */}
      <Box
        w={'100%'}
        h={'100%'}
        outline={isHovered || isSelected ? '1px solid red' : undefined}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        onClick={() => {
          console.log('clickeddd')
          setIsSelected(prev => !prev)
        }}
      >
        <CompX />
        {isHovered && !!!draggingId && <Draggable><MdDragIndicator size={20} /></Draggable>}
        {draggingId !== null && <DroppableSide top={true} bottom={true} />}
        {/* @TODONEXT: add actiuon icons (delete, copy, plus) */}
      </Box>
      {/* margins */}
      {isHovered && !!!draggingId && <Box style={{
        position: 'absolute',
        width: '100%',
        height: '40px',
        backgroundColor: 'yellow',
        top: '-40px',
        left: '0',
        opacity: '0.2'
      }}></Box>}
    </Resizable>
    <Resizable
      ref={refResizable}
      defaultSize={{ width: '200px', height: '50px' }}
      style={{ margin: '40px 0 0 0' }}
      // resizing enabled only if comp selected!
      enable={isSelected ? { top: true, right: true, bottom: true, left: true, topRight: true, bottomRight: true, bottomLeft: true, topLeft: true } : false}
      onResizeStop={(e, __, elem, d: NumberSize) => {
        console.log(elem.style.width)
        console.log(elem.style.height)
      }}
    >
      {/* why div? to handle click & mouse events */}
      <Box
        w={'100%'}
        h={'100%'}
        outline={isHovered || isSelected ? '1px solid red' : undefined}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        onClick={() => {
          console.log('clickeddd')
          setIsSelected(prev => !prev)
        }}
      >
        <CompX />
        {isHovered && !!!draggingId && <Draggable><MdDragIndicator size={20} /></Draggable>}
        {draggingId !== null && <DroppableSide top={true} bottom={true} />}
        {/* @TODONEXT: add actiuon icons (delete, copy, plus) */}
      </Box>
      {/* margins */}
      {isHovered && !!!draggingId && <Box style={{
        position: 'absolute',
        width: '100%',
        height: '40px',
        backgroundColor: 'yellow',
        top: '-40px',
        left: '0',
        opacity: '0.2'
      }}></Box>}
    </Resizable>
    <Resizable
      ref={refResizable}
      defaultSize={{ width: '200px', height: '50px' }}
      style={{ margin: '40px 0 0 0' }}
      // resizing enabled only if comp selected!
      enable={isSelected ? { top: true, right: true, bottom: true, left: true, topRight: true, bottomRight: true, bottomLeft: true, topLeft: true } : false}
      onResizeStop={(e, __, elem, d: NumberSize) => {
        console.log(elem.style.width)
        console.log(elem.style.height)
      }}
    >
      {/* why div? to handle click & mouse events */}
      <Box
        w={'100%'}
        h={'100%'}
        outline={isHovered || isSelected ? '1px solid red' : undefined}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        onClick={() => {
          console.log('clickeddd')
          setIsSelected(prev => !prev)
        }}
      >
        <CompX />
        {isHovered && !!!draggingId && <Draggable><MdDragIndicator size={20} /></Draggable>}
        {draggingId !== null && <DroppableSide top={true} bottom={true} />}
        {/* @TODONEXT: add actiuon icons (delete, copy, plus) */}
      </Box>
      {/* margins */}
      {isHovered && !!!draggingId && <Box style={{
        position: 'absolute',
        width: '100%',
        height: '40px',
        backgroundColor: 'yellow',
        top: '-40px',
        left: '0',
        opacity: '0.2'
      }}></Box>}
    </Resizable>
  </>
}


export default Designer;