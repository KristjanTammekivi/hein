import { cloneDeep } from 'lodash';
import { createAssertion } from '../utils/assertion';

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
        if (typeof expected !== 'function') {
            expected = cloneDeep(expected);
        }
        const deepEqual = (a: any, b: any) => {
            if (a === b) {
                return;
            }
            if (typeof a === 'function' && typeof b === 'function') {
                if (a.toString() === b.toString()) {
                    return;
                }
                return report({ status: 'notok', messageId: 'notEql', actual: a, expected: b });
            }
            if (!a || !b || (!isObjectLike(a) && !isObjectLike(b))) {
                if (a !== a || b !== b) {
                    return;
                } else {
                    return report({ status: 'notok', messageId: 'notEql', actual, expected });
                }
            }
            if (xor(typeof a === 'object', typeof b === 'object')) {
                return report({ status: 'notok', messageId: 'notEql', actual, expected });
            }
            if (xor(Array.isArray(a), Array.isArray(b))) {
                return report({ status: 'notok', messageId: 'notEql', actual, expected });
            }
            if (a instanceof WeakMap || b instanceof WeakMap) {
                return report({ status: 'notok', messageId: 'notEql', actual, expected });
            }
            if (a instanceof WeakSet || b instanceof WeakSet) {
                return report({ status: 'notok', messageId: 'notEql', actual, expected });
            }
            if (a instanceof Date || b instanceof Date) {
                if (xor(a instanceof Date, b instanceof Date)) {
                    return report({ status: 'notok', messageId: 'notEql', actual, expected });
                }
                if (a.getTime() !== b.getTime()) {
                    return report({ status: 'notok', messageId: 'notEql', actual, expected });
                }
                return;
            }
            if (Array.isArray(a)) {
                if (a.length !== b.length) {
                    return report({ status: 'notok', messageId: 'notEql', actual, expected });
                }
                return a.some((_, index) => {
                    return deepEqual(a[index], b[index]);
                });
            }
            if (Object.keys(a).length !== Object.keys(b).length) {
                return report({ status: 'notok', messageId: 'notEql', actual, expected });
            }
            let result = false;
            for (const key in a) {
                if (!(key in b)) {
                    return report({ status: 'notok', messageId: 'notEql', actual, expected });
                }
                if (isAny(b[key])) {
                    // so diffs don't show any in case of mismatches elsewhere
                    b[key] = a[key];
                }
                const didJudge = deepEqual(a[key], b[key]);
                if (didJudge) {
                    result = true;
                }
            }
            return result;
        };
        const result = deepEqual(actual, expected);
        if (!result) {
            return report({ status: 'ok', messageId: 'not', expected, actual });
        }
    }
});
