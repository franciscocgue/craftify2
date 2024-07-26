import React from 'react';
import MyIcon from '../helpers/MyIcon';

const CIconButton = ({ ...otherProperties }) => {

    return <>
        <button
            style={{
                ...otherProperties,
            }}
        >
            <MyIcon nameIcon={otherProperties.__iconName} propsIcon={{ size: otherProperties.__iconSize, color: otherProperties.__iconColor }} />
        </button>
    </>
}

export default CIconButton;