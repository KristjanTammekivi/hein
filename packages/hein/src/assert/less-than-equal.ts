import { createAssertion } from 'hein-assertion-utils';
import { validateNumericsAndDates } from '../utils/validate-numeric-and-dates';

interface LessThanEqual {
    /**
     * check for <=
     */
    <T extends number | bigint | Date>(actual: T, expected: T, message?: string): void;
}

export const [lessThanEqual, notLessThanEqual] = createAssertion({
    messages: {
        lesserThanEqual: 'Expected {{actual}} to be less than or equal to {{expected}}',
        not: 'Expected {{actual}} to not be less than or equal to {{expected}}'
    },
    test: (report): LessThanEqual => (actual: any, expected: any, message?: string) => {
        validateNumericsAndDates(actual, expected);
        if (actual > expected) {
            return report({ status: 'notok', messageId: 'lesserThanEqual', actual, expected, message, noStringify: true });
        }
        return report({ status: 'ok', actual, expected, message, messageId: 'not', noStringify: true });
    }
});
