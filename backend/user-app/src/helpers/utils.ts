import { Properties, Variable } from '../types/index.types';
import { getValue, myParser } from './dsl-utils';
// import variablesData from './../variables.json';

// const variables: Variable[] = __APP_CONFIG_VARIABLES__ as Variable[];
// const variables: Variables = variablesData as Variables;


/**
 * If there are properties linked to variables,
 * then will convert those to actual values.
 *
 * Use Case: text:{{name}} to text:'James'
 *
 * Used for overlay margins and re-resizable.
 *
 * @param {Properties} properties - Object with a single component's properties
 * @returns Array with 1st element as parsed Properties, 2nd link of propertyKeys and variables used, 3rd all variables used in comp
 */
const parseProperties = (properties: Properties, variables: Variable[]): [Properties, Record<string, string[]>, string[]] => {

    // const variables = useDesignerStore((state) => state.variables);
    // const variables = useVariableStore((state) => state.variables);

    const parsedProperties = { ...properties };
    // link properties to used variables
    const propsWithVariables: Record<string, string[]> = {};
    const allVariablesUsed: string[] = [];

    // console.log('debug', parsedProperties);
    Object.keys(properties).forEach(key => {
        const propertyKey = key as keyof Properties;
        const propertyValue = properties[propertyKey];

        if (typeof propertyValue === 'string') {

            // DSL (user custom expressions)
            try {
                if (propertyValue.slice(0, 2) === '{{' && propertyValue.slice(-2) === '}}') {
                    const [parsedAstObj, variablesUsed] = myParser(propertyValue.slice(2, -2), variables);
                    const val = getValue(parsedAstObj, [], variables);
                    parsedProperties[propertyKey as keyof typeof properties] = val as any;

                    propsWithVariables[propertyKey] = variablesUsed;
                    allVariablesUsed.push(...variablesUsed);
                }
            } catch (err) {
                console.log(err);
            }
        }
    });

    return [parsedProperties, propsWithVariables, allVariablesUsed]
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
}