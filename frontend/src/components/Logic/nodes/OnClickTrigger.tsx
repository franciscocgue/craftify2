import { LogicNodeData } from "../../../types/logic.types"
import WrapperLogicNode from "../../helpers/WrapperLogicNode";

type WrapperLogicNodeProps = {
    data: LogicNodeData<'on-click-trigger'>,
    selected?: boolean,
    id: string, // nodeId
  }

const OnClickTrigger = ({data, selected, id}: WrapperLogicNodeProps) => {
    return WrapperLogicNode({data, selected, id})
}

export default OnClickTrigger;