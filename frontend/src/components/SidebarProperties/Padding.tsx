import { useState } from "react";
import PropertyGroupHeader from "../../helpers/components/PropertyGroupHeader";
import styles from './Property.module.css';
import InputCssLengthBasic from "./InputCssLengthBasic";


const Padding = () => {

    const [isCollapsed, setIsCollapsed] = useState(true);

    return <div>
        <PropertyGroupHeader info={"Component's padding styling"} isCollapsed={isCollapsed} title="Padding" setIsCollapsed={setIsCollapsed} />
        {!isCollapsed && <div className={styles.wrapper}>
            <>
                <InputCssLengthBasic propertyDisplayName={
                    <div
                        key={'padding-top'}
                        title="Top"
                        style={{ width: '26px', height: '17px', border: '1px solid grey', borderTop: '5px solid grey' }}
                    ></div>} propertyKey="paddingTop" />
                <InputCssLengthBasic propertyDisplayName={
                    <div
                        key={'padding-right'}
                        title="Right"
                        style={{ width: '26px', height: '17px', border: '1px solid grey', borderRight: '5px solid grey' }}
                    ></div>} propertyKey="paddingRight" />
                <InputCssLengthBasic propertyDisplayName={
                    <div
                        key={'padding-bottom'}
                        title="Bottom"
                        style={{ width: '26px', height: '17px', border: '1px solid grey', borderBottom: '5px solid grey' }}
                    ></div>} propertyKey="paddingBottom" />
                <InputCssLengthBasic propertyDisplayName={
                    <div
                        key={'padding-left'}
                        title="Left"
                        style={{ width: '26px', height: '17px', border: '1px solid grey', borderLeft: '5px solid grey' }}
                    ></div>} propertyKey="paddingLeft" />
            </>
        </div>}
    </div>
}

export default Padding;