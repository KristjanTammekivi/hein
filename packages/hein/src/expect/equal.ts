import { deepEqual, equal, notDeepEqual, notEqual } from '../assert.js';
import { use } from '../mixins.js';

use({
    equal: {
        type: 'method',
        value:
            ({ value, inverted, deep }) =>
            (other: any, message?: string) => {
                if (deep) {
                    if (inverted) {
                        notDeepEqual(value, other, message);
                    } else {
                        deepEqual(value, other, message);
                    }
                    return;
                }
                if (inverted) {
                    notEqual(value, other, message);
                } else {
                    equal(value, other, message);
                }
            }
    },
    eq: { type: 'alias', value: 'equal' }
});
