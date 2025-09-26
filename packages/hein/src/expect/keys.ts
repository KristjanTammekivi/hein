import { hasKeys, notHasKeys } from '../assert.js';
import { use } from '../mixins.js';

use({
    keys: {
        type: 'method',
        value:
            ({ value, inverted }) =>
            (keys) => {
                if (inverted) {
                    notHasKeys(value, keys);
                } else {
                    hasKeys(value, keys);
                }
            }
    }
});
