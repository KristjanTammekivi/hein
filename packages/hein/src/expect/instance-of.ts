import { notInstanceOf, instanceOf } from '../assert.js';
import { use } from '../mixins.js';
import { type Constructor } from '../utils/process-error.js';

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
