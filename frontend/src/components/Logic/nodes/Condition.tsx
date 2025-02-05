import { useCallback } from "react";
import { LogicNodeData } from "../../../types/logic.types"
import MyTextInput from "../../common/MyTextInput";
import WrapperLogicNode from "../../helpers/WrapperLogicNode";
import useDesignerStore from "../../../stores/designer";

type WrapperLogicNodeProps = {
  data: LogicNodeData<'condition'>,
  selected?: boolean,
  id: string, // nodeId
}

const Condition = ({ data, selected, id }: WrapperLogicNodeProps) => {

  const updateLogicParameter = useDesignerStore((state) => state.updateLogicParameter);
  const selectedId = useDesignerStore((state) => state.selectedId);

  const handleConditionChange = useCallback((value: string | undefined) => {
    if (selectedId) {
      updateLogicParameter<'condition'>(selectedId, id, 'conditionExpression', value ?? '{{true}}');
    }
  }, [])

  data.function.htmlBody = () => {
    return <>
      <MyTextInput value={String(data.function.parameters.conditionExpression || '')} onChange={handleConditionChange} />
      <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: 'grey', fontSize: 'small' }}>
        <div>⯇ false</div>
        <div>true ⯈</div>
      </div>
    </>

  }

  return WrapperLogicNode({ data, selected, id })
}

export default Condition;