import { notInstanceOf, instanceOf } from '../assert';
import { use } from '../mixins';
import { Constructor } from '../utils/process-error';

use({
    instanceOf: {
        type: 'method',
        value: ({ value, inverted }) => (constructor: Constructor) => {
            if (inverted) {
                notInstanceOf(value, constructor);
            } else {
                instanceOf(value, constructor);
            }
        }
    }
});
