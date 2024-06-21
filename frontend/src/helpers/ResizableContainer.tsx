import { Box, Checkbox, Flex, Icon, Tooltip } from "@chakra-ui/react";
import { Resizable, NumberSize } from "re-resizable";
import { CSSProperties, useRef, useState } from "react";
import useDesignerStore from "../stores/designer";
import DraggableHandle from "./DraggableHandle";
import DroppableComponent from "./DroppableComponent";
import { compTypes } from "../config/components";
import MarginOverlay from "./MarginOverlay";


interface CompXProps {
    children: React.ReactNode
}
const CompX = (props:CompXProps) => {
    console.log('C - CompX column')
    return <Flex
    // style={styles}
    direction={'column'}
    // wrap={otherProperties.wrap || undefined}
    // alignItems={otherProperties.alignItems || undefined}
    // gap={otherProperties.gap || undefined}
    h={'100%'}
    w={'100%'}
    // maxW='100%'
    // maxH='100%'
    // border={otherProperties.border || undefined}
    // p={otherProperties.p || undefined}
    // bg={otherProperties.bg || undefined}
    border={'1px solid grey'}
    // p={'2px'}
>
    {props.children}
</Flex>
}


// interface MarginOverlayProps {
//     width: string | number | undefined;
//     height: string | number | undefined;
//     top?: string | number | undefined;
//     left?: string | number | undefined;
//     right?: string | number | undefined;
//     bottom?: string | number | undefined;
// }
// const MarginOverlay = (props: MarginOverlayProps) => {
//     console.log('C - MarginOverlay')
//     return <Box style={{
//         position: 'absolute',
//         width: props.width, // '100%',
//         height: props.height, // '40px',
//         backgroundColor: 'yellow',
//         top: props.top, // '-40px',
//         left: props.left, // '0',
//         right: props.right, // '0',
//         bottom: props.bottom, // '0',
//         opacity: '0.2'
//     }}></Box>
// }

/**
 * Convert a CSS length to px. 
 * 
 * Use Case: for the margin overlay, if margin is provided as %,
 * the actual px based on the parent size is computed (otherwise
 * overlay size will be based on % and component size)
 * 
 * Used for overlay margins and re-resizable.
 *
 * @param {string} margin - margin CSS length (20px, 10%, etc.).
 * @param {CSSStyleDeclaration} parentStyles - Parent styles (output of window.getComputedStyle(ref.current.resizable?.parentElement)).
 * @returns {string} Margin as px.
 */
const marginAsPx = (margin: string, parentStyles: CSSStyleDeclaration) => {

    const regexPx = /^\d+px$/;
    if (regexPx.test(margin)) return margin // px format

    if (!margin || !parentStyles || !parentStyles?.width) return '0px' // wronf inputs, no margin then

    const regexPercentage = /^\d+%$/;
    const percentageFormat = regexPercentage.test(margin);

    if (percentageFormat && margin !== '0%') {
        let length = parseFloat(margin.replace('%', ''));
        let parentLength = parseFloat(parentStyles.width.replace('px', ''));
        return Math.floor(length / 100 * parentLength) + 'px'
    } else {
        // @TODO: support other CSS length units for margin apart from % and px
        return '0px'
    }
}

const TooltipComp = (name: string, componentType: keyof typeof compTypes) => (<Flex gap={'5px'}>
    <Icon as={compTypes[componentType].icon} w={5} h={5} color="white.800" />
    {name || componentType}
</Flex>)

interface ResizableContainerProps {
    componentId: string,
    componentType: keyof typeof compTypes,
    componentName: string,
    parentType: 'column' | 'row',
    styles?: CSSProperties,
    children?: React.ReactNode
}

const ResizableContainer = (props: ResizableContainerProps) => {

    console.log('C - ResizableContainer')

    const refResizable = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const draggingId = useDesignerStore((state) => state.draggingId);

    const [size, setSize] = useState({ width: props.styles?.width || '100%', height: props.styles?.height || 'auto' })

    return <>
        <Resizable
            ref={refResizable}
            size={{ width: size.width, height: size.height }}
            style={{
                // container margins
                marginTop: props.styles?.marginTop,
                marginRight: props.styles?.marginRight,
                marginBottom: props.styles?.marginBottom,
                marginLeft: props.styles?.marginLeft,
            }}
            // resizing enabled only if comp selected
            enable={isSelected && draggingId === null ? { top: true, right: true, bottom: true, left: true, topRight: true, bottomRight: true, bottomLeft: true, topLeft: true } : false}
            onResizeStop={(_, __, elem, ___: NumberSize) => {
                console.log(elem.style.width)
                console.log(elem.style.height)
                setSize({
                    width: elem.style.width,
                    height: elem.style.height
                })
            }}
        >
            {/* why div? to handle click & mouse events */}
            <Tooltip placement='top-start' gutter={0} label={TooltipComp(props.componentName, props.componentType)} isOpen={isHovered && !draggingId}>
                <Box
                    w={'100%'}
                    h={'100%'}
                    overflow='hidden'
                    outline={isHovered || isSelected ? '2px solid orange' : undefined}
                    outlineOffset={'-2px'}
                    onMouseOver={(e) => {
                        e.stopPropagation();
                        setIsHovered(true);
                    }}
                    onMouseOut={(e) => {
                        e.stopPropagation();
                        setIsHovered(false);
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        // @TODONEXT: only if not is resizing
                        setIsSelected(prev => !prev);
                    }}
                >
                    <CompX >
                        {props.children}
                    </CompX>
                    {isHovered && !draggingId && <DraggableHandle componentId={props.componentId} />}
                    {draggingId !== null && <DroppableComponent componentId={props.componentId} parentType={props.parentType} />}
                    {/* @TODONEXT: create overlay and activate when dragging this componentId */}
                    {/* @TODO?: add action icons (delete, copy, plus) */}
                </Box>
            </Tooltip>
            {/* margins */}
            {/* top */}
            {isHovered && !draggingId && <MarginOverlay height={marginAsPx(String(props.styles?.marginTop), window.getComputedStyle(refResizable.current?.resizable?.parentElement))} width={'100%'} bottom={'100%'} left={'0'} />}
            {/* left */}
            {isHovered && !draggingId && <MarginOverlay height={'100%'} width={marginAsPx(String(props.styles?.marginLeft), window.getComputedStyle(refResizable.current?.resizable?.parentElement))} top={'0'} right={'100%'} />}
            {/* bottom */}
            {isHovered && !draggingId && <MarginOverlay height={marginAsPx(String(props.styles?.marginBottom), window.getComputedStyle(refResizable.current?.resizable?.parentElement))} width={'100%'} top={'100%'} left={'0'} />}
            {/* right */}
            {isHovered && !draggingId && <MarginOverlay height={'100%'} width={marginAsPx(String(props.styles?.marginLeft), window.getComputedStyle(refResizable.current?.resizable?.parentElement))} top={'0'} left={'100%'} />}
        </Resizable >
    </>
}

export default ResizableContainer;