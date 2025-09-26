import { deepHasProperty, deepNotHasProperty, hasProperty, notHasProperty } from '../assert.js';
import { use } from '../mixins.js';

use({
    property: {
        type: 'method',
        value:
            ({ value, inverted, deep }) =>
            (...args: [any, any]) => {
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
