import { useState } from 'react';
import WrapperLogicNode from '../../helpers/WrapperLogicNode';
import { LogicNodeData } from '../../../types/logic.types';
import MyTextInput from '../../common/MyTextInput';

type WrapperLogicNodeProps = {
  data: LogicNodeData<'open-url'>,
  selected?: boolean,
}

function OpenUrl({ data, selected }: WrapperLogicNodeProps) {

  // const onChange = useCallback((evt) => {
  //   console.log(evt.target.value);
  // }, []);

  const [openMode, setOpenMode] = useState<'_self' | '_blank'>('_blank')

  const handleChange = () => {
    setOpenMode(prev => prev === '_self' ? '_blank' : '_self');
  };

  // function html body
  data.function.htmlBody = () => {
    return <div>
      <MyTextInput />
      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'start', fontSize: '0.85em', marginTop: '5px' }}>
        <label style={{ color: 'grey' }}>
          <input style={{ marginRight: '5px', width: '10px' }} type="radio" checked={openMode === '_blank'} onChange={handleChange} />
          {'new window'}
        </label>
        <label style={{ color: 'grey' }}>
          <input style={{ marginRight: '5px', width: '10px' }} type="radio" checked={openMode === '_self'} onChange={handleChange} />
          {'same window'}
        </label>
      </div>
    </div>
  }

  return WrapperLogicNode({ data, selected })
}

export default OpenUrl;