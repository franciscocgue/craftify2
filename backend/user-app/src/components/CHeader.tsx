import React from 'react';

const CHeader = ({ ...otherProperties }) => {
    return <h2
        style={{
            ...otherProperties,
        }}
    >
        Some Header
    </h2>
}

export default CHeader;