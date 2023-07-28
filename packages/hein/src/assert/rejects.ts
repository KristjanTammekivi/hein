import { createAssertion } from 'hein-assertion-utils';
import { Constructor, ErrorPredicate, processError } from '../utils/process-error';

interface Rejects {
    /**
     * check if promise rejects
     * @param promise
     * @example rejects(Promise.reject());
     */
    (promise: Promise<any>, message?: string): Promise<void>;
    /**
     * check if promise rejects with an instance of constructor
     * @param promise
     * @param constructor - expected error constructor
     * @example rejects(Promise.reject(new Error()), Error);
     */
    (promise: Promise<any>, constructor: Constructor, message?: string): Promise<void>;
    /**
     * check if promise rejects with a specific error message
     * @param promise
     * @param regex - expected error message regex
     * @example rejects(Promise.reject(new Error('This is worrying)), /worrying/);
     */
    (promise: Promise<any>, constructor: RegExp, message?: string): Promise<void>;
    /**
     * check if promise rejects with and matches the predicate function
     * @param promise
     * @param predicate - predicate function that receives the error and returns boolean
     * @example rejects(Promise.reject(new Error('This is worrying')), (error) => error.message === 'This is worrying');));
     */
    (promise: Promise<any>, constructor: ErrorPredicate, message?: string): Promise<void>;
}

export const [rejects, notRejects] = createAssertion({
    messages: {
        invalidArgument: 'Expected {{actual}} to be a Promise',
        nonError: 'Expected Promise to reject with an instance of Error',
        throws: 'Expected Promise to reject',
        invalidConstructor: 'Expected Promise to reject with {{expected}}',
        predicate: 'Expected {{actual}} to match predicate function',
        regex: 'Expected Promise to reject with an error matching {{expected}}',
        not: 'Expected Promise to not reject',
        notConstructor: 'Expected Promise to not reject with a {{expected}}',
        notPredicate: 'Expected {{actual}} to not match predicate function',
        notRegex: 'Expected Promise to not reject with an error matching {{expected}}'
    },
    test:
        (report): Rejects =>
        async (promise: Promise<any>, narrowerOrMessage?, message?) => {
            // TODO: invalid argument in not case
            if (!promise || typeof promise.then !== 'function') {
                report({ noStringify: true, status: 'notok', messageId: 'invalidArgument', actual: typeof promise, expected: 'Promise' });
                return;
            }
            try {
                await promise;
            } catch (error) {
                processError(report, error, narrowerOrMessage, message);
                return;
            }
            report({
                noStringify: true,
                status: 'notok',
                messageId: 'throws',
                message: typeof narrowerOrMessage === 'string' ? narrowerOrMessage : message
            });
            return;
        }
});
