import { useState } from "react";
import PropertyGroupHeader from "../../helpers/components/PropertyGroupHeader";
import styles from './Property.module.css';
import InputCssLength from "./InputCssLength";
import { RxHeight } from "react-icons/rx";


const Height = () => {

    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isAdv, setIsAdv] = useState(false);
    const handleChange = () => {
        setIsAdv(prev => !prev);
    };

    return <div>
        <PropertyGroupHeader isCollapsed={isCollapsed} title="Height" setIsCollapsed={setIsCollapsed} />
        {!isCollapsed && <div className={styles.wrapper}>
            <label style={{ fontSize: 'small' }}>
                <input
                    type="checkbox"
                    checked={isAdv}
                    onChange={handleChange}
                    style={{ marginRight: '5px' }}
                />
                Advanced
            </label>
            <InputCssLength propertyDisplayName={<RxHeight color="grey" size={25} title="Height" />} propertyKey="height" />
            {isAdv && <>
                <InputCssLength propertyDisplayName="Min" propertyKey="minHeight" />
                <InputCssLength propertyDisplayName="Max" propertyKey="maxHeight" />
            </>}

        </div>}
    </div>
}

export default Height;