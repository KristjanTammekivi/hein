import { greaterThan, notGreaterThan } from '../assert';
import { use } from '../mixins';

use({
    greaterThanOrEqual: {
        type: 'method',
        value: ({ value, inverted }) => (other: any) => {
            if (inverted) {
                notGreaterThan(value, other);
            } else {
                greaterThan(value, other);
            }
        }
    },
    gte: { type: 'alias', value: 'greaterThanOrEqual' },
    atLeast: { type: 'alias', value: 'greaterThanOrEqual' }
});
