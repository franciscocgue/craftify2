// @TODO: shared types for FE and BE
// import { compTypes } from "../config/components";
import type * as CSS from 'csstype';
import { CSSProperties, ReactElement } from 'react';

// INPUTS (from CONFIG FILES)

type compTypes = "row" | "column" | "button" | "text" | "header" | "checkbox" | "image" | "link" | "icon-button";
export type FunctionTypes = "open-url" | "on-click-trigger" | "delay" | "docu-note"
export type FunctionTypesWithHandler = "open-url" | "delay"

// COMPONENTS and PROPERTIES

// for drag and drop payload
export type draggableData = {
  type: 'canvas-draggable' | 'palette-draggable';
  componentId: string;
  componentType?: compTypes;
} | null;

// keep track of component name indexing for each component type
// for new components
export type CompNames = Record<compTypes, { current: number; }>;

export interface Component {
  type: compTypes | 'canvas';
  parent: string | null;
  children: string[];
  name: string;
}
export type ComponentCollection = Record<string, Component>

// React UI Components Props (Button, Text, Link, etc.)
export interface UiComponentProps {
  componentId: string;
  componentType: Component['type'];
  componentName: string;
  parentType: 'row' | 'column'; // Component['type']
}

// CSS (and custom ones, __*) properties to use in UI Components
export type Properties = {
  // canvas props
  canvasWidthPx?: string;
  canvasHeightPx?: string;
  // wrapper styles
  width?: string;
  maxWidth?: string;
  minWidth?: string;
  height?: string;
  maxHeight?: string;
  minHeight?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  // component styles
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  display?: string; // not editable (at least in canvas)
  flexDirection?: 'column' | 'row'; // not editable (at least in canvas)
  gap?: string;
  flexWrap?: 'nowrap' | 'wrap';
  alignItems?: string;
  justifyContent?: string;
  overflow?: string;
  color?: string;
  fontStyle?: string;
  fontWeight?: string;
  textAlign?: "start" | "left" | "right" | "center", // solved ts issue
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundRepeat?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundAttachment?: string;
  outline?: string;
  borderRadius?: string;
  borderTopStyle?: CSS.DataType.LineStyle,
  borderTopWidth?: string;
  borderTopColor?: string;
  borderBottomStyle?: CSS.DataType.LineStyle,
  borderBottomWidth?: string;
  borderBottomColor?: string;
  borderLeftStyle?: CSS.DataType.LineStyle,
  borderLeftWidth?: string;
  borderLeftColor?: string;
  borderRightStyle?: CSS.DataType.LineStyle,
  borderRightWidth?: string;
  borderRightColor?: string;
  // custom
  __text?: string;
  __src?: string;
  __alt?: string;
  __href?: string;
  __target?: string;
  __iconName?: string;
  __iconSize?: string;
  __iconColor?: string;
};
export interface ComponentCollectionProperties {
  [key: string]: Properties;
}

// for Component Tree
export interface ComponentLeaf {
  key: string;
  title: string;
  type: compTypes | 'canvas',
  children: ComponentLeaf[];
  readOnly: true | false;
  hasLogic: boolean;
}


// VARIABLES

type Variable<T> = {
  type: 'text' | 'number' | 'boolean';
  initialValue: T;
  value: T;
};

export type Variables = Record<string, Variable<any>>;


// LOGIC

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
    : FunctionType extends 'docu-note'
    ? {
      msg: string,
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
  deletable?: boolean
}

export type LogicEdge = {
  id: string,
  source: string,
  target: string,
  type?: string // 'default' | 'straight' | 'step' | 'smoothstep',
  animated: boolean,
  style: CSSProperties,
}


// export type LogicFunctionHandler<FunctionTypeWithHandler extends FunctionTypesWithHandler> = LogicNode<FunctionTypeWithHandler>['data']['function']['parameters'];
export type LogicFunctionHandler<FunctionType extends FunctionTypes> = LogicNode<FunctionType>['data']['function']['parameters'];