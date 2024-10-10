import { useEffect, useState } from "react";
import { useWrapper } from "../../hooks";
import { UiComponentProps } from "../../types/designer.types";

const CCheckbox = ({ componentId, componentType, componentName, parentType } : UiComponentProps) => {

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
            }}>
            <label style={{fontSize: 'small'}}>
                <input type="checkbox" style={{marginRight: '5px'}}/>
                Checkbox
            </label>
            {/* exclude below from the built version */}
            {wrapperComponent}
            {/* end exclude block */}
        </div>
    </>
}

export default CCheckbox;