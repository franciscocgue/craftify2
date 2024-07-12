import { memo } from "react";
import useDesignerStore from "../../stores/designer";
import MyInput from "./MyInput";

const SidebarProperties = memo(() => {

    console.log('C - SidebarProperties')

    const selectedId = useDesignerStore((state) => state.selectedId);
    const properties = useDesignerStore((state) => state.properties);

    // console.log('PROPERTIES')
    // if (properties[selectedId]) {
    //     console.log(properties[selectedId])
    // }

    return <div style={{ width: '300px', border: '1px solid grey', overflowY: 'auto' }}>
        {selectedId}

        {selectedId && <>{Object.keys(properties[selectedId]).map(p => (
            <MyInput componentId={selectedId} name={p} val={properties[selectedId][p]} key={selectedId + p} />
        ))}
        </>}
    </div>
})

export default SidebarProperties;