import { useEffect, useState } from "react";
import { useWrapper } from "../../hooks";
import { UiComponentProps } from "../../types/designer.types";

const CCheckbox = ({ componentId, componentType, componentName, parentType }: UiComponentProps) => {

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
        <div
            // exclude below from the built version
            ref={ref as React.RefObject<HTMLDivElement>}
            // end exclude block
            style={{
                ...otherProperties,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
            }}>
            <label style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                {/* undefined: uncontrolled; here set fixed to true just for preview in designer */}
                <input type="checkbox" style={{ marginRight: '5px' }} checked={otherProperties.__checked} />
                {otherProperties.__text}
            </label>
            {/* exclude below from the built version */}
            {wrapperComponent}
            {/* end exclude block */}
        </div>
    </>
}

export default CCheckbox;