import { hasKeys, notHasKeys } from '../assert.js';
import { use } from '../mixins.js';

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
