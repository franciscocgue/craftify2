import { useEffect, useRef, useState } from "react";
import useDesignerStore from "../stores/designer";
import DraggableHandle from "./DraggableHandle";
import DroppableContainer from "./DroppableContainer";
import { compTypes } from "../config/components";
import MarginOverlay from "./MarginOverlay";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { getChildrenNodes, parseProperties } from "./utils";
import { isEqual } from "lodash";
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
            <Icon size="20px" />
        </div>
    );
};

const TooltipComp = (name: string, componentType: keyof typeof compTypes, colorMode: 'dark' | 'light', componentId: string, removeComponent: (compId: string) => void) => {

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
        {/* wrapper container cannot be duplicated */}
        {/* In the future just copy all (nested) components inside */}
        {/* <GrDuplicate
            color="white"
            size={'19px'}
            title="Duplicate"
            style={{ cursor: 'pointer', color: colorMode === 'dark' ? 'black' : 'white' }}
            onClick={() => {
                removeComponent(componentId);
                notify.deleted(`${name} deleted`)
            }}
        /> */}
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

interface WrapperContainerProps {
    componentId: string,
    componentType: keyof typeof compTypes,
    componentName: string,
    parentType: 'column' | 'row',
    // otherProperties?: Properties,
    children?: React.ReactNode,
}

const WrapperContainer = (props: WrapperContainerProps) => {

    console.log('C - WrapperContainer ' + props.componentId.slice(0, 5))

    const ref = useRef<HTMLDivElement  | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isHoveredRemote, setIsHoveredRemote] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const draggable = useDesignerStore((state) => state.draggable);
    const setHoveredId = useDesignerStore((state) => state.setHoveredId);
    const removeComponent = useDesignerStore((state) => state.removeComponent);
    const toggleSelectedId = useDesignerStore((state) => state.toggleSelectedId);
    const components = useDesignerStore((state) => state.components);
    const colorMode = useDesignerStore((state) => state.colorMode);
    const otherProperties = useDesignerStore((state) => state.properties[props.componentId].values);
    const parsedProperties = parseProperties(otherProperties);
    const [_, setRerender] = useState(false);

    // substcribe to external changes to re-render
    useEffect(() => {
        const unsub = useDesignerStore.subscribe(
            // selector
            (state) => state,
            // callback
            (state, prevState) => {
                // on canvas scroll, if THIS component is selected, 
                // re-render so portal re-positioned.
                if (state.selectedId === props.componentId && state.isCanvasScrolling !== prevState?.isCanvasScrolling) {
                    // just stoppped scrolling
                    setRerender(prev => !prev)
                }
                // if THIS component's properties changed, re-render it
                if (!isEqual(state.properties[props.componentId], prevState?.properties[props.componentId])) {
                    console.log('comp render: props changed for comp: ' + props.componentId.slice(0, 5))
                    setRerender(prev => !prev)
                    setTimeout(() => setRerender(prev => !prev), 100)
                }
                // if an ancestor properties changed, update re-render component
                if (!isEqual(state.lastUpdatedCompChildren, prevState?.lastUpdatedCompChildren) && state.lastUpdatedCompChildren.includes(props.componentId)) {
                    console.log('comp render: ancestor props changed: ' + props.componentId.slice(0, 5))
                    // setRerender(prev => !prev)
                    setTimeout(() => setRerender(prev => !prev), 100)
                }
                // component just created, re-render (to show outline on newly created component)
                // if (state.selectedId !== prevState?.selectedId && state.selectedId === props.componentId) {
                if (state.selectedId === props.componentId) {
                    setIsSelected(true);
                }
            }, {
            fireImmediately: true // necessary to automatically select when comp first created
        });

        return unsub;
    }, [])

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
                if (selectedId !== prevSelectedId) {
                    // cleanup lingering hover from compTree
                    setHoveredId(null)
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


    return <>
        <div
            ref={ref}
            style={{
                // highlights
                outline: draggable ? '1px solid grey' : undefined, // dotted
                outlineOffset: draggable ? '-1px' : undefined,
                // size
                width: parsedProperties?.width || '100%',
                height: parsedProperties?.height || 'auto',
                minHeight: parsedProperties?.minHeight || 'auto',
                // margins
                marginTop: parsedProperties?.marginTop,
                marginRight: parsedProperties?.marginRight,
                marginBottom: parsedProperties?.marginBottom,
                marginLeft: parsedProperties?.marginLeft,
                // other
                // overflow: 'hidden',
                position: 'relative',
                overflow: 'hidden',

                ...parsedProperties
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

            {props.children}

            {/* outlines */}
            {!isSelected && !draggable && (isHovered || isHoveredRemote) && ref.current  && <MyOutline boundingRect={ref.current?.getBoundingClientRect()} color='orange' thickness={3} />}
            {isSelected && ref.current && <MyOutline boundingRect={ref.current?.getBoundingClientRect()} color='green' thickness={3} />}

            {/* {isHovered && !draggable && <MyPortal styles={{ position: 'absolute', top: ref.current?.getBoundingClientRect().top, left: ref.current?.getBoundingClientRect().left + ref.current?.getBoundingClientRect().width }}>
                <>
                    <DraggableHandle componentId={props.componentId} />
                    <div style={actionBtnStyle(2, 2)}>
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
                && <DroppableContainer componentId={props.componentId} parentType={props.parentType} />}

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
            {/* margins */}
            {(isHovered || isSelected)
                && !draggable
                && <MarginOverlay
                    componentRef={ref}
                    marginTop={parsedProperties?.marginTop}
                    marginLeft={parsedProperties?.marginLeft}
                    marginRight={parsedProperties?.marginRight}
                    marginBottom={parsedProperties?.marginBottom}
                />}
            {/* </Tooltip> */}
            {isHovered && !draggable && <MyPortal styles={{ position: 'absolute', top: `calc(${ref.current?.getBoundingClientRect().top}px - 30px)`, left: ref.current?.getBoundingClientRect().left }}>
                {TooltipComp(props.componentName, props.componentType, colorMode, props.componentId, removeComponent)}
            </MyPortal>}
        </div >
    </>
}

export default WrapperContainer;