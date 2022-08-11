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

export const createEvaluation = (callback: (value: any) => boolean): Evaluation => {
    const evaluation = (value: any): boolean => {
        return callback(value);
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
        return actual !== actual && expected !== expected;
    }

    if (actual instanceof Map || expected instanceof Map) {
        if (!(actual instanceof Map && expected instanceof Map)) {
            return false;
        }
        if (actual.size !== expected.size && !partial) {
            return false;
        }
        return [...expected.entries()]
            .every(([key, value]) => {
                if (!actual.has(key)) {
                    return false;
                }
                const actualValue = actual.get(key);
                if (mutate) {
                    if (isEvaluation(value)) {
                        expected.set(key, actualValue);
                        return value(actualValue);
                    }
                    if (isAny(value)) {
                        expected.set(key, actualValue);
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
        if (!(actual instanceof Set && expected instanceof Set)) {
            return false;
        }
        if (actual.size !== expected.size && !partial) {
            return false;
        }
        return [...expected.values()]
            .every(value => {
                return actual.has(value);
            });
    }
    if (actual instanceof WeakSet || expected instanceof WeakSet) {
        return false;
    }
    if (actual instanceof Date || expected instanceof Date) {
        if (!(actual instanceof Date && expected instanceof Date)) {
            const date1 = new Date(actual as any);
            const date2 = new Date(expected as any);
            return date1.getTime() === date2.getTime();
        }
        if (actual.getTime() !== expected.getTime()) {
            return false;
        }
        return true;
    }
    if (xor(isObjectLike(actual), isObjectLike(expected))) {
        return false;
    }
    if (Array.isArray(actual) || Array.isArray(expected)) {
        if (!(Array.isArray(actual) && Array.isArray(expected))) {
            return false;
        }
        if (actual.length !== expected.length && !partial) {
            return false;
        }
        return actual.every((value, index) => {
            if (index >= expected.length) {
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
    for (const index in actual) {
        const expectedValue = expected[index];
        const actualValue = actual[index];
        if (!(index in expected)) {
            if (partial) {
                continue;
            }
            return false;
        }
        if (isAny(expectedValue)) {
            if (mutate) {
                // so diffs don't show any in case of mismatches elsewhere
                expected[index] = actualValue;
            }
            return true;
        }
        if (isEvaluation(expectedValue)) {
            if (!expectedValue(actualValue)) {
                return false;
            }
            if (mutate) {
                expected[index] = actualValue;
            }
        }
        if (!match(actual[index], expectedValue, { mutate, partial })) {
            return false;
        }
    }
    return true;
};
