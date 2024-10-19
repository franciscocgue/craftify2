import { LogicNodeData } from "../../../types/logic.types"
import WrapperLogicNode from "../../helpers/WrapperLogicNode";

type WrapperLogicNodeProps = {
    data: LogicNodeData<'on-click-trigger'>,
    selected?: boolean,
  }

const OnClickTrigger = ({data, selected}: WrapperLogicNodeProps) => {
    return WrapperLogicNode({data, selected})
}

export default OnClickTrigger;