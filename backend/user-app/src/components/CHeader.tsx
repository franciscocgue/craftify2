import React from 'react';

const CHeader = ({ ...otherProperties }) => {
    return <h2
        style={{
            ...otherProperties,
        }}
    >
        {otherProperties.__text}
    </h2>
}

export default CHeader;