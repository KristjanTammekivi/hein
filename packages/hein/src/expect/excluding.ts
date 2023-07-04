import { omit } from 'lodash';
import { use } from '../mixins';
import { expectChain } from '../expect';

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
        value: (state) => (...keys: string[]) => {
            return expectChain({ ...state, value: omit(state.value, keys) });
        }
    }
});
