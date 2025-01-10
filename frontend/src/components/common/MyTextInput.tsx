import useDesignerStore from '../../stores/designer';
import lightStyles from './MyTextInputLight.module.css';
import darkStyles from './MyTextInputDark.module.css';
import { useState } from 'react';


type MyTextInputProps = {
    onChange: (value: string | undefined) => void,
    onKeydown?: React.KeyboardEventHandler<HTMLInputElement>,
    value: string | undefined,
    placeholder?: string,
    autoFocus?: boolean,
}

const MyTextInput = ({ onChange, onKeydown, value, placeholder, autoFocus }: MyTextInputProps) => {

    const colorMode = useDesignerStore((state) => state.colorMode);
    const styles = colorMode === 'light' ? lightStyles : darkStyles;

    const [val, setVal] = useState(value);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.currentTarget.value);
        setVal(event.currentTarget.value);
    }

    return <input
        value={val}
        onKeyDown={onKeydown}
        onChange={handleChange}
        placeholder={placeholder}
        className={`${styles.wrapper} nodrag`}
        title={val}
        autoFocus={!!autoFocus}
    />
}

export default MyTextInput;