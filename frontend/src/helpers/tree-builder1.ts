import { ComponentCollection, ComponentLeaf1 } from "../vite-env";

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
        // no children
        // @TODO: in component config create master data fpor container-like comp types
        if (['container-row', 'canvas', 'container-column'].includes(data[id].type)) {
            // container
            parent.push({
                key: id,
                title: data[id].name,
                type: data[id].type,
                children: [],
                readOnly: false,
            })
        } else {
            // component
            parent.push({
                key: id,
                title: data[id].name,
                type: data[id].type,
                readOnly: false,
            })
        }
    }
}

export { componentsAsTree1 }