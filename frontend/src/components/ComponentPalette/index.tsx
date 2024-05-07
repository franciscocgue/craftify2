import { Flex } from "@chakra-ui/layout";
import Component from "./Component";

const components = [1,2,3,4,5,6,7,8,9,10, 1,2,3,4,5,6,7,8,9,10, 1,2,3,4,5,6,7,8,9,10, 1,2,3,4,5,6,7,8,9,10, 1,2,3,4,5,6,7,8,9,10, 1,2,3,4,5,6,7,8,9,10]

const ComponentPalette = () => {
    return <Flex border={'1px solid red'} w={250} direction={'column'} overflowY={'scroll'} maxH={'100%'}>
        Components
        {components.map(_ => <Component/>)}
    </Flex>
}

export default ComponentPalette;