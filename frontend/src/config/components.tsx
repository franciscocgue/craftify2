import { CiGrid2V, CiGrid2H } from "react-icons/ci";
import { RxButton } from "react-icons/rx";
import { BiText } from "react-icons/bi";
import { FaHeading } from "react-icons/fa6";
import { IoMdCheckboxOutline } from "react-icons/io";
import { IoImageOutline } from "react-icons/io5";
import { IoMdLink } from "react-icons/io";
import { CgPlayButtonR } from "react-icons/cg";
import { Properties } from "../vite-env";

const compTypes = {
    'row': {
        icon: CiGrid2V,
        name: 'Row',
    },
    'column': {
        icon: CiGrid2H,
        name: 'Column',
    },
    'button': {
        icon: RxButton,
        name: 'Button',
    },
    'text': {
        icon: BiText,
        name: 'Text',
    },
    'header': {
        icon: FaHeading,
        name: 'Header',
    },
    'checkbox': {
        icon: IoMdCheckboxOutline,
        name: 'Checkbox',
    },
    'image': {
        icon: IoImageOutline,
        name: 'Image',
    },
    'link': {
        icon: IoMdLink,
        name: 'Link',
    },
    'icon-button': {
        icon: CgPlayButtonR,
        name: 'Icon Button',
    },
} as const;

// const compProperties_ = {
//     'canvas': {
//         p: 1, // padding
//         bg: undefined,
//     },
//     'container-column': {
//         w: '100%',
//         h: 'auto',
//         p: 1,
//         m: 0,
//         marginTop: 0,
//         marginRight: 0,
//         marginBottom: 0,
//         marginLeft: 0,
//         border: '1px solid grey',
//         wrap: 'nowrap',
//         alignItems: 'center',
//         gap: 2,
//         bg: undefined,
//     },
//     'button': {
//         w: '100%',
//         h: '40px',
//         // padding removed; see comment in button component
//         // p: undefined,
//         m: undefined,
//         border: '0px solid cyan',
//         marginTop: 0,
//         marginRight: 0,
//         marginBottom: 0,
//         marginLeft: 0,
//     }
// }


type ComponentProperties = {
    [K in keyof typeof compTypes | 'canvas']?: {
        interfaceProps: any, // used by the interface to collect user input and translate into properties
        values: Properties, // actual (raw) properties used when rendering
    };
};


const compProperties: ComponentProperties = {
    'canvas': {
        interfaceProps: {},
        values: {
            canvasWidthPx: 360,
            canvasHeightPx: 760,
            // minHeight: '760',
            display: 'flex', // not editable
            flexDirection: 'column', // not editable
            flexWrap: 'wrap',
            gap: '5px',
            paddingTop: '8px',
            paddingBottom: '8px',
            paddingLeft: '8px',
            paddingRight: '8px',
            backgroundColor: 'white',
            backgroundImage: undefined,
            backgroundSize: undefined,
        }
    },
    'column': {
        interfaceProps: {},
        values: {
            display: 'flex', // not editable
            flexDirection: 'column', // not editable
            // wrapperStyles (resizer)
            width: '100%',
            maxWidth: undefined,
            minWidth: 'auto',
            height: 'auto',
            maxHeight: undefined,
            minHeight: 'auto',
            marginTop: '0px',
            marginBottom: '0px',
            marginLeft: '0px',
            marginRight: '0px',
            // CContainerColumn styles
            paddingTop: '6px',
            paddingBottom: '6px',
            paddingLeft: '0px',
            paddingRight: '0px',
            gap: '5px',
            flexWrap: 'nowrap',
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: undefined,
            overflow: 'visible',
        }
    },
    'button': {
        interfaceProps: {},
        values: {// wrapperStyles
            width: '100%',
            maxWidth: undefined,
            minWidth: 'auto',
            height: '40px',
            maxHeight: undefined,
            minHeight: '40px',
            marginTop: '0px',
            marginBottom: '0px',
            marginLeft: '0px',
            marginRight: '0px',
            // p: undefined,
            color: 'black',
            backgroundColor: '#cccccc',
            // backgroundColor: 'rgba(0,0,0,0.2)',
            outline: 'none',
            borderTopStyle: 'none',
            borderTopWidth: 'thin',
            borderTopColor: '#4a4a4a',
            borderBottomStyle: 'none',
            borderBottomWidth: 'thin',
            borderBottomColor: '#4a4a4a',
            borderLeftStyle: 'none',
            borderLeftWidth: 'thin',
            borderLeftColor: '#4a4a4a',
            borderRightStyle: 'none',
            borderRightWidth: 'thin',
            borderRightColor: '#4a4a4a',
            // custom properties
            __text: 'Button'
        }
    },
    'text': {
        interfaceProps: {},
        values: {        // wrapperStyles
            width: '100%',
            maxWidth: undefined,
            minWidth: 'auto',
            height: 'auto',
            maxHeight: undefined,
            minHeight: '26px',
            marginTop: '0px',
            marginBottom: '0px',
            marginLeft: '0px',
            marginRight: '0px',
            // p: undefined,
            color: 'black',
            backgroundColor: undefined,
            outline: 'none',
            borderTopStyle: 'none',
            borderTopWidth: 'thin',
            borderTopColor: '#4a4a4a',
            borderBottomStyle: 'none',
            borderBottomWidth: 'thin',
            borderBottomColor: '#4a4a4a',
            borderLeftStyle: 'none',
            borderLeftWidth: 'thin',
            borderLeftColor: '#4a4a4a',
            borderRightStyle: 'none',
            borderRightWidth: 'thin',
            borderRightColor: '#4a4a4a',
            overflow: 'auto',
            // custom properties
            __text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
        }
    },
    'header': {
        interfaceProps: {},
        values: {        // wrapperStyles
            width: '100%',
            maxWidth: undefined,
            minWidth: 'auto',
            height: '40px',
            maxHeight: undefined,
            minHeight: '40px',
            marginTop: '0px',
            marginBottom: '0px',
            marginLeft: '0px',
            marginRight: '0px',
            // p: undefined,
            color: 'black',
            backgroundColor: undefined,
            outline: 'none',
            borderTopStyle: 'none',
            borderTopWidth: 'thin',
            borderTopColor: '#4a4a4a',
            borderBottomStyle: 'none',
            borderBottomWidth: 'thin',
            borderBottomColor: '#4a4a4a',
            borderLeftStyle: 'none',
            borderLeftWidth: 'thin',
            borderLeftColor: '#4a4a4a',
            borderRightStyle: 'none',
            borderRightWidth: 'thin',
            borderRightColor: '#4a4a4a',
            // custom properties
            __text: 'Header'
        }
    },
    'checkbox': {
        interfaceProps: {},
        values: {// wrapperStyles
            width: '100%',
            maxWidth: undefined,
            minWidth: 'auto',
            height: '40px',
            maxHeight: undefined,
            minHeight: '40px',
            marginTop: '0px',
            marginBottom: '0px',
            marginLeft: '0px',
            marginRight: '0px',
            // p: undefined,
            color: 'black',
            backgroundColor: undefined,
            outline: 'none',
            borderTopStyle: 'none',
            borderTopWidth: 'thin',
            borderTopColor: '#4a4a4a',
            borderBottomStyle: 'none',
            borderBottomWidth: 'thin',
            borderBottomColor: '#4a4a4a',
            borderLeftStyle: 'none',
            borderLeftWidth: 'thin',
            borderLeftColor: '#4a4a4a',
            borderRightStyle: 'none',
            borderRightWidth: 'thin',
            borderRightColor: '#4a4a4a',
        }
    },
    'image': {
        interfaceProps: {},
        values: {// wrapperStyles
            width: '200px',
            maxWidth: undefined,
            minWidth: 'auto',
            height: '300px',
            maxHeight: undefined,
            minHeight: undefined,
            marginTop: '0px',
            marginBottom: '0px',
            marginLeft: '0px',
            marginRight: '0px',
            // p: undefined,
            // color: 'black',
            // backgroundColor: 'rgba(0,0,0,0.2)',
            // outline: 'none',
            borderTopStyle: 'none',
            borderTopWidth: 'thin',
            borderTopColor: '#4a4a4a',
            borderBottomStyle: 'none',
            borderBottomWidth: 'thin',
            borderBottomColor: '#4a4a4a',
            borderLeftStyle: 'none',
            borderLeftWidth: 'thin',
            borderLeftColor: '#4a4a4a',
            borderRightStyle: 'none',
            borderRightWidth: 'thin',
            borderRightColor: '#4a4a4a',
            // custom properties
            __src: 'https://picsum.photos/id/237/200/300',
            __alt: 'image',
        }
    },
    'link': {
        interfaceProps: {},
        values: {// wrapperStyles
            width: 'fit-content',
            maxWidth: undefined,
            minWidth: 'auto',
            height: 'auto',
            maxHeight: undefined,
            minHeight: '26px',
            marginTop: '0px',
            marginBottom: '0px',
            marginLeft: '0px',
            marginRight: '0px',
            // p: undefined,
            color: 'blue',
            backgroundColor: undefined,
            outline: 'none',
            borderTopStyle: 'none',
            borderTopWidth: 'thin',
            borderTopColor: '#4a4a4a',
            borderBottomStyle: 'none',
            borderBottomWidth: 'thin',
            borderBottomColor: '#4a4a4a',
            borderLeftStyle: 'none',
            borderLeftWidth: 'thin',
            borderLeftColor: '#4a4a4a',
            borderRightStyle: 'none',
            borderRightWidth: 'thin',
            borderRightColor: '#4a4a4a',
            // overflow: 'auto',
            // custom properties
            __text: 'Google',
            __href: 'https://www.google.com/',
            __target: '_blank',
        }
    },
    'icon-button': {
        interfaceProps: {},
        values: {// wrapperStyles
            width: '35px',
            maxWidth: undefined,
            minWidth: 'auto',
            height: '35px',
            maxHeight: undefined,
            minHeight: '35px',
            marginTop: '0px',
            marginBottom: '0px',
            marginLeft: '0px',
            marginRight: '0px',
            // paddingTop: '30px',
            // paddingBottom: '0px',
            // paddingLeft: '30px',
            // paddingRight: '0px',
            // p: undefined,
            // color: 'black',
            backgroundColor: 'white',
            outline: 'none',
            borderTopStyle: 'none',
            borderTopWidth: 'thin',
            borderTopColor: '#4a4a4a',
            borderBottomStyle: 'none',
            borderBottomWidth: 'thin',
            borderBottomColor: '#4a4a4a',
            borderLeftStyle: 'none',
            borderLeftWidth: 'thin',
            borderLeftColor: '#4a4a4a',
            borderRightStyle: 'none',
            borderRightWidth: 'thin',
            borderRightColor: '#4a4a4a',
            // custom properties
            __iconName: 'MdHelp',
            __iconSize: '25',
            __iconColor: 'black',
        }
    },
}

export {
    compTypes,
    compProperties,
}