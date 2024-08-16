import { useEffect, useState } from "react";
import PropertyGroupHeader from "../../helpers/components/PropertyGroupHeader";
import styles from './Property.module.css';
import InputText from "./InputText";
import MyPortal from "../../helpers/MyPortal";
import InputSelect from "./InputSelect";
import { isValidCssLengthBasicNoAuto } from "../../helpers/utils";
import useDesignerStore from "../../stores/designer";

const tooltipContent = (ref: React.MutableRefObject<HTMLDivElement>, colorMode: 'dark' | 'light', styles: CSSModuleClasses) => <MyPortal styles={{
    position: 'absolute',
    width: '280px',
    height: '140px', // trial and error; hard-coded to use below and not using other ref
    backgroundColor: colorMode === 'dark' ? 'white' : 'black',
    color: colorMode === 'dark' ? 'black' : 'white',
    borderRadius: '5px',
    padding: '10px 5px',
    fontSize: 'small',
    border: colorMode === 'dark' ? '1px solid grey' : '1px solid white',
    top: ref.current.getBoundingClientRect().bottom + ref.current.getBoundingClientRect().top + window.scrollY > window.innerHeight
        ? ref.current.getBoundingClientRect().top - 140 + window.scrollY + ref.current.getBoundingClientRect().height + 10
        : ref.current.getBoundingClientRect().bottom + window.scrollY - ref.current.getBoundingClientRect().height - 10,
    left: ref.current.getBoundingClientRect().left - 280,
}}>
    <div className={styles['tooltip']}>
        <div>
            <p className={styles['header']}>Info</p>
            <div className={styles['main']}>
                <p className={styles['sub-header']}>Units</p>
                <p style={{ marginLeft: '20px', marginBottom: '0px' }}>px, %</p>
                <p className={styles['sub-header']}>Dynamic variables</p>
                <p style={{ marginLeft: '20px', marginBottom: '0px' }}>{`{{myVariable}}`}</p>
            </div>
        </div>
        <div>
            <p className={styles['header']}>Examples</p>
            <div className={styles['main']}>
                <p>100%</p>
                <p>50px</p>
                <p>{`{{myVariable}}px`}</p>
            </div>
        </div>
    </div>
</MyPortal>

// flexDirection?: 'column' | 'row',  // not editable (at least in canvas)
// gap?: string,
// flexWrap?: 'nowrap' | 'wrap',
// alignItems?: string,
// justifyContent?: string,

const Layout = () => {

    const [isCollapsed, setIsCollapsed] = useState(true);

    const expandAllProperties = useDesignerStore(state => state.expandAllProperties);

    useEffect(() => {
        if (expandAllProperties !== null) {
            setIsCollapsed(!expandAllProperties)
        }
    }, [expandAllProperties])

    return <div>
        <PropertyGroupHeader info={"Component's layout styling"} isCollapsed={isCollapsed} title="Layout" setIsCollapsed={setIsCollapsed} />
        {!isCollapsed && <div className={styles.wrapper}>
            <>
                <InputSelect propertyDisplayName={'Direction'} propertyKey={['flexDirection']} options={[
                    { value: 'row', display: 'Row' },
                    { value: 'column', display: 'Column' },
                ]} />
                <InputText propertyDisplayName={'Gap'}
                    propertyKey="gap"
                    tooltipContent={tooltipContent}
                    isValidInput={isValidCssLengthBasicNoAuto}
                />
                <InputSelect propertyDisplayName={'Wrap'} propertyKey={['flexWrap']} options={[
                    { value: 'wrap', display: 'Wrap' },
                    { value: 'nowrap', display: 'No Wrap' },
                ]} />
                <InputSelect propertyDisplayName={'Alignment'} propertyKey={['alignItems']} options={[
                    { value: 'stretch', display: 'Stretch' },
                    { value: 'center', display: 'Center' },
                    { value: 'flex-start', display: 'Start' },
                    { value: 'flex-end', display: 'End' },
                ]} />
                <InputSelect propertyDisplayName={'Distribution'} propertyKey={['justifyContent']} options={[
                    { value: 'center', display: 'Center' },
                    { value: 'flex-start', display: 'Start' },
                    { value: 'flex-end', display: 'End' },
                    { value: 'space-between', display: 'Space between' },
                    { value: 'space-around', display: 'Space around' },
                    { value: 'space-evenly', display: 'Space evenly' },
                ]} />
            </>
        </div>}
    </div>
}

export default Layout;