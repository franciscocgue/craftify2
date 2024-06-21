import { useDroppable } from "@dnd-kit/core";
import { CSSProperties } from "react";

const styleTop: CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '50%',
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
});

const styleBottom: CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '50%',
    top: '50%',
    left: 0,
};

const styleBottomHighlight: (isOverBottom: boolean) => CSSProperties = (isOverBottom) => ({
    backgroundColor: isOverBottom ? 'green' : undefined,
    position: 'absolute',
    width: '100%',
    height: '6px',
    bottom: '-2px',
    right: 0,
});
const styleLeft: CSSProperties = {
    position: 'absolute',
    width: '50%',
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
});

const styleRight: CSSProperties = {
    position: 'absolute',
    width: '50%',
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
});

type DroppableComponentProps = {
    componentId: string,
    parentType: 'column' | 'row',
}

function DroppableComponent(props: DroppableComponentProps) {

    console.log('C - DroppableComponent' + props.componentId)

    const { isOver: isOverTop, setNodeRef: setNodeRefTop } = useDroppable({
        id: `droppable_top_${props.componentId}`,
        disabled: props.parentType !== 'column'
    });
    const { isOver: isOverBottom, setNodeRef: setNodeRefBottom } = useDroppable({
        id: `droppable_bottom_${props.componentId}`,
        disabled: props.parentType !== 'column'
    });
    const { isOver: isOverLeft, setNodeRef: setNodeRefLeft } = useDroppable({
        id: `droppable_left_${props.componentId}`,
        disabled: props.parentType !== 'row'
    });
    const { isOver: isOverRight, setNodeRef: setNodeRefRight } = useDroppable({
        id: `droppable_right_${props.componentId}`,
        disabled: props.parentType !== 'row'
    });

    return (
        <>
            {/* top */}
            {props.parentType === 'column' && <div ref={setNodeRefTop} style={styleTop} />}
            {props.parentType === 'column' && <div style={styleTopHighlight(isOverTop)} />}
            {/* bottom */}
            {props.parentType === 'column' && <div ref={setNodeRefBottom} style={styleBottom} />}
            {props.parentType === 'column' && <div style={styleBottomHighlight(isOverBottom)} />}
            {/* left */}
            {props.parentType === 'row' && <div ref={setNodeRefLeft} style={styleLeft} />}
            {props.parentType === 'row' && <div style={styleLeftHighlight(isOverLeft)} />}
            {/* right */}
            {props.parentType === 'row' && <div ref={setNodeRefRight} style={styleRight} />}
            {props.parentType === 'row' && <div style={styleRightHighlight(isOverRight)} />}
        </>
    );
}


export default DroppableComponent;