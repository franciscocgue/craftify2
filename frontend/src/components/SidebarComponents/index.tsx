import { Box, Flex } from "@chakra-ui/react";
import Draggable from "../../helpers/Draggable";
import Component from "./Component";
import { compTypes } from '../../config/components';
import { Resizable } from "re-resizable";

const SidebarComponents = () => {


    return <Flex direction={'column'} w={'250px'} h={'100%'} maxH={'100%'} >
        <Flex
            w={'100%'}
            p={1}
            border={'1px solid grey'}
            maxH={'100%'}
            overflowY={'auto'}
            gap={1}
            justify={'flex-start'}
            alignContent={'start'}
            wrap={'wrap'}
            flexGrow={1}
        >
            {Object.keys(compTypes).map(c => <Draggable componentType={c} key={c} id={c}>
                <Component name={compTypes[c as keyof typeof compTypes].name} icon={compTypes[c as keyof typeof compTypes].icon} />
            </Draggable>)}
        </Flex>
        <Resizable
            defaultSize={{
                width: '100%',
                height: '40%',
            }}
            handleComponent={{
                top: <Box h={'100%'} w={'100%'} _hover={{ 'backgroundColor': 'darkgrey' }}></Box>
            }}
            maxWidth={'100%'}
            maxHeight={'100%'}
            enable={{ top: true, right: false, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
        >
            <Box
                h={'100%'}
                overflow={'auto'}
                p={1}
                border={'1px solid grey'}
            >
                Component Tree
            </Box>
        </Resizable>
    </Flex>
}

export default SidebarComponents;