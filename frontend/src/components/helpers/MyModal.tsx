import { CSSProperties, ReactElement } from 'react';
import ReactDOM from 'react-dom';

// type boundingRectType = {
//   top: number,
//   bottom: number,
//   left: number,
//   right: number,
//   width: number,
//   height: number,
// }

type MyPortalProps = {
  children?: ReactElement,
  // boundingRect: boundingRectType,
  styles: CSSProperties
}

/**
 * Modal helper
 * 
 * @param styles: CSS Styles for the container
 * @param children: ReactElement to render
 * @returns 
 */
const MyModal = ({ children, styles }: MyPortalProps) => {

  // Create a portal
  return ReactDOM.createPortal(
    <div style={{ ...styles }}>
      {children}
    </div>,
    document.getElementById('my-root-modal') as HTMLElement
  );
};

export default MyModal;