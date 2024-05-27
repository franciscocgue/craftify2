import { Box } from "@chakra-ui/react";
import useDesignerStore from "../../stores/designer";

const SidebarMenu = () => {
    // const { setHoveredId } = useDesignerStore();
    // const { setDraggingId } = useDesignerStore();

    const setHoveredId = useDesignerStore((state) => state.setHoveredId);
    const setDraggingId = useDesignerStore((state) => state.setDraggingId);

    console.log('C - SidebarMenu')

    return <Box w={'50px'} border={'1px solid grey'}>
        <button
        onClick={()=>{setHoveredId(crypto.randomUUID())}}
        >
            SHI-
        </button>
        {/* <button
        onClick={()=>{setDraggingId(crypto.randomUUID())}}
        >
            SDI-
        </button>
        <button
        onClick={()=>{setIsResizing(true)}}
        >
            SIIT-
        </button>
        <button
        onClick={()=>{setIsResizing(false)}}
        >
            SIIF
        </button> */}
    </Box>
}

export default SidebarMenu;