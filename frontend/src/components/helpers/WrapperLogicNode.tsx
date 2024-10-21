import { Handle, NodeToolbar, Position } from '@xyflow/react';
import { FunctionTypes, LogicNodeData } from '../../types/logic.types';
import { logicFunctions } from '../../config/logic';
import { FaCirclePlus } from 'react-icons/fa6';
import { TiDelete } from "react-icons/ti";
import useDesignerStore from '../../stores/designer';
import PopoverAddNode from '../Logic/PopoverAddNode';

import lightStyles from './WrapperLogicNodeLight.module.css';
import darkStyles from './WrapperLogicNodeDark.module.css';

type WrapperLogicNodeProps<Type extends FunctionTypes> = {
  data: LogicNodeData<Type>,
  selected?: boolean,
  id: string,
}

function WrapperLogicNode<Type extends FunctionTypes>({ data, selected, id }: WrapperLogicNodeProps<Type>) {

  const colorMode = useDesignerStore((state) => state.colorMode);
  const removeNode = useDesignerStore((state) => state.removeNode);
  const selectedComponentId = useDesignerStore((state) => state.selectedId);
  const styles = colorMode === 'light' ? lightStyles : darkStyles;

  return (
    <div
      // className="react-flow__node react-flow__node-default nopan selectable draggable"
      className={styles['wrapper']}>
      <div className={styles['header']}
        title={logicFunctions[data.function.type].description}>
        {logicFunctions[data.function.type].displayName}
      </div>
      {data.function.htmlBody && <div className={styles['body']}>
        {data.function.htmlBody ? data.function.htmlBody() : undefined}
      </div>}
      <div>
        {/* if true or undefined, show handle */}
        {data.targetHandle === undefined || data.targetHandle
          ? <Handle
            type="target"
            position={Position.Top}
            isConnectable={true} />
          : undefined}
        {/* if true or undefined, show handle */}
        {data.sourceHandle === undefined || data.sourceHandle
          ? <Handle
            type="source"
            position={Position.Bottom}
            isConnectable={true} />
          : undefined}
      </div>
      <NodeToolbar isVisible={data.function.type === 'on-click-trigger' || selected} position={Position.Right} align={'center'}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
          <PopoverAddNode>
            <FaCirclePlus style={{ cursor: 'pointer' }} size={26} color={`${colorMode === 'light' ? 'blue' : 'white'}`} title='Add new node' />
          </PopoverAddNode>
          {data.function.type !== 'on-click-trigger' && <TiDelete
            onClick={() => {
              if (selectedComponentId) {
                removeNode(selectedComponentId, id)
              }
            }}
            style={{ cursor: 'pointer' }}
            size={36}
            color={`${colorMode === 'light' ? 'red' : 'white'}`}
            title='Delete node'
          />}
          {/* {data.function.type !== 'on-click-trigger' && <IoDuplicate style={{ cursor: 'pointer' }} size={26} color={`${colorMode === 'light' ? 'black' : 'white'}`} title='Duplicate node' />} */}
        </div>
      </NodeToolbar>
    </div>
  );
}

export default WrapperLogicNode;