import { any } from '../utils/match';
import { deepEqual, notDeepEqual, throws } from '../assert';

describe('assert/deepEqual', () => {
    it('should not throw for NaN', () => {
        deepEqual(Number.NaN, Number.NaN);
    });

    it('should not throw if objects are strictly equal', () => {
        const object = { a: 1 };
        deepEqual(object, object);
    });

    it('should not throw if both values are the same numbers', () => {
        deepEqual(1, 1);
    });

    it('should throw if both values are numbers but they are different', () => {
        throws(() => deepEqual(1, 2));
    });

    it('should not throw if both values are NaN', () => {
        deepEqual(Number.NaN, Number.NaN);
    });

    it('should throw if values are strings', () => {
        throws(() => deepEqual('a', 'b'));
    });

    it('should throw if values are booleans', () => {
        throws(() => deepEqual(true, false));
    });

    it('should throw if values are BigInts', () => {
        throws(() => deepEqual(BigInt(1), BigInt(2)));
    });

    it('should not throw if values are BigInts', () => {
        deepEqual(BigInt(1), BigInt(1));
    });

    it('should throw if one value is null', () => {
        throws(() => deepEqual(null, 1));
    });

    it('should throw if one value is undefined', () => {
        throws(() => deepEqual(undefined, 1));
    });

    it('should not throw if arrays have primitives and are deep equal', () => {
        deepEqual([1, 'a', true, null, undefined], [1, 'a', true, null, undefined]);
    });

    it('should throw if one argument is array and the other an object', () => {
        throws(() => deepEqual([0], { 0: 0 }));
    });

    it('should throw if arrays have primitives and are not deeply equal', () => {
        throws(() => deepEqual([1], [2]));
    });

    it('should throw if expected array is longer than actual', () => {
        throws(() => deepEqual([1], [1, 2]));
    });

    it('should not throw if objects have the same keys', () => {
        deepEqual({ a: 1 }, { a: 1 });
    });

    it('should throw if objects are not strictly equal', () => {
        throws(() => deepEqual({ a: 1 }, { a: 2 }));
    });

    it('should throw if expected has more keys than actual', () => {
        throws(() => deepEqual({ a: 1 }, { a: 1, b: 2 }));
    });

    it('should throw with 2 different symbols', () => {
        throws(() => deepEqual(Symbol('a'), Symbol('a')));
    });

    it('should throw if nested values are different', () => {
        deepEqual({ a: { b: 1 } }, { a: { b: 1 } });
    });

    it('should throw if second key is different', () => {
        throws(() => deepEqual({ a: 1, b: 1 }, { a: 1, b: 2 }));
    });

    it('should throw if actual is a number but expected is an object', () => {
        throws(() => deepEqual({ a: 1 }, { a: {} }));
    });

    it('should not throw if both values are the same functions', () => {
        const noop = () => {};
        deepEqual(noop, noop);
    });

    it('should throw if both values are empty WeakMaps', () => {
        throws(() => deepEqual(new WeakMap(), new WeakMap()));
    });

    it('should throw if both values are WeakSets', () => {
        throws(() => deepEqual(new WeakSet(), new WeakSet()));
    });

    it('should not throw if both values are the same Date', () => {
        const ms = Date.now();
        deepEqual(new Date(ms), new Date(ms));
    });

    it('should throw if both values are different Dates', () => {
        throws(() => deepEqual(new Date(1), new Date(2)));
    });

    describe('assert/any', () => {
        it('should replace a property with any()', () => {
            deepEqual({ a: 1 }, { a: any });
        });
    });

    it('should reject with correct message', () => {
        throws(() => deepEqual({ a: 1, b: 2 }, { a: 1, b: 3 }), /Expected { a: 1, b: 2 } to deep equal { a: 1, b: 3 }/);
    });

    it('should not throw for patial equal if expected has missing props', () => {
        deepEqual({ a: 1, b: 2 }, { a: 1 }, true);
    });

    describe('assert/notDeepEqual', () => {
        it('should not throw if values are different', () => {
            notDeepEqual({ a: 1 }, { a: 2 });
        });

        it('should throw if values are the same', () => {
            throws(() => notDeepEqual({ a: 1 }, { a: 1 }), /Expected { a: 1 } to not deep equal { a: 1 }/);
        });

        it('should throw with custom message', () => {
            throws(() => notDeepEqual({ a: 1 }, { a: 1 }, 'custom message'), /custom message/);
        });
    });

    describe('buffers', () => {
        it('should not throw if two buffers are the same', () => {
            deepEqual(Buffer.from('a'), Buffer.from('a'));
        });

        it('should not throw if two buffers are the same in partial comparision', () => {
            deepEqual(Buffer.from('abc'), Buffer.from('abc'), true);
        });

        it('should throw if two buffers are not the same', () => {
            throws(() => deepEqual(Buffer.from('a'), Buffer.from('b')));
        });

        it('should throw if two buffers are not the same in partial comparision', () => {
            throws(() => deepEqual(Buffer.from('abc'), Buffer.from('abd'), true));
        });
    });
});
