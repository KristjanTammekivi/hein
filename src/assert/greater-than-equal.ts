import { createAssertion } from '../utils/assertion';

interface GreaterThanEqual {
    /**
     * check for >=
     */
    <T>(actual: T, expected: T, message?: string): void;
}

export const [greaterThanEqual, notGreaterThanEqual] = createAssertion({
    messages: {
        notGreaterThanEqual: 'Expected {{actual}} to not be greater than or equal to {{expected}}',
        not: 'Expected {{actual}} to not be greater than or equal to {{expected}}'
    },
    test: (report): GreaterThanEqual => <T>(a: T, b: T, message?: string) => {
        if (a < b) {
            return report({ status: 'notok', messageId: 'notGreaterThanEqual', actual: a, expected: b, message });
        }
        return report({ status: 'ok', expected: a, actual: b });
    }
});
