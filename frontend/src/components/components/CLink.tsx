import { useEffect, useState } from "react";
import { useWrapper } from "../../helpers/custom-hooks/hooks";

const CLink = ({ componentId, componentType, componentName, parentType }) => {

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
        <a
            // exclude below from the built version
            ref={ref}
            // href={otherProperties.__href} // disabled in design mode
            target={otherProperties.__target}
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
        </a>
    </>
}

export default CLink;