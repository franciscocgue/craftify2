import { useEffect, useRef, useState } from "react";
import useDesignerStore from "../../stores/designer";
import DroppableContainer from "./DroppableContainer";
import { compTypes } from "../../config/components";
import MarginOverlay from "./MarginOverlay";
import { parseProperties } from "../../utils";
import { getChildrenNodes } from "../../utils";
import { isEqual } from "lodash";
import MyPortal from "./MyPortal";
import MyOutline from "./MyOutline";
import { useDebouncedMouseEnter } from "../../hooks";
import CanvasComponentTooltip from "./CanvasComponentTooltip";


interface WrapperContainerProps {
    componentId: string,
    componentType: keyof typeof compTypes | 'canvas',
    componentName: string,
    parentType: 'column' | 'row',
    // otherProperties?: Properties,
    children?: React.ReactNode,
}

/**
 * Wrapper for functionality to interact with components containers when in canvas,
 * such as selection and hover effects. This functionality is not part
 * of the actual components in the built application.
 */
const WrapperContainer = (props: WrapperContainerProps) => {

    console.log('C - WrapperContainer ' + props.componentId.slice(0, 5))

    const ref = useRef<HTMLDivElement  | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isHoveredRemote, setIsHoveredRemote] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const draggable = useDesignerStore((state) => state.draggable);
    const setHoveredId = useDesignerStore((state) => state.setHoveredId);
    const removeComponent = useDesignerStore((state) => state.removeComponent);
    const duplicateComponent = useDesignerStore((state) => state.duplicateComponent);
    const toggleSelectedId = useDesignerStore((state) => state.toggleSelectedId);
    const components = useDesignerStore((state) => state.components);
    const colorMode = useDesignerStore((state) => state.colorMode);
    const otherProperties = useDesignerStore((state) => state.properties[props.componentId]);
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
                {CanvasComponentTooltip(props.componentName, props.componentType, colorMode, props.componentId, removeComponent, duplicateComponent)}
            </MyPortal>}
        </div >
    </>
}

export default WrapperContainer;