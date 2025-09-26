import { greaterThan, notGreaterThan } from '../assert.js';
import { use } from '../mixins.js';

use({
    greaterThan: {
        type: 'method',
        value:
            ({ value, inverted }) =>
            (other: any) => {
                if (inverted) {
                    notGreaterThan(value, other);
                } else {
                    greaterThan(value, other);
                }
            }
    },
    gt: { type: 'alias', value: 'greaterThan' },
    above: { type: 'alias', value: 'greaterThan' }
});
