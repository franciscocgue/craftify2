import InputColor from "../InputColor";
import styles from '../Property.module.css';

const PIconColor = () => {
    return <div className={styles.wrapper}>
        <InputColor propertyDisplayName={'Color'} propertyKey={['__iconColor']} />
    </div>
}

export default PIconColor;