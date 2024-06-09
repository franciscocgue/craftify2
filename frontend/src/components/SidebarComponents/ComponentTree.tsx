import { Provider } from 'rc-motion';
import Tree from 'rc-tree';
import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { getComponentsAsTree } from '../../helpers/tree-builder';
import useDesignerStore from '../../stores/designer';
import { ComponentLeaf1 } from '../../vite-env';
import useResizeObserver from "use-resize-observer";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import './ComponentTree.less';
import { debounce } from 'lodash';
import { treeAsHtml } from '../../helpers/tree-builder';


const STYLE = `
.rc-tree-child-tree {
  display: block;
}

.node-motion {
  transition: all .4s;
  overflow-y: hidden;
}
`;

const defaultExpandedKeys = ['0', '0-2', '0-9-2'];

const motion = {
  motionName: 'node-motion',
  motionAppear: false,
  onAppearStart: () => ({ height: 0 }),
  onAppearActive: node => ({ height: node.scrollHeight }),
  onLeaveStart: node => ({ height: node.offsetHeight }),
  onLeaveActive: () => ({ height: 0 }),
};

const useDebouncedMouseEnter = (setStatus: (selectedId: string | null) => void) => {
  // Use a ref to track the debounced update
  const debouncedUpdateRef = useRef(null);

  // Debounce function to ensure a final update after inactivity
  const debouncedUpdate = useCallback(debounce((id) => {
    setStatus(id);
  }, 300), [setStatus]);

  const handleMouseEnter = useCallback((id: string) => {
    // Clear any existing debounce
    if (debouncedUpdateRef.current) {
      debouncedUpdateRef.current.cancel();
    }

    // Perform debounced update
    debouncedUpdateRef.current = debouncedUpdate;
    debouncedUpdate(id);
  }, [debouncedUpdate]);

  const handleMouseLeave = useCallback(() => {
    // Clear the debounced update on mouse leave
    if (debouncedUpdateRef.current) {
      debouncedUpdateRef.current.cancel();
    }
    setStatus(null); // Optionally clear status on leave
  }, [setStatus]);

  return { handleMouseEnter, handleMouseLeave };
};

const ComponentTree = () => {
  const treeRef = React.useRef();
  // const [enableMotion, setEnableMotion] = React.useState(true);

  const { ref, width, height } = useResizeObserver();

  const components = useDesignerStore((state) => state.components);

  const treeNodes = useMemo(
    // () => renderNode(components, 'canvas'),
    () => {
      const treeData = getComponentsAsTree(components);
      return treeAsHtml(treeData[0])
    },
    [components]
  );

  const setHoveredId = useDesignerStore((state) => state.setHoveredId);
  const hoveredId = useDesignerStore((state) => state.hoveredId);
  const moveComponent = useDesignerStore((state) => state.moveComponent);

  // const { setHoveredId, hoveredId, moveComponent } = useDesignerStore(
  //   // useCallback(
  //   (state) => ({
  //     setHoveredId: state.setHoveredId,
  //     hoveredId: state.hoveredId,
  //     moveComponent: state.moveComponent,
  //   }),
  //   //   []
  //   // )
  // );

  useEffect(() => {
    console.log('hoverId changed')
  }, [hoveredId])

  const [localHoveredId, setLocalHoveredId] = useState(false);

  const { handleMouseEnter, handleMouseLeave } = useDebouncedMouseEnter(setHoveredId)

  console.log('Tree rc-tree')

  return (
    <Provider motion={true}>

      Component Tree


      <React.StrictMode>
        <div ref={ref} style={{ height: '100%' }} className="animation">
          <style dangerouslySetInnerHTML={{ __html: STYLE }} />

          <div
            style={{ display: 'flex' }}

          >
            <div style={{ width: width }}>
              {/* {treeNodes.length ? <Tree */}
              {true ? <Tree
                ref={treeRef}
                // to enable autoscroll at the expense of more rendering: virtual={false}
                // defaultExpandAll={false}
                defaultExpandAll
                style={{ userSelect: 'none' }}
                defaultExpandedKeys={defaultExpandedKeys}
                motion={motion}
                height={height - 50}
                itemHeight={28}
                onMouseEnter={(info) => {
                  setLocalHoveredId(true);
                  handleMouseEnter(info.node.key as string);
                }}
                onMouseLeave={() => {
                  setLocalHoveredId(false);
                  handleMouseLeave();
                }}
                draggable={(node) => node.key !== 'canvas'}
                allowDrop={({ dropNode, dropPosition }) => {
                  // no nesting inside non-contrainer components
                  // no canvas sibling
                  if (
                    (dropNode.key === 'canvas' && dropPosition !== 0)
                    || (!['container-row', 'container-column', 'canvas'].includes(components[dropNode.key as string].type) && dropPosition === 0)
                  ) {
                    return false;
                  }
                  return true;
                }}
                onDrop={({ node, dragNode, dropPosition }) => {
                  const dropPos = node.pos.split('-');
                  dropPosition = dropPosition - Number(dropPos[dropPos.length - 1]);
                  let location: 'after' | 'inside' = dropPosition === 1 ? 'after' : 'inside';
                  moveComponent(dragNode.key as string, node.key as string, location, 'first')
                }}
                selectedKeys={[localHoveredId ? '' : hoveredId]}
                switcherIcon={(props) => {
                  return <>{props.isLeaf ? null : props.expanded ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}</>
                }}
                // dropIndicatorRender={()=>{
                //   return <div>DRAGGING</div>
                // }}
                expandAction={false}
              >
                {treeNodes}
              </Tree> : 'loading tree'}
            </div>
          </div>
        </div>
      </React.StrictMode>
    </Provider>
  );
};

export default ComponentTree;