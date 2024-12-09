import { useEffect, useState } from "react";
import PropertyGroupHeader from "../common/PropertyGroupHeader";
import stylesLight from './PropertyLight.module.css';
import stylesDark from './PropertyDark.module.css';
// import InputText from "./InputText";
// import MyPortal from "../../helpers/MyPortal";
import { MdBorderColor } from "react-icons/md";
import InputColor from "./InputColor";
import useDesignerStore from "../../stores/designer";
import ChoiceChip from "./ChoiceChip";
import { FaAlignCenter, FaAlignJustify, FaAlignLeft, FaAlignRight } from "react-icons/fa6";

// const tooltipContent = (ref: React.MutableRefObject<HTMLDivElement>, colorMode: 'dark' | 'light', styles: CSSModuleClasses) => <MyPortal styles={{
//     position: 'absolute',
//     width: '420px',
//     height: '135px', // trial and error; hard-coded to use below and not using other ref
//     backgroundColor: colorMode === 'dark' ? 'white' : 'black',
//     color: colorMode === 'dark' ? 'black' : 'white',
//     borderRadius: '5px',
//     padding: '10px 5px',
//     fontSize: 'small',
//     border: colorMode === 'dark' ? '1px solid grey' : '1px solid white',
//     top: ref.current.getBoundingClientRect().bottom + ref.current.getBoundingClientRect().top + window.scrollY > window.innerHeight
//         ? ref.current.getBoundingClientRect().top - 135 + window.scrollY + ref.current.getBoundingClientRect().height + 10
//         : ref.current.getBoundingClientRect().bottom + window.scrollY - ref.current.getBoundingClientRect().height - 10,
//     left: ref.current.getBoundingClientRect().left - 420,
// }}>
//     <div className={styles['tooltip']}>
//         <div>
//             <p className={styles['header']}>Info</p>
//             <div className={styles['main']}>
//                 <p className={styles['sub-header']}>Operations</p>
//                 <p style={{ marginLeft: '20px', marginBottom: '0px' }}>url(), linear-gradient()</p>
//                 <p className={styles['sub-header']}>Note</p>
//                 <p style={{ marginLeft: '20px', marginBottom: '0px' }}>Image overlaps color</p>
//             </div>
//         </div>
//         <div>
//             <p className={styles['header']}>Examples</p>
//             <div className={styles['main']}>
//                 <p>linear-gradient(white, blue)</p>
//                 <p>url(https://picsum.photos/id/114/200/300)</p>
//                 <p>none</p>
//             </div>
//         </div>
//     </div>
// </MyPortal>


const Text = () => {

    const [isCollapsed, setIsCollapsed] = useState(true);

    const expandAllProperties = useDesignerStore(state => state.expandAllProperties);

    useEffect(() => {
        if (expandAllProperties !== null) {
            setIsCollapsed(!expandAllProperties)
        }
    }, [expandAllProperties])

    const colorMode = useDesignerStore(state => state.colorMode);
    const styles = colorMode === 'light' ? stylesLight : stylesDark;

    return <div>
        <PropertyGroupHeader info={"Component's text styling"} isCollapsed={isCollapsed} title="Text" setIsCollapsed={setIsCollapsed} />
        {!isCollapsed && <div className={styles.wrapper}>
            <>
                <p style={{ marginTop: '8px', fontSize: 'small' }}>Color</p>
                <InputColor propertyDisplayName={<MdBorderColor color="grey" title="Color" size={21} />} propertyKey={['color']} />

                <p style={{ marginTop: '8px', fontSize: 'small' }}>Weight</p>
                <div style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center',
                    margin: '3px 0 17px 0',
                }}>
                    <ChoiceChip display={'Normal'} valueChip="normal" propertyKey="fontWeight"></ChoiceChip>
                    <ChoiceChip display={<span style={{ fontWeight: 'bold' }}>Bold</span>} valueChip="bold" propertyKey="fontWeight"></ChoiceChip>
                    <ChoiceChip display={<span style={{ fontWeight: '900' }}>Bolder</span>} valueChip="900" propertyKey="fontWeight"></ChoiceChip>
                </div>

                <p style={{ marginTop: '8px', fontSize: 'small' }}>Style</p>
                <div style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center',
                    margin: '3px 0 17px 0',
                }}>
                    <ChoiceChip display={'Normal'} valueChip="normal" propertyKey="fontStyle"></ChoiceChip>
                    <ChoiceChip display={<i>Italic</i>} valueChip="italic" propertyKey="fontStyle"></ChoiceChip>
                </div>

                <p style={{ fontSize: 'small' }}>Align</p>
                <div style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center',
                    margin: '3px 0 17px 0',
                }}>
                    <ChoiceChip display={<FaAlignLeft size={16} />} valueChip="start" propertyKey="textAlign"></ChoiceChip>
                    <ChoiceChip display={<FaAlignCenter size={16} />} valueChip="center" propertyKey="textAlign"></ChoiceChip>
                    <ChoiceChip display={<FaAlignRight size={16} />} valueChip="end" propertyKey="textAlign"></ChoiceChip>
                    <ChoiceChip display={<FaAlignJustify size={16} />} valueChip="justify" propertyKey="textAlign"></ChoiceChip>
                </div>

                {/* <InputSelect propertyDisplayName={'Boldness'} propertyKey={['fontWeight']} options={[
                    { value: 'normal', display: 'Normal' },
                    { value: 'bold', display: 'Bold' },
                    // { value: 'lighter', display: 'Lighter' },
                ]} />
                <InputSelect propertyDisplayName={'Style'} propertyKey={['fontStyle']} options={[
                    { value: 'normal', display: 'Normal' },
                    { value: 'italic', display: 'Italic' },
                ]} />
                <InputSelect propertyDisplayName={'Align'} propertyKey={['textAlign']} options={[
                    { value: 'start', display: 'Start' },
                    { value: 'end', display: 'End' },
                    { value: 'center', display: 'Center' },
                    { value: 'justify', display: 'Justify' },
                ]} /> */}
            </>
        </div>}
    </div>
}

export default Text;