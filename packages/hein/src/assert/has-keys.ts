import { createAssertion } from 'hein-assertion-utils';
import { castArray } from 'lodash';

interface HasKeys {
    /**
     * check if object has keys
     * @param object
     * @param keys a key or array of keys in the object.
     * @example hasKeys({a: 1}, 'a');
     * @example hasKeys({a: 1, b: 2}, ['a', 'b']);
     */
    <T extends Record<string, any>, K extends keyof T>(object: T, keys: K[] | K, message?: string): void;
    <K, T extends Map<K, any>>(object: T, keys: K[] | K, message?: string): void;
}

export const [hasKeys, notHasKeys] = createAssertion({
    messages: {
        noKey: 'Expected {{object}} to have keys {{expected}}',
        not: 'Expected {{object}} to not have keys {{expected}}'
    },
    test:
        (report): HasKeys =>
        (object, keys, message) => {
            const keysArray = castArray(keys);
            if (object instanceof Map) {
                for (const key of keysArray) {
                    if (!object.has(key)) {
                        report({
                            status: 'notok',
                            message,
                            messageId: 'noKey',
                            data: { object },
                            actual: [...object.keys()],
                            expected: keysArray
                        });
                        return;
                    }
                }
                report({ status: 'ok', data: { object }, actual: [...object.keys()], expected: keysArray });
                return;
            }
            for (const key of keysArray) {
                if (!(key in object)) {
                    report({
                        status: 'notok',
                        message,
                        messageId: 'noKey',
                        data: { object },
                        actual: object,
                        expected: keysArray
                    });
                    return;
                }
            }
            report({ status: 'ok', data: { object }, actual: Object.keys(object), expected: keysArray });
        }
});
