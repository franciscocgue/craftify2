import { useDraggable } from '@dnd-kit/core';
import { ReactNode } from 'react';

type propsT = {
    id: string,
    children: ReactNode,
}

function Draggable({ id, children }: propsT) {
    const { attributes, listeners, setNodeRef } = useDraggable({ // transform
        id: id,
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

export default Draggable;