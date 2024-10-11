import { useEffect, useRef, useState } from "react"
import useDesignerStore from "../stores/designer";
import { isEqual } from "lodash";
import { parseProperties } from "../utils";
import { compTypes } from "../config/components";
import { Properties } from "../types/designer.types";
import WrapperComponent from "../components/helpers/WrapperComponent";

/**
 * Provides functionality to interact with components when in canvas,
 * such as selection and hover effects. This functionality is not part
 * of the actual components in the built application.
 * 
 * See usage example in: frontend\src\components\component-library\CButton.tsx
 * (path might change)
 */
const useWrapper = (
    componentId: string,
    componentType: keyof typeof compTypes | 'canvas',
    componentName: string,
    parentType: 'row' | 'column'
): [
        React.RefObject<HTMLElement>,
        boolean,
        Properties,
        JSX.Element
    ] => {

    const ref = useRef(null);
    const [renderer, setRerender] = useState(false);
    const otherProperties = useDesignerStore((state) => state.properties[componentId]);
    const parsedProperties = parseProperties(otherProperties);

    // subscribe to external changes to re-render
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
                // if an ancestor properties changed, update re-render component
                if (!isEqual(state.lastUpdatedCompChildren, prevState.lastUpdatedCompChildren) && state.lastUpdatedCompChildren.includes(componentId)) {
                    console.log('comp render: ancestor props changed: ' + componentId.slice(0, 5))
                    // setRerender(prev => !prev)
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
        otherProperties={parsedProperties}
    />

    return [ref, renderer, parsedProperties, wrapperComponent]

}

export {
    useWrapper,
}