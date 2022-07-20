import { SameButDifferentAssertionError, stringify } from '../utils';

type ThrowsCallback = () => unknown;

interface Throws {
    (callback: ThrowsCallback, message?: string): void;
    (callback: ThrowsCallback, expectedError: Error | RegExp | ((error: Error) => boolean), message?: string): void;
}

export const throws = ((callback, e1, e2) => {
    try {
        callback();
    } catch (e) {
        if (e1 instanceof RegExp) {
            if (!e1.test(e.message)) {
                throw new SameButDifferentAssertionError(e.message, e1, `Expected ${ stringify(e.message) } to match ${ stringify(e1) }`);
            }
        }
        return;
    }
    if (e1) {
        if (typeof e1 === 'string') {
            throw new SameButDifferentAssertionError(null, null, e1);
        }
    }
    throw new Error('Expected function to throw');
}) as Throws;
