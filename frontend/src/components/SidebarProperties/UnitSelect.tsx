import { useRadio, Box, useRadioGroup, HStack, Button, Flex } from "@chakra-ui/react"
import { useState } from "react"

// 1. Create a component that consumes the `useRadio` hook
function RadioCard(props) {
    const { getInputProps, getRadioProps } = useRadio(props)

    const input = getInputProps()
    const checkbox = getRadioProps()

    return (
        <Box as='label'>
            <input {...input} />
            <Box
                {...checkbox}
                cursor='pointer'
                borderWidth='1px'
                borderRadius='md'
                _checked={{
                    bg: 'teal.600',
                    color: 'white',
                    borderColor: 'teal.600',
                }}
                fontSize={'xs'}
                //   _focus={{
                //     boxShadow: 'outline',
                //   }}
                px={2}
                py={1}
            >
                {props.children}
            </Box>
        </Box>
    )
}

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
function Example() {
    const options = ['%', 'px']

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'framework',
        defaultValue: 'react',
        onChange: console.log,
    })

    const group = getRootProps()

    return (
        <HStack {...group}>
            {options.map((value) => {
                const radio = getRadioProps({ value })
                return (
                    <RadioCard key={value} {...radio}>
                        {value}
                    </RadioCard>
                )
            })}
        </HStack>
    )
}

const MySwitcher = ({ options }) => {
    const [selected, setSelected] = useState(options[0])
    return <Flex gap={'5px'} alignItems={'center'} ml={'5px'}>
        {options.map(opt => {
            return <Button
                size={'xs'}
                // bg= {opt === selected ? 'teal.600' : 'inherit'}
                // color= {opt === selected ? 'white' : 'inherit'}
                // borderColor= {opt === selected ? 'teal.600' : 'inherit'}
                // borderWidth={'1px'}
            >
                {opt}
            </Button>
        })}
    </Flex>
}

export default MySwitcher;