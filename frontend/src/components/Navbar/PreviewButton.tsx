import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import useDesignerStore from "../../stores/designer";
import axios from "axios";
import { useState } from "react";
import QRCode from "react-qr-code";

const handleButtonClick = async (components, setLoading) => {

    setLoading(true);

    try {
        console.log(components)
        // const d = new Date();
        // let time = d.getTime();
        const response = await axios.post('http://localhost:3000/start-new-server', {
            port: 4000,
            data: components
        });
        var win = window.open('http://localhost:4000/', '_blank');
        win.focus();
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

    return (
        <>
            <button onClick={() => handleButtonClick(components, setLoading)}>Open Preview</button>
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
                    <QRCode value="http://192.168.0.21:4000/" size={80} />
                </div>
            </div>}
        </>
    )
}

export default PreviewButton;