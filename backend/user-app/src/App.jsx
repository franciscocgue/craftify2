import React from 'react';
import components from './components.json';

const App = () => {
    return (
        <div style={{fontSize:'1rem'}}>
            <h1>Test, user-app  !!!</h1>
            {Object.keys(components).map(id => <p>{components[id].name}</p>)}
        </div>
    )
}

export default App;