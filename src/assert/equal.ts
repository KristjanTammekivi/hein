import { createAssertion } from '../utils/assertion';

export const [equal, notEqual] = createAssertion({
    messages: {
        equal: 'Expected {{actual}} to equal {{expected}}',
        not: 'Expected {{actual}} to not equal {{expected}}'
    },
    test: (report) => <T>(a: T, b: T, message?: string) => {
        if (a !== b) {
            return report({ status: 'notok', messageId: 'equal', actual: a, expected: b, message });
        }
        return report({ status: 'ok', expected: a, actual: b });
    }
});
