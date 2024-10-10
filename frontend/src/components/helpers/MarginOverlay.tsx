import useDesignerStore from "../../stores/designer";
import MyPortal from "./MyPortal";
import { marginAsPx } from "../../utils";

interface MarginOverlayProps {
    marginTop?: string,
    marginLeft?: string,
    marginRight?: string,
    marginBottom?: string,
    componentRef: React.MutableRefObject<HTMLDivElement | null>,
}

/**
 * Margin overlay effects for components and containers in the canvas
 */
const MarginOverlay = (props: MarginOverlayProps) => {
    console.log('C - MarginOverlay')

    // const { colorMode } = useColorMode();
    const colorMode = useDesignerStore((state) => state.colorMode);

    return <>
        {/* top */}
        {props.marginTop
            // avoid ts warning
            && props.componentRef.current?.parentElement
            && parseInt(props.marginTop) !== 0
            // note: 72px ~ top navbar (toolbar) height
            && 72 <= (props.componentRef.current?.getBoundingClientRect().top - marginAsPx(String(props.marginTop), window.getComputedStyle(props.componentRef.current?.parentElement)))
            && window.innerHeight >= props.componentRef.current?.getBoundingClientRect().top
            && 300 <= (props.componentRef.current?.getBoundingClientRect().left - marginAsPx(String(props.marginLeft), window.getComputedStyle(props.componentRef.current?.parentElement)))
            && window.innerWidth - 300 >= props.componentRef.current?.getBoundingClientRect().right
            && <MyPortal styles={{
                position: 'absolute',
                top: props.componentRef.current?.getBoundingClientRect().top - marginAsPx(String(props.marginTop), window.getComputedStyle(props.componentRef.current?.parentElement)),
                left: props.componentRef.current?.getBoundingClientRect().left,
                width: props.componentRef.current?.getBoundingClientRect().width,
                height: marginAsPx(String(props.marginTop), window.getComputedStyle(props.componentRef.current?.parentElement)),
                backgroundColor: colorMode === 'dark' ? '#1d8348' : '#abebc6',
                opacity: colorMode === 'dark' ? '0.4' : '0.8',
            }}>
            </MyPortal>}
        {/* left */}
        {props.marginLeft
            // avoid ts warning
            && props.componentRef.current?.parentElement
            && parseInt(props.marginLeft) !== 0
            // note: 72px ~ top navbar (toolbar) height
            && 72 <= props.componentRef.current?.getBoundingClientRect().top
            && window.innerHeight >= props.componentRef.current?.getBoundingClientRect().bottom
            && 300 <= (props.componentRef.current?.getBoundingClientRect().left - marginAsPx(String(props.marginLeft), window.getComputedStyle(props.componentRef.current?.parentElement)))
            && window.innerWidth - 300 >= props.componentRef.current?.getBoundingClientRect().right
            && <MyPortal styles={{
                position: 'absolute',
                top: props.componentRef.current?.getBoundingClientRect().top,
                left: props.componentRef.current?.getBoundingClientRect().left - marginAsPx(String(props.marginLeft), window.getComputedStyle(props.componentRef.current?.parentElement)),
                width: marginAsPx(String(props.marginLeft), window.getComputedStyle(props.componentRef.current?.parentElement)),
                height: props.componentRef.current?.getBoundingClientRect().height,
                backgroundColor: colorMode === 'dark' ? '#1d8348' : '#abebc6',
                opacity: colorMode === 'dark' ? '0.4' : '0.8',
            }}>
            </MyPortal>}
        {/* bottom */}
        {props.marginBottom
            // avoid ts warning
            && props.componentRef.current?.parentElement
            && parseInt(props.marginBottom) !== 0
            // note: 72px ~ top navbar (toolbar) height
            && 72 <= props.componentRef.current?.getBoundingClientRect().bottom
            && window.innerHeight >= (props.componentRef.current?.getBoundingClientRect().bottom + marginAsPx(String(props.marginBottom), window.getComputedStyle(props.componentRef.current?.parentElement)))
            && 300 <= (props.componentRef.current?.getBoundingClientRect().left - marginAsPx(String(props.marginLeft), window.getComputedStyle(props.componentRef.current?.parentElement)))
            && window.innerWidth - 300 >= props.componentRef.current?.getBoundingClientRect().right
            && <MyPortal styles={{
                position: 'absolute',
                top: props.componentRef.current?.getBoundingClientRect().bottom,
                left: props.componentRef.current?.getBoundingClientRect().left,
                width: props.componentRef.current?.getBoundingClientRect().width,
                height: marginAsPx(String(props.marginBottom), window.getComputedStyle(props.componentRef.current?.parentElement)),
                backgroundColor: colorMode === 'dark' ? '#1d8348' : '#abebc6',
                opacity: colorMode === 'dark' ? '0.4' : '0.8',
            }}>
            </MyPortal>}
        {/* right */}
        {props.marginRight
            // avoid ts warning
            && props.componentRef.current?.parentElement
            && parseInt(props.marginRight) !== 0
            // note: 72px ~ top navbar (toolbar) height
            && 72 <= props.componentRef.current?.getBoundingClientRect().top
            && window.innerHeight >= props.componentRef.current?.getBoundingClientRect().bottom
            && 300 <= (props.componentRef.current?.getBoundingClientRect().left - marginAsPx(String(props.marginLeft), window.getComputedStyle(props.componentRef.current?.parentElement)))
            && window.innerWidth - 300 >= props.componentRef.current?.getBoundingClientRect().right
            && <MyPortal styles={{
                position: 'absolute',
                top: props.componentRef.current?.getBoundingClientRect().top,
                left: props.componentRef.current?.getBoundingClientRect().right,
                width: marginAsPx(String(props.marginRight), window.getComputedStyle(props.componentRef.current?.parentElement)),
                height: props.componentRef.current?.getBoundingClientRect().height,
                backgroundColor: colorMode === 'dark' ? '#1d8348' : '#abebc6',
                opacity: colorMode === 'dark' ? '0.4' : '0.8',
            }}>
            </MyPortal>}
    </>
}

export default MarginOverlay;