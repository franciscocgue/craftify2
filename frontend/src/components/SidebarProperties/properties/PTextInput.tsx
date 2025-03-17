import InputText from "../InputText";

type PTextInputProps = {
    label?: string,
}

const PTextInput = ({label}: PTextInputProps) => {

    return <div>

        <p style={{ fontSize: 'small' }}>{label ?? 'Content'}</p>

        <InputText
            propertyKey="__textinputcontent"
            // tooltipContent={tooltipContent}
            isValidInput={() => true}
        />
    </div>

    // </div>
}

export default PTextInput;