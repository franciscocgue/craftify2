import { MdDarkMode } from "react-icons/md";
import { MdSunny } from "react-icons/md";
import useDesignerStore from "../../stores/designer";
import IconButton from "../../helpers/components/IconButton";
import PreviewButton from "./PreviewButton";
import logo from './../../assets/craftify_logo_01.png';

const ToggleColorMode = () => {
  const toggleColorMode = useDesignerStore((state) => state.toggleColorMode);
  const colorMode = useDesignerStore((state) => state.colorMode);

  return (
    <IconButton
      icon={colorMode === 'light' ? <MdDarkMode /> : <MdSunny />}
      onClick={toggleColorMode}
      baseStylesOverwrite={{
        // backgroundColor: colorMode === 'light' ? 'darkgrey' : 'darkgrey',
        color: 'white'
      }}
    >
    </IconButton>
  );
};


// Top Navbar
const Navbar = () => {

  console.log('C - Navbar')


  return (
    <div
      style={{
        justifyContent: 'space-between',
        // padding: '16px',
        paddingLeft: '16px',
        paddingRight: '16px',
        display: 'flex',
        height: '72px', // reason: needed in other places
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <div style={{
        // flex: 1,
        width: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start'
      }}>
        {/* <img height={54} src={logo} alt="Logo" /> */}
        <div style={{
          fontFamily: '"Ubuntu", sans-serif',
          fontWeight: '500',
          fontSize: '15pt',
          userSelect: 'none',
        }}>Craftify</div>
      </div>
      <div style={{
        // flex: 1,
        // width: '100px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
      }}>
        <div>File</div>
        <ToggleColorMode />
        <PreviewButton />
      </div>
      <div style={{
        // flex: 1,
        // width: '100px',
        display: 'flex',
        justifyContent: 'center',
        flex: 1,
        fontFamily: '"Ubuntu", sans-serif',
        fontStyle: 'italic',
      }}>
        My Awesome Craftify Project
      </div>
      <div style={{
        // flex: 1,
        // width: '100px',
        display: 'flex',
      }}>
        My User Name
      </div>
      <div style={{
        // width: '100px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <div>Share</div>
        <div>GitHub</div>
      </div>
      {/* <button>Home</button> */}
    </div>
  );
};

export default Navbar;
