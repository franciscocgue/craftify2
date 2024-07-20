import { useEffect, useRef, useState } from "react";
import WrapperComponent from "../../helpers/WrapperComponent";
import useDesignerStore from "../../stores/designer";
import { isEqual } from "lodash";

const CButton = ({ componentId, componentType, componentName, parentType }) => {

    // exclude below from the built version

    const ref = useRef(null);

    console.log('comp render: ' + componentId.slice(0, 5))

    const [isRefReady, setIsRefReady] = useState(false);
    const [_, setRerender] = useState(false);
    const otherProperties = useDesignerStore((state) => state.properties[componentId]);

    useEffect(() => {
        const unsub = useDesignerStore.subscribe(
            // callback
            (state, prevState) => {
                // on canvas scroll, if THIS component is selected, 
                // re-render so ref is updated and portal re-positioned.
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


    useEffect(() => {
        if (ref.current && !isRefReady) {
            setIsRefReady(true);
        }
    }, [isRefReady]);

    // end exclude block

    return <>
        <button
            // exclude below from the built version
            ref={ref}
            // end exclude block
            style={{
                ...otherProperties,
                position: 'relative',
            }}
        >
            Button
            {/* exclude below from the built version */}
            <WrapperComponent
                componentId={componentId}
                componentName={componentName}
                componentRef={ref}
                componentType={componentType}
                parentType={parentType}
                otherProperties={otherProperties}
            />
            {/* end exclude block */}
        </button>
    </>
}

export default CButton;