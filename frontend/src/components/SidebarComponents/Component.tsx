import { Box, Flex, Icon, Text, useColorMode } from "@chakra-ui/react";
import { CSSProperties } from "react";
import { IconType } from "react-icons";
import useDesignerStore from "../../stores/designer";
import { compTypes } from "../../config/components";

type propsT = {
    type?: keyof typeof compTypes,
    name: string,
    icon: IconType,
    style?: CSSProperties,
}

const Component = ({ type, name, icon, style }: propsT) => {

    console.log('C - sidebar.Component: ' + name)

    const addComponent = useDesignerStore((state) => state.addComponent);
    const { colorMode } = useColorMode();

    return <Flex
        direction={'column'}
        alignItems={'center'}
        border={'1px solid gray'}
        w={'75px'}
        h={'65px'}
        borderRadius={5}
        justify={'center'}
        style={{ ...style }}
        bg={colorMode === 'dark' ? 'blackAlpha.400' : 'whiteAlpha.800'}
        onClick={type ? () => addComponent(type, 'canvas', 'inside') : undefined}
    >
        <Icon as={icon} w={5} h={5} />
        <Box>
            <Text p={'2px'} align={'center'} fontSize='xs' userSelect={'none'}>{name}</Text>
        </Box>
    </Flex>
}

export default Component;