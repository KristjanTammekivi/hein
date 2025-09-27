import omit from 'lodash/omit.js';
import { use } from '../mixins.js';
import { expectChain } from '../expect.js';

declare module '../expect.types' {
    interface ObjectExpect<T> {
        /**
         * exclude keys from object to be compared further down the chain
         * @param keys
         */
        excluding<K extends keyof T>(...keys: K[]): ObjectExpect<Omit<T, K>>;
    }
}

use({
    excluding: {
        type: 'method',
        value:
            (state) =>
            (...keys: string[]) => {
                return expectChain({ ...state, value: omit(state.value, keys) });
            }
    }
});
