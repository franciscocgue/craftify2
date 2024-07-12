import { useState } from "react";
import useDesignerStore from "../../stores/designer";

const MyInput = ({componentId, name, val}) => {

    const updateProperty = useDesignerStore((state) => state.updateProperty);

    const [value, setValue] = useState(val || '');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        updateProperty(componentId, name, event.target.value)
    };

    return (
        <>
            <p>{name}</p>
            <input
                placeholder={name}
                value={value}
                onChange={handleChange}
            />
        </>
    )
}

export default MyInput;