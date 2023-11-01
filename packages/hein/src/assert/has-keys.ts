import { createAssertion, stringify } from 'hein-assertion-utils';
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
}

export const [hasKeys, notHasKeys] = createAssertion({
    messages: {
        noKey: 'Expected {{actual}} to have keys {{expected}}',
        not: 'Expected {{actual}} to not have keys {{expected}}'
    },
    test:
        (report): HasKeys =>
        (object, keys, message) => {
            const keysArray = castArray(keys);
            for (const key of keysArray) {
                if (!(key in object)) {
                    report({
                        status: 'notok',
                        message,
                        messageId: 'noKey',
                        actual: stringify(object),
                        expected: keysArray
                    });
                    return;
                }
            }
            report({ status: 'ok', actual: stringify(object), expected: keysArray });
        }
});
