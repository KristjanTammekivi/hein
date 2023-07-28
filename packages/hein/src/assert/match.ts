import { createAssertion } from 'hein-assertion-utils';

interface IsMatch {
    /**
     * check if string matches regex
     * @param actual
     * @param regex
     * @example match('foo', /foo/);
     * @example notMatch('foo', /bar/);
     */
    (actual: string, regex: RegExp): void;
}

export const [match, notMatch] = createAssertion({
    messages: {
        noMatch: 'Expected {{actual}} to match {{expected}}',
        not: 'Expected {{actual}} to not match {{expected}}'
    },
    test:
        (report): IsMatch =>
        (actual: string, regex: RegExp) => {
            if (!regex.test(actual)) {
                return report({
                    messageId: 'noMatch',
                    status: 'notok',
                    actual,
                    noStringify: true,
                    expected: regex.toString()
                });
            }
            report({
                status: 'ok',
                actual,
                expected: regex.toString(),
                noStringify: true
            });
        }
});
