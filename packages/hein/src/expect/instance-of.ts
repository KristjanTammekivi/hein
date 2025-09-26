import { notInstanceOf, instanceOf } from '../assert.js';
import { use } from '../mixins.js';
import { type Constructor } from '../utils/process-error.js';

use({
    instanceOf: {
        type: 'method',
        value:
            ({ value, inverted }) =>
            (constructor: Constructor) => {
                if (inverted) {
                    notInstanceOf(value, constructor);
                } else {
                    instanceOf(value, constructor);
                }
            }
    }
});
