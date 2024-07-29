import React from 'react';
import { parseProperties } from '../helpers/utils';

const CHeader = ({ ...otherProperties }) => {
    const parsedProperties = parseProperties(otherProperties);
    return <h2
        style={{
            ...parsedProperties,
        }}
    >
        {parsedProperties.__text}
    </h2>
}

export default CHeader;