import { createAssertion } from '../utils/assertion';

export const [greaterThan, notGreaterThan] = createAssertion({
    messages: {
        invalidArgument: 'Expected {{actual}} to be a number',
        smaller: 'Expected {{actual}} to be greater than {{expected}}',
        not: 'Expected {{actual}} to not be greater than {{expected}}'
    },
    test: (report) => (actual: number, expected: number) => {
        if (typeof actual !== 'number') {
            return report({ status: 'notok', messageId: 'invalidArgument', actual, expected });
        }
        if (actual < expected) {
            return report({ status: 'notok', messageId: 'smaller', actual, expected, noStringify: true });
        }
        return report({ status: 'ok', messageId: 'not', expected, actual });
    }
});
