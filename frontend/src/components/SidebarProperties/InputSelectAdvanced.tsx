import { ReactElement, useCallback, useEffect, useState } from 'react';
import generalStylesLight from './PropertyLight.module.css';
import generalStylesDark from './PropertyDark.module.css';
import useDesignerStore from '../../stores/designer';
import { debounce } from 'lodash';
import Select from 'react-select'
import MyIcon from '../common/MyIcon';
import { Properties } from '../../types/designer.types';

type Option = {
    value: string;
    label: string;
};

type InputSelectAdvancedProps = {
    propertyDisplayName: string | ReactElement,
    propertyKey: string[], // use array if simplified input affects multiple properties (eg border style -> left, right, top, bottom)
    options: Option[]
}

const InputSelectAdvanced = ({ propertyDisplayName, propertyKey, options }: InputSelectAdvancedProps) => {

    const selectedId = useDesignerStore(state => state.selectedId);
    const updateProperty = useDesignerStore(state => state.updateProperty);
    const colorMode = useDesignerStore(state => state.colorMode);
    const generalStyles = colorMode === 'light' ? generalStylesLight : generalStylesDark;
    // Getting non-reactive fresh state
    const propValue = useDesignerStore.getState().properties[selectedId as string]?.[propertyKey[0] as keyof Properties];

    const [val, setVal] = useState({
        value: propValue,
        label: <div style={{ display: 'flex', alignItems: 'center', gap: '3px', flexWrap: 'nowrap' }}><span style={{ minWidth: '20px' }}><MyIcon nameIcon={propValue ?? '__'} propsIcon={{ size: 20, color: 'black' }} /></span> {propValue?.slice(2)}</div>,
    });
    const [inputValue, setInputValue] = useState('');

    // update shown value on component changed
    useEffect(() => {
        if (selectedId) {
            setVal({
                value: useDesignerStore.getState().properties[selectedId as string]?.[propertyKey[0] as keyof Properties],
                label: <div style={{ display: 'flex', alignItems: 'center', gap: '3px', flexWrap: 'nowrap' }}><span style={{ minWidth: '20px' }}><MyIcon nameIcon={useDesignerStore.getState().properties[selectedId as string]?.[propertyKey[0] as keyof Properties] ?? '__'} propsIcon={{ size: 20, color: 'black' }} /></span> {useDesignerStore.getState().properties[selectedId as string]?.[propertyKey[0] as keyof Properties]?.slice(2)}</div>,
                // label: useDesignerStore.getState().properties[selectedId as string]?.[propertyKey[0]],
            })
        }
    }, [selectedId])

    const handleDebounceFn = (selectedId: string, value: string) => {
        if (value === '') {
            const props = propertyKey.reduce((acc: { [key: string]: undefined }, key) => {
                acc[key] = undefined;
                return acc;
            }, {});
            updateProperty(selectedId as string, props);
        }
        else {
            const props = propertyKey.reduce((acc: { [key: string]: string }, key) => {
                acc[key] = value;
                return acc;
            }, {});
            updateProperty(selectedId as string, props);
        }
    }
    const debounceFn = useCallback(debounce(handleDebounceFn, 100), []);
    const handleChange = (val: any) => {
        setVal(val);
        // test if value is Ok (numeric, non-negative, non-null, etc.)
        debounceFn(selectedId as string, val.value);
    }

    // const options__ = [
    //     { value: 'chocolate', label: 'Chocolate' },
    //     { value: 'strawberry', label: 'Strawberry' },
    //     { value: 'vanilla', label: 'Vanilla' }
    // ]

    const reactSelectOpts = options.map(opt => ({ value: opt.value, label: <div style={{ display: 'flex', alignItems: 'center', gap: '3px', flexWrap: 'nowrap' }}><span style={{ minWidth: '20px' }}><MyIcon nameIcon={opt.value} propsIcon={{ size: 20, color: 'black' }} /></span> {opt.value.slice(2)}</div> }));

    const customNoOptionsMessage = () => {
        if (inputValue.length < 3) {
            return `Type 3 characters`;
        } else {
            // return `No results for "${inputValue}"`;
            return `No results found`;
        }
    };

    return (
        <div className={`${generalStyles['property']} ${generalStyles['no-help']}`}>
            <span className={generalStyles['name']}>{propertyDisplayName}</span>
            {/* <select title={val} className={`${generalStyles['input']} ${generalStyles['select']}`} onChange={handleChange} value={val}>
                {options.map(opt => <option key={opt.value} value={opt.value}>{opt.display}</option>)}
            </select> */}
            <Select
                styles={{
                    container: (provided) => ({
                        ...provided,
                        width: '130px',
                        height: '30px',
                    }),
                    control: (provided) => ({
                        ...provided,
                        // background: '#fff',
                        borderColor: '#9e9e9e',
                        minHeight: '30px',
                        height: '30px',
                        // boxShadow: state.isFocused ? null : null,
                    }),

                    valueContainer: (provided) => ({
                        ...provided,
                        height: '30px',
                        padding: '0 0 0 3px',
                        fontSize: '9pt',
                    }),

                    input: (provided) => ({
                        ...provided,
                        margin: '0px',
                    }),
                    indicatorSeparator: () => ({
                        display: 'none',
                    }),
                    indicatorsContainer: (provided) => ({
                        ...provided,
                        height: '30px',
                        width: '36px',
                        margin: '0',
                        display: 'flex',
                        alignItems: 'center',
                        // backgroundColor: 'red',
                    }),
                    menu: (provided) => ({
                        ...provided,
                        fontSize: 'smaller',
                        width: '170px'
                    }),
                }}
                // className={`${generalStyles['input']} ${generalStyles['select']}`}
                options={inputValue.length >= 3 ? reactSelectOpts : []} // Show options only after typing 3 characters
                onInputChange={(value) => setInputValue(value)}
                // options={reactSelectOpts}
                onChange={handleChange}
                value={val}
                noOptionsMessage={customNoOptionsMessage}

            // getOptionLabel={(e) => (
            //     <div style={{ display: 'flex', alignItems: 'center', color: 'blue' }}>
            //         <MyIcon nameIcon={e.value} propsIcon={{size: 20, color: 'black'}}/>
            //         <span style={{ marginLeft: 8 }}>{e.label}</span>
            //     </div>
            // )}
            // getOptionValue={}
            // getOptionValue={(e) => (
            //     <div style={{ display: 'flex', alignItems: 'center', color: 'red' }}>
            //         <span>{e.label} (Selected)</span>
            //     </div>
            // )}
            />
        </div>
    )
}

export default InputSelectAdvanced;