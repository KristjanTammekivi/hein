import { createAssertion } from 'hein-assertion-utils';
import { ValueType, getType } from '../utils/get-type';

interface IsType {
    /**
     * check if value is of a specific type, nulls, NaN and arrays are specially handled
     * @param value
     * @param expectedType
     * @example isType('foo', 'string');
     * @example isType(1, 'number');
     * @example isType(1n, 'bigint');
     * @example isType(true, 'boolean');
     * @example isType(Symbol('foo'), 'symbol');
     * @example isType(undefined, 'undefined');
     * @example isType({}, 'object');
     * @example isType(() => {}, 'function');
     * @example isType(null, 'null');
     * @example isType(NaN, 'NaN');
     * @example isType([], 'array');
     */
    (value: unknown, expectedType: ValueType): void;
    /**
     * check if value is of a specific type, nulls, NaN and arrays are specially handled
     * @param value
     * @param expectedType
     * @example isType('foo', 'string');
     */
    (value: string, expectedType: 'string'): void;
    /**
     * check if value is of a specific type, nulls, NaN and arrays are specially handled
     * @param value
     * @param expectedType
     * @example isType(1, 'number');
     * @example isType(NaN, 'NaN');
     */
    (value: number, expectedType: 'number' | 'NaN'): void;
    /**
     * check if value is of a specific type, nulls, NaN and arrays are specially handled
     * @param value
     * @param expectedType
     * @example isType(1n, 'bigint');
     */
    (value: bigint, expectedType: 'bigint'): void;
    /**
     * check if value is of a specific type, nulls, NaN and arrays are specially handled
     * @param value
     * @param expectedType
     * @example isType(true, 'boolean');
     */
    (value: boolean, expectedType: 'boolean'): void;
    /**
     * check if value is of a specific type, nulls, NaN and arrays are specially handled
     * @param value
     * @param expectedType
     * @example isType(Symbol('foo'), 'symbol');
     */
    (value: symbol, expectedType: 'symbol'): void;
    /**
     * check if value is of a specific type, nulls, NaN and arrays are specially handled
     * @param value
     * @param expectedType
     * @example isType(Symbol('foo'), 'symbol');
     */
    (value: undefined, expectedType: 'undefined'): void;
    /**
     * check if value is of a specific type, nulls, NaN and arrays are specially handled
     * @param value
     * @param expectedType
     * @example isType({}, 'object');
     */
    (value: object, expectedType: 'object'): void;
    /**
     * check if value is of a specific type, nulls, NaN and arrays are specially handled
     * @param value
     * @param expectedType
     * @example isType(() => {}, 'function');
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    (value: Function, expectedType: 'function'): void;
    /**
     * check if value is of a specific type, nulls, NaN and arrays are specially handled
     * @param value
     * @param expectedType
     * @example isType(null, 'null');
     */
    (value: null, expectedType: 'null'): void;
    /**
     * check if value is of a specific type, nulls, NaN and arrays are specially handled
     * @param value
     * @param expectedType
     * @example isType([], 'array');
     */
    (value: any[], expectedType: 'array'): void;
}

export const [isType, notIsType] = createAssertion({
    messages: {
        wrongType: 'Expected {{ actual }} to be a(n) {{ expected }}',
        not: `Expected {{ actual }} to not be a(n) {{ expected }}`
    },
    test:
        (report): IsType =>
        (value: any, expectedType: ValueType) => {
            const actualType = getType(value);
            if (actualType !== expectedType) {
                return report({ status: 'notok', messageId: 'wrongType', actual: actualType, expected: expectedType, noStringify: true });
            }
            return report({ status: 'ok', messageId: 'not', actual: actualType, expected: expectedType, noStringify: true });
        }
});
