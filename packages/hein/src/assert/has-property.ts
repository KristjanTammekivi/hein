import { createAssertion, stringify } from 'hein-assertion-utils';

interface HasProperty {
    /**
     * check if object has a property
     * @param object
     * @param property a property in the object.
     * @example hasProperty({a: 1}, 'a');
     */
    <T, K extends keyof T>(object: T, property: K): void;
    /**
     * check if object has a property with a specific value
     * @param object
     * @param property a property in the object.
     * @param value
     * @example hasProperty({a: 1}, 'a', 1);
     */
    <T, K extends keyof T>(object: T, property: K, value: T[K]): void;
}

export const [hasProperty, notHasProperty] = createAssertion({
    messages: {
        noProperty: 'Expected {{actual}} to have property {{expected}}',
        wrongValue: 'Expected {{obj}} to have property {{expected}} with value {{value}}',
        not: 'Expected {{actual}} to not have property {{expected}}',
        notWrongValue: 'Expected {{obj}} to not have property {{expected}} with value {{value}}'
    },
    test:
        (report): HasProperty =>
        <T extends object, K extends keyof T>(...args: [actual: T, expected: K, value?: T[K]]) => {
            const [actual, expected, value] = args;
            const actualStringified = stringify(actual);
            if (expected in actual) {
                if (args.length === 3) {
                    if (actual[expected] === value) {
                        return report({
                            status: 'ok',
                            messageId: 'notWrongValue',
                            expected,
                            actual: actualStringified,
                            data: { value, expected, obj: actual }
                        });
                    }
                    return report({
                        status: 'notok',
                        messageId: 'wrongValue',
                        expected,
                        actual: actualStringified,
                        data: { value, obj: actualStringified },
                        noStringify: true
                    });
                }
                return report({ status: 'ok', noStringify: true, expected, actual: actualStringified });
            }
            return report({ status: 'notok', messageId: 'noProperty', expected, actual: actualStringified, noStringify: true });
        }
});
