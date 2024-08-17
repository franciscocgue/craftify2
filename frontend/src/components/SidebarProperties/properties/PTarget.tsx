import InputSelect from "../InputSelect";
import InputSelectAdvanced from "../InputSelectAdvanced";
import styles from '../Property.module.css';

const options = [
    {
        value: '_self',
        display: 'This tab',
    },
    {
        value: '_blank',
        display: 'New tab',
    },
]


const PTarget = () => {
    return <div className={styles.wrapper}>
        {/* <Select options={options} /> */}
        {/* <InputText propertyDisplayName={'Icon'}
            propertyKey="__iconName"
            // tooltipContent={tooltipContent}
            isValidInput={()=> true}
        /> */}
        <InputSelect propertyDisplayName={'Where to open'} propertyKey={['__target']} options={options} />
    </div>
}

export default PTarget;