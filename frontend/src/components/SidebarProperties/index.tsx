import { memo } from "react";
import useDesignerStore from "../../stores/designer";

const SidebarProperties = memo(() => {

    console.log('C - SidebarProperties')

    const selectedId = useDesignerStore((state) => state.selectedId);
    const properties = useDesignerStore((state) => state.properties);
    const updateProperty = useDesignerStore((state) => state.updateProperty);

    // console.log('PROPERTIES')
    // if (properties[selectedId]) {
    //     console.log(properties[selectedId])
    // }

    return <div style={{width:'300px', border: '1px solid grey'}}>
        {selectedId}
        {/* {selectedId && <>{Object.keys(properties[selectedId]).map(p => (
            <InputGroup key={selectedId + p} size={'sm'}>
                <InputLeftAddon>{p}</InputLeftAddon>
                <Input
                    type='text'
                    value={properties[selectedId][p]}
                    onChange={(e) => {
                        // console.log('updating ' + p + ' with value as ' + e.target.value)
                        updateProperty(selectedId, p, e.target.value);
                    }}
                />
            </InputGroup>
        ))}</>} */}
        {/* {selectedId && Object.keys(properties[selectedId]).includes('m') && <Margin />} */}
    </div>
})

export default SidebarProperties;