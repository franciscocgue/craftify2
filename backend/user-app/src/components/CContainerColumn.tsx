import React, { ReactNode } from "react"
import { parseProperties } from "../helpers/utils";

interface propsT {
    children: ReactNode,
}

const CContainerColumn = ({ children, ...otherProperties }: propsT) => {
    const parsedProperties = parseProperties(otherProperties);
    return <div
        style={{
            ...parsedProperties,
        }}
    >
        {children}
    </div>
}

export default CContainerColumn;