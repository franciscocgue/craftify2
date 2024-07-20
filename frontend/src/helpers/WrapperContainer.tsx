import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import useDesignerStore from "../stores/designer";
import DraggableHandle from "./DraggableHandle";
import DroppableContainer from "./DroppableContainer";
import { compTypes } from "../config/components";
import MarginOverlay from "./MarginOverlay";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { getChildrenNodes } from "./utils";
import { Properties } from "../vite-env";
import { debounce } from "lodash";
import { IconType } from "react-icons";
import MyPortal from "./MyPortal";
import { toast } from "react-toastify";
import MyOutline from "./MyOutline";
import { marginAsPx } from "./utils";


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
        border: colorMode === 'dark' ? '1px solid grey' : '1px solid white',
        outline: colorMode === 'dark' ? '1px solid white' : undefined,
        fontSize: 'small',
        padding: '5px',
        borderRadius: '3px',
        alignItems: 'center',
        height: '30px',
        userSelect: 'none'
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

const actionBtnStyle = (right: number, top: number): CSSProperties => ({
    display: 'flex',
    padding: '2px',
    alignContent: 'center',
    backgroundColor: '#555',
    borderRadius: '100%',
    position: 'absolute',
    // opacity: '0.5',
    top: top,
    right: right,
    zIndex: 2,
    cursor: 'pointer'
})

interface WrapperContainerProps {
    componentId: string,
    componentType: keyof typeof compTypes,
    componentName: string,
    parentType: 'column' | 'row',
    otherProperties?: Properties,
    children?: React.ReactNode,
}

const WrapperContainer = (props: WrapperContainerProps) => {

    console.log('C - WrapperContainer ' + props.componentId.slice(0, 5))

    const ref = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isHoveredRemote, setIsHoveredRemote] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const draggable = useDesignerStore((state) => state.draggable);
    const setHoveredId = useDesignerStore((state) => state.setHoveredId);
    const removeComponent = useDesignerStore((state) => state.removeComponent);
    // const toggleSelectedId = useDesignerStore((state) => state.toggleSelectedId);
    const setSelectedId = useDesignerStore((state) => state.setSelectedId);
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
                // could be better to remove && !isHovered condition 6 render always twice, but not have useEffect dependencies...
                if (prevHoveredId !== props.componentId && hoveredId === props.componentId && !isHovered) {
                    setIsHoveredRemote(true)
                } else if (prevHoveredId === props.componentId && hoveredId !== props.componentId) {
                    setIsHoveredRemote(false)
                }
            });

        return unsub
    }, [isHovered])

    const notify = {
        deleted: (msg: string) => toast(msg, { type: 'info', autoClose: 1500, position: 'bottom-center' }),
    }


    return <>
        <div
            ref={ref}
            style={{
                // highlights
                outline: draggable ? '1px dotted grey' : undefined,
                outlineOffset: draggable ? '-1px' : undefined,
                // size
                width: props.otherProperties?.width || '100%',
                height: props.otherProperties?.height || 'auto',
                minHeight: props.otherProperties?.minHeight || 'auto',
                // margins
                marginTop: props.otherProperties?.marginTop,
                marginRight: props.otherProperties?.marginRight,
                marginBottom: props.otherProperties?.marginBottom,
                marginLeft: props.otherProperties?.marginLeft,
                // other
                // overflow: 'hidden',
                position: 'relative',
                overflow: 'hidden',

                ...props.otherProperties
            }}
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
            onClick={(e) => {
                e.stopPropagation();
                setSelectedId(props.componentId);
            }}
        >

            {props.children}

            {/* outlines */}
            {!isSelected && !draggable && (isHovered || isHoveredRemote) && <MyOutline boundingRect={ref.current?.getBoundingClientRect()} color='orange' thickness={3} />}
            {isSelected && <MyOutline boundingRect={ref.current?.getBoundingClientRect()} color='green' thickness={3} />}


            {draggable
                && draggable.componentId !== props.componentId
                && !getChildrenNodes(draggable?.componentId, components).includes(props.componentId)
                && <DroppableContainer componentId={props.componentId} parentType={props.parentType} />}

            <MyPortal styles={{ position: 'absolute', top: ref.current?.getBoundingClientRect().top, left: ref.current?.getBoundingClientRect().left + ref.current?.getBoundingClientRect().width }}>
                <>
                    {isHovered && !draggable && <DraggableHandle componentId={props.componentId} />}
                    {isHovered && !draggable && <div style={actionBtnStyle(2, 2)}>
                        <RiDeleteBin2Fill color="white" size={'19px'}
                            onClick={() => {
                                removeComponent(props.componentId);
                                notify.deleted(`${props.componentName} deleted`)
                            }} />
                    </div>}
                </>
            </MyPortal>
            {/* {isHovered && !draggable && !isSelected && <div style={actionBtnStyle(4, 2)}>
                <MdCheckBoxOutlineBlank color="white" size={'19px'} onClick={(e) => {
                    e.stopPropagation();
                    setSelectedId(props.componentId);
                }} />
                </div>}
            {!draggable && isSelected && <div style={actionBtnStyle(4, 2)}>
                <MdCheckBox color="white" size={'19px'} onClick={(e) => {
                    e.stopPropagation();
                    setSelectedId(null);
                    }} />
                    </div>} */}
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
                }}
            />}
            {/* </Tooltip> */}
            {/* margins */}
            {(isHovered || isSelected)
                && !draggable
                && props.otherProperties?.marginTop
                && !['0px', '0%'].includes(props.otherProperties?.marginTop)
                && <MyPortal styles={{
                    position: 'absolute',
                    top: ref.current?.getBoundingClientRect().top - marginAsPx(String(props.otherProperties?.marginTop), window.getComputedStyle(ref.current?.parentElement)),
                    left: ref.current?.getBoundingClientRect().left,
                    width: ref.current?.getBoundingClientRect().width,
                    height: marginAsPx(String(props.otherProperties?.marginTop), window.getComputedStyle(ref.current?.parentElement)),
                    backgroundColor: colorMode === 'dark' ? '#1d8348' : '#abebc6',
                    opacity: colorMode === 'dark' ? '0.4' : '0.8',
                }}>
                </MyPortal>}
            {/* left */}
            {(isHovered || isSelected)
                && !draggable
                && props.otherProperties?.marginLeft
                && !['0px', '0%'].includes(props.otherProperties?.marginLeft)
                && <MyPortal styles={{
                    position: 'absolute',
                    top: ref.current?.getBoundingClientRect().top,
                    left: ref.current?.getBoundingClientRect().left - marginAsPx(String(props.otherProperties?.marginLeft), window.getComputedStyle(ref.current?.parentElement)),
                    width: marginAsPx(String(props.otherProperties?.marginLeft), window.getComputedStyle(ref.current?.parentElement)),
                    height: ref.current?.getBoundingClientRect().height,
                    backgroundColor: colorMode === 'dark' ? '#1d8348' : '#abebc6',
                    opacity: colorMode === 'dark' ? '0.4' : '0.8',
                }}>
                </MyPortal>}
            {/* bottom */}
            {(isHovered || isSelected)
                && !draggable
                && props.otherProperties?.marginBottom
                && !['0px', '0%'].includes(props.otherProperties?.marginBottom)
                && <MyPortal styles={{
                    position: 'absolute',
                    top: ref.current?.getBoundingClientRect().bottom,
                    left: ref.current?.getBoundingClientRect().left,
                    width: ref.current?.getBoundingClientRect().width,
                    height: marginAsPx(String(props.otherProperties?.marginBottom), window.getComputedStyle(ref.current?.parentElement)),
                    backgroundColor: colorMode === 'dark' ? '#1d8348' : '#abebc6',
                    opacity: colorMode === 'dark' ? '0.4' : '0.8',
                }}>
                </MyPortal>}
            {/* right */}
            {(isHovered || isSelected)
                && !draggable
                && props.otherProperties?.marginRight
                && !['0px', '0%'].includes(props.otherProperties?.marginRight)
                && <MyPortal styles={{
                    position: 'absolute',
                    top: ref.current?.getBoundingClientRect().top,
                    left: ref.current?.getBoundingClientRect().right,
                    width: marginAsPx(String(props.otherProperties?.marginRight), window.getComputedStyle(ref.current?.parentElement)),
                    height: ref.current?.getBoundingClientRect().height,
                    backgroundColor: colorMode === 'dark' ? '#1d8348' : '#abebc6',
                    opacity: colorMode === 'dark' ? '0.4' : '0.8',
                }}>
                </MyPortal>}
            {isHovered && !draggable && <MyPortal styles={{ position: 'absolute', top: `calc(${ref.current?.getBoundingClientRect().top}px - 30px)`, left: ref.current?.getBoundingClientRect().left }}>
                {TooltipComp(props.componentName, props.componentType, colorMode)}
            </MyPortal>}
        </div >
    </>
}

export default WrapperContainer;