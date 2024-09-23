import React from 'react';
import MyIcon from '../helpers/MyIcon';
import { parseProperties } from '../helpers/utils';

const clickConfig = () => alert('Clicked!')

const CIconButton = ({ ...otherProperties }) => {
    const parsedProperties = parseProperties(otherProperties);
    return <>
        <button
            style={{
                ...parsedProperties,
            }}
            onClick={clickConfig ? clickConfig : undefined}
        >
            <MyIcon nameIcon={parsedProperties.__iconName} propsIcon={{ size: parsedProperties.__iconSize, color: parsedProperties.__iconColor }} />
        </button>
    </>
}

export default CIconButton;