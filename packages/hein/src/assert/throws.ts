import { AssertionError, createAssertion } from 'hein-assertion-utils';
import { getType } from '../utils/get-type';
import { Constructor, ErrorPredicate, processError } from '../utils/process-error';

export type ThrowsCallback = () => unknown;

interface Throw {
    /**
     * check if function throws an error
     * @param callback
     * @example throws(() => { throw new Error('foo'); });
     * @example throws(() => { throw new TypeError('foo'); }, TypeError);
     */
    (callback: ThrowsCallback, message?: string): void;
    /**
     * check if function throws an error matching the constructor
     * @param callback
     * @example throws(() => { throw new TypeError('foo'); }, TypeError);
     */
    (callback: ThrowsCallback, expectedError: Constructor, message?: string): void;
    /**
     * check if function throws an error matching the regex
     * @param callback
     * @example throws(() => { throw new Error('foo'); });
     * @example throws(() => { throw new TypeError('foo'); }, /foo/);
     */
    (callback: ThrowsCallback, expectedError: RegExp, message?: string): void;
    /**
     * check if function throws an error matching the predicate function
     * @param callback
     * @example throws(() => { throw new TypeError('foo'); }, (error) => error.message === 'foo');
     */
    (callback: ThrowsCallback, expectedError: ErrorPredicate, message?: string): void;
}

const messages = {
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
    test: (report) =>
        ((callback, narrowerOrMessage, message) => {
            const argumentType = getType(callback);
            if (argumentType !== 'function') {
                throw new AssertionError(argumentType, 'function', `Expected ${ argumentType } to be a function`);
            }
            try {
                callback();
            } catch (error) {
                return processError(report, error, narrowerOrMessage, message);
            }
            return report({
                noStringify: true,
                status: 'notok',
                messageId: 'throws',
                message: typeof narrowerOrMessage === 'string' ? narrowerOrMessage : message
            });
        }) as Throw
});
