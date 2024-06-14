import { Flex } from "@chakra-ui/react"
import { CSSProperties, ReactNode } from "react"

interface propsT {
    children: ReactNode,
}

const styles: CSSProperties = {
    minHeight: '30px',
}

const CContainerColumn = ({ children }: propsT) => {
    return <Flex style={styles} direction={'column'} wrap={'nowrap'} alignItems={'center'} gap={2} h={'auto'} w={'100%'}>
        {children}
    </Flex>
}

export default CContainerColumn;