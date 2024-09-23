import { CSSProperties, ReactElement, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import useDesignerStore from '../stores/designer';

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

const MyModal = ({ children, styles }: MyPortalProps) => {

  // console.log('LOOOG', position)

  // Create a portal
  return ReactDOM.createPortal(
    <div style={{ ...styles }}>
      {children}
    </div>,
    document.getElementById('my-root-modal') as HTMLElement
  );
};

export default MyModal;