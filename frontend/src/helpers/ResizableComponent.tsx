import { Box, Flex, Icon, Tooltip, useToast } from "@chakra-ui/react";
import { Resizable, NumberSize } from "re-resizable";
import { useCallback, useEffect, useRef, useState } from "react";
import useDesignerStore from "../stores/designer";
import DraggableHandle from "./DraggableHandle";
import DroppableComponent from "./DroppableComponent";
import { compTypes } from "../config/components";
import MarginOverlay from "./MarginOverlay";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { getChildrenNodes } from "./utils";
import { Properties } from "../vite-env";
import { debounce } from "lodash";
import { IconType } from "react-icons";


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

interface IconBoxProps {
    icon: IconType;
}
const IconBox: React.FC<IconBoxProps> = ({ icon: Icon }) => {
    return (
        <div >
            <Icon size="20px" />
        </div>
    );
};

const TooltipComp = (name: string, componentType: keyof typeof compTypes) => (<div style={{ display: 'flex', gap: '5px' }}>
    <IconBox icon={compTypes[componentType].icon} />
    {name || componentType}
</div>)

const useDebouncedMouseEnter = (setStatus: (selectedId: string | null) => void) => {
    // Use a ref to track the debounced update
    const debouncedUpdateRef = useRef(null);

    // Debounce function to ensure a final update after inactivity
    const debouncedUpdate = useCallback(debounce((id) => {
        setStatus(id);
    }, 300), [setStatus]);

    const handleMouseEnter = useCallback((id: string) => {
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

interface ResizableComponentProps {
    componentId: string,
    componentType: keyof typeof compTypes,
    componentName: string,
    parentType: 'column' | 'row',
    otherProperties?: Properties,
    children?: React.ReactNode,
}

const ResizableComponent = (props: ResizableComponentProps) => {

    console.log('C - ResizableComponent ' + props.componentId.slice(0, 5))

    const refResizable = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isHoveredRemote, setIsHoveredRemote] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const draggable = useDesignerStore((state) => state.draggable);
    const setHoveredId = useDesignerStore((state) => state.setHoveredId);
    const removeComponent = useDesignerStore((state) => state.removeComponent);
    const setIsResizing = useDesignerStore((state) => state.setIsResizing);
    const setSelectedId = useDesignerStore((state) => state.setSelectedId);
    // const isResizing = useDesignerStore((state) => state.isResizing);
    const components = useDesignerStore((state) => state.components);

    const { handleMouseEnter, handleMouseLeave } = useDebouncedMouseEnter(setHoveredId)

    useEffect(() => {
        const unsub = useDesignerStore.subscribe(
            // selector
            (state) => state.selectedId,
            // callback
            (selectedId, prevSelectedId) => {
                if (prevSelectedId !== props.componentId && selectedId === props.componentId) {
                    setIsSelected(true)
                } else if (prevSelectedId === props.componentId && selectedId !== props.componentId) {
                    setIsSelected(false)
                }
            });

        return unsub
    }, [])

    useEffect(() => {
        const unsub = useDesignerStore.subscribe(
            // selector
            (state) => state.hoveredId,
            // callback
            (hoveredId, prevHoveredId) => {
                if (prevHoveredId !== props.componentId && hoveredId === props.componentId) {
                    setIsHoveredRemote(true)
                } else if (prevHoveredId === props.componentId && hoveredId !== props.componentId) {
                    setIsHoveredRemote(false)
                }
            });

        return unsub
    }, [])

    const toast = useToast();

    const [size, setSize] = useState({ width: props.otherProperties?.width || '100%', height: props.otherProperties?.height || 'auto' })

    // useEffect(() => {
    //     console.log('refResizable', refResizable)
    //     console.log('refResizable __', refResizable?.current?.resizable?.getBoundingClientRect())
    // })

    return <>
        <Resizable
            ref={refResizable}
            size={{ width: size.width, height: size.height }}
            style={{
                // // highlights
                // outline: draggable ? '1px dotted grey' : isHovered || isSelected ? '2px solid green' : undefined,
                // outlineOffset: draggable ? '-1px' : isHovered || isSelected ? '-2px' : undefined,
                // component margins
                marginTop: props.otherProperties?.marginTop,
                marginRight: props.otherProperties?.marginRight,
                marginBottom: props.otherProperties?.marginBottom,
                marginLeft: props.otherProperties?.marginLeft,
            }}
            // resizing enabled only if comp selected
            enable={isSelected && draggable === null ? { top: true, right: true, bottom: true, left: true, topRight: true, bottomRight: true, bottomLeft: true, topLeft: true } : false}
            onResizeStop={(_, __, elem, ___: NumberSize) => {
                setIsResizing(false)
                // console.log(elem.style.width)
                // console.log(elem.style.height)
                setSize({
                    width: elem.style.width,
                    height: elem.style.height
                })
            }}
            onResizeStart={() => {
                setIsResizing(true)
            }}
        >
            {/* <div
                style={{
                    position: 'fixed',
                    // zIndex: 1,
                    outline: '3px solid red',
                    outlineOffset: '-3px',
                    left:refResizable?.current?.resizable?.getBoundingClientRect().left,
                    top:refResizable?.current?.resizable?.getBoundingClientRect().top,
                    width:refResizable?.current?.resizable?.getBoundingClientRect().width,
                    height:refResizable?.current?.resizable?.getBoundingClientRect().height,
                }}
            >TEST</div> */}
            {/* why div? to handle click & mouse events */}
            <Tooltip placement='top-start' gutter={0} label={TooltipComp(props.componentName, props.componentType)} isOpen={isHovered && !draggable}>
                <Box
                    w={'100%'}
                    h={'100%'}
                    overflow='hidden'
                    // outline={draggable ? '1px solid grey' : isHovered || isSelected ? '2px solid orange' : undefined}
                    // outlineOffset={draggable ? '-1px' : '-2px'}
                    onMouseOver={(e) => {
                        e.stopPropagation();
                        setIsHovered(true);
                        handleMouseEnter(props.componentId)
                    }}
                    onMouseOut={() => {
                        // e.stopPropagation();
                        setIsHovered(false);
                        handleMouseLeave()
                    }}
                >
                    {/* <CompX /> */}
                    {props.children}
                    {isHovered && !draggable && <DraggableHandle top={6} componentId={props.componentId} />}
                    {draggable
                        && draggable.componentId !== props.componentId
                        && !getChildrenNodes(draggable?.componentId, components).includes(props.componentId)
                        && <DroppableComponent componentId={props.componentId} parentType={props.parentType} />}
                    {isHovered && !draggable && <RiDeleteBin2Fill size={'19px'} style={{
                        position: 'absolute',
                        // opacity: '0.5',
                        top: 6,
                        right: 28,
                        zIndex: 2,
                        cursor: 'pointer'
                    }}
                        onClick={() => {
                            removeComponent(props.componentId);
                            toast({
                                title: 'Deleted',
                                status: 'success',
                                duration: 1500,
                                // isClosable: true,
                            });
                        }} />}
                    {isHovered && !draggable && !isSelected && <MdCheckBoxOutlineBlank size={'19px'} style={{
                        position: 'absolute',
                        // opacity: '0.5',
                        top: 6,
                        right: 4,
                        zIndex: 2,
                        cursor: 'pointer'
                    }} onClick={(e) => {
                        e.stopPropagation();
                        // if (!isResizing) {
                        setSelectedId(props.componentId);
                        // }
                    }} />}
                    {!draggable && isSelected && <MdCheckBox size={'19px'} style={{
                        position: 'absolute',
                        // opacity: '0.5',
                        top: 6,
                        right: 4,
                        zIndex: 2,
                        cursor: 'pointer'
                    }} onClick={(e) => {
                        e.stopPropagation();
                        // if (!isResizing) {
                        setSelectedId(null);
                        // }
                    }} />}
                    {/* overlay - hide component interactions / if dragging */}
                    <Box
                        w={'100%'}
                        h={'100%'}
                        position={"absolute"}
                        left={0}
                        right={0}
                        top={0}
                        bottom={0}
                        // if dragging _this_ component, highlight overlay
                        backgroundColor={draggable?.componentId === props.componentId ? 'grey' : undefined}
                        opacity={draggable?.componentId === props.componentId ? '0.6' : undefined}
                        style={{
                            // highlights
                            outline: draggable ? '1px dotted grey' : isHovered || isSelected || isHoveredRemote ? '2px solid green' : undefined,
                            outlineOffset: draggable ? '-1px' : isHovered || isSelected || isHoveredRemote ? '-2px' : undefined,
                        }}
                    // zIndex={1}
                    />
                </Box>
            </Tooltip>
            {/* margins */}
            {/* top */}
            {isHovered && !draggable && <MarginOverlay height={marginAsPx(String(props.otherProperties?.marginTop), window.getComputedStyle(refResizable.current?.resizable?.parentElement))} width={'100%'} bottom={'100%'} left={'0'} />}
            {/* left */}
            {isHovered && !draggable && <MarginOverlay height={'100%'} width={marginAsPx(String(props.otherProperties?.marginLeft), window.getComputedStyle(refResizable.current?.resizable?.parentElement))} top={'0'} right={'100%'} />}
            {/* bottom */}
            {isHovered && !draggable && <MarginOverlay height={marginAsPx(String(props.otherProperties?.marginBottom), window.getComputedStyle(refResizable.current?.resizable?.parentElement))} width={'100%'} top={'100%'} left={'0'} />}
            {/* right */}
            {isHovered && !draggable && <MarginOverlay height={'100%'} width={marginAsPx(String(props.otherProperties?.marginRight), window.getComputedStyle(refResizable.current?.resizable?.parentElement))} top={'0'} left={'100%'} />}
        </Resizable >
    </>
}

export default ResizableComponent;