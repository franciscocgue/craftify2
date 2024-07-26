import { MdDarkMode } from "react-icons/md";
import { MdSunny } from "react-icons/md";
import useDesignerStore from "../../stores/designer";
import IconButton from "../../helpers/components/IconButton";
import PreviewButton from "./PreviewButton";
import { MdOutlineDesktopWindows } from "react-icons/md";
import { MdPhoneAndroid } from "react-icons/md";
import { IoMdPhoneLandscape } from "react-icons/io";
// import logo from './../../assets/craftify_logo_01.png';

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

  const updateProperty = useDesignerStore((state) => state.updateProperty);
  const setSelectedId = useDesignerStore((state) => state.setSelectedId);

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
        margin: 'auto 30px',
        display: 'flex',
        alignItems: 'center',
        gap: '0px',
      }}>
        <MdOutlineDesktopWindows
          size={25}
          title="Desktop"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            updateProperty('canvas', 'canvasWidthPx', '1366');
            updateProperty('canvas', 'canvasHeightPx', '768');
            // for simplicity: to clean-up hover/selected effects
            setSelectedId(null);
          }}
        />
        <MdPhoneAndroid
          size={25}
          title="Mobile Device"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            updateProperty('canvas', 'canvasWidthPx', '360');
            updateProperty('canvas', 'canvasHeightPx', '760');
            // for simplicity: to clean-up hover/selected effects
            setSelectedId(null);
          }}
        />
        <IoMdPhoneLandscape
          size={25}
          title="Mobile Device - Landscape"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            updateProperty('canvas', 'canvasWidthPx', '760');
            updateProperty('canvas', 'canvasHeightPx', '360');
            // for simplicity: to clean-up hover/selected effects
            setSelectedId(null);
          }}
        />
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
