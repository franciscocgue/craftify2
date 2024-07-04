import { CSSProperties, ReactNode } from "react"

interface propsT {
    children: ReactNode,
}

const CContainerColumn = ({ children, ...otherProperties }: propsT) => {
    // console.log('ttt', otherProperties.gap)
    return <div
        style={{
            minHeight: '30px',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap', //otherProperties.wrap || undefined,
            alignItems: otherProperties.alignItems || undefined,
            gap: otherProperties.gap || undefined,
            height: '100%',
            width: '100%',
            // maxWidth='100%'
            // maxHeight='100%'
            border: otherProperties.border || undefined,
            padding: otherProperties.p || undefined,
            backgroundColor: otherProperties.bg || undefined,
            paddingTop: otherProperties.paddingTop || undefined,
            paddingBottom: otherProperties.paddingBottom || undefined,
            paddingLeft: otherProperties.paddingLeft || undefined,
            paddingRight: otherProperties.paddingRight || undefined,
        }}
    >
        {children}
    </div>
}

export default CContainerColumn;