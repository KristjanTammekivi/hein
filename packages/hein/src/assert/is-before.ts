import { createAssertion } from 'hein-assertion-utils';

interface IsBefore {
    /**
     * check that date is before another date
     */
    <T extends Date>(actual: T, expected: T, message?: string): void;
}

export const [isBefore, notBefore] = createAssertion({
    messages: {
        after: 'Expected {{actual}} to be before {{expected}}',
        not: 'Expected {{actual}} to not be before {{expected}}'
    },
    test:
        (report): IsBefore =>
        (actual: Date, expected: Date) => {
            if (actual >= expected) {
                return report({
                    messageId: 'after',
                    status: 'notok',
                    actual,
                    expected
                });
            }
            return report({
                status: 'ok',
                actual,
                expected
            });
        }
});
