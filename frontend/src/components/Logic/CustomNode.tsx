import { useCallback, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { FaCirclePlus } from 'react-icons/fa6';
import { Popover } from 'react-tiny-popover';

import styles from './CustomNode.module.css';
// import useDesignerStore from '../../stores/designer';

const handleStyle = { left: 10, backgroundColor: 'red' };


function CustomNode({ data, isConnectable, id }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  // const colorMode = useDesignerStore((state) => state.colorMode);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleClick = (event) => {
    event.stopPropagation(); // Prevents the event from bubbling up to parent nodes
    setIsPopoverOpen(!isPopoverOpen);
    console.log('Handle clicked', id);
  };

  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
        style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
      >
        <Popover
          isOpen={isPopoverOpen}
          positions={['bottom', 'right', 'top', 'left']} // if you'd like, you can limit the positions
          padding={10} // adjust padding here!
          reposition={true} // prevents automatic readjustment of content position that keeps your popover content within its parent's bounds
          onClickOutside={() => setIsPopoverOpen(false)} // handle click events outside of the popover/target here!
          content={() => ( // you can also provide a render function that injects some useful stuff!
            <div className={styles['popover-wrapper']}>
              <div className={styles['popover-header']}>
                Navigation
              </div>
              <div className={styles['popover-actions']}>
                <button
                  className={styles['popover-action']}
                  onClick={() => {
                    setIsPopoverOpen(false);
                  }}
                >
                  Open URL
                </button>
                <button
                  className={styles['popover-action']}
                  onClick={() => {
                    setIsPopoverOpen(false);
                  }}
                >
                  Back
                </button>
                <button
                  className={styles['popover-action']}
                  onClick={() => {
                    setIsPopoverOpen(false);
                  }}
                >
                  Forward
                </button>
              </div>
              <div className={styles['popover-header']}>
                Components
              </div>
              <div className={styles['popover-actions']}>
                <button
                  className={styles['popover-action']}
                  onClick={() => {
                    setIsPopoverOpen(false);
                  }}
                >
                  Change visibility
                </button>
                <button
                  className={styles['popover-action']}
                  onClick={() => {
                    setIsPopoverOpen(false);
                  }}
                >
                  Enable / Disable
                </button>
              </div>
              <div className={styles['popover-header']}>
                Data operations
              </div>
              <div className={styles['popover-header']}>
                Logic Control
              </div>
            </div>
          )}
        >
          {/* <div onClick={() => setIsPopoverOpen(!isPopoverOpen)}>Click me!</div> */}
          <div
            // style={{
            //   width: '20px',
            //   height: '20px',
            //   position: 'relative',
            //   left: '-8px',
            //   backgroundColor: 'blue',
            //   borderRadius: '50%',
            //   display: 'flex',
            //   justifyContent: 'center',
            //   alignItems: 'center',
            //   color: 'white',
            //   fontSize: '12px',
            // }}
            onClick={handleClick}
          >
            <FaCirclePlus color='blue' title='Add new node' />
            {/* <IoRemoveCircle title='Remove node'/> */}
          </div>
        </Popover>
      </Handle>
    </div>
  );
}

export default CustomNode;