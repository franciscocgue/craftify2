import { CiGrid2V } from "react-icons/ci";
import { CiGrid2H } from "react-icons/ci";
import { RxButton } from "react-icons/rx";
import { BiText } from "react-icons/bi";
import { IoMdCheckboxOutline } from "react-icons/io";

const compTypes = {
    'container-row': {
        icon: CiGrid2V,
        name: 'Container row',
    },
    'container-column': {
        icon: CiGrid2H,
        name: 'Container column',
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


export {
    compTypes
}