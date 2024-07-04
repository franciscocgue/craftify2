import { useDraggable } from "@dnd-kit/core";
import { useEffect } from "react";
// import { ReactNode } from "react";
import { MdDragIndicator } from "react-icons/md";
import useDesignerStore from "../stores/designer";

type DraggableHandleProps = {
    componentId: string,
    top?: string | number,
    // componentType: string,
}

const length = 18; // px of handler

function DraggableHandle(props: DraggableHandleProps) {

    console.log('C - DraggableHanle ' + props.componentId.slice(0, 5))

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
                position: 'absolute',
                top: props.top || 2,
                right: 54,
                zIndex: 2,
                width: `${length}px`,
                height: `${length}px`,
                cursor: 'grab'
            }}
            {...listeners} {...attributes}>
            <span style={{ display: 'inline-block', backgroundColor: colorMode === 'dark' ? 'lightgray' : '#676767', borderRadius: '4px', opacity: '0.75' }}>
                <MdDragIndicator size={length} color={colorMode === 'dark' ? 'black' : 'white'} />
            </span>
        </div>
    );
}

export default DraggableHandle;