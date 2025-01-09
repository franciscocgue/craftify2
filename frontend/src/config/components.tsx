import { CiGrid2V, CiGrid2H } from "react-icons/ci";
import { RxButton } from "react-icons/rx";
import { BiText } from "react-icons/bi";
import { FaHeading } from "react-icons/fa6";
import { IoMdCheckboxOutline } from "react-icons/io";
import { IoImageOutline } from "react-icons/io5";
import { IoMdLink } from "react-icons/io";
import { CgPlayButtonR } from "react-icons/cg";
import { CompNames, Properties } from "../types/designer.types";

import Layout from "../components/SidebarProperties/Layout";
import Width from "../components/SidebarProperties/Width";
import Height from "../components/SidebarProperties/Height";
import Margin from "../components/SidebarProperties/Margin";
import Border from "../components/SidebarProperties/Border";
import Padding from "../components/SidebarProperties/Padding";
import Background from "../components/SidebarProperties/Background";
import Text from "../components/SidebarProperties/Text";

import PText from "../components/SidebarProperties/properties/PText";
import PIconSize from "../components/SidebarProperties/properties/PIconSize";
import PIconName from "../components/SidebarProperties/properties/PIconName";
import PIconColor from "../components/SidebarProperties/properties/PIconColor";
import PSrc from "../components/SidebarProperties/properties/PSrc";
import PAlt from "../components/SidebarProperties/properties/PAlt";
import PHref from "../components/SidebarProperties/properties/PHref";
import PTarget from "../components/SidebarProperties/properties/PTarget";
import PChecked from "../components/SidebarProperties/properties/PChecked";

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

const compPropertiesEditors = {
    'row': {
        styles: [null],
        properties: [null],
    },
    'canvas': {
        styles: [<Layout key={'layout'} />, <Padding key={'padding'} />, <Background key={'background'} />],
        properties: [null],
    },
    'column': {
        styles: [<Layout key={'layout'} />, <Width key={'width'} />, <Height key={'height'} />, <Margin key={'margin'} />, <Border key={'border'} />, <Padding key={'padding'} />, <Background key={'background'} />],
        properties: [null],
    },
    'button': {
        styles: [<Width key={'width'} />, <Height key={'height'} />, <Margin key={'margin'} />, <Padding key={'padding'} />, <Border key={'border'} />, <Background key={'background'} />, <Text key={'text'} />],
        properties: [<PText label="Label" key={'PText'} />],
    },
    'text': {
        styles: [<Width key={'width'} />, <Height key={'height'} />, <Margin key={'margin'} />, <Padding key={'padding'} />, <Border key={'border'} />, <Background key={'background'} />, <Text key={'text'} />],
        properties: [<PText label="Content" key={'PText'} />],
    },
    'header': {
        styles: [<Width key={'width'} />, <Height key={'height'} />, <Margin key={'margin'} />, <Padding key={'padding'} />, <Border key={'border'} />, <Background key={'background'} />, <Text key={'text'} />],
        properties: [<PText label="Title" key={'PText'} />],
    },
    'checkbox': {
        styles: [<Width key={'width'} />, <Height key={'height'} />, <Margin key={'margin'} />, <Padding key={'padding'} />, <Border key={'border'} />, <Background key={'background'} />, <Text key={'text'} />],
        properties: [<PText label="Label" key={'PText'} />, <PChecked label="Is checked" key={'PChecked'} />],
    },
    'image': {
        styles: [<Width key={'width'} />, <Height key={'height'} />, <Margin key={'margin'} />, <Border key={'border'} />],
        properties: [<PSrc key={'PSrc'} />, <PAlt key={'PAlt'} />],
    },
    'link': {
        styles: [<Width key={'width'} />, <Height key={'height'} />, <Margin key={'marhin'} />, <Padding key={'padding'} />, <Border key={'border'} />, <Background key={'background'} />, <Text key={'text'} />],
        properties: [<PText label="Display text" key={'PText'} />, <PHref key={'PHref'} />, <PTarget key={'PTarget'} />],
    },
    'icon-button': {
        styles: [<Width key={'width'} />, <Height key={'height'} />, <Margin key={'margin'} />, <Padding key={'padding'} />, <Border key={'border'} />, <Background key={'background'} />],
        properties: [<PIconSize key={'PIconSize'} />, <PIconName key={'PIconName'} />, <PIconColor key={'PIconColor'} />],
    },
}



const compProperties: Record<keyof CompNames | 'canvas', Properties> = {
    'row': {},
    'canvas': {
        canvasWidthPx: '360',
        canvasHeightPx: '760',
        // minHeight: '760',
        display: 'flex', // not editable
        flexDirection: 'column', // not editable
        flexWrap: 'nowrap',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: '5px',
        paddingTop: '8px',
        paddingBottom: '0px',
        paddingLeft: '8px',
        paddingRight: '8px',
        backgroundColor: 'white',
        backgroundImage: 'none',
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'scroll',
    },
    'column': {
        display: 'flex', // not editable
        flexDirection: 'column', // not editable
        // wrapperStyles (resizer)
        width: '100%',
        maxWidth: 'none',
        minWidth: 'auto',
        height: 'auto',
        maxHeight: 'none',
        minHeight: 'auto',
        marginTop: '0px',
        marginBottom: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        // CContainerColumn styles
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: '8px',
        paddingRight: '8px',
        gap: '5px',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
        backgroundImage: 'none',
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'scroll',
        overflow: 'auto',
        borderRadius: '0px',
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
    },
    'button': {
        // wrapperStyles
        width: 'auto',
        maxWidth: 'none',
        minWidth: 'auto',
        height: 'auto',
        maxHeight: 'none',
        minHeight: '40px',
        marginTop: '0px',
        marginBottom: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        // p: undefined,
        color: 'white',
        fontStyle: 'normal',
        fontWeight: 'normal',
        textAlign: 'center',
        backgroundColor: '#0276FF',
        backgroundImage: 'none',
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'scroll',
        // backgroundColor: 'rgba(0,0,0,0.2)',
        outline: 'none',
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: '16px',
        paddingRight: '16px',
        borderRadius: '8px',
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
    },
    'text': {
        // wrapperStyles
        width: '100%',
        maxWidth: 'none',
        minWidth: 'auto',
        height: 'auto',
        maxHeight: 'none',
        minHeight: '26px',
        marginTop: '0px',
        marginBottom: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        // p: undefined,
        color: 'black',
        fontStyle: 'normal',
        fontWeight: 'normal',
        textAlign: 'start',
        backgroundColor: 'transparent',
        backgroundImage: 'none',
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'scroll',
        outline: 'none',
        paddingTop: '0px',
        paddingBottom: '0px',
        paddingLeft: '0px',
        paddingRight: '0px',
        borderRadius: '0px',
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
    },
    'header': {
        // wrapperStyles
        width: '100%',
        maxWidth: 'none',
        minWidth: 'auto',
        height: '40px',
        maxHeight: 'none',
        minHeight: '40px',
        marginTop: '0px',
        marginBottom: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        // p: undefined,
        color: 'black',
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'transparent',
        backgroundImage: 'none',
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'scroll',
        outline: 'none',
        paddingTop: '0px',
        paddingBottom: '0px',
        paddingLeft: '0px',
        paddingRight: '0px',
        borderRadius: '0px',
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
    },
    'checkbox': {
        // wrapperStyles
        width: '100%',
        maxWidth: 'none',
        minWidth: 'auto',
        height: 'auto',
        maxHeight: 'none',
        minHeight: 'auto',
        marginTop: '0px',
        marginBottom: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        // p: undefined,
        color: 'black',
        fontStyle: 'normal',
        fontWeight: 'normal',
        textAlign: 'start',
        backgroundColor: undefined,
        backgroundImage: 'none',
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'scroll',
        outline: 'none',
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: '16px',
        paddingRight: '16px',
        borderRadius: '0px',
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
        __text: 'Checkbox',
        __checked: undefined, // {{myVariable}} | undefined
    },
    'image': {
        // wrapperStyles
        width: '200px',
        maxWidth: 'none',
        minWidth: 'auto',
        height: '300px',
        maxHeight: 'none',
        minHeight: undefined,
        marginTop: '0px',
        marginBottom: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        // p: undefined,
        // color: 'black',
        // backgroundColor: 'rgba(0,0,0,0.2)',
        // outline: 'none',
        borderRadius: '0px',
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
    },
    'link': {
        // wrapperStyles
        width: 'auto',
        maxWidth: 'none',
        minWidth: 'auto',
        height: 'auto',
        maxHeight: 'none',
        minHeight: '26px',
        marginTop: '0px',
        marginBottom: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        // p: undefined,
        color: 'blue',
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'transparent',
        backgroundImage: 'none',
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'scroll',
        outline: 'none',
        paddingTop: '0px',
        paddingBottom: '0px',
        paddingLeft: '0px',
        paddingRight: '0px',
        borderRadius: '0px',
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
        __text: 'Learn web development',
        __href: 'https://developer.mozilla.org/en-US/docs/Learn',
        __target: '_blank',
    },
    'icon-button': {
        // wrapperStyles
        width: 'auto',
        maxWidth: 'none',
        minWidth: 'auto',
        height: 'auto',
        maxHeight: 'none',
        minHeight: 'auto',
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
        backgroundColor: 'transparent',
        backgroundImage: 'none',
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'scroll',
        outline: 'none',
        paddingTop: '0px',
        paddingBottom: '0px',
        paddingLeft: '0px',
        paddingRight: '0px',
        borderRadius: '0px',
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
    },
}

export {
    compTypes,
    compProperties,
    compPropertiesEditors,
}