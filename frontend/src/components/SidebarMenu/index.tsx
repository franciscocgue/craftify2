import { Box, Flex, IconButton, useColorMode } from "@chakra-ui/react";
import { BiSolidData } from "react-icons/bi";
import { IoMdColorPalette } from "react-icons/io";
import { LuFunctionSquare } from "react-icons/lu";
import { MdDraw } from "react-icons/md";
import useDesignerStore from "../../stores/designer";

const SidebarMenu = () => {

    console.log('C - SidebarMenu')

    const activeMenu = useDesignerStore((state) => state.activeMenu);
    const setActiveMenu = useDesignerStore((state) => state.setActiveMenu);

    const { colorMode } = useColorMode();

    return <Box w={'50px'} border={'1px solid grey'}>
        <Flex direction={'column'} gap={'0px'}>
            <IconButton
                variant='outline'
                // colorScheme='teal'
                aria-label='Designer'
                fontSize='25px'
                h={'50px'}
                icon={<MdDraw />}
                border={'none'}
                borderRadius={0}
                title="Designer"
                isActive={activeMenu === 'designer'}
                onClick={() => setActiveMenu('designer')}
                _active={{
                    // backgroundColor: colorMode === 'dark' ? 'grey' : '#555',
                    // color: colorMode === 'dark' ? 'black' : 'white'
                    backgroundColor: colorMode === 'dark' ? '#444' : 'lightgrey',
                    // color:  colorMode === 'dark' ? 'red' : 'lightgrey',
                }}
            />
            <IconButton
                variant='outline'
                // colorScheme='teal'
                aria-label='Variables'
                fontSize='25px'
                h={'50px'}
                icon={<LuFunctionSquare />}
                border={'none'}
                borderRadius={0}
                title="Variables"
                isActive={activeMenu === 'variables'}
                onClick={() => setActiveMenu('variables')}
                _active={{
                    backgroundColor: colorMode === 'dark' ? '#444' : 'lightgrey',
                    // color:  colorMode === 'dark' ? 'red' : 'lightgrey',
                }}
            />
            <IconButton
                variant='outline'
                // colorScheme='teal'
                aria-label='Data'
                fontSize='25px'
                h={'50px'}
                icon={<BiSolidData />}
                border={'none'}
                borderRadius={0}
                title="Data"
                isActive={activeMenu === 'data'}
                onClick={() => setActiveMenu('data')}
                _active={{
                    backgroundColor: colorMode === 'dark' ? '#444' : 'lightgrey',
                    // color:  colorMode === 'dark' ? 'red' : 'lightgrey',
                }}
            />
            <IconButton
                variant='outline'
                // colorScheme='blue'
                aria-label='Styles'
                fontSize='25px'
                h={'50px'}
                icon={<IoMdColorPalette />}
                border={'none'}
                borderRadius={0}
                title="Styles"
                isActive={activeMenu === 'styles'}
                onClick={() => setActiveMenu('styles')}
                _active={{
                    backgroundColor: colorMode === 'dark' ? '#444' : 'lightgrey',
                    // color:  colorMode === 'dark' ? 'red' : 'lightgrey',
                }}
            />
        </Flex>
    </Box>
}

export default SidebarMenu;