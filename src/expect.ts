import { eql, equal, notEql, notEqual, notThrows, throws } from './assert';
import { notRejects, rejects } from './assert/rejects';
import { Constructor, ErrorPredicate, isThrowsCallback, ThrowsCallback } from './assert/throws';
import { registerMethod, registerProperty } from './utils';

interface ValueExpect<T> {
    to: this;
    be: this;
    not: this;
    and: this;
    equal(value: T): this;
    eql(value: T): this;
}

interface FunctionExpect<T> extends ValueExpect<T> {
    throw(message?: string): this;
    throw(matcher: RegExp | Constructor<Error> | ErrorPredicate): this;
}

interface PromiseExpect<T> extends ValueExpect<T> {
    reject(message?: string): Promise<void>;
    reject(matcher: RegExp | Constructor<Error> | ErrorPredicate): Promise<void>;
}

export interface State {
    inverted?: boolean;
}

const identity = <T>(value: T) => value;

interface Property {
    type: 'property';
    value: (baggage: State) => State | null;
}

type MethodCallback = <T>(value: T, state: State) => (...args: any[]) => void;

interface Method {
    type: 'method';
    noAutoNot?: boolean;
    value: MethodCallback;
}

const mixins: Record<string, Property | Method> = {};

export const use = (plugins: Record<string, Property | Method>) => {
    Object.assign(mixins, plugins);
};

use({
    to: { type: 'property', value: identity },
    be: { type: 'property', value: identity },
    and: { type: 'property', value: identity },
    not: { type: 'property', value: ({ inverted }) => ({ inverted: !inverted }) },
    eql: {
        type: 'method',
        value: (value, { inverted }) => (other: any) => {
            if (inverted) {
                notEql(value, other);
            } else {
                eql(value, other);
            }
        }
    },
    equal: {
        type: 'method',
        value: (value, { inverted }) => (other: any) => {
            if (inverted) {
                notEqual(value, other);
            } else {
                equal(value, other);
            }
        }
    },
    reject: {
        type: 'method',
        value: (value: any, { inverted }) => (...args: any[]) => {
            if (inverted) {
                return rejects(value, ...args);
            } else {
                return notRejects(value, ...args);
            }
        }
    }
});

const valueExpect = <T>(value: T, { inverted }: State): ValueExpect<T> & FunctionExpect<T> => {
    const noop = (i = inverted) => valueExpect(value, { inverted: i });
    const chain = {
        throw: (...args: any[]) => {
            if (isThrowsCallback(value)) {
                if (!inverted) {
                    throws(value, ...args);
                } else {
                    notThrows(value, ...args);
                }
            } else {
                throw new Error('Cannot throw on non-function');
            }
            return noop();
        },
        equal: (other: T) => {
            equal(value, other);
            return noop();
        },
        eql: (other: T) => {
            eql(value, other);
            return noop();
        }
    };
    for (const [key, v] of Object.entries(mixins)) {
        if (v.type === 'property') {
            registerProperty(chain, key, () => {
                const newState = v.value({ inverted });
                return valueExpect(value, newState || { inverted });
            });
        } else {
            registerMethod(chain, key, (...args: any[]) => {
                if (v.noAutoNot || !inverted) {
                    v.value(value, { inverted })(...args);
                } else {
                    v.value(value, { inverted })(...args);
                }
                v.value(value, { inverted })(...args);
                return valueExpect(value, { inverted });
            });
        }
    }
    return chain as any;
};

interface Expect {
    <T extends ThrowsCallback>(actual: T): FunctionExpect<T>;
    <T extends Promise<any>>(actual: T): PromiseExpect<T>;
    <T>(actual: T): ValueExpect<T>;
}

export const expect = (<T>(actual: T) => {
    return valueExpect(actual, {});
}) as Expect;
