import { includes, notIncludes } from '../assert.js';
import { use } from '../mixins.js';

use({
    include: {
        type: 'method',
        value:
            ({ value, inverted }) =>
            (...elements: any[]) => {
                if (inverted) {
                    notIncludes(value, ...elements);
                } else {
                    includes(value, ...elements);
                }
            }
    },
    contain: {
        type: 'alias',
        value: 'include'
    }
});
