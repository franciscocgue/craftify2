import InputText from "../InputText";
import styles from '../Property.module.css';

const PText = () => {
    return <div className={styles.wrapper}>
        <InputText propertyDisplayName={'Text'}
            propertyKey="__text"
            // tooltipContent={tooltipContent}
            isValidInput={()=> true}
        />
    </div>
}

export default PText;