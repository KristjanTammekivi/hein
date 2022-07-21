import { AssertionError, stringify } from '../utils';

export type ThrowsCallback = () => unknown;
export const isThrowsCallback = (value: any): value is ThrowsCallback => {
    return typeof value === 'function';
};

interface Constructor<T = any> {
    new(...args: any[]): T;
}

type ErrorPredicate = (error: Error) => boolean;

interface Throw {
    (callback: ThrowsCallback, message?: string): void;
    (callback: ThrowsCallback, expectedError: Constructor | RegExp | (ErrorPredicate), message?: string): void;
}

const isConstructor = (value: any): value is Constructor => {
    return typeof value === 'function' && value.prototype && value.prototype.isPrototypeOf;
};

const isErrorConstructor = (value: any): value is Constructor<Error> => {
    return isConstructor(value) && value.prototype instanceof Error;
};

export const throws = ((callback, e1, e2) => {
    try {
        callback();
    } catch (e) {
        if (e1 instanceof RegExp) {
            if (!e1.test(e.message)) {
                throw new AssertionError(e.message, e1, e2 ?? `Expected ${ stringify(e.message) } to match ${ stringify(e1) }`);
            }
        }
        if (isErrorConstructor(e1)) {
            if (!(e instanceof e1)) {
                throw new AssertionError(e, e1, e2 ?? `Expected ${ e.name } to be an instance of ${ stringify(e1) }`);
            }
        } else if (typeof e1 === 'function') {
            if (!(e1 as ErrorPredicate)(e)) {
                throw new AssertionError(e, e1, e2 ?? `Expected ${ stringify(e) } to match predicate function`);
            }
        }
        return;
    }
    if (e1) {
        if (typeof e1 === 'string') {
            throw new AssertionError(null, null, e1);
        }
    }
    throw new Error('Expected function to throw');
}) as Throw;
