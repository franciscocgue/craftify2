import { useEffect, useState } from "react";
import PropertyGroupHeader from "../common/PropertyGroupHeader";
import generalStylesLight from './PropertyLight.module.css';
import generalStylesDark from './PropertyDark.module.css';
import { RxBorderDashed, RxBorderDotted, RxBorderSolid } from "react-icons/rx";
import InputColor from "./InputColor";
import { MdBorderColor } from "react-icons/md";
import useDesignerStore from "../../stores/designer";
import MyPortal from "../helpers/MyPortal";
import InputText from "./InputText";
import { isValidCssLengthBasicNoAuto } from "../../utils";
import { BiBorderRadius } from "react-icons/bi";
import ChoiceChip from "./ChoiceChip";
import { PiEmptyBold } from "react-icons/pi";
import { Properties } from "../../types/designer.types";

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

const getMode = (componentProperties: Properties) => {

    const topStyle = componentProperties?.['borderTopStyle'];
    const bottomStyle = componentProperties?.['borderBottomStyle'];
    const leftStyle = componentProperties?.['borderLeftStyle'];
    const rightStyle = componentProperties?.['borderRightStyle'];

    const topWidth = componentProperties?.['borderTopWidth'];
    const bottomWidth = componentProperties?.['borderBottomWidth'];
    const leftWidth = componentProperties?.['borderLeftWidth'];
    const rightWidth = componentProperties?.['borderRightWidth'];

    const topColor = componentProperties?.['borderTopColor'];
    const bottomColor = componentProperties?.['borderBottomColor'];
    const leftColor = componentProperties?.['borderLeftColor'];
    const rightColor = componentProperties?.['borderRightColor'];

    if (topStyle === 'none' && rightStyle === 'none' && bottomStyle === 'none' && leftStyle === 'none') {
        // no borders
        return 'no-border';
    };

    if (topStyle === rightStyle && rightStyle === bottomStyle && bottomStyle === leftStyle
        && topWidth === rightWidth && rightWidth === bottomWidth && bottomWidth === leftWidth
        && topColor === rightColor && rightColor === bottomColor && bottomColor === leftColor
    ) {
        return 'single-border';
    };

    return 'four-borders';
}


const Border = () => {

    const selectedId = useDesignerStore(state => state.selectedId);
    const expandAllProperties = useDesignerStore(state => state.expandAllProperties);
    const updateProperty = useDesignerStore(state => state.updateProperty);
    const colorMode = useDesignerStore(state => state.colorMode);

    const generalStyles = colorMode === 'light' ? generalStylesLight : generalStylesDark;


    // const compBorder = useDesignerStore.getState().properties[selectedId as string];
    const compProps = useDesignerStore(state => state.properties[selectedId as string]);

    const [isAdv, setIsAdv] = useState(getMode(compProps) === 'four-borders'); // default to true to avoid overwriting single-border props on open
    const handleChange = () => { setIsAdv(prev => !prev) }

    // useEffect(() => {
    //     setBorderMode(getMode(compProps))
    // }, [compProps])


    // // Getting non-reactive fresh state
    // const borderTopColor = useDesignerStore.getState().properties[selectedId as string]?.['borderTopColor'];
    // const borderTopWidth = useDesignerStore.getState().properties[selectedId as string]?.['borderTopWidth'];
    // const borderTopStyle = useDesignerStore.getState().properties[selectedId as string]?.['borderTopStyle'];


    const [isCollapsed, setIsCollapsed] = useState(true);
    // const [isAdv, setIsAdv] = useState(false);
    // const handleChange = () => {
    //     setIsAdv(prev => !prev);
    // };


    // const [forceRender, setForceRender] = useState(false);

    useEffect(() => {
        if (!isAdv) {
            // const [forceRender, setForceRender] = useState(false);

            updateProperty(selectedId as string, {
                borderRightColor: useDesignerStore.getState().properties[selectedId as string]?.['borderTopColor'],
                borderRightWidth: useDesignerStore.getState().properties[selectedId as string]?.['borderTopWidth'],
                borderRightStyle: useDesignerStore.getState().properties[selectedId as string]?.['borderTopStyle'],
                borderBottomColor: useDesignerStore.getState().properties[selectedId as string]?.['borderTopColor'],
                borderBottomWidth: useDesignerStore.getState().properties[selectedId as string]?.['borderTopWidth'],
                borderBottomStyle: useDesignerStore.getState().properties[selectedId as string]?.['borderTopStyle'],
                borderLeftColor: useDesignerStore.getState().properties[selectedId as string]?.['borderTopColor'],
                borderLeftWidth: useDesignerStore.getState().properties[selectedId as string]?.['borderTopWidth'],
                borderLeftStyle: useDesignerStore.getState().properties[selectedId as string]?.['borderTopStyle'],
            });
        }
    }, [isAdv])


    useEffect(() => {
        if (expandAllProperties !== null) {
            setIsCollapsed(!expandAllProperties)
        }
    }, [expandAllProperties])


    return <div>
        <PropertyGroupHeader info={"Component's border styling"} isCollapsed={isCollapsed} title="Border" setIsCollapsed={setIsCollapsed} />
        {!isCollapsed && <div className={generalStyles.wrapper}>
            <label style={{ fontSize: 'small', cursor: 'pointer', userSelect: 'none' }}>
                <input
                    type="checkbox"
                    checked={isAdv}
                    onChange={handleChange}
                    style={{ marginRight: '5px' }}
                />
                All sides
            </label>

            {/* single border */}

            {!isAdv && <>
                <p style={{ marginTop: '8px', fontSize: 'small' }}>Style</p>
                <div style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center',
                    margin: '3px 0 17px 0',
                }}>
                    <ChoiceChip display={<PiEmptyBold size={18} />} valueChip="none" propertyKey={['borderTopStyle', 'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle']}></ChoiceChip>
                    <ChoiceChip display={<RxBorderSolid size={18} />} valueChip="solid" propertyKey={['borderTopStyle', 'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle']}></ChoiceChip>
                    <ChoiceChip display={<RxBorderDashed size={18} />} valueChip="dashed" propertyKey={['borderTopStyle', 'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle']}></ChoiceChip>
                    <ChoiceChip display={<RxBorderDotted size={18} />} valueChip="dotted" propertyKey={['borderTopStyle', 'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle']}></ChoiceChip>
                </div>

                {getMode(compProps) !== 'no-border' && <><p style={{ marginTop: '8px', fontSize: 'small' }}>Width</p>
                    <div style={{
                        display: 'flex',
                        gap: '10px',
                        justifyContent: 'center',
                        margin: '3px 0 17px 0',
                    }}>
                        <ChoiceChip display={<div style={{ width: '18px', height: '9px', borderTopWidth: 'thin', borderTopStyle: 'solid', marginTop: '9px' }}></div>} valueChip="thin" propertyKey={['borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth']}></ChoiceChip>
                        <ChoiceChip display={<div style={{ width: '18px', height: '9px', borderTopWidth: 'medium', borderTopStyle: 'solid', marginTop: '7px' }}></div>} valueChip="medium" propertyKey={['borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth']}></ChoiceChip>
                        <ChoiceChip display={<div style={{ width: '18px', height: '9px', borderTopWidth: 'thick', borderTopStyle: 'solid', marginTop: '5px' }}></div>} valueChip="thick" propertyKey={['borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth']}></ChoiceChip>
                    </div>

                    <p style={{ fontSize: 'small' }}>Color</p>
                    <InputColor propertyDisplayName={<MdBorderColor color="grey" title="Color" size={21} />} propertyKey={['borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor']} />
                </>}
            </>}


            {/* single-side borders */}

            {isAdv && <>

                <hr style={{ marginTop: '10px', borderTop: '1px solid grey', borderBottom: 'none' }}></hr>

                <div className={generalStyles['side-header']}>
                    <div
                        key={'border-top'}
                        title="Top"
                        style={{ width: '75px', height: '30px', border: '1px solid grey', borderTop: '5px solid grey', margin: 'auto' }}
                    ></div>
                </div>

                <div style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center',
                    margin: '3px 0 17px 0',
                }}>
                    <ChoiceChip display={<PiEmptyBold size={18} />} valueChip="none" propertyKey={'borderTopStyle'}></ChoiceChip>
                    <ChoiceChip display={<RxBorderSolid size={18} />} valueChip="solid" propertyKey={'borderTopStyle'}></ChoiceChip>
                    <ChoiceChip display={<RxBorderDashed size={18} />} valueChip="dashed" propertyKey={'borderTopStyle'}></ChoiceChip>
                    <ChoiceChip display={<RxBorderDotted size={18} />} valueChip="dotted" propertyKey={'borderTopStyle'}></ChoiceChip>
                </div>

                {compProps?.['borderTopStyle'] !== 'none' && <><div style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center',
                    margin: '3px 0 17px 0',
                }}>
                    <ChoiceChip display={<div style={{ width: '18px', height: '9px', borderTopWidth: 'thin', borderTopStyle: 'solid', marginTop: '9px' }}></div>} valueChip="thin" propertyKey={'borderTopWidth'}></ChoiceChip>
                    <ChoiceChip display={<div style={{ width: '18px', height: '9px', borderTopWidth: 'medium', borderTopStyle: 'solid', marginTop: '7px' }}></div>} valueChip="medium" propertyKey={'borderTopWidth'}></ChoiceChip>
                    <ChoiceChip display={<div style={{ width: '18px', height: '9px', borderTopWidth: 'thick', borderTopStyle: 'solid', marginTop: '5px' }}></div>} valueChip="thick" propertyKey={'borderTopWidth'}></ChoiceChip>
                </div>

                    {/* <p style={{ fontSize: 'small' }}>Color</p> */}
                    <InputColor propertyDisplayName={''} propertyKey={['borderTopColor']} />
                </>}



                <hr style={{ marginTop: '10px', borderTop: '1px solid grey', borderBottom: 'none' }}></hr>

                <div className={generalStyles['side-header']}>
                    <div
                        key={'border-right'}
                        title="Right"
                        style={{ width: '75px', height: '30px', border: '1px solid grey', borderRight: '5px solid grey', margin: 'auto' }}
                    ></div>
                </div>

                <div style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center',
                    margin: '3px 0 17px 0',
                }}>
                    <ChoiceChip display={<PiEmptyBold size={18} />} valueChip="none" propertyKey={'borderRightStyle'}></ChoiceChip>
                    <ChoiceChip display={<RxBorderSolid size={18} />} valueChip="solid" propertyKey={'borderRightStyle'}></ChoiceChip>
                    <ChoiceChip display={<RxBorderDashed size={18} />} valueChip="dashed" propertyKey={'borderRightStyle'}></ChoiceChip>
                    <ChoiceChip display={<RxBorderDotted size={18} />} valueChip="dotted" propertyKey={'borderRightStyle'}></ChoiceChip>
                </div>

                {compProps?.['borderRightStyle'] !== 'none' && <><div style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center',
                    margin: '3px 0 17px 0',
                }}>
                    <ChoiceChip display={<div style={{ width: '18px', height: '9px', borderTopWidth: 'thin', borderTopStyle: 'solid', marginTop: '9px' }}></div>} valueChip="thin" propertyKey={'borderRightWidth'}></ChoiceChip>
                    <ChoiceChip display={<div style={{ width: '18px', height: '9px', borderTopWidth: 'medium', borderTopStyle: 'solid', marginTop: '7px' }}></div>} valueChip="medium" propertyKey={'borderRightWidth'}></ChoiceChip>
                    <ChoiceChip display={<div style={{ width: '18px', height: '9px', borderTopWidth: 'thick', borderTopStyle: 'solid', marginTop: '5px' }}></div>} valueChip="thick" propertyKey={'borderRightWidth'}></ChoiceChip>
                </div>

                    {/* <p style={{ fontSize: 'small' }}>Color</p> */}
                    <InputColor propertyDisplayName={''} propertyKey={['borderRightColor']} />
                </>}




                <hr style={{ marginTop: '10px', borderTop: '1px solid grey', borderBottom: 'none' }}></hr>

                <div className={generalStyles['side-header']}>
                    <div
                        key={'border-bottom'}
                        title="Bottom"
                        style={{ width: '75px', height: '30px', border: '1px solid grey', borderBottom: '5px solid grey', margin: 'auto' }}
                    ></div>
                </div>

                <div style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center',
                    margin: '3px 0 17px 0',
                }}>
                    <ChoiceChip display={<PiEmptyBold size={18} />} valueChip="none" propertyKey={'borderBottomStyle'}></ChoiceChip>
                    <ChoiceChip display={<RxBorderSolid size={18} />} valueChip="solid" propertyKey={'borderBottomStyle'}></ChoiceChip>
                    <ChoiceChip display={<RxBorderDashed size={18} />} valueChip="dashed" propertyKey={'borderBottomStyle'}></ChoiceChip>
                    <ChoiceChip display={<RxBorderDotted size={18} />} valueChip="dotted" propertyKey={'borderBottomStyle'}></ChoiceChip>
                </div>

                {compProps?.['borderBottomStyle'] !== 'none' && <><div style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center',
                    margin: '3px 0 17px 0',
                }}>
                    <ChoiceChip display={<div style={{ width: '18px', height: '9px', borderTopWidth: 'thin', borderTopStyle: 'solid', marginTop: '9px' }}></div>} valueChip="thin" propertyKey={'borderBottomWidth'}></ChoiceChip>
                    <ChoiceChip display={<div style={{ width: '18px', height: '9px', borderTopWidth: 'medium', borderTopStyle: 'solid', marginTop: '7px' }}></div>} valueChip="medium" propertyKey={'borderBottomWidth'}></ChoiceChip>
                    <ChoiceChip display={<div style={{ width: '18px', height: '9px', borderTopWidth: 'thick', borderTopStyle: 'solid', marginTop: '5px' }}></div>} valueChip="thick" propertyKey={'borderBottomWidth'}></ChoiceChip>
                </div>

                    {/* <p style={{ fontSize: 'small' }}>Color</p> */}
                    <InputColor propertyDisplayName={''} propertyKey={['borderBottomColor']} />
                </>}



                <hr style={{ marginTop: '10px', borderTop: '1px solid grey', borderBottom: 'none' }}></hr>

                <div className={generalStyles['side-header']}>
                    <div
                        key={'border-left'}
                        title="Left"
                        style={{ width: '75px', height: '30px', border: '1px solid grey', borderLeft: '5px solid grey', margin: 'auto' }}
                    ></div>
                </div>

                <div style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center',
                    margin: '3px 0 17px 0',
                }}>
                    <ChoiceChip display={<PiEmptyBold size={18} />} valueChip="none" propertyKey={'borderLeftStyle'}></ChoiceChip>
                    <ChoiceChip display={<RxBorderSolid size={18} />} valueChip="solid" propertyKey={'borderLeftStyle'}></ChoiceChip>
                    <ChoiceChip display={<RxBorderDashed size={18} />} valueChip="dashed" propertyKey={'borderLeftStyle'}></ChoiceChip>
                    <ChoiceChip display={<RxBorderDotted size={18} />} valueChip="dotted" propertyKey={'borderLeftStyle'}></ChoiceChip>
                </div>

                {compProps?.['borderLeftStyle'] !== 'none' && <><div style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center',
                    margin: '3px 0 17px 0',
                }}>
                    <ChoiceChip display={<div style={{ width: '18px', height: '9px', borderTopWidth: 'thin', borderTopStyle: 'solid', marginTop: '9px' }}></div>} valueChip="thin" propertyKey={'borderLeftWidth'}></ChoiceChip>
                    <ChoiceChip display={<div style={{ width: '18px', height: '9px', borderTopWidth: 'medium', borderTopStyle: 'solid', marginTop: '7px' }}></div>} valueChip="medium" propertyKey={'borderLeftWidth'}></ChoiceChip>
                    <ChoiceChip display={<div style={{ width: '18px', height: '9px', borderTopWidth: 'thick', borderTopStyle: 'solid', marginTop: '5px' }}></div>} valueChip="thick" propertyKey={'borderLeftWidth'}></ChoiceChip>
                </div>

                    {/* <p style={{ fontSize: 'small' }}>Color</p> */}
                    <InputColor propertyDisplayName={''} propertyKey={['borderLeftColor']} />
                </>}

                <hr style={{ marginTop: '10px', borderTop: '1px solid grey', borderBottom: 'none' }}></hr>

            </>}


            {getMode(compProps) !== 'no-border' && <>
                <p style={{ marginTop: '8px', fontSize: 'small' }}>Corners</p>
                <InputText propertyDisplayName={<BiBorderRadius color="grey" title="Corners" size={21} />}
                    propertyKey="borderRadius"
                    tooltipContent={tooltipContent}
                    isValidInput={isValidCssLengthBasicNoAuto}
                />
            </>}


        </div>}
    </div>
}

export default Border;