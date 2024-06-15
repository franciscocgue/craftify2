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
    >
        Button
    </Button>
}

export default CButton;