import { mixins, type State, use } from './mixins.js';
import { registerMethod, registerProperty } from './utils/chain.js';
import { getSize } from './utils/get-size.js';
import './expect/after.js';
import './expect/ballpark.js';
import './expect/before.js';
import './expect/between.js';
import './expect/empty.js';
import './expect/end-with.js';
import './expect/eql.js';
import './expect/equal-shorthand.js';
import './expect/equal.js';
import './expect/excluding.js';
import './expect/greater-than-equal.js';
import './expect/greater-than.js';
import './expect/has-property.js';
import './expect/include.js';
import './expect/instance-of-shorthand.js';
import './expect/instance-of.js';
import './expect/keys.js';
import './expect/length.js';
import './expect/less-than-equal.js';
import './expect/less-than.js';
import './expect/match.js';
import './expect/members.js';
import './expect/reject.js';
import './expect/round-to.js';
import './expect/start-with.js';
import './expect/throw.js';
import './expect/type-shorthand.js';
import './expect/type.js';
import mapValues from 'lodash/mapValues.js';
import { fail } from './utils/fail.js';
import { type ThrowsCallback } from './assert/throws.js';
import {
    type ValueExpect,
    type ArrayExpect,
    type BigIntExpect,
    type BooleanExpect,
    type DateExpect,
    type FunctionExpect,
    type NumberExpect,
    type MapExpect,
    type ObjectExpect,
    type PromiseExpect,
    type StringExpect,
    type SymbolExpect,
    type Loose,
    type AllExpects
} from './expect.types';

use({
    to: { type: 'property', value: () => null },
    be: { type: 'property', value: () => null },
    a: { type: 'property', value: () => null },
    an: { type: 'property', value: () => null },
    and: {
        type: 'property',
        value: ({ value, every, ...rest }) => {
            const values = mapValues(rest, () => {}) as any;
            return { value, every, ...values };
        }
    },
    have: { type: 'property', value: () => null },
    in: { type: 'property', value: () => null },
    not: { type: 'property', value: (state) => ({ ...state, inverted: !state.inverted }) },
    of: { type: 'property', value: () => null },

    length: { type: 'property', value: (state) => ({ ...state, getProperty: getSize }) },
    deep: { type: 'property', value: (state) => ({ ...state, deep: true }) },

    every: { type: 'property', value: (state) => ({ ...state, every: true }) }
});

export const expectChain = <T>(state: State<T>) => {
    const chain = {} as any;
    for (const [key, v] of Object.entries(mixins)) {
        const definition = v.type === 'alias' ? mixins[v.value] : v;
        if (definition.type === 'property') {
            registerProperty(chain, key, () => {
                const newState = definition.value(state);
                return expectChain({ ...state, ...newState });
            });
        } else if (definition.type === 'method') {
            registerMethod(chain, key, (...args: any[]) => {
                if (state.getProperty) {
                    definition.value({ value: state.getProperty(state.value), inverted: state.inverted })(...args);
                } else if (state.every) {
                    for (const value of state.value as any) {
                        definition.value({ ...state, value })(...args);
                    }
                } else {
                    const result = definition.value({ ...state })(...args);
                    if (result as any) {
                        return result;
                    }
                }
                return expectChain(state);
            });
        }
    }
    return chain;
};

export const expect = (<T>(actual: T) => {
    return expectChain({ value: actual });
}) as Expect;

expect.fail = fail;

export interface Expect {
    <T extends Loose>(actual: T): AllExpects<T>;
    <T extends ThrowsCallback>(actual: T): FunctionExpect<T>;
    <T extends Promise<any>>(actual: T): PromiseExpect<T>;
    <T extends any[]>(actual: T): ArrayExpect<T>;
    <T extends Date>(actual: T): DateExpect<T>;
    <T extends Map<any, any>>(actual: T): MapExpect<T>;
    <T extends Record<string, any>>(actual: T): ObjectExpect<T>;
    <T extends number>(actual: T): NumberExpect;
    <T extends bigint>(actual: T): BigIntExpect;
    <T extends boolean>(actual: T): BooleanExpect;
    <T extends string>(actual: T): StringExpect;
    <T extends symbol>(actual: T): SymbolExpect<T>;
    <T>(actual: T): ValueExpect<T>;
    fail: typeof fail;
}
