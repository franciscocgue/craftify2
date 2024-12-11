import { useEffect, useState } from "react";
import PropertyGroupHeader from "../common/PropertyGroupHeader";
import stylesLight from './PropertyLight.module.css';
import stylesDark from './PropertyDark.module.css';
import useDesignerStore from "../../stores/designer";


const MainProperties = ({ children }: { children: null[] | JSX.Element[] }) => {

    const [isCollapsed, setIsCollapsed] = useState(true);

    const expandAllProperties = useDesignerStore(state => state.expandAllProperties);

    useEffect(() => {
        if (expandAllProperties !== null) {
            setIsCollapsed(!expandAllProperties)
        }
    }, [expandAllProperties])

    const colorMode = useDesignerStore(state => state.colorMode);
    const styles = colorMode === 'light' ? stylesLight : stylesDark;

    return <div>
        <PropertyGroupHeader info={"Component-specific properties"} isCollapsed={isCollapsed} title="Main" setIsCollapsed={setIsCollapsed} />
        {!isCollapsed && <div className={styles.wrapper}>
            {children}
        </div>}
    </div>
}

export default MainProperties;