import propertiesData from './properties.json';
import { renderNode } from './helpers/ui-builder';
import { ComponentCollectionProperties } from './types/index.types';

const properties : ComponentCollectionProperties = propertiesData as ComponentCollectionProperties;

const App = () => {
    return (
        <div style={{fontSize:'1rem'}}>
            {/* <h1>Test, user-app  !!!</h1> */}
            {/* {Object.keys(components).map(id => <p>{components[id].name}</p>)} */}
            {/* {Object.keys(components).map(id => id === 'canvas' ? <p>{components[id].name}</p> : <CButton {...properties[id]}/>)} */}

            {renderNode('canvas', properties)}
        </div>
    )
}

export default App;