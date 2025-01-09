import { ReactNode } from "react"
import { parseProperties } from "../helpers/utils";
import { useDynamicVariables } from "../hooks/useVariables";


type Props = {
    onClick: (() => Promise<void>) | undefined,
    children: ReactNode,
    [x: string]: any
}
const CContainerColumn = ({ onClick, children, ...otherProperties }: Props) => {
    
    // subscribes to variable changes
    useDynamicVariables(otherProperties);
    
    const parsedProperties = parseProperties(otherProperties);
    return <div
        style={{
            ...parsedProperties,
        }}
        onClick={(event: React.MouseEvent<HTMLElement>) => {
            // prevent triggering parent onClick events
            event.stopPropagation();
            if (onClick) onClick();
        }}
    >
        {children}
    </div>
}

export default CContainerColumn;