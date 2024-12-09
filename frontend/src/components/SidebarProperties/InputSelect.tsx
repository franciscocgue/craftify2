import { ReactElement, useCallback, useEffect, useState } from 'react';
import generalStylesLight from './PropertyLight.module.css';
import generalStylesDark from './PropertyDark.module.css';
import useDesignerStore from '../../stores/designer';
import { debounce } from 'lodash';
import { Properties } from '../../types/designer.types';

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
    const colorMode = useDesignerStore(state => state.colorMode);
    const generalStyles = colorMode === 'light' ? generalStylesLight : generalStylesDark;
    // Getting non-reactive fresh state
    const propValue = useDesignerStore.getState().properties[selectedId as string]?.[propertyKey[0] as keyof Properties];

    const [val, setVal] = useState(propValue);

    // update shown value on component changed
    useEffect(() => {
        if (selectedId) {
            setVal(useDesignerStore.getState().properties[selectedId as string]?.[propertyKey[0] as keyof Properties])
        }
    }, [selectedId])

    const handleDebounceFn = (selectedId: string, value: string) => {
        if (value === '') {
            const props = propertyKey.reduce((acc: Record<string, undefined>, key) => {
                acc[key] = undefined;
                return acc;
            }, {});
            updateProperty(selectedId as string, props);
        }
        else {
            const props = propertyKey.reduce((acc: Record<string, string>, key) => {
                acc[key] = value;
                return acc;
            }, {});
            updateProperty(selectedId as string, props);
        }
    }
    const debounceFn = useCallback(debounce(handleDebounceFn, 100), []);
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
                {options.map(opt => <option key={opt.value} value={opt.value}>{opt.display}</option>)}
            </select>
        </div>
    )
}

export default InputSelect;