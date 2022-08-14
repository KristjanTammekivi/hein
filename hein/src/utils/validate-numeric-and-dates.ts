import { AssertionError } from './assertion';
import { ValueType, getType } from './get-type';

const allowedTypes: (ValueType | 'date')[] = ['number', 'bigint', 'date'];

export const validateNumericsAndDates = (actual: any, expected: any) => {
    const actualType = actual instanceof Date ? 'date' : getType(actual);
    const expectedType = expected instanceof Date ? 'date' : getType(expected);
    if (!allowedTypes.includes(actualType) || !allowedTypes.includes(expectedType)) {
        throw new AssertionError(actualType, expectedType, `Expected arguments to be ${ allowedTypes.join('/') }, received ${ actualType }/${ expectedType }`);
    }
};
