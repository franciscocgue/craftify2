import { CiGrid2V } from "react-icons/ci";
import { CiGrid2H } from "react-icons/ci";
import { RxButton } from "react-icons/rx";
import { BiText } from "react-icons/bi";
import { IoMdCheckboxOutline } from "react-icons/io";
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
    'checkbox': {
        icon: IoMdCheckboxOutline,
        name: 'Checkbox',
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
    [K in keyof typeof compTypes]: Properties;
};

const compProperties: ComponentProperties = {
    'canvas': {
        gap: '7px',
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: '8px',
        paddingRight: '8px',
        bg: undefined,
    },
    'column': {
        // wrapperStyles
        width: '100%',
        height: 'auto',
        minHeight: '40px',
        marginTop: '0px',
        marginBottom: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        paddingTop: '4px',
        paddingBottom: '4px',
        paddingLeft: '4px',
        paddingRight: '4px',
        gap: '0px',
        // p: 1,
        // border: '1px solid grey',
        m: 0,
        wrap: 'nowrap',
        alignItems: 'center',
        bg: undefined,
    },
    'button': {
        // wrapperStyles
        width: '100%',
        height: '40px',
        marginTop: '0px',
        marginBottom: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        // padding removed; see comment in button component
        // p: undefined,
        m: undefined,
        border: '0px solid cyan',
    }
}

export {
    compTypes,
    compProperties,
}