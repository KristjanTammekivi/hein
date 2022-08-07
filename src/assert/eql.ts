import { cloneDeep } from 'lodash';
import { createAssertion } from '../utils/assertion';
import { match } from '../utils/match';

export const [eql, notEql] = createAssertion({
    messages: {
        notEql: 'Expected {{actual}} to deep equal {{expected}}',
        not: 'Expected {{actual}} to not deep equal {{expected}}'
    },
    test: (report) => <T>(actual: T, expected: T) => {
        if (typeof expected !== 'function') {
            expected = cloneDeep(expected);
        }
        if (match(actual, expected, { mutate: true })) {
            return report({ status: 'ok', expected, actual });
        }
        return report({ status: 'notok', messageId: 'notEql', expected, actual });
    }
});
