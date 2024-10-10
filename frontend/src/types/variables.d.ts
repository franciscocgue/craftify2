
type Variable<T> = {
    type: 'text' | 'number' | 'boolean';
    initialValue: T;
    value: T;
};

export type Variables = {
    [key: string]: Variable<any>;
};
