import { hasKeys, notHasKeys } from '../assert';
import { use } from '../mixins';

type InferMapKeys<T> = T extends Map<infer K, any> ? K : never;

declare module '../expect.types' {
    interface ObjectExpect<T> {
        /**
         * Check if value has keys
         */
        keys<K extends keyof T>(keys: K[] | K): this;
    }
    interface MapExpect<T> {
        /**
         * Check if value has keys
         */
        keys<K extends InferMapKeys<T>>(keys: K[] | K): this;
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
