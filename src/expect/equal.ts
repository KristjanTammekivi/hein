import { equal, notEqual } from '../assert';
import { use } from '../mixins';

use({
    equal: {
        type: 'method',
        value: ({ value, inverted }) => (other: any, message?: string) => {
            if (inverted) {
                notEqual(value, other, message);
            } else {
                equal(value, other, message);
            }
        }
    },
    eq: { type: 'alias', value: 'equal' },
});
