import React from 'react';

const CText = ({ ...otherProperties }) => {
    return <p
        style={{
            ...otherProperties,
        }}
    >
        {otherProperties.__text}
    </p>
};

export default CText;