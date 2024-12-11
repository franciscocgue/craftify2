import { memo, useEffect, useState } from "react";
import useDesignerStore from "../../stores/designer";
// import MyInput from "./MyInput";
// import Border from "./Border";
// import Margin from "./Margin";
// import Width from "./Width";
// import Height from "./Height";
// import Padding from "./Padding";
// import Layout from "./Layout";
// import Background from "./Background";
// import Text from "./Text";
import { compTypes } from "../../config/components";
import { IconType } from "react-icons";
import { CgScreen } from "react-icons/cg";
import Properties from "./Properties";
import Logic from "../Logic";
import MyModal from "../helpers/MyModal";
import { BiCollapseAlt, BiExpandAlt } from "react-icons/bi";
import { FaProjectDiagram } from "react-icons/fa";


interface IconBoxProps {
    icon: IconType;
};
const IconBox: React.FC<IconBoxProps> = ({ icon: Icon }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Icon size={'17px'} />
        </div>
    );
};

const SidebarProperties = memo(() => {

    console.log('C - SidebarProperties')

    const selectedId = useDesignerStore((state) => state.selectedId);
    const componentEditorMode = useDesignerStore((state) => state.componentEditorMode);
    const setComponentEditorMode = useDesignerStore((state) => state.setComponentEditorMode);
    // const properties = useDesignerStore((state) => state.properties);
    const colorMode = useDesignerStore((state) => state.colorMode);
    const compMetadata = useDesignerStore((state) => state.components[selectedId || '_no_comp_'])
    const renameComponent = useDesignerStore((state) => state.renameComponent);

    const setExpandAllProperties = useDesignerStore((state) => state.setExpandAllProperties);

    const handleExpand = () => setExpandAllProperties(true);
    const handleCollapse = () => setExpandAllProperties(false);

    const changeToStyles = () => setComponentEditorMode('styles');

    const [compName, setCompName] = useState(compMetadata ? compMetadata.name : 'no component');

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCompName(event.target.value);
        renameComponent(selectedId as string, event.target.value)
    }

    useEffect(() => {
        if (selectedId && compMetadata) {
            setCompName(compMetadata.name);
        }
    }, [selectedId])

    // console.log('debug - ', compMetadata)

    return <div style={{ width: '300px', borderTop: '1px solid grey', overflowY: 'auto' }}>
        {!selectedId && <p style={{ width: '100%', textAlign: 'center', color: 'grey', fontStyle: 'italic', marginTop: '20px' }}>Select a component</p>}
        {selectedId && compMetadata && <>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '10px 5px 8px 5px',
                gap: '5px',
                borderBottom: '2px solid #ccc',
                marginBottom: '12px',
            }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <p style={{ fontSize: 'small' }}>Type</p>
                    <div style={{
                        fontFamily: '"Lucida Console", "Courier New", monospace',
                        fontSize: 'small',
                        color: 'grey',
                        fontStyle: 'italic',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '5px',
                        alignItems: 'center',
                    }}>
                        {selectedId === 'canvas' && <>
                            <IconBox icon={CgScreen} />
                            {'Canvas'}
                        </>}
                        {selectedId !== 'canvas' && <>
                            <IconBox icon={compTypes[compMetadata.type as keyof typeof compTypes].icon} />
                            {compTypes[compMetadata.type as keyof typeof compTypes].name}
                        </>}
                    </div>
                    <p style={{ fontSize: 'small', borderLeft: '2px solid grey', paddingLeft: '5px' }}>Name</p>
                    <input
                        value={compName}
                        title={compName}
                        onChange={onChangeHandler}
                        // className={`${generalStyles['input']} ${isWrongInput ? generalStyles['wrong'] : ''}`}
                        style={{
                            fontSize: 'small',
                            padding: '7px 3px',
                            width: '100%',
                            // maxWidth: '70px',
                            // color: isWrongInput ? 'black' : 'grey',
                            color: colorMode === 'light' ? '#555' : '#ddd',
                            // width: '70px',
                            flex: 1,
                            // backgroundColor: isWrongInput ? 'rgb(255, 92, 92)' : 'transparent',
                            backgroundColor: 'transparent',
                            outline: 'none',
                            border: `1px solid ${colorMode === 'light' ? 'lightgrey' : '#555'}`,
                            borderRadius: '4px'
                        }} />
                </div>
            </div>
        </>}

        {selectedId && compMetadata && <>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 10px',
                marginBottom: '17px',
                // borderBottom: '2px solid #ddd',
            }}>
                <p style={{ fontWeight: '600', fontSize: '1.1rem' }}>Properties</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'space-around' }}>
                    <button style={{
                        display: 'flex',
                        alignItems: 'center',
                        // width: '30%',
                        padding: '3px',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        // background: 'none',
                        border: '1px solid darkgrey',
                        borderRadius: '4px',
                        outline: 'inherit',
                        color: colorMode === 'light' ? '#333' : '#fff',
                        background: colorMode === 'light' ? 'white' : '#333',
                        // border: '1px solid grey',

                    }}
                        onClick={handleExpand}
                    >
                        <BiExpandAlt size={15} title="Expand All" />
                    </button>
                    <button style={{
                        display: 'flex',
                        alignItems: 'center',
                        // width: '30%',
                        padding: '3px',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        // background: 'none',
                        border: '1px solid darkgrey',
                        borderRadius: '4px',
                        outline: 'inherit',
                        color: colorMode === 'light' ? '#333' : '#fff',
                        background: colorMode === 'light' ? 'white' : '#333',
                        // border: '1px solid grey',
                    }}
                        onClick={handleCollapse}
                    >
                        <BiCollapseAlt size={15} title="Collapse All" />
                    </button>



                    <button style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        // width: '30%',
                        padding: '6px 10px',
                        marginLeft: '40px',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        // background: 'none',
                        border: '1px solid darkgrey',
                        borderRadius: '4px',
                        outline: 'inherit',
                        color: colorMode === 'light' ? '#333' : '#fff',
                        background: colorMode === 'light' ? 'white' : '#333',
                        // border: '1px solid grey',
                    }}
                        title="Open component logic"
                        onClick={() => setComponentEditorMode('logic')}
                    >
                        <p>Logic</p>
                        <FaProjectDiagram size={15} />
                    </button>
                </div>

            </div>

            {componentEditorMode === 'styles' && <Properties />}
            {/* {componentEditorMode === 'properties' && <SectionProperties />} */}
            {componentEditorMode === 'logic' && <MyModal styles={{
                position: 'fixed',
                width: '100vw',
                height: '100vh',
                top: '0px',
                left: '0px'
            }} children={<Logic handleClickOutside={changeToStyles} selectedComponentId={selectedId ?? ''} />} />}

        </>
        }
    </div>
})

export default SidebarProperties;