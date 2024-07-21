import { useEffect, useState } from "react";
import { useWrapper } from "../../helpers/custom-hooks/hooks";

const CText = ({ componentId, componentType, componentName, parentType }) => {

    // exclude below from the built version
    console.log('comp render: ' + componentId.slice(0, 5))
    const [isRefReady, setIsRefReady] = useState(false);
    const [ref, renderer, otherProperties, wrapperComponent] = useWrapper(componentId, componentType, componentName, parentType);
    
    // render twice so ref is not null
    useEffect(() => {
        if (ref.current && !isRefReady) {
            setIsRefReady(true);
        }
    }, [isRefReady]);
    // end exclude block

    return <>
        <p
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
        </p>
    </>
}

export default CText;