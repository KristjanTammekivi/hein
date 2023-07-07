import { createAssertion } from 'hein-assertion-utils';

interface Includes {
    /**
     * check if array includes a specific element
     * @param array
     * @param element
     * @example includes([1, 2, 3], 2);
     * @example includes([1, 2, 3], 2, 3);
     */
    <T>(array: T[], ...elements: T[]): void;
    /**
     * check if string includes a specific string
     * @param string
     * @param element
     * @example includes('abc', 'b');
     * @example includes('abc', 'b', 'c');
     * @example includes('abc', 'bc');
     */
    (string: string, ...elements: string[]): void;
}

export const [includes, notIncludes] = createAssertion({
    messages: {
        arrayMisses: 'Expected {{ actual }} to include {{ expected }}',
        not: 'Expected {{ actual }} to not include {{ expected }}'
    },
    test: (report): Includes => (actual: string | any[], ...elements) => {
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
    }
});
