import { Report } from 'hein-assertion-utils';

export interface Constructor<T = any> {
    new (...args: any[]): T;
}

export type ErrorPredicate = (error: Error) => boolean;

export const isConstructor = (value: any): value is Constructor => {
    return typeof value === 'function' && value.prototype && value.prototype.isPrototypeOf;
};

export const isErrorConstructor = (value: any): value is Constructor<Error> => {
    return isConstructor(value) && value.prototype instanceof Error;
};

type ThrowsMessages =
    | 'invalidArgument'
    | 'nonError'
    | 'throws'
    | 'invalidConstructor'
    | 'predicate'
    | 'regex'
    | 'not'
    | 'notConstructor'
    | 'notPredicate'
    | 'notRegex';

export const processError = (report: Report<ThrowsMessages>, error: Error, narrowerOrMessage, message) => {
    message = (typeof narrowerOrMessage === 'string' ? narrowerOrMessage : message) ?? null;

    if (!(error instanceof Error)) {
        return report({
            noStringify: true,
            status: 'notok',
            messageId: 'nonError',
            actual: typeof error,
            expected: 'Error'
        });
    }
    if (narrowerOrMessage) {
        if (isConstructor(narrowerOrMessage)) {
            if (!(error instanceof narrowerOrMessage)) {
                return report({
                    noStringify: true,
                    status: 'notok',
                    messageId: 'invalidConstructor',
                    actual: error.name,
                    expected: narrowerOrMessage.name,
                    message
                });
            }
            return report({
                noStringify: true,
                status: 'ok',
                messageId: 'notConstructor',
                actual: error.name,
                expected: narrowerOrMessage.name,
                message
            });
        } else if (typeof narrowerOrMessage === 'function') {
            if (!(narrowerOrMessage as ErrorPredicate)(error)) {
                return report({
                    noStringify: true,
                    status: 'notok',
                    messageId: 'predicate',
                    actual: error,
                    expected: null,
                    message
                });
            }
            return report({
                noStringify: true,
                status: 'ok',
                messageId: 'notPredicate',
                actual: error,
                expected: null,
                message
            });
        } else if (typeof narrowerOrMessage === 'string') {
            return report({
                noStringify: true,
                status: 'ok',
                messageId: 'throws',
                actual: error,
                message: narrowerOrMessage
            });
        } else if (narrowerOrMessage instanceof RegExp) {
            if (!narrowerOrMessage.test(error.message)) {
                return report({
                    noStringify: true,
                    status: 'notok',
                    messageId: 'regex',
                    actual: error.message,
                    expected: narrowerOrMessage.toString(),
                    message
                });
            }
            return report({
                noStringify: true,
                status: 'ok',
                messageId: 'notRegex',
                actual: error.message,
                expected: narrowerOrMessage.toString(),
                message
            });
        }
    }
    return report({ noStringify: true, status: 'ok', actual: error, message });
};
