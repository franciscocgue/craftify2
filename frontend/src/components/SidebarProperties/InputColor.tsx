import { ReactElement, useCallback, useEffect, useState } from 'react';
import generalStyles from './Property.module.css';
import useDesignerStore from '../../stores/designer';
import { debounce } from 'lodash';
import { HexColorPicker } from "react-colorful";
import './InputColor.css';
import { isValidHexColor } from '../../helpers/utils';


type InputColorProps = {
    propertyDisplayName: string | ReactElement,
    propertyKey: string[], // use array if simplified input affects multiple properties (eg border style -> left, right, top, bottom)
}

const InputColor = ({ propertyDisplayName, propertyKey }: InputColorProps) => {

    const selectedId = useDesignerStore(state => state.selectedId);
    const updateProperty = useDesignerStore(state => state.updateProperty);
    // Getting non-reactive fresh state
    const propValue = useDesignerStore.getState().properties[selectedId as string]?.values[propertyKey[0]];

    const [val, setVal] = useState(propValue ? propValue : undefined);
    const [isPickerVisible, setIsPickerVisible] = useState(false);
    const [isWrongInput, setIsWrongInput] = useState(false);

    // update shown value on component changed
    useEffect(() => {
        if (selectedId) {
            setVal(useDesignerStore.getState().properties[selectedId as string]?.values[propertyKey[0]])
        }
    }, [selectedId])

    const handleDebounceFn = (selectedId: string, value: string) => {
        console.log('valuee', value)
        if (value === '') {
            const props = propertyKey.reduce((acc, key) => {
                acc[key] = undefined;
                return acc;
            }, {});
            console.log('valuee', 'emptyy')
            updateProperty(selectedId as string, props, {});
            setIsWrongInput(false);
        }
        else if (isValidHexColor(value)) {
            const props = propertyKey.reduce((acc, key) => {
                acc[key] = value;
                return acc;
            }, {});
            console.log('valuee', 'vaaliid')
            updateProperty(selectedId as string, props, {});
            setIsWrongInput(false);
        } else {
            console.log('valuee', 'wrrooong')
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
            <span className={generalStyles['name']}>{propertyDisplayName}</span>

            <div style={{
                width: '130px',
                height: '25px',
                position: 'relative',
            }}>
                <div style={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div onClick={() => setIsPickerVisible(prev => !prev)}
                        style={{
                            cursor: 'pointer',
                            backgroundColor: val,
                            width: '40px',
                            height: '100%',
                            borderRadius: '8px',
                            border: '3px solid #fff',
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
                            color: isWrongInput ? 'black' : 'grey',
                            width: '70px',
                            backgroundColor: isWrongInput ? 'rgb(255, 92, 92)' : 'white',
                            outline: 'none',
                            border: '1px solid grey',
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