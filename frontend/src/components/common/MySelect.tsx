import { useState } from 'react';
import styles from './MySelect.module.css';

type MySelectProps = {
    options: {
        value: string,
        label: string
    }[],
    onChange: (value: string) => void,
    initialValue?: string,
}

const MySelect = ({ options, onChange, initialValue }: MySelectProps) => {

    const [value, setValue] = useState(initialValue);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.currentTarget.value);
        setValue(event.currentTarget.value);
    }
    
    return (
        <select className={`${styles.wrapper} nodrag`} value={value} onChange={handleChange}>
            {options.map(opt => <option key={opt.value} value={opt.value}>
                {opt.label}
            </option>)}
        </select>
    )
};

export default MySelect;