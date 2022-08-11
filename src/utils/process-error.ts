import { Report } from './assertion';

export interface Constructor<T = any> {
    new(...args: any[]): T;
}

export type ErrorPredicate = (error: Error) => boolean;

export const isConstructor = (value: any): value is Constructor => {
    return typeof value === 'function' && value.prototype && value.prototype.isPrototypeOf;
};

export const isErrorConstructor = (value: any): value is Constructor<Error> => {
    return isConstructor(value) && value.prototype instanceof Error;
};


type ThrowsMessages = 'invalidArgument' |
    'nonError' |
    'throws' |
    'invalidConstructor' |
    'predicate' |
    'regex' |
    'not' |
    'notConstructor' |
    'notPredicate' |
    'notRegex';

export const processError = (report: Report<ThrowsMessages>, e: Error, e2, e3) => {
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
