import { MdDarkMode } from "react-icons/md";
import { MdSunny } from "react-icons/md";
import useDesignerStore from "../../stores/designer";
import useAuthStore from "../../stores/auth";
import IconButton from "../common/IconButton";
import SaveButton from "./SaveButton";
import { MdOutlineDesktopWindows } from "react-icons/md";
import { MdPhoneAndroid } from "react-icons/md";
import { IoMdPhoneLandscape } from "react-icons/io";
import { useEffect, useState } from "react";
import PreviewActions from "./PreviewActions";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import logoLight from './../../assets/logo-light.svg';
import logoDark from './../../assets/logo-dark.svg';
import { FaGithub } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
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


// Top Navbar
const Navbar = () => {

  console.log('C - Navbar')

  const colorMode = useDesignerStore((state) => state.colorMode);
  const userEmail = useAuthStore((state) => state.email);

  const updateProperty = useDesignerStore((state) => state.updateProperty);
  const appName = useDesignerStore((state) => state.appName);
  const setSelectedId = useDesignerStore((state) => state.setSelectedId);
  const appId = useDesignerStore((state) => state.appId);
  const [previewUrl, setPreviewUrl] = useState<undefined | string>(undefined);
  const [isBuilding, setIsBuilding] = useState(false);

  useEffect(() => {
    // open connection to server to start receiving events
    // @TODO: manage error if connection not successfull
    const eventSource = new EventSource(`${import.meta.env.VITE_API_URL}/api/web-service/events/${appId}`);

    // attach handler to receive message events
    eventSource.onmessage = (event) => {
      let url: string | undefined;
      try {
        const data: { url?: string, error: string | null } = JSON.parse(event.data);
        if (data.error) {
          throw new Error(data.error);
        }
        url = data.url;
      } catch (error) {
        // if data payload does not have url, reset it
        url = undefined;
        if (error instanceof Error) {
          toast(error.message, { type: 'error', autoClose: 2000, position: 'bottom-right' });
        } else {
          toast('An unexpected error occurred', { type: 'error', autoClose: 2000, position: 'bottom-right' });
        }
      }
      setPreviewUrl(url);
      setIsBuilding(false);
    };

    return () => eventSource.close();

  }, [])

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
        justifyContent: 'start',
        marginRight: '70px'
      }}>
        {/* <img height={54} src={logo} alt="Logo" /> */}
        <Link to={'/'} style={{
          fontFamily: '"Ubuntu", sans-serif',
          fontWeight: '500',
          fontSize: '15pt',
          userSelect: 'none',
          textDecoration: 'none',
          color: 'inherit',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
        }}><img height={20} src={colorMode === 'light' ? logoLight : logoDark} alt="Logo" /><div>Craftify</div></Link>
      </div>
      <div style={{
        // flex: 1,
        // width: '100px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
      }}>
        {/* <div>File</div> */}
        <ToggleColorMode />
        <SaveButton setIsBuilding={setIsBuilding} />
        <PreviewActions isBuilding={isBuilding} url={previewUrl} />
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
            updateProperty('canvas', { 'canvasWidthPx': '1366' });
            updateProperty('canvas', { 'canvasHeightPx': '768' });
            // for simplicity: to clean-up hover/selected effects
            setSelectedId(null);
          }}
        />
        <MdPhoneAndroid
          size={25}
          title="Mobile Device"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            updateProperty('canvas', { 'canvasWidthPx': '360' });
            updateProperty('canvas', { 'canvasHeightPx': '760' });
            // for simplicity: to clean-up hover/selected effects
            setSelectedId(null);
          }}
        />
        <IoMdPhoneLandscape
          size={25}
          title="Mobile Device - Landscape"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            updateProperty('canvas', { 'canvasWidthPx': '760' });
            updateProperty('canvas', { 'canvasHeightPx': '360' });
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
        {appName}
      </div>
      <div style={{
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        gap: '15px',
      }}>
        <div style={{
          // flex: 1,
          // width: '100px',
          display: 'flex',
          fontSize: 'small'
        }}>
          {userEmail}
        </div>
        <div style={{
          // width: '100px',
          display: 'flex',
          alignItems: 'center',
          alignContent: 'center',
          gap: '15px',
        }}>
          {/* <div>Share</div> */}
          <div
            style={{
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={async () => {
              try {
                await axios.get(`${import.meta.env.VITE_API_URL}/logout`, { withCredentials: true }),
                  window.location.href = "/login";
              } catch (err) {
                console.log('Error when logging out')
              }
            }}
          >
            {<FiLogOut size={20} title="Logout" />}
          </div>
          <a
            style={{
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
            }}
            href="https://github.com/franciscocgue/craftify2"
            target="_blank">
            {<FaGithub size={25} title="GitHub repo" />}
          </a>
        </div>
      </div>
      {/* <button>Home</button> */}
    </div>
  );
};

export default Navbar;
