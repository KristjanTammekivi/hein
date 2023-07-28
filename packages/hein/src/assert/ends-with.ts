import { createAssertion } from 'hein-assertion-utils';

// TODO: add message

interface EndsWith {
    /**
     * check if string ends with a specific string
     * @param string
     * @param end
     */
    (string: string, end: string): void;
}

export const [endsWith, notEndsWith] = createAssertion({
    messages: {
        wrongEnd: 'Expected {{ actual }} to end with {{ expected }}',
        not: 'Expected {{ actual }} to not end with {{ expected }}'
    },
    test:
        (report): EndsWith =>
        (actual: string, end: string) => {
            if (actual.endsWith(end)) {
                report({
                    messageId: 'not',
                    status: 'ok',
                    actual,
                    expected: end
                });
            } else {
                report({
                    messageId: 'wrongEnd',
                    status: 'notok',
                    actual,
                    expected: end
                });
            }
        }
});
