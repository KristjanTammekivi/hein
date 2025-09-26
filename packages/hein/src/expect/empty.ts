import { isEmpty, notIsEmpty } from '../assert.js';
import { use } from '../mixins.js';

use({
    empty: {
        type: 'method',
        value:
            ({ value, inverted }) =>
            (message?: string) => {
                if (inverted) {
                    notIsEmpty(value, message);
                } else {
                    isEmpty(value, message);
                }
            }
    }
});
