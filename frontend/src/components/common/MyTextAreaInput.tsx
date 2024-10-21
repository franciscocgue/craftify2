import useDesignerStore from '../../stores/designer';
import lightStyles from './MyTextAreaInputLight.module.css';
import darkStyles from './MyTextAreaInputDark.module.css';
import { useState } from 'react';


type MyTextInputProps = {
    onChange: (value: string | undefined) => void,
    value: string | undefined,
    placeholder?: string,
}

const MyTextAreaInput = ({ onChange, value, placeholder }: MyTextInputProps) => {

    const colorMode = useDesignerStore((state) => state.colorMode);
    const styles = colorMode === 'light' ? lightStyles : darkStyles;

    const [val, setVal] = useState(value);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.currentTarget.value);
        setVal(event.currentTarget.value);
    }

    return <textarea
        value={val}
        onChange={handleChange}
        placeholder={placeholder}
        className={`${styles.wrapper} nodrag`}
        title={val}
        rows={4}
        spellCheck={false}
    />
}

export default MyTextAreaInput;