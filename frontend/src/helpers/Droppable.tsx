import { useDroppable } from '@dnd-kit/core';
import { CSSProperties, ReactNode } from 'react';
import useDesignerStore from '../stores/designer';

/* 
Needs a parent with size; Droppable will fit all space (100%)

<container>
  <DroppableContainer>
    <content></content>
  </DroppableContainer>
</container>

Dropping options
- top: same level (sibling), before component
- bottom: same level (sibling), after component
- left: same level (sibling), before component
- right: same level (sibling), after component
- body: inside container (child), last

+ container row: left, right, body
+ container column: top, bottom, body
+ non-container component: top & bottom / left & right (depending on parent type)

*/

type propsT = {
  componentId: string,
  componentType?: string,
  style?: CSSProperties,
  children?: ReactNode,
}

const dropStyles = {
  siblingColor: 'green',
  siblingOpacity: '1',
  siblingWidth: '6px',
  siblingMinWidth: '6px',
  siblingBorderRadius: '6px',
  childColor: 'green',
  childOpacity: '0.3',
  childBorderRadius: '5px',
}

const stylesContainer = {
  width: '100%',
  height: '100%',
  position: 'relative'
}

const stylesTop = (isOver: true | false) => ({
  position: 'absolute',
  width: '100%',
  borderRadius: dropStyles.siblingBorderRadius,
  height: `min(${dropStyles.siblingWidth}, ${dropStyles.siblingMinWidth})`,
  top: `calc(-1 * min(${dropStyles.siblingWidth}, ${dropStyles.siblingMinWidth}) / 2)`,
  backgroundColor: isOver ? dropStyles.siblingColor : undefined,
  opacity: isOver ? dropStyles.siblingOpacity : undefined,
})

const stylesBottom = (isOver: true | false) => ({
  position: 'absolute',
  width: '100%',
  borderRadius: dropStyles.siblingBorderRadius,
  height: `min(${dropStyles.siblingWidth}, ${dropStyles.siblingMinWidth})`,
  top: `calc(100% + calc(-1 * min(${dropStyles.siblingWidth}, ${dropStyles.siblingMinWidth}) / 2))`,
  backgroundColor: isOver ? dropStyles.siblingColor : undefined,
  opacity: isOver ? dropStyles.siblingOpacity : undefined,
})

const stylesBody = (isOver: true | false) => ({
  position: 'absolute',
  width: '100%',
  borderRadius: dropStyles.childBorderRadius,
  height: `calc(100% - min(${dropStyles.siblingWidth}, ${dropStyles.siblingMinWidth}) - min(${dropStyles.siblingWidth}, ${dropStyles.siblingMinWidth}))`,
  top: `min(${dropStyles.siblingWidth}, ${dropStyles.siblingMinWidth})`,
  backgroundColor: isOver ? dropStyles.childColor : undefined,
  opacity: isOver ? dropStyles.childOpacity : undefined
})

const stylesTopNoContainer = (isOver: true | false) => ({
  position: 'absolute',
  width: '100%',
  // borderRadius: dropStyles.siblingBorderRadius,
  height: '50%',
  top: 0,
  boxShadow:  isOver ? `0 calc(-1 * min(${dropStyles.siblingWidth}, ${dropStyles.siblingMinWidth}) + 1px) 0 0 ${dropStyles.siblingColor}, 0 0px 0 0 ${dropStyles.siblingColor}` : undefined, /* 4px border centered on the natural 1px border */
  // borderTopWidth: `min(${dropStyles.siblingWidth}, ${dropStyles.siblingMinWidth})`,
  // backgroundColor: isOver ? dropStyles.siblingColor : undefined,
  // opacity: isOver ? dropStyles.siblingOpacity : undefined,
})

const stylesBottomNoContainer = (isOver: true | false) => ({
  position: 'absolute',
  width: '100%',
  // borderRadius: dropStyles.siblingBorderRadius,
  height: '50%',
  top: '50%',
  boxShadow:  isOver ? `0 calc(min(${dropStyles.siblingWidth}, ${dropStyles.siblingMinWidth}) - 1px) 0 0 ${dropStyles.siblingColor}, 0 0px 0 0 ${dropStyles.siblingColor}` : undefined, /* 4px border centered on the natural 1px border */
  // borderTopWidth: `min(${dropStyles.siblingWidth}, ${dropStyles.siblingMinWidth})`,
  // backgroundColor: isOver ? dropStyles.siblingColor : undefined,
  // opacity: isOver ? dropStyles.siblingOpacity : undefined,
})

// used in components (no containers, to show border)
// @TODO: equivalent for no-container within row container?
const stylesOnlyOutline = (isOver: true | false) => ({
  position: 'absolute',
  width: '100%',
  // borderRadius: dropStyles.childBorderRadius,
  // height used for drop (hover) zone
  height: `calc(100% - min(${dropStyles.siblingWidth}, ${dropStyles.siblingMinWidth}) - min(${dropStyles.siblingWidth}, ${dropStyles.siblingMinWidth}))`,
  top: `min(${dropStyles.siblingWidth}, ${dropStyles.siblingMinWidth})`,
  // border: '3px solid red',
  // boxShadow: '-2px -2px 0 orange, 2px 2px 0 orange',
  backgroundColor: isOver ? 'red' : undefined,
  opacity: isOver ? '0.2' : undefined,
  // outline: isOver ? 'dashed red 1px' : undefined,
  // outlineOffset: isOver ? `calc(min(${dropStyles.siblingWidth}, ${dropStyles.siblingMinWidth}) - 2px)` : undefined,
})

function Droppable({ componentId, componentType, style, children }: propsT) {

  const {draggingId} = useDesignerStore();

  const { isOver, setNodeRef } = useDroppable({
    id: `${componentId}_body`,
    data: {
      componentId: componentId,
      componentType: componentType,
      side: 'body'
    }
  });

  const { isOver: isOverT, setNodeRef: setNodeRefT } = useDroppable({
    id: `${componentId}_top`,
    data: {
      componentId: componentId,
      componentType: componentType,
      side: 'top'
    }
  });

  const { isOver: isOverB, setNodeRef: setNodeRefB } = useDroppable({
    id: `${componentId}_bottom`,
    data: {
      componentId: componentId,
      componentType: componentType,
      side: 'bottom'
    }
  });

  const { isOver: isOverL, setNodeRef: setNodeRefL } = useDroppable({
    id: `${componentId}_left`,
    data: {
      componentId: componentId,
      componentType: componentType,
      side: 'left'
    }
  });

  const { isOver: isOverR, setNodeRef: setNodeRefR } = useDroppable({
    id: `${componentId}_right`,
    data: {
      componentId: componentId,
      componentType: componentType,
      side: 'right'
    }
  });

  // useEffect(() => {
  //   console.log('CHANGED ' + componentId)
  //   console.log(node?.current.clientWidth)
  //   console.log(rect)
  //   console.log(active)
  //   console.log('#### end ####')
  // }, [isOver])

  return (
    <div id={componentId} ref={setNodeRef} style={{ ...style, ...stylesContainer }}>
      {children}
      {/* droppable areas */}
      {/* top border */}
      {/* @TODO: if parent is row / column, use top / left; same for bottom and right below */}
      {draggingId && draggingId !== componentId && componentId !== 'canvas' && componentType === 'container-column' && <div ref={setNodeRefT} style={stylesTop(isOverT)}></div>}
      {/* bottom border */}
      {draggingId && draggingId !== componentId && componentId !== 'canvas' && componentType === 'container-column' && <div ref={setNodeRefB} style={stylesBottom(isOverB)}></div>}
      {/* body drop */}
      {draggingId && draggingId !== componentId && componentType === 'container-column' && <div ref={setNodeRef} style={stylesBody(isOver)}></div>}
      {/* no container component */}
      {draggingId && draggingId !== componentId && componentId !== 'canvas' && componentType !== 'container-column' && <div ref={setNodeRefT} style={stylesTopNoContainer(isOverT)}></div>}
      {draggingId && draggingId !== componentId && componentId !== 'canvas' && componentType !== 'container-column' && <div ref={setNodeRefB} style={stylesBottomNoContainer(isOverB)}></div>}
    </div>
  );
}

export default Droppable;