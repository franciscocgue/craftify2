import { useEffect, useState } from "react";
import PropertyGroupHeader from "../common/PropertyGroupHeader";
import stylesLight from './PropertyLight.module.css';
import stylesDark from './PropertyLight.module.css';
import InputText from "./InputText";
import MyPortal from "../helpers/MyPortal";
import { MdBorderColor } from "react-icons/md";
import InputColor from "./InputColor";
import useDesignerStore from "../../stores/designer";
import { FaRegImage } from "react-icons/fa6";
import ChoiceChip from "./ChoiceChip";
import { TbBoxAlignBottom, TbBoxAlignLeft, TbBoxAlignRight, TbBoxAlignTop, TbKeyframeAlignCenter } from "react-icons/tb";

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
    const colorMode = useDesignerStore(state => state.colorMode);

    const selectedId = useDesignerStore(state => state.selectedId);
    const backgroundImagePropValue = useDesignerStore((state) => state.properties[selectedId as string]?.['backgroundImage']);

    useEffect(() => {
        if (expandAllProperties !== null) {
            setIsCollapsed(!expandAllProperties)
        }
    }, [expandAllProperties])

    const styles = colorMode === 'light' ? stylesLight : stylesDark;


    return <div>
        <PropertyGroupHeader info={"Component's background styling"} isCollapsed={isCollapsed} title="Background" setIsCollapsed={setIsCollapsed} />
        {!isCollapsed && <div className={styles.wrapper}>
            <>

                {/* <p style={{ fontSize: 'small' }}>Color</p> */}
                <p style={{ marginTop: '8px', fontSize: 'small' }}>Color</p>
                <InputColor propertyDisplayName={<MdBorderColor color="grey" title="Color" size={21} />} propertyKey={['backgroundColor']} />

                {/* <hr style={{ marginTop: '10px', borderTop: '1px dashed grey', borderBottom: 'none' }}></hr> */}

                <p style={{ fontSize: 'small' }}>Image</p>
                <InputText propertyDisplayName={<FaRegImage size={21} color={'grey'} />}
                    propertyKey="backgroundImage"
                    tooltipContent={tooltipContent}
                    isValidInput={() => true}//{isValidCssLengthBasicNoAuto}
                />


                {backgroundImagePropValue?.startsWith('url(') && <><p style={{ fontSize: 'small' }}>Position</p>
                    <div style={{
                        display: 'flex',
                        gap: '10px',
                        justifyContent: 'center',
                        margin: '3px 0 17px 0',
                    }}>
                        <ChoiceChip display={<TbKeyframeAlignCenter size={18} />} valueChip="center" propertyKey="backgroundPosition"></ChoiceChip>
                        <ChoiceChip display={<TbBoxAlignTop size={18} />} valueChip="top" propertyKey="backgroundPosition"></ChoiceChip>
                        <ChoiceChip display={<TbBoxAlignRight size={18} />} valueChip="right" propertyKey="backgroundPosition"></ChoiceChip>
                        <ChoiceChip display={<TbBoxAlignBottom size={18} />} valueChip="bottom" propertyKey="backgroundPosition"></ChoiceChip>
                        <ChoiceChip display={<TbBoxAlignLeft size={18} />} valueChip="left" propertyKey="backgroundPosition"></ChoiceChip>
                    </div>
                </>}

                {/* <InputSelect propertyDisplayName={'Image position'} propertyKey={['backgroundPosition']} options={[
                    { value: 'center', display: 'Center' },
                    { value: 'top', display: 'Top' },
                    { value: 'right', display: 'Right' },
                    { value: 'bottom', display: 'Bottom' },
                    { value: 'left', display: 'Left' },
                ]} /> */}

                {backgroundImagePropValue?.startsWith('url(') && <><p style={{ fontSize: 'small' }}>Fit</p>
                    <div style={{
                        display: 'flex',
                        gap: '10px',
                        justifyContent: 'center',
                        margin: '3px 0 17px 0',
                    }}>
                        <ChoiceChip display={'Contain'} valueChip="contain" propertyKey="backgroundSize"></ChoiceChip>
                        <ChoiceChip display={'Cover'} valueChip="cover" propertyKey="backgroundSize"></ChoiceChip>
                        <ChoiceChip display={'Auto'} valueChip="auto" propertyKey="backgroundSize"></ChoiceChip>
                    </div>
                </>}

                {/* <InputSelect propertyDisplayName={'Image size'} propertyKey={['backgroundSize']} options={[
                    { value: 'contain', display: 'Contain' },
                    { value: 'cover', display: 'Cover' },
                    { value: 'auto', display: 'Auto' },
                ]} /> */}

                {backgroundImagePropValue?.startsWith('url(') && <><p style={{ fontSize: 'small' }}>Repeat</p>
                    <div style={{
                        display: 'flex',
                        gap: '10px',
                        justifyContent: 'center',
                        margin: '3px 0 17px 0',
                    }}>
                        <ChoiceChip display={'Yes'} valueChip="repeat" propertyKey="backgroundRepeat"></ChoiceChip>
                        <ChoiceChip display={'Horiz.'} valueChip="repeat-x" propertyKey="backgroundRepeat"></ChoiceChip>
                        <ChoiceChip display={'Vert.'} valueChip="repeat-y" propertyKey="backgroundRepeat"></ChoiceChip>
                        <ChoiceChip display={'Tile'} valueChip="space" propertyKey="backgroundRepeat"></ChoiceChip>
                        <ChoiceChip display={'No'} valueChip="no-repeat" propertyKey="backgroundRepeat"></ChoiceChip>
                    </div>
                </>}

                {/* <InputSelect propertyDisplayName={'Image repeat'} propertyKey={['backgroundRepeat']} options={[
                    { value: 'repeat', display: 'Repeat' },
                    { value: 'repeat-x', display: 'Repeat horizontally' },
                    { value: 'repeat-y', display: 'Repeat vertically' },
                    { value: 'space', display: 'Repeat (no clipping)' },
                    { value: 'no-repeat', display: 'No repeat' },
                ]} /> */}

                {/* <InputText propertyDisplayName={'Color'}
                    propertyKey="backgroundColor"
                    // tooltipContent={tooltipContent}
                    isValidInput={() => true}//{isValidCssLengthBasicNoAuto}
                /> */}

                {backgroundImagePropValue?.startsWith('url(') && <><p style={{ fontSize: 'small' }}>Move on scroll</p>
                    <div style={{
                        display: 'flex',
                        gap: '10px',
                        justifyContent: 'center',
                        margin: '3px 0 17px 0',
                    }}>
                        <ChoiceChip display={'Static'} valueChip="fixed" propertyKey="backgroundAttachment"></ChoiceChip>
                        <ChoiceChip display={'Moving'} valueChip="scroll" propertyKey="backgroundAttachment"></ChoiceChip>
                    </div>
                </>}

                {/* 
                <InputSelect propertyDisplayName={'Image flow'} propertyKey={['backgroundAttachment']} options={[
                    { value: 'scroll', display: 'Scroll' },
                    { value: 'fixed', display: 'Fixed' },
                ]} /> */}
            </>
        </div>
        }
    </div >
}

export default Background;