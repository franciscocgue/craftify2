const CButton = ({ ...otherProperties }) => {
    return <button
        style={{
            ...otherProperties,
            // overwrite some styles (reason: using wrapper in dev)
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            maxHeight: '100%',
            // color: otherProperties.color || undefined,
            // backgroundColor: otherProperties.backgroundColor || undefined,
            // outline: otherProperties.borderTopStyle || undefined,
            // borderTopStyle: otherProperties.borderTopStyle || undefined,
            // borderTopWidth: otherProperties.borderTopWidth || undefined,
            // borderTopColor: otherProperties.borderTopColor || undefined,
            // borderBottomStyle: otherProperties.borderBottomStyle || undefined,
            // borderBottomWidth: otherProperties.borderBottomWidth || undefined,
            // borderBottomColor: otherProperties.borderBottomColor || undefined,
            // borderLeftStyle: otherProperties.borderLeftStyle || undefined,
            // borderLeftWidth: otherProperties.borderLeftWidth || undefined,
            // borderLeftColor: otherProperties.borderLeftColor || undefined,
            // borderRightStyle: otherProperties.borderRightStyle || undefined,
            // borderRightWidth: otherProperties.borderRightWidth || undefined,
            // borderRightColor: otherProperties.borderRightColor || undefined,
        }}
    >
        Button
    </button>
}

export default CButton;