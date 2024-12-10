import useDesignerStore from "../../../stores/designer";
// import InputSelect from "../InputSelect";
import stylesLight from '../PropertyLight.module.css';
import stylesDark from '../PropertyDark.module.css';
import ChoiceChip from "../ChoiceChip";

// const options = [
//     {
//         value: '_self',
//         display: 'This tab',
//     },
//     {
//         value: '_blank',
//         display: 'New tab',
//     },
// ]


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

        <p style={{ fontSize: 'small' }}>Where to open</p>
        <div style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            margin: '3px 0 17px 0',
        }}>
            <ChoiceChip display={'New window'} valueChip="_blank" propertyKey="__target"></ChoiceChip>
            <ChoiceChip display={'This window'} valueChip="_self" propertyKey="__target"></ChoiceChip>
        </div>

        {/* <InputSelect propertyDisplayName={'Where to open'} propertyKey={['__target']} options={options} /> */}
    </div>
}

export default PTarget;