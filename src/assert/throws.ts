import { createAssertion } from '../utils/assertion';
import { Constructor, ErrorPredicate, processError } from '../utils/process-error';

export type ThrowsCallback = () => unknown;
export const isThrowsCallback = (value: any): value is ThrowsCallback => {
    return typeof value === 'function';
};

interface Throw {
    (callback: ThrowsCallback, message?: string): void;
    (callback: ThrowsCallback, expectedError: Constructor | RegExp | ErrorPredicate, message?: string): void;
}


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

