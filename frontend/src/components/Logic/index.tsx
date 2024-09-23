// import { useMemo, useState } from 'react';

// import 'reactflow/dist/style.css';
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
} from '@xyflow/react';
import styles from './index.module.css';
import { useCallback } from 'react';
import useDesignerStore from '../../stores/designer';
import CustomNode from './CustomNode';
import { FaWindowClose } from "react-icons/fa";
import Trigger from './nodes/Trigger';
import { size } from 'lodash';
import Width from '../SidebarProperties/Width';
import OpenUrl from './nodes/OpenUrl';

// import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
// import { restrictToWindowEdges } from '@dnd-kit/modifiers';

const initialNodes = [
    // { id: '1', type: 'customNode', position: { x: 0, y: 0 }, data: { label: '1' } },
    // { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
    { id: '3', type: 'trigger', position: { x: 0, y: 200 }, data: { label: '3' }, style: { width: 100, height: 30 } },
    { id: '4', type: 'openUrl', position: { x: 0, y: 300 }, data: { label: '3' }, style: { width: 100, height: 30 } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2', type: 'smoothstep' }];

const nodeTypes = { customNode: CustomNode, trigger: Trigger, openUrl: OpenUrl };

const Logic = ({ changeToStyles }) => {

    const handleClick = (event) => {
        // event.stopPropagation();
        if (event.target === event.currentTarget) { // check if the click event's target (the actual element clicked) is the same as the currentTarget (the element that the event handler is attached to)
            changeToStyles();
        }
    }

    // const [dropEvent, setDropEvent] = useState<DragEndEvent | null>(null);
    // const [draggingFunctionId, setDraggingFunctionId] = useState<string | null>(null);

    // const { components, status } = useComponentStore();

    // const component = useMemo(() => {
    //     return findComponentFromIdAndPath(status.selectedIds.id[0], status.selectedIds.path[0], components)
    // }, [components, status]);


    // const handleDrop = (event: DragEndEvent) => {
    //     // confirm drop target
    //     if (event.over?.id === 'logic-canvas') {
    //         setDropEvent(event)
    //     }
    // }

    // const handleDragStart = (event) => {
    //     if (event.active?.id) {
    //         setDraggingFunctionId(event.active.id)
    //     }
    // }

    const colorMode = useDesignerStore((state) => state.colorMode);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    return <div className={styles.wrapper} onClick={handleClick}>
        <div style={{
            position: 'fixed',
            width: 'calc(100% - 50px - 1px)',
            height: 'calc(100% - 72px - 1px)',
            bottom: 0,
            right: 0,
        }}>
            <ReactFlow
                colorMode={colorMode}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
            >
                <Panel position="top-right" ><FaWindowClose color={`${colorMode === 'light' ? 'black' : 'white'}`} size={30} style={{ cursor: 'pointer' }} onClick={changeToStyles} /></Panel>
                <Background bgColor={colorMode === 'light' ? 'white' : undefined} variant="dots" gap={12} size={1} />
                <Controls />
                <MiniMap />
            </ReactFlow>
        </div>
    </div >
}

export default Logic;