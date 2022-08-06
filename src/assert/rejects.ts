import { createAssertion } from '../utils';
import { ErrorPredicate, isConstructor, processError } from './throws';
/*
invalidArgument: 'Expected {{actual}} to be a function',
invalidThrow: 'Expected function to throw an instance of Error',
throws: 'Expected function to throw',
throwsConstructor: 'Expected function to throw {{expected}}',
throwsError: 'Expected {{actual}} to match predicate function',
throwsRegex: 'Expected function to throw an error matching {{expected}}',
not: 'Expected function to not throw',
notConstructor: 'Expected function to not throw a {{expected}}',
notError: 'Expected function to not throw an error matching the predicate',
notRegex: 'Expected function to not throw an error matching {{expected}}'
*/
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
    test: (report) => (async (promise: Promise<any>, e2?, e3?) => {
        if (!promise || typeof promise.then !== 'function') {
            return report({ noStringify: true, status: 'notok', messageId: 'invalidArgument', actual: typeof promise, expected: 'Promise' });
        }
        try {
            await promise;
        } catch (e) {
            return processError(report, e, e2, e3);
        }
        return report({ noStringify: true, status: 'notok', messageId: 'throws', message: typeof e2 === 'string' ? e2 : e3 });
    })
});
