import { deepHasProperty, deepNotHasProperty, hasProperty, notHasProperty } from '../assert';
import { use } from '../mixins';

declare module '../expect.types' {
    interface ValueExpect<T> {
        property<K extends keyof T>(property: K | string, value?: any): this;
    }
}

use({
    property: {
        type: 'method',
        value: ({ value, inverted, deep }) => (...args: [any, any]) => {
            if (deep) {
                if (inverted) {
                    return deepNotHasProperty(value, ...args);
                }
                return deepHasProperty(value, ...args);
            }
            if (inverted) {
                return notHasProperty(value, ...args);
            }
            return hasProperty(value, ...args);
        }
    }
});
