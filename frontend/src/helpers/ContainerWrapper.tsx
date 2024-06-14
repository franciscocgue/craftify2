import { Box, Flex, Icon, Tooltip } from '@chakra-ui/react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSSProperties, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import useDesignerStore from '../stores/designer';
import { NumberSize, Resizable } from 're-resizable';
import { compTypes } from '../config/components';
import { debounce } from 'lodash';

type otherPropertiesT = {
    w?: string | number,
    h?: string | number,
    p?: string | number,
    m?: string | number,
    border?: string
}

type propsT = {
    id: string,
    componentType: string,
    parentType: string, // container
    name: string,
    children: ReactNode,
    otherProperties?: otherPropertiesT
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

const useDebouncedMouseEnter = (setStatus) => {
    // Use a ref to track the debounced update
    const debouncedUpdateRef = useRef(null);

    // Debounce function to ensure a final update after inactivity
    const debouncedUpdate = useCallback(debounce((id) => {
        setStatus(id);
    }, 400), [setStatus]);

    const handleMouseEnter = useCallback((id) => {
        // Clear any existing debounce
        if (debouncedUpdateRef.current) {
            debouncedUpdateRef.current.cancel();
        }

        // Perform debounced update
        debouncedUpdateRef.current = debouncedUpdate;
        debouncedUpdate(id);
    }, [debouncedUpdate]);

    const handleMouseLeave = useCallback(() => {
        // Clear the debounced update on mouse leave
        if (debouncedUpdateRef.current) {
            debouncedUpdateRef.current.cancel();
        }
        setStatus(null); // Optionally clear status on leave
    }, [setStatus]);

    return { handleMouseEnter, handleMouseLeave };
};

/* 
    Wrapper for no-container components.
    
    It defines wrapping box (size, border, ...)
    so that children only care about content.
*/
const ContainerWrapper = ({ id, componentType, parentType, name, children, ...otherProperties }: propsT) => {
    const { attributes, listeners, setNodeRef } = useDraggable({ // transform
        id: `draggable_${id}`,
        disabled: id === 'canvas',
        data: {
            componentId: id,
            componentType: componentType,
        }
    });

    // const { draggingId, isResizing, setIsResizing, setHoveredId, hoveredId } = useDesignerStore();
    const draggingId = useDesignerStore((state) => state.draggingId);
    const isResizing = useDesignerStore((state) => state.isResizing);
    const setIsResizing = useDesignerStore((state) => state.setIsResizing);
    const setHoveredId = useDesignerStore((state) => state.setHoveredId);
    const setSelectedId = useDesignerStore((state) => state.setSelectedId);
    const updateProperty = useDesignerStore((state) => state.updateProperty);
    // const properties = useDesignerStore((state) => state.properties);
    // const hoveredId = useDesignerStore((state) => state.hoveredId);


    // useEffect(() => {
    //     console.log(properties)
    // }, [properties])

    // console.log('***')
    // console.log(otherProperties.h)
    // console.log(otherProperties)


    const [isActive, setIsActive] = useState(false); // might be activated externally
    const [isHovered, setIsHovered] = useState(false);

    // useEffect(() => {
    //     const unsub = useDesignerStore.subscribe(
    //         // selector
    //         (state) => state.hoveredId,
    //         // callback
    //         (hoveredId, prevHoveredId) => {
    //             if (prevHoveredId !== id && hoveredId === id) {
    //                 setIsActive(true)
    //             } else if (prevHoveredId === id && hoveredId !== id) {
    //                 setIsActive(false)
    //             }
    //         });

    //     return unsub
    // }, [])

    useEffect(() => {
        // active --> either hovered or selected
        const unsub = useDesignerStore.subscribe(
            // selector
            (state, prevState) => {
                // console.log('state, prevState')
                if ((prevState.hoveredId !== id && state.hoveredId === id)
                    || (prevState.selectedId !== id && state.selectedId === id)) {
                    // console.log('state, prevState 1111111111');
                    setIsActive(true);
                } else if ((state.selectedId !== id && prevState.hoveredId === id && state.hoveredId !== id)
                    || (prevState.selectedId === id && state.selectedId !== id)) {
                    // console.log('state, prevState 222222222');
                    setIsActive(false);
                }
            });

        return unsub
    }, [])
    const [size, setSize] = useState({ w: otherProperties.w || '100%', h: otherProperties.h || 'auto' });

    const { handleMouseEnter, handleMouseLeave } = useDebouncedMouseEnter(setHoveredId);

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
            handleMouseEnter(id);
            setIsHovered(true);
        }}
        onMouseOut={(e) => {
            e.stopPropagation();
            handleMouseLeave();
            setIsHovered(false);
        }}>
    </div>

    // avoid parent tooltip after resizing
    useEffect(() => {
        if (!isResizing) {
            setHoveredId(null);
            setIsHovered(false);
        }
    }, [isResizing])

    useEffect(() => {
        console.log('C - canvas cont: ' + name)
    })


    return (
        // container box
        <Resizable
            style={{
                // boxShadow: !isResizing && draggingId && draggingId !== `draggable_${id}` && isOver3 ? 'inset 0 0 0 2px red'
                //     : (!isResizing && !!!draggingId && (isHovered || isActive)) ? 'inset 0 0 0 2px green' : (isActive || isResizing || !!draggingId) ? 'inset 0 0 0 1px darkgrey' : undefined,
                outline: !isResizing && draggingId && draggingId !== `draggable_${id}` && isOver3 ? '1px solid red'
                    : (!isResizing && !!!draggingId && (isHovered || isActive)) ? '1px solid green' : (isActive || isResizing || !!draggingId) ? '1px solid darkgrey' : undefined,
                borderColor: !isResizing && draggingId && draggingId !== `draggable_${id}` && isOver3 ? 'red'
                    : (!isResizing && !!!draggingId && (isHovered || isActive)) ? 'green' : (isActive || isResizing || !!draggingId) ? 'darkgrey' : undefined,
                boxShadow: !isResizing && draggingId && draggingId !== `draggable_${id}` && isOver3 ? 'inset 0 0 0 1px red'
                    : (!isResizing && !!!draggingId && (isHovered || isActive)) ? 'inset 0 0 0 1px green' : (isActive || isResizing || !!draggingId) ? 'inset 0 0 0 1px darkgrey' : undefined,
            }}
            size={{ width: otherProperties.w || '100%', height: otherProperties.h || 'auto' }}
            onResizeStop={(e, __, elem, d: NumberSize) => {
                // console.log('DELTA - ')
                // console.log(d)
                // console.log(e)
                // console.log(elem)
                // console.log(window.getComputedStyle(elem).width) // px
                // console.log(elem.style.width) // px or % or as in style
                // console.log(elem.parentElement?.parentElement)
                // console.log(elem.parentElement)
                // console.log(elem.parentElement?.style.width)
                // console.log(elem.parentElement?.parentElement?.style.width)
                // console.log(window.getComputedStyle(elem.parentElement?.parentElement).width)
                // setSize({ w: size.w as number + d.width, h: '500px'})
                // setSize({ w: size.w as number + d.width, h: size.h as number + d.height })
                setIsResizing(false)
                // elem.style.height = '300px'
                updateProperty(id, 'w', elem.style.width)
                updateProperty(id, 'h', elem.style.height)
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
                        handleMouseEnter(id);
                        setIsHovered(true);
                    }}
                    onMouseOut={(e) => {
                        e.stopPropagation();
                        handleMouseLeave();
                        setIsHovered(false);
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedId(id);
                    }}
                    cursor={id === 'canvas' ? 'default' : 'grab'}
                    style={{ position: 'relative', overflow: 'auto' }}
                    // _hover={{ outline: '1px solid darkgrey' }}
                    w={'100%'}
                    h={'100%'}
                    p={otherProperties.p || 1}
                    m={otherProperties.m || undefined}
                    // border={otherProperties.border || '0px solid grey'}
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