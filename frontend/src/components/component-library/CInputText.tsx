import { useEffect, useState } from "react";
import { useWrapper } from "../../hooks";
import { UiComponentProps } from "../../types/designer.types";

const CInputText = ({ componentId, componentType, componentName, parentType }: UiComponentProps) => {

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

    const { paddingTop, paddingRight, paddingLeft, paddingBottom, ...parsedPropertiesNoPadding } = otherProperties;

    return <>
        <div
            // exclude below from the built version
            ref={ref as React.RefObject<HTMLDivElement>}
            // end exclude block
            style={{
                ...parsedPropertiesNoPadding,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                // visibility
                ...(!otherProperties.__visible && { display: 'none' }),
            }}>
            <input
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    border: 'none',
                    backgroundColor: 'transparent',
                    outline: 'none',
                    // inherited props
                    color: otherProperties.color,
                    fontStyle: otherProperties.fontStyle,
                    fontWeight: otherProperties.fontWeight,
                    textAlign: otherProperties.textAlign,
                    // others
                    paddingTop, paddingRight, paddingLeft, paddingBottom
                }}
                type="text"
                value={otherProperties.__textinputcontent || ''}
                placeholder={otherProperties.__placeholder}
            >
                {/* exclude below from the built version */}
                {/* end exclude block */}
            </input>
            {wrapperComponent}
        </div>
    </>
}

export default CInputText;