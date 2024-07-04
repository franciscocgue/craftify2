const CButton = ({ ...otherProperties }) => {
    return <button
        style={{
            width: '100%',
            height: '100%',
            border: otherProperties.border || undefined,
            maxWidth: '100%',
            maxHeight: '100%',
            // @TODO / @NOTE / @THINKABOUTIT: 
            // when app exported, remove zIndex; zINdex is to ensure highlight outline is
            // seen and not cobered by buttons background 
            zIndex: '-1',
        }}
    >
        Button
    </button>
}

export default CButton;