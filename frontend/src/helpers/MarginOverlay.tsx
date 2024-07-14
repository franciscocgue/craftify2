import useDesignerStore from "../stores/designer";
import MyPortal from "./MyPortal";

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

    return <MyPortal position={{
        position: 'absolute',
        top: `calc(${props.top}px - ${props.height})`,
        left: props.left,
        width: props.width,
        height: props.height,
        border: '1px solid red',
        backgroundColor: colorMode === 'dark' ? '#1d8348' : '#abebc6',
        opacity: colorMode === 'dark' ? '0.4' : '0.8',
    }}>
        {/* <div style={{
            // position: 'absolute',
            width: '100%',
            height: '100%',
            // top: props.top, // '-40px',
            // left: props.left, // '0',
            // right: props.right, // '0',
            // bottom: props.bottom, // '0',
            backgroundColor: colorMode === 'dark' ? '#1d8348' : '#abebc6',
            opacity: colorMode === 'dark' ? '0.4' : '0.8',
        }}
        ></div> */}
    </MyPortal>
}

export default MarginOverlay;