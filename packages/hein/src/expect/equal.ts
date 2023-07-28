import { deepEqual, equal, notDeepEqual, notEqual } from '../assert';
import { use } from '../mixins';

declare module '../expect.types' {
    interface ValueExpect<T> {
        /**
         * check for === equality, NaN is considered equal to NaN
         */
        equal(value: T, message?: string): this;
        /**
         * check for === equality, NaN is considered equal to NaN
         */
        eq(value: T, message?: string): this;
    }
}

use({
    equal: {
        type: 'method',
        value:
            ({ value, inverted, deep }) =>
            (other: any, message?: string) => {
                if (deep) {
                    if (inverted) {
                        notDeepEqual(value, other, message);
                    } else {
                        deepEqual(value, other, message);
                    }
                    return;
                }
                if (inverted) {
                    notEqual(value, other, message);
                } else {
                    equal(value, other, message);
                }
            }
    },
    eq: { type: 'alias', value: 'equal' }
});
