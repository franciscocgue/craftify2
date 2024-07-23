import React from 'react';

const CImage = ({ ...otherProperties }) => {

    return <img
        style={{
            ...otherProperties,
        }}
        src={otherProperties.__src}
        alt={otherProperties.__alt}
    >
        {/* exclude below from the built version */}
        {/* end exclude block */}
    </img>
}

export default CImage;