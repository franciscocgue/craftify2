import { Box } from "@chakra-ui/react";
import { memo } from "react";
import useDesignerStore from "../../stores/designer";

const SidebarProperties = memo(() => {

    console.log('C - SidebarProperties')

    const selectedId = useDesignerStore((state) => state.selectedId);
    
    return <Box w={'300px'} border={'1px solid grey'}>{selectedId}</Box>
})

export default SidebarProperties;