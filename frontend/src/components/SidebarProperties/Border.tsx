import { useState } from "react";
import PropertyGroupHeader from "../../helpers/components/PropertyGroupHeader";
import styles from './Property.module.css';


const Border = () => {

    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isAdv, setIsAdv] = useState(false);
    const handleChange = () => {
        setIsAdv(prev => !prev);
    };

    return <div>
        <PropertyGroupHeader info={"Component's border styling"} isCollapsed={isCollapsed} title="Border" setIsCollapsed={setIsCollapsed} />
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
            {!isAdv && <>
                <div className={styles['property']}>
                    <span className={styles['name']}>Color</span><input className={styles['input']} type="color" />
                </div>
                <div className={styles['property']}>
                    <span className={styles['name']}>Width</span>
                    <input className={`${styles['input']} ${styles['number']}`} type="number" min={0} step={1} />
                    <span className={styles.unit}>px</span>
                </div>
                <div className={styles['property']}>
                    <span className={styles['name']}>Style</span><select className={styles['input']}>
                        <option value="none">none</option>
                        <option value="dotted">dotted</option>
                        <option value="dashed">dashed</option>
                        <option value="solid">solid</option>
                    </select>
                </div>
            </>}
            {isAdv && <>
                <p className={styles['side-header']}>Top</p>
                <div className={styles['property']}>
                    <span className={styles['name']}>Color</span><input className={styles['input']} type="color" />
                </div>
                <div className={styles['property']}>
                    <span className={styles['name']}>Width</span>
                    <input className={`${styles['input']} ${styles['number']}`} type="number" min={0} step={1} />
                    <span className={styles.unit}>px</span>
                </div>
                <div className={styles['property']}>
                    <span className={styles['name']}>Style</span><select className={styles['input']}>
                        <option value="none">none</option>
                        <option value="dotted">dotted</option>
                        <option value="dashed">dashed</option>
                        <option value="solid">solid</option>
                    </select>
                </div>
                <p className={styles['side-header']}>Right</p>
                <div className={styles['property']}>
                    <span className={styles['name']}>Color</span><input className={styles['input']} type="color" />
                </div>
                <div className={styles['property']}>
                    <span className={styles['name']}>Width</span>
                    <input className={`${styles['input']} ${styles['number']}`} type="number" min={0} step={1} />
                    <span className={styles.unit}>px</span>
                </div>
                <div className={styles['property']}>
                    <span className={styles['name']}>Style</span><select className={styles['input']}>
                        <option value="none">none</option>
                        <option value="dotted">dotted</option>
                        <option value="dashed">dashed</option>
                        <option value="solid">solid</option>
                    </select>
                </div>
                <p className={styles['side-header']}>Bottom</p>
                <div className={styles['property']}>
                    <span className={styles['name']}>Color</span><input className={styles['input']} type="color" />
                </div>
                <div className={styles['property']}>
                    <span className={styles['name']}>Width</span>
                    <input className={`${styles['input']} ${styles['number']}`} type="number" min={0} step={1} />
                    <span className={styles.unit}>px</span>
                </div>
                <div className={styles['property']}>
                    <span className={styles['name']}>Style</span><select className={styles['input']}>
                        <option value="none">none</option>
                        <option value="dotted">dotted</option>
                        <option value="dashed">dashed</option>
                        <option value="solid">solid</option>
                    </select>
                </div>
                <p className={styles['side-header']}>Left</p>
                <div className={styles['property']}>
                    <span className={styles['name']}>Color</span><input className={styles['input']} type="color" />
                </div>
                <div className={styles['property']}>
                    <span className={styles['name']}>Width</span>
                    <input className={`${styles['input']} ${styles['number']}`} type="number" min={0} step={1} />
                    <span className={styles.unit}>px</span>
                </div>
                <div className={styles['property']}>
                    <span className={styles['name']}>Style</span><select className={styles['input']}>
                        <option value="none">none</option>
                        <option value="dotted">dotted</option>
                        <option value="dashed">dashed</option>
                        <option value="solid">solid</option>
                    </select>
                </div>
            </>}
        </div>}
    </div>
}

export default Border;