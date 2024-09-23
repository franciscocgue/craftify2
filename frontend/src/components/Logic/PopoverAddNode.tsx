import { FaCirclePlus } from "react-icons/fa6";
import { Popover } from "react-tiny-popover";
import styles from './PopoverAddNode.module.css';
import { useState } from "react";

type PopoverAddNodeProps = {
    nodeId: string,
}

const PopoverAddNode = ({ nodeId }: PopoverAddNodeProps) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation(); // Prevents the event from bubbling up to parent nodes
        setIsOpen(!isOpen);
        console.log('Handle clicked', nodeId);
    };

    return <Popover
        isOpen={isOpen}
        positions={['bottom', 'right', 'top', 'left']} // if you'd like, you can limit the positions
        padding={10} // adjust padding here!
        reposition={true} // prevents automatic readjustment of content position that keeps your popover content within its parent's bounds
        onClickOutside={() => setIsOpen(false)} // handle click events outside of the popover/target here!
        content={({ position, nudgedLeft, nudgedTop }) => ( // you can also provide a render function that injects some useful stuff!
            <div className={styles['popover-wrapper']}>
                <div className={styles['popover-header']}>
                    Navigation
                </div>
                <div className={styles['popover-actions']}>
                    <button
                        className={styles['popover-action']}
                        onClick={() => {
                            setIsOpen(false);
                        }}
                    >
                        Open URL
                    </button>
                    <button
                        className={styles['popover-action']}
                        onClick={() => {
                            setIsOpen(false);
                        }}
                    >
                        Back
                    </button>
                    <button
                        className={styles['popover-action']}
                        onClick={() => {
                            setIsOpen(false);
                        }}
                    >
                        Forward
                    </button>
                </div>
                <div className={styles['popover-header']}>
                    Components
                </div>
                <div className={styles['popover-actions']}>
                    <button
                        className={styles['popover-action']}
                        onClick={() => {
                            setIsOpen(false);
                        }}
                    >
                        Change visibility
                    </button>
                    <button
                        className={styles['popover-action']}
                        onClick={() => {
                            setIsOpen(false);
                        }}
                    >
                        Enable / Disable
                    </button>
                </div>
                <div className={styles['popover-header']}>
                    Data operations
                </div>
                <div className={styles['popover-header']}>
                    Logic Control
                </div>
            </div>
        )}
    >
        {/* <div onClick={() => setIsPopoverOpen(!isPopoverOpen)}>Click me!</div> */}
        <div
            // style={{
            //   width: '20px',
            //   height: '20px',
            //   position: 'relative',
            //   left: '-8px',
            //   backgroundColor: 'blue',
            //   borderRadius: '50%',
            //   display: 'flex',
            //   justifyContent: 'center',
            //   alignItems: 'center',
            //   color: 'white',
            //   fontSize: '12px',
            // }}
            onClick={handleClick}
        >
            <FaCirclePlus style={{backgroundColor: 'white'}} color='blue' title='Add new node' />
            {/* <IoRemoveCircle title='Remove node'/> */}
        </div>
    </Popover>
}

export default PopoverAddNode;