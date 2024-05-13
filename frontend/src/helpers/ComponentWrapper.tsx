import { Box, Icon, Text } from '@chakra-ui/react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSSProperties, ReactNode, useState } from 'react';
import { MdDragIndicator } from "react-icons/md";
import useDesignerStore from '../stores/designer';
import { Resizable } from 're-resizable';

type propsT = {
    id: string,
    componentType: string,
    parentType: string, // container
    children: ReactNode,
    w: string | number,
    h: string | number,
    p?: string | number,
    m?: string | number,
    border?: string
}

const dropStyles = {
    siblingColor: 'green',
    siblingOpacity: '1',
    siblingWidth: '6px',
    siblingMinWidth: '6px',
    siblingBorderRadius: '6px',
}

const stylesTop = (isOver: true | false) => ({
    position: 'absolute' as 'absolute', // as 'absolute' "fixes" ts issue
    width: '100%',
    height: '50%',
    top: 0,
    left: 0,
    boxShadow: isOver ? `0 calc(-1 * min(${dropStyles.siblingWidth}, ${dropStyles.siblingMinWidth}) + 1px) 0 0 ${dropStyles.siblingColor}, 0 0px 0 0 ${dropStyles.siblingColor}` : undefined,
})

const stylesLeft = (isOver: true | false) => ({
    position: 'absolute' as 'absolute', // as 'absolute' "fixes" ts issue
    width: '50%',
    height: '100%',
    top: 0,
    left: 0,
    boxShadow: isOver ? `calc(-1 * min(${dropStyles.siblingWidth}, ${dropStyles.siblingMinWidth}) + 1px) 0 0 0 ${dropStyles.siblingColor}, 0 0 0 0 ${dropStyles.siblingColor}` : undefined,
})

const stylesBottom = (isOver: true | false) => ({
    position: 'absolute' as 'absolute', // as 'absolute' "fixes" ts issue
    width: '100%',
    height: '50%',
    top: '50%',
    left: 0,
    boxShadow: isOver ? `0 calc(min(${dropStyles.siblingWidth}, ${dropStyles.siblingMinWidth}) - 1px) 0 0 ${dropStyles.siblingColor}, 0 0px 0 0 ${dropStyles.siblingColor}` : undefined,
})

const stylesRight = (isOver: true | false) => ({
    position: 'absolute' as 'absolute', // as 'absolute' "fixes" ts issue
    width: '50%',
    height: '100%',
    top: '0',
    left: '50%',
    boxShadow: isOver ? `calc(min(${dropStyles.siblingWidth}, ${dropStyles.siblingMinWidth}) - 1px) 0 0 0 ${dropStyles.siblingColor}, 0 0 0 0 ${dropStyles.siblingColor}` : undefined,
})


/* 
    Wrapper for no-container components.
    
    It defined with wrapping box (size, border, ...)
    so that children only care about content.
*/
const ComponentWrapper = ({ id, componentType, parentType, children, w, h, p, m, border }: propsT) => {
    const { attributes, listeners, setNodeRef } = useDraggable({ // transform
        id: `draggable_${id}`,
    });

    const { draggingId } = useDesignerStore();
    const [isHovered, setIsHovered] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [size, setSize] = useState({ w: w, h: h });

    // side1: top / left, depending on parent container
    const { isOver: isOver1, setNodeRef: setNodeRef1 } = useDroppable({
        id: `droppable_side1_${id}`,
        data: {
            componentId: id,
            componentType: componentType,
            side: 'side1'
        }
    });
    // side2: bottom / right, depending on parent container
    const { isOver: isOver2, setNodeRef: setNodeRef2 } = useDroppable({
        id: `droppable_side2_${id}`,
        data: {
            componentId: id,
            componentType: componentType,
            side: 'side2'
        }
    });

    let style1: CSSProperties;
    let style2: CSSProperties;

    switch (parentType) {
        case 'container-column':
            style1 = stylesTop(isOver1);
            style2 = stylesBottom(isOver2);
            break;
        case 'container-row':
            style1 = stylesLeft(isOver1);
            style2 = stylesRight(isOver2);
            break;
        default:
            style1 = {};
            style2 = {};
            break;
    }

    return (
        // container box
        <Resizable
            size={{ width: size.w, height: size.h }}
            onResizeStop={(e, direction, ref, d) => {
                setSize({ w: size.w + d.width, h: size.h + d.height })
                setIsResizing(false)
            }}
            onResizeStart={(e, direction, ref) => {
                setIsResizing(true)
            }}
            // style={{overflow:'hidden'}}
            maxWidth={parentType === 'container-column' ? '100%' : undefined}
            maxHeight={parentType === 'container-row' ? '100%' : undefined}
            enable={{ top: false, right: true, bottom: true, left: false, topRight: false, bottomRight: true, bottomLeft: true, topLeft: false }}
            handleStyles={{
                // move handlers inside container
                right: { right: '0px' },
                bottom: { bottom: '0px' },
                // left: {left:'0px'},
                bottomRight: { right: '0px', bottom: '0px' },
                bottomLeft: { left: '0px', bottom: '0px' },
            }}
            // handleComponent added to easily manage hover effects
            handleComponent={{
                right: <div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{ position: 'absolute', userSelect: 'none', width: '10px', height: '100%', top: '0px', cursor: 'col-resize', right: '0px' }}
                ></div>,
                bottom: <div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{ position: 'absolute', userSelect: 'none', width: '100%', height: '10px', left: '0px', cursor: 'row-resize', bottom: '0px' }}
                ></div>,
                bottomRight: <div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{ position: 'absolute', userSelect: 'none', width: '20px', height: '20px', right: '0px', cursor: 'se-resize', bottom: '0px' }}
                ></div>,
                bottomLeft: <div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{ position: 'absolute', userSelect: 'none', width: '20px', height: '20px', left: '0px', cursor: 'sw-resize', bottom: '0px' }}
                ></div>,
            }}
        >
            {/* for dragging */}
            {(isResizing || isHovered) && <>
                <Icon
                    {...listeners}
                    {...attributes}
                    style={{
                        position: 'absolute',
                        top: '-20px',
                        left: '0',
                        height: '20px',
                        width: '20px',
                        borderRadius: '3px 0 0 3px',
                        borderWidth: '1px 0 0 1px',
                        borderColor: 'grey'
                    }}
                    bg={'gray.400'}
                    as={MdDragIndicator}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                />
                <Text
                    userSelect={'none'}
                    style={{
                        position: 'absolute',
                        top: '-20px',
                        left: '20px',
                        height: '20px',
                        padding: '0 10px',
                        borderRadius: '0 3px 3px 0',
                        width: 'max-content',
                        borderWidth: '1px 1px 0 0',
                        borderColor: 'grey'
                    }}
                    bg={'gray.400'}
                    fontSize={'xs'}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {'<comp type>'}
                </Text>
            </>
            }
            <Box
                ref={setNodeRef}
                _hover={{ outline: '1px solid grey' }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ position: 'relative', overflow: 'auto', outline: isResizing || isHovered ? '1px solid grey' : undefined }}
                w={'100%'}
                h={'100%'}
                p={p || undefined}
                m={m || undefined}
                border={border || undefined}
            >
                {children}
            </Box>
            {/* for dropping */}
            {draggingId && draggingId !== id && id !== 'canvas' && componentType !== 'container-column' && <div ref={setNodeRef1} style={style1}></div>}
            {draggingId && draggingId !== id && id !== 'canvas' && componentType !== 'container-column' && <div ref={setNodeRef2} style={style2}></div>}
        </Resizable>
    );
};

export default ComponentWrapper;