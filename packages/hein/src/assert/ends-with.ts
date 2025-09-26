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
        wrongEnd: 'Expected {{= it.actual }} to end with {{= it.expected }}',
        not: 'Expected {{= it.actual }} to not end with {{= it.expected }}'
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
