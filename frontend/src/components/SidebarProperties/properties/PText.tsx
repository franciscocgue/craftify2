import InputText from "../InputText";

type PTextProps = {
    label?: string,
}

const PText = ({label}: PTextProps) => {

    return <div>

        <p style={{ fontSize: 'small' }}>{label ?? 'Text'}</p>

        <InputText
            propertyKey="__text"
            // tooltipContent={tooltipContent}
            isValidInput={() => true}
        />
    </div>

    // </div>
}

export default PText;