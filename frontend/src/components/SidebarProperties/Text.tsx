import { useEffect, useState } from "react";
import PropertyGroupHeader from "../../helpers/components/PropertyGroupHeader";
import styles from './Property.module.css';
import InputText from "./InputText";
import MyPortal from "../../helpers/MyPortal";
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
            </div>
        </div>
    </div>
</MyPortal>


const Text = () => {

    const [isCollapsed, setIsCollapsed] = useState(true);

    const expandAllProperties = useDesignerStore(state => state.expandAllProperties);

    useEffect(() => {
        if (expandAllProperties !== null) {
            setIsCollapsed(!expandAllProperties)
        }
    }, [expandAllProperties])

    return <div>
        <PropertyGroupHeader info={"Component's text styling"} isCollapsed={isCollapsed} title="Text" setIsCollapsed={setIsCollapsed} />
        {!isCollapsed && <div className={styles.wrapper}>
            <>
                <InputColor propertyDisplayName={<MdBorderColor color="grey" title="Color" size={25} />} propertyKey={['color']} />
                <InputSelect propertyDisplayName={'Boldness'} propertyKey={['fontWeight']} options={[
                    { value: 'normal', display: 'Normal' },
                    { value: 'bold', display: 'Bold' },
                    // { value: 'lighter', display: 'Lighter' },
                ]} />
                <InputSelect propertyDisplayName={'Style'} propertyKey={['fontStyle']} options={[
                    { value: 'normal', display: 'Normal' },
                    { value: 'italic', display: 'Italic' },
                ]} />
            </>
        </div>}
    </div>
}

export default Text;