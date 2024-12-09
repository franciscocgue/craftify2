import { BiSolidData } from "react-icons/bi";
import { IoMdColorPalette } from "react-icons/io";
import { LuSquareFunction } from "react-icons/lu";
import { MdDraw } from "react-icons/md";
import useDesignerStore from "../../stores/designer";
import IconButton from "../common/IconButton";

const SidebarMenu = () => {

    console.log('C - SidebarMenu')

    const page = useDesignerStore((state) => state.page);
    const setPage = useDesignerStore((state) => state.setPage);
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
                onClick={() => setPage('designer')}
                icon={<MdDraw size={'23px'} />}
                baseStylesOverwrite={{
                    color: colorMode === 'dark' ? 'white' : '#222',
                    width: '100%',
                    borderRadius: 0,
                    backgroundColor: page === 'designer' ?
                        // active
                        colorMode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
                        // not active
                        : 'transparent',
                }}
                // if active, hover has no effect
                hoverStylesOverwrite={page === 'designer' ? { backgroundColor: colorMode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' } : {
                    backgroundColor: colorMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                }}
                title="Designer"
            />
            <IconButton
                onClick={() => setPage('variables')}
                icon={<LuSquareFunction size={'23px'} />}
                baseStylesOverwrite={{
                    color: colorMode === 'dark' ? 'white' : '#222',
                    width: '100%',
                    borderRadius: 0,
                    backgroundColor: page === 'variables' ?
                        // active
                        colorMode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
                        // not active
                        : 'transparent',
                }}
                // if active, hover has no effect
                hoverStylesOverwrite={page === 'variables' ? { backgroundColor: colorMode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' } : {
                    backgroundColor: colorMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                }}
                title="Variables"
            />
            <IconButton
                onClick={() => setPage('data')}
                icon={<BiSolidData size={'23px'} />}
                baseStylesOverwrite={{
                    color: colorMode === 'dark' ? 'white' : '#222',
                    width: '100%',
                    borderRadius: 0,
                    backgroundColor: page === 'data' ?
                        // active
                        colorMode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
                        // not active
                        : 'transparent',
                }}
                // if active, hover has no effect
                hoverStylesOverwrite={page === 'data' ? { backgroundColor: colorMode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' } : {
                    backgroundColor: colorMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                }}
                title="Data"
            />
            <IconButton
                onClick={() => setPage('styles')}
                icon={<IoMdColorPalette size={'23px'} />}
                baseStylesOverwrite={{
                    color: colorMode === 'dark' ? 'white' : '#222',
                    width: '100%',
                    borderRadius: 0,
                    backgroundColor: page === 'styles' ?
                        // active
                        colorMode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
                        // not active
                        : 'transparent',
                }}
                // if active, hover has no effect
                hoverStylesOverwrite={page === 'styles' ? { backgroundColor: colorMode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' } : {
                    backgroundColor: colorMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                }}
                title="Styles"
            />
        </div>
    </div>
}

export default SidebarMenu;