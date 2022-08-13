import { greaterThan, notGreaterThan } from '../assert';
import { use } from '../mixins';

use({
    greaterThan: {
        type: 'method',
        value: ({ value, inverted }) => (other: any) => {
            if (inverted) {
                notGreaterThan(value, other);
            } else {
                greaterThan(value, other);
            }
        }
    },
    gt: { type: 'alias', value: 'greaterThan' },
    above: { type: 'alias', value: 'greaterThan' },
});
