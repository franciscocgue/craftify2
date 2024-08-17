import { compPropertiesEditors } from "../../config/components";
import useDesignerStore from "../../stores/designer";

const SectionProperties = () => {

    const selectedId = useDesignerStore((state) => state.selectedId);
    const compMetadata = useDesignerStore((state) => state.components[selectedId || '_no_comp_'])

    return <div style={{ padding: '0 10px', marginTop: '20px' }}>
        {/* <input placeholder="Search" /> */}
        {compPropertiesEditors[compMetadata.type as keyof typeof compPropertiesEditors].properties}

    </div>
}

export default SectionProperties;