import useDesignerStore from "../stores/designer";

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

    // const { colorMode } = useColorMode();
    const colorMode = useDesignerStore((state) => state.colorMode);

    return <div style={{
        position: 'absolute',
        width: props.width, // '100%',
        height: props.height, // '40px',
        top: props.top, // '-40px',
        left: props.left, // '0',
        right: props.right, // '0',
        bottom: props.bottom, // '0',
        backgroundColor: colorMode === 'dark' ? '#1d8348' : '#abebc6',
        opacity: colorMode === 'dark' ? '0.4' : '0.8',
    }}
    ></div>
}

export default MarginOverlay;