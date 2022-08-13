import { notIsType, isType } from '../assert';
import { use } from '../mixins';
import { ValueType } from '../utils/get-type';

use({
    type: {
        type: 'method',
        value: ({ value, inverted }) => (type: ValueType) => {
            if (inverted) {
                notIsType(value, type);
            } else {
                isType(value, type);
            }
        }
    }
});
