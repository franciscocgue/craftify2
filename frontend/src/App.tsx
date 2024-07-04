import { ChakraProvider } from '@chakra-ui/react'
import './App.css'
import Designer from './pages/Designer'

function App() {

  return (
    <ChakraProvider>
      {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
      <Designer />
    </ChakraProvider>
  )
}

export default App
