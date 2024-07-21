import React from 'react';

const CButton = ({ ...otherProperties }) => {
    return <button
        style={{
            ...otherProperties
        }}
    >
        {otherProperties.__text}
    </button>
}

export default CButton;