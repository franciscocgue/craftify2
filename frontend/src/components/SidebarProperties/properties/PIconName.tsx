import InputText from "../InputText";
import styles from '../Property.module.css';

const PIconName = () => {
    return <div className={styles.wrapper}>
        <InputText propertyDisplayName={'Icon'}
            propertyKey="__iconName"
            // tooltipContent={tooltipContent}
            isValidInput={()=> true}
        />
    </div>
}

export default PIconName;