/* eslint no-console:0, react/no-danger: 0 */
import { Provider } from 'rc-motion';
import Tree, { TreeNode } from 'rc-tree';
import React, { useState, useCallback, useRef } from 'react';
// import './index.less';
// import './animation.less';
import { componentsAsTree1 } from '../../helpers/tree-builder1';
import useDesignerStore from '../../stores/designer';
import { ComponentLeaf, ComponentLeaf1 } from '../../vite-env';
import useResizeObserver from "use-resize-observer";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";

import './ComponentTree1.less';
import { compTypes } from '../../config/components';
import { Box, Flex, Icon, Tooltip, useStatStyles } from '@chakra-ui/react';
import { FaRegSquare } from 'react-icons/fa';
import { debounce } from 'lodash';
import { RiDeleteBin2Line } from "react-icons/ri";
import { treeAsHtml } from '../../helpers/tree-builder1';


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

function getTreeData1() {
  return [
    {
      "key": "canvas",
      "title": "Canvas",
      "type": "canvas",
      "children": [
        {
          "key": "994a18fa-b8d0-42e1-bc31-a510367b014b",
          "title": "Button 1",
          "type": "button",
          "readOnly": false
        },
        {
          "key": "16586569-f34a-4066-9e17-192a9bbb6579",
          "title": "Container column",
          "type": "container-column",
          "children": [
            {
              "key": "b327b072-db49-4641-8079-69c5d8c06c97",
              "title": "Sub button 1",
              "type": "button",
              "readOnly": false
            },
            {
              "key": "aadbb64e-7c4e-4096-b67c-8b0658a592f8",
              "title": "Sub button 2",
              "type": "button",
              "readOnly": false
            }
          ],
          "readOnly": false
        },
        {
          "key": "460e5784-db2c-485b-9db1-216a4d706ed2",
          "title": "Empty container",
          "type": "container-column",
          "children": [],
          "readOnly": false
        }
      ],
      "readOnly": false
    }
  ]
}

function getTreeData() {
  // big-data: generateData(1000, 3, 2)
  return [
    {
      key: '0',
      title: 'node 0',
      children: [
        { key: '0-0', title: 'node 0-0' },
        { key: '0-1', title: 'node 0-1' },
        {
          key: '0-2',
          title: 'node 0-2',
          children: [
            { key: '0-2-0', title: 'node 0-2-0' },
            { key: '0-2-1', title: 'node 0-2-1' },
            { key: '0-2-2', title: 'node 0-2-2' },
          ],
        },
        { key: '0-3', title: 'node 0-3' },
        { key: '0-4', title: 'node 0-4' },
        { key: '0-5', title: 'node 0-5' },
        { key: '0-6', title: 'node 0-6' },
        { key: '0-7', title: 'node 0-7' },
        { key: '0-8', title: 'node 0-8' },
        {
          key: '0-9',
          title: 'node 0-9',
          children: [
            { key: '0-9-0', title: 'node 0-9-0' },
            {
              key: '0-9-1',
              title: 'node 0-9-1',
              children: [
                { key: '0-9-1-0', title: 'node 0-9-1-0' },
                { key: '0-9-1-1', title: 'node 0-9-1-1' },
                { key: '0-9-1-2', title: 'node 0-9-1-2' },
                { key: '0-9-1-3', title: 'node 0-9-1-3' },
                { key: '0-9-1-4', title: 'node 0-9-1-4' },
              ],
            },
            {
              key: '0-9-2',
              title: 'node 0-9-2',
              children: [
                { key: '0-9-2-0', title: 'node 0-9-2-0' },
                { key: '0-9-2-1', title: 'node 0-9-2-1' },
              ],
            },
          ],
        },
      ],
    },
    {
      key: '1',
      title: 'node 1',
      // children: new Array(1000)
      //   .fill(null)
      //   .map((_, index) => ({ title: `auto ${index}`, key: `auto-${index}` })),
      children: [
        {
          key: '1-0',
          title: 'node 1-0',
          children: [
            { key: '1-0-0', title: 'node 1-0-0' },
            {
              key: '1-0-1',
              title: 'node 1-0-1',
              children: [
                { key: '1-0-1-0', title: 'node 1-0-1-0' },
                { key: '1-0-1-1', title: 'node 1-0-1-1' },
              ],
            },
            { key: '1-0-2', title: 'node 1-0-2' },
          ],
        },
      ],
    },
  ];
}

const getIcon = (compTypeName: string) => {
  const IconComponent = compTypes[compTypeName].icon;
  return IconComponent ? <IconComponent /> : null;
};


const useDebouncedMouseEnter = (setStatus) => {
  // Use a ref to track the debounced update
  const debouncedUpdateRef = useRef(null);

  // Debounce function to ensure a final update after inactivity
  const debouncedUpdate = useCallback(debounce((id) => {
    setStatus(id);
  }, 300), [setStatus]);

  const handleMouseEnter = useCallback((id) => {
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

const Demo = () => {
  const treeRef = React.useRef();
  // const [enableMotion, setEnableMotion] = React.useState(true);

  const { ref, width, height } = useResizeObserver();

  const treeData: ComponentLeaf1[] = [];
  const components = useDesignerStore((state) => state.components);
  componentsAsTree1(components, 'canvas', treeData);

  const { setHoveredId, hoveredId } = useDesignerStore(
    useCallback(
      (state) => ({
        setHoveredId: state.setHoveredId,
        hoveredId: state.hoveredId,
      }),
      []
    )
  );

  const [localHoveredId, setLocalHoveredId] = useState(false);

  const { handleMouseEnter, handleMouseLeave } = useDebouncedMouseEnter(setHoveredId)

  console.log('Tree rc-tree')

  // setTimeout(() => {
  //   treeRef.current.scrollTo({ key: '0-9-2' });
  // }, 100);

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
              {treeData.length ? <Tree
                ref={treeRef}
                // defaultExpandAll={false}
                defaultExpandAll
                style={{ userSelect: 'none' }}
                defaultExpandedKeys={defaultExpandedKeys}
                motion={motion}
                height={height - 50}
                // height={250}
                itemHeight={28}
                onMouseEnter={(info) => {
                  setLocalHoveredId(true);
                  handleMouseEnter(info.node.key);
                }}
                onMouseLeave={() => {
                  setLocalHoveredId(false);
                  handleMouseLeave();
                }}
                // style={{ border: '1px solid #000' }}
                // treeData={getTreeData()}
                // treeData={treeData[0].children} // canvas excluded
                // treeData={getTreeData1()}
                // testing props
                draggable
                // icon={compTypes[node.data.type as keyof typeof compTypes]?.icon}
                // icon={() => compTypes['button']?.icon}
                // icon={(node) => getIcon(node.data.type)}
                // icon={(node) => {
                //   console.log('node', node)
                //   return getIcon('button')
                // }}
                showLine
                selectedKeys={[localHoveredId ? '' : hoveredId]}
                // onDragStart={(e, node) => {
                //   console.log('DEBUG - DRAG STARTED')
                // }}
                switcherIcon={(props) => {
                  // console.log(props);
                  return <>{props.isLeaf ? null : props.expanded ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}</>
                }}
                // dropIndicatorRender={()=>{
                //   return <div>DRAGGING</div>
                // }}
                expandAction={false}
              >
                {/* <TreeNode title="Parent">
                  <TreeNode key={'460e5784-db2c-485b-9db1-216a4d706ed2'} title={<Tooltip label='Hover me'>
                    <Flex alignItems={'center'}>
                      <span>Tag Here</span>
                      <RiDeleteBin2Line size={15} onClick={() => {console.log('clickedddddddd')}}/>
                    </Flex>
                  </Tooltip>} />
                </TreeNode> */}
                {treeAsHtml(treeData[0])}
              </Tree> : 'loading tree'}
            </div>
            {/* <div style={{ flex: '1 1 50%' }}>
              <h3>Without Virtual</h3>
              <Tree
                defaultExpandAll={false}
                defaultExpandedKeys={defaultExpandedKeys}
                motion={motion}
                style={{ border: '1px solid #000' }}
                treeData={getTreeData()}
              />
            </div> */}
          </div>
        </div>
      </React.StrictMode>
    </Provider>
  );
};

export default Demo;