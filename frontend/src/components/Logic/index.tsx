import '@xyflow/react/dist/style.css';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Panel,
    Connection,
    BackgroundVariant,
} from '@xyflow/react';
import styles from './index.module.css';
import { useCallback, useEffect } from 'react';
import useDesignerStore from '../../stores/designer';
import { FaWindowClose } from "react-icons/fa";
import OpenUrl from './nodes/OpenUrl';
import OnClickTrigger from './nodes/OnClickTrigger';
import Delay from './nodes/Delay';
import { debounce } from 'lodash';
import { logicFunctions } from '../../config/logic';


const defaultNode = [{
    id: crypto.randomUUID(),
    type: 'on-click-trigger',
    position: { x: 0, y: 0 },
    data: logicFunctions['on-click-trigger'].defaultData
}]

const nodeTypes = {
    'open-url': OpenUrl,
    'on-click-trigger': OnClickTrigger,
    'delay': Delay,
};

type LogicProps = {
    handleClickOutside: () => void, // action to close logic canvas
    selectedComponentId: string,
}

const Logic = ({ handleClickOutside, selectedComponentId }: LogicProps) => {

    const handleClick = (event: { target: any; currentTarget: any; }) => {
        // event.stopPropagation();
        if (event.target === event.currentTarget) { // check if the click event's target (the actual element clicked) is the same as the currentTarget (the element that the event handler is attached to)
            handleClickOutside();
        }
    }

    const colorMode = useDesignerStore((state) => state.colorMode);
    const initialLogicNodes = useDesignerStore((state) => state.logicNodes[selectedComponentId]);
    const initialLogicEdges = useDesignerStore((state) => state.logicEdges[selectedComponentId]);
    const updateNodes = useDesignerStore((state) => state.updateNodes);
    const updateEdges = useDesignerStore((state) => state.updateEdges);
    console.log({ 'nodes changed - story - triggered index logic!!': initialLogicNodes })

    const debouncedNodeUpdate = useCallback(debounce((selectedComponentId, nodes) => {
        updateNodes(selectedComponentId, nodes);
    }, 300), [updateNodes]);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialLogicNodes || defaultNode);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialLogicEdges);

    // outside node changes (eg create new node)
    useEffect(() => {
        if (initialLogicNodes) {
            setNodes(initialLogicNodes);
        };
    }, [initialLogicNodes]);

    const onConnect = useCallback(
        // (params) => setEdges((eds) => addEdge(params, eds)),
        (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: 'grey', strokeWidth: 2 } }, eds ?? [])),
        [setEdges],
    );

    useEffect(() => {
        console.log('nodes changed')
        // debounce, since they change on
        // node Drag, select and move
        debouncedNodeUpdate(selectedComponentId, nodes)
    }, [nodes])


    useEffect(() => {
        // debounce not necessary, since it changes
        // on select or remove only
        if (edges) {
            updateEdges(selectedComponentId, edges)
        };
    }, [edges])

    return <div className={styles.wrapper} onClick={handleClick}>
        <div className={styles.canvas}>
            <ReactFlow
                colorMode={colorMode}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                maxZoom={1.5}
                minZoom={0.75}
            >
                <Panel position="top-right" ><FaWindowClose color={`${colorMode === 'light' ? 'black' : 'white'}`} size={30} style={{ cursor: 'pointer' }} onClick={handleClickOutside} /></Panel>
                <Background bgColor={colorMode === 'light' ? 'white' : undefined} variant={BackgroundVariant.Dots} gap={12} size={1} />
                <Controls />
                <MiniMap />
            </ReactFlow>
        </div>
    </div >
}

export default Logic;