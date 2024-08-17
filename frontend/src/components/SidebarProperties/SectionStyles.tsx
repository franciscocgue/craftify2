import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { compPropertiesEditors } from "../../config/components";
import useDesignerStore from "../../stores/designer";

const SectionStyles = () => {

    const selectedId = useDesignerStore((state) => state.selectedId);
    const compMetadata = useDesignerStore((state) => state.components[selectedId || '_no_comp_'])

    const setExpandAllProperties = useDesignerStore((state) => state.setExpandAllProperties);

    const handleExpand = () => setExpandAllProperties(true);
    const handleCollapse = () => setExpandAllProperties(false);

    return <div style={{ padding: '0 10px' }}>
        {/* <input placeholder="Search" /> */}
        <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'space-around' }}>
            <button style={{
                display: 'flex',
                alignItems: 'center',
                width: '30%',
                padding: '5px',
                justifyContent: 'center',
                cursor: 'pointer',
            }}
                onClick={handleExpand}
            >
                <FaAngleDown />
            </button>
            <button style={{
                display: 'flex',
                alignItems: 'center',
                width: '30%',
                padding: '5px',
                justifyContent: 'center',
                cursor: 'pointer',
            }}
                onClick={handleCollapse}
            >
                <FaAngleRight />
            </button>
        </div>

        {compPropertiesEditors[compMetadata.type as keyof typeof compPropertiesEditors].styles}

        {/* <Layout />
    <Width />
    <Height />
    <Background />
    <Border />
    <Margin />
    <Padding />
    <Text /> */}
    </div>
}

export default SectionStyles;