
import React from 'react';
import CButton from "../components/CButton"
import CContainerColumn from '../components/CContainerColumn';
import CText from '../components/CText';
import CHeader from '../components/CHeader';
import CCheckbox from '../components/CCheckbox';

const uiMapper2 = {
    'canvas': (components: any, id: string, properties) => (
        <div
            id="my-canvas"
            style={{
                ...properties[id]
            }}
        >
            {components[id].children.map((id: string) => renderNode(components, id, properties))}
        </div>
    ),
    'column': (components: any, id: string, properties) => (
        <CContainerColumn key={id} {...properties[id]}>
            {components[id].children.map((id: string) => renderNode(components, id, properties))}
        </CContainerColumn>
    ),
    'button': (components: any, id: string, properties) => (
        <CButton key={id} {...properties[id]} />
    ),
    'text': (components: any, id: string, properties) => (
        <CText key={id} {...properties[id]} />
    ),
    'header': (components: any, id: string, properties) => (
        <CHeader key={id} {...properties[id]} />
    ),
    'checkbox': (components: any, id: string, properties) => (
        <CCheckbox key={id} {...properties[id]} />
    ),
}

const renderNode = (components: any, id: string, properties) => {
    return uiMapper2[components[id].type as keyof typeof uiMapper2](components, id, properties)
}

export {
    renderNode
}