import { useDynamicVariables } from '../hooks/useVariables';

type Props = {
    onClick: (() => Promise<void>) | undefined,
    [x: string]: any
}
const CHeader = ({ onClick, ...otherProperties }: Props) => {
    
    // subscribes to variable changes
    const [parsedProperties] = useDynamicVariables(otherProperties);
    
    return <h2
        style={{
            ...parsedProperties,
        }}
        onClick={(event: React.MouseEvent<HTMLElement>) => {
            // prevent triggering parent onClick events
            event.stopPropagation();
            if (onClick) onClick();
        }}
    >
        {parsedProperties.__text}
    </h2>
}

export default CHeader;