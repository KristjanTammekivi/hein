import { createAssertion } from 'hein-assertion-utils';

interface IsAfter {
    /**
     * check that date is after another date
     */
    <T extends Date>(actual: T, expected: T): void;
}

export const [isAfter, notAfter] = createAssertion({
    messages: {
        before: 'Expected {{actual}} to be after {{expected}}',
        not: 'Expected {{actual}} to not be after {{expected}}'
    },
    test:
        (report): IsAfter =>
        (actual: Date, expected: Date) => {
            if (actual <= expected) {
                return report({
                    messageId: 'before',
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
