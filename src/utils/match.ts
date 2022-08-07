import { isObjectLike } from 'lodash';
import { xor } from './xor';

const anySymbol: unique symbol = Symbol();

interface Any {
    [anySymbol]: true;
}

export const any = (): any => ({ [anySymbol]: true });

const isAny = (value: any): value is Any => value && value[anySymbol];

interface MatchOptions {
    mutate?: boolean;
    partial?: boolean;
}

export const match = <T>(actual: T, expected: T, { mutate = false, partial = false }: MatchOptions = {}): boolean => {
    if (actual === expected) {
        return true;
    }
    if (isAny(actual) || isAny(expected)) {
        return true;
    }
    if (!actual || !expected || (!isObjectLike(actual) && !isObjectLike(expected))) {
        if (actual !== actual && expected !== expected) {
            return true;
        } else {
            return false;
        }
    }
    if (xor(isObjectLike(actual), isObjectLike(expected))) {
        return false;
    }
    // TODO:refactor and use typeguards
    if (actual instanceof Map || expected instanceof Map) {
        if (xor(actual instanceof Map, expected instanceof Map)) {
            return false;
        }
        if ((actual as any as Map<any, any>).size !== (expected as any as Map<any, any>).size && !partial) {
            return false;
        }
        return [...(expected as any as Map<any, any>).entries()]
            .every(([key, value]) => {
                if (!(actual as any as Map<any, any>).has(key)) {
                    return false;
                }
                return match(value, (actual as any as Map<any, any>).get(key), { mutate, partial });
            });
    }
    if (actual instanceof WeakMap || expected instanceof WeakMap) {
        return false;
    }
    if (actual instanceof Set || expected instanceof Set) {
        if (xor(actual instanceof Set, expected instanceof Set)) {
            return false;
        }
        if ((actual as any as Set<any>).size !== (expected as any as Set<any>).size && !partial) {
            return false;
        }
        return [...(expected as any as Set<any>).values()]
            .every(value => {
                return (actual as any as Set<any>).has(value);
            });
    }
    if (actual instanceof WeakSet || expected instanceof WeakSet) {
        return false;
    }
    if (actual instanceof Date || expected instanceof Date) {
        if (xor(actual instanceof Date, expected instanceof Date)) {
            return false;
        }
        if ((actual as any as Date).getTime() !== (expected as any as Date).getTime()) {
            return false;
        }
        return true;
    }
    if (Array.isArray(actual) || Array.isArray(expected)) {
        if (xor(Array.isArray(actual), Array.isArray(expected))) {
            return false;
        }
        if ((actual as any as any[]).length !== (expected as any as any[]).length && !partial) {
            return false;
        }
        return (actual as any as any[]).every((value, index) => {
            if (index >= (expected as any).length) {
                return true;
            }
            return match(value, expected[index], { mutate, partial });
        });
    }
    if (Object.keys(actual).length !== Object.keys(expected).length && !partial) {
        return false;
    }
    for (const i in actual) {
        if (!(i in expected)) {
            if (partial) {
                continue;
            }
            return false;
        }
        if (isAny(expected[i])) {
            if (mutate) {
                // so diffs don't show any in case of mismatches elsewhere
                expected[i] = actual[i];
            }
            return true;
        }
        if (!match(actual[i], expected[i], { mutate, partial })) {
            return false;
        }
    }
    return true;
};
