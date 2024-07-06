import React, { ReactNode } from "react"

interface propsT {
    children: ReactNode,
}

const CContainerColumn = ({ children, ...otherProperties }: propsT) => {
    return <div
        style={{
            ...otherProperties,
        }}
    >
        {children}
    </div>
}

export default CContainerColumn;