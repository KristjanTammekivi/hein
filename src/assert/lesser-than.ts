import { createAssertion } from '../utils/assertion';

interface LesserThan {
    /**
     * check for <
     */
    <T>(actual: T, expected: T, message?: string): void;
}

export const [lesserThan, notLesserThan] = createAssertion({
    messages: {
        lesserThan: 'Expected {{actual}} to be less than {{expected}}',
        not: 'Expected {{actual}} to not be less than {{expected}}'
    },
    test: (report): LesserThan => <T>(a: T, b: T, message?: string) => {
        if (a >= b) {
            return report({ status: 'notok', messageId: 'lesserThan', actual: a, expected: b, message });
        }
        return report({ status: 'ok', expected: a, actual: b, message, messageId: 'not' });
    }
});
