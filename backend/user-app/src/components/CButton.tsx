import React from 'react';
import { parseProperties } from '../helpers/utils';

const CButton = ({ ...otherProperties }) => {
    const parsedProperties = parseProperties(otherProperties);
    return <button
        style={{
            ...parsedProperties
        }}
    >
        {parsedProperties.__text}
    </button>
}

export default CButton;