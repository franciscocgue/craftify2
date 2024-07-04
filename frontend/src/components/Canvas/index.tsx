import useDesignerStore from "../../stores/designer";
import { renderNode } from "../../helpers/ui-builder";
import { useMemo } from "react";

const screenSizes = {
    'Galaxy S10': [360, 760],
    'Laptop': [1280, 800]
}

const device = "Galaxy S10";

const Canvas = () => {

    console.log('C - Canvas')


    const components = useDesignerStore((state) => state.components);
    const properties = useDesignerStore((state) => state.properties);

    // console.log(properties)
    // console.log(components)

    const comps = useMemo(
        () => renderNode(components, 'canvas', properties),
        [components, properties]
    );

    return <div
        style={{
            flex: 1,
            display: 'flex',
            border: '1px solid grey',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'center',
            overflowY: 'hidden',
            overflowX: 'auto'
        }}
    // backgroundColor={'red'}
    >
        {comps}
    </div>
};

export default Canvas;