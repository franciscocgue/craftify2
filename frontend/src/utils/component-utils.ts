import { ComponentCollection } from "../types/designer.types";


/**
 * Get children component IDs of a given component node.
 *
 * @param {string} node - node ID whose children are searched
 * @param {Component[]} components - components object
 * @returns {string[]} children
 */
const getChildrenNodes = (node: string, components: ComponentCollection) => {

    if (!components[node]) {
        // adding new component
        return []
    }

    function _reduce(acc: string[], child: string): string[] {
        acc.push(child)
        if (!components[child].children) {
            return acc
        }
        return components[child].children.reduce(_reduce, acc)
    }

    return components[node].children.reduce(_reduce, [])
}



export {
    getChildrenNodes
}