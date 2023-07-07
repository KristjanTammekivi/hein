import { isObjectLike } from 'lodash';
import { AssertionError, createAssertion } from 'hein-assertion-utils';
import { getType } from '../utils/get-type';
import { Constructor } from '../utils/process-error';

interface InstanceOf {
    /**
     * check if value is an instance of a constructor
     * @param value
     * @param constructor
     * @example instanceOf(new Error(), Error);
     */
    <T extends Constructor>(value: InstanceType<T>, constructor: T): void;
}

export const [instanceOf, notInstanceOf] = createAssertion({
    messages: {
        notInstanceOf: 'Expected {{actual}} to be an instance of {{expected}}',
        not: 'Expected {{actual}} to not be an instance of {{expected}}'
    },
    test: (report): InstanceOf => (actual: any, expected: Constructor) => {
        if (!isObjectLike(actual)) {
            throw new AssertionError(getType(actual), 'object', 'Expected value to be an object');
        }
        if (!(actual instanceof expected)) {
            return report({ status: 'notok', messageId: 'notInstanceOf', expected: expected.name, actual: actual.constructor.name, noStringify: true });
        }
        return report({ status: 'ok', expected: expected.name, actual: actual.constructor.name, messageId: 'not', noStringify: true });
    }
});
