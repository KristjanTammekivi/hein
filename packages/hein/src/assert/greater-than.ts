import { createAssertion } from 'hein-assertion-utils';
import { validateNumericsAndDates } from '../utils/validate-numeric-and-dates.js';

interface GreaterThan {
    /**
     * check for >
     */
    <T extends number | bigint | Date>(actual: T, expected: T, message?: string): void;
}

export const [greaterThan, notGreaterThan] = createAssertion({
    messages: {
        smaller: 'Expected {{= it.actual }} to be greater than {{= it.expected }}',
        not: 'Expected {{= it.actual }} to not be greater than {{= it.expected }}'
    },
    test:
        (report): GreaterThan =>
        (actual: any, expected: any) => {
            validateNumericsAndDates(actual, expected);
            if (actual > expected) {
                return report({ status: 'ok', messageId: 'not', expected, actual });
            }
            return report({ status: 'notok', messageId: 'smaller', actual, expected, noStringify: true });
        }
});
