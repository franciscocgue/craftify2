import { TreeNode } from "rc-tree";
import { ComponentCollection, ComponentLeaf1 } from "../vite-env";
import { compTypes } from "../config/components";
import { CgScreen } from "react-icons/cg";
import { FiPlusCircle } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useCallback } from "react";
import useDesignerStore from "../stores/designer";
import { useToast } from "@chakra-ui/react";

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

    const { removeComponent } = useDesignerStore(
        useCallback(
            (state) => ({
                removeComponent: state.removeComponent,
            }),
            []
        )
    );

    const toast = useToast()

    return <span
        style={{ display: 'flex', alignItems: 'center' }}
        className="rc-tree-title"
        title={compTypes[props.node.type]?.name || 'Canvas'}
    >
        {props.node.title}
        {props.node.type !== 'canvas' && <><FiPlusCircle className="my-add-icon" title="New" size={17} />
            <RiDeleteBin2Line className="my-delete-icon" title="Delete" size={17} onClick={() => {
                removeComponent(props.node.key);
                toast({
                    title: 'Deleted',
                    status: 'success',
                    duration: 1500,
                    // isClosable: true,
                })
            }} /></>}
    </span>
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