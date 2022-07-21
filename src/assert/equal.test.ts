import { equal } from './equal';
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
});
