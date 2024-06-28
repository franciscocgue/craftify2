import { Button } from "@chakra-ui/react"

const CButton = ({ ...otherProperties }) => {
    return <Button
        w={'100%'}
        h={'100%'}
        size='md'
        // padding removed, inconsistent with overall size and not needed
        // as content in button centered --> padding through sizing
        // p={otherProperties.p || undefined}
        border={otherProperties.border || undefined}
        maxW='100%'
        maxH='100%'
        // @TODO / @NOTE / @THINKABOUTIT: 
        // when app exported, remove zIndex; zINdex is to ensure highlight outline is
        // seen and not cobered by buttons background 
        zIndex={-1}
        // bg="whiteAlpha.200"
    >
        Button
    </Button>
}

export default CButton;