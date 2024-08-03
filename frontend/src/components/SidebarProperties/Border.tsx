import { useEffect, useState } from "react";
import PropertyGroupHeader from "../../helpers/components/PropertyGroupHeader";
import generalStyles from './Property.module.css';
import styles from './Border.module.css';
import InputSelect from "./InputSelect";
import { RxBorderStyle } from "react-icons/rx";
import { BsBorderWidth } from "react-icons/bs";
import InputColor from "./InputColor";
import { MdBorderColor, MdContentCopy } from "react-icons/md";
import useDesignerStore from "../../stores/designer";


const Border = () => {

    const selectedId = useDesignerStore(state => state.selectedId);
    const updateProperty = useDesignerStore(state => state.updateProperty);
    // Getting non-reactive fresh state
    const borderTopColor = useDesignerStore.getState().properties[selectedId as string]?.values['borderTopColor'];
    const borderTopWidth = useDesignerStore.getState().properties[selectedId as string]?.values['borderTopWidth'];
    const borderTopStyle = useDesignerStore.getState().properties[selectedId as string]?.values['borderTopStyle'];

    const [forceRender, setForceRender] = useState(false);

    const onCopyTopToAllSides = () => {
        updateProperty(selectedId as string, {
            borderRightColor: borderTopColor,
            borderRightWidth: borderTopWidth,
            borderRightStyle: borderTopStyle,
            borderBottomColor: borderTopColor,
            borderBottomWidth: borderTopWidth,
            borderBottomStyle: borderTopStyle,
            borderLeftColor: borderTopColor,
            borderLeftWidth: borderTopWidth,
            borderLeftStyle: borderTopStyle,
        }, {});
        setForceRender(prev => !prev);
    }

    const [isCollapsed, setIsCollapsed] = useState(true);
    // const [isAdv, setIsAdv] = useState(false);
    // const handleChange = () => {
    //     setIsAdv(prev => !prev);
    // };


    return <div>
        <PropertyGroupHeader info={"Component's border styling"} isCollapsed={isCollapsed} title="Border" setIsCollapsed={setIsCollapsed} />
        {!isCollapsed && <div className={generalStyles.wrapper}>
            {/* <label style={{ fontSize: 'small' }}>
                <input
                    type="checkbox"
                    checked={isAdv}
                    onChange={handleChange}
                    style={{ marginRight: '5px' }}
                />
                Advanced
            </label> */}
            {/* {!isAdv && <>
                <InputColor propertyDisplayName={<MdBorderColor title="Color" size={25} />} propertyKey={['borderTopColor', 'borderRightColor', 'borderLeftColor', 'borderBottomColor']} />
                <InputSelect propertyDisplayName={<BsBorderWidth title="Width" size={25} />} propertyKey={['borderTopWidth', 'borderRightWidth', 'borderLeftWidth', 'borderBottomWidth']} options={[
                    { value: 'thin', display: 'Thin' },
                    { value: 'medium', display: 'Medium' },
                    { value: 'thick', display: 'Thick' },
                ]} />
                <InputSelect propertyDisplayName={<RxBorderStyle title="Style" size={25} />} propertyKey={['borderTopStyle', 'borderRightStyle', 'borderLeftStyle', 'borderBottomStyle']} options={[
                    { value: 'none', display: 'None' },
                    { value: 'solid', display: 'Solid' },
                    { value: 'dotted', display: 'Dotted' },
                    { value: 'dashed', display: 'Dashed' },
                ]} />
            </>} */}
            <p className={generalStyles['side-header']}>
                <div
                    key={'border-top'}
                    title="Top"
                    style={{ width: '26px', height: '17px', border: '1px solid grey', borderTop: '5px solid grey' }}
                ></div>
                <button className={styles['icon-button']} onClick={onCopyTopToAllSides}>
                    <MdContentCopy size={17} />
                    <span style={{ marginLeft: '5px' }}>all sides</span>
                </button>
            </p>
            <InputColor propertyDisplayName={<MdBorderColor color="grey" title="Color" size={25} />} propertyKey={['borderTopColor']} />
            <InputSelect propertyDisplayName={<BsBorderWidth color="grey" title="Width" size={25} />} propertyKey={['borderTopWidth']} options={[
                { value: 'thin', display: 'Thin' },
                { value: 'medium', display: 'Medium' },
                { value: 'thick', display: 'Thick' },
            ]} />
            <InputSelect propertyDisplayName={<RxBorderStyle color="grey" title="Style" size={25} />} propertyKey={['borderTopStyle']} options={[
                { value: 'none', display: 'None' },
                { value: 'solid', display: 'Solid' },
                { value: 'dotted', display: 'Dotted' },
                { value: 'dashed', display: 'Dashed' },
            ]} />
            <hr style={{ marginTop: '10px', borderTop: '1px dashed grey', borderBottom: 'none' }}></hr>
            <p className={generalStyles['side-header']}>
                <div
                    key={'border-right'}
                    title="Right"
                    style={{ width: '26px', height: '17px', border: '1px solid grey', borderRight: '5px solid grey' }}
                ></div>
            </p>
            <InputColor key={'rc-' + String(forceRender)} propertyDisplayName={<MdBorderColor color="grey" title="Color" size={25} />} propertyKey={['borderRightColor']} />
            <InputSelect key={'rw-' + String(forceRender)} propertyDisplayName={<BsBorderWidth color="grey" title="Width" size={25} />} propertyKey={['borderRightWidth']} options={[
                { value: 'thin', display: 'Thin' },
                { value: 'medium', display: 'Medium' },
                { value: 'thick', display: 'Thick' },
            ]} />
            <InputSelect key={'rs-' + String(forceRender)} propertyDisplayName={<RxBorderStyle color="grey" title="Style" size={25} />} propertyKey={['borderRightStyle']} options={[
                { value: 'none', display: 'None' },
                { value: 'solid', display: 'Solid' },
                { value: 'dotted', display: 'Dotted' },
                { value: 'dashed', display: 'Dashed' },
            ]} />
            <hr style={{ marginTop: '10px', borderTop: '1px dashed grey', borderBottom: 'none' }}></hr>
            <p className={generalStyles['side-header']}>
                <div
                    key={'border-bottom'}
                    title="Bottom"
                    style={{ width: '26px', height: '17px', border: '1px solid grey', borderBottom: '5px solid grey' }}
                ></div>
            </p>
            <InputColor key={'bc-' + String(forceRender)} propertyDisplayName={<MdBorderColor color="grey" title="Color" size={25} />} propertyKey={['borderBottomColor']} />
            <InputSelect key={'bw-' + String(forceRender)} propertyDisplayName={<BsBorderWidth color="grey" title="Width" size={25} />} propertyKey={['borderBottomWidth']} options={[
                { value: 'thin', display: 'Thin' },
                { value: 'medium', display: 'Medium' },
                { value: 'thick', display: 'Thick' },
            ]} />
            <InputSelect key={'bs-' + String(forceRender)} propertyDisplayName={<RxBorderStyle color="grey" title="Style" size={25} />} propertyKey={['borderTopStyle', 'borderRightStyle', 'borderLeftStyle', 'borderBottomStyle']} options={[
                { value: 'none', display: 'None' },
                { value: 'solid', display: 'Solid' },
                { value: 'dotted', display: 'Dotted' },
                { value: 'dashed', display: 'Dashed' },
            ]} />
            <hr style={{ marginTop: '10px', borderTop: '1px dashed grey', borderBottom: 'none' }}></hr>
            <p className={generalStyles['side-header']}>
                <div
                    key={'border-left'}
                    title="Left"
                    style={{ width: '26px', height: '17px', border: '1px solid grey', borderLeft: '5px solid grey' }}
                ></div>
            </p>
            <InputColor key={'lc-' + String(forceRender)} propertyDisplayName={<MdBorderColor color="grey" title="Color" size={25} />} propertyKey={['borderLeftColor']} />
            <InputSelect key={'lw-' + String(forceRender)} propertyDisplayName={<BsBorderWidth color="grey" title="Width" size={25} />} propertyKey={['borderLeftWidth']} options={[
                { value: 'thin', display: 'Thin' },
                { value: 'medium', display: 'Medium' },
                { value: 'thick', display: 'Thick' },
            ]} />
            <InputSelect key={'ls-' + String(forceRender)} propertyDisplayName={<RxBorderStyle color="grey" title="Style" size={25} />} propertyKey={['borderLeftStyle']} options={[
                { value: 'none', display: 'None' },
                { value: 'solid', display: 'Solid' },
                { value: 'dotted', display: 'Dotted' },
                { value: 'dashed', display: 'Dashed' },
            ]} />
        </div>}
    </div>
}

export default Border;