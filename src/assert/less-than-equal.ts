import { AssertionError } from 'assert';
import { createAssertion } from '../utils/assertion';
import { getType, ValueType } from './is-type';

const allowedTypes: (ValueType | 'date')[] = ['number', 'bigint', 'date'];

export const validateNumericsAndDates = (actual: any, expected: any) => {
    const actualType = actual instanceof Date ? 'date' : getType(actual);
    const expectedType = expected instanceof Date ? 'date' : getType(expected);
    if (!allowedTypes.includes(actualType) || !allowedTypes.includes(expectedType)) {
        throw new AssertionError({
            message: `Expected arguments to be ${ allowedTypes.join('/') }, received ${ actualType }/${ expectedType }`,
            actual: actualType,
            expected: allowedTypes.join('/')
        });
    }
};

interface LessThanEqual {
    /**
     * check for <=
     */
    <T extends number | bigint | Date>(actual: T, expected: T, message?: string): void;
}

export const [lessThanEqual, notLessThanEqual] = createAssertion({
    messages: {
        lesserThanEqual: 'Expected {{actual}} to be less than or equal to {{expected}}',
        not: 'Expected {{actual}} to not be less than or equal to {{expected}}'
    },
    test: (report): LessThanEqual => (actual: any, expected: any, message?: string) => {
        validateNumericsAndDates(actual, expected);
        if (actual > expected) {
            return report({ status: 'notok', messageId: 'lesserThanEqual', actual, expected, message, noStringify: true });
        }
        return report({ status: 'ok', actual, expected, message, messageId: 'not', noStringify: true });
    }
});
