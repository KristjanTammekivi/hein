import { lessThanEqual, notLessThanEqual } from '../assert.js';
import { use } from '../mixins.js';

use({
    lessThanOrEqual: {
        type: 'method',
        value:
            ({ value, inverted }) =>
            (other: any) => {
                if (inverted) {
                    notLessThanEqual(value, other);
                } else {
                    lessThanEqual(value, other);
                }
            }
    },
    lte: { type: 'alias', value: 'lessThanOrEqual' },
    atMost: { type: 'alias', value: 'lessThanOrEqual' }
});
