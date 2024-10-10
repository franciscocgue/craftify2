import { useEffect, useState } from "react";
import PropertyGroupHeader from "../common/PropertyGroupHeader";
import styles from './Property.module.css';
import InputText from "./InputText";
import MyPortal from "../helpers/MyPortal";
import InputSelect from "./InputSelect";
import { MdBorderColor } from "react-icons/md";
import InputColor from "./InputColor";
import useDesignerStore from "../../stores/designer";

const tooltipContent = (ref: React.MutableRefObject<HTMLDivElement>, colorMode: 'dark' | 'light', styles: CSSModuleClasses) => <MyPortal styles={{
    position: 'absolute',
    width: '420px',
    height: '135px', // trial and error; hard-coded to use below and not using other ref
    backgroundColor: colorMode === 'dark' ? 'white' : 'black',
    color: colorMode === 'dark' ? 'black' : 'white',
    borderRadius: '5px',
    padding: '10px 5px',
    fontSize: 'small',
    border: colorMode === 'dark' ? '1px solid grey' : '1px solid white',
    top: ref.current.getBoundingClientRect().bottom + ref.current.getBoundingClientRect().top + window.scrollY > window.innerHeight
        ? ref.current.getBoundingClientRect().top - 135 + window.scrollY + ref.current.getBoundingClientRect().height + 10
        : ref.current.getBoundingClientRect().bottom + window.scrollY - ref.current.getBoundingClientRect().height - 10,
    left: ref.current.getBoundingClientRect().left - 420,
}}>
    <div className={styles['tooltip']}>
        <div>
            <p className={styles['header']}>Info</p>
            <div className={styles['main']}>
                <p className={styles['sub-header']}>Operations</p>
                <p style={{ marginLeft: '20px', marginBottom: '0px' }}>url(), linear-gradient()</p>
                <p className={styles['sub-header']}>Note</p>
                <p style={{ marginLeft: '20px', marginBottom: '0px' }}>Image overlaps color</p>
            </div>
        </div>
        <div>
            <p className={styles['header']}>Examples</p>
            <div className={styles['main']}>
                <p>linear-gradient(white, blue)</p>
                <p>url(https://picsum.photos/id/114/200/300)</p>
                <p>none</p>
            </div>
        </div>
    </div>
</MyPortal>


const Background = () => {

    const [isCollapsed, setIsCollapsed] = useState(true);

    const expandAllProperties = useDesignerStore(state => state.expandAllProperties);

    useEffect(() => {
        if (expandAllProperties !== null) {
            setIsCollapsed(!expandAllProperties)
        }
    }, [expandAllProperties])


    return <div>
        <PropertyGroupHeader info={"Component's background styling"} isCollapsed={isCollapsed} title="Background" setIsCollapsed={setIsCollapsed} />
        {!isCollapsed && <div className={styles.wrapper}>
            <>
                <InputColor propertyDisplayName={<MdBorderColor color="grey" title="Color" size={25} />} propertyKey={['backgroundColor']} />
                <hr style={{ marginTop: '10px', borderTop: '1px dashed grey', borderBottom: 'none' }}></hr>
                <InputText propertyDisplayName={'Image'}
                    propertyKey="backgroundImage"
                    tooltipContent={tooltipContent}
                    isValidInput={() => true}//{isValidCssLengthBasicNoAuto}
                />
                <InputSelect propertyDisplayName={'Image position'} propertyKey={['backgroundPosition']} options={[
                    { value: 'center', display: 'Center' },
                    { value: 'top', display: 'Top' },
                    { value: 'right', display: 'Right' },
                    { value: 'bottom', display: 'Bottom' },
                    { value: 'left', display: 'Left' },
                ]} />
                <InputSelect propertyDisplayName={'Image size'} propertyKey={['backgroundSize']} options={[
                    { value: 'contain', display: 'Contain' },
                    { value: 'cover', display: 'Cover' },
                    { value: 'auto', display: 'Auto' },
                ]} />
                <InputSelect propertyDisplayName={'Image repeat'} propertyKey={['backgroundRepeat']} options={[
                    { value: 'repeat', display: 'Repeat' },
                    { value: 'repeat-x', display: 'Repeat horizontally' },
                    { value: 'repeat-y', display: 'Repeat vertically' },
                    { value: 'space', display: 'Repeat (no clipping)' },
                    { value: 'no-repeat', display: 'No repeat' },
                ]} />
                {/* <InputText propertyDisplayName={'Color'}
                    propertyKey="backgroundColor"
                    // tooltipContent={tooltipContent}
                    isValidInput={() => true}//{isValidCssLengthBasicNoAuto}
                /> */}
                <InputSelect propertyDisplayName={'Image flow'} propertyKey={['backgroundAttachment']} options={[
                    { value: 'scroll', display: 'Scroll' },
                    { value: 'fixed', display: 'Fixed' },
                ]} />
            </>
        </div>}
    </div>
}

export default Background;