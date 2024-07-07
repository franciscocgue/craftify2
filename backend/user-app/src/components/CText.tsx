import React from 'react';

const CText = ({ ...otherProperties }) => {
    return <p
        style={{
            ...otherProperties,
        }}
    >
        Lorem ipsum dolor sit amet
    </p>
};

export default CText;