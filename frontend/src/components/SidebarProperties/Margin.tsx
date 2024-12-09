import { useEffect, useState } from "react";
import PropertyGroupHeader from "../common/PropertyGroupHeader";
import stylesLight from './PropertyLight.module.css';
import stylesDark from './PropertyDark.module.css';
import InputText from "./InputText";
import MyPortal from "../helpers/MyPortal";
import { isValidCssLengthBasic } from "../../utils";
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
                <p>auto</p>
                <p>{`{{myVariable}}px`}</p>
            </div>
        </div>
    </div>
</MyPortal>

const Margin = () => {

    const [isCollapsed, setIsCollapsed] = useState(true);
    const colorMode = useDesignerStore(state => state.colorMode);
    const styles = colorMode === 'light' ? stylesLight : stylesDark;

    const expandAllProperties = useDesignerStore(state => state.expandAllProperties);

    useEffect(() => {
        if (expandAllProperties !== null) {
            setIsCollapsed(!expandAllProperties)
        }
    }, [expandAllProperties])

    return <div>
        <PropertyGroupHeader info={"Component's margin styling"} isCollapsed={isCollapsed} title="Margin" setIsCollapsed={setIsCollapsed} />
        {!isCollapsed && <div className={styles.wrapper}>
            <>
                <InputText propertyDisplayName={
                    <div
                        key={'margin-top'}
                        title="Top"
                        style={{ width: '26px', height: '17px', border: '1px solid grey', borderTop: '5px solid grey' }}
                    ></div>}
                    propertyKey="marginTop"
                    tooltipContent={tooltipContent}
                    isValidInput={isValidCssLengthBasic}
                />
                <InputText propertyDisplayName={
                    <div
                        key={'margin-right'}
                        title="Right"
                        style={{ width: '26px', height: '17px', border: '1px solid grey', borderRight: '5px solid grey' }}
                    ></div>}
                    propertyKey="marginRight"
                    tooltipContent={tooltipContent}
                    isValidInput={isValidCssLengthBasic}
                />
                <InputText propertyDisplayName={
                    <div
                        key={'margin-bottom'}
                        title="Bottom"
                        style={{ width: '26px', height: '17px', border: '1px solid grey', borderBottom: '5px solid grey' }}
                    ></div>}
                    propertyKey="marginBottom"
                    tooltipContent={tooltipContent}
                    isValidInput={isValidCssLengthBasic}
                />
                <InputText propertyDisplayName={
                    <div
                        key={'margin-left'}
                        title="Left"
                        style={{ width: '26px', height: '17px', border: '1px solid grey', borderLeft: '5px solid grey' }}
                    ></div>}
                    propertyKey="marginLeft"
                    tooltipContent={tooltipContent}
                    isValidInput={isValidCssLengthBasic}
                />
            </>
        </div>}
    </div>
}

export default Margin;