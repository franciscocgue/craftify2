import { CSSProperties, ReactElement } from 'react';
import ReactDOM from 'react-dom';

type MyPortalProps = {
  children: ReactElement,
  position: CSSProperties
}

const MyPortal = ({ children, position }: MyPortalProps) => {
  // Create a portal
  return ReactDOM.createPortal(
    <div style={position}>
      {children}
    </div>,
    document.getElementById('my-root-tooltip')
  );
};

export default MyPortal;