import useDesignerStore from '../../stores/designer';
import lightStyles from './MyTextInputLight.module.css';
import darkStyles from './MyTextInputDark.module.css';

const MyTextInput = () => {

    const colorMode = useDesignerStore((state) => state.colorMode);
    const styles = colorMode === 'light' ? lightStyles : darkStyles;
    
    return <input className={styles.wrapper} />
}

export default MyTextInput;