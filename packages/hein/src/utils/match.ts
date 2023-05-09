import { isObjectLike } from 'lodash';
import { xor } from './xor';

const evaluationSymbol: unique symbol = Symbol();

interface Evaluation {
    [evaluationSymbol]: true;
    (value: any): boolean;
}

export const createEvaluation = (callback: (value: any) => boolean): any => {
    const evaluation = (value: any): boolean => {
        return callback(value);
    };
    evaluation[evaluationSymbol] = true;
    return evaluation as Evaluation;
};

export const any = createEvaluation(() => true);

export const isEvaluation = (value: any): value is Evaluation => value && value[evaluationSymbol];

interface MatchOptions {
    mutate?: boolean;
    partial?: boolean;
}

export const match = <T>(actual: T, expected: T, { mutate = false, partial = false }: MatchOptions = {}): boolean => {
    if (actual === expected) {
        return true;
    }
    if (isEvaluation(expected)) {
        return expected(actual);
    }

    if (actual == null || expected == null || (!isObjectLike(actual) && !isObjectLike(expected))) {
        return actual !== actual && expected !== expected;
    }
    let result = true;
    if (actual instanceof Map || expected instanceof Map) {
        if (!(actual instanceof Map && expected instanceof Map)) {
            return false;
        }
        if (actual.size !== expected.size && !partial) {
            result = false;
        }
        for (const [key, value] of expected.entries()) {
            if (!actual.has(key)) {
                result = false;
                continue;
            }
            const actualValue = actual.get(key);
            if (mutate && isEvaluation(value)) {
                expected.set(key, actualValue);
                result &&= value(actualValue);
                continue;
            }
            result = match(actualValue, value, { mutate, partial }) && result;
            continue;
        }
        return result;
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
            result = false;
        }
        for (const [index, value] of actual.entries()) {
            if (index >= expected.length) {
                continue;
            }
            const expectedValue = expected[index];
            if (mutate && isEvaluation(expectedValue)) {
                const matchesEvaluation = expectedValue(value);
                if (matchesEvaluation) {
                    expected[index] = value;
                }
                result &&= matchesEvaluation;
                continue;
            }
            result &&= match(value, expectedValue, { mutate, partial });
            continue;
        }
        return result;
    }
    if (Object.keys(actual).length !== Object.keys(expected).length && !partial) {
        result = false;
    }
    for (const index in actual) {
        const expectedValue = expected[index];
        const actualValue = actual[index];
        if (!(index in (expected as object))) {
            if (partial) {
                continue;
            }
            result &&= false;
            continue;
        }
        if (isEvaluation(expectedValue)) {
            if (!expectedValue(actualValue)) {
                result &&= false;
                continue;
            }
            if (mutate) {
                expected[index] = actualValue;
            }
            continue;
        }
        if (!match(actual[index], expectedValue, { mutate, partial })) {
            result = false;
        }
    }
    return result;
};
