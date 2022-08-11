import { createAssertion } from '../utils/assertion';
import { validateNumericsAndDates } from '../utils/validate-numeric-and-dates';

interface LesserThan {
    /**
     * check for <
     */
    <T extends number | bigint | Date>(actual: T, expected: T, message?: string): void;
}

export const [lessThan, notLessThan] = createAssertion({
    messages: {
        lesserThan: 'Expected {{actual}} to be less than {{expected}}',
        not: 'Expected {{actual}} to not be less than {{expected}}'
    },
    test: (report): LesserThan => (a: any, b: any, message?: string) => {
        validateNumericsAndDates(a, b);
        if (a >= b) {
            return report({ status: 'notok', messageId: 'lesserThan', actual: a, expected: b, message });
        }
        return report({ status: 'ok', expected: a, actual: b, message, messageId: 'not' });
    }
});
