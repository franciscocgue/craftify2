import { ReactNode } from "react"

interface propsT {
    children: ReactNode,
}

const CContainerColumn = ({ children, ...otherProperties }: propsT) => {

    // console.log('ttt', otherProperties.gap)

    return <div
        style={{
            ...otherProperties,
            // overwrite some styles like size and margins (reason: using wrapper in dev)
            width: '100%',
            height: '100%',
            minHeight: 'auto',
            marginTop: '0px',
            marginBottom: '0px',
            marginLeft: '0px',
            marginRight: '0px',
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