import { throws } from '../assert';
import { isType, notIsType } from '../assert';

describe('assert/isType', () => {
    it('should not throw if actual is of correct type', () => {
        isType('a', 'string');
    });
    it('should throw if actual is of wrong type', () => {
        throws(() => isType('a', 'number'), /Expected string to be a\(n\) number/);
    });
    it('should not throw for null, null', () => {
        isType(null, 'null');
    });
    it('should throw for string, null', () => {
        throws(() => isType({}, 'null'), /Expected object to be a\(n\) null/);
    });
    it('should not throw for array, array', () => {
        isType([], 'array');
    });
    it('should throw for string, array', () => {
        throws(() => isType('a', 'array'), /Expected string to be a\(n\) array/);
    });
    it('should not throw if NaN and expecting NaN', () => {
        isType(Number.NaN, 'NaN');
    });
    describe('assert/notIsType', () => {
        it('should not throw if actual has wrong type', () => {
            notIsType('a', 'number');
        });
        it('should throw if actual has correct type', () => {
            throws(() => notIsType('a', 'string'), /Expected string to not be a\(n\) string/);
        });
    });
});
