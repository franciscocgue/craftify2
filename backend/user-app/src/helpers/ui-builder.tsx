
import React from 'react';
import CButton from "../components/CButton"
import CContainerColumn from '../components/CContainerColumn';
import CText from '../components/CText';
import CHeader from '../components/CHeader';
import CCheckbox from '../components/CCheckbox';
import CImage from '../components/CImage';
import CLink from '../components/CLink';
import CIconButton from '../components/CIconButton';
import logicNodes from '../logicNodes.json';
import logicEdges from '../logicEdges.json';
import { executeFlow, findLogicNodeByType } from './logic-utils';


const uiMapper2 = {
    'canvas': (components: any, id: string, properties) => (
        <div
            id="my-canvas"
            style={{
                minHeight: '100vh',
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
    'button': (components: any, id: string, properties) => {
        const onClickTriggerNode = findLogicNodeByType(logicNodes[id]);
        let handleClick;
        if (onClickTriggerNode) {
            handleClick = () => executeFlow(onClickTriggerNode, logicEdges[id], logicNodes[id])
        }
        return <CButton key={id} onClick={handleClick} {...properties[id]} />
    },
    'text': (components: any, id: string, properties) => (
        <CText key={id} {...properties[id]} />
    ),
    'header': (components: any, id: string, properties) => (
        <CHeader key={id} {...properties[id]} />
    ),
    'checkbox': (components: any, id: string, properties) => (
        <CCheckbox key={id} {...properties[id]} />
    ),
    'image': (components: any, id: string, properties) => (
        <CImage key={id} {...properties[id]} />
    ),
    'link': (components: any, id: string, properties) => (
        <CLink key={id} {...properties[id]} />
    ),
    'icon-button': (components: any, id: string, properties) => (
        <CIconButton key={id} {...properties[id]} />
    ),
}

const renderNode = (components: any, id: string, properties) => {
    return uiMapper2[components[id].type as keyof typeof uiMapper2](components, id, properties)
}

export {
    renderNode
}