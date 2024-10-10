import { TreeNode } from "rc-tree";
import { ComponentLeaf } from "../types/designer.types";
import { ComponentCollection } from "../types/designer.types";
import { compTypes } from "../config/components";
import { CgScreen } from "react-icons/cg";
import { FiPlusCircle } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { memo, useState } from "react";
import useDesignerStore from "../stores/designer";
import { ArrowContainer, Popover } from "react-tiny-popover";
import { MdOutlineAdd } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

// convert components (flat list) into
// nested format required by the (rc-)tree

const componentsAsTree = (data: ComponentCollection, id: string, parent: ComponentLeaf[]) => {
    const newNode: ComponentLeaf = {
        key: id,
        title: data[id].name,
        type: data[id].type,
        children: [],
        readOnly: false,
    };
    parent.push(newNode);
    if (data[id].children.length) {
        // has children
        const children = newNode.children;
        if (children) {
            // const children = parent.children;
            data[id].children.forEach((child: string) => componentsAsTree(data, child, children))
        }
    }
}

const getComponentsAsTree = (components: ComponentCollection) => {
    const tree: ComponentLeaf[] = [];
    componentsAsTree(components, 'canvas', tree);
    return tree;
}

// get icon from CompTypes based on type
const getIcon = (compTypeName: string) => {
    const IconComponent = compTypes[compTypeName as keyof typeof compTypes].icon;
    return IconComponent ? <IconComponent /> : null;
};

// type nodeType = {
//     node: {
//         title: string,
//         key: string,
//         type: keyof typeof compTypes | 'canvas'
//     }
// }

interface NodeType {
    type: keyof typeof compTypes | 'canvas'
    key: string,
    title: string,
    children: NodeType[]
}
interface NodeTitleProps {
    node: NodeType
}
// rc-tree component tree title
const NodeTitle = memo(({ node }: NodeTitleProps) => {
    console.log('C - rc-tree Title')
    // const { colorMode } = useColorMode();
    const colorMode = useDesignerStore((state) => state.colorMode);

    // const { removeComponent, addComponent } = useDesignerStore(
    //     (state) => ({
    //         removeComponent: state.removeComponent,
    //         addComponent: state.addComponent,
    //     }),
    // );

    const removeComponent = useDesignerStore((state) => state.removeComponent);
    const addComponent = useDesignerStore((state) => state.addComponent);
    const toggleSelectedId = useDesignerStore((state) => state.toggleSelectedId);
    const duplicateComponent = useDesignerStore((state) => state.duplicateComponent);

    // const toast = useToast()
    const notify = {
        created: (msg: string) => toast(msg, { type: 'info', autoClose: 1500, position: 'bottom-right' }),
        deleted: (msg: string) => toast(msg, { type: 'info', autoClose: 1500, position: 'bottom-right' }),
    }

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const [value, setValue] = useState('')
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        setListOfCompTypes((Object.keys(compTypes) as (keyof typeof compTypes)[]).filter(ct => ct.indexOf(event.target.value) !== -1));
    }

    const [listOfCompTypes, setListOfCompTypes] = useState<(keyof typeof compTypes)[]>(Object.keys(compTypes) as (keyof typeof compTypes)[])

    return <Popover
        isOpen={isPopoverOpen}
        containerStyle={{ zIndex: '11' }}
        onClickOutside={() => {
            setIsPopoverOpen(false);
        }}
        positions={['right', 'top', 'bottom']} // preferred positions by priority
        content={({ position, childRect, popoverRect }) => (
            <ArrowContainer
                position={position}
                childRect={childRect}
                popoverRect={popoverRect}
                arrowColor={'rgb(66, 153, 225)'}
                arrowSize={10}
                arrowStyle={{ opacity: 1 }}
                className='popover-arrow-container'
                arrowClassName='popover-arrow'
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        opacity: 1,
                        flexWrap: 'wrap',
                        gap: '5px',
                        backgroundColor: colorMode === 'light' ? 'white' : '#2D3748',
                        border: '1px solid lightgray',
                        padding: '1rem',
                        borderRadius: '5px',
                        width: '400px',
                        boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                    }}
                >
                    <IoMdClose color={colorMode === 'dark' ? 'white' : 'black'} cursor={'pointer'} onClick={() => {
                        setIsPopoverOpen(false);
                    }} />
                    {/* <Input
                        value={value}
                        onChange={handleChange}
                        placeholder='Search...'
                        size='sm'
                        type='search'
                        marginBottom={'1rem'}
                    /> */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <input placeholder="Search..."
                            name="component-search"
                            type="search"
                            value={value}
                            onChange={handleChange}
                            style={{
                                padding: '6px 10px',
                                // outline: 'none',
                                marginBottom: '1rem',
                                backgroundColor: 'transparent',
                                border: `1px solid ${colorMode === 'dark' ? 'white' : 'black'}`,
                                color: colorMode === 'dark' ? 'white' : 'black',
                                fontSize: 'small',
                                borderRadius: '3px',
                                width: '60%',
                                opacity: 1
                            }}
                        />
                        {node.key !== 'canvas' && <button style={{
                            height: '30px',
                            width: '25%',
                        }} onClick={() => duplicateComponent(node.key)}>Duplicate</button>}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            // opacity: 1,
                            flexWrap: 'wrap',
                            gap: '5px',
                            rowGap: '5px',
                            // justifyContent: 'space-between',
                            // backgroundColor: colorMode === 'light' ? 'white' : '#2D3748',
                            // border: '1px solid lightgray',
                            // padding: '1rem',
                            // borderRadius: '5px',
                            // width: '400px',
                            // boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                        }}
                    >
                        {listOfCompTypes.map(c => (
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    fontSize: 'small',
                                    backgroundColor: colorMode === 'dark' ? 'rgba(0, 0, 0, 0.24)' : 'rgba(255, 255, 255, 0.80)',
                                    color: colorMode === 'dark' ? 'white' : 'black',
                                    border: '1px solid grey',
                                    borderRadius: '5px',
                                    padding: '4px 7px'
                                }}
                                key={c}
                                onClick={() => {
                                    addComponent(c, node.key, 'auto');
                                    setIsPopoverOpen(false);
                                    notify.created(`${compTypes[c as keyof typeof compTypes].name} created`);
                                    // toast({
                                    //     title: `${compTypes[c as keyof typeof compTypes].name} created`,
                                    //     status: 'success',
                                    //     duration: 1500,
                                    //     // isClosable: true,
                                    // });
                                }}
                            >
                                <MdOutlineAdd size={'15px'} />
                                <p>{compTypes[c as keyof typeof compTypes].name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </ArrowContainer>
        )}
    >
        <span
            style={{ display: 'flex', alignItems: 'center' }}
            className="rc-tree-title"
            title={compTypes[node.type as keyof typeof compTypes]?.name || 'Canvas'}
        >
            <span style={{ cursor: 'pointer' }} onClick={() => {
                setIsPopoverOpen(false);
                toggleSelectedId(node.key);
            }}>
                {node.title}
            </span>

            {node.type !== 'canvas' && <RiDeleteBin2Line className="my-delete-icon" title="Delete" size={14} onClick={() => {
                removeComponent(node.key);
                notify.deleted(`${node.title} deleted`)
            }} />}
            <FiPlusCircle className="my-add-icon" title="New" size={14} onClick={() => {
                setIsPopoverOpen(!isPopoverOpen);
                setValue('');
                setListOfCompTypes(Object.keys(compTypes) as (keyof typeof compTypes)[]);
            }} />

        </span>
    </Popover>
})

// create nested tree structure for
// TreeNodes in rc-tree (component tree)

const treeAsHtml = (node: NodeType, selectedId: string | null) => {
    if (!node.children) return null;
    return (
        <TreeNode
            style={{
                // outline: node.key === selectedId ? '1px solid green' : undefined,
                boxShadow: node.key === selectedId ? 'inset 2px 2px green, inset -2px -2px green' : undefined,
                // box-shadow: inset 2px 2px orange, inset -2px -2px orange;
                background: node.key === selectedId ? 'rgba(0,128,0,0.1)' : undefined,
                // color: node.key === selectedId ? 'white' : undefined
            }}
            key={node.key}
            title={<NodeTitle node={node} />}
            icon={() => {
                if (node.type === 'canvas') return <CgScreen />;
                return getIcon(node.type)
            }}
        >
            {node?.children.map((c) => treeAsHtml(c, selectedId))}
        </TreeNode>
    )
}



export {
    getComponentsAsTree,
    treeAsHtml,
}