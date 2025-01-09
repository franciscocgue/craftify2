import { useCallback, useEffect, useState } from "react";
import { LogicNodeData } from "../../../types/logic.types"
import MyTextInput from "../../common/MyTextInput";
import WrapperLogicNode from "../../helpers/WrapperLogicNode";
import useDesignerStore from "../../../stores/designer";
import MySelect from "../../common/MySelect";
import { Variable } from "../../../types/variables.types";

const TRUES = [
  'yes',
  'Yes',
  'YES',
  'y',
  'Y',
  '1',
  'true',
  'True',
  'TRUE',
  1,
  true,
];

type WrapperLogicNodeProps = {
  data: LogicNodeData<'set-variable'>,
  selected?: boolean,
  id: string, // nodeId
}

const SetVariable = ({ data, selected, id }: WrapperLogicNodeProps) => {

  const variables = useDesignerStore((state) => state.variables);
  const updateLogicParameter = useDesignerStore((state) => state.updateLogicParameter);
  const selectedId = useDesignerStore((state) => state.selectedId);

  const [variableType, setVariableType] = useState<Variable['type']>();

  console.log({ variableType })

  // variable key (name)
  const handleVariableKeyChange = useCallback((value: string | undefined) => {
    if (selectedId) {
      updateLogicParameter<'set-variable'>(selectedId, id, 'variableKey', value ?? '');
      // update type
      setVariableType(variables.find(v => v.key === data.function.parameters.variableKey)?.type);
    }
  }, [data.function.parameters.variableKey])
  // variable value
  const handleVariableValueChange = useCallback((value: string | undefined) => {
    if (selectedId) {
      // parse value
      let parsedValue: any = value;
      if (variableType === 'number') {
        parsedValue = parseFloat(parsedValue);
      } else if (variableType === 'boolean') {
        parsedValue = false;
        if (value !== undefined && TRUES.includes(value)) {
          parsedValue = true;
        };
      };
      updateLogicParameter<'set-variable'>(selectedId, id, 'value', parsedValue ?? '');
    }
  }, [data.function.parameters.variableKey])

  // select a variable if not selected initially
  useEffect(() => {
    if (!data.function.parameters.variableKey && variables.length) {
      handleVariableKeyChange(variables[0].key);
      handleVariableValueChange(variables[0].value);
      // update type
      setVariableType(variables.find(v => v.key === data.function.parameters.variableKey)?.type);
    };
  }, [data.function.parameters.variableKey]);

  data.function.htmlBody = () => {
    return <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'start', fontSize: '0.85em', marginTop: '5px' }}>
      <span style={{ color: 'grey' }}>Variable</span>
      <MySelect onChange={handleVariableKeyChange} options={variables.map(v => ({ value: v.key, label: `${v.key} (${v.type})` }))} initialValue={data.function.parameters.variableKey} />

      <span style={{ color: 'grey', marginTop: '6px' }}>Value</span>
      <MyTextInput onChange={handleVariableValueChange} value={data.function.parameters.value} placeholder='Type value...' />
    </div>

  }

  return WrapperLogicNode({ data, selected, id })
}

export default SetVariable;