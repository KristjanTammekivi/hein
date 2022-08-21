import { deepEqual, notDeepEqual } from '../assert';
import { use } from '../mixins';

declare module '../expect.types' {
    interface ValueExpect<T> {
        /**
         * check for deep equality
         */
        eql(value: T): this;
    }
}

use({
    eql: {
        type: 'method',
        value: ({ value, inverted }) => (other: any) => {
            if (inverted) {
                notDeepEqual(value, other);
            } else {
                deepEqual(value, other);
            }
        }
    }
});
