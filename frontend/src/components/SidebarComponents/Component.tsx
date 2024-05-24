import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { CSSProperties } from "react";
import { IconType } from "react-icons";

type propsT = {
    name: string,
    icon: IconType,
    style?: CSSProperties,
}

const Component = ({name, icon, style}: propsT) => {
    return <Flex
        direction={'column'}
        alignItems={'center'}
        border={'1px solid gray'}
        w={'75px'}
        h={'65px'}
        borderRadius={5}
        justify={'center'}
        bg={'white'}
        style={{...style}}
        cursor={'grab'}
    >
        <Icon as={icon} w={5} h={5} color="black.900" />
        <Box>
            <Text p={'2px'} align={'center'} fontSize='xs' userSelect={'none'}>{name}</Text>
        </Box>
    </Flex>
}

export default Component;