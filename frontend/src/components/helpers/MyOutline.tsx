import { useEffect, useState } from "react"
import MyPortal from "./MyPortal"

type boundingRectType = {
    top: number,
    bottom: number,
    left: number,
    right: number,
    width: number,
    height: number,
}

type myOutlineProps = {
    boundingRect: boundingRectType,
    color: string,
    thickness: number,
}

/**
 * Provides the outline effects when canvas components are selected / hovered.
 */
const MyOutline = ({ boundingRect, color, thickness }: myOutlineProps) => {

    console.log('C - MyOutline ')

    const [isVisible, setIsVisible] = useState(true);

    // hide outline if over the limits
    // note: 72px ~ top navbar (toolbar) height
    console.log('C - MyOutline ', boundingRect, window.innerWidth)
    useEffect(() => {
        if (
            // height within viewport
            (boundingRect.top >= 72 && boundingRect.bottom <= window.innerHeight)
            // width within viewport
            && (boundingRect.left >= 300 && boundingRect.right <= (window.innerWidth - 300))
        ) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }, [boundingRect.bottom, boundingRect.top, boundingRect.left, boundingRect.right])

    return <>
        {isVisible
            ? <>
                {/* top */}
                <MyPortal styles={{ position: 'absolute', top: `calc(${boundingRect.top}px)`, left: boundingRect.left }}>
                    <div style={{
                        width: `${boundingRect.width}px`,
                        height: `${thickness}px`,
                        backgroundColor: color
                    }}></div>
                </MyPortal>

                {/* bottom */}
                <MyPortal styles={{ position: 'absolute', top: `calc(${boundingRect.bottom - thickness}px)`, left: boundingRect.left }}>
                    <div style={{
                        width: `${boundingRect.width}px`,
                        height: `${thickness}px`,
                        backgroundColor: color
                    }}></div>
                </MyPortal>

                {/* left */}
                <MyPortal styles={{ position: 'absolute', top: `calc(${boundingRect.top}px)`, left: boundingRect.left }}>
                    <div style={{
                        height: `${boundingRect.height}px`,
                        width: `${thickness}px`,
                        backgroundColor: color
                    }}></div>
                </MyPortal>

                {/* right */}
                <MyPortal styles={{ position: 'absolute', top: `calc(${boundingRect.top}px)`, left: boundingRect.right - thickness }}>
                    <div style={{
                        height: `${boundingRect.height}px`,
                        width: `${thickness}px`,
                        backgroundColor: color
                    }}></div>
                </MyPortal>
            </>
            : null}
    </>
}

export default MyOutline;