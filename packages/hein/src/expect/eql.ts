import { deepEqual, notDeepEqual } from '../assert';
import { use } from '../mixins';

type DeepPartial<T> = {
    [P in keyof T]?: T[P] | (T[P] extends Array<infer U> ? Array<DeepPartial<U>> : DeepPartial<T[P]>);
};

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
        value: ({ value, inverted, partial }) => (other: any, message) => {
            if (inverted) {
                notDeepEqual(value, other, partial, message);
            } else {
                deepEqual(value, other, partial, message);
            }
        }
    }
});
