import styles from './PropertyGroupHeader.module.css';

type PropertyGroupHeaderProps = {
    title: string,
    info?: string,
    isCollapsed: boolean,
    setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

const PropertyGroupHeader = ({ title, info, isCollapsed, setIsCollapsed }: PropertyGroupHeaderProps) => {
    return <div className={styles.wrapper}>
        {isCollapsed ? <button onClick={() => setIsCollapsed(prev => !prev)}>⏵</button> : <button>⏷</button>}
        <p onClick={() => setIsCollapsed(prev => !prev)} title={info}>{title}</p>
    </div>
}

export default PropertyGroupHeader;