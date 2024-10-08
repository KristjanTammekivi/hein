import { mixins, State, use } from './mixins';
import { registerMethod, registerProperty } from './utils/chain';
import { getSize } from './utils/get-size';
import { Expect } from './expect.types';
import './expect/after';
import './expect/ballpark';
import './expect/before';
import './expect/between';
import './expect/empty';
import './expect/end-with';
import './expect/eql';
import './expect/equal-shorthand';
import './expect/equal';
import './expect/excluding';
import './expect/greater-than-equal';
import './expect/greater-than';
import './expect/has-property';
import './expect/include';
import './expect/instance-of-shorthand';
import './expect/instance-of';
import './expect/keys';
import './expect/length';
import './expect/less-than-equal';
import './expect/less-than';
import './expect/match';
import './expect/members';
import './expect/reject';
import './expect/round-to';
import './expect/start-with';
import './expect/throw';
import './expect/type-shorthand';
import './expect/type';
import { mapValues } from 'lodash';
import { fail } from './utils/fail';

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
