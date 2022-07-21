import { eql } from './eql';
import { throws } from './throws';

describe('eql', () => {
    it('should not throw if types are strictly equal', () => {
        eql({ a: 1 }, { a: 1 });
    });
    it('should throw if types are not strictly equal', () => {
        throws(() => eql({ a: 1 }, { a: 2 }));
    });
    it('should throw if expectation has extra properties', () => {
        throws(() => eql({ a: 1, b: 2 }, { a: 1 }));
    });
});
