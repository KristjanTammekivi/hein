import { greaterThan, notGreaterThan } from '../assert';
import { use } from '../mixins';

declare module '../expect.types' {
    interface NumberExpect<T> {
        /**
         * check if actual is greater than expected
         */
        greaterThan(value: T): this;
        /**
         * check if actual is greater than expected
         */
        gt(value: T): this;
        /**
         * check if actual is greater than expected
         */
        above(value: T): this;
    }
    interface DateExpect<T> {
        /**
         * check if actual is greater than expected
         */
        greaterThan(value: T): this;
        /**
         * check if actual is greater than expected
         */
        gt(value: T): this;
        /**
         * check if actual is greater than expected
         */
        above(value: T): this;
    }
}

use({
    greaterThan: {
        type: 'method',
        value:
            ({ value, inverted }) =>
            (other: any) => {
                if (inverted) {
                    notGreaterThan(value, other);
                } else {
                    greaterThan(value, other);
                }
            }
    },
    gt: { type: 'alias', value: 'greaterThan' },
    above: { type: 'alias', value: 'greaterThan' }
});
