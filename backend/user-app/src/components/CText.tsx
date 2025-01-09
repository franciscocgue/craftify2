import { parseProperties } from '../helpers/utils';
import { useDynamicVariables } from '../hooks/useVariables';

type Props = {
    onClick: (() => Promise<void>) | undefined,
    [x: string]: any
}
const CText = ({ onClick, ...otherProperties }: Props) => {
    
    // subscribes to variable changes
    useDynamicVariables(otherProperties);
    
    const parsedProperties = parseProperties(otherProperties);
    return <p
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
    </p>
};

export default CText;