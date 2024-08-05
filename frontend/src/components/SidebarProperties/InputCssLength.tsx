import { ReactElement, useCallback, useRef, useState } from 'react';
import generalStyles from './Property.module.css';
import styles from './InputCssLength.module.css';
import useDesignerStore from '../../stores/designer';
import { debounce } from 'lodash';
import { isValidCssLength } from '../../helpers/utils';
import { MdHelpCenter } from 'react-icons/md';


type InputCssLengthProps = {
    propertyDisplayName: string | ReactElement,
    propertyKey: string,
    tooltipContent?: (
        ref: React.MutableRefObject<HTMLDivElement>,
        colorMode: 'dark' | 'light',
        styles: CSSModuleClasses
    ) => ReactElement
}

const InputCssLength = ({ propertyDisplayName, propertyKey, tooltipContent }: InputCssLengthProps) => {

    const colorMode = useDesignerStore(state => state.colorMode);
    const selectedId = useDesignerStore(state => state.selectedId);
    const updateProperty = useDesignerStore(state => state.updateProperty);
    // Getting non-reactive fresh state
    const propValue = useDesignerStore.getState().properties[selectedId as string]?.values[propertyKey];

    const ref = useRef<HTMLDivElement | null>(null);

    const [val, setVal] = useState(propValue);
    const [isWrongInput, setIsWrongInput] = useState(false);
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const handleDebounceFn = (selectedId: string, value: string) => {
        if (value === '') {
            updateProperty(selectedId as string, { [propertyKey]: undefined }, {});
            setIsWrongInput(false);
        }
        else if (isValidCssLength(value)) {
            updateProperty(selectedId as string, { [propertyKey]: value }, {});
            setIsWrongInput(false);
        } else {
            setIsWrongInput(true);
        }
    }
    const debounceFn = useCallback(debounce(handleDebounceFn, 1000), []);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        // console.log('newValue', event.target)
        setVal(newValue);
        setIsWrongInput(false);
        // test if value is Ok (numeric, non-negative, non-null, etc.)
        debounceFn(selectedId as string, newValue);
    }

    const handleMouseEnter = () => {
        // Clear any existing timeouts
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Set a new timeout
        const id = setTimeout(() => {
            console.log('Mouse entered with delay');
            setTooltipVisible(true);
        }, 500);

        setTimeoutId(id);
    };

    const handleMouseLeave = () => {
        // Clear the timeout if the mouse leaves before the delay completes
        if (timeoutId) {
            clearTimeout(timeoutId);
            setTimeoutId(null);
        }
        setTooltipVisible(false);
    };

    return (
        <div className={`${generalStyles['property']}  ${!tooltipContent ? generalStyles['no-help'] : ''}`}>
            <span className={generalStyles['name']}>{propertyDisplayName}</span>
            <input title={val} className={`${generalStyles['input']} ${generalStyles['text']} ${isWrongInput ? generalStyles['wrong'] : ''}`} type="text" onChange={handleChange} value={val} />
            <div
                ref={ref}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    display: 'inline-flex',
                    position: 'relative'
                }}
            >
                {tooltipContent && <MdHelpCenter size={22} style={{ marginLeft: '5px' }} />}
                {tooltipVisible && tooltipContent &&  ref?.current && tooltipContent(ref as React.MutableRefObject<HTMLDivElement>, colorMode, styles)}
            </div>
        </div>
    )
}

export default InputCssLength;