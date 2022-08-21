import { cloneDeep } from 'lodash';
import { createAssertion } from 'hein-assertion-utils';
import { match } from '../utils/match';

export const [deepEqual, notDeepEqual] = createAssertion({
    messages: {
        notEql: 'Expected {{actual}} to deep equal {{expected}}',
        not: 'Expected {{actual}} to not deep equal {{expected}}'
    },
    test: (report) => <T>(actual: T, expected: T, partialOrMessage: string | boolean = false, message?: string) => {
        const partial = typeof partialOrMessage === 'boolean' ? partialOrMessage : false;
        message = typeof partialOrMessage === 'string' ? partialOrMessage : message;
        if (typeof expected !== 'function') {
            // TODO: evaluations
            expected = cloneDeep(expected);
        }
        if (match(actual, expected, { mutate: true, partial })) {
            return report({ message, status: 'ok', expected, actual });
        }
        return report({ message, status: 'notok', messageId: 'notEql', expected, actual });
    }
});
