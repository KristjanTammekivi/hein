import { createAssertion } from '../utils/assertion';
import { processError } from '../utils/process-error';

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
    test: (report) => async (promise: Promise<any>, narrowerOrMessage?, message?) => {
        // TODO: invalid argument in not case
        if (!promise || typeof promise.then !== 'function') {
            return report({ noStringify: true, status: 'notok', messageId: 'invalidArgument', actual: typeof promise, expected: 'Promise' });
        }
        try {
            await promise;
        } catch (error) {
            return processError(report, error, narrowerOrMessage, message);
        }
        return report({ noStringify: true, status: 'notok', messageId: 'throws', message: typeof narrowerOrMessage === 'string' ? narrowerOrMessage : message });
    }
});
