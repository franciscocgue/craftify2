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

const fetchData = async ({ params }) => {

  const appIdInStore = useDesignerStore.getState().appId;
  const appId = params.appId;

  if (appIdInStore === appId) {
    // no need to re-fetch data
    return null;
  }

  console.log(appId);

  await new Promise(resolve => setTimeout(() => {
    resolve('foo')
  }, 4000));

  // await setTimeout(() => {
  //     console.log('in timeout')
  // }, 4000);
  console.log('rrrrrrrrrrr end')

  return { data: [1, 2, 3, 4, 5] };
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