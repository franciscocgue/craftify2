import { CSSProperties, ReactElement, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import useDesignerStore from '../../stores/designer';

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
 * Helper used to (normally) absolute-position tooltips, outlines, etc.
 * Used in canvas components for effects on user interactions (select, hover).
 */
const MyPortal = ({ children, styles }: MyPortalProps) => {

  const [isVisible, setIsVisible] = useState(true);
  const isCanvasScrolling = useDesignerStore((state) => state.isCanvasScrolling);

  useEffect(() => {
    let lateRender = setTimeout(() => setIsVisible(true), 100)
    if (isCanvasScrolling) {
      clearTimeout(lateRender)
      setIsVisible(false);
    }
  }, [isCanvasScrolling])

  // console.log('LOOOG', position)

  // Create a portal
  return ReactDOM.createPortal(
    <>{isVisible && <div style={{ ...styles}}>
      {children}
    </div>}</>,
    document.getElementById('my-root-tooltip') as HTMLElement
  );
};

export default MyPortal;