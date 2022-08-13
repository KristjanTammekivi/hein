import { equal, notEqual } from '../assert';
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
        value: ({ value, inverted }) => (other: any, message?: string) => {
            if (inverted) {
                notEqual(value, other, message);
            } else {
                equal(value, other, message);
            }
        }
    },
    eq: { type: 'alias', value: 'equal' },
});
