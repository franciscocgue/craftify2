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

    // const { components, setHoveredId } = useDesignerStore();

    const components = useDesignerStore((state) => state.components);
    const setHoveredId = useDesignerStore((state) => state.setHoveredId);

    const comps = useMemo(
        () => renderNode(components, 'canvas'),
        [components]
      );
    // const { components, draggingId, isResizing, setIsResizing, setHoveredId, hoveredId } = useDesignerStore();

    return <Flex
        flex={1}
        border={'1px solid grey'}
        p={'30px'}
        alignItems={'center'}
        justifyContent={'center'}
        maxH='100vh'
        maxW='100vw'
        overflow={'auto'}
    >

        <Box maxW={'100%'} maxH={'100%'} overflow={'auto'}>
            <Box
                style={{ padding: canvasDropBorderPx, margin: '0px 15px' }}
                w={screenSizes[device][0] + canvasDropBorderPx * 2}
                h={screenSizes[device][1] + canvasDropBorderPx * 2}
                maxH={screenSizes[device][1]}
                bg='gray.200'
                overflowY={'auto'}
            >
                {comps}
            </Box>
        </Box >

    </Flex >
};

export default Canvas;