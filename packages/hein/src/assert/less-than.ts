import { createAssertion } from 'hein-assertion-utils';
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
    test:
        (report): LesserThan =>
        (actual: any, expected: any, message?: string) => {
            validateNumericsAndDates(actual, expected);
            if (actual >= expected) {
                return report({ status: 'notok', messageId: 'lesserThan', actual, expected, message });
            }
            return report({ status: 'ok', actual, expected, message, messageId: 'not' });
        }
});
