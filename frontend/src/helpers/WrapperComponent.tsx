import { useEffect, useState } from "react";
import useDesignerStore from "../stores/designer";
import DraggableHandle from "./DraggableHandle";
import DroppableComponent from "./DroppableComponent";
import { compTypes } from "../config/components";
import MarginOverlay from "./MarginOverlay";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { GrDuplicate } from "react-icons/gr";
import { getChildrenNodes } from "./utils";
import { Properties } from "../vite-env";
import { IconType } from "react-icons";
import MyPortal from "./MyPortal";
import { toast } from "react-toastify";
import MyOutline from "./MyOutline";
import { useDebouncedMouseEnter } from "./utils";


interface IconBoxProps {
    icon: IconType;
}
const IconBox: React.FC<IconBoxProps> = ({ icon: Icon }) => {
    return (
        <div >
            <Icon size="19px" />
        </div>
    );
};

const TooltipComp = (name: string, componentType: keyof typeof compTypes, colorMode: 'dark' | 'light', componentId: string, removeComponent: (compId: string) => void, duplicateComponent: (compId: string) => void) => {

    const notify = {
        deleted: (msg: string) => toast(msg, { type: 'info', autoClose: 1500, position: 'bottom-right' }),
    }

    return (<div
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
            // alignItems: 'center',
            height: '30px',
            userSelect: 'none',
        }}>
        <DraggableHandle top={6} componentId={componentId} />
        <GrDuplicate
            color="white"
            size={'19px'}
            title="Duplicate"
            style={{ cursor: 'pointer', color: colorMode === 'dark' ? 'black' : 'white' }}
            onClick={() => {
                duplicateComponent(componentId);
                // notify.deleted(`${name} deleted`)
            }}
        />
        <RiDeleteBin2Fill
            color="white"
            size={'19px'}
            title="Delete"
            style={{ cursor: 'pointer', color: colorMode === 'dark' ? 'black' : 'white', marginRight: '15px' }}
            onClick={() => {
                removeComponent(componentId);
                notify.deleted(`${name} deleted`)
            }}
        />
        {name || componentType}
        <IconBox icon={compTypes[componentType].icon} />
    </div>)
}

interface WrapperComponentProps {
    componentId: string,
    componentType: keyof typeof compTypes,
    componentName: string,
    parentType: 'column' | 'row',
    otherProperties?: Properties,
    componentRef: React.MutableRefObject<HTMLDivElement  | null>,
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
    const toggleSelectedId = useDesignerStore((state) => state.toggleSelectedId);
    const removeComponent = useDesignerStore((state) => state.removeComponent);
    const duplicateComponent = useDesignerStore((state) => state.duplicateComponent);
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



    
    return <>
        <div
            // ref={ref}
            style={{
                // size
                // width: `${props.componentRef.current?.getBoundingClientRect().width}px`,
                // height: `${props.componentRef.current?.getBoundingClientRect().height}px`,
                width: '100%',
                height: '100%',
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
            
            {/* on hovered */}
            {!isSelected && !draggable && (isHovered || isHoveredRemote) && props.componentRef.current && <MyOutline boundingRect={props.componentRef.current?.getBoundingClientRect()} color='orange' thickness={3} />}
            {/* on selected */}
            {isSelected && props.componentRef.current && <MyOutline boundingRect={props.componentRef.current?.getBoundingClientRect()} color='green' thickness={3} />}

            {/* {isHovered && !draggable && <MyPortal styles={{ position: 'absolute', top: props.componentRef.current?.getBoundingClientRect().top, left: props.componentRef.current?.getBoundingClientRect().left + props.componentRef.current?.getBoundingClientRect().width }}>
                <>
                    <div style={actionBtnStyle(50, 6)}>
                        <RiDeleteBin2Fill color="white" size={'19px'}
                            onClick={() => {
                                removeComponent(props.componentId);
                                notify.deleted(`${props.componentName} deleted`)
                            }} />
                    </div>
                    <DraggableHandle top={6} componentId={props.componentId} />
                    <div style={actionBtnStyle(2, 6)}>
                        <RiDeleteBin2Fill color="white" size={'19px'}
                            onClick={() => {
                                removeComponent(props.componentId);
                                notify.deleted(`${props.componentName} deleted`)
                            }} />
                    </div>
                </>
            </MyPortal>} */}

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
                {TooltipComp(props.componentName, props.componentType, colorMode, props.componentId, removeComponent, duplicateComponent)}
            </MyPortal>}
        </div >
    </>
}

export default WrapperComponent;