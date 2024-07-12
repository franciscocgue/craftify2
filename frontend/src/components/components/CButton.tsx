import { useEffect, useRef, useState } from "react";
import WrapperComponent from "../../helpers/WrapperComponent";

const CButton = ({ componentId, componentType, componentName, parentType, ...otherProperties }) => {

    const ref = useRef(null);

    const [isRefReady, setIsRefReady] = useState(false);

    useEffect(() => {
      if (ref.current && !isRefReady) {
        setIsRefReady(true);
      }
    }, [isRefReady]);

    return <>
        <button
            ref={ref}
            style={{
                ...otherProperties,
                position: 'relative',
                // overwrite some styles (reason: using wrapper in dev)
                // width: '100%',
                // height: '100%',
                // maxWidth: '100%',
                // maxHeight: '100%',
                // color: otherProperties.color || undefined,
                // backgroundColor: otherProperties.backgroundColor || undefined,
                // outline: otherProperties.borderTopStyle || undefined,
                // borderTopStyle: otherProperties.borderTopStyle || undefined,
                // borderTopWidth: otherProperties.borderTopWidth || undefined,
                // borderTopColor: otherProperties.borderTopColor || undefined,
                // borderBottomStyle: otherProperties.borderBottomStyle || undefined,
                // borderBottomWidth: otherProperties.borderBottomWidth || undefined,
                // borderBottomColor: otherProperties.borderBottomColor || undefined,
                // borderLeftStyle: otherProperties.borderLeftStyle || undefined,
                // borderLeftWidth: otherProperties.borderLeftWidth || undefined,
                // borderLeftColor: otherProperties.borderLeftColor || undefined,
                // borderRightStyle: otherProperties.borderRightStyle || undefined,
                // borderRightWidth: otherProperties.borderRightWidth || undefined,
                // borderRightColor: otherProperties.borderRightColor || undefined,
            }}
        >
            Button
        <WrapperComponent
            componentId={componentId}
            componentName={componentName}
            componentRef={ref}
            componentType={componentType}
            parentType={parentType}
            otherProperties={otherProperties}
        />
        </button>
    </>
}

export default CButton;