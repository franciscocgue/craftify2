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
    outline: isOverInner ? '4px solid green' : undefined,
    zIndex: 1,
});

const styleTop: CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '4px',
    top: 0,
    left: 0,
};

const styleTopHighlight: (isOverTop: boolean) => CSSProperties = (isOverTop) => ({
    backgroundColor: isOverTop ? 'green' : undefined,
    position: 'absolute',
    width: '100%',
    height: '6px',
    top: '-2px',
    right: 0,
    zIndex: 1,
});

const styleBottom: CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '4px',
    top: 'calc(100% - 4px)',
    left: 0,
};

const styleBottomHighlight: (isOverBottom: boolean) => CSSProperties = (isOverBottom) => ({
    backgroundColor: isOverBottom ? 'green' : undefined,
    position: 'absolute',
    width: '100%',
    height: '6px',
    bottom: '-2px',
    right: 0,
    zIndex: 1,
});
const styleLeft: CSSProperties = {
    position: 'absolute',
    width: '4px',
    height: '100%',
    top: 0,
    left: 0,
};

const styleLeftHighlight: (isOverLeft: boolean) => CSSProperties = (isOverLeft) => ({
    backgroundColor: isOverLeft ? 'green' : undefined,
    position: 'absolute',
    width: '6px',
    height: '100%',
    left: '-2px',
    top: 0,
    zIndex: 1,
});

const styleRight: CSSProperties = {
    position: 'absolute',
    width: '4px',
    height: '100%',
    top: 0,
    right: 0,
};

const styleRightHighlight: (isOverRight: boolean) => CSSProperties = (isOverRight) => ({
    backgroundColor: isOverRight ? 'green' : undefined,
    position: 'absolute',
    width: '6px',
    height: '100%',
    right: '-2px',
    top: 0,
    zIndex: 1,
});

type DroppableContainerProps = {
    componentId: string,
    parentType: 'column' | 'row',
}

function DroppableContainer(props: DroppableContainerProps) {

    console.log('C - DroppableComponent ' + props.componentId.slice(0, 5))

    const { isOver: isOverInner, setNodeRef: setNodeRefInner } = useDroppable({
        id: `droppable_inside_${props.componentId}`,
        data: {
            componentId: props.componentId,
            location: 'inside'
        }
    });
    const { isOver: isOverTop, setNodeRef: setNodeRefTop } = useDroppable({
        id: `droppable_top_${props.componentId}`,
        disabled: props.parentType !== 'column' && props.parentType !== 'canvas',
        data: {
            componentId: props.componentId,
            location: 'before'
        }
    });
    const { isOver: isOverBottom, setNodeRef: setNodeRefBottom } = useDroppable({
        id: `droppable_bottom_${props.componentId}`,
        disabled: props.parentType !== 'column' && props.parentType !== 'canvas',
        data: {
            componentId: props.componentId,
            location: 'after'
        }
    });
    const { isOver: isOverLeft, setNodeRef: setNodeRefLeft } = useDroppable({
        id: `droppable_left_${props.componentId}`,
        disabled: props.parentType !== 'row',
        data: {
            componentId: props.componentId,
            location: 'before'
        }
    });
    const { isOver: isOverRight, setNodeRef: setNodeRefRight } = useDroppable({
        id: `droppable_right_${props.componentId}`,
        disabled: props.parentType !== 'row',
        data: {
            componentId: props.componentId,
            location: 'after'
        }
    });

    return (
        <>
            {/* inside */}
            {<div ref={setNodeRefInner} style={styleInner} />}
            {<div style={styleInnerHighlight(isOverInner)} />}
            {/* top */}
            {props.parentType === 'column' || props.parentType === 'canvas' && <div ref={setNodeRefTop} style={styleTop} />}
            {props.parentType === 'column' || props.parentType === 'canvas' && <div style={styleTopHighlight(isOverTop)} />}
            {/* bottom */}
            {props.parentType === 'column' || props.parentType === 'canvas' && <div ref={setNodeRefBottom} style={styleBottom} />}
            {props.parentType === 'column' || props.parentType === 'canvas' && <div style={styleBottomHighlight(isOverBottom)} />}
            {/* left */}
            {props.parentType === 'row' && <div ref={setNodeRefLeft} style={styleLeft} />}
            {props.parentType === 'row' && <div style={styleLeftHighlight(isOverLeft)} />}
            {/* right */}
            {props.parentType === 'row' && <div ref={setNodeRefRight} style={styleRight} />}
            {props.parentType === 'row' && <div style={styleRightHighlight(isOverRight)} />}
        </>
    );
}


export default DroppableContainer;