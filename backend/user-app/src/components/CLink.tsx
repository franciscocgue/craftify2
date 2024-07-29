import React from "react";
import { parseProperties } from "../helpers/utils";

const CLink = ({...otherProperties }) => {
    const parsedProperties = parseProperties(otherProperties);
    return <>
        <a
            href={parsedProperties.__href}
            target={parsedProperties.__target}
            style={{
                ...parsedProperties,
            }}
        >
            {parsedProperties.__text}
        </a>
    </>
}

export default CLink;