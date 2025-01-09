import MyPortal from "../../helpers/MyPortal";
import InputText from "../InputText";

const tooltipContent = (ref: React.MutableRefObject<HTMLDivElement>, colorMode: 'dark' | 'light', styles: CSSModuleClasses) => <MyPortal styles={{
    position: 'absolute',
    width: '280px',
    height: '180px', // trial and error; hard-coded to use below and not using other ref
    backgroundColor: colorMode === 'dark' ? 'white' : 'black',
    color: colorMode === 'dark' ? 'black' : 'white',
    borderRadius: '5px',
    padding: '10px 5px',
    fontSize: 'small',
    border: colorMode === 'dark' ? '1px solid grey' : '1px solid white',
    top: ref.current.getBoundingClientRect().bottom + ref.current.getBoundingClientRect().top + window.scrollY > window.innerHeight
        ? ref.current.getBoundingClientRect().top - 180 + window.scrollY + ref.current.getBoundingClientRect().height + 10
        : ref.current.getBoundingClientRect().bottom + window.scrollY - ref.current.getBoundingClientRect().height - 10,
    left: ref.current.getBoundingClientRect().left - 280,
}}>
    <div className={styles['tooltip']}>
        <div>
            <p className={styles['header']}>Checkbox logic</p>
            <div className={styles['main']}>
                {/* <p className={styles['sub-header']}>Checked</p> */}
                <p style={{ marginLeft: '20px', marginBottom: '0px' }}>Set to a dynamic variable for 2-way binding (example: {`{{myVariable}}`}), or leave empty</p>
                {/* <p className={styles['sub-header']}>Not checked</p>
                <p style={{ marginLeft: '20px', marginBottom: '0px' }}>false, no, 0</p>
                <p className={styles['sub-header']}>Dynamic variables</p> */}
                <p style={{ marginLeft: '20px', marginBottom: '0px' }}><i>2-way binding</i> means if parameter changes, checkbox changes. And viceversa.</p>
            </div>
        </div>
        {/* <div>
            <p className={styles['header']}>Examples</p>
            <div className={styles['main']}>
                <p>35</p>
                <p>{`{{myVariable}}`}</p>
            </div>
        </div> */}
    </div>
</MyPortal>

type PCheckedProps = {
    label?: string,
}

const validValues = [true, 'true', 'yes', 1, '1', 'Yes', 'True', 'TRUE', 'YES',
    false, 'false', 'no', 0, '0', 'No', 'False', 'FALSE', 'NO'
];

const patternVariable = /^\{\{[a-zA-Z_][a-zA-Z0-9_]*\}\}$/;

const PChecked = ({ label }: PCheckedProps) => {

    return <div>

        <p style={{ fontSize: 'small' }}>{label ?? 'Checked'}</p>

        <InputText
            propertyKey="__checked"
            tooltipContent={tooltipContent}
            // @TODO: enable dynamic variables in validation
            isValidInput={(checked: string) => patternVariable.test(checked)}
        />
    </div>

    // </div>
}

export default PChecked;