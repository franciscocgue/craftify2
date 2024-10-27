import React from 'react';
import { parseProperties } from '../helpers/utils';

type Props = {
    onClick: (() => Promise<void>) | undefined,
    [x: string]: any
}
const CButton = ({ onClick, ...otherProperties }: Props) => {
    const parsedProperties = parseProperties(otherProperties);
    return <button
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            // prevent triggering parent onClick events
            event.stopPropagation();
            if (onClick) onClick();
        }}
        style={{
            ...parsedProperties
        }}
    >
        {parsedProperties.__text}
    </button>
}

export default CButton;