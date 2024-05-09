import { Box, Flex } from "@chakra-ui/react";
import Droppable from "../../helpers/Droppable";

const screenSizes = {
    'Galaxy S10': [360, 760],
    'Laptop': [1280, 800]
}

const device = "Galaxy S10";

const canvasDropBorderPx = 2;

const Canvas = () => {
    return <Flex flex={1} border={'1px solid grey'} alignItems={'center'} justifyContent={'center'} maxH='100vh' maxW='100vw' overflow={'auto'}>

        <Box maxW={'100%'} maxH={'100%'} overflow={'auto'}>
            <Box
                style={{ padding: canvasDropBorderPx, margin: '0 15px' }}
                w={screenSizes[device][0] + canvasDropBorderPx * 2}
                h={screenSizes[device][1] + canvasDropBorderPx * 2}
                maxH={screenSizes[device][1]}
                bg='gray.500'
                // border={'1px solid blue'}
                overflowY={'auto'}
            >
                <Droppable id='canvas'>
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
                    <Flex direction={'column'} alignItems={'center'} gap={5} h={'100%'} w={'100%'}>
                        <Box border={'1px solid gray'}>Box 1</Box>
                        <Box border={'1px solid gray'} w={10} h={20}>Box 2</Box>
                        <Box border={'1px solid gray'} w={'50%'}>Box 3</Box>
                        {/* test sub container 1 */}
                        <Box border={'1px solid white'} w={'100%'} h={'100px'}>
                            <Droppable id='subcontainer1'>
                                test container
                            </Droppable>
                        </Box>
                        {/* test sub container 2 */}
                        <Box border={'1px solid white'} w={'100%'}>
                            <Droppable id='subcontainer2'>
                                <Box border={'1px solid gray'} w={'50%'} h={10}>Box 3</Box>
                                {/* test sub sub container 1 */}
                                <Box border={'1px solid white'} w={'100%'} h={'100px'}>
                                    <Droppable id='subsubcontainer1'>
                                        test deeply nested container
                                    </Droppable>
                                </Box>
                            </Droppable>
                        </Box>
                    </Flex>

                </Droppable>
            </Box>
        </Box>

    </Flex>
};

export default Canvas;