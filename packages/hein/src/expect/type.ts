import { notIsType, isType } from '../assert.js';
import { use } from '../mixins.js';
import { type ValueType } from '../utils/get-type.js';

declare module '../expect.types' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ValueExpect<T> {
        /**
         * check if value is of certain type
         */
        type(type: ValueType): this;
    }
}

use({
    type: {
        type: 'method',
        value:
            ({ value, inverted }) =>
            (type: ValueType) => {
                if (inverted) {
                    notIsType(value, type);
                } else {
                    isType(value, type);
                }
            }
    }
});
