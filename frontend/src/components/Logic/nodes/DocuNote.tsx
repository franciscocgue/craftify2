import { useCallback } from "react";
import { LogicNodeData } from "../../../types/logic.types"
import MyTextInput from "../../common/MyTextInput";
import WrapperLogicNode from "../../helpers/WrapperLogicNode";
import useDesignerStore from "../../../stores/designer";
import MyTextAreaInput from "../../common/MyTextAreaInput";

type WrapperLogicNodeProps = {
  data: LogicNodeData<'docu-note'>,
  selected?: boolean,
  id: string, // nodeId
}

const DOcuNote = ({ data, selected, id }: WrapperLogicNodeProps) => {

  const updateLogicParameter = useDesignerStore((state) => state.updateLogicParameter);
  const selectedId = useDesignerStore((state) => state.selectedId);

  // url changes
  const handleMsgChange = useCallback((value: string | undefined) => {
    if (selectedId) {
      updateLogicParameter<'docu-note'>(selectedId, id, 'msg', value ?? '');
    }
  }, []);

  // function html body
  data.function.htmlBody = () => {
    return <div>
      <MyTextAreaInput onChange={handleMsgChange} value={data.function.parameters.msg} />
    </div>
  }

  return WrapperLogicNode({ data, selected, id })
}

export default DOcuNote;