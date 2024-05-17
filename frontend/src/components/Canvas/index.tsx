import { Box, Button, Center, Flex } from "@chakra-ui/react";
import useDesignerStore from "../../stores/designer";
import ComponentWrapper from "../../helpers/ComponentWrapper";
import ContainerWrapper from "../../helpers/ContainerWrapper";

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
                {/* Main container */}
                <ContainerWrapper id="canvas" componentType="container-column" parentType='container-column' w={'100%'} h={'100%'} p={1}>

                    <Flex direction={'column'} alignItems={'center'} gap={2} h={'100%'} w={'100%'}>
                        <ComponentWrapper id="comp1" componentType="" parentType='container-column' w={'100%'} h={'50px'}>
                            <Button w={'100%'} h={'100%'} colorScheme='teal' size='md'>
                                Button
                            </Button>
                        </ComponentWrapper>

                        <ComponentWrapper id="comp2" componentType="" parentType='container-column' p={1} border="1px solid grey">
                            Box 3
                        </ComponentWrapper>

                        <ContainerWrapper id="container" componentType="container-column" parentType='container-column' w={'100%'} h={'max-content'} p={1} border="none">
                            <Flex direction={'column'} alignItems={'center'} gap={2} h={'100%'} w={'100%'}>

                                <ComponentWrapper id="box-1" componentType="button" parentType='container-column' w={'60%'} p={1} border="0px solid red">
                                    <Center>Box A</Center>
                                </ComponentWrapper>

                                <ComponentWrapper id="box-b" componentType="some component" parentType='container-column' w={'60%'} p={1} border="0px solid red">
                                    <Center>Box B</Center>
                                </ComponentWrapper>

                                <ContainerWrapper id="subcontainer" componentType="container-row" parentType='container-column' w={'100%'} h={'max-content'} p={1} border="none">
                                    <Flex direction={'row'} alignItems={'center'} gap={2} h={'100%'} w={'100%'}>

                                        <ComponentWrapper id="box-12" componentType="button" parentType='container-row' w={'20%'} p={1} border="0px solid red">
                                            <Center>Box sub A</Center>
                                        </ComponentWrapper>

                                        <ComponentWrapper id="box-13" componentType="some component" parentType='container-row' w={'20%'} p={1} border="0px solid red">
                                            <Center>Box sub B</Center>
                                        </ComponentWrapper>

                                        <ComponentWrapper id="box-14" componentType="test" parentType='container-row' w={'30%'} p={1} border="0px solid red">
                                            <Center>Box sub C</Center>
                                        </ComponentWrapper>
                                    </Flex>
                                </ContainerWrapper>
                            </Flex>
                        </ContainerWrapper>
                        <ContainerWrapper id="container_" componentType="container-column" parentType='container-column' w={'100%'} h={'max-content'} p={1} border="none">
                            <Flex direction={'column'} alignItems={'center'} gap={2} h={'100%'} w={'100%'}>

                                <ComponentWrapper id="box-1_" componentType="button" parentType='container-column' w={'60%'} p={1} border="0px solid red">
                                    <Center>Box A</Center>
                                </ComponentWrapper>

                                <ComponentWrapper id="box-b_" componentType="some component" parentType='container-column' w={'60%'} p={1} border="0px solid red">
                                    <Center>Box B</Center>
                                </ComponentWrapper>

                                <ContainerWrapper id="subcontainer_" componentType="container-row" parentType='container-column' w={'100%'} h={'max-content'} p={1} border="none">
                                    <Flex direction={'row'} alignItems={'center'} gap={2} h={'100%'} w={'100%'}>

                                        <ComponentWrapper id="box-12_" componentType="button" parentType='container-row' w={'20%'} h={'35px'}>
                                            <Button w={'100%'} h={'100%'} colorScheme="blue" size='md'>
                                                Button
                                            </Button>
                                        </ComponentWrapper>

                                        <ComponentWrapper id="box-13_" componentType="some component" parentType='container-row' w={'20%'} p={1} border="0px solid red">
                                            <Center>Box sub B</Center>
                                        </ComponentWrapper>

                                        <ComponentWrapper id="box-14_" componentType="test" parentType='container-row' w={'30%'} p={1} border="0px solid red">
                                            <Center>Box sub C</Center>
                                        </ComponentWrapper>
                                    </Flex>
                                </ContainerWrapper>
                            </Flex>
                        </ContainerWrapper>

                        {/* test sub container 2 */}

                    </Flex>

                    {/* </Droppable> */}
                </ContainerWrapper>
            </Box>
        </Box >

    </Flex >
};

export default Canvas;