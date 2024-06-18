import { NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";
import { useState } from "react";
import Example from "./UnitSelect";
import MySwitcher from "./UnitSelect";
import { BsDisplay } from "react-icons/bs";

const Margin = () => {

    // const format = (val) => val + `px`
    // const parse = (val) => val.replace(/^\px/, '')

    const [value, setValue] = useState('0')

    return <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
        <div style={{ display: 'flex' }}>
            <NumberInput
                onChange={(valueString) => setValue(valueString)}
                value={value}
                size='sm' w={'70px'} defaultValue={15} min={0} precision={0}>
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            <MySwitcher options={['px', '%']} />
        </div>
        <div style={{ display: 'flex', height: 75, margin: '5px 0' }}>
            <div style={{ marginRight: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center', justifyItems: 'center' }}>
                <NumberInput
                    onChange={(valueString) => setValue(valueString)}
                    value={value}
                    size='sm' w={'70px'} defaultValue={15} min={0} precision={0} mb={'5px'}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <MySwitcher options={['px', '%']} />
            </div>
            <div style={{ padding: '0 35px', border: '1px solid grey', borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent: 'center', justifyItems: 'center' }}>content</div>
            <div style={{ marginLeft: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center', justifyItems: 'center' }}>
                <NumberInput
                    onChange={(valueString) => setValue(valueString)}
                    value={value}
                    size='sm' w={'70px'} defaultValue={15} min={0} precision={0} mb={'5px'}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <MySwitcher options={['px', '%']} />
            </div>
        </div>
        <div style={{ display: 'flex' }}>
            <NumberInput
                onChange={(valueString) => setValue(valueString)}
                value={value}
                size='sm' w={'70px'} defaultValue={15} min={0} precision={0}>
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            <MySwitcher options={['px', '%']} />
        </div>



    </div>
}

export default Margin;