import ChoiceChip from "../ChoiceChip";

const PTarget = () => {

    return <div>

        <p style={{ fontSize: 'small' }}>Where to open</p>
        <div style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            margin: '3px 0 17px 0',
        }}>
            <ChoiceChip display={'New window'} valueChip="_blank" propertyKey="__target"></ChoiceChip>
            <ChoiceChip display={'This window'} valueChip="_self" propertyKey="__target"></ChoiceChip>
        </div>

    </div>
}

export default PTarget;