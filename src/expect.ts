import {
    eql,
    equal,
    notEql,
    notEqual,
    notThrows,
    throws,
    greaterThan,
    notGreaterThan,
    rejects,
    notRejects
} from './assert';
import { Constructor, ErrorPredicate, ThrowsCallback } from './assert/throws';
import { registerMethod, registerProperty } from './utils/chain';

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

interface NumberExpect extends ValueExpect<number> {
    greaterThan(value: number): this;
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
    },
    greaterThan: {
        type: 'method',
        value: (value: any, { inverted }) => (other: any) => {
            if (inverted) {
                notGreaterThan(value, other);
            } else {
                greaterThan(value, other);
            }
        }
    },
    throw: {
        type: 'method',
        value: (value: any, { inverted }) => (...args: any[]) => {
            if (inverted) {
                return notThrows(value, ...args);
            } else {
                return throws(value, ...args);
            }
        }
    }
});

const expectChain = <T>(value: T, { inverted }: State): ValueExpect<T> & FunctionExpect<T> => {
    // const noop = (i = inverted) => valueExpect(value, { inverted: i });
    const chain = {};
    for (const [key, v] of Object.entries(mixins)) {
        if (v.type === 'property') {
            registerProperty(chain, key, () => {
                const newState = v.value({ inverted });
                return expectChain(value, newState || { inverted });
            });
        } else {
            registerMethod(chain, key, (...args: any[]) => {
                if (v.noAutoNot || !inverted) {
                    v.value(value, { inverted })(...args);
                } else {
                    v.value(value, { inverted })(...args);
                }
                v.value(value, { inverted })(...args);
                return expectChain(value, { inverted });
            });
        }
    }
    return chain as any;
};

interface Expect {
    <T extends ThrowsCallback>(actual: T): FunctionExpect<T>;
    <T extends Promise<any>>(actual: T): PromiseExpect<T>;
    <T extends number>(actual: T): NumberExpect;
    <T>(actual: T): ValueExpect<T>;
}

export const expect = (<T>(actual: T) => {
    return expectChain(actual, {});
}) as Expect;
