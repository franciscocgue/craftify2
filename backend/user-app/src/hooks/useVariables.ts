import { useVariableStore } from "../stores/variableStore";
import { parseProperties } from "../helpers/utils";
import { Properties } from "../types/index.types";

// subscribes component to variables' changes,
// returning parsedProperties and object linking property names and variable names (to use in 2-way bindings)
const useDynamicVariables = (otherProperties: Properties): [Properties, Record<string, string[]>] => {

    const variables = useVariableStore((state) => state.variables);
    const [parsedProperties, propsWithVariables, allVariablesUsed] = parseProperties(otherProperties, variables);

    // re-render on linked variables changed
    useVariableStore((state) => {
        state.variables.filter(variable => allVariablesUsed.includes(variable.key))
    });

    return [parsedProperties, propsWithVariables];

};


export {
    useDynamicVariables,
}