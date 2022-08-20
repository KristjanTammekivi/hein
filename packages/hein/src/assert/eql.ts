import { cloneDeep } from 'lodash';
import { createAssertion } from 'hein-assertion-utils';
import { match } from '../utils/match';

export const [eql, notEql] = createAssertion({
    messages: {
        notEql: 'Expected {{actual}} to deep equal {{expected}}',
        not: 'Expected {{actual}} to not deep equal {{expected}}'
    },
    test: (report) => <T>(actual: T, expected: T, message?: string) => {
        if (typeof expected !== 'function') {
            // TODO: evaluations
            expected = cloneDeep(expected);
        }
        if (match(actual, expected, { mutate: true })) {
            return report({ message, status: 'ok', expected, actual });
        }
        return report({ message, status: 'notok', messageId: 'notEql', expected, actual });
    }
});
