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
import SectionStyles from "./SectionStyles";
import SectionProperties from "./SectionProperties";
import Logic from "../Logic";
import MyModal from "../helpers/MyModal";


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
    // const properties = useDesignerStore((state) => state.properties);
    const colorMode = useDesignerStore((state) => state.colorMode);
    const compMetadata = useDesignerStore((state) => state.components[selectedId || '_no_comp_'])
    const renameComponent = useDesignerStore((state) => state.renameComponent);

    // console.log('PROPERTIES')
    // if (properties[selectedId]) {
    //     console.log(properties[selectedId])
    // }

    const changeToStyles = () => setActiveSection('styles');

    const [compName, setCompName] = useState(compMetadata ? compMetadata.name : 'no component');
    const [activeSection, setActiveSection] = useState<'styles' | 'logic' | 'properties'>('styles');

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
        {!selectedId && <p>Select a component</p>}
        {selectedId && compMetadata && <>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '10px',
                gap: '5px',
                // position: 'sticky',
                // top: '0px',
                // backgroundColor: 'rgba(240, 240, 240)'
            }}>
                {/* <p>Name</p> */}
                <input
                    value={compName}
                    title='Hex color'
                    onChange={onChangeHandler}
                    // className={`${generalStyles['input']} ${isWrongInput ? generalStyles['wrong'] : ''}`}
                    style={{
                        fontSize: 'small',
                        padding: '7px 3px',
                        // color: isWrongInput ? 'black' : 'grey',
                        color: 'black',
                        // width: '70px',
                        flex: 1,
                        // backgroundColor: isWrongInput ? 'rgb(255, 92, 92)' : 'transparent',
                        backgroundColor: 'white',
                        outline: 'none',
                        border: '1px solid grey',
                        borderRadius: '4px'
                    }} />
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
                {/* ID: */}
                {/* <p style={{
                    fontFamily: '"Lucida Console", "Courier New", monospace',
                    fontSize: '9pt',
                    color: 'grey',
                    fontStyle: 'italic'
                }}>
                    {selectedId}
                </p> */}
            </div>
        </>}

        {selectedId && compMetadata && <>
            <div style={{
                display: 'flex',
                justifyContent: 'space-around'
            }}>
                <div style={{
                    color: activeSection === 'styles' ? `${colorMode === 'light' ? 'black' : 'white'}` : 'grey',
                    borderBottom: activeSection === 'styles' ? `4px solid ${colorMode === 'light' ? 'black' : 'white'}` : `2px solid rgb(190,190,190)`,
                    flex: 1,
                    textAlign: 'center',
                    cursor: 'pointer',
                    userSelect: 'none'
                }}
                    onClick={() => setActiveSection('styles')}
                >Styles</div>
                <div style={{
                    color: activeSection === 'properties' ? `${colorMode === 'light' ? 'black' : 'white'}` : 'grey',
                    borderBottom: activeSection === 'properties' ? `4px solid ${colorMode === 'light' ? 'black' : 'white'}` : '2px solid rgb(190,190,190)',
                    flex: 1,
                    textAlign: 'center',
                    cursor: 'pointer',
                    userSelect: 'none'
                }}
                    onClick={() => setActiveSection('properties')}
                >Settings</div>
                <div style={{
                    color: activeSection === 'logic' ? `${colorMode === 'light' ? 'black' : 'white'}` : 'grey',
                    borderBottom: activeSection === 'logic' ? `4px solid ${colorMode === 'light' ? 'black' : 'white'}` : '2px solid rgb(190,190,190)',
                    flex: 1,
                    textAlign: 'center',
                    cursor: 'pointer',
                    userSelect: 'none'
                }}
                    onClick={() => setActiveSection('logic')}
                >Logic</div>
            </div>

            {activeSection === 'styles' && <SectionStyles />}
            {activeSection === 'properties' && <SectionProperties />}
            {/* {activeSection === 'logic' && <SectionLogic />} */}
            {activeSection === 'logic' && <MyModal styles={{
                    position: 'fixed',
                    width: '100vw',
                    height: '100vh',
                    top: '0px',
                    left: '0px'
            }} children={<Logic changeToStyles={changeToStyles} selectedComponentId={selectedId ?? ''}  />} />}

        </>
        }
    </div>
})

export default SidebarProperties;