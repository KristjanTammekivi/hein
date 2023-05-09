import { createAssertion } from 'hein-assertion-utils';

interface Includes {
    <T>(array: T[], ...elements: T[]): void;
    (string: string, ...elements: string[]): void;
}

export const [includes, notIncludes] = createAssertion({
    messages: {
        arrayMisses: 'Expected {{ actual }} to include {{ expected }}',
        not: 'Expected {{ actual }} to not include {{ expected }}'
    },
    test: (report) => ((actual: string | any[], ...elements) => {
        for (const element of elements) {
            if (actual.includes(element)) {
                report({
                    messageId: 'not',
                    status: 'ok',
                    actual,
                    expected: element as any
                });
            } else {
                report({
                    messageId: 'arrayMisses',
                    status: 'notok',
                    actual,
                    expected: element as any
                });
            }
        }
    }) as Includes
});
