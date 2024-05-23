import { Flex } from "@chakra-ui/react";
import Draggable from "../../helpers/Draggable";
import Component from "./Component";
import { compTypes } from '../../config/components';

const SidebarComponents = () => {

    return <Flex
        w={'250px'}
        p={1}
        border={'1px solid red'}
        maxH={'100%'}
        overflowY={'auto'}
        gap={1}
        justify={'flex-start'}
        alignContent={'start'}
        wrap={'wrap'}
    >
        {Object.keys(compTypes).map(c => <Draggable componentType={c} key={c} id={c}>
            <Component name={compTypes[c as keyof typeof compTypes].name} icon={compTypes[c as keyof typeof compTypes].icon} />
        </Draggable>)}
    </Flex>
}

export default SidebarComponents;