import { useState } from "react";
import PropertyGroupHeader from "../../helpers/components/PropertyGroupHeader";
import styles from './Property.module.css';
import InputCssLengthBasic from "./InputCssLengthBasic";


const Margin = () => {

    const [isCollapsed, setIsCollapsed] = useState(true);

    return <div>
        <PropertyGroupHeader info={"Component's margin styling"} isCollapsed={isCollapsed} title="Margin" setIsCollapsed={setIsCollapsed} />
        {!isCollapsed && <div className={styles.wrapper}>
            <>
                <InputCssLengthBasic propertyDisplayName={
                    <div
                        key={'margin-top'}
                        title="Top"
                        style={{ width: '26px', height: '17px', border: '1px solid grey', borderTop: '5px solid grey' }}
                    ></div>} propertyKey="marginTop" />
                <InputCssLengthBasic propertyDisplayName={
                    <div
                        key={'margin-right'}
                        title="Right"
                        style={{ width: '26px', height: '17px', border: '1px solid grey', borderRight: '5px solid grey' }}
                    ></div>} propertyKey="marginRight" />
                <InputCssLengthBasic propertyDisplayName={
                    <div
                        key={'margin-bottom'}
                        title="Bottom"
                        style={{ width: '26px', height: '17px', border: '1px solid grey', borderBottom: '5px solid grey' }}
                    ></div>} propertyKey="marginBottom" />
                <InputCssLengthBasic propertyDisplayName={
                    <div
                        key={'margin-left'}
                        title="Left"
                        style={{ width: '26px', height: '17px', border: '1px solid grey', borderLeft: '5px solid grey' }}
                    ></div>} propertyKey="marginLeft" />
            </>
        </div>}
    </div>
}

export default Margin;