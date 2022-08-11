import { createAssertion } from '../utils/assertion';

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

export const [isType, notIsType] = createAssertion({
    messages: {
        wrongType: 'Expected {{ actual }} to be a(n) {{ expected }}',
        not: `Expected {{ actual }} to not be a(n) {{ expected }}`
    },
    test: (report) => (value: any, expectedType: ValueType) => {
        const actualType = getType(value);
        if (actualType !== expectedType) {
            return report({ status: 'notok', messageId: 'wrongType', actual: actualType, expected: expectedType, noStringify: true });
        }
        return report({ status: 'ok', messageId: 'not', actual: actualType, expected: expectedType, noStringify: true });
    }
});
