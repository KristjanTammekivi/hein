import { createAssertion } from 'hein-assertion-utils';
import { validateNumericsAndDates } from '../utils/validate-numeric-and-dates';

interface GreaterThanEqual {
    /**
     * check for >=
     */
    <T extends number | bigint | Date>(actual: T, expected: T, message?: string): void;
}

export const [greaterThanEqual, notGreaterThanEqual] = createAssertion({
    messages: {
        notGreaterThanEqual: 'Expected {{actual}} to not be greater than or equal to {{expected}}',
        not: 'Expected {{actual}} to not be greater than or equal to {{expected}}'
    },
    test: (report): GreaterThanEqual => (a: any, b: any, message?: string) => {
        validateNumericsAndDates(a, b);
        if (a < b) {
            return report({ status: 'notok', messageId: 'notGreaterThanEqual', actual: a, expected: b, message });
        }
        return report({ status: 'ok', expected: a, actual: b });
    }
});
