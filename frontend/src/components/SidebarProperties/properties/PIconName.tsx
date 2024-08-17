import InputSelectAdvanced from "../InputSelectAdvanced";
import styles from '../Property.module.css';
import * as MdIcons from 'react-icons/md';

// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' }, +    { value: 'vanilla', label: 'Vanilla' }
// ]

const iconNames = Object.keys(MdIcons);

const options = iconNames.map(icon => ({
    value: icon,
    label: icon,
}))


const PIconName = () => {
    return <div className={styles.wrapper}>
        {/* <Select options={options} /> */}
        {/* <InputText propertyDisplayName={'Icon'}
            propertyKey="__iconName"
            // tooltipContent={tooltipContent}
            isValidInput={()=> true}
        /> */}
        <InputSelectAdvanced propertyDisplayName={'Icon'} propertyKey={['__iconName']} options={options} />
    </div>
}

export default PIconName;