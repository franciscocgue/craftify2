import { Box, Flex } from "@chakra-ui/react";
import Droppable from "../../helpers/Droppable";
import TestDroppableArea from "../../helpers/TestDroppableArea";
import useDesignerStore from "../../stores/designer";
import DraggableCanvas from "../../helpers/DraggableCanvas";
import ComponentWrapper from "../../helpers/ComponentWrapper";


const screenSizes = {
    'Galaxy S10': [360, 760],
    'Laptop': [1280, 800]
}

const device = "Galaxy S10";

const canvasDropBorderPx = 2;

const Canvas = () => {

    const { components } = useDesignerStore();

    return <Flex flex={1} border={'1px solid grey'} alignItems={'center'} justifyContent={'center'} maxH='100vh' maxW='100vw' overflow={'auto'}>

        <Box maxW={'100%'} maxH={'100%'} overflow={'auto'}>
            <Box
                style={{ padding: canvasDropBorderPx, margin: '0 15px' }}
                w={screenSizes[device][0] + canvasDropBorderPx * 2}
                h={screenSizes[device][1] + canvasDropBorderPx * 2}
                maxH={screenSizes[device][1]}
                bg='gray.200'
                // border={'1px solid blue'}
                overflowY={'auto'}
            >
                <Droppable componentId='canvas' componentType={components['canvas'].type}>
                    {/* Example: */}
                    {/* Canvas
                <Box overflow={'auto'}>
                    <Flex justify={'space-between'} alignItems={'center'} border={'1px solid green'} wrap={'nowrap'} w={'fit-content'} overflow={'auto'}>
                        <Box p={10} m={3} bg={'gray.500'}>Box</Box>
                        <Box p={10} m={3} bg={'gray.500'}>Box</Box>
                        <Box p={10} m={3} bg={'gray.500'}>Box</Box>
                        <Box p={10} m={3} bg={'gray.500'}>Box</Box>
                        <Box p={10} m={3} bg={'gray.500'}>Box</Box>
                        <Flex direction={'column'} justifyContent={'center'} border={'1px solid green'} wrap={'nowrap'} overflow={'auto'}>
                            <Box p={3} m={3} bg={'gray.200'}>Box</Box>
                            <Box p={3} m={3} bg={'gray.200'}>Box</Box>
                            <Box p={3} m={3} bg={'gray.200'}>Box</Box>
                            <Box p={3} m={3} bg={'gray.200'}>Box</Box>
                            <Box p={3} m={3} bg={'gray.200'}>Box</Box>
                        </Flex>
                    </Flex>
                </Box> */}

                    {/* Main container */}
                    <Flex direction={'column'} alignItems={'center'} gap={2} h={'100%'} w={'100%'}>
                        <Box border={'1px solid gray'}>
                            <DraggableCanvas id={"component-id1"}>
                                <Droppable componentId='component-id1' componentType={components['component-id1'].type}>
                                    Box 1
                                </Droppable>
                            </DraggableCanvas>
                        </Box>

                        <Box border={'1px solid gray'} w={'100px'} h={'200px'}>
                            <DraggableCanvas id={"component-id2"}>
                                <Droppable componentId='component-id2' componentType={components['component-id2'].type}>
                                    Box 2
                                </Droppable>
                            </DraggableCanvas>
                        </Box>
                        {/* <ComponentWrapper id="">
                            <Box>
                                Testing
                            </Box>
                        </ComponentWrapper> */}
                        <Box border={'1px solid gray'} w={'50%'}>
                            <DraggableCanvas id={"component-id3"}>
                                <Droppable componentId='component-id3' componentType={components['component-id3'].type}>
                                    Box 3
                                </Droppable>
                            </DraggableCanvas>
                        </Box>
                        {/* test sub container 1 */}
                        <ComponentWrapper id="TEST" componentType="" parentType='container-column' w={'100%'} h={'100px'} p={1} border="none">
                            test container
                        </ComponentWrapper>
                        {/* test sub container 2 */}
                        <Box border={'1px solid white'} w={'100%'}>
                            <Droppable componentId='subcontainer2' componentType={components['subcontainer2'].type}>
                                <Box border={'1px solid gray'} w={'50%'} h={10}>Box 3</Box>
                                {/* test sub sub container 1 */}
                                <Box border={'1px solid white'} w={'100%'} h={'50px'}>
                                    <Droppable componentId='subsubcontainer1' componentType={components['subsubcontainer1'].type}>
                                        test deeply nested container
                                    </Droppable>
                                </Box>
                            </Droppable>
                        </Box>
                    </Flex>

                </Droppable>
            </Box>
        </Box >

    </Flex >
};

export default Canvas;