import { useEffect, useState } from "react";
import { useWrapper } from "../../helpers/custom-hooks/hooks";

const CImage = ({ componentId, componentType, componentName, parentType }) => {

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

    return <div style={{
        position: 'relative',
        display: 'inline-block',
    }}>
        <img
            // exclude below from the built version
            ref={ref}
            // end exclude block
            style={{
                ...otherProperties,
            }}
            src={otherProperties.__src}
            alt={otherProperties.__alt}
        >
            {/* exclude below from the built version */}
            {/* end exclude block */}
        </img>
        {wrapperComponent}
    </div>
}

export default CImage;