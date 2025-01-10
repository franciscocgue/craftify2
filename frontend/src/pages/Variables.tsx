import { IoText } from "react-icons/io5";
import MyTextInput from "../components/common/MyTextInput";
import Navbar from "../components/Navbar";
import SidebarMenu from "../components/SidebarMenu";
import useDesignerStore from "../stores/designer";
import style from './page.module.css';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { TbNumber123 } from "react-icons/tb";
import { CSSProperties, useState } from "react";
import { Variable } from "../types/variables.types";
import IconButton from "../components/common/IconButton";
import { RiDeleteBin2Fill } from "react-icons/ri";


type VariableProps = {
    id: string,
    // @TODO: expand as necessary for more types
    type: 'number' | 'string' | 'boolean',
    value: string | number | boolean,
    colorMode: 'light' | 'dark',
}

const VariableComp = ({ id, type, value, colorMode }: VariableProps) => {

    const deleteVariable = useDesignerStore((state) => state.deleteVariable);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            borderBottom: '1px solid grey',
            width: '100%',
            padding: '8px',
            alignItems: 'center',
            // borderRadius: '4px',
            gap: '15px',
            // position: 'relative',
            // flexWrap: 'wrap',
        }}>
            <RiDeleteBin2Fill
                size={22}
                color={colorMode === 'light' ? 'rgb(200,20,20)' : 'rgb(255,150,150)'}
                style={{ cursor: 'pointer' }}
                title="Delete"
                onClick={() => deleteVariable(id)}
            />
            <p style={{ fontWeight: 'bold', width: '300px', overflowX: 'scroll' }}>{id}</p>
            <p style={{
                border: '1px solid grey',
                display: 'flex',
                alignItems: 'center',
                height: '30px',
                width: '60px',
                justifyContent: 'center',
                borderRadius: '6px',
                padding: '7px'
            }}>
                {type === 'string' && <IoText size={16} />}
                {type === 'number' && <TbNumber123 size={20} />}
                {type === 'boolean' && <p style={{ userSelect: 'none', fontSize: 'small' }}>Yes/No</p>}
            </p>
            <p><span style={{ fontSize: 'normal', color: 'grey' }}>Initial value:</span> {String(value ?? '')}</p>
        </div>
    )
}

const btnVariableTypeStyle = (isSelected: boolean, colorMode: "dark" | "light"): CSSProperties => {
    return {
        borderRadius: '10px',
        background: colorMode === 'light' ? 'white' : isSelected ? 'grey' : 'black',
        display: 'flex',
        alignItems: 'center',
        color: 'inherit',
        outline: colorMode === 'light' ? isSelected ? '2px solid grey' : '1px solid lightgrey' : 'none',
        border: 'none',
        padding: '5px 15px',
        font: 'inherit',
        cursor: 'pointer',
        height: '31px'
        // outline: 'inherit',
    }
}

const handleSave = (
    createVariable: (key: string, value: any, type: Variable["type"]) => void,
    variable: {
        key: string;
        type: Variable["type"];
        value: any;
    },
) => {

    const isValidVariableName = (key: string) => /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key);

    if (!isValidVariableName(variable.key)) {
        toast('Enter a valid variable key', { type: 'error', autoClose: 2500, position: 'bottom-left' })
        return;
    }

    if (!variable.type) {
        toast('Select a variable type', { type: 'error', autoClose: 2500, position: 'bottom-left' })
        return;
    }

    // create (or update) variable
    createVariable(variable.key, variable.value, variable.type);
}

const Variables = () => {

    const colorMode = useDesignerStore((state) => state.colorMode);
    const variables = useDesignerStore((state) => state.variables);
    const upsertVariable = useDesignerStore((state) => state.upsertVariable);
    const [newVariable, setNewVariable] = useState<{
        key: string,
        type: Variable['type'],
        value: any
    }>({ key: '', type: 'string', value: '' });

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
                        gap: '7px',
                        // alignItems: 'flex-start',
                    }}
                >
                    <p>Key</p>
                    <MyTextInput
                        value={newVariable.key}
                        onChange={(val) => setNewVariable(prev => ({ ...prev, key: val || '' }))}
                        placeholder="Example: userName"
                    />
                    <p style={{ marginTop: '12px' }}>Type</p>
                    <div style={{
                        display: 'flex',
                        // width: '100%',
                        justifyContent: 'flex-start',
                        gap: '15px'
                    }}>
                        <button
                            onClick={() => setNewVariable(prev => ({ ...prev, type: 'string', value: (prev.type === 'string' ? prev.value : undefined) }))}
                            style={btnVariableTypeStyle(newVariable.type === 'string', colorMode)}><IoText size={20} /></button>
                        <button
                            onClick={() => setNewVariable(prev => ({ ...prev, type: 'number', value: (prev.type === 'number' ? prev.value : undefined) }))}
                            style={btnVariableTypeStyle(newVariable.type === 'number', colorMode)}><TbNumber123 size={27} /></button>
                        <button
                            onClick={() => setNewVariable(prev => ({ ...prev, type: 'boolean', value: (prev.type === 'boolean' ? prev.value : undefined) }))}
                            style={btnVariableTypeStyle(newVariable.type === 'boolean', colorMode)}>Yes/No</button>
                    </div>
                    <p style={{ marginTop: '12px' }}>Initial value</p>
                    {newVariable.type === 'string' && <MyTextInput
                        value={newVariable.value}
                        onChange={(val) => setNewVariable(prev => ({ ...prev, value: val || '' }))}
                        placeholder="Example: James"
                    />}
                    {newVariable.type === 'number' && <MyTextInput
                        value={newVariable.value}
                        onChange={(val) => setNewVariable(prev => ({ ...prev, value: parseFloat(val || '') }))}
                        placeholder="Example: 12.3"
                    />}
                    {newVariable.type === 'boolean' &&
                        <div style={{
                            display: 'flex',
                            // width: '100%',
                            justifyContent: 'flex-start',
                            gap: '15px'
                        }}>
                            <button
                                onClick={() => setNewVariable(prev => ({ ...prev, value: true }))}
                                style={btnVariableTypeStyle(newVariable.value === true, colorMode)}>Yes</button>
                            <button
                                onClick={() => setNewVariable(prev => ({ ...prev, value: false }))}
                                style={btnVariableTypeStyle(newVariable.value === false, colorMode)}>No</button>
                        </div>}
                    <IconButton
                        baseStylesOverwrite={{ borderRadius: '10px', marginTop: '30px', width: 'auto', color: 'white', padding: '5px 20px' }}
                        after="Save"
                        onClick={() => { handleSave(upsertVariable, newVariable) }}
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
                        // flexWrap: 'wrap',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        overflowY: 'scroll',
                        // justifyContent: 'flex-start',
                    }}
                >
                    {variables.map(variable => {
                        return (<VariableComp
                            id={variable.key}
                            type={variable.type}
                            value={variable.value}
                            colorMode={colorMode}
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