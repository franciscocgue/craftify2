import { Flex } from "@chakra-ui/react"
import { CSSProperties, ReactNode } from "react"

interface propsT {
    children: ReactNode,
}

const styles: CSSProperties = {
    minHeight: '30px',
}

const CContainerColumn = ({ children, ...otherProperties }: propsT) => {
    return <Flex
        style={styles}
        direction={'column'}
        wrap={otherProperties.wrap || undefined}
        alignItems={otherProperties.alignItems || undefined}
        gap={otherProperties.gap || undefined}
        h={'100%'}
        w={'100%'}
        maxW='100%'
        maxH='100%'
        border={otherProperties.border || undefined}
        p={otherProperties.p || undefined}
        bg={otherProperties.bg || undefined}
    >
        {children}
    </Flex>
}

export default CContainerColumn;