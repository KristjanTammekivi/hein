import { isEmpty, notIsEmpty } from '../assert';
import { use } from '../mixins';

declare module '../expect.types' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ObjectExpect<T> {
        /**
         * check if object/array/Map/Set is empty
         */
        empty(message?: string): this;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface MapExpect<T> {
        /**
         * check if Map is empty
         */
        empty(message?: string): this;
    }
}

use({
    empty: {
        type: 'method',
        value:
            ({ value, inverted }) =>
            (message?: string) => {
                if (inverted) {
                    notIsEmpty(value, message);
                } else {
                    isEmpty(value, message);
                }
            }
    }
});
