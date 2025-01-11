import { ReactElement, useCallback, useEffect, useState } from 'react';
import generalStylesLight from './PropertyLight.module.css';
import generalStylesDark from './PropertyDark.module.css';
import useDesignerStore from '../../stores/designer';
import { debounce } from 'lodash';
import { HexColorPicker } from "react-colorful";
import './InputColor.css';
import { isValidHexColor, isValidVariable } from "../../utils";
import { Properties } from '../../types/designer.types';


type InputColorProps = {
    propertyDisplayName: string | ReactElement,
    propertyKey: string[], // use array if simplified input affects multiple properties (eg border style -> left, right, top, bottom)
}

const InputColor = ({ propertyDisplayName, propertyKey }: InputColorProps) => {

    const selectedId = useDesignerStore(state => state.selectedId);
    const updateProperty = useDesignerStore(state => state.updateProperty);
    const colorMode = useDesignerStore(state => state.colorMode);

    const generalStyles = colorMode === 'light' ? generalStylesLight : generalStylesDark;

    // Getting non-reactive fresh state
    const propValue = useDesignerStore.getState().properties[selectedId as string]?.[propertyKey[0] as keyof Properties];

    const [val, setVal] = useState(propValue ? propValue : undefined);
    const [isPickerVisible, setIsPickerVisible] = useState(false);
    const [isWrongInput, setIsWrongInput] = useState(false);

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
            setIsWrongInput(false);
        }
        else if (isValidHexColor(value) || CSS.supports('color', value) || isValidVariable(value)) {
            const props = propertyKey.reduce((acc: Record<string, string>, key) => {
                acc[key] = value;
                return acc;
            }, {});
            updateProperty(selectedId as string, props);
            setIsWrongInput(false);
        } else {
            setIsWrongInput(true);
        }
    }
    const debounceFn = useCallback(debounce(handleDebounceFn, 1000), []);
    const handleChange = (newColor: string) => {
        setVal(newColor);
        setIsWrongInput(false);
        // test if value is Ok (numeric, non-negative, non-null, etc.)
        debounceFn(selectedId as string, newColor);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVal(event.target.value);
        setIsWrongInput(false);
        // test if value is Ok (numeric, non-negative, non-null, etc.)
        debounceFn(selectedId as string, event.target.value);
    }

    return (
        <div className={`${generalStyles['property']} ${generalStyles['no-help']}`}>
            {/* <span className={generalStyles['name']}>{propertyDisplayName}</span> */}

            <div style={{
                width: '100%',
                height: '25px',
                position: 'relative',
            }}>
                <div style={{
                    display: 'flex',
                    gap: '10px',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div onClick={() => setIsPickerVisible(prev => !prev)}
                        style={{
                            cursor: 'pointer',
                            backgroundColor: val,
                            // width: '40px',
                            flexGrow: '1',
                            height: '100%',
                            borderRadius: '8px',
                            border: `2px solid ${colorMode === 'light' ? '#fff' : '#666'}`,
                            boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(0, 0, 0, 0.3)"
                        }} />
                    <input
                        value={val}
                        title='Hex color'
                        onChange={handleInputChange}
                        className={`${generalStyles['input']} ${isWrongInput ? generalStyles['wrong'] : ''}`}
                        style={{
                            fontSize: 'small',
                            padding: '2px 3px',
                            color: isWrongInput ? 'black' : colorMode === 'light' ? 'grey' : 'darkgrey',
                            width: '85px',
                            backgroundColor: isWrongInput ? 'rgb(255, 92, 92)' : colorMode === 'light' ? '#ffffff' : '#2c2c2c',
                            outline: 'none',
                            border: `1px solid ${colorMode === 'light' ? '#e1e4e8' : '#9b9b9c'}`,
                            borderRadius: '4px'
                        }} />
                </div>
                {isPickerVisible && <div className='my-input-color'>
                    <button className='close-button' onClick={() => setIsPickerVisible(false)}>save</button>
                    <HexColorPicker style={{ position: 'absolute' }} color={val} onChange={handleChange} />
                </div>}
            </div>
            {/* <select title={val} className={`${generalStyles['input']} ${generalStyles['select']}`} onChange={handleChange} value={val}>
                {options.map(opt => <option value={opt.value}>{opt.display}</option>)}
            </select> */}
        </div>
    )
}

export default InputColor;