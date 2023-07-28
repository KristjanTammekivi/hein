import { deepEqual, notDeepEqual } from '../assert';
import { use } from '../mixins';
import { DeepPartial } from '../utils/types';

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
