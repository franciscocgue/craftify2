import InputText from "../InputText";

const PHref = () => {

    return <div>
        <p style={{ fontSize: 'small' }}>URL</p>
        <InputText
            propertyKey="__href"
            // tooltipContent={tooltipContent}
            isValidInput={() => true}
        />
    </div>
}

export default PHref;