import InputText from "../InputText";
import stylesLight from '../PropertyLight.module.css';
import stylesDark from '../PropertyDark.module.css';
import useDesignerStore from "../../../stores/designer";

const PText = () => {
    const colorMode = useDesignerStore(state => state.colorMode);
    const styles = colorMode === 'light' ? stylesLight : stylesDark;

    return <div className={styles.wrapper}>

        <p style={{ fontSize: 'small' }}>Text</p>
        {/* <div style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            margin: '3px 0 17px 0',
        }}> */}
        <InputText
            propertyKey="__text"
            // tooltipContent={tooltipContent}
            isValidInput={() => true}
        />
    </div>

    // </div>
}

export default PText;