import MyPortal from "../../helpers/MyPortal";
import InputText from "../InputText";
import styles from '../Property.module.css';

const tooltipContent = (ref: React.MutableRefObject<HTMLDivElement>, colorMode: 'dark' | 'light', styles: CSSModuleClasses) => <MyPortal styles={{
    position: 'absolute',
    width: '280px',
    height: '120px', // trial and error; hard-coded to use below and not using other ref
    backgroundColor: colorMode === 'dark' ? 'white' : 'black',
    color: colorMode === 'dark' ? 'black' : 'white',
    borderRadius: '5px',
    padding: '10px 5px',
    fontSize: 'small',
    border: colorMode === 'dark' ? '1px solid grey' : '1px solid white',
    top: ref.current.getBoundingClientRect().bottom + ref.current.getBoundingClientRect().top + window.scrollY > window.innerHeight
        ? ref.current.getBoundingClientRect().top - 120 + window.scrollY + ref.current.getBoundingClientRect().height + 10
        : ref.current.getBoundingClientRect().bottom + window.scrollY - ref.current.getBoundingClientRect().height - 10,
    left: ref.current.getBoundingClientRect().left - 280,
}}>
    <div className={styles['tooltip']}>
        {/* <div>
            <p className={styles['header']}>Info</p>
            <div className={styles['main']}>
                <p className={styles['sub-header']}>Units</p>
                <p style={{ marginLeft: '20px', marginBottom: '0px' }}>no units :)</p>
                <p className={styles['sub-header']}>Dynamic variables</p>
                <p style={{ marginLeft: '20px', marginBottom: '0px' }}>{`{{myVariable}}`}</p>
            </div>
        </div> */}
        <div>
            <p className={styles['header']}>Info</p>
            <div className={styles['main']}>
                <p>Fallback (alternate) text to display when the image could not be loaded.</p>
                <p>It also enhances <i>accessibility</i></p>
            </div>
        </div>
    </div>
</MyPortal>

const PAlt = () => {
    return <div className={styles.wrapper}>
        <InputText propertyDisplayName={'Fallback text'}
            propertyKey="__alt"
            tooltipContent={tooltipContent}
            isValidInput={()=> true}
        />
    </div>
}

export default PAlt;