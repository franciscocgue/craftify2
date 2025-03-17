import InputText from "../InputText";

type PPlaceholderProps = {
    label?: string,
}

const PPlaceholder = ({label}: PPlaceholderProps) => {

    return <div>

        <p style={{ fontSize: 'small' }}>{label ?? 'Placeholder'}</p>

        <InputText
            propertyKey="__placeholder"
            // tooltipContent={tooltipContent}
            isValidInput={() => true}
        />
    </div>

    // </div>
}

export default PPlaceholder;