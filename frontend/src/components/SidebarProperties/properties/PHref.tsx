import InputText from "../InputText";
import stylesLight from '../PropertyLight.module.css';
import stylesDark from '../PropertyDark.module.css';
import useDesignerStore from "../../../stores/designer";

// const tooltipContent = (ref: React.MutableRefObject<HTMLDivElement>, colorMode: 'dark' | 'light', styles: CSSModuleClasses) => <MyPortal styles={{
//     position: 'absolute',
//     width: '300px',
//     height: '100px', // trial and error; hard-coded to use below and not using other ref
//     backgroundColor: colorMode === 'dark' ? 'white' : 'black',
//     color: colorMode === 'dark' ? 'black' : 'white',
//     borderRadius: '5px',
//     padding: '10px 5px',
//     fontSize: 'small',
//     border: colorMode === 'dark' ? '1px solid grey' : '1px solid white',
//     top: ref.current.getBoundingClientRect().bottom + ref.current.getBoundingClientRect().top + window.scrollY > window.innerHeight
//         ? ref.current.getBoundingClientRect().top - 100 + window.scrollY + ref.current.getBoundingClientRect().height + 10
//         : ref.current.getBoundingClientRect().bottom + window.scrollY - ref.current.getBoundingClientRect().height - 10,
//     left: ref.current.getBoundingClientRect().left - 300,
// }}>
//     <div className={styles['tooltip']}>
//         {/* <div>
//             <p className={styles['header']}>Info</p>
//             <div className={styles['main']}>
//                 <p className={styles['sub-header']}>Units</p>
//                 <p style={{ marginLeft: '20px', marginBottom: '0px' }}>no units :)</p>
//                 <p className={styles['sub-header']}>Dynamic variables</p>
//                 <p style={{ marginLeft: '20px', marginBottom: '0px' }}>{`{{myVariable}}`}</p>
//             </div>
//         </div> */}
//         <div>
//             <p className={styles['header']}>Examples</p>
//             <div className={styles['main']}>
//                 <p>https://developer.mozilla.org/en-US/docs/Learn</p>
//                 <p>{`https://my-web/page-number-{{myVariable}}</p>`}</p>
//             </div>
//         </div>
//     </div>
// </MyPortal>

const PHref = () => {
    const colorMode = useDesignerStore(state => state.colorMode);
    const styles = colorMode === 'light' ? stylesLight : stylesDark;

    return <div className={styles.wrapper}>
        <p style={{ fontSize: 'small' }}>URL</p>
        <InputText
            propertyKey="__href"
            // tooltipContent={tooltipContent}
            isValidInput={() => true}
        />
    </div>
}

export default PHref;