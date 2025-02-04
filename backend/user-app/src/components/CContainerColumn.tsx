import { ReactNode } from "react"
import { useDynamicVariables } from "../hooks/useVariables";


type Props = {
    onClick: (() => Promise<void>) | undefined,
    children: ReactNode,
    [x: string]: any
}
const CContainerColumn = ({ onClick, children, ...otherProperties }: Props) => {

    // subscribes to variable changes
    const [parsedProperties] = useDynamicVariables(otherProperties);

    return <div
        style={{
            ...parsedProperties,
            // visibility
            ...(!parsedProperties.__visible && { display: 'none' }),
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