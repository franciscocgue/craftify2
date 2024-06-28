import { useDroppable } from "@dnd-kit/core";
import { CSSProperties } from "react";

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
    outline: isOverInner ? '4px solid green' : undefined
});


type DroppableCanvasProps = {
    componentId: string,
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

    return (
        <>
            {/* inside */}
            {<div ref={setNodeRefInner} style={styleInner} />}
            {<div style={styleInnerHighlight(isOverInner)} />}
        </>
    );
}


export default DroppableCanvas;