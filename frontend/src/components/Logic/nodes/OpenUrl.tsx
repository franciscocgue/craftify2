import { useCallback, useEffect, useState } from 'react';
import WrapperLogicNode from '../../helpers/WrapperLogicNode';
import { LogicNodeData } from '../../../types/logic.types';
import MyTextInput from '../../common/MyTextInput';
import useDesignerStore from '../../../stores/designer';

type WrapperLogicNodeProps = {
  data: LogicNodeData<'open-url'>,
  selected?: boolean,
  id: string, // nodeId
}

function OpenUrl({ data, selected, id }: WrapperLogicNodeProps) {

  const updateLogicParameter = useDesignerStore((state) => state.updateLogicParameter);
  const selectedId = useDesignerStore((state) => state.selectedId);

  // url changes
  const handleUrlChange = useCallback((value: string | undefined) => {
    if (selectedId) {
      updateLogicParameter<'open-url'>(selectedId, id, 'url', value ?? '');
    }
  }, []);

  // open mode changes
  const [openMode, setOpenMode] = useState(data.function.parameters.target)
  const handleOpenmodeChange = () => {
    setOpenMode(prev => prev === '_self' ? '_blank' : '_self');
  };
  useEffect(() => {
    if (selectedId) {
      updateLogicParameter<'open-url'>(selectedId, id, 'target', openMode);
    }
  }, [openMode])

  // function html body
  data.function.htmlBody = () => {
    return <div>
      <MyTextInput onChange={handleUrlChange} value={data.function.parameters.url} />
      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'start', fontSize: '0.85em', marginTop: '5px' }}>
        <label style={{ color: 'grey' }}>
          <input style={{ marginRight: '5px', width: '10px' }} type="radio" checked={openMode === '_blank'} onChange={handleOpenmodeChange} />
          {'new window'}
        </label>
        <label style={{ color: 'grey' }}>
          <input style={{ marginRight: '5px', width: '10px' }} type="radio" checked={openMode === '_self'} onChange={handleOpenmodeChange} />
          {'same window'}
        </label>
      </div>
    </div>
  }

  return WrapperLogicNode({ data, selected, id })
}

export default OpenUrl;