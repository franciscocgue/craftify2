const CText = ({ ...otherProperties }) => {
    return <p
        style={{
            ...otherProperties,
            // overwrite some styles (reason: using wrapper in dev)
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            maxHeight: '100%',
        }}
    >
        Lorem ipsum dolor sit amet
    </p>
}

export default CText;