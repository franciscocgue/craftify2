import { useDroppable } from "@dnd-kit/core";
import { CSSProperties } from "react";
import { DESIGN_PARAMETERS } from "../../config/application";

const styleTop: CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '50%',
    top: 0,
    left: 0,
};

const styleTopHighlight: (isOverTop: boolean) => CSSProperties = (isOverTop) => ({
    backgroundColor: isOverTop ? DESIGN_PARAMETERS.BORDER_COLOR_SELECTED_COMPONENT : undefined,
    position: 'absolute',
    width: '100%',
    height: '4px',
    top: '-0px',
    right: 0,
    zIndex: 1,
});

const styleBottom: CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '50%',
    top: '50%',
    left: 0,
};

const styleBottomHighlight: (isOverBottom: boolean) => CSSProperties = (isOverBottom) => ({
    backgroundColor: isOverBottom ? DESIGN_PARAMETERS.BORDER_COLOR_SELECTED_COMPONENT : undefined,
    position: 'absolute',
    width: '100%',
    height: '4px',
    bottom: '-0px',
    right: 0,
    zIndex: 1,
});
const styleLeft: CSSProperties = {
    position: 'absolute',
    width: '50%',
    height: '100%',
    top: 0,
    left: 0,
};

const styleLeftHighlight: (isOverLeft: boolean) => CSSProperties = (isOverLeft) => ({
    backgroundColor: isOverLeft ? DESIGN_PARAMETERS.BORDER_COLOR_SELECTED_COMPONENT : undefined,
    position: 'absolute',
    width: '4px',
    height: '100%',
    left: '-0px',
    top: 0,
    zIndex: 1,
});

const styleRight: CSSProperties = {
    position: 'absolute',
    width: '50%',
    height: '100%',
    top: 0,
    right: 0,
};

const styleRightHighlight: (isOverRight: boolean) => CSSProperties = (isOverRight) => ({
    backgroundColor: isOverRight ? DESIGN_PARAMETERS.BORDER_COLOR_SELECTED_COMPONENT : undefined,
    position: 'absolute',
    width: '4px',
    height: '100%',
    right: '-0px',
    top: 0,
    zIndex: 1,
});

type DroppableComponentProps = {
    componentId: string,
    parentType: 'column' | 'row' | 'canvas',
}

/**
 * Droppable effects when dropping over a component in the canvas
 */
function DroppableComponent(props: DroppableComponentProps) {

    console.log('C - DroppableComponent ' + props.componentId.slice(0,5))
    // console.log('props.parentType' + props.parentType)

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
            {/* top */}
            {(props.parentType === 'column' || props.parentType === 'canvas') && <div ref={setNodeRefTop} style={styleTop} />}
            {(props.parentType === 'column' || props.parentType === 'canvas') && <div style={styleTopHighlight(isOverTop)} />}
            {/* bottom */}
            {(props.parentType === 'column' || props.parentType === 'canvas') && <div ref={setNodeRefBottom} style={styleBottom} />}
            {(props.parentType === 'column' || props.parentType === 'canvas') && <div style={styleBottomHighlight(isOverBottom)} />}
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