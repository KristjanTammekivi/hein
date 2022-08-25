import { createAssertion } from 'hein-assertion-utils';

export const [match, notMatch] = createAssertion({
    messages: {
        noMatch: 'Expected {{actual}} to match {{expected}}',
        not: 'Expected {{actual}} to not match {{expected}}'
    },
    test: (report) => (actual: string, regex: RegExp) => {
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
