import { parseProperties } from '../helpers/utils';

type Props = {
    onClick: (() => Promise<void>) | undefined,
    [x: string]: any
}
const CImage = ({ onClick, ...otherProperties }: Props) => {
    const parsedProperties = parseProperties(otherProperties);
    return <img
        style={{
            ...parsedProperties,
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