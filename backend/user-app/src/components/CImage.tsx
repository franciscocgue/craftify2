import { useDynamicVariables } from '../hooks/useVariables';

type Props = {
    onClick: (() => Promise<void>) | undefined,
    [x: string]: any
}
const CImage = ({ onClick, ...otherProperties }: Props) => {

    // subscribes to variable changes
    const [parsedProperties] = useDynamicVariables(otherProperties);

    return <img
        style={{
            ...parsedProperties,
            // visibility
            ...(!parsedProperties.__visible && { display: 'none' }),
        }}
        src={parsedProperties.__src}
        alt={parsedProperties.__alt}
        onClick={(event: React.MouseEvent<HTMLImageElement>) => {
            // prevent triggering parent onClick events
            event.stopPropagation();
            if (onClick) onClick();
        }}
    >
        {/* exclude below from the built version */}
        {/* end exclude block */}
    </img>
}

export default CImage;