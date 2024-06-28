import { Box, Flex } from "@chakra-ui/react";
import DraggableCompPalette from "../../helpers/DraggableCompPalette";
import Component from "./Component";
import { compTypes } from '../../config/components';
import { Resizable } from "re-resizable";
import ComponentTree from "./ComponentTree";
import { useMemo } from "react";


const SidebarComponents = () => {

    console.log('C - SidebarComponents')

    const compsInPalette = useMemo(
        () => (
            <Flex
                w={'100%'}
                p={1}
                borderTop={'1px solid grey'}
                borderBottom={'1px solid grey'}
                maxH={'100%'}
                overflowY={'auto'}
                gap={1}
                justify={'flex-start'}
                alignContent={'start'}
                wrap={'wrap'}
                flexGrow={1}
            >
                {Object.keys(compTypes).map(c => <DraggableCompPalette componentType={c} key={c} id={c}>
                    <Component name={compTypes[c as keyof typeof compTypes].name} icon={compTypes[c as keyof typeof compTypes].icon} />
                </DraggableCompPalette>)}
            </Flex>
        ),
        [compTypes]
    );

    return <Flex direction={'column'} w={'250px'} h={'100%'} maxH={'100%'} >
        {compsInPalette}
        <Resizable
            defaultSize={{
                width: '100%',
                height: '50%',
            }}
            handleComponent={{
                top: <Box h={'100%'} w={'100%'} _hover={{ 'backgroundColor': 'darkgrey' }}></Box>
            }}
            maxWidth={'100%'}
            maxHeight={'100%'}
            enable={{ top: true, right: false, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
        >
            <ComponentTree />
        </Resizable>
    </Flex>
}

export default SidebarComponents;