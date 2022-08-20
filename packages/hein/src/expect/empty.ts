import { isEmpty, notIsEmpty } from '../assert';
import { use } from '../mixins';

declare module '../expect.types' {
    interface ObjectExpect<T> {
        /**
         * check if object/array/Map/Set is empty
         */
        empty(message?: string): this;
    }
}

use({
    empty: {
        type: 'method',
        value: ({ value, inverted }) => (message?: string) => {
            if (inverted) {
                notIsEmpty(value, message);
            } else {
                isEmpty(value, message);
            }
        }
    }
});
