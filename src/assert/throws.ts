import { createAssertion, Report } from '../utils';

export type ThrowsCallback = () => unknown;
export const isThrowsCallback = (value: any): value is ThrowsCallback => {
    return typeof value === 'function';
};

export interface Constructor<T = any> {
    new(...args: any[]): T;
}

export type ErrorPredicate = (error: Error) => boolean;

interface Throw {
    (callback: ThrowsCallback, message?: string): void;
    (callback: ThrowsCallback, expectedError: Constructor | RegExp | ErrorPredicate, message?: string): void;
}

export const isConstructor = (value: any): value is Constructor => {
    return typeof value === 'function' && value.prototype && value.prototype.isPrototypeOf;
};

export const isErrorConstructor = (value: any): value is Constructor<Error> => {
    return isConstructor(value) && value.prototype instanceof Error;
};

const messages = {
    invalidArgument: 'Expected {{actual}} to be a function',
    nonError: 'Expected function to throw an instance of Error',
    throws: 'Expected function to throw',
    invalidConstructor: 'Expected function to throw {{expected}}',
    predicate: 'Expected {{actual}} to match predicate function',
    regex: 'Expected function to throw an error matching {{expected}}',
    not: 'Expected function to not throw',
    notConstructor: 'Expected function to not throw a {{expected}}',
    notPredicate: 'Expected function to not throw an error matching the predicate',
    notRegex: 'Expected function to not throw an error matching {{expected}}'
};

export const [throws, notThrows] = createAssertion({
    messages: messages,
    test: (report) => ((callback, e2, e3) => {
        if (typeof callback !== 'function') {
            return report({ noStringify: true, status: 'notok', messageId: 'invalidArgument', actual: typeof callback, expected: 'function' });
        }
        try {
            callback();
        } catch (e) {
            return processError(report, e, e2, e3);
        }
        return report({ noStringify: true, status: 'notok', messageId: 'throws', message: typeof e2 === 'string' ? e2 : e3 });
    }) as Throw
});

export const processError = (report: Report<keyof typeof messages>, e: Error, e2, e3) => {
    const message = (typeof e2 === 'string' ? e2 : e3) ?? null;

    if (!(e instanceof Error)) {
        return report({ noStringify: true, status: 'notok', messageId: 'nonError', actual: typeof e, expected: 'Error' });
    }
    if (e2) {
        if (isConstructor(e2)) {
            if (!(e instanceof e2)) {
                return report({ noStringify: true, status: 'notok', messageId: 'invalidConstructor', actual: e.name, expected: e2.name, message });
            }
            return report({ noStringify: true, status: 'ok', messageId: 'notConstructor', actual: e.name, expected: e2.name, message });
        } else if (typeof e2 === 'function') {
            if (!(e2 as ErrorPredicate)(e)) {
                return report({ noStringify: true, status: 'notok', messageId: 'predicate', actual: e, expected: null, message });
            }
            return report({ noStringify: true, status: 'ok', messageId: 'notPredicate', actual: e, expected: null, message });
        } else if (typeof e2 === 'string') {
            return report({ noStringify: true, status: 'ok', messageId: 'throws', actual: e, message: e2 });
        } else if (e2 instanceof RegExp) {
            if (!e2.test(e.message)) {
                return report({ noStringify: true, status: 'notok', messageId: 'regex', actual: e.message, expected: e2.toString(), message });
            }
            return report({ noStringify: true, status: 'ok', messageId: 'notRegex', actual: e.message, expected: e2.toString(), message });
        }
    }
    return report({ noStringify: true, status: 'ok', actual: e, message });
};
