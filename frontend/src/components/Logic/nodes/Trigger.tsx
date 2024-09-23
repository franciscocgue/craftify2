import { useCallback, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { FaCirclePlus } from 'react-icons/fa6';
import { MdDeleteForever } from 'react-icons/md';
import { IoRemoveCircle } from 'react-icons/io5';
import { Popover } from 'react-tiny-popover';

import styles from '../CustomNode.module.css';
import useDesignerStore from '../../../stores/designer';
import PopoverAddNode from '../PopoverAddNode';

const handleStyle = { left: 10, backgroundColor: 'red' };


function Trigger({ data, isConnectable, id }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  const colorMode = useDesignerStore((state) => state.colorMode);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleClick = (event) => {
    event.stopPropagation(); // Prevents the event from bubbling up to parent nodes
    setIsPopoverOpen(!isPopoverOpen);
    console.log('Handle clicked', id);
  };

  return (
    <div className="react-flow__node react-flow__node-default nopan selectable draggable">
      on click
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable={isConnectable}
        style={{ background: 'transparent', border: 'none', cursor: 'pointer', bottom: '5px' }}
      >
        <PopoverAddNode nodeId={id} />
      </Handle>
    </div>
  );
}

export default Trigger;