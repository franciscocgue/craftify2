import { TreeNode } from "rc-tree";
import { ComponentCollection, ComponentLeaf1 } from "../vite-env";
import { compTypes } from "../config/components";
import { CgScreen } from "react-icons/cg";
import { FiPlusCircle } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useCallback, useState } from "react";
import useDesignerStore from "../stores/designer";
import { Flex, Tag, TagLabel, TagLeftIcon, useColorMode, useToast } from "@chakra-ui/react";
import { ArrowContainer, Popover } from "react-tiny-popover";
import { MdOutlineAdd } from "react-icons/md";

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

    return <Popover
        isOpen={isPopoverOpen}
        containerStyle={{ zIndex: '11' }}
        onClickOutside={() => setIsPopoverOpen(false)}
        // reposition={false}
        positions={['right', 'top', 'bottom']} // preferred positions by priority
        content={({ position, childRect, popoverRect }) => (
            <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
                position={position}
                childRect={childRect}
                popoverRect={popoverRect}
                arrowColor={colorMode === 'light' ? 'white' : 'black'}
                arrowSize={10}
                arrowStyle={{ opacity: 1 }}
                className='popover-arrow-container'
                arrowClassName='popover-arrow'
            >
                <Flex
                    opacity={1}
                    wrap={'wrap'}
                    gap={1}
                    bg={colorMode === 'light' ? 'white' : 'black'}
                    padding={'1rem'}
                    borderRadius={'10px'}
                    maxW={'500px'}
                >
                    {Object.keys(compTypes).map(c => (
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

            <FiPlusCircle className="my-add-icon" title="New" size={14} onClick={() => setIsPopoverOpen(!isPopoverOpen)} />

            {props.node.type !== 'canvas' && <RiDeleteBin2Line className="my-delete-icon" title="Delete" size={14} onClick={() => {
                removeComponent(props.node.key);
                toast({
                    title: 'Deleted',
                    status: 'success',
                    duration: 1500,
                    // isClosable: true,
                });
            }} />}
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