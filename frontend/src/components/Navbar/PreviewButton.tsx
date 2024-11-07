import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import useDesignerStore from "../../stores/designer";
import axios from "axios";
import { useState } from "react";
import QRCode from "react-qr-code";
import { FaPlay } from "react-icons/fa6";
import IconButton from "../common/IconButton";
import { Variables } from "../../types/variables.types";
import { Properties } from "../../types/designer.types";
import { ComponentCollection } from "../../types/designer.types";
import { FunctionTypes, LogicEdge, LogicNode } from "../../types/logic.types";

const handleButtonClick = async (
    components: ComponentCollection,
    properties: Properties,
    variables: Variables,
    logicNodes: Record<string, LogicNode<FunctionTypes>[]>,
    logicEdges: Record<string, LogicEdge[]>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {

    setLoading(true);

    try {
        console.log(components)
        // const d = new Date();
        // let time = d.getTime();
        await axios.post('http://localhost:3001/api/web-service/preview', {
            // port: 4000,
            "app-id": "123e3e35-425a-4c33-a813-83dde0d03576",
            components, 
            properties, 
            variables, 
            logicNodes, 
            logicEdges
        });
        // var win = window.open('http://localhost:4000/', '_blank');
        // if (win !== null) { win.focus(); }
        // alert(response.data);
    } catch (error) {
        console.error('There was an error starting the new server:', error);
    }

    setLoading(false);
};

const PreviewButton = () => {

    console.log('C - PreviewButton')

    const [loading, setLoading] = useState(false)

    const components = useDesignerStore((state) => state.components);
    const properties = useDesignerStore((state) => state.properties);
    const variables = useDesignerStore((state) => state.variables);
    const logicNodes = useDesignerStore((state) => state.logicNodes);
    const logicEdges = useDesignerStore((state) => state.logicEdges);

    return (
        <>

            <IconButton
                icon={<FaPlay />}
                onClick={() => handleButtonClick(components, properties, variables, logicNodes, logicEdges, setLoading)}
                baseStylesOverwrite={{
                    color: 'white',
                    width: '80px',
                    backgroundColor: 'rgba(0,128,0,1)',
                }}
                hoverStylesOverwrite={{
                    backgroundColor: 'rgba(0,85,0,1)',
                }}
                // title="Preview"
                after="Preview"
            >
            </IconButton>
            {/* <button onClick={() => handleButtonClick(components, setLoading)}
                style={{
                    background: 'none',
                    color: 'inherit',
                    border: 'none',
                    padding: 0,
                    font: 'inherit',
                    cursor: 'pointer',
                    outline: 'inherit',
                    display: 'flex',

                }}>
                <FaPlay />
                <p>Preview</p>
            </button> */}
            {loading && <div style={{
                display: 'flex',
                // gap: '3rem',
                // filter: 'blur(5px)',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                opacity: 0.93,
                backgroundColor: 'black',
                zIndex: 999
            }}>
                <h3 style={{ color: 'white', userSelect: 'none', marginBottom: '1rem', fontStyle: 'italic' }}>Good things come to those who wait.</h3>
                <p style={{ color: 'white', userSelect: 'none', marginBottom: '2rem' }}>Meaning, building your App.</p>
                <ClimbingBoxLoader color="white" loading={loading} size={20} />
                <div style={{
                    marginTop: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    alignItems: 'center',
                    background: 'white',
                    padding: '9px',
                }}>
                    <p style={{ color: 'black', }}>Launch on mobile (WIP 😄)</p>
                    <QRCode value="http://192.168.1.155:4000/" size={80} />
                </div>
            </div>}
        </>
    )
}

export default PreviewButton;