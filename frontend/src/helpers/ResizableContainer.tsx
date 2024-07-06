import { Resizable, NumberSize } from "re-resizable";
import { useCallback, useEffect, useRef, useState } from "react";
import useDesignerStore from "../stores/designer";
import DraggableHandle from "./DraggableHandle";
import { compTypes } from "../config/components";
import MarginOverlay from "./MarginOverlay";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { getChildrenNodes } from "./utils";
import { Properties } from "../vite-env";
import DroppableContainer from "./DroppableContainer";
import { debounce } from "lodash";
import { IconType } from "react-icons";
import MyPortal from "./MyPortal";
import { toast } from "react-toastify";
import MyOutline from "./MyOutline";



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

const TooltipComp = (name: string, componentType: keyof typeof compTypes, colorMode: 'dark' | 'light') => (<div
    style={{
        display: 'flex',
        gap: '7px',
        backgroundColor: colorMode === 'dark' ? 'white' : 'black',
        color: colorMode === 'dark' ? 'black' : 'white',
        fontSize: 'small',
        padding: '5px',
        borderRadius: '3px',
        alignItems: 'center',
        height: '30px',
    }}>
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

interface ResizableContainerProps {
    componentId: string,
    componentType: keyof typeof compTypes,
    componentName: string,
    parentType: 'column' | 'row',
    otherProperties?: Properties,
    children?: React.ReactNode,
}

const ResizableContainer = (props: ResizableContainerProps) => {

    console.log('C - ResizableContainer ' + props.componentId.slice(0, 5))

    // https://github.com/bokuweb/re-resizable/issues/727
    const parentScrollOffsetX = useRef(0)
    const parentScrollOffsetY = useRef(0)

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
    const colorMode = useDesignerStore((state) => state.colorMode);

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

    const notify = {
        deleted: (msg: string) => toast(msg, { type: 'info', autoClose: 1500, position: 'bottom-center' }),
    }

    const [size, setSize] = useState({ width: props.otherProperties?.width || '100%', height: props.otherProperties?.height || 'auto' })

    return <>
        <Resizable
            ref={refResizable}
            size={{ width: size.width, height: size.height }}
            minHeight={props.otherProperties?.minHeight}
            style={{
                // // highlights
                outline: draggable ? '1px dotted grey' : undefined,
                outlineOffset: draggable ? '-1px' : undefined,
                // container margins
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
            onResizeStart={(_, __, ref) => {
                parentScrollOffsetX.current = ref.parentElement?.scrollLeft || 0
                parentScrollOffsetY.current = ref.parentElement?.scrollTop || 0
                setIsResizing(true)
            }}
            onResize={(_, __, ref) => {
                ref.parentElement.scrollTo(parentScrollOffsetX.current, parentScrollOffsetY.current)
            }}
        >
            {/* why div? to handle click & mouse events */}
            {isHovered && !draggable && <MyPortal position={{ position: 'absolute', top: `calc(${refResizable.current?.resizable.getBoundingClientRect().top}px - 30px)`, left: refResizable.current?.resizable.getBoundingClientRect().left }}>
                {TooltipComp(props.componentName, props.componentType, colorMode)}
            </MyPortal>}
            {/* <Tooltip placement='top-start' gutter={0} label={TooltipComp(props.componentName, props.componentType)} isOpen={isHovered && !draggable}> */}
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                }}
                // outline={draggable ? '1px solid grey' : isHovered || isSelected ? '2px solid orange' : undefined}
                // outlineOffset={draggable ? undefined : '-2px'}
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
                {props.children}

                {/* outlines */}
                {!draggable && (isHovered || isSelected || isHoveredRemote) && <MyOutline boundingRect={refResizable.current?.resizable.getBoundingClientRect()} color='green' thickness={3} />}
                {/* issue out of canvas and viewport rendering */}
                {/* {draggable && <MyOutline boundingRect={refResizable.current?.resizable.getBoundingClientRect()} color='grey' thickness={1} />} */}

                {isHovered && !draggable && <DraggableHandle componentId={props.componentId} />}
                {draggable
                    && draggable.componentId !== props.componentId
                    && !getChildrenNodes(draggable?.componentId, components).includes(props.componentId)
                    && <DroppableContainer componentId={props.componentId} parentType={props.parentType} />
                }
                {isHovered && !draggable && <div style={{
                    display: 'flex',
                    padding: '2px',
                    alignContent: 'center',
                    backgroundColor: '#555',
                    borderRadius: '100%',
                    position: 'absolute',
                    // opacity: '0.5',
                    top: 2,
                    right: 28,
                    zIndex: 2,
                    cursor: 'pointer'
                }}>
                    <RiDeleteBin2Fill color="white" size={'19px'}
                        onClick={() => {
                            removeComponent(props.componentId);
                            notify.deleted(`${props.componentName} deleted`)
                        }} />
                </div>}
                {isHovered && !draggable && !isSelected && <div style={{
                    display: 'flex',
                    padding: '2px',
                    alignContent: 'center',
                    backgroundColor: '#555',
                    borderRadius: '100%',
                    position: 'absolute',
                    // opacity: '0.5',
                    top: 2,
                    right: 4,
                    zIndex: 2,
                    cursor: 'pointer'
                }}>
                    <MdCheckBoxOutlineBlank color="white" size={'19px'} onClick={(e) => {
                        e.stopPropagation();
                        // if (!isResizing) {
                        setSelectedId(props.componentId);
                        // }
                    }} />
                </div>}
                {!draggable && isSelected && <div style={{
                    display: 'flex',
                    padding: '2px',
                    alignContent: 'center',
                    backgroundColor: '#555',
                    borderRadius: '100%',
                    position: 'absolute',
                    // opacity: '0.5',
                    top: 2,
                    right: 4,
                    zIndex: 2,
                    cursor: 'pointer'
                }}>
                    <MdCheckBox color="white" size={'19px'} onClick={(e) => {
                        e.stopPropagation();
                        // if (!isResizing) {
                        setSelectedId(null);
                        // }
                    }} />
                </div>}
                {/* overlay - if dragging */}
                {draggable?.componentId === props.componentId && <div
                    style={{
                        width: '100%',
                        height: '100%',
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        // if dragging _this_ component, highlight overlay
                        backgroundColor: draggable?.componentId === props.componentId ? 'grey' : undefined,
                        opacity: draggable?.componentId === props.componentId ? '0.6' : undefined,
                        // if dragging _this_ component, show overlay (highlights)
                        // outline: draggable ? '1px dotted grey' : isHovered || isSelected || isHoveredRemote ? '2px solid green' : undefined,
                        // outlineOffset: draggable ? '-1px' : isHovered || isSelected || isHoveredRemote ? '-2px' : undefined,
                    }}
                // zIndex={9999999999}
                />}
            </div>
            {/* </Tooltip> */}
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

export default ResizableContainer;