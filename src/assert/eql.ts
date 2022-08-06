import { createAssertion } from '../utils';

const anySymbol: unique symbol = Symbol();

interface Any {
    [anySymbol]: true;
}

export const any = (): Any => ({ [anySymbol]: true });

const isAny = (value: any): value is Any => value && value[anySymbol];

const xor = (a: boolean, b: boolean) => {
    return (a && !b) || (!a && b);
};

const isObjectLike = (value: any): value is object => typeof value === 'object' && value !== null;

export const [eql, notEql] = createAssertion({
    messages: {
        notEql: 'Expected {{actual}} to deep equal {{expected}}',
        not: 'Expected {{actual}} to not deep equal {{expected}}'
    },
    test: (report) => <T>(actual: T, expected: T) => {
        const deepEqual = (a: any, b: any) => {
            if (a === b) {
                return report({ status: 'ok', messageId: 'not' });
            }
            if (!a || !b || (!isObjectLike(a) && !isObjectLike(b))) {
                if (a !== a || b !== b) {
                    return report({ status: 'ok', messageId: 'not', actual, expected });
                } else {
                    return report({ status: 'notok', messageId: 'notEql', actual, expected });
                }
            }
            if (xor(Array.isArray(a), Array.isArray(b))) {
                return report({ status: 'notok', messageId: 'notEql', actual, expected });
            }
            if (Array.isArray(a)) {
                if (a.length !== b.length) {
                    return report({ status: 'notok', messageId: 'notEql', actual, expected });
                }
                return a.forEach((_, index) => {
                    return deepEqual(a[index], b[index]);
                });
            }
            for (const key in a) {
                if (!(key in b)) {
                    return report({ status: 'notok', messageId: 'notEql', actual, expected });
                }
                return deepEqual(a[key], b[key]);
            }
            return report({ status: 'ok', expected, actual });
        };
        return deepEqual(actual, expected);
    }
});
