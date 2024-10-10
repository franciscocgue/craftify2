import { ReactNode } from "react"
import useDesignerStore from "../../stores/designer";

interface propsT {
    componentId: string,
    children: ReactNode,
}

const CContainerColumn = ({ componentId, children }: propsT) => {

    // console.log('ttt', otherProperties.gap)
    const otherProperties = useDesignerStore((state) => state.properties[componentId].values);

    return <div
        style={{
            ...otherProperties,
            // overwrite some styles like size and margins (reason: using wrapper in dev)
            // width: '100%',
            // height: 'auto',
            // minHeight: 'auto',
            // marginTop: '0px',
            // marginBottom: '0px',
            // marginLeft: '0px',
            // marginRight: '0px',
            // display: 'flex',
            // flexDirection: 'column',
            // flexWrap: otherProperties.flexWrap || undefined,
            // alignItems: otherProperties.alignItems || undefined,
            // gap: otherProperties.gap || undefined,
            // height: '100%',
            // width: '100%',
            // // maxWidth='100%'
            // // maxHeight='100%'
            // // border: otherProperties.border || undefined,
            // backgroundColor: otherProperties.backgroundColor || undefined,
            // paddingTop: otherProperties.paddingTop || undefined,
            // paddingBottom: otherProperties.paddingBottom || undefined,
            // paddingLeft: otherProperties.paddingLeft || undefined,
            // paddingRight: otherProperties.paddingRight || undefined,
        }}
    >
        {children}
    </div>
}

export default CContainerColumn;