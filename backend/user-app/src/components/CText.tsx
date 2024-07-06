import React from 'react';

const CText = ({ ...otherProperties }) => {
    return <p
        style={{
            ...otherProperties,
        }}
    >
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
    </p>
};

export default CText;