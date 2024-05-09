import { Box, Container } from "@chakra-ui/react";
import Draggable from "../../helpers/Draggable";

const SidebarComponents = () => {
    return <Container w={'250px'} border={'1px solid red'} maxH={'100%'} overflowY={'auto'}>
        <Box><Draggable id={'row container'}><Box border={'1px solid grey'} p={3}>Row Container</Box></Draggable></Box>
        <Box><Draggable id={'column container'}><Box border={'1px solid grey'} p={3}>Column Container</Box></Draggable></Box>
        <Box><Draggable id={'button'}><Box border={'1px solid grey'} p={3}>Button</Box></Draggable></Box>
        <Box><Draggable id={'1'}><Box p={10}>Comp 1</Box></Draggable></Box>
        <Box><Draggable id={'2'}><Box p={10}>Comp 2</Box></Draggable></Box>
        <Box><Draggable id={'3'}><Box p={10}>Comp 3</Box></Draggable></Box>
        <Box><Draggable id={'4'}><Box p={10}>Comp 4</Box></Draggable></Box>
        <Box><Draggable id={'5'}><Box p={10}>Comp 5</Box></Draggable></Box>
        <Box><Draggable id={'6'}><Box p={10}>Comp 6</Box></Draggable></Box>
    </Container>
}

export default SidebarComponents;