import React from 'react';
import { parseProperties } from '../helpers/utils';

const CImage = ({ ...otherProperties }) => {
    const parsedProperties = parseProperties(otherProperties);
    return <img
        style={{
            ...parsedProperties,
        }}
        src={parsedProperties.__src}
        alt={parsedProperties.__alt}
    >
        {/* exclude below from the built version */}
        {/* end exclude block */}
    </img>
}

export default CImage;