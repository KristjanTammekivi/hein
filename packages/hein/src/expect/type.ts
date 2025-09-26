import { notIsType, isType } from '../assert.js';
import { use } from '../mixins.js';
import { type ValueType } from '../utils/get-type.js';

use({
    type: {
        type: 'method',
        value:
            ({ value, inverted }) =>
            (type: ValueType) => {
                if (inverted) {
                    notIsType(value, type);
                } else {
                    isType(value, type);
                }
            }
    }
});
