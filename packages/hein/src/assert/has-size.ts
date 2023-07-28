import { isPlainObject } from 'lodash';
import { createAssertion } from 'hein-assertion-utils';

interface HasSize {
    /**
     * check if array has a specific length
     * @param array
     * @param length
     * @example hasSize([1, 2, 3], 3);
     */
    (array: any[], length: number, message?: string): void;
    /**
     * check if object has a specific amount of keys
     * @param object
     * @param length
     * @example hasSize({a: 1, b: 2}, 2);
     */
    (object: Record<string, unknown>, length: number, message?: string): void;
    /**
     * check if Map has a specific amount of keys
     * @param map
     * @param length
     * @example hasSize(new Map([['a', 1], ['b', 2]]), 2);
     */
    (map: Map<unknown, unknown>, length: number, message?: string): void;
    /**
     * check if Set has a specific amount of members
     * @param set
     * @param length
     * @example hasSize(new Set([1, 2, 3]), 3);
     */
    (set: Set<unknown>, length: number, message?: string): void;
    /**
     * check if string has a specific length
     * @param string
     * @param length
     * @example hasSize('abc', 3);
     */
    (string: string, length: number, message?: string): void;
}

export const [hasSize, notHasSize] = createAssertion({
    messages: {
        array: 'Expected array to have length of {{expected}}',
        object: 'Expected object to have size of {{expected}}',
        map: 'Expected Map to have size of {{expected}}',
        set: 'Expected Set to have size of {{expected}}',
        string: 'Expected string to have length of {{expected}}',
        not: 'Expected array to not have length of {{expected}}',
        notObject: 'Expected object to not have size of {{expected}}',
        notMap: 'Expected Map to not have size of {{expected}}',
        notSet: 'Expected Set to not have size of {{expected}}',
        notString: 'Expected string to not have length of {{expected}}',
        invalidValue: 'Expected {{actual}} to be an array, object, Map, Set or string'
    },
    test:
        (report): HasSize =>
        <T>(actual: T, expected: number, message?: string) => {
            if (Array.isArray(actual)) {
                if (actual.length === expected) {
                    return report({ message, status: 'ok', expected, actual: actual.length });
                }
                return report({ message, status: 'notok', messageId: 'array', expected, actual: actual.length });
            }
            if (isPlainObject(actual)) {
                if (Object.keys(actual).length === expected) {
                    return report({ message, status: 'ok', messageId: 'notObject', expected, actual: Object.keys(actual).length });
                }
                return report({ message, status: 'notok', messageId: 'object', expected, actual: Object.keys(actual).length });
            }
            if (actual instanceof Map) {
                if (actual.size === expected) {
                    return report({ message, status: 'ok', messageId: 'notMap', expected, actual: actual.size });
                }
                return report({ message, status: 'notok', messageId: 'map', expected, actual: actual.size });
            }
            if (actual instanceof Set) {
                if (actual.size === expected) {
                    return report({ message, status: 'ok', messageId: 'notSet', expected, actual: actual.size });
                }
                return report({ message, status: 'notok', messageId: 'set', expected, actual: actual.size });
            }
            if (typeof actual === 'string') {
                if (actual.length === expected) {
                    return report({ message, status: 'ok', messageId: 'notString', expected, actual: actual.length });
                }
                return report({ message, status: 'notok', messageId: 'string', expected, actual: actual.length });
            }
            report({ message, status: 'notok', messageId: 'invalidValue', actual: typeof actual, noStringify: true });
            report({ message, status: 'ok', messageId: 'invalidValue', actual: typeof actual, noStringify: true });
        }
});
