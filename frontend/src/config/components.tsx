import { CiGrid2V } from "react-icons/ci";
import { CiGrid2H } from "react-icons/ci";
import { RxButton } from "react-icons/rx";
import { BiText } from "react-icons/bi";
import { IoMdCheckboxOutline } from "react-icons/io";

const compTypes = {
    'container-row': {
        icon: CiGrid2V,
        name: 'Row',
    },
    'container-column': {
        icon: CiGrid2H,
        name: 'Column',
    },
    'button': {
        icon: RxButton,
        name: 'Button',
        properties: {
            text: {
                value: 'button',
                displayName: 'Text',
                editable: true,
                visible: true,
                valueType: 'string',
                group: 'Display',
            },
        }
    },
    'text': {
        icon: BiText,
        name: 'Text',
    },
    'checkbox': {
        icon: IoMdCheckboxOutline,
        name: 'Checkbox',
    },
}

const compProperties = {
    'canvas': {
        p: 1, // padding
    },
    'container-column': {
        w: '100%',
        h: 'auto',
        p: 1,
        m: 0,
        border: '1px solid gray'
    },
    'button': {
        w: '100%',
        h: '40px',
        p: undefined,
        m: undefined,
        border: '0px solid cyan' 
    }
}

export {
    compTypes,
    compProperties
}