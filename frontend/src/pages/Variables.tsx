import Navbar from "../components/Navbar";
import SidebarMenu from "../components/SidebarMenu";
import useDesignerStore from "../stores/designer";
import style from './Designer.module.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


type VariableProps = {
    id: string,
    // @TODO: expand as necessary for more types
    type: 'number' | 'string' | 'boolean',
    value: string | number | boolean
}

const Variable = ({ id, type, value }: VariableProps) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid grey',
            width: '200px',
            padding: '8px',
            borderRadius: '4px',

        }}>
            <p>{id}</p>
            <p><i>{type}</i></p>
            <p>Initial value: {String(value)}</p>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    )
}

const Variables = () => {

    const colorMode = useDesignerStore((state) => state.colorMode);
    const variables = useDesignerStore((state) => state.variables);

    console.log({ variables })

    return (
        <div
            style={{
                flexDirection: 'column',
                display: 'flex',
                height: '100vh',
                minHeight: '100vh',
                maxHeight: '100vh',
                width: '100vw',
                maxWidth: '100vw',
            }}
            className={style[colorMode === 'dark' ? 'theme-dark' : 'theme-light']}
        >
            <ToastContainer />
            <Navbar />
            {/* main content */}
            <div style={{
                flex: 1,
                display: 'flex',
                overflow: 'hidden'
            }}
            >
                <SidebarMenu />
                {/* variable editor */}
                <div
                    style={{
                        width: '250px',
                        display: 'flex',
                        flexDirection: 'column',
                        borderTop: '1px solid grey',
                        borderBottom: '1px solid grey',
                        padding: '8px',
                        gap: '5px',
                        alignItems: 'flex-start',
                    }}
                >
                    <p>Key</p>
                    <input
                        placeholder={'variable key'}
                    // value={value}
                    // onChange={handleChange}
                    />
                    <p>Type</p>
                    <input
                        placeholder={'variable type'}
                    // value={value}
                    // onChange={handleChange}
                    />
                    <p>Initial value</p>
                    <input
                        placeholder={'initial value'}
                    // value={value}
                    // onChange={handleChange}
                    />
                </div>
                {/* variable collection */}
                <div
                    style={{
                        flex: 1,
                        display: 'flex',
                        border: '1px solid grey',
                        padding: '8px',
                        gap: '5px',
                        alignItems: 'flex-start',
                    }}
                >
                    {variables.map(variable => {
                        return (<Variable
                            id={variable.key}
                            type={variable.type}
                            value={variable.value}
                        />)
                    })}
                </div>
                {/* <SidebarComponents />
        <Canvas />
        <SidebarProperties /> */}

            </div>
        </div>
    );
};

export default Variables;