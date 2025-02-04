import useDesignerStore from "../../../stores/designer";
import { getValue, myParser } from "../../../utils/dsl-utils";
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
            <p className={styles['header']}>Visibility</p>
            <div className={styles['main']}>
                {/* <p className={styles['sub-header']}>Checked</p> */}
                <p style={{ marginLeft: '20px', marginBottom: '0px' }}>Set to a dynamic variable to manage visibility (example: {`{{myVariable}}`}), or leave empty to always display</p>
                {/* <p className={styles['sub-header']}>Not checked</p>
                <p style={{ marginLeft: '20px', marginBottom: '0px' }}>false, no, 0</p>
                <p className={styles['sub-header']}>Dynamic variables</p> */}
                {/* <p style={{ marginLeft: '20px', marginBottom: '0px' }}><i>2-way binding</i> means if parameter changes, checkbox changes. And viceversa.</p> */}
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

type PVisibleProps = {
    label?: string,
}

const PVisible = ({ label }: PVisibleProps) => {

    // non-reactive!
    const variables = useDesignerStore.getState().variables;

    return <div>

        <p style={{ fontSize: 'small' }}>{label ?? 'Checked'}</p>

        <InputText
            propertyKey="__visible"
            tooltipContent={tooltipContent}
            isValidInput={(isVisibleExpression: string) => {

                try {
                    const [parsedAstObj, _] = myParser(isVisibleExpression.slice(2,-2), variables);
                    const val = getValue(parsedAstObj, [], variables);
                    if (val === true || val === 1 || val === false || val === 0) {
                        return true;
                    };
                    return false;
                } catch (err) {
                    return false;
                }

            }}
        />
    </div>

    // </div>
}

export default PVisible;