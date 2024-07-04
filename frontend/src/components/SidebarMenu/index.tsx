import { BiSolidData } from "react-icons/bi";
import { IoMdColorPalette } from "react-icons/io";
import { LuFunctionSquare } from "react-icons/lu";
import { MdDraw } from "react-icons/md";
import useDesignerStore from "../../stores/designer";
import IconButton from "../../helpers/components/IconButton";

const SidebarMenu = () => {

    console.log('C - SidebarMenu')

    const activeMenu = useDesignerStore((state) => state.activeMenu);
    const setActiveMenu = useDesignerStore((state) => state.setActiveMenu);
    const colorMode = useDesignerStore((state) => state.colorMode);
    // const { colorMode } = useColorMode();

    return <div
        style={{ width: '50px', border: '1px solid grey' }}
    >
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <IconButton
                onClick={() => setActiveMenu('designer')}
                icon={<MdDraw size={'23px'} />}
                baseStylesOverwrite={{
                    color: colorMode === 'dark' ? 'white' : '#222',
                    width: '100%',
                    borderRadius: 0,
                    backgroundColor: activeMenu === 'designer' ?
                        // active
                        colorMode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
                        // not active
                        : 'transparent',
                }}
                // if active, hover has no effect
                hoverStylesOverwrite={activeMenu === 'designer' ? {backgroundColor: colorMode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'} : {
                    backgroundColor: colorMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                }}
                title="Designer"
            />
            <IconButton
                onClick={() => setActiveMenu('variables')}
                icon={<LuFunctionSquare size={'23px'} />}
                baseStylesOverwrite={{
                    color: colorMode === 'dark' ? 'white' : '#222',
                    width: '100%',
                    borderRadius: 0,
                    backgroundColor: activeMenu === 'variables' ?
                        // active
                        colorMode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
                        // not active
                        : 'transparent',
                }}
                // if active, hover has no effect
                hoverStylesOverwrite={activeMenu === 'variables' ? {backgroundColor: colorMode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'} : {
                    backgroundColor: colorMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                }}
                title="Variables"
            />
            <IconButton
                onClick={() => setActiveMenu('data')}
                icon={<BiSolidData size={'23px'} />}
                baseStylesOverwrite={{
                    color: colorMode === 'dark' ? 'white' : '#222',
                    width: '100%',
                    borderRadius: 0,
                    backgroundColor: activeMenu === 'data' ?
                        // active
                        colorMode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
                        // not active
                        : 'transparent',
                }}
                // if active, hover has no effect
                hoverStylesOverwrite={activeMenu === 'data' ? {backgroundColor: colorMode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'} : {
                    backgroundColor: colorMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                }}
                title="Data"
            />
            <IconButton
                onClick={() => setActiveMenu('styles')}
                icon={<IoMdColorPalette size={'23px'} />}
                baseStylesOverwrite={{
                    color: colorMode === 'dark' ? 'white' : '#222',
                    width: '100%',
                    borderRadius: 0,
                    backgroundColor: activeMenu === 'styles' ?
                        // active
                        colorMode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
                        // not active
                        : 'transparent',
                }}
                // if active, hover has no effect
                hoverStylesOverwrite={activeMenu === 'styles' ? {backgroundColor: colorMode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'} : {
                    backgroundColor: colorMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                }}
                title="Styles"
            />
        </div>
    </div>
}

export default SidebarMenu;