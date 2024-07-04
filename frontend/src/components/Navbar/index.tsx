import { MdDarkMode } from "react-icons/md";
import { MdSunny } from "react-icons/md";
import useDesignerStore from "../../stores/designer";
import IconButton from "../../helpers/components/IconButton";

const ToggleColorMode = () => {
  const toggleColorMode = useDesignerStore((state) => state.toggleColorMode);
  const colorMode = useDesignerStore((state) => state.colorMode);

  return (
    <IconButton
      icon={colorMode === 'light' ? <MdDarkMode/> : <MdSunny/>}
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
        padding: '16px',
        display: 'flex',
      }}
    >
      <button>Home</button>
      <ToggleColorMode />
      <button>About</button>
    </div>
  );
};

export default Navbar;
