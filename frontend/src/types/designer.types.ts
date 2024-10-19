import { compTypes } from "../config/components";
import type * as CSS from 'csstype';

// for drag and drop payload
export type draggableData = {
    type: 'canvas-draggable' | 'palette-draggable';
    componentId: string;
    componentType?: keyof typeof compTypes;
} | null;

// keep track of component name indexing for each component type
// for new components
export type CompNames = Record<keyof typeof compTypes, { current: number; }>;

export interface Component {
    type: keyof typeof compTypes | 'canvas';
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
    type: keyof typeof compTypes | 'canvas',
    children: ComponentLeaf[];
    readOnly: true | false;
    hasLogic: boolean;
}