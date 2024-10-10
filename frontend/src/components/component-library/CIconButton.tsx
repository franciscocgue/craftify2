import { useEffect, useState } from "react";
import { useWrapper } from "../../hooks";
import MyIcon from "../common/MyIcon";
import { UiComponentProps } from "../../types/designer.types";

const CIconButton = ({ componentId, componentType, componentName, parentType } : UiComponentProps) => {

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
        <button
            // exclude below from the built version
            ref={ref as React.RefObject<HTMLButtonElement>}
            // end exclude block
            style={{
                ...otherProperties,
                position: 'relative',
            }}
        >
            <MyIcon nameIcon={otherProperties.__iconName ?? 'MdQuestionMark'} propsIcon={{ size: otherProperties.__iconSize, color: otherProperties.__iconColor }} />
            {/* exclude below from the built version */}
            {wrapperComponent}
            {/* end exclude block */}
        </button>
    </>
}

export default CIconButton;