import { createAssertion } from '../utils/assertion';

interface Equal {
    /**
     * check for === equality, NaN is equal to NaN
     */
    <T>(actual: T, expected: T, message?: string): void;
}

export const [equal, notEqual] = createAssertion({
    messages: {
        equal: 'Expected {{actual}} to equal {{expected}}',
        not: 'Expected {{actual}} to not equal {{expected}}'
    },
    test: (report): Equal => <T>(a: T, b: T, message?: string) => {
        if (Number.isNaN(a) && Number.isNaN(b)) {
            return report({ status: 'ok', expected: b, actual: a, message });
        }
        if (a !== b) {
            return report({ status: 'notok', messageId: 'equal', actual: a, expected: b, message });
        }
        return report({ status: 'ok', expected: a, actual: b, message });
    }
});
