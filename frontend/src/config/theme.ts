import { Button, IconButton, background, color, extendTheme } from '@chakra-ui/react';
import type { StyleFunctionProps } from '@chakra-ui/styled-system';

const config = {
    initialColorMode: 'dark', // dark | light
    useSystemColorMode: false, //true to follow system color mode
};

const theme = extendTheme({
    config,
    // colors: {
    //     transparent: 'transparent',
    //     black: '#000',
    //     white: 'white',
    //     gray: {
    //         50: '#f7fafc',
    //         // ...
    //         900: '#171923',
    //     },
    //     // ...
    // },
    styles: {
        global: (props) => ({
            "body": {
                background: props.colorMode === "dark" ? 'blackAlpha.50' : 'gray.50',
                // color: 'black'
            },
        }),
    },
    // components: {
    //     // https://v2.chakra-ui.com/docs/styled-system/customize-theme
    // //     Button: {
    // //         // 1. We can update the base styles
    // //         baseStyle: {
    // //             // fontWeight: 'bold', // Normally, it is "semibold"
    // //             background: 'blue',
    // //             _hover: {
    // //                 backgroundColor: 'blue'
    // //             }
    // //         },
    // //         // // 2. We can add a new button size or extend existing
    // //         // sizes: {
    // //         //     xl: {
    // //         //         h: '56px',
    // //         //         fontSize: 'lg',
    // //         //         px: '32px',
    // //         //     },
    // //         // },
    // //         // // 3. We can add a new visual variant
    // //         // variants: {
    // //         //     'with-shadow': {
    // //         //         bg: 'red.400',
    // //         //         boxShadow: '0 0 2px 2px #efdfde',
    // //         //     },
    // //         //     // 4. We can override existing variants
    // //         //     solid: (props: StyleFunctionProps) => ({
    // //         //         bg: props.colorMode === 'dark' ? 'red.300' : 'red.500',
    // //         //     }),
    // //         //     // 5. We can add responsive variants
    // //         //     sm: {
    // //         //         bg: 'teal.500',
    // //         //         fontSize: 'md',
    // //         //     },
    // //         // },
    // //         // // 6. We can overwrite defaultProps
    // //         // defaultProps: {
    // //         //     size: 'lg', // default is md
    // //         //     variant: 'sm', // default is solid
    // //         //     colorScheme: 'green', // default is gray
    // //         //     // background:'red,'
    // //         // },
    // //     },
    // },
});

export default theme;