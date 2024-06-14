import { Box, Tooltip } from '@chakra-ui/react';
import { useDroppable } from '@dnd-kit/core';
import { ReactNode, useEffect, useState } from 'react';
import useDesignerStore from '../stores/designer';

type otherPropertiesT = {
    p?: string | number,
}

type propsT = {
    id: string,
    componentType: string,
    children: ReactNode,
    otherProperties?: otherPropertiesT,
}

const stylesBody = {
    position: 'absolute' as 'absolute', // as 'absolute' "fixes" ts issue
    width: 'calc(100% - 6px - 6px)',
    height: 'calc(100% - 6px - 6px)',
    top: '6px',
    left: '6px',
}

/* 
    Wrapper for canvas.
*/
const CanvasWrapper = ({ id, componentType, children, ...otherProperties }: propsT) => {

    // const { draggingId, isResizing, setHoveredId } = useDesignerStore();
    const draggingId = useDesignerStore((state) => state.draggingId);
    const isResizing = useDesignerStore((state) => state.isResizing);
    const setHoveredId = useDesignerStore((state) => state.setHoveredId);

    const [isHovered, setIsHovered] = useState(false);

    // inside: body
    const { isOver: isOver3, setNodeRef: setNodeRef3 } = useDroppable({
        id: `droppable_inside_${id}`,
        data: {
            componentId: id,
            componentType: componentType,
            location: 'inside'
        }
    });

    // avoid parent tooltip after resizing
    useEffect(() => {
        if (!isResizing) {
            setIsHovered(false)
        }
    }, [isResizing])

    return (
        <Box
            style={{
                position: 'relative',
                outline: !isResizing && draggingId && draggingId !== `draggable_${id}` && isOver3 ? '2px solid red'
                    : (isHovered || isResizing || !!draggingId) ? '1px solid darkgrey' : '1px solid darkgrey',
            }}
            w={'100%'}
            h={'100%'}
            maxW={'100%'}
            maxH={'100%'}
        >
            {/* <Tooltip placement='top-start' gutter={0} label={'canvas'} isOpen={isHovered && !!!draggingId && !isResizing}> */}
            <Box
                onMouseOver={(e) => {
                    e.stopPropagation();
                    setHoveredId(null);
                    setIsHovered(true);
                }}
                onMouseLeave={(e) => {
                    e.stopPropagation();
                    setHoveredId(null);
                    setIsHovered(false);
                }}
                onMouseOut={(e) => {
                    e.stopPropagation();
                    setHoveredId(null);
                    setIsHovered(false);
                }}
                cursor={'default'}
                style={{ position: 'relative', overflow: 'auto' }}
                w={'100%'}
                h={'100%'}
                p={otherProperties.p || undefined}
                {...otherProperties}
            >
                {children}
            </Box>
            {/* </Tooltip> */}
            {/* for dropping */}
            <div
                ref={setNodeRef3}
                style={{ ...stylesBody, display: !isResizing && draggingId && draggingId !== `draggable_${id}` ? 'block' : 'none' }}>
            </div>
        </Box>
    );
};

export default CanvasWrapper;