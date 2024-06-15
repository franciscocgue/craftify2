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
        wrap={'nowrap'}
        alignItems={'center'}
        gap={2}
        h={'100%'}
        w={'100%'}
        maxW='100%'
        maxH='100%'
        border={otherProperties.border || undefined}
        p={otherProperties.p || undefined}
    >
        {children}
    </Flex>
}

export default CContainerColumn;