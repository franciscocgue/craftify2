import React from "react";

const CLink = ({...otherProperties }) => {

    return <>
        <a
            href={otherProperties.__href}
            target={otherProperties.__target}
            style={{
                ...otherProperties,
            }}
        >
            {otherProperties.__text}
        </a>
    </>
}

export default CLink;