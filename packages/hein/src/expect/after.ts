import { isAfter, notAfter } from '../assert.js';
import { use } from '../mixins.js';

use({
    after: {
        type: 'method',
        value:
            ({ value, inverted }) =>
            (date: Date) => {
                if (inverted) {
                    notAfter(value, date);
                } else {
                    isAfter(value, date);
                }
            }
    }
});
