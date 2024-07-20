import React from 'react';

const CCheckbox = ({ ...otherProperties }) => {
    return <div
        style={{
            ...otherProperties,
        }}>
        <label style={{ fontSize: 'small' }}>
            <input type="checkbox" style={{ marginRight: '5px' }} />
            Checkbox
        </label>
    </div>
}

export default CCheckbox;