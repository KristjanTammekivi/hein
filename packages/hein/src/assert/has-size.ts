import { isPlainObject } from 'lodash';
import { createAssertion } from '../utils/assertion';

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
        notString: 'Expected string to not have length of {{expected}}'
    },
    test: (report) => <T>(actual: T, expected: number, message?: string) => {
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
    }
});
