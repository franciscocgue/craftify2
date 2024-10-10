import React from 'react';
import components from './components.json';
import properties from './properties.json';
import { renderNode } from './utils/ui-builder';

const App = () => {
    return (
        <div style={{fontSize:'1rem'}}>
            {/* <h1>Test, user-app  !!!</h1> */}
            {/* {Object.keys(components).map(id => <p>{components[id].name}</p>)} */}
            {/* {Object.keys(components).map(id => id === 'canvas' ? <p>{components[id].name}</p> : <CButton {...properties[id]}/>)} */}

            {renderNode(components, 'canvas', properties)}
        </div>
    )
}

export default App;