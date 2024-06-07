import { Box, Button, Divider, Flex, Icon, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Portal, Tag, TagLabel, TagLeftIcon, Text } from "@chakra-ui/react";
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
import { useToast } from "@chakra-ui/react";
import { keyframes } from "@chakra-ui/react";
import { isEqual } from "lodash";

import "rc-tree/assets/index.css"


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

// style on new comp created
const onShow = keyframes`
        from {
          background-color:  #abebc6;
        }
        to {
          background-color: undefined;
        }
      }`
const animation = `${onShow} 2s forwards`;


function Node({ node, style, dragHandle }) {
    /* This node instance can do many things. See the API reference. */

    console.log('C - tree node ' + node.data.name)

    const toast = useToast()

    // const setHoveredId = useDesignerStore((state) => state.setHoveredId);
    // const removeComponent = useDesignerStore((state) => state.removeComponent);
    // const addComponent = useDesignerStore((state) => state.addComponent);
    // const setDraggingId = useDesignerStore((state) => state.setDraggingId);
    // const draggingId = useDesignerStore((state) => state.draggingId);

    const { setHoveredId, removeComponent, addComponent, setDraggingId, draggingId } = useDesignerStore(
        useCallback(
            (state) => ({
                setHoveredId: state.setHoveredId,
                removeComponent: state.removeComponent,
                addComponent: state.addComponent,
                setDraggingId: state.setDraggingId,
                draggingId: state.draggingId,
            }),
            []
        )
    );

    const { handleMouseEnter, handleMouseLeave } = useDebouncedMouseEnter(setHoveredId)

    const [isHovered, setIsHovered] = useState(false);

    const isFirstMount = useRef(true);

    useEffect(() => {
        if (isFirstMount.current) {
            isFirstMount.current = false;
        }
    }, []);

    // useEffect(() => {
    //     const unsub_ = useDesignerStore.subscribe(
    //         // selector
    //         (state) => state.components,
    //         // callback
    //         (components, prevComponents) => {
    //             console.log('DEBUGGGGGGERRR ___')
    //             // console.log(Object.keys(components).includes(node.id))
    //             console.log('node.id ' + node.id)
    //             console.log(Object.keys(prevComponents))
    //             console.log(Object.keys(prevComponents).includes(node.id))
    //             console.log(Object.keys(components).length)
    //             console.log(Object.keys(prevComponents).length)
    //             // console.log(Object.keys(prevComponents).includes(node.id))
    //             console.log('DEBUGGGGGGERRR end')
    //             if (Object.keys(components).includes(node.id) && !Object.keys(prevComponents).includes(node.id)) {
    //             // newly added component
    //                 setBgColor('#abebc6');
    //                 // revert to original color after 1 second
    //                 const timer = setTimeout(() => {
    //                     setBgColor('undefined');
    //                 }, 750);

    //                 // cleanup timeout if the component unmounts
    //                 return () => clearTimeout(timer);
    //             }
    //         },
    //         { 
    //             fireImmediately: true 
    //         },
    //     );

    //     return unsub_
    // }, [])



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
            key={node.id}
            style={style}
            ref={dragHandle}
            id={node.id}
            // _hover={{ outline: '2px solid grey' }}
            outline={isHovered ? '2px solid grey' : undefined}
            bg={isHovered || isHovered ? 'rgba(192, 192, 192, 0.5)' : undefined}
            // _hover={draggingId === null ? { backgroundColor: 'rgba(192, 192, 192, 0.5)', outline: '2px solid grey' } : draggingId !== node.id ? {} : { backgroundColor: 'rgba(192, 192, 192, 0.5)', outline: '2px solid grey' }}
            onMouseEnter={() => {
                handleMouseEnter(node.id);
                setIsHovered(true)
            }}
            onMouseLeave={() => {
                handleMouseLeave();
                setIsHovered(false);
            }}
            onMouseDown={() => {
                setDraggingId('draggable_' + node.id)
                setIsHovered(false)
                setHoveredId(null)
            }}
            onDragStart={() => {
                setDraggingId('draggable_' + node.id)
                setIsHovered(false)
                setHoveredId(null)
            }}
            onDragEnd={() => {
                setDraggingId(null)
            }}
            onMouseUp={() => {
                setDraggingId(null)
            }}
            // animation={isFirstMount.current ? animation : undefined}
            animation={isFirstMount.current ? animation : undefined}
        >
            <Flex
                alignItems={'center'}
                position={'relative'}
            // gap={'5px'}
            // cursor={'pointer'}
            >
                {!node.isLeaf && <Box
                    style={{ position: 'absolute', left: node.id !== 'canvas' ? '-19px' : '0px', cursor: 'pointer' }}
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
                <Popover isLazy placement="right" arrowSize={8}>
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
                                {node.id !== 'canvas' && <><Button
                                    onClick={() => {
                                        removeComponent(node.id);
                                        toast({
                                            title: 'Deleted',
                                            status: 'success',
                                            duration: 1500,
                                            // isClosable: true,
                                        })
                                    }}
                                    size={'sm'}
                                    leftIcon={<RiDeleteBin2Line />}
                                    colorScheme='red'
                                    variant='solid'
                                >
                                    Delete
                                </Button>
                                    <Divider m={'10px 0'} /></>}
                                <Flex wrap={'wrap'} gap={1}>
                                    {Object.keys(compTypes).map(c => (
                                        // <Tag cursor={'pointer'} variant='solid' colorScheme='blue'></Tag>
                                        <Tag
                                            cursor={'pointer'}
                                            size={'md'}
                                            key={c}
                                            variant='solid'
                                            colorScheme='blue'
                                            onClick={() => {
                                                // node.open();
                                                addComponent(c, node.id, 'auto');
                                                toast({
                                                    title: `${compTypes[c as keyof typeof compTypes].name} created`,
                                                    status: 'success',
                                                    duration: 1500,
                                                    // isClosable: true,
                                                })
                                            }}
                                        >
                                            <TagLeftIcon boxSize='15px' as={MdOutlineAdd} />
                                            <TagLabel>{compTypes[c as keyof typeof compTypes].name}</TagLabel>
                                        </Tag>
                                    ))}
                                </Flex>
                            </PopoverBody>
                            {/* <PopoverFooter>This is the footer</PopoverFooter> */}
                        </PopoverContent>
                    </Portal>
                </Popover>
                {/* <span>{node.isEditing ? 'editing' : null}</span> */}
            </Flex>
        </Box >
    );
}

const ComponentTree = () => {

    const components = useDesignerStore((state) => state.components);
    const moveComponent = useDesignerStore((state) => state.moveComponent);
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

    const onMove = ({ dragIds, parentId, index }) => {
        // console.log('ON MOVEEEEEEEEEEEEEEEEEE')
        // console.log('dragIds', dragIds)
        // console.log('parentId', parentId)
        // console.log('index', index)
        // console.log('ON MOVEEEEEEEEEEEEEEEEEE END')
        if (parentId !== null) {
            moveComponent(dragIds[0], parentId, 'inside', index)
        }
    };


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
                indent={19}
                rowHeight={30}
                overscanCount={1}
                paddingTop={10}
                onMove={onMove}

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