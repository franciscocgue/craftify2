import { useCallback, useRef } from "react"
import useDesignerStore from "../stores/designer"
import { ComponentCollection, Properties } from "../vite-env"
import { debounce } from "lodash"

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


/**
 * If there are properties linked to variables, 
 * then will convert those to actual values.
 * 
 * Use Case: text:{{name}} to text:'James'
 * 
 * Used for overlay margins and re-resizable.
 *
 * @param {Properties} properties - Object with a single component's properties
 * @returns {Properties} Properties with static (parsed) values
 */
const parseProperties = (properties: Properties) => {
    const variables = useDesignerStore((state) => state.variables);
    const parsedProperties = { ...properties };
    console.log('debug', parsedProperties)
    Object.keys(properties).forEach(p => {
        if (properties[p]) {
            parsedProperties[p as keyof typeof properties] = properties[p].replace(/{{([^}]*)}}/g, (match, p1) => {
                const varName = p1.trim(); // extracted text
                console.log('varName', varName)
                if (variables[varName]) {
                    return `${variables[varName]['initialValue']}`;
                }
            });
        }
    })

    return parsedProperties;
}


// Type for the debounced function (avoid ts error on cancel method)
type DebouncedFunction = {
    (id: string): void;
    cancel: () => void;
};

const useDebouncedMouseEnter = (setStatus: (selectedId: string | null) => void) => {
    // Use a ref to track the debounced update
    const debouncedUpdateRef = useRef<DebouncedFunction | null>(null);

    // Debounce function to ensure a final update after inactivity
    const debouncedUpdate = useCallback(debounce((id) => {
        setStatus(id);
    }, 300), [setStatus]);

    const handleMouseEnter = useCallback((id: string) => {
        // Clear any existing debounce
        if (debouncedUpdateRef.current) {
            debouncedUpdateRef.current.cancel();
        }

        // Perform debounced update
        debouncedUpdateRef.current = debouncedUpdate;
        debouncedUpdate(id);
    }, [debouncedUpdate]);

    const handleMouseLeave = useCallback(() => {
        // Clear the debounced update on mouse leave
        if (debouncedUpdateRef.current) {
            debouncedUpdateRef.current.cancel();
        }
        setStatus(null); // Optionally clear status on leave
    }, [setStatus]);

    return { handleMouseEnter, handleMouseLeave };
};

function extractNumberAndUnit(input: string): { numberPart: number, unitPart: string } | null {
    // regEx to match the number part at the beginning of the string
    const match = input.match(/^([+-]?\d*\.?\d+)(.*)$/);

    if (match) {
        // Parse the matched number part
        const numberPart = parseFloat(match[1]);

        // Extract the unit part
        const unitPart = match[2].trim();

        return { numberPart, unitPart };
    } else {
        // If the input does not match the pattern
        return null;
    }
}

// validity examples: 100%, 50px, calc(...), min(...), max(...), auto
function isValidCssLength(value: string): boolean {
    // Regular expressions for the individual components
    const number = '\\d+(\\.\\d+)?';
    const unit = '(px|%)';
    const length = `(${number}${unit})`;
    const variable = '\\{\\{[a-zA-Z_$][a-zA-Z0-9_$]*\\}\\}'; // matches {{variableName}}
    const variableLength = `(${variable}${unit})`;
    const operator = '(\\s\\+\\s|\\s\\-\\s|\\*|\\/)'; // " + " or " - " or "*" or "/"
    const calcNumber = `(${number})`; // Number without unit for multiplication and division

    // Regular expressions for the functions
    const functionArgument = `(${length}|${variableLength}|${calcNumber}|auto|\\s*calc\\([^()]*\\)\\s*|\\s*min\\([^()]*\\)\\s*|\\s*max\\([^()]*\\)\\s*)`;
    const calcFunction = `calc\\(\\s*${functionArgument}(\\s*${operator}\\s*${functionArgument})*\\s*\\)`;
    const minFunction = `min\\(\\s*${functionArgument}(\\s*,\\s*${functionArgument})*\\s*\\)`;
    const maxFunction = `max\\(\\s*${functionArgument}(\\s*,\\s*${functionArgument})*\\s*\\)`;

    // Full regular expression combining lengths, variable lengths, and functions
    const cssLengthPattern = new RegExp(`^\\s*(${length}|${variableLength}|auto|${calcFunction}|${minFunction}|${maxFunction})\\s*$`);

    return cssLengthPattern.test(value);
}

// Test cases
// console.log("100%", isValidCssLength("100%")); // true
// console.log("50px",isValidCssLength("50px")); // true
// console.log("{{myVariable}}px",isValidCssLength("{{myVariable}}px")); // true
// console.log("{{myVariable}}%",isValidCssLength("{{myVariable}}%")); // true
// console.log("calc(50% + 20px)",isValidCssLength("calc(50% + 20px)")); // true
// console.log("calc(50% - 20px)",isValidCssLength("calc(50% - 20px)")); // true
// console.log("calc(50%+20px)",isValidCssLength("calc(50%+20px)")); // false
// console.log("calc(50%-20px)",isValidCssLength("calc(50%-20px)")); // false
// console.log("calc(50px * 2)",isValidCssLength("calc(50px * 2)")); // true
// console.log("calc(50px / 2)",isValidCssLength("calc(50px / 2)")); // true
// console.log("min(50%, 20px)",isValidCssLength("min(50%, 20px)")); // true
// console.log("max(50%, 20px)",isValidCssLength("max(50%, 20px)")); // true
// console.log("calc(50px * 2 + min(10%, 20px))",isValidCssLength("calc(50px * 2 + min(10%, 20px))")); // true
// console.log("auto",isValidCssLength("auto")); // true
// console.log("calc(50% + 20em)",isValidCssLength("calc(50% + 20em)")); // false, invalid unit
// console.log("calc(50% + )",isValidCssLength("calc(50% + )")); // false, invalid syntax
// console.log("max(50%, 20px, 10%)",isValidCssLength("max(50%, 20px, 10%)")); // true
// console.log("min(100px)",isValidCssLength("min(100px)")); // true


// validity examples: 100%, 50px, auto
function isValidCssLengthBasic(value: string): boolean {
    // Regular expressions for the individual components
    const number = '\\d+(\\.\\d+)?';
    const unit = '(px|%)';
    const length = `(${number}${unit})`;
    const variable = '\\{\\{[a-zA-Z_$][a-zA-Z0-9_$]*\\}\\}'; // matches {{variableName}}
    const variableLength = `(${variable}${unit})`;

    // Full regular expression combining lengths, variable lengths, and functions
    const cssLengthPattern = new RegExp(`^\\s*(${length}|${variableLength}|auto|)\\s*$`);

    return cssLengthPattern.test(value);
}

// validity examples: 100%, 50px, auto
function isValidCssLengthBasicNoAuto(value: string): boolean {
    // Regular expressions for the individual components
    const number = '\\d+(\\.\\d+)?';
    const unit = '(px|%)';
    const length = `(${number}${unit})`;
    const variable = '\\{\\{[a-zA-Z_$][a-zA-Z0-9_$]*\\}\\}'; // matches {{variableName}}
    const variableLength = `(${variable}${unit})`;

    // Full regular expression combining lengths, variable lengths, and functions
    const cssLengthPattern = new RegExp(`^\\s*(${length}|${variableLength})\\s*$`);

    return cssLengthPattern.test(value);
}

function isValidPositiveNumber(value: string | number | null | undefined): boolean {
    // use with numeric input

    // not empty string
    if (value === '') {
        return false;
    }

    // not null nor undefined
    if (value === null || value === undefined) {
        return false;
    }

    // convert to number if it is a string
    const numberValue = typeof value === 'string' ? Number(value) : value;

    // conversion result is a valid number
    if (isNaN(numberValue)) {
        return false;
    }

    // non-negative
    if (numberValue < 0) {
        return false;
    }

    return true;
}

function isValidHexColor(hex: string): boolean {
    // Regular expression to match valid hex color formats
    const hexColorPattern = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
    return hexColorPattern.test(hex);
}
// Examples of usage:
// console.log(isValidHexColor("#2638c5")); // true
// console.log(isValidHexColor("#abc")); // true
// console.log(isValidHexColor("#2638c5ff")); // false
// console.log(isValidHexColor("2638c5")); // false
// console.log(isValidHexColor("#26g8c5")); // false




export {
    getChildrenNodes,
    marginAsPx,
    parseProperties,
    useDebouncedMouseEnter,
    extractNumberAndUnit,
    isValidCssLength,
    isValidCssLengthBasic,
    isValidCssLengthBasicNoAuto,
    isValidPositiveNumber,
    isValidHexColor,
}