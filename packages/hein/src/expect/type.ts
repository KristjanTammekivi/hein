import { notIsType, isType } from '../assert';
import { use } from '../mixins';
import { ValueType } from '../utils/get-type';

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
