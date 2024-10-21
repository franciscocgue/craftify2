import { useCallback } from "react";
import { LogicNodeData } from "../../../types/logic.types"
import MyTextInput from "../../common/MyTextInput";
import WrapperLogicNode from "../../helpers/WrapperLogicNode";
import useDesignerStore from "../../../stores/designer";

type WrapperLogicNodeProps = {
  data: LogicNodeData<'delay'>,
  selected?: boolean,
  id: string, // nodeId
}

const Delay = ({ data, selected, id }: WrapperLogicNodeProps) => {

  const updateLogicParameter = useDesignerStore((state) => state.updateLogicParameter);
  const selectedId = useDesignerStore((state) => state.selectedId);

  const handleDelayChange = useCallback((value: string | undefined) => {
    if (selectedId) {
      updateLogicParameter<'delay'>(selectedId, id, 'ms', parseInt(value ?? '0'));
    }
  }, [])

  data.function.htmlBody = () => {
    return <>
      <MyTextInput value={String(data.function.parameters.ms || '')} onChange={handleDelayChange} /> <span style={{ color: 'grey' }}>ms</span>
    </>

  }

  return WrapperLogicNode({ data, selected, id })
}

export default Delay;