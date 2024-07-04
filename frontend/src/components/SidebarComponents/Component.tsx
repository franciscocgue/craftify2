import { CSSProperties } from "react";
import { IconType } from "react-icons";
import useDesignerStore from "../../stores/designer";
import { compTypes } from "../../config/components";


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


type propsT = {
    type?: keyof typeof compTypes,
    name: string,
    icon: IconType,
    style?: CSSProperties,
}

const Component = ({ type, name, icon, style }: propsT) => {

    console.log('C - sidebar.Component: ' + name)

    const addComponent = useDesignerStore((state) => state.addComponent);
    const colorMode = useDesignerStore((state) => state.colorMode);

    return <div
        style={{
            ...style,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid gray',
            width: '75px',
            height: '65px',
            borderRadius: '5px',
            justifyContent: 'center',
            backgroundColor: colorMode === 'dark' ? 'rgba(0, 0, 0, 0.24)' : 'rgba(255, 255, 255, 0.80)'
        }}
        onClick={type ? () => addComponent(type, 'canvas', 'inside') : undefined}
    >
        <IconBox icon={icon} />
        <div>
            <p
                style={{
                    padding: '2px',
                    textAlign: 'center',
                    fontSize: '12px',
                    userSelect: 'none'
                }}
            >
                {name}
            </p>
        </div>
    </div>
}

export default Component;