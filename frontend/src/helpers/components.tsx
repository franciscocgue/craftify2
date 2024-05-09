import { CiGrid2V } from "react-icons/ci";
import { CiGrid2H } from "react-icons/ci";
import { RxButton } from "react-icons/rx";
import { BiText } from "react-icons/bi";

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
    },
    'text': {
        icon: BiText,
        name: 'Text',
    },
}

export {
    compTypes
}