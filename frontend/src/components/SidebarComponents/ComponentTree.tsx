import { Provider } from 'rc-motion';
import Tree from 'rc-tree';
import React, { useMemo } from 'react';
import { getComponentsAsTree } from '../../utils';
import useDesignerStore from '../../stores/designer';
import useResizeObserver from "use-resize-observer";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import './ComponentTree.less';
import { treeAsHtml } from '../../utils';
import { useDebouncedMouseEnter } from "../../hooks";
import { DataNode } from 'rc-tree/lib/interface';


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
  onAppearActive: (node: any) => ({ height: node.scrollHeight }),
  onLeaveStart: (node: any) => ({ height: node.offsetHeight }),
  onLeaveActive: () => ({ height: 0 }),
};


const ComponentTree = () => {
  const treeRef = React.useRef<Tree<DataNode>>(null);
  // const [enableMotion, setEnableMotion] = React.useState(true);

  const { ref, width, height } = useResizeObserver();

  const components = useDesignerStore((state) => state.components);
  const selectedId = useDesignerStore((state) => state.selectedId);
  const logicNodes = useDesignerStore((state) => state.logicNodes);


  const treeNodes = useMemo(
    // () => renderNode(components, 'canvas'),
    () => {
      // get node Ids with user custom logic
      const nodeIdsWithLogic = Object.keys(logicNodes).reduce((acc: string[], nodeId: keyof typeof logicNodes) => {
        if (logicNodes[nodeId].length > 1) {
          return [...acc, nodeId];
        };
        return acc;
      }, [])
      const treeData = getComponentsAsTree(components, nodeIdsWithLogic);
      return treeAsHtml(treeData[0], selectedId)
    },
    [components, selectedId, logicNodes]
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


  // const [localHoveredId, setLocalHoveredId] = useState(false);

  const { handleMouseEnter, handleMouseLeave } = useDebouncedMouseEnter(setHoveredId)

  console.log('Tree rc-tree')

  // console.log([localHoveredId ? '' : hoveredId, selectedId])

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
                multiple
                style={{ userSelect: 'none' }}
                defaultExpandedKeys={defaultExpandedKeys}
                motion={motion}
                height={(height || 0) - 50}
                itemHeight={28}
                onMouseEnter={(info) => {
                  // setLocalHoveredId(true);
                  handleMouseEnter(info.node.key as string);
                }}
                onMouseLeave={() => {
                  // setLocalHoveredId(false);
                  handleMouseLeave();
                }}
                draggable={(node) => node.key !== 'canvas'}
                allowDrop={({ dropNode, dropPosition }) => {
                  // no nesting inside non-contrainer components
                  // no canvas sibling
                  if (
                    (dropNode.key === 'canvas' && dropPosition !== 0)
                    || (!['row', 'column', 'canvas'].includes(components[dropNode.key as string].type) && dropPosition === 0)
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
                // if hovering tree comp, do not highlight (there was a reason ...)
                // if clicked (selected) --> highlight; clicking again unselects
                // hoveredId is true if comp hovered in canvas --> highlight after debounce time
                selectedKeys={hoveredId ? [hoveredId] : []}
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