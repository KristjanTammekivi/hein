import { createAssertion, stringify } from 'hein-assertion-utils';
import { get, has } from 'lodash';

export const [deepHasProperty, deepNotHasProperty] = createAssertion({
    messages: {
        noProperty: 'Expected {{actual}} to have property {{expected}}',
        wrongValue: 'Expected {{obj}} to have property {{expected}} with value {{value}}',
        not: 'Expected {{actual}} to not have property {{expected}}',
        notWrongValue: 'Expected {{obj}} to not have property {{expected}} with value {{value}}'
    },
    test: (report) => (...args: [actual: any, expected: string, value?: any]) => {
        const [actual, expected, value] = args;
        const actualStringified = stringify(actual);
        if (has(actual, expected)) {
            if (args.length === 3) {
                const actualValue = get(actual, expected);
                if (actualValue === value) {
                    return report({ status: 'ok', messageId: 'notWrongValue', expected: value, actual: actualValue, data: { value, expected, obj: actualStringified }, noStringify: true });
                }
                return report({ status: 'notok', messageId: 'wrongValue', expected: value, actual: actualValue, data: { value, expected, obj: actualStringified }, noStringify: true });
            }
            return report({ status: 'ok', noStringify: true, expected, actual: actualStringified });
        }
        return report({ status: 'notok', messageId: 'noProperty', expected, actual: actualStringified, noStringify: true });
    }
});
