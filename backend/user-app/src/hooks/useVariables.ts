import { useEffect, useState } from "react";
import { useVariableStore } from "../stores/variableStore";
import { getDynamicVariables } from "../helpers/utils";
import { Properties } from "../types/index.types";

// subscribes component to variables' changes,
// returning object linking property names and variable names
const useDynamicVariables = (otherProperties: Properties) => {

    const [variableDependencies, setVariableDependencies] = useState<string[]>([]);
    const [propsWithVariables, setPropsWithVariables] = useState<Record<string, string[]>>({});

    useEffect(() => {
        // get dynamic variables used in component; just once
        const propsWithVariables_ = getDynamicVariables(otherProperties);
        const variables = Object.values(propsWithVariables_)
            .reduce((prev, curr) => {
                const cum = [...prev, ...curr];
                return cum;
            }, [])
        setVariableDependencies(variables);
        setPropsWithVariables(propsWithVariables_);
    }, []);

    // re-render on linked variables changed
    useVariableStore((state) => {
        state.variables.filter(variable => variableDependencies.includes(variable.key))
    });

    return propsWithVariables;

};


export {
    useDynamicVariables,
}