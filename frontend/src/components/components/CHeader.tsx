const CHeader = ({ ...otherProperties }) => {
    return <h2
        style={{
            ...otherProperties,
            // overwrite some styles (reason: using wrapper in dev)
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            maxHeight: '100%',
        }}
    >
        Some Header
    </h2>
}

export default CHeader;