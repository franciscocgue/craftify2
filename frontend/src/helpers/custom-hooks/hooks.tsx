import { CSSProperties, useEffect, useRef, useState } from "react"
import WrapperComponent from "../WrapperComponent";
import useDesignerStore from "../../stores/designer";
import { isEqual } from "lodash";

const useHover = (baseStyle: CSSProperties, hoverStyle: CSSProperties): [combinedStyle: CSSProperties, eventHandlers: { onMouseEnter: () => void, onMouseLeave: () => void }] => {
    const [isHovered, setIsHovered] = useState(false);

    const combinedStyle = isHovered ? { ...baseStyle, ...hoverStyle } : baseStyle;

    const eventHandlers = {
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
    };

    return [combinedStyle, eventHandlers];
}

const useWrapper = (componentId, componentType, componentName, parentType) => {

    const ref = useRef(null);
    const [renderer, setRerender] = useState(false);
    const otherProperties = useDesignerStore((state) => state.properties[componentId]);

    // substcribe to external changes to re-render
    useEffect(() => {
        const unsub = useDesignerStore.subscribe(
            // callback
            (state, prevState) => {
                // on canvas scroll, if THIS component is selected, 
                // re-render so portal re-positioned.
                if (state.selectedId === componentId && state.isCanvasScrolling !== prevState.isCanvasScrolling) {
                    // just stoppped scrolling
                    setRerender(prev => !prev)
                }
                // if THIS component's properties changed, re-render it
                if (!isEqual(state.properties[componentId], prevState.properties[componentId])) {
                    console.log('comp render: props changed for comp: ' + componentId.slice(0, 5))
                    setRerender(prev => !prev)
                    setTimeout(() => setRerender(prev => !prev), 100)
                }
            });

        return unsub;
    }, [])

    const wrapperComponent = <WrapperComponent
        componentId={componentId}
        componentName={componentName}
        componentRef={ref}
        componentType={componentType}
        parentType={parentType}
        otherProperties={otherProperties}
    />

    return [ref, renderer, otherProperties, wrapperComponent]

}

export {
    useHover,
    useWrapper
}