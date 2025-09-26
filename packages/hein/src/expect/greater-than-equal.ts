import { greaterThanEqual, notGreaterThanEqual } from '../assert.js';
import { use } from '../mixins.js';

use({
    greaterThanOrEqual: {
        type: 'method',
        value:
            ({ value, inverted }) =>
            (other: any) => {
                if (inverted) {
                    notGreaterThanEqual(value, other);
                } else {
                    greaterThanEqual(value, other);
                }
            }
    },
    gte: { type: 'alias', value: 'greaterThanOrEqual' },
    atLeast: { type: 'alias', value: 'greaterThanOrEqual' }
});
