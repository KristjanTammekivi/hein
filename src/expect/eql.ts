import { eql, notEql } from '../assert';
import { Expect } from '../expect.types';
import { use } from '../mixins';

type AllowExpectAsValue<T> = { [P in keyof T]: T[P] | Expect | AllowExpectAsValue<T[P]> };

declare module '../expect.types' {
    interface ValueExpect<T> {
        /**
         * check for deep equality
         */
        eql(value: AllowExpectAsValue<T>): this;
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
