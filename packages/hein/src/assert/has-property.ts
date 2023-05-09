import { createAssertion, stringify } from 'hein-assertion-utils';

export const [hasProperty, notHasProperty] = createAssertion({
    messages: {
        noProperty: 'Expected {{actual}} to have property {{expected}}',
        wrongValue: 'Expected {{obj}} to have property {{expected}} with value {{value}}',
        not: 'Expected {{actual}} to not have property {{expected}}',
        notWrongValue: 'Expected {{obj}} to not have property {{expected}} with value {{value}}'

    },
    test: (report) => <T extends object, K extends keyof T>(...args: [actual: T, expected: K, value?: T[K]]) => {
        const [actual, expected, value] = args;
        const actualStringified = stringify(actual);
        if (expected in actual) {
            if (args.length === 3) {
                if (actual[expected] === value) {
                    return report({ status: 'ok', messageId: 'notWrongValue', expected, actual: actualStringified, data: { value, expected, obj: actual } });
                }
                return report({ status: 'notok', messageId: 'wrongValue', expected, actual: actualStringified, data: { value, obj: actualStringified }, noStringify: true });
            }
            return report({ status: 'ok', noStringify: true, expected, actual: actualStringified });
        }
        return report({ status: 'notok', messageId: 'noProperty', expected, actual: actualStringified, noStringify: true });
    }
});
