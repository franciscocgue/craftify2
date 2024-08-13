import { ReactElement, useCallback, useEffect, useState } from 'react';
import generalStyles from './Property.module.css';
import useDesignerStore from '../../stores/designer';
import { debounce } from 'lodash';

type Option = {
    value: string;
    display: string;
};

type InputSelectProps = {
    propertyDisplayName: string | ReactElement,
    propertyKey: string[], // use array if simplified input affects multiple properties (eg border style -> left, right, top, bottom)
    options: Option[]
}

const InputSelect = ({ propertyDisplayName, propertyKey, options }: InputSelectProps) => {

    const selectedId = useDesignerStore(state => state.selectedId);
    const updateProperty = useDesignerStore(state => state.updateProperty);
    // Getting non-reactive fresh state
    const propValue = useDesignerStore.getState().properties[selectedId as string]?.values[propertyKey[0]];

    const [val, setVal] = useState(propValue);

    // update shown value on component changed
    useEffect(() => {
        if (selectedId) {
            setVal(useDesignerStore.getState().properties[selectedId as string]?.values[propertyKey[0]])
        }
    }, [selectedId])

    const handleDebounceFn = (selectedId: string, value: string) => {
        if (value === '') {
            const props = propertyKey.reduce((acc, key) => {
                acc[key] = undefined;
                return acc;
            }, {});
            updateProperty(selectedId as string, props, {});
        }
        else {
            const props = propertyKey.reduce((acc, key) => {
                acc[key] = value;
                return acc;
            }, {});
            updateProperty(selectedId as string, props, {});
        }
    }
    const debounceFn = useCallback(debounce(handleDebounceFn, 100), []);
    const handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        // console.log('newValue', event.target)
        setVal(newValue);
        // test if value is Ok (numeric, non-negative, non-null, etc.)
        debounceFn(selectedId as string, newValue);
    }

    return (
        <div className={`${generalStyles['property']} ${generalStyles['no-help']}`}>
            <span className={generalStyles['name']}>{propertyDisplayName}</span>
            <select title={val} className={`${generalStyles['input']} ${generalStyles['select']}`} onChange={handleChange} value={val}>
                {options.map(opt => <option value={opt.value}>{opt.display}</option>)}
            </select>
        </div>
    )
}

export default InputSelect;