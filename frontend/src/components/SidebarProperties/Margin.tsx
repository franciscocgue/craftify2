import { useState } from "react";
import PropertyGroupHeader from "../../helpers/components/PropertyGroupHeader";
import styles from './Property.module.css';


const Margin = () => {

    const [isCollapsed, setIsCollapsed] = useState(true);

    const [unitTop, setUnitTop] = useState<'px' | '%'>('px')
    const [unitLeft, setUnitLeft] = useState<'px' | '%'>('px')
    const [unitRight, setUnitRight] = useState<'px' | '%'>('px')
    const [unitBottom, setUnitBottom] = useState<'px' | '%'>('px')

    return <div>
        <PropertyGroupHeader info={"Component's margin styling"} isCollapsed={isCollapsed} title="Margin" setIsCollapsed={setIsCollapsed} />
        {!isCollapsed && <div className={styles.wrapper}>
            <>
                <div className={styles['property']}>
                    <span className={styles['name']}>Top</span>
                    <input className={`${styles['input']} ${styles['number']}`} type="number" min={0} step={1} />
                    <div className={styles['unit-block']}>
                        <button className={styles[`${unitTop === 'px' ? 'active' : ''}`]} onClick={() => setUnitTop('px')}>px</button>
                        <button className={styles[`${unitTop === '%' ? 'active' : ''}`]} onClick={() => setUnitTop('%')}>%</button>
                    </div>
                </div>
                <div className={styles['property']}>
                    <span className={styles['name']}>Right</span>
                    <input className={`${styles['input']} ${styles['number']}`} type="number" min={0} step={1} />
                    <div className={styles['unit-block']}>
                        <button className={styles[`${unitRight === 'px' ? 'active' : ''}`]} onClick={() => setUnitRight('px')}>px</button>
                        <button className={styles[`${unitRight === '%' ? 'active' : ''}`]} onClick={() => setUnitRight('%')}>%</button>
                    </div>
                </div>
                <div className={styles['property']}>
                    <span className={styles['name']}>Left</span>
                    <input className={`${styles['input']} ${styles['number']}`} type="number" min={0} step={1} />
                    <div className={styles['unit-block']}>
                        <button className={styles[`${unitLeft === 'px' ? 'active' : ''}`]} onClick={() => setUnitLeft('px')}>px</button>
                        <button className={styles[`${unitLeft === '%' ? 'active' : ''}`]} onClick={() => setUnitLeft('%')}>%</button>
                    </div>
                </div>
                <div className={styles['property']}>
                    <span className={styles['name']}>Bottom</span>
                    <input className={`${styles['input']} ${styles['number']}`} type="number" min={0} step={1} />
                    <div className={styles['unit-block']}>
                        <button className={styles[`${unitBottom === 'px' ? 'active' : ''}`]} onClick={() => setUnitBottom('px')}>px</button>
                        <button className={styles[`${unitBottom === '%' ? 'active' : ''}`]} onClick={() => setUnitBottom('%')}>%</button>
                    </div>
                </div>
            </>
        </div>}
    </div>
}

export default Margin;