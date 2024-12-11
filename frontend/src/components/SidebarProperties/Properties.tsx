import { compPropertiesEditors } from "../../config/components";
import useDesignerStore from "../../stores/designer";
import MainProperties from "./MainProperties";
// import { BiCollapseAlt, BiExpandAlt } from "react-icons/bi";

const Properties = () => {

    const selectedId = useDesignerStore((state) => state.selectedId);
    // const colorMode = useDesignerStore((state) => state.colorMode);
    const compMetadata = useDesignerStore((state) => state.components[selectedId || '_no_comp_'])

    // const setExpandAllProperties = useDesignerStore((state) => state.setExpandAllProperties);

    // const handleExpand = () => setExpandAllProperties(true);
    // const handleCollapse = () => setExpandAllProperties(false);

    return <div style={{ padding: '0 10px' }}>
        {/* <input placeholder="Search" /> */}

        {/* <div style={{ margin: '10px 0', display: 'flex', justifyContent: 'space-around' }}>
            <button style={{
                display: 'flex',
                alignItems: 'center',
                // width: '30%',
                padding: '3px',
                justifyContent: 'center',
                cursor: 'pointer',
                // background: 'none',
                border: '1px solid darkgrey',
                borderRadius: '4px',
                outline: 'inherit',
                color: colorMode === 'light' ? '#333' : '#fff',
                background: colorMode === 'light' ? 'white' : '#333',
                // border: '1px solid grey',

            }}
                onClick={handleExpand}
            >
                <BiExpandAlt size={15} title="Expand All" />
            </button>
            <button style={{
                display: 'flex',
                alignItems: 'center',
                // width: '30%',
                padding: '3px',
                justifyContent: 'center',
                cursor: 'pointer',
                // background: 'none',
                border: '1px solid darkgrey',
                borderRadius: '4px',
                outline: 'inherit',
                color: colorMode === 'light' ? '#333' : '#fff',
                background: colorMode === 'light' ? 'white' : '#333',
                // border: '1px solid grey',
            }}
                onClick={handleCollapse}
            >
                <BiCollapseAlt size={15} title="Collapse All" />
            </button>
        </div> */}

        {/* if component has main proeprties, show */}
        {compPropertiesEditors[compMetadata.type as keyof typeof compPropertiesEditors].properties[0] !== null
            && <MainProperties>
                {compPropertiesEditors[compMetadata.type as keyof typeof compPropertiesEditors].properties}
            </MainProperties>
        }
        {/* show other properties */}
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

export default Properties;