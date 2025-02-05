import { CSSProperties, ReactElement } from "react";
import { logicFunctions } from "../config/logic";

export type FunctionTypes = keyof typeof logicFunctions;

// 'data' variable (payload) used by reactflow
export type LogicNodeData<FunctionType extends FunctionTypes> = {
  function: {
    type: FunctionTypes,
    // htmlBody injected first just before calling WrapperLogicNode
    htmlBody?: () => ReactElement,
    parameters: FunctionType extends 'open-url'
    ? {
      url: string,
      target: '_blank' | '_self'
    }
    : FunctionType extends 'delay'
    ? {
      ms: number,
    }
    : FunctionType extends 'condition'
    ? {
      conditionExpression: string,
    }
    : FunctionType extends 'docu-note'
    ? {
      msg: string,
    }
    : FunctionType extends 'set-variable'
    ? {
      variableKey: string,
      value: any
    }
    : FunctionType extends 'toast'
    ? {
      msg: string,
      position: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center',
      type: 'info' | 'success' | 'warning' | 'error',
      autoClose: number,
    }
    : undefined,
  },
  targetHandle?: boolean,
  sourceHandle?: boolean,
}
  // only conditional node accepts left and rght hanldes 
  & (FunctionType extends 'condition' ? { targetHandleRight?: boolean } : undefined)
  & (FunctionType extends 'condition' ? { targetHandleLeft?: boolean } : undefined);

export type LogicNode<FunctionType extends FunctionTypes> = {
  id: string,
  type: FunctionTypes,
  position: {
    x: number,
    y: number,
  },
  data: LogicNodeData<FunctionType>,
  deletable?: boolean
}

export type LogicEdge = {
  id: string,
  source: string,
  target: string,
  type?: string // 'default' | 'straight' | 'step' | 'smoothstep',
  animated: boolean,
  style: CSSProperties,
  sourceHandle?: 'left' | 'right'
}