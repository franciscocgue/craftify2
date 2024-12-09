import useDesignerStore from "../../../stores/designer";
import InputSelect from "../InputSelect";
import stylesLight from '../PropertyLight.module.css';
import stylesDark from '../PropertyDark.module.css';

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
    const colorMode = useDesignerStore(state => state.colorMode);
    const styles = colorMode === 'light' ? stylesLight : stylesDark;

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