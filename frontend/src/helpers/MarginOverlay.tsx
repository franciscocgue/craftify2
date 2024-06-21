import { Box } from "@chakra-ui/react";

interface MarginOverlayProps {
    width: string | number | undefined;
    height: string | number | undefined;
    top?: string | number | undefined;
    left?: string | number | undefined;
    right?: string | number | undefined;
    bottom?: string | number | undefined;
}
const MarginOverlay = (props: MarginOverlayProps) => {
    console.log('C - MarginOverlay')
    return <Box style={{
        position: 'absolute',
        width: props.width, // '100%',
        height: props.height, // '40px',
        backgroundColor: 'orange',
        top: props.top, // '-40px',
        left: props.left, // '0',
        right: props.right, // '0',
        bottom: props.bottom, // '0',
        opacity: '0.15'
    }}></Box>
}

export default MarginOverlay;