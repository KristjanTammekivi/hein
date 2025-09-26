import { startsWith, notStartsWith } from '../assert.js';
import { use } from '../mixins.js';

use({
    startWith: {
        type: 'method',
        value:
            ({ value, inverted }) =>
            (start: string) => {
                if (inverted) {
                    notStartsWith(value, start);
                } else {
                    startsWith(value, start);
                }
            }
    }
});
