import Navbar from "../components/Navbar";
import SidebarMenu from "../components/SidebarMenu";
import useDesignerStore from "../stores/designer";
import style from './Designer.module.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const variables: Record<string, {
    type: 'number' | 'text' | 'boolean',
    initialValue: string | number | boolean,
    value: string | number | boolean,
}> = {
    name: {
        type: 'text',
        initialValue: 'James',
        value: 'James'
    },
    age: {
        type: 'number',
        initialValue: 30,
        value: 30
    },
    hasGlasses: {
        type: 'boolean',
        initialValue: true,
        value: true
    }
}

type VariableProps = {
    id: string,
    // @TODO: expand as necessary for more types
    type: 'number' | 'text' | 'boolean',
    initialValue: string | number | boolean
}

const Variable = ({ id, type, initialValue }: VariableProps) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid grey',
            width: '200px',
            padding: '8px',
            borderRadius: '4px',

        }}>
            <p>Key: <i>{id}</i></p>
            <p>Type: {type}</p>
            <p>Initial Value: {String(initialValue)}</p>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    )
}

const Variables = () => {

    const colorMode = useDesignerStore((state) => state.colorMode);

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
                    {Object.keys(variables).map(varName => {
                        const v = varName as keyof typeof variables;
                        return (<Variable
                            id={v}
                            type={variables[v].type}
                            initialValue={variables[v].initialValue}
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