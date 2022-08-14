import { eql, notEql } from '../assert';
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
                notEql(value, other);
            } else {
                eql(value, other);
            }
        }
    }
});
