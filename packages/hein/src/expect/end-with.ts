import { endsWith, notEndsWith } from '../assert.js';
import { use } from '../mixins.js';

use({
    endWith: {
        type: 'method',
        value:
            ({ value, inverted }) =>
            (end: string) => {
                if (inverted) {
                    notEndsWith(value, end);
                } else {
                    endsWith(value, end);
                }
            }
    }
});
