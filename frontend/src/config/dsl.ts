
// DSL Expression Functions with examples

export const DSL_CONFIG = {
    'CONCAT': {
        family: 'text',
        example: 'CONCAT(" ", "Hello", "World") --> Hello World',
        docu: `CONCAT(<separator>, <text1>, <text2>, ...)
        Joins all texts separated with a <separator>`,
        NMinArguments: 2,
    },
    'UPPER': {
        family: 'text',
        example: 'UPPER("Hello") --> HELLO',
        docu: `UPPER(<text>)
        Returns uppercase text`,
        NMinArguments: 1,
    },
    'LOWER': {
        family: 'text',
        example: 'LOWER("HeLLo") --> hello',
        docu: `LOWER(<text>)
        Returns lowercase text`,
        NMinArguments: 1,
    },
    'SUBSTITUTE': {
        family: 'text',
        example: 'SUBSTITUTE("Some old text", "old", "new") --> Some new text',
        docu: `SUBSTITUTE(<text1>, <text-old>, <text-new>)
        Replaces <text-old> by <text-new> in <text1>`,
        NMinArguments: 3,
    },
    'LEN': {
        family: 'text',
        example: 'LEN("Hello") --> 5',
        docu: `LEN(<text>)
        Returns number of characters`,
        NMinArguments: 1,
    },
    'TRIM': {
        family: 'text',
        example: 'TRIM(" HeLLo   ") --> hello',
        docu: `TRIM(<text>)
        Removes starting and ending white spaces`,
        NMinArguments: 1,
    },
    'RIGHT': {
        family: 'text',
        example: 'RIGHT("Hello", 2) --> lo',
        docu: `RIGHT(<text>, <number>)
        Returns the specified number of characters from the end of the text`,
        NMinArguments: 2,
    },
    'LEFT': {
        family: 'text',
        example: 'LEFT("Hello", 2) --> lo',
        docu: `LEFT(<text>, <number>)
        Returns the specified number of characters from the start of the text`,
        NMinArguments: 2,
    },

    'SUM': {
        family: 'math',
        example: 'SUM(5, -2) --> 3',
        docu: `SUM(<number1>, <number2>, ...)
        Adds values together`,
        NMinArguments: 1,
    },
    'MULTIPLY': {
        family: 'math',
        example: 'MULTIPLY(5, 2) --> 10',
        docu: `MULTIPLY(<number1>, <number2>, ...)
        Multiplies values together`,
        NMinArguments: 1,
    },
    'DIVIDE': {
        family: 'math',
        example: 'DIVIDE(5, 2) --> 2.5',
        docu: `DIVIDE(<number1>, <number2>, ...)
        Divides values`,
        NMinArguments: 1,
    },
    'AVERAGE': {
        family: 'math',
        example: 'AVERAGE(5, 2, 5) --> 4',
        docu: `AVERAGE(<number1>, <number2>, ...)
        Returns the average`,
        NMinArguments: 1,
    },
    'ROUND': {
        family: 'math',
        example: 'ROUND(3.14, 1) --> 3.1',
        docu: `ROUND(<number1>, <number2>)
        Rounds number to a specified number of digits`,
        NMinArguments: 2,
    },

    'IF': {
        family: 'logic',
        example: 'IF(HIGHER(5,2), "5 higher then 2", "5 not higher than 2") --> 5 higher than 2',
        docu: `IF(<logc expression>, <if true>, <if false>)
        Performs a logical test and returns one value if true, another if false`,
        NMinArguments: 3,
    },
    'NOT': {
        family: 'logic',
        example: 'NOT(true) --> false',
        docu: `NOT(<value>)
        Negates a value`,
        NMinArguments: 1,
    },
    'IS_HIGHER': {
        family: 'logic',
        example: 'HIGHER(5, 1) --> true',
        docu: `HIGHER(<number1>, <number2>)
        Compares if number1 > number2`,
        NMinArguments: 2,
    },
    'IS_LOWER': {
        family: 'logic',
        example: 'LOWER(5, 1) --> false',
        docu: `LOWER(<number1>, <number2>)
        Compares if number1 < number2`,
        NMinArguments: 2,
    },
    'IS_EQUAL': {
        family: 'logic',
        example: 'EQUAL(5, 1) --> false',
        docu: `EQUAL(<value1>, <value2>)
        Compares if two values are equal`,
        NMinArguments: 2,
    },
    'AND': {
        family: 'logic',
        example: 'AND(true , false) --> false',
        docu: `AND(<value1>, <value2>, ...)
        Returns true if all values are truthy`,
        NMinArguments: 1,
    },
    'OR': {
        family: 'logic',
        example: 'OR(true , false) --> true',
        docu: `OR(<value1>, <value2>, ...)
        Returns true if at least one value is truthy`,
        NMinArguments: 1,
    },
};