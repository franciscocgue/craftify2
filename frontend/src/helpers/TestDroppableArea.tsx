import { position } from '@chakra-ui/react';
import { useDroppable } from '@dnd-kit/core';
import { CSSProperties, ReactNode, useEffect } from 'react';

// needs a parent with size
// Droppable will fit all space (100%)

type propsT = {
    id: string,
    style?: CSSProperties,
    children?: ReactNode,
}

function TestDroppableArea({ id, style, children }: propsT) {
    const { isOver: isOverTop, setNodeRef: setNodeRefTop, node: nodeTop, rect: rectTop, active: activeTop } = useDroppable({
        id: `${id}_top`,
    });
    const { isOver: isOverBottom, setNodeRef: setNodeRefBottom, node: nodeBottom, rect: rectBottom, active: activeBottom } = useDroppable({
        id: `${id}_bottom`,
    });
    const styles = {
        ...style,
        // outline: isOver ? '2px solid red' : undefined,
        width: '100%',
        height: '100%',
        position: 'relative'
    };

    const styleTop = {
        position: 'absolute',
        width: '100%',
        height: '50%',
        top: 0,
        borderTop: isOverTop ? '2px solid red' : undefined,
        marginTop: isOverTop ? '-2px' : undefined,
    }

    const styleBottom = {
        position: 'absolute',
        width: '100%',
        height: '50%',
        top: '50%',
        borderBottom: isOverBottom ? '2px solid red' : undefined,
        marginBottom: isOverBottom ? '-2px' : undefined,
    }

    return (
        <div id={id} style={styles}>
            {/* top half */}
            <div style={styleTop} ref={setNodeRefTop}></div>
            {/* bottom half */}
            <div style={styleBottom} ref={setNodeRefBottom}></div>
            {/* actual content */}
            {children}
        </div>
    );
}

export default TestDroppableArea;