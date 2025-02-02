import { DSL_CONFIG } from "../config/dsl"

export type ParsedExpression = ParsedFunctionType & {
    inputs: (ParsedValueType | ParsedFunctionType)[];
}

export type ParsedFunctionType = {
    type: "function",
    value: keyof typeof DSL_CONFIG,
    inputs: (ParsedFunctionType | ParsedValueType)[]
}

export type ParsedValueType = {
    type: "basicValue" | "variable",
    value: string | number | boolean,
}