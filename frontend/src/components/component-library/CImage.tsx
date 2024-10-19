import { useEffect, useState } from "react";
import { useWrapper } from "../../hooks";
import { UiComponentProps } from "../../types/designer.types";

const CImage = ({ componentId, componentType, componentName, parentType }: UiComponentProps) => {

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

    // wrapper not needed in built version
    return <div style={{
        position: 'relative',
        width: otherProperties.width,
        height: otherProperties.height,
        // margin managed in div, and in img as 0px,
        // workaround not finished in built version
        marginTop: otherProperties.marginTop,
        marginBottom: otherProperties.marginBottom,
        marginLeft: otherProperties.marginLeft,
        marginRight: otherProperties.marginRight,
        // display: 'inline-block',
    }}>
        <img
            // exclude below from the built version
            ref={ref as React.RefObject<HTMLImageElement>}
            // end exclude block
            style={{
                ...otherProperties,
                display: 'block', // needed so that height matches div wrapper
                width: '100%',
                height: '100%',
                // margin managed in div, and in img as 0px,
                // workaround not finished in built version
                marginTop: '0px',
                marginBottom: '0px',
                marginLeft: '0px',
                marginRight: '0px',
            }}
            src={otherProperties.__src}
            alt={otherProperties.__alt}
        >
            {/* end exclude block */}
        </img>
        {wrapperComponent}
    </div>
}

export default CImage;