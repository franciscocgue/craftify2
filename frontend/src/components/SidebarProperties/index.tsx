import { Box } from "@chakra-ui/react";
import { memo } from "react";

const SidebarProperties = memo(() => {
    console.log('C - SidebarProperties')
    return <Box w={'300px'} border={'1px solid red'}>L1</Box>
})

export default SidebarProperties;