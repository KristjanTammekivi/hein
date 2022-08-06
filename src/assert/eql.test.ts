import { any, eql, notEql } from './eql';
import { throws } from './throws';

describe('eql', () => {
    it('should not throw if objects are strictly equal', () => {
        const obj = { a: 1 };
        eql(obj, obj);
    });
    it('should not throw if both values are the same numbers', () => {
        eql(1, 1);
    });
    it('should throw if both values are numbers but they are different', () => {
        throws(() => eql(1, 2));
    });
    it('should not throw if both values are NaN', () => {
        eql(NaN, NaN);
    });
    it('should throw if values are strings', () => {
        throws(() => eql('a', 'b'));
    });
    it('should throw if values are booleans', () => {
        throws(() => eql(true, false));
    });
    it('should throw if values are BigInts', () => {
        throws(() => eql(BigInt(1), BigInt(2)));
    });
    it('should not throw if values are BigInts', () => {
        eql(BigInt(1), BigInt(1));
    });
    it('should throw if one value is null', () => {
        throws(() => eql(null, 1));
    });
    it('should throw if one value is undefined', () => {
        throws(() => eql(undefined, 1));
    });
    it('should not throw if arrays have primitives and are deep equal', () => {
        eql([1, 'a', true, null, undefined], [1, 'a', true, null, undefined]);
    });
    it('should throw if one argument is array and the other an object', () => {
        throws(() => eql([0], { 0: 0 }));
    });
    it('should throw if arrays have primitives and are not deeply equal', () => {
        throws(() => eql([1], [2]));
    });
    it('should throw if expected array is longer than actual', () => {
        throws(() => eql([1], [1, 2]));
    });
    it('should not throw if objects have the same keys', () => {
        eql({ a: 1 }, { a: 1 });
    });
    it('should throw if objects are not strictly equal', () => {
        throws(() => eql({ a: 1 }, { a: 2 }));
    });
    it('should throw if expected has more keys than actual');
    it.skip('should throw if expectation has extra properties', () => {
        throws(() => eql({ a: 1, b: 2 }, { a: 1 }));
    });
    it.skip('should replace a property with any()', () => {
        eql({ a: 1, b: 2 }, { a: 1, b: any() });
    });
    it.skip('should reject with correct message', () => {
        throws(() => eql({ a: 1, b: 2 }, { a: 1, b: 3 }), /Expected { a: 1, b: 2 } to deep equal { a: 1, b: 3 }/);
    });
    describe.skip('notEql', () => {
        it('should not throw if values are different', () => {
            notEql({ a: 1 }, { a: 2 });
        });
        it('should throw if values are the same', () => {
            throws(() => notEql({ a: 1 }, { a: 1 }), /Expected { a: 1 } to not deep equal { a: 1 }/);
        });
    });
});
