import React from 'react';
import { parseProperties } from '../helpers/utils';

const CText = ({ ...otherProperties }) => {
    const parsedProperties = parseProperties(otherProperties);
    return <p
        style={{
            ...parsedProperties,
        }}
    >
        {parsedProperties.__text}
    </p>
};

export default CText;