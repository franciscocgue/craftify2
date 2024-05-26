import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import Draggable from "../../helpers/Draggable";
import Component from "./Component";
import { compTypes } from '../../config/components';
import { Resizable } from "re-resizable";
import { Tree } from "react-arborist";
import useDesignerStore from "../../stores/designer";
import { componentsAsTree } from "../../helpers/tree-builder";
import { ComponentLeaf } from "../../vite-env";
import { FaRegSquare } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { useEffect, useRef } from "react";



function Node({ node, style, dragHandle }) {
    /* This node instance can do many things. See the API reference. */

    return (
        <Box
            style={style}
            ref={dragHandle}
            // _hover={{ outline: '2px solid grey' }}
            outline={node.isSelected && node.id !== 'canvas' ? '2px solid grey' : undefined}
            bg={node.isSelected && node.id !== 'canvas' ? 'rgba(192, 192, 192, 0.5)' : undefined}
            onMouseEnter={() => {
                node.select()
            }}
            onMouseLeave={() => {
                node.deselect()
            }}
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
                    onClick={(e) => {
                        node.edit();
                    }}
                >
                    {node.data.name}
                </Text>
                <span>{node.isEditing ? 'editing' : null}</span>
            </Flex>
        </Box>
    );
}

const SidebarComponents = () => {

    const { components, hoveredId, setHoveredId, isResizing } = useDesignerStore();
    const treeData: ComponentLeaf[] = [];
    componentsAsTree(components, 'canvas', treeData);
    const treeRef = useRef();

    // useEffect(() => {
    //     console.log('selecttion changed')
    //     console.log(treeRef.current?.selectedIds)
    //     // setHoveredId(treeRef.current?.selectedIds[0])
    // }, [treeRef.current?.selectedIds])

    return <Flex direction={'column'} w={'250px'} h={'100%'} maxH={'100%'} >
        <Flex
            w={'100%'}
            p={1}
            border={'1px solid grey'}
            maxH={'100%'}
            overflowY={'auto'}
            gap={1}
            justify={'flex-start'}
            alignContent={'start'}
            wrap={'wrap'}
            flexGrow={1}
        >
            {Object.keys(compTypes).map(c => <Draggable componentType={c} key={c} id={c}>
                <Component name={compTypes[c as keyof typeof compTypes].name} icon={compTypes[c as keyof typeof compTypes].icon} />
            </Draggable>)}
        </Flex>
        <Resizable
            defaultSize={{
                width: '100%',
                height: '50%',
            }}
            handleComponent={{
                top: <Box h={'100%'} w={'100%'} _hover={{ 'backgroundColor': 'darkgrey' }}></Box>
            }}
            maxWidth={'100%'}
            maxHeight={'100%'}
            enable={{ top: true, right: false, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
        >
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
        </Resizable>
    </Flex>
}

export default SidebarComponents;