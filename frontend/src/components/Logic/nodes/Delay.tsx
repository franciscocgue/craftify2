import { LogicNodeData } from "../../../types/logic.types"
import MyTextInput from "../../common/MyTextInput";
import WrapperLogicNode from "../../helpers/WrapperLogicNode";

type WrapperLogicNodeProps = {
  data: LogicNodeData<'delay'>,
  selected?: boolean,
}

const Delay = ({ data, selected }: WrapperLogicNodeProps) => {

  data.function.htmlBody = () => {
    return <>
      <MyTextInput /> ms
    </>

  }

  return WrapperLogicNode({ data, selected })
}

export default Delay;