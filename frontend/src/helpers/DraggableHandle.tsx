import { useColorMode } from "@chakra-ui/react";
import { useDraggable } from "@dnd-kit/core";
// import { ReactNode } from "react";
import { MdDragIndicator } from "react-icons/md";

type DraggableHandleProps = {
    componentId: string,
    // componentType: string,
}

const length = 18; // px of handler

function DraggableHandle(props: DraggableHandleProps) {

    console.log('C - DraggableHanle')

    const { colorMode } = useColorMode();

    const { attributes, listeners, setNodeRef } = useDraggable({
        id: `draggable_${props.componentId}`,
        disabled: props.componentId === 'canvas',
        data: {
            componentId: props.componentId,
            // componentType: props.componentType,
        }
    });

    return (
        <div ref={setNodeRef}
            style={{
                position: 'absolute',
                top: 2,
                right: 4,
                zIndex: 2,
                width: `${length}px`,
                height: `${length}px`,
                cursor: 'grab'
            }}
            {...listeners} {...attributes}>
            <span style={{display: 'inline-block', backgroundColor: colorMode === 'dark' ? 'lightgray' : '#676767', borderRadius: '4px', opacity: '0.75'}}>
                <MdDragIndicator size={length} color={colorMode === 'dark' ? 'black' : 'white'}/>
            </span>
        </div>
    );
}

export default DraggableHandle;