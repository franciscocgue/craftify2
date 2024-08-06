import { memo, useEffect, useState } from "react";
import useDesignerStore from "../../stores/designer";
import MyInput from "./MyInput";
import Border from "./Border";
import Margin from "./Margin";
import Width from "./Width";
import Height from "./Height";
import Padding from "./Padding";
import Layout from "./Layout";
import Background from "./Background";

const SidebarProperties = memo(() => {

    console.log('C - SidebarProperties')

    const selectedId = useDesignerStore((state) => state.selectedId);
    const properties = useDesignerStore((state) => state.properties);
    const colorMode = useDesignerStore((state) => state.colorMode);
    const compMetadata = useDesignerStore((state) => state.components[selectedId || '_no_comp_'])
    const renameComponent = useDesignerStore((state) => state.renameComponent);

    // console.log('PROPERTIES')
    // if (properties[selectedId]) {
    //     console.log(properties[selectedId])
    // }

    const [compName, setCompName] = useState(compMetadata ? compMetadata.name : 'no component');
    const [activeSection, setActiveSection] = useState<'styles' | 'logic'>('styles');

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCompName(event.target.value);
        renameComponent(selectedId as string, event.target.value)
    }

    useEffect(() => {
        if (selectedId && compMetadata) {
            setCompName(compMetadata.name);
        }
    }, [selectedId])

    return <div style={{ width: '300px', borderTop: '1px solid grey', overflowY: 'auto' }}>
        {!selectedId && <p>Select a component</p>}
        {selectedId && <>
            <p>
                Name <input value={compName} onChange={onChangeHandler} />
            </p>
            <p>
                ID:
                <span style={{
                    fontFamily: '"Lucida Console", "Courier New", monospace',
                    fontSize: '9pt',
                }}>{selectedId}</span>
            </p>
        </>}

        {selectedId && <><div style={{
            display: 'flex',
            justifyContent: 'space-around'
        }}>
            <div style={{
                color: activeSection === 'styles' ? `${colorMode === 'light' ? 'black' : 'white'}` : 'grey',
                borderBottom: activeSection === 'styles' ? `2px solid ${colorMode === 'light' ? 'black' : 'white'}` : `2px solid rgb(190,190,190)`,
                flex: 1,
                textAlign: 'center',
                cursor: 'pointer',
                userSelect: 'none'
            }}
                onClick={() => setActiveSection('styles')}
            >Styles</div>
            <div style={{
                color: activeSection === 'logic' ? `${colorMode === 'light' ? 'black' : 'white'}` : 'grey',
                borderBottom: activeSection === 'logic' ? `2px solid ${colorMode === 'light' ? 'black' : 'white'}` : '2px solid rgb(190,190,190)',
                flex: 1,
                textAlign: 'center',
                cursor: 'pointer',
                userSelect: 'none'
            }}
                onClick={() => setActiveSection('logic')}
            >Logic</div>
        </div>

            <div style={{ padding: '0 10px' }}>
                <input placeholder="Search" />
                <button>Collapse</button>
                <button>Expand</button>
                <Layout key={'layout-' + selectedId} />
                <Width key={'width-' + selectedId} />
                <Height key={'height-' + selectedId} />
                <Background key={'background-' + selectedId} />
                <Border key={'border-' + selectedId} />
                <Margin key={'margin-' + selectedId} />
                <Padding key={'padding-' + selectedId} />
            </div>

        </>
        }



        {selectedId && activeSection === 'styles' && <>{Object.keys(properties[selectedId].values).map(p => (
            <MyInput componentId={selectedId} name={p} val={properties[selectedId].values[p]} key={selectedId + p} />
        ))}
        </>}
    </div>
})

export default SidebarProperties;