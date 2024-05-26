/// <reference types="vite/client" />
import { compTypes } from "./config/components";

export interface Component {
    type: keyof typeof compTypes;
    parent: string | null;
    children: string[];
    name: string;
}
export interface ComponentCollection {
    [key: string]: Component;
}



export interface ComponentLeaf {
    id: string;
    name: string;
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