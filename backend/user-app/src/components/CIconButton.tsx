import MyIcon from '../helpers/MyIcon';
import { useDynamicVariables } from '../hooks/useVariables';

type Props = {
    onClick: (() => Promise<void>) | undefined,
    [x: string]: any
}
const CIconButton = ({ onClick, ...otherProperties }: Props) => {

    // subscribes to variable changes
    const [parsedProperties] = useDynamicVariables(otherProperties);

    return <>
        <button
            style={{
                ...parsedProperties,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // visibility
                ...(!parsedProperties.__visible && { display: 'none' }),
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