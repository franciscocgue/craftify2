/// <reference types="vite/client" />
import { compTypes } from "./config/components";

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
    canvasWidthPx: number,
    canvasHeightPx: number,
    // wrapper styles
    width: string | number,
    height: number | string,
    minHeight: number | string,
    marginTop?: number | string,
    marginBottom?: number | string,
    marginLeft?: number | string,
    marginRight?: number | string,
    // component styles
    paddingTop?: number | string,
    paddingBottom?: number | string,
    paddingLeft?: number | string,
    paddingRight?: number | string,
    gap?: number | string,
    flexWrap?: 'nowrap' | 'wrap',
    alignItems?: 'center',
    color?: string | undefined,
    backgroundColor?: string | undefined,
    outline: string | undefined,
    borderTopStyle: string | undefined,
    borderTopWidth: string | undefined,
    borderTopColor: string | undefined,
    borderBottomStyle: string | undefined,
    borderBottomWidth: string | undefined,
    borderBottomColor: string | undefined,
    borderLeftStyle: string | undefined,
    borderLeftWidth: string | undefined,
    borderLeftColor: string | undefined,
    borderRightStyle: string | undefined,
    borderRightWidth: string | undefined,
    borderRightColor: string | undefined,
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