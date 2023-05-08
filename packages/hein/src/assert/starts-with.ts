import { createAssertion } from 'hein-assertion-utils';

interface StartsWith {
    (string: string, start: string): void;
}

export const [startsWith, notStartsWith] = createAssertion({
    messages: {
        wrongStart: 'Expected {{ actual }} to start with {{ expected }}',
        not: 'Expected {{ actual }} to not start with {{ expected }}'
    },
    test: (report) =>
        ((actual: string, start: string) => {
            if (!actual.startsWith(start)) {
                report({
                    messageId: 'wrongStart',
                    status: 'notok',
                    actual,
                    expected: start
                });
            } else {
                report({
                    messageId: 'not',
                    status: 'ok',
                    actual,
                    expected: start
                });
            }
        }) as StartsWith
});
