import { CSSProperties, ReactElement } from 'react';
import ReactDOM from 'react-dom';

type MyTooltipProps = {
  children: ReactElement,
  position: CSSProperties
}

const MyTooltip = ({ children, position }: MyTooltipProps) => {
  // Create a portal
  return ReactDOM.createPortal(
    <div style={position}>
      {children}
    </div>,
    document.getElementById('my-root-tooltip')
  );
};

export default MyTooltip;