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
        userSelect: 'none',
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
    componentRef: React.MutableRefObject<null>,
    // children?: React.ReactNode,
}

const WrapperComponent = (props: WrapperComponentProps) => {

    console.log('C - WrapperComponent ' + props.componentId.slice(0, 5))
    // console.log('C - WrapperComponent name' + props.componentName)
    // console.log('C - WrapperComponent ref' + props.componentRef)

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
                 // component just created, re-render (to show outline on newly created component)
                if (selectedId === props.componentId) {
                    // on first render, prev and current seem to be the same...
                    setIsSelected(true)
                } else if (prevSelectedId !== props.componentId && selectedId === props.componentId) {
                    setIsSelected(true)
                } else if (prevSelectedId === props.componentId && selectedId !== props.componentId) {
                    setIsSelected(false)
                }
                if (selectedId !== prevSelectedId) {
                    // cleanup lingering hover from compTree
                    setHoveredId(null)
                }
            }, {
            fireImmediately: true // necessary to automatically select when comp first created
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
            // ref={ref}
            style={{
                // size
                width: `${props.componentRef.current?.getBoundingClientRect().width}px`,
                height: `${props.componentRef.current?.getBoundingClientRect().height}px`,
                // position
                top: 0,
                left: 0,
                // minHeight: props.otherProperties?.minHeight || 'auto',
                // margins
                // marginTop: props.otherProperties?.marginTop,
                // marginRight: props.otherProperties?.marginRight,
                // marginBottom: props.otherProperties?.marginBottom,
                // marginLeft: props.otherProperties?.marginLeft,
                // other
                // overflow: 'hidden',
                // if dragging _this_ component, highlight overlay
                backgroundColor: draggable?.componentId === props.componentId ? 'grey' : undefined,
                opacity: draggable?.componentId === props.componentId ? '0.6' : undefined,
                // // highlights
                outline: draggable ? '1px solid grey' : undefined, // dotted
                outlineOffset: draggable ? '-1px' : undefined,
                cursor: 'pointer',
                position: 'absolute',
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
                toggleSelectedId(props.componentId);
            }}
        >

            {/* {props.children} */}

            {/* outlines */}
            {!isSelected && !draggable && (isHovered || isHoveredRemote) && <MyOutline boundingRect={props.componentRef.current?.getBoundingClientRect()} color='orange' thickness={3} />}
            {isSelected && <MyOutline boundingRect={props.componentRef.current?.getBoundingClientRect()} color='green' thickness={3} />}

            {isHovered && !draggable && <MyPortal styles={{ position: 'absolute', top: props.componentRef.current?.getBoundingClientRect().top, left: props.componentRef.current?.getBoundingClientRect().left + props.componentRef.current?.getBoundingClientRect().width }}>
                <>
                    <DraggableHandle top={6} componentId={props.componentId} />
                    <div style={actionBtnStyle(2, 6)}>
                        <RiDeleteBin2Fill color="white" size={'19px'}
                            onClick={() => {
                                removeComponent(props.componentId);
                                notify.deleted(`${props.componentName} deleted`)
                            }} />
                    </div>
                </>
            </MyPortal>}

            {draggable
                && draggable.componentId !== props.componentId
                && !getChildrenNodes(draggable?.componentId, components).includes(props.componentId)
                && <DroppableComponent componentId={props.componentId} parentType={props.parentType} />}

            {/* margins */}
            {(isHovered || isSelected)
                && !draggable
                && <MarginOverlay
                    componentRef={props.componentRef}
                    marginTop={props.otherProperties?.marginTop}
                    marginLeft={props.otherProperties?.marginLeft}
                    marginRight={props.otherProperties?.marginRight}
                    marginBottom={props.otherProperties?.marginBottom}
                />}
            {/* </Tooltip> */}
            {isHovered && !draggable && <MyPortal styles={{ position: 'absolute', top: `calc(${props.componentRef.current?.getBoundingClientRect().top}px - 30px)`, left: props.componentRef.current?.getBoundingClientRect().left }}>
                {TooltipComp(props.componentName, props.componentType, colorMode)}
            </MyPortal>}
        </div >
    </>
}

export default WrapperComponent;