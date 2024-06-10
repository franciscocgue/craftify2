import { Box, Flex } from "@chakra-ui/react";
import useDesignerStore from "../../stores/designer";
import { renderNode } from "../../helpers/ui-builder";
import { useMemo } from "react";

const screenSizes = {
    'Galaxy S10': [360, 760],
    'Laptop': [1280, 800]
}

const device = "Galaxy S10";

const canvasDropBorderPx = 2;

const Canvas = () => {

    console.log('C - Canvas')

    const components = useDesignerStore((state) => state.components);
    const setSelectedId = useDesignerStore((state) => state.setSelectedId);

    const comps = useMemo(
        () => renderNode(components, 'canvas'),
        [components]
    );

    return <Flex
        flex={1}
        border={'1px solid grey'}
        p={'30px'}
        alignItems={'center'}
        justifyContent={'center'}
        maxH='100vh'
        maxW='100vw'
        overflow={'auto'}
        onClick={() => {
            setSelectedId(null)
        }}
    >

        <Box
            maxW={'100%'}
            maxH={'100%'}
            overflow={'auto'}
            onClick={(e) => {
                // prevent child clicks from reaching parent
                e.stopPropagation();
            }}
        >
            <Box
                style={{ padding: canvasDropBorderPx, margin: '0px 15px' }}
                w={screenSizes[device][0] + canvasDropBorderPx * 2}
                h={screenSizes[device][1] + canvasDropBorderPx * 2}
                maxH={screenSizes[device][1]}
                // bg='blackAlpha.100'
                overflowY={'auto'}
            >
                {comps}
            </Box>
        </Box >

    </Flex >
};

export default Canvas;