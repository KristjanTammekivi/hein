import { greaterThanEqual, notGreaterThanEqual } from '../assert';
import { use } from '../mixins';

declare module '../expect.types' {
    interface NumberExpect<T> {
        /**
         * check if actual is greater than or equal to expected
         */
        greaterThanOrEqual(value: T): this;
        /**
         * check if actual is greater than or equal to expected
         */
        gte(value: T): this;
        /**
         * check if actual is greater than or equal to expected
         */
        atLeast(value: T): this;
    }
    interface DateExpect<T> {
        /**
         * check if actual is greater than or equal to expected
         */
        greaterThanOrEqual(value: T): this;
        /**
         * check if actual is greater than or equal to expected
         */
        gte(value: T): this;
        /**
         * check if actual is greater than or equal to expected
         */
        atLeast(value: T): this;
    }
}

use({
    greaterThanOrEqual: {
        type: 'method',
        value:
            ({ value, inverted }) =>
            (other: any) => {
                if (inverted) {
                    notGreaterThanEqual(value, other);
                } else {
                    greaterThanEqual(value, other);
                }
            }
    },
    gte: { type: 'alias', value: 'greaterThanOrEqual' },
    atLeast: { type: 'alias', value: 'greaterThanOrEqual' }
});
