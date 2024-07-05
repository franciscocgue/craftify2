import { MdDarkMode } from "react-icons/md";
import { MdSunny } from "react-icons/md";
import useDesignerStore from "../../stores/designer";
import IconButton from "../../helpers/components/IconButton";
import axios from "axios";

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


const handleButtonClick = async (components) => {
  try {
    console.log(components)
    // const d = new Date();
    // let time = d.getTime();
    const response = await axios.post('http://localhost:3000/start-new-server', {
      port: 4000,
      data: components
    });
    var win = window.open('http://localhost:4000/', '_blank');
    win.focus();
    // alert(response.data);
  } catch (error) {
    console.error('There was an error starting the new server:', error);
  }
};

// Top Navbar
const Navbar = () => {

  console.log('C - Navbar')

  const components = useDesignerStore((state) => state.components);

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
      <button onClick={() => handleButtonClick(components)}>Open Preview</button>
      <button>About</button>
    </div>
  );
};

export default Navbar;
