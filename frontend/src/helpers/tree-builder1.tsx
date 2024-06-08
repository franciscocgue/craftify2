import { TreeNode } from "rc-tree";
import { ComponentCollection, ComponentLeaf1 } from "../vite-env";
import { compTypes } from "../config/components";
import { CgScreen } from "react-icons/cg";
import { FiPlusCircle } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useCallback, useEffect, useRef, useState } from "react";
import useDesignerStore from "../stores/designer";
import { Flex, Input, Tag, TagLabel, TagLeftIcon, useColorMode, useToast } from "@chakra-ui/react";
import { ArrowContainer, Popover } from "react-tiny-popover";
import { MdOutlineAdd } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

// convert components into
// nested format required
// by the tree

const componentsAsTree1 = (data: ComponentCollection, id: string, parent: ComponentLeaf1[]) => {
    if (data[id].children.length) {
        // has children
        parent.push({
            key: id,
            title: data[id].name,
            type: data[id].type,
            children: [],
            readOnly: false,
        })
        // const children = parent.children;
        data[id].children.forEach((child: string) => componentsAsTree1(data, child, parent[(parent.length - 1) as keyof typeof parent]?.children))
    } else {
        parent.push({
            key: id,
            title: data[id].name,
            type: data[id].type,
            children: [],
            readOnly: false,
        })
    }
}

const getIcon = (compTypeName: string) => {
    const IconComponent = compTypes[compTypeName].icon;
    return IconComponent ? <IconComponent /> : null;
};

const NodeTitle = ({ ...props }) => {

    const { colorMode } = useColorMode();

    const { removeComponent, addComponent } = useDesignerStore(
        useCallback(
            (state) => ({
                removeComponent: state.removeComponent,
                addComponent: state.addComponent,
            }),
            []
        )
    );

    const toast = useToast()

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const [value, setValue] = useState('')
    const handleChange = (event) => {
        setValue(event.target.value);
        setListOfCompTypes(Object.keys(compTypes).filter(ct => ct.indexOf(event.target.value) !== -1));
    }
    // myArray.filter(function (str) { return str.indexOf(PATTERN) === -1; }

    const [listOfCompTypes, setListOfCompTypes] = useState(Object.keys(compTypes))

    return <Popover
        isOpen={isPopoverOpen}
        containerStyle={{ zIndex: '11' }}
        onClickOutside={() => {
            setIsPopoverOpen(false);
        }}
        // reposition={false}
        positions={['right', 'top', 'bottom']} // preferred positions by priority
        content={({ position, childRect, popoverRect }) => (
            <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
                position={position}
                childRect={childRect}
                popoverRect={popoverRect}
                arrowColor={'rgb(66, 153, 225)'}
                arrowSize={10}
                arrowStyle={{ opacity: 1 }}
                className='popover-arrow-container'
                arrowClassName='popover-arrow'
            >
                <Flex
                    opacity={1}
                    wrap={'wrap'}
                    gap={1}
                    bg={colorMode === 'light' ? 'white' : '#2D3748'}
                    border={'1px solid lightgray'}
                    padding={'1rem'}
                    borderRadius={'5px'}
                    w={'400px'}
                    boxShadow={"rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"}
                >
                    <IoMdClose cursor={'pointer'} onClick={() => {
                        setIsPopoverOpen(false);
                    }} />
                    <Input
                        value={value}
                        onChange={handleChange}
                        placeholder='Search...'
                        size='sm'
                        type='search'
                        marginBottom={'1rem'}
                    />
                    {listOfCompTypes.map(c => (
                        // <Tag cursor={'pointer'} variant='solid' colorScheme='blue'></Tag>
                        <Tag
                            cursor={'pointer'}
                            size={'md'}
                            key={c}
                            variant='solid'
                            colorScheme='blue'
                            onClick={() => {
                                // node.open();
                                addComponent(c, props.node.key, 'auto');
                                setIsPopoverOpen(false);
                                toast({
                                    title: `${compTypes[c as keyof typeof compTypes].name} created`,
                                    status: 'success',
                                    duration: 1500,
                                    // isClosable: true,
                                });
                            }}
                        >
                            <TagLeftIcon boxSize='15px' as={MdOutlineAdd} />
                            <TagLabel>{compTypes[c as keyof typeof compTypes].name}</TagLabel>
                        </Tag>
                    ))}
                </Flex>
            </ArrowContainer>
        )}
    >
        <span
            style={{ display: 'flex', alignItems: 'center' }}
            className="rc-tree-title"
            title={compTypes[props.node.type]?.name || 'Canvas'}
        >
            {props.node.title}

            {props.node.type !== 'canvas' && <RiDeleteBin2Line className="my-delete-icon" title="Delete" size={14} onClick={() => {
                removeComponent(props.node.key);
                toast({
                    title: 'Deleted',
                    status: 'success',
                    duration: 1500,
                    // isClosable: true,
                });
            }} />}

            <FiPlusCircle className="my-add-icon" title="New" size={14} onClick={() => {
                setIsPopoverOpen(!isPopoverOpen);
                setValue('');
                setListOfCompTypes(Object.keys(compTypes));
            }} />

        </span>
    </Popover>
}

const treeAsHtml = (node) => {
    if (!node.children) return null;

    return (
        <TreeNode key={node.key} title={<NodeTitle node={node} />} icon={() => {
            if (node.type === 'canvas') return <CgScreen />;
            return getIcon(node.type)
        }}>
            {node?.children.map(c => treeAsHtml(c))}
        </TreeNode>
    )
}

export { componentsAsTree1, treeAsHtml }