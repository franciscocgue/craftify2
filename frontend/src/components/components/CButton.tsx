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