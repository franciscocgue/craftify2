import { Box, Container, Flex } from "@chakra-ui/react";
import Draggable from "../../helpers/Draggable";
import Component from "./Component";
import { CiGrid2V } from "react-icons/ci";
import { CiGrid2H } from "react-icons/ci";
import { RxButton } from "react-icons/rx";
import { BiText } from "react-icons/bi";

import { compTypes } from '../../helpers/components';

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



        {Object.keys(compTypes).map(c => <Draggable id={c}>
            <Component name={compTypes[c].name} icon={compTypes[c].icon} />
        </Draggable>)}

        {/* <Box><Draggable id={'row container'}><Box border={'1px solid grey'} p={3}>Row Container</Box></Draggable></Box>
        <Box><Draggable id={'column container'}><Box border={'1px solid grey'} p={3}>Column Container</Box></Draggable></Box>
        <Box><Draggable id={'1'}><Box p={10}>Comp 1</Box></Draggable></Box>
        <Box><Draggable id={'2'}><Box p={10}>Comp 2</Box></Draggable></Box>
        <Box><Draggable id={'3'}><Box p={10}>Comp 3</Box></Draggable></Box>
        <Box><Draggable id={'4'}><Box p={10}>Comp 4</Box></Draggable></Box>
        <Box><Draggable id={'5'}><Box p={10}>Comp 5</Box></Draggable></Box>
        <Box><Draggable id={'6'}><Box p={10}>Comp 6</Box></Draggable></Box> */}
    </Flex>
}

export default SidebarComponents;