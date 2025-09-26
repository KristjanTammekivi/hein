import { hasSize, notHasSize } from '../assert.js';
import { use } from '../mixins.js';

use({
    sizeOf: { type: 'alias', value: 'lengthOf' },
    lengthOf: {
        type: 'method',
        value:
            ({ value, inverted }) =>
            (length: number, message?: string) => {
                if (inverted) {
                    notHasSize(value, length, message);
                } else {
                    hasSize(value, length, message);
                }
            }
    }
});
