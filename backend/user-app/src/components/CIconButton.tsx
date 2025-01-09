import MyIcon from '../helpers/MyIcon';
import { parseProperties } from '../helpers/utils';
import { useDynamicVariables } from '../hooks/useVariables';

type Props = {
    onClick: (() => Promise<void>) | undefined,
    [x: string]: any
}
const CIconButton = ({ onClick, ...otherProperties }: Props) => {
    
    // subscribes to variable changes
    useDynamicVariables(otherProperties);
    
    const parsedProperties = parseProperties(otherProperties);
    return <>
        <button
            style={{
                ...parsedProperties,
            }}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                // prevent triggering parent onClick events
                event.stopPropagation();
                if (onClick) onClick();
            }}
        >
            <MyIcon nameIcon={parsedProperties.__iconName ?? 'MdQuestionMark'} propsIcon={{ size: parsedProperties.__iconSize, color: parsedProperties.__iconColor }} />
        </button>
    </>
}

export default CIconButton;