import { useEffect, useState } from "react";
import PropertyGroupHeader from "../common/PropertyGroupHeader";
import stylesLight from './PropertyLight.module.css';
import stylesDark from './PropertyDark.module.css';
import MyPortal from "../helpers/MyPortal";
import { isValidCssLengthBasicNoAuto } from "../../utils";
import useDesignerStore from "../../stores/designer";
import ChoiceChip from "./ChoiceChip";
import { TbTextWrapColumn, TbTextWrapDisabled } from "react-icons/tb";
import { RiAlignItemBottomLine, RiAlignItemHorizontalCenterLine, RiAlignItemLeftLine, RiAlignItemRightLine, RiAlignItemTopLine, RiAlignItemVerticalCenterLine, RiPageSeparator } from "react-icons/ri";
import { LuAlignHorizontalJustifyCenter, LuAlignHorizontalJustifyEnd, LuAlignHorizontalJustifyStart, LuAlignHorizontalSpaceAround, LuAlignHorizontalSpaceBetween, LuAlignVerticalJustifyCenter, LuAlignVerticalJustifyEnd, LuAlignVerticalJustifyStart, LuAlignVerticalSpaceAround, LuAlignVerticalSpaceBetween, LuStretchHorizontal, LuStretchVertical } from "react-icons/lu";
import InputText from "./InputText";


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
    const selectedId = useDesignerStore(state => state.selectedId);
    // const flexDirectionPropValue = useDesignerStore.getState().properties[selectedId as string]?.['flexDirection'];
    const flexDirectionPropValue = useDesignerStore((state) => state.properties[selectedId as string]?.['flexDirection']);

    useEffect(() => {
        if (expandAllProperties !== null) {
            setIsCollapsed(!expandAllProperties)
        }
    }, [expandAllProperties])

    const colorMode = useDesignerStore(state => state.colorMode);
    const styles = colorMode === 'light' ? stylesLight : stylesDark;

    return <div>
        <PropertyGroupHeader info={"Component's layout styling"} isCollapsed={isCollapsed} title="Layout" setIsCollapsed={setIsCollapsed} />
        {!isCollapsed && <div className={styles.wrapper}>
            <>
                {/* <InputSelect propertyDisplayName={'Direction'} propertyKey={['flexDirection']} options={[
                    { value: 'row', display: 'Row' },
                    { value: 'column', display: 'Column' },
                ]} /> */}

                <p style={{ marginTop: '8px', fontSize: 'small' }}>Direction</p>
                <div style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center',
                    margin: '3px 0 17px 0',
                }}>
                    <ChoiceChip display={'Row'} valueChip="row" propertyKey="flexDirection"></ChoiceChip>
                    <ChoiceChip display={'Column'} valueChip="column" propertyKey="flexDirection"></ChoiceChip>
                </div>


                <p style={{ fontSize: 'small' }}>Positioning</p>
                <div style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center',
                    margin: '3px 0 17px 0',
                }}>
                    <ChoiceChip display={flexDirectionPropValue === 'row' ? <LuStretchVertical size={18} /> : <LuStretchHorizontal size={18} />} valueChip="stretch" propertyKey="alignItems"></ChoiceChip>
                    <ChoiceChip display={flexDirectionPropValue === 'row' ? <RiAlignItemTopLine size={18} /> : <RiAlignItemLeftLine size={18} />} valueChip="flex-start" propertyKey="alignItems"></ChoiceChip>
                    <ChoiceChip display={flexDirectionPropValue === 'row' ? <RiAlignItemVerticalCenterLine size={18} /> : <RiAlignItemHorizontalCenterLine size={18} />} valueChip="center" propertyKey="alignItems"></ChoiceChip>
                    <ChoiceChip display={flexDirectionPropValue === 'row' ? <RiAlignItemBottomLine size={18} /> : <RiAlignItemRightLine size={18} />} valueChip="flex-end" propertyKey="alignItems"></ChoiceChip>
                </div>


                <p style={{ fontSize: 'small' }}>Alignment</p>
                <div style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center',
                    margin: '3px 0 17px 0',
                }}>
                    <ChoiceChip display={flexDirectionPropValue === 'row' ? <LuAlignHorizontalJustifyStart size={18} /> : <LuAlignVerticalJustifyStart size={18} />} valueChip="flex-start" propertyKey="justifyContent"></ChoiceChip>
                    <ChoiceChip display={flexDirectionPropValue === 'row' ? <LuAlignHorizontalJustifyCenter size={18} /> : <LuAlignVerticalJustifyCenter size={18} />} valueChip="center" propertyKey="justifyContent"></ChoiceChip>
                    <ChoiceChip display={flexDirectionPropValue === 'row' ? <LuAlignHorizontalJustifyEnd size={18} /> : <LuAlignVerticalJustifyEnd size={18} />} valueChip="flex-end" propertyKey="justifyContent"></ChoiceChip>
                    <ChoiceChip display={flexDirectionPropValue === 'row' ? <LuAlignHorizontalSpaceBetween size={18} /> : <LuAlignVerticalSpaceBetween size={18} />} valueChip="space-between" propertyKey="justifyContent"></ChoiceChip>
                    <ChoiceChip display={flexDirectionPropValue === 'row' ? <LuAlignHorizontalSpaceAround size={18} /> : <LuAlignVerticalSpaceAround size={18} />} valueChip="space-around" propertyKey="justifyContent"></ChoiceChip>
                </div>


                <p style={{ fontSize: 'small' }}>Wrap</p>
                <div style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center',
                    margin: '3px 0 17px 0',
                }}>
                    <ChoiceChip display={<TbTextWrapDisabled size={18} />} valueChip="nowrap" propertyKey="flexWrap"></ChoiceChip>
                    <ChoiceChip display={<TbTextWrapColumn size={18} />} valueChip="wrap" propertyKey="flexWrap"></ChoiceChip>
                </div>

                <p style={{ fontSize: 'small' }}>Gap</p>
                <InputText propertyDisplayName={<RiPageSeparator size={24} color={'grey'} />}
                    propertyKey="gap"
                    tooltipContent={tooltipContent}
                    isValidInput={isValidCssLengthBasicNoAuto}
                />

            </>
        </div>}
    </div>
}

export default Layout;