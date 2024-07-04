import { CSSProperties, useState } from "react"

const useHover = (baseStyle: CSSProperties, hoverStyle: CSSProperties): [combinedStyle: CSSProperties, eventHandlers: { onMouseEnter: () => void, onMouseLeave: () => void }] => {
    const [isHovered, setIsHovered] = useState(false);

    const combinedStyle = isHovered ? { ...baseStyle, ...hoverStyle } : baseStyle;

    const eventHandlers = {
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
    };

    return [combinedStyle, eventHandlers];
}

export {
    useHover,
}