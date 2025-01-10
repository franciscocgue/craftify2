import Navbar from "../components/Navbar";
import SidebarMenu from "../components/SidebarMenu";
import SidebarComponents from "../components/SidebarComponents";
import SidebarProperties from "../components/SidebarProperties";
import { DndContext, DragEndEvent, DragMoveEvent, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import PaletteComponent from "../components/SidebarComponents/Component";
import { compTypes } from "../config/components";
import useDesignerStore from "../stores/designer";
import { ReactNode } from "react";
import { LuMove } from "react-icons/lu";
import { draggableData } from "../types/designer.types";
// import { renderNode } from "../helpers/ui-builder";
import Canvas from "../components/Canvas";
import style from './page.module.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { myPointerWithin } from '../utils';
// import { useLoaderData } from "react-router-dom";

const Designer = () => {


  // const {data} = useLoaderData() as {data: any};
  // console.log('rrrrrrrr', data);

  // const { setDraggingId, draggingId, isResizing, moveComponent, addComponent, components } = useDesignerStore();
  const setDraggable = useDesignerStore((state) => state.setDraggable);
  const draggable = useDesignerStore((state) => state.draggable);
  // const isResizing = useDesignerStore((state) => state.isResizing);
  const moveComponent = useDesignerStore((state) => state.moveComponent);
  const addComponent = useDesignerStore((state) => state.addComponent);
  const setSelectedId = useDesignerStore((state) => state.setSelectedId);
  const colorMode = useDesignerStore((state) => state.colorMode);
  // const components = useDesignerStore((state) => state.components);
  // const properties = useDesignerStore((state) => state.properties);
  // const components = useDesignerStore((state) => state.components);
  // const setDraggingId = () => (null), draggingId = null, isResizing = false, moveComponent = () => (null), addComponent = () => (null), components = []

  function handleDragEnd(event: DragEndEvent) {
    // setDraggingId(null);
    // issue: https://github.com/clauderic/dnd-kit/issues/794
    // workaround: instead of using event.active.data.current, use draggable directly (where draggable data was stored)
    if (draggable?.type === 'canvas-draggable' && event.over) {
      // move component
      moveComponent(draggable?.componentId, event.over.data.current?.componentId, event.over.data.current?.location)
    } else if (draggable?.type === 'palette-draggable' && event.over) {
      // add new component
      if (draggable?.componentType) {
        addComponent(draggable?.componentType, event.over.data.current?.componentId, event.over.data.current?.location)
      } // else error, missing componentType
    }
    setDraggable(null);
    document.body.style.cursor = 'auto'
  }

  function handleDragCancel() {
    // setDraggingId(null);
    setDraggable(null);
    document.body.style.cursor = 'auto'
  }

  function handleDragMove(event: DragMoveEvent) {
    // console.log('event.active.data.componentId', event.active.data.current.componentId)
    // setDraggingId(event.active.data.current as string);
    setDraggable(event.active.data.current as draggableData);
    document.body.style.cursor = 'grabbing'
    setSelectedId(null);
  }

  let overlayComp: ReactNode;
  // if (!isResizing && draggable) {
  if (draggable) {
    if (draggable && draggable.type === 'canvas-draggable') {
      overlayComp = <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        {/* removed to avoud components dependency high up in the dom tree */}
        {/* <TagLabel>{components[draggingId.replace('draggable_', '')].name}</TagLabel> */}
        <p>moving</p>
        <LuMove />
      </div>
    } else if (draggable && draggable.type === 'palette-draggable' && draggable.componentType) {
      overlayComp = <PaletteComponent
        style={{ opacity: '0.6' }}
        name={compTypes[draggable.componentType].name}
        icon={compTypes[draggable.componentType].icon}
      />
    } else {
      overlayComp = null;
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
    <div
      style={{
        flexDirection: 'column',
        display: 'flex',
        height: '100vh',
        minHeight: '100vh',
        maxHeight: '100vh',
        width: '100vw',
        maxWidth: '100vw',
      }}
      // direction="column"
      // h="100vh"
      // minH='100vh'
      // maxH='100vh'
      // w='100vw'
      // maxW='100vw'
      className={style[colorMode === 'dark' ? 'theme-dark' : 'theme-light']}
    >
      <ToastContainer />
      <Navbar />
      {/* main content */}
      <div style={{
        flex: 1,
        display: 'flex',
        overflow: 'hidden'
      }}
      // flex={1} 
      // overflow={'hidden'}
      >

        <SidebarMenu />
        <DndContext
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
          // modifiers={[restrictToWindowEdges]}
          onDragMove={!draggable ? handleDragMove : undefined}
          // collisionDetection={pointerWithin}
          collisionDetection={myPointerWithin}
          sensors={sensors}
        >
          <SidebarComponents />
          <Canvas />
          {/* <Flex
            flex={1}
            border={'1px solid grey'}
            flexDirection={'column'}
            alignContent={'center'}
            justifyContent={'center'}
            overflowY={'hidden'}
            overflowX={'auto'}
          // backgroundColor={'red'}
          >
            {renderNode(components, 'canvas', properties)}
          </Flex> */}
          <DragOverlay style={{ width: 'auto', height: 'auto' }} dropAnimation={null}>
            {overlayComp}
          </DragOverlay>
        </DndContext>
        <SidebarProperties />

      </div>
    </div>
  );
};


// // sample component; include overlay to hide functionality?
// const CompX = () => {
//   return <Checkbox
//     w={'100%'}
//     h={'100%'}
//   >
//     Click me!
//   </Checkbox>
// }


// function Draggable(props) {
//   const { attributes, listeners, setNodeRef, transform } = useDraggable({
//     id: 'draggable_test',
//   });
//   // const style = transform ? {
//   //   transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
//   //   position: 'absolute',
//   //   top: 0,
//   //   left: 0,
//   // } : {
//   //   position: 'absolute',
//   //   top: 0,
//   //   left: 0,
//   // };


//   return (
//     <button ref={setNodeRef}
//       // style={style}
//       style={{
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         zIndex: 2,
//       }}
//       {...listeners} {...attributes}>
//       {props.children}
//     </button>
//   );
// }


// function DroppableSide(props) {
//   const { isOver: isOverTop, setNodeRef: setNodeRefTop } = useDroppable({
//     id: 'droppable_top',
//     disabled: !props.top
//   });
//   const { isOver: isOverBottom, setNodeRef: setNodeRefBottom } = useDroppable({
//     id: 'droppable_bottom',
//     disabled: !props.bottom
//   });
//   const { isOver: isOverLeft, setNodeRef: setNodeRefLeft } = useDroppable({
//     id: 'droppable_left',
//     disabled: !props.left
//   });
//   const { isOver: isOverRight, setNodeRef: setNodeRefRight } = useDroppable({
//     id: 'droppable_right',
//     disabled: !props.right
//   });

//   const styleTop = {
//     position: 'absolute',
//     width: '100%',
//     height: '50%',
//     top: 0,
//     left: 0,
//   };

//   const styleTopHighlight = {
//     backgroundColor: isOverTop ? 'green' : undefined,
//     position: 'absolute',
//     width: '100%',
//     height: '6px',
//     top: '-2px',
//     right: 0,
//   };

//   const styleBottom = {
//     position: 'absolute',
//     width: '100%',
//     height: '50%',
//     top: '50%',
//     left: 0,
//   };

//   const styleBottomHighlight = {
//     backgroundColor: isOverBottom ? 'green' : undefined,
//     position: 'absolute',
//     width: '100%',
//     height: '6px',
//     bottom: '-2px',
//     right: 0,
//   };
//   const styleLeft = {
//     position: 'absolute',
//     width: '50%',
//     height: '100%',
//     top: 0,
//     left: 0,
//   };

//   const styleLeftHighlight = {
//     backgroundColor: isOverLeft ? 'green' : undefined,
//     position: 'absolute',
//     width: '6px',
//     height: '100%',
//     left: '-2px',
//     top: 0,
//   };

//   const styleRight = {
//     position: 'absolute',
//     width: '50%',
//     height: '100%',
//     top: 0,
//     right: 0,
//   };

//   const styleRightHighlight = {
//     backgroundColor: isOverRight ? 'green' : undefined,
//     position: 'absolute',
//     width: '6px',
//     height: '100%',
//     right: '-2px',
//     top: 0,
//   };

//   console.log(props.top)

//   return (
//     <>
//       {/* top */}
//       {props.top && <div ref={setNodeRefTop} style={styleTop} />}
//       {props.top && <div style={styleTopHighlight} />}
//       {/* bottom */}
//       {props.bottom && <div ref={setNodeRefBottom} style={styleBottom} />}
//       {props.bottom && <div style={styleBottomHighlight} />}
//       {/* left */}
//       {props.left && <div ref={setNodeRefLeft} style={styleLeft} />}
//       {props.left && <div style={styleLeftHighlight} />}
//       {/* right */}
//       {props.right && <div ref={setNodeRefRight} style={styleRight} />}
//       {props.right && <div style={styleRightHighlight} />}
//     </>
//   );
// }


// const ResizableWrapper = () => {

//   const refResizable = useRef(null);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isSelected, setIsSelected] = useState(false);
//   const draggingId = useDesignerStore((state) => state.draggingId);


//   return <>
//     <Resizable
//       ref={refResizable}
//       defaultSize={{ width: '200px', height: '50px' }}
//       style={{ margin: '40px 0 0 0' }}
//       // resizing enabled only if comp selected!
//       enable={isSelected && draggingId === null ? { top: true, right: true, bottom: true, left: true, topRight: true, bottomRight: true, bottomLeft: true, topLeft: true } : false}
//       onResizeStop={(e, __, elem, d: NumberSize) => {
//         console.log(elem.style.width)
//         console.log(elem.style.height)
//       }}
//     >
//       {/* why div? to handle click & mouse events */}
//       <Box
//         w={'100%'}
//         h={'100%'}
//         outline={isHovered || isSelected ? '1px solid red' : undefined}
//         onMouseOver={() => setIsHovered(true)}
//         onMouseOut={() => setIsHovered(false)}
//         onClick={() => {
//           console.log('clickeddd')
//           setIsSelected(prev => !prev)
//         }}
//       >
//         <CompX />
//         {isHovered && !!!draggingId && <DraggableHandle componentId="test" />}
//         {draggingId !== null && <DroppableComponent componentId="test" parentType="column" />}
//         {/* overlay - hide component interactions */}
//         <Box
//           w={'100%'}
//           h={'100%'}
//           position={"absolute"}
//           left={0}
//           right={0}
//           top={0}
//           bottom={0}
//           // zIndex={1}
//         />
//         {/* @TODONEXT: add actiuon icons (delete, copy, plus) */}
//       </Box>
//       {/* margins */}
//       {isHovered && !!!draggingId && <Box style={{
//         position: 'absolute',
//         width: '100%',
//         height: '40px',
//         backgroundColor: 'yellow',
//         top: '-40px',
//         left: '0',
//         opacity: '0.2'
//       }}></Box>}
//     </Resizable>
//   </>
// }


export default Designer;