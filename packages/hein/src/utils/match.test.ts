import { equal, hasSize } from '../assert';
import { any, createEvaluation, match } from './match';

describe('utils/match', () => {
    describe('number', () => {
        it('should return true if numbers are equal', () => {
            equal(match(1, 1), true);
        });

        it('should return false if numbers are not equal', () => {
            equal(match(1, 2), false);
        });

        it('should return true if both values are NaN', () => {
            equal(match(Number.NaN, Number.NaN), true);
        });

        it('should return false if one value is NaN', () => {
            equal(match(Number.NaN, 1), false);
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
            equal(match(undefined, null), false);
        });
    });

    describe('undefined', () => {
        it('should return true if both values are undefined', () => {
            // eslint-disable-next-line unicorn/no-useless-undefined
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
            const map = new Map([
                [key1, 1],
                [key2, 2]
            ]);
            const map2 = new Map([
                [key1, 1],
                [key2, 3]
            ]);
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

        it('should return true if one value is a Date and the other a representation of that date', () => {
            equal(match<any>(new Date(0), new Date(0).getMilliseconds()), true);
        });
    });

    describe('object', () => {
        it(`should return false if one object is empty and the other isn't`, () => {
            equal(match({}, { a: 1 }), false);
            equal(match({ a: 1 }, {}), false);
        });

        it('should return true if both values are the same instance', () => {
            const object = {};
            equal(match(object, object), true);
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
            const callback = () => {};
            equal(match(callback, callback), true);
        });

        it('should return false if functions are different', () => {
            equal(
                match(
                    () => 5,
                    () => 4
                ),
                false
            );
        });
    });

    describe('any', () => {
        it('should return true if one value is a primitive and the other any', () => {
            equal(match(5, any), true);
        });

        it('should mutate expectation if a value is any and mutate is true', () => {
            const expect = { a: any };
            equal(match({ a: 5 }, expect, { mutate: true }), true);
            equal(expect.a, 5);
        });

        it('should not mutate if mutate is set to false', () => {
            const anyInstance = any;
            const expect = { a: anyInstance };
            equal(match({ a: 5 }, expect), true);
            equal(expect.a, anyInstance);
        });

        it('should mutate array elements', () => {
            const expectation = [any];
            equal(match([5], expectation, { mutate: true }), true);
            equal(expectation[0], 5);
        });

        it('should mutate map values', () => {
            const key = {};
            const expectation = new Map([[key, any]]);
            equal(match(new Map([[key, 5]]), expectation, { mutate: true }), true);
            equal(expectation.get(key), 5);
        });

        it('should traverse the whole object even if something is not a match', () => {
            const expected = {
                a: [1, any],
                b: [2, any]
            };
            const actual = {
                a: [3, 5],
                b: [4, 6]
            };
            match(actual, expected, { mutate: true });
            equal(expected.a[1], 5);
            equal(expected.b[1], 6);
        });

        it(`should mutate the whole array even if arrays aren't equal length`, () => {
            const expected = [any, any];
            const actual = [1, 2, 3];
            match(actual, expected, { mutate: true });
            equal(expected[0], 1);
            equal(expected[1], 2);
            hasSize(expected, 2);
        });

        it(`should mutate the whole object even if objects have different amount of keys`, () => {
            const expected = {
                a: any,
                b: any
            };
            const actual = {
                a: 1,
                b: 2,
                c: 3
            };
            match(actual, expected, { mutate: true });
            equal(expected.a, 1);
            equal(expected.b, 2);
            hasSize(expected, 2);
        });

        it('should mutate the whole Map even if Maps have different amount of keys', () => {
            const key = {};
            const key2 = {};
            const expected = new Map([[key, any]]);
            const actual = new Map([
                [key, 2],
                [key2, 4]
            ]);
            match(actual, expected, { mutate: true });
            equal(expected.get(key), 2);
            hasSize(expected, 1);
        });

        it('should traverse the whole Map even if something is not a match', () => {
            const key1 = {};
            const key2 = {};
            const expected = new Map([
                [key1, [1, any]],
                [key2, [2, any]]
            ]);
            const actual = new Map([
                [key1, [3, 5]],
                [key2, [4, 6]]
            ]);
            match(actual, expected, { mutate: true });
            equal(expected.get(key1)[1], 5);
            equal(expected.get(key2)[1], 6);
        });
    });

    describe('partial', () => {
        it('should match partial objects', () => {
            equal(match({ a: 1, b: 2 }, { a: 1 }, { partial: true }), true);
        });

        it('should match partial arrays', () => {
            equal(match([1, 2], [1], { partial: true }), true);
        });

        it('should match partial Maps', () => {
            const object = [{}, {}];
            const map1 = new Map([
                [object[0], 1],
                [object[1], 2]
            ]);
            const map2 = new Map([[object[0], 1]]);
            equal(match(map1, map2, { partial: true }), true);
        });

        it('should return false for partial Maps if expected has more keys', () => {
            const key1 = {};
            const key2 = {};
            const map = new Map([[key1, 1]]);
            const map2 = new Map([
                [key1, 1],
                [key2, 3]
            ]);
            equal(match(map, map2, { partial: true }), false);
        });

        it('should match partial Sets', () => {
            const set1 = new Set([1, 2]);
            const set2 = new Set([1]);
            equal(match(set1, set2, { partial: true }), true);
        });
    });

    describe('evaluation', () => {
        // eslint-disable-next-line mocha/no-setup-in-describe
        const trueEvaluation = createEvaluation(() => true);
        // eslint-disable-next-line mocha/no-setup-in-describe
        const falseEvaluation = createEvaluation(() => false);

        it('should evaluate evaluation', () => {
            equal(match(1, trueEvaluation), true);
            equal(match(1, falseEvaluation), false);
        });

        it('should test properties', () => {
            equal(match({ a: 1 }, { a: trueEvaluation }), true);
            equal(match({ a: 1 }, { a: falseEvaluation }), false);
        });

        it('should mutate expected properties', () => {
            const expect = { a: trueEvaluation };
            equal(match({ a: 1 }, expect, { mutate: true }), true);
            equal(expect.a, 1);
        });

        it('should mutate arrays', () => {
            const expect = [trueEvaluation];
            equal(match([1], expect, { mutate: true }), true);
            equal(expect[0], 1);
        });

        it('should mutate Maps', () => {
            const key = {};
            const actual = new Map([[key, 1]]);
            const expect = new Map([[key, trueEvaluation]]);
            equal(match(actual, expect, { mutate: true }), true);
            equal(expect.get(key), 1);
        });
    });
});
