import useDesignerStore from '../../stores/designer';
import styles from './PropertyGroupHeader.module.css';

type PropertyGroupHeaderProps = {
    title: string,
    info?: string,
    isCollapsed: boolean,
    setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

const PropertyGroupHeader = ({ title, info, isCollapsed, setIsCollapsed }: PropertyGroupHeaderProps) => {

    const setExpandAllProperties = useDesignerStore(state => state.setExpandAllProperties);
    const handleHeaderClick = () => {
        setExpandAllProperties(null);
        setIsCollapsed(prev => !prev);
    };

    return <div className={styles.wrapper}>
        {isCollapsed
            ? <button onClick={() => setIsCollapsed(prev => !prev)}>⏵</button>
            : <button onClick={() => setIsCollapsed(prev => !prev)}>⏷</button>}
        <p onClick={handleHeaderClick} title={info}>{title}</p>
    </div>
}

export default PropertyGroupHeader;