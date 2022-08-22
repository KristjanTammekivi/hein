import { hasProperty, notHasProperty } from '../assert';
import { use } from '../mixins';

declare module '../expect.types' {
    interface ValueExpect<T> {
        property<K extends keyof T>(property: K, value?: T[K]): this;
    }
}

use({
    property: {
        type: 'method',
        value: ({ value, inverted }) => (...args: [any, any]) => {
            if (inverted) {
                return notHasProperty(value, ...args);
            }
            return hasProperty(value, ...args);
        }
    }
});
