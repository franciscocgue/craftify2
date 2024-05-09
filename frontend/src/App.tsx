import { ChakraProvider } from '@chakra-ui/react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Designer from './pages/Designer'

function App() {

  return (
    <ChakraProvider>
      <Designer />
    </ChakraProvider>
  )
}

export default App
