import { eql, equal, throws } from './assert';
import { isThrowsCallback, ThrowsCallback } from './assert/throws';

interface ValueExpect<T> {
    to: this;
    be: this;
    not: this;
    and: this;
    equal(value: T): this;
    eql(value: T): this;
}

interface FunctionExpect<T> extends ValueExpect<T> {
    throw(): this;
}

const valueExpect = <T>(value: T, inverted: boolean): ValueExpect<T> => {
    const noop = (i = inverted) => valueExpect(value, i);
    return {
        get to() {
            return noop(inverted);
        },
        get be() {
            console.log('been');
            return noop(inverted);
        },
        get not() {
            return noop(!inverted);
        },
        get and() {
            return noop(inverted);
        },
        equal: (other: T) => {
            equal(value, other);
            return valueExpect(value, inverted);
        },
        eql: (other: T) => {
            eql(value, other);
            return valueExpect(value, inverted);
        }
    };
};

const functionExpect = <T extends ThrowsCallback>(callback: T, inverted: boolean): FunctionExpect<T> => {
    const noop = (i = inverted) => functionExpect(callback, i);
    return {
        get to() {
            return noop();
        },
        get be() {
            return noop();
        },
        get not() {
            return noop(!inverted);
        },
        get and() {
            return noop(inverted);
        },
        throw: () => {
            throws(callback);
            return functionExpect(callback, inverted);
        },
        equal: (other: T) => {
            equal(callback, other);
            return functionExpect(callback, inverted);
        },
        eql: (other: T) => {
            equal(callback, other);
            return functionExpect(callback, inverted);
        }
    };
};

interface Expect {
    <T extends ThrowsCallback>(actual: T): FunctionExpect<T>;
    <T>(actual: T): ValueExpect<T>;
}

export const expect = (<T>(actual: T) => {
    if (isThrowsCallback(actual)) {
        return functionExpect(actual, false);
    }
    return valueExpect(actual, false);
}) as Expect;
