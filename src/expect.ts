import { mixins, State, use } from './mixins';
import { registerMethod, registerProperty } from './utils/chain';
import { getSize } from './utils/get-size';
import { Expect } from './expect.types';
import './expect/empty';
import './expect/eql';
import './expect/equal';
import './expect/greater-than';
import './expect/greater-than-equal';
import './expect/instance-of';
import './expect/length';
import './expect/less-than';
import './expect/less-than-equal';
import './expect/reject';
import './expect/throw';
import './expect/type';

const identity = <T>(value: T) => value;

use({
    to: { type: 'property', value: identity },
    be: { type: 'property', value: identity },
    and: { type: 'property', value: identity },
    have: { type: 'property', value: identity },
    this: { type: 'property', value: identity },
    not: { type: 'property', value: (state) => ({ ...state, inverted: !state.inverted }) },

    length: { type: 'property', value: (state) => ({ ...state, evaluateSize: true }) }
});

const expectChain = <T>({ value, inverted, evaluateSize }: State<T>) => {
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

export const expect = (<T>(actual: T) => {
    return expectChain({ value: actual });
}) as Expect;
