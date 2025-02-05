import { logicFunctionHandlers } from "../config/logic";
import { FunctionTypes, LogicEdge, LogicNode } from "../types/index.types";

/**
 * Finds first match (if any,e lse null)
 * 
 * @param nodes: array of logicNodes in component
 * @param type: logic node type to search
 * @returns
 */
function findLogicNodeByType(nodes: LogicNode<FunctionTypes>[], type = 'on-click-trigger') {
    if (nodes) {
        for (let n of nodes) {
            if (n.type == type) {
                return n
            }
        }
    }

    return null
}

async function executeFlow(
    startNode: LogicNode<FunctionTypes>,
    edges: LogicEdge[],
    nodes: LogicNode<FunctionTypes>[]
) {

    const executeNode = async (logicNode: LogicNode<FunctionTypes>) => {
        const nodeType: FunctionTypes = logicNode.type;
        const params = logicNode?.data?.function?.parameters;
        const result = await logicFunctionHandlers[nodeType].handler(params);
        return result;
    }

    const getNodeById = (nodeId: string, nodes: LogicNode<FunctionTypes>[]) => {
        return nodes.find(n => n.id === nodeId);
    };

    let node: LogicNode<FunctionTypes> | undefined;
    // get edges leaving the node
    let connEdges = edges.filter(e => e.source === startNode.id);
    let nodeResult: any = undefined;

    while (connEdges.length) {
        // get node
        node = getNodeById(connEdges[0].target, nodes)
        if (node) {
            console.log('executing node type ', node.type);
            nodeResult = await executeNode(node);
        }
        connEdges = edges.filter(e => e.source === node?.id);

        if (connEdges.length === 2) {
            // condition node ("if" node)
            if (nodeResult === true) {
                connEdges = connEdges.filter(e => e.sourceHandle === 'right');
            } else {
                connEdges = connEdges.filter(e => e.sourceHandle === 'left');
            }
        }

    }

    console.log('Current node has no edges')
}

export {
    executeFlow,
    findLogicNodeByType
}