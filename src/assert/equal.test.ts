import { equal, notEqual } from './equal';
import { throws } from './throws';

describe('equals', () => {
    it('should not throw if two values are equal', () => {
        equal(1, 1);
    });
    it('should throw if two values are not equal', () => {
        throws(() => {
            // @ts-expect-error intentionally wrong type
            equal(1, 'a');
        }, /Expected 1 to equal 'a'/);
    });
    it('should throw custom error message if provided', () => {
        throws(() => {
            equal(1, 2, 'Things are bad');
        }, /Things are bad/);
    });
    it('should throw if two values are only deep equal', () => {
        throws(() => {
            equal({ a: 1 }, { a: 1 });
        }, /Expected { a: 1 } to equal { a: 1 }/);
    });
    it('should consider NaN as equal', () => {
        equal(NaN, NaN);
    });
    describe('notEqual', () => {
        it('should throw if two values are equal', () => {
            throws(() => {
                notEqual(1, 1);
            }, /Expected 1 to not equal 1/);
        });
        it('should not throw if two values are not equal', () => {
            notEqual(1, 2);
        });
        it('should throw custom error message if provided', () => {
            throws(() => {
                notEqual(2, 2, 'Things are bad');
            }, /Things are bad/);
        });
        it('should not throw if two values are only deep equal', () => {
            notEqual({ a: 1 }, { a: 1 });
        });
        it('should consider NaN as equal', () => {
            throws(() => {
                notEqual(NaN, NaN);
            }, /Expected NaN to not equal NaN/);
        });
        it('should throw with custom message for notEqual(NaN, NaN)', () => {
            throws(() => {
                notEqual(NaN, NaN, 'Things are bad');
            }, /Things are bad/);
        });
    });
});
