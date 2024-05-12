import { background, position } from '@chakra-ui/react';
import { useDraggable } from '@dnd-kit/core';
import { ReactNode } from 'react';

type propsT = {
    id: string,
    children: ReactNode,
}

function DraggableCanvas({ id, children }: propsT) {
    const { attributes, listeners, setNodeRef } = useDraggable({ // transform
        id: id,
    });
    // const style = transform ? {
    //     transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    //     // position:'absolute',
    //     width: '100%',
    //     height: '100%',
    //     backgroundColor: 'red'
    // } : undefined;
 
    const style =  {
        // position:'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'red'
    };


    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
        >
            {children}
        </div>
    );
}

export default DraggableCanvas;