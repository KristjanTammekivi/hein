export type ValueType = 'string' |
    'number' |
    'bigint' |
    'boolean' |
    'symbol' |
    'undefined' |
    'object' |
    'function' |
    'null' |
    'NaN' |
    'array';

export const getType = (value: any): ValueType => {
    if (value !== value) {
        return 'NaN';
    }
    if (Array.isArray(value)) {
        return 'array';
    }
    if (value === null) {
        return 'null';
    }
    return typeof value;
};
