import { createAssertion } from 'hein-assertion-utils';

interface StartsWith {
    /**
     * check if string starts with start
     * @param string
     * @param start
     * @example startsWith('foo', 'f');
     */
    (string: string, start: string): void;
}

export const [startsWith, notStartsWith] = createAssertion({
    messages: {
        wrongStart: 'Expected {{= it.actual }} to start with {{= it.expected }}',
        not: 'Expected {{= it.actual }} to not start with {{= it.expected }}'
    },
    test:
        (report): StartsWith =>
        (actual: string, start: string) => {
            if (actual.startsWith(start)) {
                report({
                    messageId: 'not',
                    status: 'ok',
                    actual,
                    expected: start
                });
            } else {
                report({
                    messageId: 'wrongStart',
                    status: 'notok',
                    actual,
                    expected: start
                });
            }
        }
});
