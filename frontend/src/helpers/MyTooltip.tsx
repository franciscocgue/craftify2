import React from 'react';
import ReactDOM from 'react-dom';

const MyTooltip = ({ children, position }) => {
  // Create a portal
  return ReactDOM.createPortal(
    <div style={position}>
      {children}
    </div>,
    document.getElementById('my-root-tooltip')
  );
};

export default MyTooltip;