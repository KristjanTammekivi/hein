import { createAssertion } from 'hein-assertion-utils';
import { validateNumericsAndDates } from '../utils/validate-numeric-and-dates';

interface GreaterThan {
    /**
     * check for >
     */
    <T extends number | bigint | Date>(actual: T, expected: T, message?: string): void;
}

export const [greaterThan, notGreaterThan] = createAssertion({
    messages: {
        smaller: 'Expected {{actual}} to be greater than {{expected}}',
        not: 'Expected {{actual}} to not be greater than {{expected}}'
    },
    test:
        (report): GreaterThan =>
        (actual: any, expected: any) => {
            validateNumericsAndDates(actual, expected);
            if (actual < expected) {
                return report({ status: 'notok', messageId: 'smaller', actual, expected, noStringify: true });
            }
            return report({ status: 'ok', messageId: 'not', expected, actual });
        }
});
