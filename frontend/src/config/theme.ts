import { extendTheme } from '@chakra-ui/react';

const config = {
    initialColorMode: 'dark', // dark | light
    useSystemColorMode: false, //true to follow system color mode
};

const theme = extendTheme({
    config
});

export default theme;