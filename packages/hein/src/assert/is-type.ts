import { createAssertion } from 'hein-assertion-utils';
import { ValueType, getType } from '../utils/get-type';

export const [isType, notIsType] = createAssertion({
    messages: {
        wrongType: 'Expected {{ actual }} to be a(n) {{ expected }}',
        not: `Expected {{ actual }} to not be a(n) {{ expected }}`
    },
    test: (report) => (value: any, expectedType: ValueType) => {
        const actualType = getType(value);
        if (actualType !== expectedType) {
            return report({ status: 'notok', messageId: 'wrongType', actual: actualType, expected: expectedType, noStringify: true });
        }
        return report({ status: 'ok', messageId: 'not', actual: actualType, expected: expectedType, noStringify: true });
    }
});
