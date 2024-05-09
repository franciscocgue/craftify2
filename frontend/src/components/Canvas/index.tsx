import { Box, Flex } from "@chakra-ui/react";

const screenSizes = {
    "Galaxy S10": [360, 760]
}

const device = "Galaxy S10";

const Canvas = () => {
    return <Flex flex={1} border={'1px solid red'} alignItems={'center'} justifyContent={'center'} overflow={'auto'} maxH='100vh' maxW='100vw'>

        <Box style={{ margin: '0 20px' }} border={'1px solid blue'} maxW={'100%'} maxH={'100%'} overflow={'auto'}>
            <Box w={screenSizes[device][0]} h={screenSizes[device][1]} maxH={screenSizes[device][1]} bg='tomato' border={'1px solid blue'} overflowY={'auto'}>
                Canvas
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
                </Box>
            </Box>
        </Box>

    </Flex>
};

export default Canvas;