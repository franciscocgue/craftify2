import InputColor from "../InputColor";
import stylesLight from '../PropertyLight.module.css';
import stylesDark from '../PropertyDark.module.css';
import useDesignerStore from "../../../stores/designer";

const PIconColor = () => {
    const colorMode = useDesignerStore(state => state.colorMode);
    const styles = colorMode === 'light' ? stylesLight : stylesDark;

    return <div className={styles.wrapper}>
        <p style={{ marginTop: '8px', fontSize: 'small' }}>Color</p>
        <InputColor propertyDisplayName={'Color'} propertyKey={['__iconColor']} />
    </div>
}

export default PIconColor;