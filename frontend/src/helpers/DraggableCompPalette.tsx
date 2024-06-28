import { useDraggable } from '@dnd-kit/core';
import { ReactNode } from 'react';

type propsT = {
    id: string,
    children: ReactNode,
    componentType: string,
}

function DraggableCompPalette({ id, componentType, children }: propsT) {
    const { attributes, listeners, setNodeRef } = useDraggable({ // transform
        id: `draggable_${id}`,
        data: {
            componentId: id,
            componentType: componentType,
            type: 'palette-draggable'
        }
    });
    // const style = transform ? {
    //     transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    // } : undefined;

    return (
        <div
            ref={setNodeRef}
            // style={style}
            {...listeners}
            {...attributes}
        >
            {children}
        </div>
    );
}

export default DraggableCompPalette;