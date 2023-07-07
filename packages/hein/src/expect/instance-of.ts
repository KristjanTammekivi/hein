import { notInstanceOf, instanceOf } from '../assert';
import { use } from '../mixins';
import { Constructor } from '../utils/process-error';

declare module '../expect.types' {
    interface ValueExpect<T> {
        /**
         * check if instance of value
         */
        instanceOf(constructor: Constructor): this;
    }
}

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
