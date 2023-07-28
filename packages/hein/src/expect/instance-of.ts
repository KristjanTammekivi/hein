import { notInstanceOf, instanceOf } from '../assert';
import { use } from '../mixins';
import { Constructor } from '../utils/process-error';

declare module '../expect.types' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ValueExpect<T> {
        /**
         * check if instance of value
         * @param constructor - The constructor function to check against
         */
        instanceOf(constructor: Constructor): this;
    }
}

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
