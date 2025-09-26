import { notThrows, throws } from '../assert.js';
import { type State, use } from '../mixins.js';

use({
    throw: {
        type: 'method',
        value:
            ({ value, inverted }: State<any>) =>
            (...args: any[]) => {
                return inverted ? notThrows(value, ...args) : throws(value, ...args);
            }
    }
});
