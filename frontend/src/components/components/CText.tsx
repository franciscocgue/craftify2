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
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
    </p>
}

export default CText;