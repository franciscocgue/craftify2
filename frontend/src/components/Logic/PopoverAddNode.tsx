import { Popover } from "react-tiny-popover";
import lightStyles from './PopoverAddNodeLight.module.css';
import darkStyles from './PopoverAddNodeDark.module.css';
import { ReactElement, useState } from "react";
import { logicFunctions } from "../../config/logic";
import useDesignerStore from "../../stores/designer";
import { FunctionTypes, LogicNode } from "../../types/logic.types";
import { cloneDeep } from "lodash";


/**
 * 
 * @returns new node based on type
*/
const newNode = (nodeTpe: FunctionTypes): LogicNode<typeof nodeTpe> => ({
    id: crypto.randomUUID() as string,
    type: nodeTpe,
    position: { x: 150, y: 0 },
    data: cloneDeep(logicFunctions[nodeTpe].defaultData as LogicNode<typeof nodeTpe>['data'])
});

type PopoverAddNodeProps = {
    children: ReactElement,
}

const functions = Object.entries(logicFunctions).reduce((acc: Record<string, FunctionTypes[]>, curr) => {

    const functionKey = curr[0] as FunctionTypes;
    const functionMetadata = curr[1];

    if (functionMetadata.creatableByUser) {
        if (functionMetadata.parentType in acc) {
            acc[functionMetadata.parentType] = [...acc[functionMetadata.parentType], functionKey];
        } else {
            acc[functionMetadata.parentType] = [functionKey];
        }
    }

    return acc
}, {})

console.log({ functions })

// const functions = Object.entries(logicFunctions).reduce((acc:Object, curr: keyof typeof logicFunctions) => {
//     const currFun =  logicFunctions[curr];
//     return {acc}
// }, {})

const PopoverAddNode = ({ children }: PopoverAddNodeProps) => {

    const [isOpen, setIsOpen] = useState(false);

    const colorMode = useDesignerStore((state) => state.colorMode);
    const styles = colorMode === 'light' ? lightStyles : darkStyles;

    const addNode = useDesignerStore((state) => state.addNode);
    const selectedComponentId = useDesignerStore((state) => state.selectedId);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation(); // Prevents the event from bubbling up to parent nodes
        setIsOpen(!isOpen);
    };

    return <Popover
        isOpen={isOpen}
        positions={['bottom', 'right', 'top', 'left']} // if you'd like, you can limit the positions
        padding={10} // adjust padding here!
        reposition={true} // prevents automatic readjustment of content position that keeps your popover content within its parent's bounds
        onClickOutside={() => setIsOpen(false)} // handle click events outside of the popover/target here!
        content={() => ( // you can also provide a render function that injects some useful stuff!
            <div className={styles['popover-wrapper']}>
                <p className={styles['popover-header']}>Functions</p>
                {Object.keys(functions).map(group => <div key={group}>
                    <div className={styles['popover-group-name']}>
                        {group}
                    </div>
                    <div className={styles['popover-actions']}>
                        {functions[group].map(fun => {
                            return <button
                                key={fun}
                                className={styles['popover-action']}
                                onClick={() => {
                                    if (selectedComponentId) {
                                        addNode(selectedComponentId, newNode(fun))
                                    }
                                    setIsOpen(false);
                                }}
                            >
                                {logicFunctions[fun as keyof typeof logicFunctions].displayName}
                            </button>
                        })}
                    </div>
                </div>)}
            </div>
        )}
    >
        <div
            onClick={handleClick}
            style={{ display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center' }}
        >
            {/* <FaCirclePlus style={{backgroundColor: 'white'}} color='blue' title='Add new node' /> */}
            {children}
        </div>
    </Popover>
}

export default PopoverAddNode;