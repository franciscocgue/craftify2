import { Box, Tooltip } from '@chakra-ui/react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSSProperties, ReactNode, useEffect, useState } from 'react';
import useDesignerStore from '../stores/designer';
import { Resizable } from 're-resizable';

type propsT = {
    id: string,
    componentType: string,
    parentType: string, // container
    children: ReactNode,
    w?: string | number,
    h?: string | number,
    p?: string | number, // normally undefined; manage in component
    m?: string | number,
    border?: string, // normally undefined; manage in component
}

const dropStyles = {
    siblingColor: 'green',
    siblingWidth: '6px',
    siblingMinWidth: '6px',
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

const ComponentWrapper = ({ id, componentType, parentType, w, h, p, m, border, children }: propsT) => {
    const { attributes, listeners, setNodeRef } = useDraggable({ // transform
        id: `draggable_${id}`,
        disabled: id === 'canvas'
    });

    
    const { draggingId, isResizing, setIsResizing } = useDesignerStore();
    // const draggingId = 'box-b'
    const [isHovered, setIsHovered] = useState(false);
    const [size, setSize] = useState({ w: w || 'auto', h: h || 'auto' });
    
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

    const customResizeHandler = <div
        style={{ height: '100%', width: '100%' }}
        onMouseOver={(e) => {
            e.stopPropagation();
            // console.log(id)
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

    useEffect(() => {
        console.log('comp')   
    })

    return (
        // container box
        <Resizable
            // className={id === 'canvas' ? '' : styles.wrapper}
            style={{ 
                outline: id !== 'canvas' && (isHovered || isResizing || !!draggingId) ? '1px solid darkgrey' : undefined,
                backgroundColor: `draggable_${id}` == draggingId ? 'darkgray' : undefined
            }}
            size={{ width: size.w, height: size.h }}
            onResizeStop={(e, direction, ref, d) => {
                setSize({ w: size.w + d.width, h: size.h + d.height })
                setIsResizing(false)
            }}
            onResizeStart={(e, direction, ref) => {
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
            maxWidth={parentType === 'container-column' ? '100%' : undefined}
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
            <Tooltip placement='top-start' gutter={0} label={componentType} isOpen={isHovered && !!!draggingId && !isResizing}>
                <Box
                    ref={setNodeRef}
                    {...listeners}
                    {...attributes}
                    // onMouseDown={(e) => {
                    //     e.stopPropagation();
                    //     console.log(e.target)
                    // }}
                    // onScroll={() => console.log('is scrolling')}
                    // onScroll={(e) => {
                    //     const isScrollClick = e.target === e.currentTarget;
                    //     console.log(isScrollClick)
                    // }}
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
                    {/* <div>Test</div> */}
                </Box>
            </Tooltip>
            {/* for dropping */}
            <div
                ref={setNodeRef1}
                style={{...style1, display: !isResizing && draggingId && draggingId !== `draggable_${id}` && id !== 'canvas' ? 'block' : 'none'}}>
            </div>
            <div
                ref={setNodeRef2}
                style={{...style2, display: !isResizing && draggingId && draggingId !== `draggable_${id}` && id !== 'canvas' ? 'block' : 'none'}}>
            </div>
            {/* {!isResizing && draggingId && draggingId !== `draggable_${id}` && id !== 'canvas' && <div ref={setNodeRef1} style={{...style1}}></div>} */}
            {/* {!isResizing && draggingId && draggingId !== `draggable_${id}` && id !== 'canvas' && <div ref={setNodeRef2} style={style2}></div>} */}
        </Resizable>
    );
};

export default ComponentWrapper;