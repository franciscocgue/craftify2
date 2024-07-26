import useDesignerStore from "../../stores/designer";
import { renderNode } from "../../helpers/ui-builder";
import { useEffect, useMemo, useRef, useState } from "react";
import FaIcon from "../../helpers/MyIcon";

const screenSizes = {
    'Galaxy S10': [360, 760],
    'Laptop': [1280, 800]
}

const device = "Galaxy S10";

const Canvas = () => {

    console.log('C - Canvas')


    const components = useDesignerStore((state) => state.components);
    const properties = useDesignerStore((state) => state.properties['canvas']);
    const setIsCanvasScrolling = useDesignerStore((state) => state.setIsCanvasScrolling);

    const comps = useMemo(
        () => {
            // if (!isScrolling) {
            return renderNode(components, 'canvas')
            // }
        },
        // [components, properties, renderToggle]
        [components]
    );

    const scrollContainerRef = useRef(null);

    useEffect(() => {
        // alternatively we could re-render while scrolling, 
        // but performance might be worse than hide while scrolling
        const handleScroll = () => {
            setIsCanvasScrolling(true)
            console.log('debb - SCROLLING START')
            // reset the scrolling state after a delay
            clearTimeout(scrollContainerRef.current.scrollTimeout);
            scrollContainerRef.current.scrollTimeout = setTimeout(() => {
                setIsCanvasScrolling(false)
                console.log('debb - SCROLLING END')
            }, 150); // 150ms delay
        };

        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }

        // Cleanup event listener on component unmount
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
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
                alignContent: 'center',
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
                    overflowX: 'hidden',
                    minWidth: `${properties.canvasWidthPx}px`,
                    margin: '0 auto',
                    minHeight: `min(calc(100%), ${properties.canvasHeightPx}px)`,
                    maxWidth: `${properties.canvasWidthPx}px`,
                    // maxHeight causes issue and comps do not respect height and shrink to minHeight
                    maxHeight: `${properties.canvasHeightPx}px`,
                }}>
                {/* div for scrollable canvas */}
                <div
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
                        paddingTop: properties.paddingTop || undefined,
                        paddingBottom: properties.paddingBottom || undefined,
                        paddingLeft: properties.paddingLeft || undefined,
                        paddingRight: properties.paddingRight || undefined,
                        backgroundColor: properties.backgroundColor || undefined,
                        backgroundImage: properties.backgroundImage || undefined,
                        backgroundSize: properties.backgroundSize || undefined,
                    }}
                >
                    {comps}
                </div>
            </div>
        </div>)
};

export default Canvas;