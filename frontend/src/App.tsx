import { ChakraProvider } from '@chakra-ui/react'
import './App.css'
import Designer from './pages/Designer'
import { ColorModeScript } from '@chakra-ui/react';
import theme from './config/theme';

function App() {

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Designer />
    </ChakraProvider>
  )
}

export default App
