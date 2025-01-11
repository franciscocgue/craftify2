
import CButton from "../components/CButton"
import CContainerColumn from '../components/CContainerColumn';
import CText from '../components/CText';
import CHeader from '../components/CHeader';
import CCheckbox from '../components/CCheckbox';
import CImage from '../components/CImage';
import CLink from '../components/CLink';
import CIconButton from '../components/CIconButton';
// import logicNodesData from '../logicNodes.json';
// import logicEdgesData from '../logicEdges.json';
// import componentsData from '../components.json';
import { executeFlow, findLogicNodeByType } from './logic-utils';
import { ComponentCollection, ComponentCollectionProperties, FunctionTypes, LogicEdge, LogicNode } from '../types/index.types';
import { parseProperties } from "./utils";


// const logicNodes: Record<string, LogicNode<FunctionTypes>[]> = logicNodesData as Record<string, LogicNode<FunctionTypes>[]>;
// const logicEdges: Record<string, LogicEdge[]> = logicEdgesData as Record<string, LogicEdge[]>;
// const components: ComponentCollection = componentsData as ComponentCollection;
const logicNodes: Record<string, LogicNode<FunctionTypes>[]> = __APP_CONFIG_LOGICNODES__ as Record<string, LogicNode<FunctionTypes>[]>;
const logicEdges: Record<string, LogicEdge[]> = __APP_CONFIG_LOGICEDGES__ as Record<string, LogicEdge[]>;
const components: ComponentCollection = __APP_CONFIG_COMPONENTS__ as ComponentCollection;

const getClickLogic = (id: string) => {
    const onClickTriggerNode = findLogicNodeByType(logicNodes[id]);
    let handleClick;
    if (onClickTriggerNode) {
        handleClick = () => executeFlow(onClickTriggerNode, logicEdges[id], logicNodes[id])
    }
    return handleClick;
}

const uiMapper2 = {
    'canvas': (id: string, properties: ComponentCollectionProperties) => {
        return (
            <div
                id="my-canvas"
                style={{
                    minHeight: '100vh',
                    ...parseProperties(properties[id])
                }}
                onClick={getClickLogic(id)}
            >
                {components[id].children.map((id: string) => renderNode(id, properties))}
            </div>
        )
    },
    'column': (id: string, properties: ComponentCollectionProperties) => {
        return <CContainerColumn key={id} onClick={getClickLogic(id)} {...properties[id]}>
            {components[id].children.map((id: string) => renderNode(id, properties))}
        </CContainerColumn>
    },
    'button': (id: string, properties: ComponentCollectionProperties) => {
        return <CButton key={id} onClick={getClickLogic(id)} {...properties[id]} />
    },
    'text': (id: string, properties: ComponentCollectionProperties) => {
        return <CText key={id} onClick={getClickLogic(id)} {...properties[id]} />
    },
    'header': (id: string, properties: ComponentCollectionProperties) => {
        return <CHeader key={id} onClick={getClickLogic(id)} {...properties[id]} />
    },
    'checkbox': (id: string, properties: ComponentCollectionProperties) => {
        return <CCheckbox key={id} onClick={getClickLogic(id)} {...properties[id]} />
    },
    'image': (id: string, properties: ComponentCollectionProperties) => {
        return <CImage key={id} onClick={getClickLogic(id)} {...properties[id]} />
    },
    'link': (id: string, properties: ComponentCollectionProperties) => {
        return <CLink key={id} onClick={getClickLogic(id)} {...properties[id]} />
    },
    'icon-button': (id: string, properties: ComponentCollectionProperties) => {
        return <CIconButton key={id} onClick={getClickLogic(id)} {...properties[id]} />
    },
}

const renderNode = (id: string, properties: ComponentCollectionProperties) => {
    return uiMapper2[components[id].type as keyof typeof uiMapper2](id, properties)
}

export {
    renderNode
}