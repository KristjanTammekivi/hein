import { isObjectLike } from 'lodash';
import { xor } from './xor';

const anySymbol: unique symbol = Symbol();

interface Any {
    [anySymbol]: true;
}

export const any = (): any => ({ [anySymbol]: true });

const isAny = (value: any): value is Any => value && value[anySymbol];

const evaluationSymbol: unique symbol = Symbol();

interface Evaluation {
    [evaluationSymbol]: true;
    (value: any): boolean;
}

export const createEvaluation = (fn: (value: any) => boolean): Evaluation => {
    const evaluation = (value: any): boolean => {
        return fn(value);
    };
    evaluation[evaluationSymbol] = true;
    return evaluation as Evaluation;
};

const isEvaluation = (value: any): value is Evaluation => value && value[evaluationSymbol];

interface MatchOptions {
    mutate?: boolean;
    partial?: boolean;
}

export const match = <T>(actual: T, expected: T, { mutate = false, partial = false }: MatchOptions = {}): boolean => {
    if (actual === expected) {
        return true;
    }
    if (isAny(expected)) {
        return true;
    }
    if (isEvaluation(expected)) {
        return expected(actual);
    }

    if (actual == null || expected == null || (!isObjectLike(actual) && !isObjectLike(expected))) {
        if (actual !== actual && expected !== expected) {
            return true;
        } else {
            return false;
        }
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
                const actualValue = (actual as any as Map<any, any>).get(key);
                if (mutate) {
                    if (isEvaluation(value)) {
                        (expected as any as Map<any, any>).set(key, actualValue);
                        return value(actualValue);
                    }
                    if (isAny(value)) {
                        (expected as any as Map<any, any>).set(key, actualValue);
                        return true;
                    }
                }
                return match(value, actualValue, { mutate, partial });
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
            const date1 = new Date(actual as any);
            const date2 = new Date(expected as any);
            return date1.getTime() === date2.getTime();
        }
        if ((actual as any as Date).getTime() !== (expected as any as Date).getTime()) {
            return false;
        }
        return true;
    }
    if (xor(isObjectLike(actual), isObjectLike(expected))) {
        return false;
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
            const expectedValue = expected[index];
            if (mutate) {
                if (isEvaluation(expectedValue)) {
                    const result = expectedValue(value);
                    if (result) {
                        expected[index] = value;
                    }
                    return result;
                }
                if (isAny(expectedValue)) {
                    expected[index] = value;
                    return true;
                }
            }
            return match(value, expectedValue, { mutate, partial });
        });
    }
    if (Object.keys(actual).length !== Object.keys(expected).length && !partial) {
        return false;
    }
    for (const i in actual) {
        const expectedValue = expected[i];
        const actualValue = actual[i];
        if (!(i in expected)) {
            if (partial) {
                continue;
            }
            return false;
        }
        if (isAny(expectedValue)) {
            if (mutate) {
                // so diffs don't show any in case of mismatches elsewhere
                expected[i] = actualValue;
            }
            return true;
        }
        if (isEvaluation(expectedValue)) {
            if (!expectedValue(actualValue)) {
                return false;
            }
            if (mutate) {
                expected[i] = actualValue;
            }
        }
        if (!match(actual[i], expectedValue, { mutate, partial })) {
            return false;
        }
    }
    return true;
};
