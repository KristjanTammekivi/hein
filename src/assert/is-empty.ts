import { isPlainObject } from 'lodash';
import { createAssertion } from '../utils/assertion';

export const [isEmpty, notIsEmpty] = createAssertion({
    messages: {
        array: 'Expected array to be empty',
        object: 'Expected object to be empty',
        map: 'Expected Map to be empty',
        set: 'Expected Set to be empty',
        not: 'Expected array to not be empty',
        notObject: 'Expected object to not be empty',
        notMap: 'Expected Map to not be empty',
        notSet: 'Expected Set to not be empty'
    },
    test: (report) => <T>(actual: T, message?: string) => {
        if (Array.isArray(actual)) {
            if (actual.length === 0) {
                return report({ message, status: 'ok', actual });
            }
            return report({ message, status: 'notok', messageId: 'array', actual });
        }
        if (isPlainObject(actual)) {
            if (Object.keys(actual).length === 0) {
                return report({ message, status: 'ok', messageId: 'notObject', actual });
            }
            return report({ message, status: 'notok', messageId: 'object', actual });
        }
        if (actual instanceof Map) {
            if (actual.size === 0) {
                return report({ message, status: 'ok', messageId: 'notMap', actual });
            }
            return report({ message, status: 'notok', messageId: 'map', actual });
        }
        if (actual instanceof Set) {
            if (actual.size === 0) {
                return report({ message, status: 'ok', messageId: 'notSet', actual });
            }
            return report({ message, status: 'notok', messageId: 'set', actual });
        }
    }
});
