import { parseProperties } from "../helpers/utils";

type Props = {
    onClick: (() => Promise<void>) | undefined,
    [x: string]: any
}
const CLink = ({ onClick, ...otherProperties }: Props) => {
    const parsedProperties = parseProperties(otherProperties);
    return <>
        <a
            href={parsedProperties.__href}
            target={parsedProperties.__target}
            style={{
                ...parsedProperties,
            }}
            onClick={(event: React.MouseEvent<HTMLElement>) => {
                // prevent triggering parent onClick events
                event.stopPropagation();
                if (onClick) {
                    // prevent default (href)
                    event.preventDefault();
                    onClick();
                }
            }}
        >
            {parsedProperties.__text}
        </a>
    </>
}

export default CLink;