import useDesignerStore from "../../stores/designer";
import { renderNode } from "../../utils";
import { useEffect, useMemo, useRef } from "react";
import { DESIGN_PARAMETERS } from "../../config/application";


const Canvas = () => {

    console.log('C - Canvas')


    const components = useDesignerStore((state) => state.components);
    const properties = useDesignerStore((state) => state.properties['canvas']);
    const setIsCanvasScrolling = useDesignerStore((state) => state.setIsCanvasScrolling);
    const toggleSelectedId = useDesignerStore((state) => state.toggleSelectedId);
    const selectedId = useDesignerStore((state) => state.selectedId);

    const comps = useMemo(
        () => {
            // if (!isScrolling) {
            return renderNode(components, 'canvas')
            // }
        },
        // [components, properties, renderToggle]
        [components]
    );

    interface ScrollContainerElement extends HTMLDivElement {
        scrollTimeout?: number;
    }
    const scrollContainerRef = useRef<ScrollContainerElement | null>(null);


    useEffect(() => {
        // alternatively we could re-render while scrolling, 
        // but performance might be worse than hide while scrolling
        const handleScroll = () => {
            setIsCanvasScrolling(true)
            console.log('debb - SCROLLING START')
            // reset the scrolling state after a delay
            clearTimeout(scrollContainerRef.current?.scrollTimeout);
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTimeout = setTimeout(() => {
                    setIsCanvasScrolling(false)
                    console.log('debb - SCROLLING END')
                }, 150); // 150ms delay
            }
        };

        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll, { capture: true });
        }

        // Cleanup event listener on component unmount
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll, { capture: true });
            }
        };
    }, []);

    return (
        // div to center canvas
        <div
            style={{
                flex: 1,
                // flex (and maxHeight if given below) causes issue and comps do not respect height and shrink to minHeight; solved with a wrapper
                display: 'flex',
                border: '1px solid grey',
                flexDirection: 'column',
                // alignContent: 'center',
                justifyContent: 'center',
                overflowY: 'auto',
                overflowX: 'auto',
                // height: `${properties['canvas'].canvasHeightPx}px`,
            }}>
            {/* div to size canvas */}
            <div
                // onScroll={() => { console.log('SCROLL') }}
                ref={scrollContainerRef}
                id="my-canvas-wrapper"
                style={{
                    // frozen (not editable)
                    border: '1px solid grey',
                    overflowY: 'auto',
                    overflowX: 'auto',
                    outline: selectedId === 'canvas' ? `3px solid ${DESIGN_PARAMETERS.BORDER_COLOR_SELECTED_COMPONENT}` : 'none',
                    // minWidth: `${properties.canvasWidthPx}px`,
                    minWidth: window.innerWidth - 605 > Number(properties.canvasWidthPx) ? `${properties.canvasWidthPx}px` : `calc(100vw - 605px)`,
                    margin: '0 auto',
                    minHeight: `min(calc(100%), ${properties.canvasHeightPx}px)`,
                    // maxWidth: `${properties.canvasWidthPx}px`,
                    maxWidth: window.innerWidth - 605 > Number(properties.canvasWidthPx) ? `${properties.canvasWidthPx}px` : `calc(100vw - 605px)`,
                    // maxHeight causes issue and comps do not respect height and shrink to minHeight
                    maxHeight: `${properties.canvasHeightPx}px`,
                }}>
                {/* div for scrollable canvas */}
                <div
                    onClick={() => { toggleSelectedId('canvas'); }}
                    id="my-canvas"
                    style={{
                        // frozen (not editable)
                        display: properties.display || 'flex',
                        // frozen (not editable)
                        flexDirection: properties.flexDirection || 'column',
                        position: 'relative',
                        // overflowY: 'auto',
                        // overflowX: 'hidden',
                        minHeight: '100%',
                        margin: '0 auto',
                        gap: properties.gap || undefined,
                        flexWrap: properties.flexWrap || undefined,
                        alignItems: properties.alignItems || undefined,
                        justifyContent: properties.justifyContent || undefined,
                        paddingTop: properties.paddingTop || undefined,
                        paddingBottom: properties.paddingBottom || undefined,
                        paddingLeft: properties.paddingLeft || undefined,
                        paddingRight: properties.paddingRight || undefined,
                        backgroundColor: properties.backgroundColor || undefined,
                        backgroundImage: properties.backgroundImage || undefined,
                        backgroundSize: properties.backgroundSize || undefined,
                        backgroundAttachment: properties.backgroundAttachment || undefined,
                        backgroundRepeat: properties.backgroundRepeat || undefined,
                        backgroundPosition: properties.backgroundPosition || undefined,
                    }}
                >
                    {comps}
                </div>
            </div>
        </div>)
};

export default Canvas;