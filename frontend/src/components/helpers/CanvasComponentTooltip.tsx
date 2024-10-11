import { toast } from "react-toastify";
import { compTypes } from "../../config/components";
import { IconType } from "react-icons";
import DraggableHandle from "./DraggableHandle";
import { GrDuplicate } from "react-icons/gr";
import { RiDeleteBin2Fill } from "react-icons/ri";

interface IconBoxProps {
    icon: IconType;
}
const IconBox: React.FC<IconBoxProps> = ({ icon: Icon }) => {
    return (
        <div >
            <Icon size="20px" />
        </div>
    );
};

/**
 * Creates a tooltip for canvas components with component info (name, type) 
 * and with duplicate, delete, move functionality.
 */
const CanvasComponentTooltip = (name: string, componentType: keyof typeof compTypes | 'canvas', colorMode: 'dark' | 'light', componentId: string, removeComponent: (compId: string) => void, duplicateComponent: (compId: string) => void) => {

    const notify = {
        deleted: (msg: string) => toast(msg, { type: 'info', autoClose: 1500, position: 'bottom-right' }),
    }

    return (<div
        style={{
            display: 'flex',
            gap: '7px',
            backgroundColor: colorMode === 'dark' ? 'white' : 'black',
            color: colorMode === 'dark' ? 'black' : 'white',
            border: colorMode === 'dark' ? '1px solid grey' : '1px solid white',
            outline: colorMode === 'dark' ? '1px solid white' : undefined,
            fontSize: 'small',
            padding: '5px',
            borderRadius: '3px',
            // alignItems: 'center',
            height: '30px',
            userSelect: 'none',
        }}>
        <DraggableHandle top={6} componentId={componentId} />
        <GrDuplicate
            color="white"
            size={'19px'}
            title="Duplicate"
            style={{ cursor: 'pointer', color: colorMode === 'dark' ? 'black' : 'white' }}
            onClick={() => {
                duplicateComponent(componentId);
                // notify.deleted(`${name} deleted`)
            }}
        />
        <RiDeleteBin2Fill
            color="white"
            size={'19px'}
            title="Delete"
            style={{ cursor: 'pointer', color: colorMode === 'dark' ? 'black' : 'white', marginRight: '15px' }}
            onClick={() => {
                removeComponent(componentId);
                notify.deleted(`${name} deleted`)
            }}
        />
        {name || componentType}
        <IconBox icon={compTypes[componentType !== 'canvas' ? componentType : 'column'].icon} />
    </div>)
}

export default CanvasComponentTooltip;