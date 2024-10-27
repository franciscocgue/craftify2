import { parseProperties } from '../helpers/utils';

type Props = {
    onClick: (() => Promise<void>) | undefined,
    [x: string]: any
}
const CCheckbox = ({ onClick, ...otherProperties }: Props) => {
    const parsedProperties = parseProperties(otherProperties);
    return <div
        style={{
            ...parsedProperties,
        }}
        onClick={(event: React.MouseEvent<HTMLElement>) => {
            // prevent triggering parent onClick events
            event.stopPropagation();
            if (onClick) onClick();
        }}
        >
        <label style={{ fontSize: 'small' }}>
            <input type="checkbox" style={{ marginRight: '5px' }} />
            Checkbox
        </label>
    </div>
}

export default CCheckbox;