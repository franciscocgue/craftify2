import { Box, Center, Flex, Icon, Text} from "@chakra-ui/react";
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
import { IoMdAddCircleOutline } from "react-icons/io";


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
                {isHovered && <Center
                    // as={<span>TiDelete</span>}
                    marginRight={3}
                    w={'19px'}
                    h={'19px'} //color='red.500' />}
                    _hover={{ color: 'green' }}
                    cursor={'pointer'}
                >
                    <IoMdAddCircleOutline />
                    {/* test */}
                </Center>}
                {isHovered && node.id !== 'canvas' && <Center
                    // as={<span>TiDelete</span>}
                    w={'19px'}
                    h={'19px'} //color='red.500' />}
                    _hover={{ color: 'red' }}
                    cursor={'pointer'}
                >
                    <RiDeleteBin2Line />
                    {/* test */}
                </Center>}
                {/* <span>{node.isEditing ? 'editing' : null}</span> */}
            </Flex>
        </Box >
    );
}

const ComponentTree = () => {

    const components = useDesignerStore((state) => state.components);
    // const hoveredId = useDesignerStore((state) => state.hoveredId);
    const setHoveredId = useDesignerStore((state) => state.setHoveredId);
    // const isResizing = useDesignerStore((state) => state.isResizing);

    // console.log(hoveredId)

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