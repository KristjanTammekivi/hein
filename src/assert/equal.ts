import { createAssertion } from '../utils/assertion';

interface Equal {
    /**
     * check for === equality
     */
    <T>(actual: T, expected: T, message?: string): void;
}

export const [equal, notEqual] = createAssertion({
    messages: {
        equal: 'Expected {{actual}} to equal {{expected}}',
        not: 'Expected {{actual}} to not equal {{expected}}'
    },
    test: (report): Equal => <T>(a: T, b: T, message?: string) => {
        if (a !== b) {
            return report({ status: 'notok', messageId: 'equal', actual: a, expected: b, message });
        }
        return report({ status: 'ok', expected: a, actual: b });
    }
});
