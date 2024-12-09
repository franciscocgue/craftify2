import InputText from "../InputText";
import stylesLight from '../PropertyLight.module.css';
import stylesDark from '../PropertyDark.module.css';
import useDesignerStore from "../../../stores/designer";

const PText = () => {
    const colorMode = useDesignerStore(state => state.colorMode);
    const styles = colorMode === 'light' ? stylesLight : stylesDark;

    return <div className={styles.wrapper}>
        <InputText propertyDisplayName={'Text'}
            propertyKey="__text"
            // tooltipContent={tooltipContent}
            isValidInput={() => true}
        />
    </div>
}

export default PText;