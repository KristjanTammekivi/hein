import { hasSize, notHasSize } from '../assert';
import { use } from '../mixins';

use({
    sizeOf: { type: 'alias', value: 'lengthOf' },
    lengthOf: {
        type: 'method',
        value: ({ value, inverted }) => (length: number, message?: string) => {
            if (inverted) {
                notHasSize(value, length, message);
            } else {
                hasSize(value, length, message);
            }
        }
    }
});
