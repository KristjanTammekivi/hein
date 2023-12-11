import { isPlainObject } from 'lodash';
import { createAssertion } from 'hein-assertion-utils';

interface IsEmpty {
    /**
     * check if array is empty
     * @param array
     * @example isEmpty([]);
     */
    <T>(array: T[], message?: string): void;
    /**
     * check if object is empty
     * @param object
     * @example isEmpty({});
     */
    (object: Record<string, unknown>, message?: string): void;
    /**
     * check if Map is empty
     * @param map
     * @example isEmpty(new Map());
     */
    <K, V>(map: Map<K, V>, message?: string): void;
    /**
     * check if Set is empty
     * @param set
     * @example isEmpty(new Set());
     */
    <T>(set: Set<T>, message?: string): void;
}

export const [isEmpty, notIsEmpty] = createAssertion({
    messages: {
        array: 'Expected array to be empty',
        object: 'Expected object to be empty',
        map: 'Expected Map to be empty',
        set: 'Expected Set to be empty',
        not: 'Expected array to not be empty',
        notObject: 'Expected object to not be empty',
        notMap: 'Expected Map to not be empty',
        notSet: 'Expected Set to not be empty',
        invalidArgument: 'Expected {{actual}} to be an array, object, Map, or Set'
    },
    test:
        (report): IsEmpty =>
        <T>(actual: T, message?: string) => {
            if (Array.isArray(actual)) {
                if (actual.length === 0) {
                    return report({ message, status: 'ok', actual, expected: [] as any });
                }
                return report({ message, status: 'notok', messageId: 'array', actual, expected: [] as any });
            }
            if (isPlainObject(actual)) {
                if (Object.keys(actual).length === 0) {
                    return report({ message, status: 'ok', messageId: 'notObject', actual });
                }
                return report({ message, status: 'notok', messageId: 'object', actual, expected: {} });
            }
            if (actual instanceof Map) {
                if (actual.size === 0) {
                    return report({ message, status: 'ok', messageId: 'notMap', actual });
                }
                return report({ message, status: 'notok', messageId: 'map', actual, expected: new Map() });
            }
            if (actual instanceof Set) {
                if (actual.size === 0) {
                    return report({ message, status: 'ok', messageId: 'notSet', actual });
                }
                return report({ message, status: 'notok', messageId: 'set', actual });
            }
            report({ message, status: 'notok', messageId: 'invalidArgument', actual });
            report({ message, status: 'ok', messageId: 'invalidArgument', actual });
        }
});
