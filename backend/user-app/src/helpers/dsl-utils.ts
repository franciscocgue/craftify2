import pkg from "lodash";
const { cloneDeep } = pkg;
import { DSL_CONFIG } from "../config/dsl";
import { ParsedExpression, ParsedFunctionType, ParsedValueType } from "../types/dsl.types";
import { Variable } from "../types/index.types";

// utils for the domain-specific language used for expressions

function* makeIterator(iterable: any) {
    for (const item of iterable) {
        yield item;
    }
}

/**
 * Parse a user expression into an AST object + array of variables used in teh expression
 * 
 * @param expression: string expression {{CONCAT(" ", "Hello", userName)}}
 * @param variables: user defined variables [{key: 'userName', type: 'string', value: 'Smith'}]
 * @returns [parsed AST object, array of variable names used]
 */
export const myParser = (expression: string, variables: Variable[]): [ParsedFunctionType, string[]] => {

    const iterator = makeIterator(expression);

    const variablesUsed: string[] = [];

    const variableNames = variables.map(v => v.key);

    const _helper = (parsingString: boolean, acc: string): (ParsedValueType | ParsedFunctionType)[] => {

        const inputs: (ParsedValueType | ParsedFunctionType)[] = [];
        let next = iterator.next();

        while (!next.done) {

            if (next.value === '"') {
                if (parsingString) {
                    // end of string
                    inputs.push({
                        type: 'basicValue' as const,
                        value: acc,
                    });
                    parsingString = false;
                    acc = '';
                } else {
                    // start of string
                    parsingString = true;
                    acc = '';
                }
            } else if (!parsingString) {
                // function inputs start
                if (Object.keys(DSL_CONFIG).includes(acc) && (next.value === '(' || next.value === ' ')) {
                    inputs.push({
                        type: 'function' as const,
                        value: acc as ParsedFunctionType['value'],
                        inputs: [..._helper(false, '')]
                    });
                    acc = '';
                } else if (next.value === ' ' || next.value === ',' || next.value === ')') {
                    // check if end of boolean / number / variable finished
                    if (acc.toLocaleLowerCase() === 'true' || acc.toLocaleLowerCase() === 'false') {
                        inputs.push({
                            type: 'basicValue' as const,
                            value: acc.toLocaleLowerCase() === 'true',
                        });
                    } else if (!isNaN(parseFloat(acc.trim()))) {
                        // add number
                        inputs.push({
                            type: 'basicValue' as const,
                            value: parseFloat(acc.trim()),
                        });
                    } else if (acc.trim() !== '' && acc.trim() !== '(') {
                        // add variable
                        if (variableNames.includes(acc)) {
                            if (!variablesUsed.includes(acc)) {
                                variablesUsed.push(acc);
                            }
                            inputs.push({
                                type: 'variable' as const,
                                value: acc,
                            });
                        } else {
                            throw new Error(`Variable [${acc}] not found`)
                        }
                    }
                    acc = '';
                    if (next.value === ')') {
                        // end of function
                        return inputs;
                    }
                } else {
                    acc += next.value;
                }
            } else {
                acc += next.value;
            }


            next = iterator.next();

        }

        if (!' (),'.includes(acc)) {
            // probably a single-variable expression
            if (variableNames.includes(acc)) {
                if (!variablesUsed.includes(acc)) {
                    variablesUsed.push(acc);
                }
                inputs.push({
                    type: 'variable' as const,
                    value: acc,
                });
            } else {
                throw new Error(`Variable [${acc}] not found`)
            }
        }

        return inputs;
    };

    const parsedObj = _helper(false, '')[0] as ParsedFunctionType;

    return [parsedObj, variablesUsed]
};




// @TODO: function to validate parsed object, in terms of number of inputs (in the future also types)
// Use before finding value;
// USE CASE: let user know if input is valid in real time

export const getValue = (parsedObj: ParsedExpression, currPath: number[], variables: Variable[]): any => {

    // get current node
    let currNode: ParsedExpression | ParsedFunctionType | ParsedValueType = cloneDeep(parsedObj);
    // update current node (if nested)
    for (let ii of currPath) {
        if ('inputs' in currNode) {
            currNode = currNode.inputs[ii]
        };
    };

    // if string, return
    if (currNode.type === 'basicValue') {
        return currNode.value;
    };

    // if variable, return
    if (currNode.type === 'variable') {
        return variables.find(v => v.key === currNode.value)?.value;
    };

    // else: function
    const functionName = currNode.value;
    let functionInputs: (ParsedValueType | ParsedFunctionType)[] = [];
    if ('inputs' in currNode) {
        functionInputs = currNode.inputs;
    };
    switch (functionName) {
        case 'CONCAT':
            // for each input run this recursive function
            // first argument is separator
            const numberOfStandardParams = 1; // separator
            return functionInputs.slice(numberOfStandardParams).map((_, idx: number) => {
                return getValue(parsedObj, [...currPath, idx + numberOfStandardParams], variables);
            }).join(functionInputs[0].value as string);
        case 'UPPER':
            if (functionInputs.length > 1) {
                throw new Error(`Function "${functionName}" accepts only one argument`)
            }
            return String(getValue(parsedObj, [...currPath, 0], variables)).toUpperCase();
        case 'LOWER':
            if (functionInputs.length > 1) {
                throw new Error(`Function "${functionName}" accepts only one argument`)
            }
            return String(getValue(parsedObj, [...currPath, 0], variables)).toLowerCase();
        case 'SUBSTITUTE':
            return String(getValue(parsedObj, [...currPath, 0], variables)).replace(
                String(getValue(parsedObj, [...currPath, 1], variables)),
                String(getValue(parsedObj, [...currPath, 2], variables))
            );
        case 'LEN':
            if (functionInputs.length > 1) {
                throw new Error(`Function "${functionName}" accepts only one argument`)
            }
            return String(getValue(parsedObj, [...currPath, 0], variables)).length;
        case 'TRIM':
            return String(getValue(parsedObj, [...currPath, 0], variables)).trim();
        case 'RIGHT':
            return String(getValue(parsedObj, [...currPath, 0], variables)).slice(
                -1 * parseInt(getValue(parsedObj, [...currPath, 1], variables))
            );
        case 'LEFT':
            return String(getValue(parsedObj, [...currPath, 0], variables)).slice(
                0,
                parseInt(getValue(parsedObj, [...currPath, 1], variables))
            );
        case 'SUM':
            return functionInputs.reduce((acc, _, idx: number) => {
                return acc + getValue(parsedObj, [...currPath, idx], variables);
            }, 0);
        case 'MULTIPLY':
            return functionInputs.slice(1).reduce((acc, _, idx: number) => {
                return acc * getValue(parsedObj, [...currPath, idx + 1], variables);
            }, getValue(parsedObj, [...currPath, 0], variables));
        case 'DIVIDE':
            return functionInputs.slice(1).reduce((acc, _, idx: number) => {
                return acc / getValue(parsedObj, [...currPath, idx + 1], variables);
            }, getValue(parsedObj, [...currPath, 0], variables));
        case 'AVERAGE':
            return functionInputs.reduce((acc, _, idx: number) => {
                return acc + getValue(parsedObj, [...currPath, idx], variables);
            }, 0) / functionInputs.length;
        case 'ROUND':
            const val = getValue(parsedObj, [...currPath, 0], variables);
            const roundDigits = getValue(parsedObj, [...currPath, 1], variables);
            const factor = Math.pow(10, roundDigits);
            return Math.round(val * factor) / factor;
        case 'IF':
            const condition = getValue(parsedObj, [...currPath, 0], variables);
            if (condition) {
                return getValue(parsedObj, [...currPath, 1], variables);
            } else {
                return getValue(parsedObj, [...currPath, 2], variables)
            };
        case 'NOT':
            return !getValue(parsedObj, [...currPath, 0], variables);
        case 'IS_HIGHER':
            return getValue(parsedObj, [...currPath, 0], variables) >
                getValue(parsedObj, [...currPath, 1], variables);
        case 'IS_LOWER':
            return getValue(parsedObj, [...currPath, 0], variables) <
                getValue(parsedObj, [...currPath, 1], variables);
        case 'IS_EQUAL':
            return getValue(parsedObj, [...currPath, 0], variables) ===
                getValue(parsedObj, [...currPath, 1], variables);
        case 'AND':
            return functionInputs.reduce((acc, _, idx: number) => {
                return acc && getValue(parsedObj, [...currPath, idx], variables);
            }, true);
        case 'OR':
            return functionInputs.reduce((acc, _, idx: number) => {
                return acc || getValue(parsedObj, [...currPath, idx], variables);
            }, false);
        default:
            throw new Error(`Function "${functionName}" does not exists`)
    }

};