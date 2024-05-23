import { Box, Flex, Icon, Tooltip } from '@chakra-ui/react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSSProperties, ReactNode, useEffect, useState } from 'react';
import useDesignerStore from '../stores/designer';
import { NumberSize, Resizable } from 're-resizable';
import { compTypes } from '../config/components';

type propsT = {
    id: string,
    componentType: string,
    parentType: string, // container
    name: string,
    children: ReactNode,
    w?: string | number,
    h?: string | number,
    p?: string | number,
    m?: string | number,
    border?: string
}

const dropStyles = {
    siblingColor: 'red',
    siblingOpacity: '1',
    siblingWidth: '6px',
    siblingMinWidth: '6px',
    siblingBorderRadius: '6px',
}

const stylesTop = (isOver: true | false) => ({
    position: 'absolute' as 'absolute', // as 'absolute' "fixes" ts issue
    width: '100%',
    height: '6px',
    top: 0,
    left: 0,
    boxShadow: isOver ? `0 calc(-1 * min(${dropStyles.siblingWidth}, ${dropStyles.siblingMinWidth}) + 1px) 0 0 ${dropStyles.siblingColor}, 0 0px 0 0 ${dropStyles.siblingColor}` : undefined,

})

const stylesLeft = (isOver: true | false) => ({
    position: 'absolute' as 'absolute', // as 'absolute' "fixes" ts issue
    width: '6px',
    height: '100%',
    top: 0,
    left: 0,
    boxShadow: isOver ? `calc(-1 * min(${dropStyles.siblingWidth}, ${dropStyles.siblingMinWidth}) + 1px) 0 0 0 ${dropStyles.siblingColor}, 0 0 0 0 ${dropStyles.siblingColor}` : undefined,
})

const stylesBottom = (isOver: true | false) => ({
    position: 'absolute' as 'absolute', // as 'absolute' "fixes" ts issue
    width: '100%',
    height: '6px',
    top: 'calc(100% - 6px)',
    left: 0,
    boxShadow: isOver ? `0 calc(min(${dropStyles.siblingWidth}, ${dropStyles.siblingMinWidth}) - 1px) 0 0 ${dropStyles.siblingColor}, 0 0px 0 0 ${dropStyles.siblingColor}` : undefined,
})

const stylesRight = (isOver: true | false) => ({
    position: 'absolute' as 'absolute', // as 'absolute' "fixes" ts issue
    width: '6px',
    height: '100%',
    top: '0',
    left: 'calc(100% - 6px)',
    boxShadow: isOver ? `calc(min(${dropStyles.siblingWidth}, ${dropStyles.siblingMinWidth}) - 1px) 0 0 0 ${dropStyles.siblingColor}, 0 0 0 0 ${dropStyles.siblingColor}` : undefined,
})

const stylesBody = {
    position: 'absolute' as 'absolute', // as 'absolute' "fixes" ts issue
    width: 'calc(100% - 6px - 6px)',
    height: 'calc(100% - 6px - 6px)',
    top: '6px',
    left: '6px',
}

/* 
    Wrapper for no-container components.
    
    It defined with wrapping box (size, border, ...)
    so that children only care about content.
*/
const ContainerWrapper = ({ id, componentType, parentType, name, children, w, h, p, m, border }: propsT) => {
    const { attributes, listeners, setNodeRef } = useDraggable({ // transform
        id: `draggable_${id}`,
        disabled: id === 'canvas',
        data: {
            componentId: id,
            componentType: componentType,
        }
    });

    const { draggingId, isResizing, setIsResizing } = useDesignerStore();
    const [isHovered, setIsHovered] = useState(false);
    const [size, setSize] = useState({ w: w || 'auto', h: h || 'auto' });

    // before: top / left, depending on parent container
    const { isOver: isOver1, setNodeRef: setNodeRef1 } = useDroppable({
        id: `droppable_before_${id}`,
        data: {
            componentId: id,
            componentType: componentType,
            location: 'before'
        }
    });
    // after: bottom / right, depending on parent container
    const { isOver: isOver2, setNodeRef: setNodeRef2 } = useDroppable({
        id: `droppable_after_${id}`,
        data: {
            componentId: id,
            componentType: componentType,
            location: 'after'
        }
    });
    // inside: bodz
    const { isOver: isOver3, setNodeRef: setNodeRef3 } = useDroppable({
        id: `droppable_inside_${id}`,
        data: {
            componentId: id,
            componentType: componentType,
            location: 'inside'
        }
    });

    const tooltipComp = <Flex gap={'5px'}>
        <Icon as={compTypes[componentType as keyof typeof compTypes].icon} w={5} h={5} color="white.800" />
        {name || componentType}
    </Flex>

    let styleBefore: CSSProperties;
    let styleAfter: CSSProperties;

    switch (parentType) {
        case 'canvas':
            styleBefore = stylesTop(isOver1);
            styleAfter = stylesBottom(isOver2);
            break;
        case 'container-column':
            styleBefore = stylesTop(isOver1);
            styleAfter = stylesBottom(isOver2);
            break;
        case 'container-row':
            styleBefore = stylesLeft(isOver1);
            styleAfter = stylesRight(isOver2);
            break;
        default:
            styleBefore = {};
            styleAfter = {};
            break;
    }

    const customResizeHandler = <div
        style={{ height: '100%', width: '100%' }}
        onMouseOver={(e) => {
            e.stopPropagation();
            setIsHovered(true)
        }}
        onMouseOut={(e) => {
            e.stopPropagation();
            setIsHovered(false)
        }}>
    </div>

    // avoid parent tooltip after resizing
    useEffect(() => {
        if (!isResizing) {
            setIsHovered(false)
        }
    }, [isResizing])


    return (
        // container box
        <Resizable
            style={{
                outline: !isResizing && draggingId && draggingId !== `draggable_${id}` && isOver3 ? '2px solid red'
                    : (isHovered || isResizing || !!draggingId) ? '1px solid darkgrey' : undefined,
            }}
            size={{ width: size.w, height: size.h }}
            onResizeStop={(_, __, ___, d: NumberSize) => {
                setSize({ w: size.w as number + d.width, h: size.h as number + d.height })
                setIsResizing(false)
            }}
            onResizeStart={() => {
                setIsResizing(true)
            }}
            handleComponent={{
                right: customResizeHandler,
                left: customResizeHandler,
                bottom: customResizeHandler,
                top: customResizeHandler,
                bottomRight: customResizeHandler,
                bottomLeft: customResizeHandler,
            }}

            // style={{overflow:'hidden'}}
            maxWidth={parentType === 'container-column' || parentType === 'canvas' ? '100%' : undefined}
            maxHeight={parentType === 'container-row' ? '100%' : undefined}
            enable={id === 'canvas' ? false : { top: true, right: true, bottom: true, left: true, topRight: false, bottomRight: true, bottomLeft: true, topLeft: false }}
            handleStyles={{
                // move handlers inside container
                right: { right: '0px', width: '5px' },
                left: { left: '0px', width: '5px' },
                bottom: { bottom: '0px', height: '5px' },
                top: { top: '0px', height: '5px' },
                bottomRight: { right: '0px', bottom: '0px', width: '5px', height: '5px' },
                bottomLeft: { left: '0px', bottom: '0px', width: '5px', height: '5px' },
            }}
        >
            {/* for dragging */}
            <Tooltip placement='top-start' gutter={0} label={tooltipComp} isOpen={isHovered && !!!draggingId && !isResizing}>
                <Box
                    ref={setNodeRef}
                    {...listeners}
                    {...attributes}
                    onMouseOver={(e) => {
                        e.stopPropagation();
                        setIsHovered(true)
                    }}
                    onMouseOut={(e) => {
                        e.stopPropagation();
                        setIsHovered(false)
                    }}
                    cursor={id === 'canvas' ? 'default' : 'grab'}
                    style={{ position: 'relative', overflow: 'auto' }}
                    w={'100%'}
                    h={'100%'}
                    p={p || undefined}
                    m={m || undefined}
                    border={border || undefined}
                >
                    {children}
                </Box>
            </Tooltip>
            {/* for dropping */}
            <div
                ref={setNodeRef1}
                style={{ ...styleBefore, display: !isResizing && draggingId && draggingId !== `draggable_${id}` && id !== 'canvas' ? 'block' : 'none' }}>
            </div>
            <div
                ref={setNodeRef2}
                style={{ ...styleAfter, display: !isResizing && draggingId && draggingId !== `draggable_${id}` && id !== 'canvas' ? 'block' : 'none' }}>
            </div>
            <div
                ref={setNodeRef3}
                style={{ ...stylesBody, display: !isResizing && draggingId && draggingId !== `draggable_${id}` ? 'block' : 'none' }}>
            </div>
            {draggingId === `draggable_${id}` && !isResizing && <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'grey',
            }}>
            </div>}
        </Resizable>
    );
};

export default ContainerWrapper;