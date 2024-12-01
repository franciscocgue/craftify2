import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.tsx';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './routes/ErrorPage.tsx';
import Root from './routes/Root.tsx';
import Designer from './pages/Designer.tsx';
import useDesignerStore from './stores/designer.ts';
import Variables from './pages/Variables.tsx';
import axios from 'axios';
import { ComponentCollection, ComponentCollectionProperties } from './types/designer.types.ts';
import { compProperties } from './config/components.tsx';

// initialize components
const initialComponents: ComponentCollection = {
  'canvas': {
    type: 'canvas',
    parent: null,
    children: [],
    name: 'Canvas'
  },
}
// initialize component properties
const initialProperties: ComponentCollectionProperties = { canvas: compProperties['canvas'] };

const fetchData = async ({ params }) => {

  const appIdInStore = useDesignerStore.getState().appId;
  const appId = params.appId;

  // check appId exists
  const { data } = await axios.post('http://localhost:3000/api/web-service/validate-appid', { appId });
  if (!data.data.isValid) {
    throw new Error('Invalid Application ID; check the URL')
  }

  if (appIdInStore === appId) {
    // no need to re-fetch data
    return null;
  }

  try {
    const { data: componentsString } = await axios.post('http://localhost:3000/api/web-service/get-project-object', {
      "appId": appId,
      "objectName": "components"
    });
    // {} if object not yet stored, new project
    const components = componentsString === '{}' ? initialComponents : JSON.parse(componentsString);

    const { data: propertiesString } = await axios.post('http://localhost:3000/api/web-service/get-project-object', {
      "appId": appId,
      "objectName": "properties"
    });
    // {} if object not yet stored, new project
    const properties = propertiesString === '{}' ? initialProperties : JSON.parse(propertiesString);

    const { data: variablesString } = await axios.post('http://localhost:3000/api/web-service/get-project-object', {
      "appId": appId,
      "objectName": "variables"
    });
    const variables = JSON.parse(variablesString);

    const { data: logicNodesString } = await axios.post('http://localhost:3000/api/web-service/get-project-object', {
      "appId": appId,
      "objectName": "logicNodes"
    });
    const logicNodes = JSON.parse(logicNodesString);

    const { data: logicEdgesString } = await axios.post('http://localhost:3000/api/web-service/get-project-object', {
      "appId": appId,
      "objectName": "logicEdges"
    });
    const logicEdges = JSON.parse(logicEdgesString);

    useDesignerStore.setState({ appId });
    useDesignerStore.setState({ components });
    useDesignerStore.setState({ properties });
    useDesignerStore.setState({ variables });
    useDesignerStore.setState({ logicEdges });
    useDesignerStore.setState({ logicNodes });
  } catch {
    throw new Error("Could not load project data");
  }

  return null;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: ":appId/designer",
    element: <Designer />,
    loader: fetchData,
    errorElement: <ErrorPage />,
  },
  {
    path: ":appId/variables",
    element: <Variables />,
    loader: fetchData,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)