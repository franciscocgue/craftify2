import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { Tree } from "react-arborist";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import useDesignerStore from "../../stores/designer";
import { ComponentLeaf } from "../../vite-env";
import { useRef } from "react";
import { componentsAsTree } from "../../helpers/tree-builder";
import { compTypes } from '../../config/components';
import { FaRegSquare } from "react-icons/fa";


function Node({ node, style, dragHandle }) {
    /* This node instance can do many things. See the API reference. */

    return (
        <Box
            style={style}
            ref={dragHandle}
            // _hover={{ outline: '2px solid grey' }}
            outline={node.isSelected && node.id !== 'canvas' ? '2px solid grey' : undefined}
            bg={node.isSelected && node.id !== 'canvas' ? 'rgba(192, 192, 192, 0.5)' : undefined}
        >
            <Flex
                alignItems={'center'}
                position={'relative'}
            // gap={'5px'}
            // cursor={'pointer'}
            >
                {!node.isLeaf && <Box
                    style={{ position: 'absolute', left: node.id !== 'canvas' ? '-15px' : '0px', cursor: 'pointer' }}
                    _hover={{ backgroundColor: ' #d5dbdb', borderRadius: '25%' }}
                    onClick={() => node.isInternal && node.toggle()}
                >
                    {node.isOpen ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
                </Box>}
                <Icon as={compTypes[node.data.type as keyof typeof compTypes]?.icon || FaRegSquare} w={4} h={4} color="black.900" />
                <Text
                    p={'4px'}
                    align={'center'}
                    fontSize='small'
                    userSelect={'none'}
                    // onClick={(e) => {
                    //     node.edit();
                    // }}
                    onMouseEnter={() => {
                        node.select()
                    }}
                    onMouseLeave={() => {
                        node.deselect()
                    }}
                >
                    {node.data.name}
                </Text>
                <span>{node.isEditing ? 'editing' : null}</span>
            </Flex>
        </Box>
    );
}

const ComponentTree = () => {

    const components = useDesignerStore((state) => state.components);
    const hoveredId = useDesignerStore((state) => state.hoveredId);
    const setHoveredId = useDesignerStore((state) => state.setHoveredId);
    const isResizing = useDesignerStore((state) => state.isResizing);

    console.log(hoveredId)

    // const { components, hoveredId, setHoveredId, isResizing } = useDesignerStore();
    const treeData: ComponentLeaf[] = [];
    componentsAsTree(components, 'canvas', treeData);
    const treeRef = useRef();

    console.log('C - ComponentTree')


    return (
        <Box
        h={'100%'}
        overflow={'auto'}
        p={1}
        border={'1px solid grey'}
        onMouseLeave={() => {
            setHoveredId(null);
        }}
    >
        Component Tree

        <Tree
            data={treeData}
            ref={treeRef}
            openByDefault={true}
            width={240}
            // height={1000}
            indent={27}
            rowHeight={30}
            overscanCount={1}
            paddingTop={10}
            selection={!isResizing ? hoveredId || undefined : undefined}
            onSelect={nodes => {
                if (nodes.length && nodes[0].id !== 'canvas') {
                    setHoveredId(nodes[0].id)
                } else if (nodes[0]?.id === 'canvas') {
                    setHoveredId(null)
                }
                // console.log(nodes)

            }}
        // paddingBottom={10}
        // padding={10 /* sets both */}
        >
            {Node}
        </Tree>
    </Box>
    )
}

export default ComponentTree;