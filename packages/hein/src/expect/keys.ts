import { hasKeys, notHasKeys } from '../assert';
import { use } from '../mixins';

declare module '../expect.types' {
    interface ObjectExpect<T> {
        /**
         * Check if value has keys
         */
        keys<K extends keyof T>(keys: K[] | K): this;
    }
}

use({
    keys: {
        type: 'method',
        value:
            ({ value, inverted }) =>
            (keys) => {
                if (inverted) {
                    notHasKeys(value, keys);
                } else {
                    hasKeys(value, keys);
                }
            }
    }
});
