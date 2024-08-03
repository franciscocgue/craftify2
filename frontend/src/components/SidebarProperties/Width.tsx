import { useState } from "react";
import PropertyGroupHeader from "../../helpers/components/PropertyGroupHeader";
import styles from './Property.module.css';
import InputCssLength from "./InputCssLength";
import { RxWidth } from "react-icons/rx";


const Width = () => {

    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isAdv, setIsAdv] = useState(false);
    const handleChange = () => {
        setIsAdv(prev => !prev);
    };

    return <div>
        <PropertyGroupHeader isCollapsed={isCollapsed} title="Width" setIsCollapsed={setIsCollapsed} />
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
            <InputCssLength propertyDisplayName={<RxWidth color="grey" size={25} title="Width" />} propertyKey="width" />
            {isAdv && <>
                <InputCssLength propertyDisplayName="Min" propertyKey="minWidth" />
                <InputCssLength propertyDisplayName="Max" propertyKey="maxWidth" />
            </>}

        </div>}
    </div>
}

export default Width;