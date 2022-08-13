import { hasSize, notHasSize } from '../assert';
import { use } from '../mixins';

declare module '../expect.types' {
    interface ObjectExpect<T> {
        /**
         * check for object/array/Map/Set/string to have a certain size
         */
        sizeOf(size: number, message?: string): this;
    }
    interface StringExpect {
        /**
         * check for string to have a certain size
         */
        lengthOf(length: number, message?: string): this;
    }
    interface ArrayExpect<T> {
        /**
         * check for array length
         */
        lengthOf(length: number, message?: string): this;
    }
}

use({
    sizeOf: { type: 'alias', value: 'lengthOf' },
    lengthOf: {
        type: 'method',
        value: ({ value, inverted }) => (length: number, message?: string) => {
            if (inverted) {
                notHasSize(value, length, message);
            } else {
                hasSize(value, length, message);
            }
        }
    }
});
