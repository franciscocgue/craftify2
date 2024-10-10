import { useDraggable } from "@dnd-kit/core";
import { useEffect } from "react";
// import { ReactNode } from "react";
import { RiDragMove2Fill } from "react-icons/ri";
import useDesignerStore from "../../stores/designer";

type DraggableHandleProps = {
    componentId: string,
    top?: string | number,
    // componentType: string,
}

const length = 18; // px of handler

/**
 * Hanlde to drag components in the canvas. Normally used inside the component's tooltip
 */
function DraggableHandle(props: DraggableHandleProps) {

    console.log('C - DraggableHandle ' + props.componentId.slice(0, 5))

    // const { colorMode } = useColorMode();
    const colorMode = useDesignerStore((state) => state.colorMode);

    const { attributes, listeners, setNodeRef } = useDraggable({
        id: `draggable_${props.componentId}`,
        disabled: props.componentId === 'canvas',
        data: {
            componentId: props.componentId,
            type: 'canvas-draggable'
            // componentType: props.componentType,
        }
    });

    useEffect(() => {
        return () => {
            console.log('Unmounted.');
        }
    })

    return (
        <div ref={setNodeRef}
            style={{
                // position: 'absolute',
                // top: props.top || 2,
                // right: 25,
                // zIndex: 2,
                // width: `${length}px`,
                // height: `${length}px`,
                width: 'auto',
                cursor: 'grab',
                // backgroundColor: 'red',
                // overflow: 'hidden'
            }}
            {...listeners} {...attributes}>
            {/* <div style={{
                display: 'flex',
                // padding: '2px',
                // alignContent: 'center',
                backgroundColor: '#555',
                borderRadius: '100%',
            }}> */}
                <RiDragMove2Fill size={length} color={colorMode === 'dark' ? 'black' : 'white'} title="Move" />
            {/* </div> */}
        </div>
    );
}

export default DraggableHandle;