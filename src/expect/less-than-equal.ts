import { notGreaterThan, greaterThan } from '../assert';
import { use } from '../mixins';

use({
    lessThanOrEqual: {
        type: 'method',
        value: ({ value, inverted }) => (other: any) => {
            if (inverted) {
                notGreaterThan(other, value);
            } else {
                greaterThan(other, value);
            }
        }
    },
    lte: { type: 'alias', value: 'lessThanOrEqual' },
    atMost: { type: 'alias', value: 'lessThanOrEqual' },
})
