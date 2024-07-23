import './App.css'
import Designer from './pages/Designer'
import Variables from './pages/Variables';
import useDesignerStore from './stores/designer';

function App() {

  const page = useDesignerStore((state) => state.page);

  return (
    <>
      {page === 'designer' && <Designer />}
      {page === 'variables' && <Variables />}
    </>
  )
}

export default App;
