import React from 'react';
import { parseProperties } from '../helpers/utils';

const CCheckbox = ({ ...otherProperties }) => {
    const parsedProperties = parseProperties(otherProperties);
    return <div
        style={{
            ...parsedProperties,
        }}>
        <label style={{ fontSize: 'small' }}>
            <input type="checkbox" style={{ marginRight: '5px' }} />
            Checkbox
        </label>
    </div>
}

export default CCheckbox;