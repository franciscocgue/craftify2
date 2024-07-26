/// <reference types="vite/client" />
import { compTypes } from "./config/components";
import type * as CSS from 'csstype';

export type draggableData = {
    type: 'canvas-draggable' | 'palette-draggable',
    componentId: string,
    componentType?: keyof typeof compTypes
} | null

export interface Component {
    type: keyof typeof compTypes;
    parent: string | null;
    children: string[];
    name: string;
}
export interface ComponentCollection {
    [key: string]: Component;
}

// otherProperties in resizable wrappers
export type Properties = {
    // canvas props
    canvasWidthPx?: number,
    canvasHeightPx?: number,
    // wrapper styles
    width?: string,
    height?: string,
    minHeight?: string,
    marginTop?: string,
    marginBottom?: string,
    marginLeft?: string,
    marginRight?: string,
    // component styles
    paddingTop?: string,
    paddingBottom?: string,
    paddingLeft?: string,
    paddingRight?: string,
    display?: string,  // not editable (at least in canvas)
    flexDirection?: 'column' | 'row',  // not editable (at least in canvas)
    gap?: string,
    flexWrap?: 'nowrap' | 'wrap',
    alignItems?: 'center',
    color?: string,
    backgroundColor?: string,
    outline?: string,
    borderTopStyle?: CSS.DataType.LineStyle,
    borderTopWidth?: string,
    borderTopColor?: string,
    borderBottomStyle?: CSS.DataType.LineStyle,
    borderBottomWidth?: string,
    borderBottomColor?: string,
    borderLeftStyle?: CSS.DataType.LineStyle,
    borderLeftWidth?: string,
    borderLeftColor?: string,
    borderRightStyle?: CSS.DataType.LineStyle,
    borderRightWidth?: string,
    borderRightColor?: string,
    // custom
    __text?: string,
}


export interface ComponentLeaf {
    id: string;
    name: string;
    type: keyof typeof compTypes,
    children?: string[];
    readOnly: true | false,
}
export interface ComponentLeaf1 {
    key: string;
    title: string;
    type: keyof typeof compTypes,
    children?: string[];
    readOnly: true | false,
}

export type PropertyType = {
    displayName?: string,
    editable: true | false, // in properties palette
    visible: true | false, // in properties palette
    // @TODO: include key for list of dropdown (eg unit, css specifiy values, etc.)
    valueType?: 'string' | 'number' | 'dropdown' | 'radio', // only for input type in properties palette
    options?: {
        options?: { value: string | boolean | number, label: string }[], // dropdown, radio
        step?: number, // number
        min?: number, // number
        max?: number, // number
    }
    group?: typeof propertyGroups[number], // to group in properties palette
    hoverInfo?: ReactNode | string
}

type Variable<T> = {
    type: 'text' | 'number' | 'boolean';
    initialValue: T;
    value: T;
};

export type Variables = {
    [key: string]: Variable<any>;
};