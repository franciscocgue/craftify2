import { Box } from "@chakra-ui/react";
import useDesignerStore from "../../stores/designer";

const SidebarMenu = () => {
    // const { setHoveredId } = useDesignerStore();
    // const { setDraggingId } = useDesignerStore();

    const setHoveredId = useDesignerStore((state) => state.setHoveredId);

    console.log('C - SidebarMenu')

    return <Box w={'50px'} border={'1px solid grey'}>
        L0
    </Box>
}

export default SidebarMenu;