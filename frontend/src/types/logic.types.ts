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
    : undefined,
  },
  targetHandle?: boolean,
  sourceHandle?: boolean,
};

export type LogicNode<FunctionType extends FunctionTypes> = {
  id: string,
  type: FunctionTypes,
  position: {
    x: number,
    y: number,
  },
  data: LogicNodeData<FunctionType>,
}

export type LogicEdge = {
  id: string,
  source: string, 
  target: string,
  type: string // 'default' | 'straight' | 'step' | 'smoothstep',
  animated: boolean,
  style: CSSProperties,
}

export type LogicNodeCollection = LogicNode<FunctionTypes>