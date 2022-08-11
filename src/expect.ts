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
    notRejects,
    instanceOf,
    notInstanceOf,
    isEmpty,
    notIsEmpty,
    notIsType,
    isType,
    notHasSize,
    hasSize
} from './assert';
import { ThrowsCallback } from './assert/throws';
import { registerMethod, registerProperty } from './utils/chain';
import { ValueType } from './utils/get-type';
import { Constructor, ErrorPredicate } from './utils/process-error';

interface ValueExpect<T> {
    to: this;
    be: this;
    not: this;
    and: this;
    have: this;
    of: this;
    /**
     * check for === equality
     */
    equal(value: T, message?: string): this;
    /**
     * check for === equality
     */
    eq(value: T, message?: string): this;
    /**
     * check for deep equality
     */
    eql(value: T): this;
    /**
     * check if value is of certain type
     */
    type(type: ValueType): this;
}

interface FunctionExpect<T> extends ValueExpect<T> {
    throw(message?: string): this;
    throw(matcher: RegExp | Constructor<Error> | ErrorPredicate, message?: string): this;
}

interface PromiseExpect<T> extends ValueExpect<T> {
    reject(message?: string): Promise<void>;
    reject(matcher: RegExp | Constructor<Error> | ErrorPredicate): Promise<void>;
}

interface NumberExpect<T = number> extends ValueExpect<T> {
    greaterThan(value: T): this;
    greaterThanOrEqual(value: T): this;
    lessThan(value: T): this;
}

interface ObjectExpect<T> extends ValueExpect<T> {
    /**
     * check if instance of value
     */
    instanceOf(constructor: Constructor): this;
    /**
     * check if object/array/Map/Set is empty
     */
    empty(message?: string): this;
    /**
     * check for object/array/Map/Set to have a certain size
     */
    size(size: number, message?: string): this;
}

interface GreaterThanFamily<T> {
    // greaterThan, gt, above
    /**
     * check if actual is greater than expected
     */
    greaterThan(value: T): this;
    /**
     * check if actual is greater than expected
     */
    gt(value: T): this;
    /**
     * check if actual is greater than expected
     */
    above(value: T): this;
    // greaterThanOrEqual, gte, atLeast
    /**
     * check if actual is greater than or equal to expected
     */
    greaterThanOrEqual(value: T): this;
    /**
     * check if actual is greater than or equal to expected
     */
    gte(value: T): this;
    /**
     * check if actual is greater than or equal to expected
     */
    atLeast(value: T): this;
    // lessThan, lt, below
    /**
     * check if actual is less than expected
     */
    lessThan(value: T): this;
    /**
     * check if actual is less than expected
     */
    lt(value: T): this;
    /**
     * check if actual is less than expected
     */
    below(value: T): this;
    // lessThanOrEqual, lte, atMost
    /**
     * check if actual is less than or equal to expected
     */
    lessThanOrEqual(value: T): this;
    /**
     * check if actual is less than or equal to expected
     */
    lte(value: T): this;
    /**
     * check if actual is less than or equal to expected
     */
    atMost(value: T): this;
}

interface DateExpect<T = Date> extends ValueExpect<T>, ObjectExpect<T>, GreaterThanFamily<T> {

}

interface ArrayExpect<T> extends ValueExpect<T>, ObjectExpect<T> {
    /**
     * check for array length
     */
    length(length: number, message?: string): this;
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

interface Alias {
    type: 'alias';
    value: string;
}

const mixins: Record<string, Property | Method | Alias> = {};

export const use = (plugins: Record<string, Property | Method | Alias>) => {
    Object.assign(mixins, plugins);
};

use({
    to: { type: 'property', value: identity },
    be: { type: 'property', value: identity },
    and: { type: 'property', value: identity },
    have: { type: 'property', value: identity },
    this: { type: 'property', value: identity },
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
        value: (value, { inverted }) => (other: any, message?: string) => {
            if (inverted) {
                notEqual(value, other, message);
            } else {
                equal(value, other, message);
            }
        }
    },
    eq: { type: 'alias', value: 'equal' },
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
    gt: { type: 'alias', value: 'greaterThan' },
    above: { type: 'alias', value: 'greaterThan' },
    greaterThanOrEqual: {
        type: 'method',
        value: (value: any, { inverted }) => (other: any) => {
            if (inverted) {
                notGreaterThan(value, other);
            } else {
                greaterThan(value, other);
            }
        }
    },
    gte: { type: 'alias', value: 'greaterThanOrEqual' },
    atLeast: { type: 'alias', value: 'greaterThanOrEqual' },
    throw: {
        type: 'method',
        value: (value: any, { inverted }) => (...args: any[]) => {
            if (inverted) {
                return notThrows(value, ...args);
            } else {
                return throws(value, ...args);
            }
        }
    },
    lessThan: {
        type: 'method',
        value: (value: any, { inverted }) => (other: any) => {
            if (inverted) {
                notGreaterThan(other, value);
            } else {
                greaterThan(other, value);
            }
        }
    },
    lt: { type: 'alias', value: 'lessThan' },
    below: { type: 'alias', value: 'lessThan' },
    lessThanOrEqual: {
        type: 'method',
        value: (value: any, { inverted }) => (other: any) => {
            if (inverted) {
                notGreaterThan(other, value);
            } else {
                greaterThan(other, value);
            }
        }
    },
    lte: { type: 'alias', value: 'lessThanOrEqual' },
    atMost: { type: 'alias', value: 'lessThanOrEqual' },
    type: {
        type: 'method',
        value: (value: any, { inverted }) => (type: ValueType) => {
            if (inverted) {
                notIsType(value, type);
            } else {
                isType(value, type);
            }
        }
    },
    instanceOf: {
        type: 'method',
        value: (value: any, { inverted }) => (constructor: Constructor) => {
            if (inverted) {
                notInstanceOf(value, constructor);
            } else {
                instanceOf(value, constructor);
            }
        }
    },
    empty: {
        type: 'method',
        value: (value: any, { inverted }) => (message?: string) => {
            if (inverted) {
                notIsEmpty(value, message);
            } else {
                isEmpty(value, message);
            }
        }
    },
    size: { type: 'alias', value: 'length' },
    length: {
        type: 'method',
        value: (value: any, { inverted }) => (length: number, message?: string) => {
            if (inverted) {
                notHasSize(value, length, message);
            } else {
                hasSize(value, length, message);
            }
        }
    }
});

const expectChain = <T>(value: T, { inverted }: State): ValueExpect<T> & FunctionExpect<T> => {
    const chain = {} as any;
    const aliases: Record<string, string> = {};
    for (const [key, v] of Object.entries(mixins)) {
        if (v.type === 'property') {
            registerProperty(chain, key, () => {
                const newState = v.value({ inverted });
                return expectChain(value, newState || { inverted });
            });
        } else if (v.type === 'method') {
            registerMethod(chain, key, (...args: any[]) => {
                v.value(value, { inverted })(...args);
                return expectChain(value, { inverted });
            });
        } else {
            // apply aliases last in case they are defined before the method
            aliases[key] = v.value;
        }
    }
    for (const [key, v] of Object.entries(aliases)) {
        chain[key] = chain[v];
    }
    return chain;
};

const delayedChain = ({ inverted, evaluations = [] }: State & { evaluations: ((value: any) => void)[] }) => {
    return createDelayedChain({}, { inverted, evaluations });
};

const createDelayedChain = (base: any, { inverted, evaluations = [] }: State & { evaluations: ((value: any) => void)[] }) => {
    const chain = base;
    const aliases: Record<string, string> = {};
    for (const [key, v] of Object.entries(mixins)) {
        if (v.type === 'property') {
            registerProperty(chain, key, () => {
                const newState = v.value({ inverted });
                return delayedChain({ inverted, evaluations, ...newState });
            });
        } else if (v.type === 'method') {
            registerMethod(chain, key, (...args: any[]) => {
                const evaluation = (value: any) => {
                    v.value(value, { inverted })(...args);
                };
                const c = delayedChain({ inverted, evaluations: [...evaluations, evaluation] });
                c.evaluate = (value: string) => {
                    // TODO: if function returns a promise then throw, we need none of that
                    [...evaluations, evaluation].forEach((e) => e(value));
                };
                return c;
            });
        } else {
            // apply aliases last in case they are defined before the method
            aliases[key] = v.value;
        }
    }
    for (const [key, v] of Object.entries(aliases)) {
        chain[key] = chain[v];
    }
    return chain;
};

interface Expect extends FunctionExpect<any>, PromiseExpect<any>, NumberExpect<any> {
    <T extends ThrowsCallback>(actual: T): FunctionExpect<T>;
    <T extends Promise<any>>(actual: T): PromiseExpect<T>;
    <T extends any[]>(actual: T): ArrayExpect<T>;
    <T extends Date>(actual: T): DateExpect<T>;
    <T extends Record<string, any>>(actual: T): ObjectExpect<T>;
    <T extends number>(actual: T): NumberExpect;
    <T>(actual: T): ValueExpect<T>;
    evaluate: (value: any) => void;
}

export const expect = createDelayedChain((<T>(actual: T) => {
    return expectChain(actual, {});
}), { evaluations: [] }) as Expect;
