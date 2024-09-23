import { useEffect, useState } from "react";
import { useWrapper } from "../../helpers/custom-hooks/hooks";
import { UiComponentProps } from "../../vite-env";

const CHeader = ({ componentId, componentType, componentName, parentType } : UiComponentProps) => {

    // exclude below from the built version
    console.log('comp render: ' + componentId.slice(0, 5))
    const [isRefReady, setIsRefReady] = useState(false);
    const [ref, _, otherProperties, wrapperComponent] = useWrapper(componentId, componentType, componentName, parentType);
    
    // render twice so ref is not null
    useEffect(() => {
        if (ref.current && !isRefReady) {
            setIsRefReady(true);
        }
    }, [isRefReady]);
    // end exclude block

    return <>
        <h2
            // exclude below from the built version
            ref={ref}
            // end exclude block
            style={{
                ...otherProperties,
                position: 'relative',
            }}
        >
            {otherProperties.__text}
            {/* exclude below from the built version */}
            {wrapperComponent}
            {/* end exclude block */}
        </h2>
    </>
}

export default CHeader;