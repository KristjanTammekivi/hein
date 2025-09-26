import omit from 'lodash/omit.js';
import { use } from '../mixins.js';
import { expectChain } from '../expect.js';

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
