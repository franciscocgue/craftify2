import { ComponentCollection, ComponentLeaf } from "../vite-env";

// convert components into
// nested format required
// by the tree

const componentsAsTree = (data: ComponentCollection, id: string, parent: ComponentLeaf[]) => {
    if (data[id].children.length) {
        // has children
        parent.push({
            id: id,
            name: data[id].name,
            type: data[id].type,
            children: [],
            readOnly: false,
        })
        // const children = parent.children;
        data[id].children.forEach((child: string) => componentsAsTree(data, child, parent[(parent.length - 1) as keyof typeof parent]?.children))
    } else {
        // no children
        // @TODO: in component config create master data fpor container-like comp types
        if (['container-row', 'canvas', 'container-column'].includes(data[id].type)) {
            // container
            parent.push({
                id: id,
                name: data[id].name,
                type: data[id].type,
                children: [],
                readOnly: false,
            })
        } else {
            // component
            parent.push({
                id: id,
                name: data[id].name,
                type: data[id].type,
                readOnly: false,
            })
        }
    }
}

export { componentsAsTree }