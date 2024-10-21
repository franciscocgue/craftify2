import useDesignerStore from '../../stores/designer';
import lightStyles from './MyTextInputLight.module.css';
import darkStyles from './MyTextInputDark.module.css';
import { useState } from 'react';


type MyTextInputProps = {
    onChange: (value: string | undefined) => void,
    value: string | undefined,
    placeholder?: string,
}

const MyTextInput = ({ onChange, value, placeholder }: MyTextInputProps) => {

    const colorMode = useDesignerStore((state) => state.colorMode);
    const styles = colorMode === 'light' ? lightStyles : darkStyles;

    const [val, setVal] = useState(value);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.currentTarget.value);
        setVal(event.currentTarget.value);
    }

    return <input
        value={val}
        onChange={handleChange}
        placeholder={placeholder}
        className={`${styles.wrapper} nodrag`}
        title={val}
    />
}

export default MyTextInput;