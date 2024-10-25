import React from 'react';
import { parseProperties } from '../helpers/utils';

const CButton = ({ onClick, ...otherProperties }) => {
    const parsedProperties = parseProperties(otherProperties);
    return <button
        onClick={onClick}
        style={{
            ...parsedProperties
        }}
    >
        {parsedProperties.__text}
    </button>
}

export default CButton;