import { useCallback } from 'react';
import { parseProperties } from '../helpers/utils';
import { useDynamicVariables } from '../hooks/useVariables';
import { useVariableStore } from '../stores/variableStore';

type Props = {
    onClick: (() => Promise<void>) | undefined,
    [x: string]: any
}
const CCheckbox = ({ onClick, ...otherProperties }: Props) => {

    // subscribes to variable changes
    const propsWithVariables = useDynamicVariables(otherProperties);
    const setVariable = useVariableStore(state => state.setVariable);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.checked;
            // if property linked to variable, update variable
            if (propsWithVariables['__checked']) {
                setVariable(propsWithVariables['__checked'][0], newValue);
            }
        },
        [propsWithVariables['__checked']]
    );

    const parsedProperties = parseProperties(otherProperties);
    return <div
        style={{
            ...parsedProperties,
            display: 'flex',
            alignItems: 'center',
        }}
        onClick={(event: React.MouseEvent<HTMLElement>) => {
            // prevent triggering parent onClick events
            event.stopPropagation();
            if (onClick) onClick();
        }}
    >
        <label style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            <input onChange={handleChange} type="checkbox" style={{ marginRight: '5px' }} checked={parsedProperties.__checked} />
            {parsedProperties.__text}
        </label>
    </div>
}

export default CCheckbox;