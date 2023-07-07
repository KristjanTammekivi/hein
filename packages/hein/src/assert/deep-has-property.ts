import { createAssertion, stringify } from 'hein-assertion-utils';
import { get, has } from 'lodash';

interface DeepHasProperty {
    /**
     * check if object has a property
     * @param object
     * @param property a property in the object. Can be a path like 'a.b.c'
     * @example deepHasProperty([{a: {b: {c: 1}}}], '[0].a.b.c');
     */
    (object: any, property: string): void;
    /**
     * check if object has a property with a specific value
     * @param object
     * @param property a property in the object. Can be a path like 'a.b.c'
     * @param value
     * @example deepHasProperty([{a: {b: {c: 1}}}], '[0].a.b.c', 1);
     */
    (object: any, property: string, value: any): void;
}

export const [deepHasProperty, deepNotHasProperty] = createAssertion({
    messages: {
        noProperty: 'Expected {{actual}} to have property {{expected}}',
        wrongValue: 'Expected {{obj}} to have property {{expected}} with value {{value}}',
        not: 'Expected {{actual}} to not have property {{expected}}',
        notWrongValue: 'Expected {{obj}} to not have property {{expected}} with value {{value}}'
    },
    test: (report): DeepHasProperty => (...args: [actual: any, expected: string, value?: any]) => {
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
