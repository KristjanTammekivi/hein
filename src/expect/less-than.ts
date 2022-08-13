import { notGreaterThan, greaterThan } from '../assert';
import { use } from '../mixins';

use({
    lessThan: {
        type: 'method',
        value: ({ value, inverted }) => (other: any) => {
            if (inverted) {
                notGreaterThan(other, value);
            } else {
                greaterThan(other, value);
            }
        }
    },
    lt: { type: 'alias', value: 'lessThan' },
    below: { type: 'alias', value: 'lessThan' }
})