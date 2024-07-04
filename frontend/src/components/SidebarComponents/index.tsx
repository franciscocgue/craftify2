import DraggableCompPalette from "../../helpers/DraggableCompPalette";
import Component from "./Component";
import { compTypes } from '../../config/components';
import { Resizable } from "re-resizable";
import ComponentTree from "./ComponentTree";
import { useMemo } from "react";
import styles from './index.module.css';

const SidebarComponents = () => {

    console.log('C - SidebarComponents')

    const compsInPalette = useMemo(
        () => (
            <div
            style={{
                display: 'flex',
                width: '100%',
                padding: '8px',
                borderTop:'1px solid grey',
                borderBottom:'1px solid grey',
                maxHeight:'100%',
                overflowY:'auto',
                gap:1,
                justifyContent:'flex-start',
                alignContent:'start',
                flexWrap:'wrap',
                flexGrow:1,
            }}
            >
                {Object.keys(compTypes).map(c => <DraggableCompPalette componentType={c} key={c} id={c}>
                    <Component type={c} name={compTypes[c as keyof typeof compTypes].name} icon={compTypes[c as keyof typeof compTypes].icon} style={{ cursor: 'pointer' }} />
                </DraggableCompPalette>)}
            </div>
        ),
        [compTypes]
    );

    return <div
        style={{
            flexDirection: 'column',
            display: 'flex',
            width: '250px',
            height: '100%',
            maxHeight: '100%'
        }}
    >
        {compsInPalette}
        <Resizable
            defaultSize={{
                width: '100%',
                height: '50%',
            }}
            handleComponent={{
                top: <div
                className={styles['resize-handle']}
                    style={{
                        height: '100%',
                        width: '100%',
                    }}
                    // h={'100%'} w={'100%'} _hover={{ 'backgroundColor': 'darkgrey' }}
                ></div>
            }}
            maxWidth={'100%'}
            maxHeight={'100%'}
            enable={{ top: true, right: false, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
        >
            <ComponentTree />
        </Resizable>
    </div>
}

export default SidebarComponents;