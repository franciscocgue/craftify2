import React from 'react';
import { useDynamicVariables } from '../hooks/useVariables';

type Props = {
    onClick: (() => Promise<void>) | undefined,
    [x: string]: any
}
const CButton = ({ onClick, ...otherProperties }: Props) => {

    // subscribes to variable changes
    const [parsedProperties] = useDynamicVariables(otherProperties);

    return <button
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            // prevent triggering parent onClick events
            event.stopPropagation();
            if (onClick) onClick();
        }}
        style={{
            ...parsedProperties,
            // visibility
            ...(!parsedProperties.__visible && { display: 'none' }),
        }}
    >
        {parsedProperties.__text}
    </button>
}

export default CButton;