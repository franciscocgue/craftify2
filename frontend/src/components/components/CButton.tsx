import { Button } from "@chakra-ui/react"

const CButton = ({ ...otherProperties }) => {
    return <Button
        w={'100%'}
        h={'100%'}
        size='md'
        p={otherProperties.p || undefined}
        border={otherProperties.border || undefined}
        maxW={otherProperties.w || undefined}
        maxH={otherProperties.h || undefined}
    >
        Button
    </Button>
}

export default CButton;