import { isBefore, notBefore } from '../assert.js';
import { use } from '../mixins.js';

use({
    before: {
        type: 'method',
        value:
            ({ value, inverted }) =>
            (date: Date) => {
                if (inverted) {
                    notBefore(value, date);
                } else {
                    isBefore(value, date);
                }
            }
    }
});
