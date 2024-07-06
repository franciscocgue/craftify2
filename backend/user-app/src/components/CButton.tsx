import React from 'react';

const CButton = ({ ...otherProperties }) => {
    return <button
        style={{
            ...otherProperties
        }}
    >
        Button
    </button>
}

export default CButton;