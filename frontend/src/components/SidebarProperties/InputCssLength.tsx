import { ReactElement, useCallback, useRef, useState } from 'react';
import generalStyles from './Property.module.css';
import styles from './InputCssLength.module.css';
import useDesignerStore from '../../stores/designer';
import { debounce } from 'lodash';
import { isValidCssLength } from '../../helpers/utils';
import { MdHelpCenter } from 'react-icons/md';
import MyPortal from '../../helpers/MyPortal';


type InputCssLengthProps = {
    propertyDisplayName: string | ReactElement,
    propertyKey: string,
}

const InputCssLength = ({ propertyDisplayName, propertyKey }: InputCssLengthProps) => {

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
        <div className={generalStyles['property']}>
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
                <MdHelpCenter size={22} style={{ marginLeft: '5px' }} />
                {tooltipVisible && ref?.current && <MyPortal styles={{
                    position: 'absolute',
                    width: '400px',
                    height: '240px', // trial and error; hard-coded to use below and not using other ref
                    backgroundColor: colorMode === 'dark' ? 'white' : 'black',
                    color: colorMode === 'dark' ? 'black' : 'white',
                    borderRadius: '5px',
                    padding: '10px 5px',
                    fontSize: 'small',
                    border: colorMode === 'dark' ? '1px solid grey' : '1px solid white',
                    top: ref.current.getBoundingClientRect().bottom + ref.current.getBoundingClientRect().top + window.scrollY > window.innerHeight
                        ? ref.current.getBoundingClientRect().top - 240 + window.scrollY + ref.current.getBoundingClientRect().height + 10
                        : ref.current.getBoundingClientRect().bottom + window.scrollY - ref.current.getBoundingClientRect().height - 10,
                    left: ref.current.getBoundingClientRect().left - 400,
                }}>
                    <div className={styles['tooltip']}>
                        <div>
                            <p className={styles['header']}>Info</p>
                            <div className={styles['main']}>
                                <p className={styles['sub-header']}>Units</p>
                                <p style={{ marginLeft: '20px', marginBottom: '10px' }}>px, %</p>
                                <p className={styles['sub-header']}><a href='https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Functions#math_functions' target='_blank'>Operations</a></p>
                                <p style={{ marginLeft: '20px', marginBottom: '10px' }}>calc(), max(), min()</p>
                                <p className={styles['sub-header']}>Dynamic variables</p>
                                <p style={{ marginLeft: '20px', marginBottom: '10px' }}>{`{{myVariable}}`}</p>
                            </div>
                        </div>
                        <div>
                            <p className={styles['header']}>Examples</p>
                            <div className={styles['main']}>
                                <p>100%</p>
                                <p>50px</p>
                                <p>auto</p>
                                <p>{`{{myVariable}}px`}</p>
                                <p>calc(50% + 20px)</p>
                                <p>min(50%, 20px)</p>
                                <p>max(50%, 20px, 10%)</p>
                                <p>calc(50px * 2 + min(10%, 20px))</p>
                                <p>calc(50px + {`{{myVariable}}%`})</p>
                            </div>
                        </div>
                    </div>
                </MyPortal>}
            </div>
        </div>
    )
}

export default InputCssLength;