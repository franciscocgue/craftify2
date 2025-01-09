import { useVariableStore } from '../stores/variableStore';
import { Properties } from '../types/index.types';
// import variablesData from './../variables.json';

// const variables: Variable[] = __APP_CONFIG_VARIABLES__ as Variable[];
// const variables: Variables = variablesData as Variables;

// /**
//  * If there are properties linked to variables, 
//  * then will convert those to actual values.
//  * 
//  * Use Case: text:{{name}} to text:'James'
//  * 
//  * Used for overlay margins and re-resizable.
//  *
//  * @param {Properties} properties - Object with a single component's properties
//  * @returns {Properties} Properties with static (parsed) values
//  */
// const parseProperties = (properties: Properties) => {
//     // const variables = useDesignerStore((state) => state.variables);
//     const parsedProperties = { ...properties };
//     // console.log('debug', parsedProperties)
//     Object.keys(properties).forEach(p => {
//         if (properties[p]) {
//             parsedProperties[p as keyof typeof properties] = properties[p].replace(/{{([^}]*)}}/g, (match, p1) => {
//                 const varName = p1.trim(); // extracted text
//                 console.log('varName', varName)
//                 if (variables[varName]) {
//                     return `${variables[varName]['initialValue']}`;
//                 }
//             });
//         }
//     })

//     return parsedProperties;
// }

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
    // const variables = useDesignerStore((state) => state.variables);
    const variables = useVariableStore((state) => state.variables);
    const parsedProperties = { ...properties };
    // console.log('debug', parsedProperties);
    Object.keys(properties).forEach(key => {
        const propertyKey = key as keyof Properties;
        const propertyValue = properties[propertyKey];

        if (typeof propertyValue === 'string') {
            const matches = propertyValue.match(/{{([^}]*)}}/g);
            if (matches && matches.length === 1 && matches[0] === propertyValue) {
                // single value; eg {{param1}} --> parse as actual value
                const parsedValue = matches[0].slice(2, -2); // remove {{}}

                const variable = variables.find(v => v.key === parsedValue);
                if (variable) {
                    parsedProperties[propertyKey as keyof typeof properties] = variable['value'] as any;
                }
            } else {
                // parse as string
                parsedProperties[propertyKey as keyof typeof properties] = propertyValue.replace(/{{([^}]*)}}/g, (match, p1) => {
                    const varName = p1.trim(); // extracted text
                    console.log({ varName })
                    // console.log('varName', varName)
                    const variable = variables.find(v => v.key === varName);
                    if (variable) {
                        return variable['value'];
                    }
                    return match;
                }) as any;
            }
        }
    });

    return parsedProperties;
};

/**
 * If there are properties linked to variables,
 * returns an object linking them.
 *
 * Use Case: prop1: {{var21}} --> {prop1: [var21]}
 *
 * @param {Properties} properties - Object with a single component's properties
 * @returns {Record<string, string[]>} object linking prop names and variable names
 */
const getDynamicVariables = (properties: Properties) => {

    // const variables = useVariableStore((state) => state.variables);
    const variables = useVariableStore.getState().variables;
    const propsWithVariables: Record<string, string[]> = {}; // {prop1: [var1, var2]}
    const variableKeys: string[] = [];

    Object.keys(properties).forEach(key => {
        const propertyKey = key as keyof Properties;
        const propertyValue = properties[propertyKey];

        if (typeof propertyValue === 'string') {
            // find variables
            const matches = propertyValue.match(/{{([^}]*)}}/g);

            if (matches) {
                propsWithVariables[propertyKey] = [];
                for (let match of matches) {

                    // remove {{}}
                    const variableKey = match.slice(2, -2);

                    // add if exists and not yet added
                    if (variables.find(v => v.key === variableKey)
                        && !variableKeys.includes(variableKey)) {
                        propsWithVariables[propertyKey].push(variableKey);
                        variableKeys.push(variableKey);
                    }
                }
            }
        }
    });

    // return variableKeys;
    return propsWithVariables;
};

/**
 * Converts autoClose user input into 
 * react-toastify's format
 * 
 * @param autoClose 
 * @returns 
 */
const parseToastAutoClose = (autoClose: string) => {
    const parsedInt = parseInt(autoClose);
    if (isNaN(parsedInt)) {
        // default if error
        return 2500;
    };
    if (parsedInt <= 0) {
        return false;
    };
    return parsedInt;
}


export {
    parseProperties,
    parseToastAutoClose,
    getDynamicVariables,
}