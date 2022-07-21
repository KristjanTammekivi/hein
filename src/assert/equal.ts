import { AssertionError, stringify } from '../utils';

export const equal = <T>(actual: T, expected: T, message?: string) => {
    if (actual !== expected) {
        throw new AssertionError(actual, expected, message || `Expected ${ stringify(actual) } to equal ${ stringify(expected) }`);
    }
};
