import InputColor from "../InputColor";

const PIconColor = () => {

    return <div>
        <p style={{ marginTop: '8px', fontSize: 'small' }}>Color</p>
        <InputColor propertyDisplayName={'Color'} propertyKey={['__iconColor']} />
    </div>
}

export default PIconColor;