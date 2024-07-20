import { ComponentCollection } from "../vite-env"

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

    function _reduce(acc: string[], child: string) {
        acc.push(child)
        if (!components[child].children) {
            return acc
        }
        return components[child].children.reduce(_reduce, acc)
    }

    return components[node].children.reduce(_reduce, [])
}

/**
 * Convert a CSS length to px. 
 * 
 * Use Case: for the margin overlay, if margin is provided as %,
 * the actual px based on the parent size is computed (otherwise
 * overlay size will be based on % and component size)
 * 
 * Used for overlay margins and re-resizable.
 *
 * @param {string} margin - margin CSS length (20px, 10%, etc.).
 * @param {CSSStyleDeclaration} parentStyles - Parent styles (output of window.getComputedStyle(ref.current.resizable?.parentElement)).
 * @returns {numer} Margin as px.
 */
const marginAsPx = (margin: string, parentStyles: CSSStyleDeclaration) => {

    const regexPx = /^\d+px$/;
    if (regexPx.test(margin)) return parseInt(margin) // px format

    if (!margin || !parentStyles || !parentStyles?.width) return 0 // wrong inputs, no margin then

    const regexPercentage = /^\d+%$/;
    const percentageFormat = regexPercentage.test(margin);

    if (percentageFormat && margin !== '0%') {
        let length = parseFloat(margin.replace('%', ''));
        let parentLength = parseFloat(parentStyles.width.replace('px', ''));
        return Math.floor(length / 100 * parentLength)
    } else {
        // @TODO: support other CSS length units for margin apart from % and px
        return 0
    }
}


export {
    getChildrenNodes,
    marginAsPx
}