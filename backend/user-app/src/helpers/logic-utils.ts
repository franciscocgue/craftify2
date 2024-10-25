import { logicFunctionHandlers } from "../config/logic";
import { FunctionTypes, LogicEdge, LogicNode } from "../types/logic.types";

/**
 * Finds first match (if any,e lse null)
 * 
 * @param nodes: array of logicNodes in component
 * @param type: logic node type to search
 * @returns
 */
function findLogicNodeByType(nodes: Node[], type = 'on-click-trigger') {
    if (nodes){
    for (let n of nodes) {
        if (n.type == type) {
            return n
        }
    }}

    return null
}

async function executeFlow(
    startNode: LogicNode<FunctionTypes>,
    edges: LogicEdge[],
    nodes: LogicNode<FunctionTypes>[]
) {

    const executeNode = async (logicNode) => {
        const nodeType = logicNode.type;
        if ('handler' in logicFunctionHandlers[nodeType]) {
            await logicFunctionHandlers[nodeType].handler(logicNode?.data?.function?.parameters)
        }
    }

    const getNodeById = (nodeId: string, nodes: Node[]) => {
        return nodes.find(n => n.id === nodeId);
    };

    let node: Node | undefined;
    // get edges leaving the node
    let connEdges = edges.filter(e => e.source === startNode.id);

    while (connEdges.length) {
        // get node
        node = getNodeById(connEdges[0].target, nodes)
        if (node) {
            console.log('executing node type ', node.type);
            await executeNode(node);
        }
        connEdges = edges.filter(e => e.source === node?.id);
    }

    console.log('Current node has no edges')

    // console.log('connNodes', connEdges)
}

export {
    executeFlow,
    findLogicNodeByType
}


// handler: async (params: LogicNodeData<'delay'>['function']['parameters']) => {
//     await new Promise(res => setTimeout(res, params.ms));
//     return;
// }