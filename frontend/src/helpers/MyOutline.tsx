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
    thickness: number
}

const MyOutline = ({ boundingRect, color, thickness }: myOutlineProps) => {

    // note: refResizable.current?.resizable.getBoundingClientRect()

    // const insideViewPort

    return <>
        {/* top */}
        <MyPortal position={{ position: 'absolute', top: `calc(${boundingRect.top}px)`, left: boundingRect.left }}>
            <div style={{
                width: `${boundingRect.width}px`,
                height: `${thickness}px`,
                backgroundColor: color
            }}></div>
        </MyPortal>

        {/* bottom */}
        <MyPortal position={{ position: 'absolute', top: `calc(${boundingRect.bottom - thickness}px)`, left: boundingRect.left }}>
            <div style={{
                width: `${boundingRect.width}px`,
                height: `${thickness}px`,
                backgroundColor: color
            }}></div>
        </MyPortal>

        {/* left */}
        <MyPortal position={{ position: 'absolute', top: `calc(${boundingRect.top}px)`, left: boundingRect.left }}>
            <div style={{
                height: `${boundingRect.height}px`,
                width: `${thickness}px`,
                backgroundColor: color
            }}></div>
        </MyPortal>

        {/* right */}
        <MyPortal position={{ position: 'absolute', top: `calc(${boundingRect.top}px)`, left: boundingRect.right }}>
            <div style={{
                height: `${boundingRect.height}px`,
                width: `${thickness}px`,
                backgroundColor: color
            }}></div>
        </MyPortal>
    </>
}

export default MyOutline;