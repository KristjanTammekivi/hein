import { createAssertion } from 'hein-assertion-utils';

interface EndsWith {
    (string: string, end: string): void;
}

export const [endsWith, notEndsWith] = createAssertion({
    messages: {
        wrongEnd: 'Expected {{ actual }} to end with {{ expected }}',
        not: 'Expected {{ actual }} to not end with {{ expected }}'
    },
    test: (report) =>
        ((actual: string, end: string) => {
            if (!actual.endsWith(end)) {
                report({
                    messageId: 'wrongEnd',
                    status: 'notok',
                    actual,
                    expected: end
                });
            } else {
                report({
                    messageId: 'not',
                    status: 'ok',
                    actual,
                    expected: end
                });
            }
        }) as EndsWith
});
