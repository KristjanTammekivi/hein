import { equal } from 'assert';
import { any, match } from './match';

describe('utils/match', () => {
    describe('number', () => {
        it('should return true if numbers are equal', () => {
            equal(match(1, 1), true);
        });
        it('should return false if numbers are not equal', () => {
            equal(match(1, 2), false);
        });
        it('should return true if both values are NaN', () => {
            equal(match(NaN, NaN), true);
        });
        it('should return false if one value is NaN', () => {
            equal(match(NaN, 1), false);
        });
    });
    describe('string', () => {
        it('should return true if strings are equal', () => {
            equal(match('a', 'a'), true);
        });
        it('should return false if strings are not equal', () => {
            equal(match('a', ''), false);
        });
    });
    describe('boolean', () => {
        it('should return true if booleans are equal', () => {
            equal(match(true, true), true);
        });
        it('should return false if booleans are not equal', () => {
            equal(match(true, false), false);
        });
    });
    describe('null', () => {
        it('should return true if both values are null', () => {
            equal(match(null, null), true);
        });
        it('should return false if one value is undefined', () => {
            equal(match(null, undefined), false);
        });
    });
    describe('undefined', () => {
        it('should return true if both values are undefined', () => {
            equal(match(undefined, undefined), true);
        });
        it('should return false if one value is undefined', () => {
            equal(match(undefined, null), false);
        });
    });
    describe('Map', () => {
        it('should return true if maps are equal', () => {
            const key = {};
            equal(match(new Map([[key, 1]]), new Map([[key, 1]])), true);
        });
        it('should return false if maps are not equal', () => {
            equal(match(new Map([['a', 1]]), new Map([['a', 2]])), false);
        });
        it('should return false if one map is empty', () => {
            equal(match(new Map(), new Map([['a', 1]])), false);
            equal(match(new Map([['a', 1]]), new Map()), false);
        });
        it('should return false if keys are different objects', () => {
            equal(match(new Map([[{}, 1]]), new Map([[{}, 2]])), false);
        });
        it(`should return false if one value matches and the other doesn't`, () => {
            const key1 = {};
            const key2 = {};
            const map = new Map([[key1, 1], [key2, 2]]);
            const map2 = new Map([[key1, 1], [key2, 3]]);
            equal(match(map, map2), false);
        });
    });
    describe('WeakMap', () => {
        it('should return true if both values are the same instance', () => {
            const map = new WeakMap();
            equal(match(map, map), true);
        });
        it('should return false if both values are different instances', () => {
            const map = new WeakMap();
            const map2 = new WeakMap();
            equal(match(map, map2), false);
        });
        it('should return false if one value is a WeakMap and the other a plain object', () => {
            const map = new WeakMap();
            equal(match(map, {} as any), false);
            equal(match({} as any, map), false);
        });
    });
    describe('Set', () => {
        it('should return true if both sets are empty', () => {
            equal(match(new Set(), new Set()), true);
        });
        it('should return false if one set is empty', () => {
            equal(match(new Set(), new Set([1])), false);
            equal(match(new Set([1]), new Set()), false);
        });
        it('should return true if sets are equal', () => {
            equal(match(new Set([1]), new Set([1])), true);
        });
    });
    describe('WeakSet', () => {
        it('should return true if both values are the same instance', () => {
            const set = new WeakSet();
            equal(match(set, set), true);
        });
        it('should return false if both values are different instances', () => {
            const set = new WeakSet();
            const set2 = new WeakSet();
            equal(match(set, set2), false);
        });
    });
    describe('array', () => {
        it('should return false if one value is an array and the other a plain object', () => {
            equal(match([], {}), false);
            equal(match({}, []), false);
        });
        it('should return false if values have different amounts of memmbers', () => {
            equal(match([1, 2], [1, 2, 3]), false);
            equal(match([1, 2, 3], [1, 2]), false);
        });
        it('should return true if both arrays have the same values', () => {
            equal(match([1, 2, 3], [1, 2, 3]), true);
        });
    });
    describe('Date', () => {
        it('should return true if both values are the same instance', () => {
            const date = new Date();
            equal(match(date, date), true);
        });
        it('should return true if both values refer to the same time', () => {
            equal(match(new Date(0), new Date(0)), true);
        });
        it('should return false if one value is a Date and the other a plain object', () => {
            equal(match(new Date(), {} as any), false);
            equal(match({} as any, new Date()), false);
        });
    });
    describe('object', () => {
        it(`should return false if one object is empty and the other isn't`, () => {
            equal(match({}, { a: 1 }), false);
            equal(match({ a: 1 }, {}), false);
        });
        it('should return true if both values are the same instance', () => {
            const obj = {};
            equal(match(obj, obj), true);
        });
        it('should return true if both have same keys and values', () => {
            equal(match({ a: 1 }, { a: 1 }), true);
        });
        it('should return false if values for the same key are different', () => {
            equal(match({ a: 1 }, { a: 2 }), false);
        });
        it('should return false if one value is an object and the other a number', () => {
            equal(match({} as any, 1), false);
            equal(match(1, {} as any), false);
        });
    });
    describe('function', () => {
        it('should return true if both functions are the same instance', () => {
            const fn = () => { };
            equal(match(fn, fn), true);
        });
        it('should return false if functions are different', () => {
            equal(match(() => 5, () => 4), false);
        });
    });
    describe('any', () => {
        it('should return true if one value is a primitive and the other any', () => {
            equal(match(5, any() as any), true);
        });
        it('should mutate expectation if a value is any and mutate is true', () => {
            const expect = { a: any() };
            equal(match({ a: 5 }, expect, { mutate: true }), true);
            equal(expect.a, 5);
        });
        it('should not mutate if mutate is set to false', () => {
            const anyInstance = any();
            const expect = { a: anyInstance };
            equal(match({ a: 5 }, expect), true);
            equal(expect.a, anyInstance);
        });
    });
    describe('partial', () => {
        it('should match partial objects', () => {
            equal(match({ a: 1, b: 2 }, { a: 1 }, { partial: true }), true);
        });
    });
});
