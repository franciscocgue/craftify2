import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import useDesignerStore from "../stores/designer";
import DraggableHandle from "./DraggableHandle";
import DroppableComponent from "./DroppableComponent";
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

interface WrapperComponentProps {
    componentId: string,
    componentType: keyof typeof compTypes,
    componentName: string,
    parentType: 'column' | 'row',
    otherProperties?: Properties,
    children?: React.ReactNode,
}

const WrapperComponent = (props: WrapperComponentProps) => {

    console.log('C - WrapperComponent ' + props.componentId.slice(0, 5))

    const ref = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isHoveredRemote, setIsHoveredRemote] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const draggable = useDesignerStore((state) => state.draggable);
    const setHoveredId = useDesignerStore((state) => state.setHoveredId);
    const removeComponent = useDesignerStore((state) => state.removeComponent);
    const toggleSelectedId = useDesignerStore((state) => state.toggleSelectedId);
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
        deleted: (msg: string) => toast(msg, { type: 'info', autoClose: 1500, position: 'bottom-right' }),
    }


    return <>
        <div
            ref={ref}
            style={{
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
                overflow: 'hidden',
                position: 'relative',
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
        >
            {isHovered && !draggable && <MyPortal position={{ position: 'absolute', top: `calc(${ref.current?.getBoundingClientRect().top}px - 30px)`, left: ref.current?.getBoundingClientRect().left }}>
                {TooltipComp(props.componentName, props.componentType, colorMode)}
            </MyPortal>}

            {props.children}

            {/* outlines */}
            {!isSelected && !draggable && (isHovered || isHoveredRemote) && <MyOutline boundingRect={ref.current?.getBoundingClientRect()} color='orange' thickness={3} />}
            {isSelected && <MyOutline boundingRect={ref.current?.getBoundingClientRect()} color='green' thickness={3} />}

            {isHovered && !draggable && <DraggableHandle top={6} componentId={props.componentId} />}
            {draggable
                && draggable.componentId !== props.componentId
                && !getChildrenNodes(draggable?.componentId, components).includes(props.componentId)
                && <DroppableComponent componentId={props.componentId} parentType={props.parentType} />}
            {isHovered && !draggable && <div style={actionBtnStyle(2, 6)}>
                <RiDeleteBin2Fill color="white" size={'19px'}
                    onClick={() => {
                        removeComponent(props.componentId);
                        notify.deleted(`${props.componentName} deleted`)
                    }} />
            </div>}
            {/* {isHovered && !draggable && !isSelected && <div style={actionBtnStyle(4, 6)}>
                <MdCheckBoxOutlineBlank color="white" size={'19px'} onClick={(e) => {
                    e.stopPropagation();
                    setSelectedId(props.componentId);
                }} />
            </div>} */}
            {/* {isSelected && <div style={actionBtnStyle(4, 6)}>
                <MdCheckBox color="white" size={'19px'} onClick={(e) => {
                    e.stopPropagation();
                    setSelectedId(null);
                }} />
            </div>} */}
            {/* overlay - hide component interactions / if dragging */}
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    toggleSelectedId(props.componentId);
                }}
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
                    // // highlights
                    outline: draggable ? '1px dotted grey' : undefined,
                    outlineOffset: draggable ? '-1px' : undefined,
                    cursor: 'pointer'
                }}
            />
            {/* </Tooltip> */}
            {/* margins */}
            {/* top */}
            {isHovered && !draggable && <MarginOverlay height={marginAsPx(String(props.otherProperties?.marginTop), window.getComputedStyle(ref.current?.parentElement))} width={'100%'} bottom={'100%'} left={'0'} />}
            {/* left */}
            {isHovered && !draggable && <MarginOverlay height={'100%'} width={marginAsPx(String(props.otherProperties?.marginLeft), window.getComputedStyle(ref.current?.parentElement))} top={'0'} right={'100%'} />}
            {/* bottom */}
            {isHovered && !draggable && <MarginOverlay height={marginAsPx(String(props.otherProperties?.marginBottom), window.getComputedStyle(ref.current?.parentElement))} width={'100%'} top={'100%'} left={'0'} />}
            {/* right */}
            {isHovered && !draggable && <MarginOverlay height={'100%'} width={marginAsPx(String(props.otherProperties?.marginRight), window.getComputedStyle(ref.current?.parentElement))} top={'0'} left={'100%'} />}
        </div >
    </>
}

export default WrapperComponent;