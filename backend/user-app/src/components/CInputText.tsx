import { useCallback } from "react";
import { useDynamicVariables } from "../hooks/useVariables";
import { useVariableStore } from "../stores/variableStore";

type Props = {
    onClick: (() => Promise<void>) | undefined,
    [x: string]: any
}

const CInputText = ({ onClick, ...otherProperties }: Props) => {

    // subscribes to variable changes
    const [parsedProperties, propsWithVariables] = useDynamicVariables(otherProperties);
    const setVariable = useVariableStore(state => state.setVariable);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            // if property linked to variable, update variable
            if (propsWithVariables['__textinputcontent']) {
                setVariable(propsWithVariables['__textinputcontent'][0], newValue);
            }
        },
        [propsWithVariables['__textinputcontent']]
    );

    const { paddingTop, paddingRight, paddingLeft, paddingBottom, ...parsedPropertiesNoPadding } = parsedProperties;

    return <>
        <div
            style={{
                ...parsedPropertiesNoPadding,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                // visibility
                ...(!parsedProperties.__visible && { display: 'none' }),
            }}
            onClick={(event: React.MouseEvent<HTMLElement>) => {
                // prevent triggering parent onClick events
                event.stopPropagation();
                if (onClick) onClick();
            }}
        >
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
                    color: parsedProperties.color,
                    fontStyle: parsedProperties.fontStyle,
                    fontWeight: parsedProperties.fontWeight,
                    textAlign: parsedProperties.textAlign,
                    // others
                    paddingTop, paddingRight, paddingLeft, paddingBottom
                }}
                type="text"
                value={parsedProperties.__textinputcontent}
                placeholder={parsedProperties.__placeholder}
                onChange={handleChange}
            >
            </input>
        </div>
    </>
}

export default CInputText;