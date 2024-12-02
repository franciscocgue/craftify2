import { useDroppable } from "@dnd-kit/core";
import { CSSProperties } from "react";
import { DESIGN_PARAMETERS } from "../../config/application";

const styleInner: CSSProperties = {
    position: 'absolute',
    width: 'calc(100% - 8px)',
    height: 'calc(100% - 8px)',
    top: '4px',
    left: '4px',
};

const styleInnerHighlight: (isOverInner: boolean) => CSSProperties = (isOverInner) => ({
    // backgroundColor: isOverInner ? 'green' : undefined,
    position: 'absolute',
    width: 'calc(100% - 8px)',
    height: 'calc(100% - 8px)',
    top: '4px',
    left: '4px',
    outline: isOverInner ? `4px solid ${DESIGN_PARAMETERS.BORDER_COLOR_SELECTED_COMPONENT}` : undefined,
});


type DroppableCanvasProps = {
    componentId: string,
    // canvasRef: React.MutableRefObject<null>
}

function DroppableCanvas(props: DroppableCanvasProps) {

    console.log('C - DroppableCanvas')

    const { isOver: isOverInner, setNodeRef: setNodeRefInner } = useDroppable({
        id: `droppable_inside_${props.componentId}`,
        data: {
            componentId: props.componentId,
            location: 'inside'
        }
    });

    const canvasElem = document.getElementById('my-canvas-wrapper');

    return (
        <>
            {/* inside */}
            {<div ref={setNodeRefInner} style={{
                ...styleInner,
                position: 'fixed',
                top: canvasElem?.getBoundingClientRect().top,
                left: canvasElem?.getBoundingClientRect().left,
                width: canvasElem?.getBoundingClientRect().width,
                height: canvasElem?.getBoundingClientRect().height,
                pointerEvents: 'none',
            }} />}
            {<div style={{
                ...styleInnerHighlight(isOverInner),
                position: 'fixed',
                top: canvasElem?.getBoundingClientRect().top,
                left: canvasElem?.getBoundingClientRect().left,
                width: canvasElem?.getBoundingClientRect().width,
                height: canvasElem?.getBoundingClientRect().height,
                pointerEvents: 'none',
            }} />}
        </>
    );
}


export default DroppableCanvas;