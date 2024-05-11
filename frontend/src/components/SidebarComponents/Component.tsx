import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { CSSProperties } from "react";
import { IconType } from "react-icons";

type propsT = {
    name: string,
    icon: IconType,
    style: CSSProperties,
}

const Component = ({name, icon, style}: propsT) => {
    return <Flex
        direction={'column'}
        alignItems={'center'}
        border={'1px solid gray'}
        w={'75px'}
        h={'75px'}
        borderRadius={5}
        justify={'center'}
        bg={'white'}
        style={{...style}}
    >
        <Icon as={icon} w={7} h={7} color="black.800" />
        <Box>
            <Text align={'center'} fontSize='sm' userSelect={'none'}>{name}</Text>
        </Box>
    </Flex>
}

export default Component;