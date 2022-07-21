import { deepStrictEqual } from 'node:assert/strict';

export const eql = <T>(actual: T, expected: T, message?: string) => {
    deepStrictEqual(actual, expected, message);
};
