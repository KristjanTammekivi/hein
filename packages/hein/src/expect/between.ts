import { isBetween, notBetween } from '../assert.js';
import { use } from '../mixins.js';

use({
    between: {
        type: 'method',
        value:
            ({ value, inverted }) =>
            (start: Date, end: Date, inclusive = true) => {
                if (inverted) {
                    notBetween(value, start, end, { inclusive });
                } else {
                    isBetween(value, start, end, { inclusive });
                }
            }
    }
});
