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
import { getSize } from './utils/get-size';
import { ValueType } from './utils/get-type';
import { createEvaluation } from './utils/match';
import { Constructor, ErrorPredicate } from './utils/process-error';

type AllowExpectAsValue<T> = { [P in keyof T]: T[P] | Expect | AllowExpectAsValue<T[P]> };

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
    eql(value: AllowExpectAsValue<T>): this;
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

interface NumberExpect<T = number> extends ValueExpect<T>, GreaterThanFamily<T> { }

interface StringExpect<T = string> extends ValueExpect<T> {
    lengthOf(length: number, message?: string): this;
}

interface ObjectExpect<T> extends ValueExpect<T> {
    size: NumberExpect<number>;
    /**
     * check if instance of value
     */
    instanceOf(constructor: Constructor): this;
    /**
     * check if object/array/Map/Set is empty
     */
    empty(message?: string): this;
    /**
     * check for object/array/Map/Set/string to have a certain size
     */
    sizeOf(size: number, message?: string): this;
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
    length: NumberExpect<number> & this;
    /**
     * check for array length
     */
    lengthOf(length: number, message?: string): this;
}

export interface State<T> {
    inverted?: boolean;
    value?: T;
    evaluateSize?: boolean;
}

const identity = <T>(value: T) => value;

interface Property {
    type: 'property';
    value: (state: State<any>) => State<any> | null;
}

type MethodCallback = <T>(state: State<T>) => (...args: any[]) => void;

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
    not: { type: 'property', value: (state) => ({ ...state, inverted: !state.inverted }) },
    eql: {
        type: 'method',
        value: ({ value, inverted }) => (other: any) => {
            if (inverted) {
                notEql(value, other);
            } else {
                eql(value, other);
            }
        }
    },
    equal: {
        type: 'method',
        value: ({ value, inverted }) => (other: any, message?: string) => {
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
        value: ({ value, inverted }: State<any>) => (...args: any[]) => {
            return inverted ? rejects(value, ...args) : notRejects(value, ...args);
        }
    },
    greaterThan: {
        type: 'method',
        value: ({ value, inverted }) => (other: any) => {
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
        value: ({ value, inverted }) => (other: any) => {
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
        value: ({ value, inverted }: State<any>) => (...args: any[]) => {
            return inverted ? notThrows(value, ...args) : throws(value, ...args);
        }
    },
    lessThan: {
        type: 'method',
        value: ({ value, inverted }) => (other: any) => {
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
        value: ({ value, inverted }) => (other: any) => {
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
        value: ({ value, inverted }) => (type: ValueType) => {
            if (inverted) {
                notIsType(value, type);
            } else {
                isType(value, type);
            }
        }
    },
    instanceOf: {
        type: 'method',
        value: ({ value, inverted }) => (constructor: Constructor) => {
            if (inverted) {
                notInstanceOf(value, constructor);
            } else {
                instanceOf(value, constructor);
            }
        }
    },
    empty: {
        type: 'method',
        value: ({ value, inverted }) => (message?: string) => {
            if (inverted) {
                notIsEmpty(value, message);
            } else {
                isEmpty(value, message);
            }
        }
    },
    sizeOf: { type: 'alias', value: 'lengthOf' },
    lengthOf: {
        type: 'method',
        value: ({ value, inverted }) => (length: number, message?: string) => {
            if (inverted) {
                notHasSize(value, length, message);
            } else {
                hasSize(value, length, message);
            }
        }
    },
    length: { type: 'property', value: (state) => ({ ...state, evaluateSize: true }) }
});

const expectChain = <T>({ value, inverted, evaluateSize }: State<T>): ValueExpect<T> & FunctionExpect<T> => {
    const chain = {} as any;
    for (const [key, v] of Object.entries(mixins)) {
        const definition = v.type === 'alias' ? mixins[v.value] : v;
        if (definition.type === 'property') {
            registerProperty(chain, key, () => {
                const newState = definition.value({ value, inverted, evaluateSize });
                return expectChain(newState || { value, inverted, evaluateSize });
            });
        } else if (definition.type === 'method') {
            registerMethod(chain, key, (...args: any[]) => {
                if (evaluateSize) {
                    definition.value({ value: getSize(value), inverted })(...args);
                } else {
                    definition.value({ value, inverted })(...args);
                }
                return expectChain({ value, inverted, evaluateSize });
            });
        }
    }
    return chain;
};

const delayedChain = ({ inverted, evaluations = [] }: State<any> & { evaluations: ((value: any) => void)[] }) => {
    return createDelayedChain({}, { inverted, evaluations });
};

const createDelayedChain = (base: any, { inverted, evaluateSize, evaluations = [] }: State<any> & { evaluations: ((value: any) => void)[] }) => {
    const chain = base;
    for (const [key, v] of Object.entries(mixins)) {
        const definition = v.type === 'alias' ? mixins[v.value] : v;
        if (definition.type === 'property') {
            registerProperty(chain, key, createEvaluation(() => {
                const newState = definition.value({ inverted, evaluateSize });
                return delayedChain({ inverted, evaluateSize, evaluations, ...newState });
            }) as any);
        } else if (definition.type === 'method') {
            registerMethod(chain, key, createEvaluation((...args: any[]) => {
                const newEvaluation = (value: any) => {
                    definition.value({ value: evaluateSize ? getSize(value) : value, inverted })(...args);
                };
                const c = delayedChain({ inverted, evaluations: [...evaluations, newEvaluation] });
                c.evaluate = (value: string) => {
                    // TODO: if function returns a promise then throw, we need none of that
                    for (const evaluation of [...evaluations, newEvaluation]) { evaluation(value); }
                };
                return c;
            }) as any);
        }
    }
    return chain;
};

interface Expect extends FunctionExpect<any>, PromiseExpect<any>, NumberExpect<any>, ArrayExpect<any> {
    <T extends ThrowsCallback>(actual: T): FunctionExpect<T>;
    <T extends Promise<any>>(actual: T): PromiseExpect<T>;
    <T extends any[]>(actual: T): ArrayExpect<T>;
    <T extends Date>(actual: T): DateExpect<T>;
    <T extends Record<string, any>>(actual: T): ObjectExpect<T>;
    <T extends number>(actual: T): NumberExpect;
    <T extends string>(actual: T): StringExpect;
    <T>(actual: T): ValueExpect<T>;
    evaluate: (value: any) => void;
}

export const expect = createDelayedChain(<T>(actual: T) => {
    return expectChain({ value: actual });
}, { evaluations: [] }) as Expect;
