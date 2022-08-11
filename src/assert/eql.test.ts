import { any } from '../utils/match';
import { eql, notEql } from '../assert';
import { throws } from '../assert';

describe('eql', () => {
    it('should not throw for NaN', () => {
        eql(Number.NaN, Number.NaN);
    });
    it('should not throw if objects are strictly equal', () => {
        const object = { a: 1 };
        eql(object, object);
    });
    it('should not throw if both values are the same numbers', () => {
        eql(1, 1);
    });
    it('should throw if both values are numbers but they are different', () => {
        throws(() => eql(1, 2));
    });
    it('should not throw if both values are NaN', () => {
        eql(Number.NaN, Number.NaN);
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
    it('should throw if expected has more keys than actual', () => {
        throws(() => eql({ a: 1 }, { a: 1, b: 2 }));
    });
    it('should throw with 2 different symbols', () => {
        throws(() => eql(Symbol('a'), Symbol('a')));
    });
    it('should throw if nested values are different', () => {
        eql({ a: { b: 1 } }, { a: { b: 1 } });
    });
    it('should throw if second key is different', () => {
        throws(() => eql({ a: 1, b: 1 }, { a: 1, b: 2 }));
    });
    it('should throw if actual is a number but expected is an object', () => {
        throws(() => eql({ a: 1 }, { a: {} }));
    });
    it('should not throw if both values are the same functions', () => {
        const noop = () => { };
        eql(noop, noop);
    });
    it('should throw if both values are empty WeakMaps', () => {
        throws(() => eql(new WeakMap(), new WeakMap()));
    });
    it('should throw if both values are WeakSets', () => {
        throws(() => eql(new WeakSet(), new WeakSet()));
    });
    it('should not throw if both values are the same Date', () => {
        const ms = Date.now();
        eql(new Date(ms), new Date(ms));
    });
    it('should throw if both values are different Dates', () => {
        throws(() => eql(new Date(1), new Date(2)));
    });
    describe('any', () => {
        it('should replace a property with any()', () => {
            eql({ a: 1 }, { a: any() });
        });
    });
    it('should reject with correct message', () => {
        throws(() => eql({ a: 1, b: 2 }, { a: 1, b: 3 }), /Expected { a: 1, b: 2 } to deep equal { a: 1, b: 3 }/);
    });
    describe('notEql', () => {
        it('should not throw if values are different', () => {
            notEql({ a: 1 }, { a: 2 });
        });
        it('should throw if values are the same', () => {
            throws(() => notEql({ a: 1 }, { a: 1 }), /Expected { a: 1 } to not deep equal { a: 1 }/);
        });
        it('should throw with custom message', () => {
            throws(() => notEql({ a: 1 }, { a: 1 }, 'custom message'), /custom message/);
        });
    });
});
