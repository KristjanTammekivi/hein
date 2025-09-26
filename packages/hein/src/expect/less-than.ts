import { lessThan, notLessThan } from '../assert.js';
import { use } from '../mixins.js';

use({
    lessThan: {
        type: 'method',
        value:
            ({ value, inverted }) =>
            (other: any) => {
                if (inverted) {
                    notLessThan(value, other);
                } else {
                    lessThan(value, other);
                }
            }
    },
    lt: { type: 'alias', value: 'lessThan' },
    below: { type: 'alias', value: 'lessThan' }
});
