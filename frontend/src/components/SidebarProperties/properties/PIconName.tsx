import InputSelectAdvanced from "../InputSelectAdvanced";
import stylesLight from '../PropertyLight.module.css';
import stylesDark from '../PropertyDark.module.css';
import * as MdIcons from 'react-icons/md';
import useDesignerStore from "../../../stores/designer";

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
    const colorMode = useDesignerStore(state => state.colorMode);
    const styles = colorMode === 'light' ? stylesLight : stylesDark;

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