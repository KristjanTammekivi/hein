import { notGreaterThan, greaterThan } from '../assert';
import { use } from '../mixins';

declare module '../expect.types' {
    interface NumberExpect<T> {
        /**
         * check if actual is less than or equal to expected
         */
        lessThanOrEqual(value: T): this;
        /**
         * check if actual is less than or equal to expected
         */
        lte(value: T): this;
        /**
         * check if actual is less than or equal to expected
         */
        atMost(value: T): this;
    }
    interface DateExpect<T> {
        /**
         * check if actual is less than or equal to expected
         */
        lessThanOrEqual(value: T): this;
        /**
         * check if actual is less than or equal to expected
         */
        lte(value: T): this;
        /**
         * check if actual is less than or equal to expected
         */
        atMost(value: T): this;
    }
}

use({
    lessThanOrEqual: {
        type: 'method',
        value: ({ value, inverted }) => (other: any) => {
            if (inverted) {
                notGreaterThan(other, value);
            } else {
                greaterThan(other, value);
            }
        }
    },
    lte: { type: 'alias', value: 'lessThanOrEqual' },
    atMost: { type: 'alias', value: 'lessThanOrEqual' }
});
