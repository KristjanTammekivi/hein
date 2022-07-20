import { doesNotThrow, throws } from 'node:assert';
import { equal, notEqual, deepStrictEqual, notDeepStrictEqual, ok } from 'node:assert/strict';

type ThrowCallback = () => unknown;

const isThrowFunction = (fn: any): fn is ThrowCallback => {
    ok(typeof fn === 'function');
    return true;
};

class Expect<T> {
    private inverted = false;

    constructor(public actual: T) {}

    get to() {
        return this;
    }

    get not() {
        this.inverted = !this.inverted;
        return this;
    }

    get be() {
        return this;
    }

    throw() {
        if (isThrowFunction(this.actual)) {
            if (!this.inverted) {
                throws(this.actual);
            } else {
                doesNotThrow(this.actual);
            }
        }
    }

    equal(expected: T) {
        if (!this.inverted) {
            equal(this.actual, expected);
        } else {
            notEqual(this.actual, expected);
        }
    }

    eql(expected: T) {
        if (!this.inverted) {
            deepStrictEqual(this.actual, expected);
        } else {
            notDeepStrictEqual(this.actual, expected);
        }
    }

    greaterThan(expected: T) {
        if (!this.inverted) {
            ok(this.actual > expected);
        } else {
            ok(this.actual <= expected);
        }
    }

    gt(expected: T) {
        if (!this.inverted) {
            ok(this.actual > expected);
        } else {
            ok(this.actual <= expected);
        }
    }
}

export const expect = <T>(actual: T) => {
    return new Expect(actual);
};
