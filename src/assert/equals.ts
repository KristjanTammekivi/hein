import { SameButDifferentAssertionError, stringify } from '../utils';

export const equals = <T>(actual: T, expected: T, message?: string) => {
    if (actual !== expected) {
        throw new SameButDifferentAssertionError(actual, expected, message || `Expected ${ stringify(actual) } to equal ${ stringify(expected) }`);
    }
};
