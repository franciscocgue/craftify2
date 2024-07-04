import { IconType } from 'react-icons';
import { useHover } from '../custom-hooks/hooks';
import { CSSProperties, ReactElement } from 'react';

const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '10%',
    padding: '10px',
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    outline: 'none'
}

const hoverStyle = {
    backgroundColor: '#0056b3'
}

type IconButtonProps = {
    icon: ReactElement, // react-icon normally
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    baseStylesOverwrite?: CSSProperties,
    hoverStylesOverwrite?: CSSProperties,
    title?: string,
}

const IconButton = ({ icon, onClick, baseStylesOverwrite, hoverStylesOverwrite, title }: IconButtonProps) => {
    const [style, eventHandlers] = useHover({ ...baseStyle, ...baseStylesOverwrite }, { ...hoverStyle, ...hoverStylesOverwrite });

    return <button
        style={style}
        {...eventHandlers}
        onClick={onClick}
        title={title}
    >
        {icon}
    </button>
}

export default IconButton;