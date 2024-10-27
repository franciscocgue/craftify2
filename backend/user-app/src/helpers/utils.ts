import { Properties, Variables } from '../types/index.types';
import variablesData from './../variables.json';

const variables: Variables = variablesData as Variables;

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
    const parsedProperties = { ...properties };
    console.log('debug', parsedProperties);
    Object.keys(properties).forEach(key => {
        const propertyKey = key as keyof Properties;
        const propertyValue = properties[propertyKey];

        if (typeof propertyValue === 'string') {
            parsedProperties[propertyKey as keyof typeof properties] = propertyValue.replace(/{{([^}]*)}}/g, (match, p1) => {
                const varName = p1.trim(); // extracted text

                // console.log('varName', varName)
                if (variables[varName]) {
                    return `${variables[varName]['initialValue']}`;
                }
                return match;
            }) as any;
        }
    });

    return parsedProperties;
};


export {
    parseProperties,
}