import { eql, equal, notEql, notEqual } from '../assert';
import { use } from '../mixins';

declare module '../expect.types' {
    interface ValueExpect<T> {
        /**
         * check for === equality
         */
        equal(value: T, message?: string): this;
        /**
         * check for === equality
         */
        eq(value: T, message?: string): this;
    }
}

use({
    equal: {
        type: 'method',
        value: ({ value, inverted, deep }) => (other: any, message?: string) => {
            if (deep) {
                if (inverted) {
                    notEql(value, other, message);
                } else {
                    eql(value, other, message);
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
