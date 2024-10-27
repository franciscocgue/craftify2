import { useCallback } from 'react';
import WrapperLogicNode from '../../helpers/WrapperLogicNode';
import { LogicNodeData } from '../../../types/logic.types';
import MyTextInput from '../../common/MyTextInput';
import useDesignerStore from '../../../stores/designer';
import MySelect from '../../common/MySelect';

const typeOptions = [
  { value: 'info', label: 'info' },
  { value: 'success', label: 'success' },
  { value: 'warning', label: 'warning' },
  { value: 'error', label: 'error' },
];
const positionOptions = [
  { value: 'top-left', label: 'top-left' },
  { value: 'top-center', label: 'top-center' },
  { value: 'top-right', label: 'top-right' },
  { value: 'bottom-left', label: 'bottom-left' },
  { value: 'bottom-center', label: 'bottom-center' },
  { value: 'bottom-right', label: 'bottom-right' },
];

type WrapperLogicNodeProps = {
  data: LogicNodeData<'toast'>,
  selected?: boolean,
  id: string, // nodeId
}

function Toast({ data, selected, id }: WrapperLogicNodeProps) {

  const updateLogicParameter = useDesignerStore((state) => state.updateLogicParameter);
  const selectedId = useDesignerStore((state) => state.selectedId);

  // TOAST PARAMETERS
  // msg changes
  const handleMsgChange = useCallback((value: string | undefined) => {
    if (selectedId) {
      updateLogicParameter<'toast'>(selectedId, id, 'msg', value ?? '');
    }
  }, []);
  // position changes
  const handlePositionChange = useCallback((value: string | undefined) => {
    if (selectedId) {
      updateLogicParameter<'toast'>(selectedId, id, 'position', value ?? '');
    }
  }, []);
  // type changes
  const handleTypeChange = useCallback((value: string | undefined) => {
    if (selectedId) {
      updateLogicParameter<'toast'>(selectedId, id, 'type', value ?? '');
    }
  }, []);
  // autoClose changes
  const handleAutoCloseChange = useCallback((value: string | undefined) => {
    if (selectedId) {
      updateLogicParameter<'toast'>(selectedId, id, 'autoClose', value ?? '');
    }
  }, []);

  // function html body
  data.function.htmlBody = () => {
    return <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'start', fontSize: '0.85em', marginTop: '5px' }}>
      <MyTextInput onChange={handleMsgChange} value={data.function.parameters.msg} placeholder='Type here...' />

      <span style={{ color: 'grey', marginTop: '6px' }}>Position</span>
      <MySelect onChange={handlePositionChange} options={positionOptions} initialValue={data.function.parameters.position} />

      <span style={{ color: 'grey', marginTop: '6px' }}>Type</span>
      <MySelect onChange={handleTypeChange} options={typeOptions} initialValue={data.function.parameters.type} />

      <span style={{ color: 'grey', marginTop: '6px' }}>Close after (ms)</span>
      <MyTextInput value={String(data.function.parameters.autoClose || '')} onChange={handleAutoCloseChange} />

    </div>
  }

  return WrapperLogicNode({ data, selected, id })
}

export default Toast;