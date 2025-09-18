import { deepEqual, notDeepEqual } from '../assert.js';
import { use } from '../mixins.js';
import { type DeepPartial } from '../utils/types.js';

declare module '../expect.types' {
    interface ValueExpect<T> {
        /**
         * check for deep equality
         */
        eql(value: T, message?: string): this;
        partially: ValueExpect<DeepPartial<T>>;
    }
}

use({
    partially: {
        type: 'property',
        value: () => ({ partial: true })
    },
    eql: {
        type: 'method',
        value:
            ({ value, inverted, partial }) =>
            (other: any, message) => {
                if (inverted) {
                    notDeepEqual(value, other, partial, message);
                } else {
                    deepEqual(value, other, partial, message);
                }
            }
    }
});
