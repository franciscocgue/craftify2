import { memo, useEffect, useState } from "react";
import useDesignerStore from "../../stores/designer";
import MyInput from "./MyInput";
import Border from "./Border";
import Margin from "./Margin";

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
        if (selectedId) {
            setCompName(compMetadata.name);
        }
    }, [selectedId])

    return <div style={{ width: '300px', border: '1px solid grey', overflowY: 'auto' }}>
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

        {selectedId && <div style={{
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
        </div>}

        <div style={{ padding: '0 10px' }}>

            <input placeholder="Search" />
            <button>Collapse</button>
            <button>Expand</button>
            <Border />
            <Margin />

        </div>

        {selectedId && activeSection === 'styles' && <>{Object.keys(properties[selectedId]).map(p => (
            <MyInput componentId={selectedId} name={p} val={properties[selectedId][p]} key={selectedId + p} />
        ))}
        </>}
    </div>
})

export default SidebarProperties;