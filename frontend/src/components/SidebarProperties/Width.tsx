import { useEffect, useState } from "react";
import PropertyGroupHeader from "../../helpers/components/PropertyGroupHeader";
import styles from './Property.module.css';
import InputText from "./InputText";
import { RxWidth } from "react-icons/rx";
import MyPortal from "../../helpers/MyPortal";
import { isValidCssLength } from "../../helpers/utils";
import useDesignerStore from "../../stores/designer";

const tooltipContent = (ref: React.MutableRefObject<HTMLDivElement>, colorMode: 'dark' | 'light', styles: CSSModuleClasses) => <MyPortal styles={{
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
                <p>none</p>
                <p>{`{{myVariable}}px`}</p>
                <p>calc(50% + 20px)</p>
                <p>min(50%, 20px)</p>
                <p>max(50%, 20px, 10%)</p>
                <p>calc(50px * 2 + min(10%, 20px))</p>
                <p>calc(50px + {`{{myVariable}}%`})</p>
            </div>
        </div>
    </div>
</MyPortal>

const Width = () => {

    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isAdv, setIsAdv] = useState(false);
    const handleChange = () => {
        setIsAdv(prev => !prev);
    };

    const expandAllProperties = useDesignerStore(state => state.expandAllProperties);

    useEffect(() => {
        if (expandAllProperties !== null) {
            setIsCollapsed(!expandAllProperties)
        }
    }, [expandAllProperties])

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
            <InputText
                propertyDisplayName={<RxWidth color="grey" size={25} title="Width" />}
                propertyKey="width"
                tooltipContent={tooltipContent}
                isValidInput={isValidCssLength}
            />
            {isAdv && <>
                <InputText
                    propertyDisplayName="Min"
                    propertyKey="minWidth"
                    tooltipContent={tooltipContent}
                    isValidInput={isValidCssLength}
                />
                <InputText
                    propertyDisplayName="Max"
                    propertyKey="maxWidth"
                    tooltipContent={tooltipContent}
                    isValidInput={isValidCssLength}
                />
            </>}

        </div>}
    </div>
}

export default Width;