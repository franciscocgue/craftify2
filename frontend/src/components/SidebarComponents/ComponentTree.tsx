import { Box, Button, Center, Divider, Flex, Icon, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, Tag, TagLabel, TagLeftIcon, Text } from "@chakra-ui/react";
import { Tree } from "react-arborist";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import useDesignerStore from "../../stores/designer";
import { ComponentLeaf } from "../../vite-env";
import { useCallback, useEffect, useRef, useState } from "react";
import { componentsAsTree } from "../../helpers/tree-builder";
import { compTypes } from '../../config/components';
import { FaRegSquare } from "react-icons/fa";
import { debounce } from "lodash";
import { RiDeleteBin2Line } from "react-icons/ri";
import { MdOutlineAdd } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import useResizeObserver from "use-resize-observer";


const useDebouncedMouseEnter = (setStatus) => {
    // Use a ref to track the debounced update
    const debouncedUpdateRef = useRef(null);

    // Debounce function to ensure a final update after inactivity
    const debouncedUpdate = useCallback(debounce((id) => {
        setStatus(id);
    }, 400), [setStatus]);

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


function Node({ node, style, dragHandle }) {
    /* This node instance can do many things. See the API reference. */

    console.log('C - tree node')

    const setHoveredId = useDesignerStore((state) => state.setHoveredId);
    const { handleMouseEnter, handleMouseLeave } = useDebouncedMouseEnter(setHoveredId)
    // const hoveredId = useDesignerStore((state) => state.hoveredId);

    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const unsub = useDesignerStore.subscribe(
            // selector
            (state) => state.hoveredId,
            // callback
            (hoveredId, prevHoveredId) => {
                if (prevHoveredId !== node.id && hoveredId === node.id) {
                    setIsHovered(true)
                } else if (prevHoveredId === node.id && hoveredId !== node.id) {
                    setIsHovered(false)
                }
            });

        return unsub
    }, [])

    return (
        <Box
            style={style}
            ref={dragHandle}
            // _hover={{ outline: '2px solid grey' }}
            outline={isHovered ? '2px solid grey' : undefined}
            bg={isHovered ? 'rgba(192, 192, 192, 0.5)' : undefined}
            _hover={{ backgroundColor: 'rgba(192, 192, 192, 0.5)', outline: '2px solid grey' }}
            onMouseEnter={() => {
                handleMouseEnter(node.id);
            }}
            onMouseLeave={() => {
                handleMouseLeave();
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
                    // _hover={{ backgroundColor: '#d5dbdb', borderRadius: '25%' }}
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
                >
                    {node.data.name}
                </Text>
                {node.id !== 'canvas' && <Popover isLazy placement="right" arrowSize={8}>
                    <PopoverTrigger>
                        <Box>
                            <Icon cursor={'pointer'} as={SlOptionsVertical} w={'15px'} h={'12px'} />
                        </Box>
                    </PopoverTrigger>
                    <Portal>
                        <PopoverContent maxH={'300px'} overflow={'auto'}>
                            <PopoverHeader>Tree Manager</PopoverHeader>
                            <PopoverArrow bg='blue.800' />
                            <PopoverCloseButton />
                            <PopoverBody>
                                <Button size={'sm'} leftIcon={<RiDeleteBin2Line />} colorScheme='red' variant='solid'>
                                    Delete
                                </Button>
                                <Divider m={'10px 0'} />
                                <Flex wrap={'wrap'} gap={1}>
                                    {Object.keys(compTypes).map(c => (
                                        // <Tag cursor={'pointer'} variant='solid' colorScheme='blue'></Tag>
                                        <Tag cursor={'pointer'} size={'md'} key={c} variant='solid' colorScheme='blue'>
                                            <TagLeftIcon boxSize='15px' as={MdOutlineAdd} />
                                            <TagLabel>{compTypes[c as keyof typeof compTypes].name}</TagLabel>
                                        </Tag>
                                    ))}
                                </Flex>
                            </PopoverBody>
                            {/* <PopoverFooter>This is the footer</PopoverFooter> */}
                        </PopoverContent>
                    </Portal>
                </Popover>}
                {/* <span>{node.isEditing ? 'editing' : null}</span> */}
            </Flex>
        </Box >
    );
}

const ComponentTree = () => {

    const components = useDesignerStore((state) => state.components);
    // const hoveredId = useDesignerStore((state) => state.hoveredId);
    const setHoveredId = useDesignerStore((state) => state.setHoveredId);
    const { ref, width, height } = useResizeObserver();
    // const isResizing = useDesignerStore((state) => state.isResizing);

    // console.log(hoveredId)

    // const { components, hoveredId, setHoveredId, isResizing } = useDesignerStore();
    const treeData: ComponentLeaf[] = [];
    componentsAsTree(components, 'canvas', treeData);
    const treeRef = useRef();

    console.log('C - ComponentTree')


    return (
        <Box
            ref={ref}
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
                width={width}
                height={height - 25}
                // height={1000}
                indent={27}
                rowHeight={30}
                overscanCount={1}
                paddingTop={10}
            // selection={!isResizing ? hoveredId || undefined : undefined}
            // selection={hoveredId || undefined}
            // onSelect={nodes => {
            //     if (nodes.length && nodes[0].id !== 'canvas') {
            //         setHoveredId(nodes[0].id)
            //     } else if (nodes[0]?.id === 'canvas') {
            //         setHoveredId(null)
            //     }
            //     // console.log(nodes)

            // }}
            // paddingBottom={10}
            // padding={10 /* sets both */}
            >
                {Node}
            </Tree>
        </Box>
    )
}

export default ComponentTree;