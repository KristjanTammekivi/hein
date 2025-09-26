import { deepEqual, notDeepEqual } from '../assert.js';
import { use } from '../mixins.js';

use({
    partially: {
        type: 'property',
        value: () => ({ partial: true })
    },
    eql: {
        type: 'method',
        value:
            ({ value, inverted, partial }) =>
            (other: any, message) => {
                if (inverted) {
                    notDeepEqual(value, other, partial, message);
                } else {
                    deepEqual(value, other, partial, message);
                }
            }
    }
});
