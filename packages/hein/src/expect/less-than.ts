import { lessThan, notLessThan } from '../assert';
import { use } from '../mixins';

declare module '../expect.types' {
    interface NumberExpect<T> {
        /**
         * check if actual is less than expected
         */
        lessThan(value: T): this;
        /**
         * check if actual is less than expected
         */
        lt(value: T): this;
        /**
         * check if actual is less than expected
         */
        below(value: T): this;
    }
    interface DateExpect<T> {
        /**
         * check if actual is less than expected
         */
        lessThan(value: T): this;
        /**
         * check if actual is less than expected
         */
        lt(value: T): this;
        /**
         * check if actual is less than expected
         */
        below(value: T): this;
    }
}

use({
    lessThan: {
        type: 'method',
        value:
            ({ value, inverted }) =>
            (other: any) => {
                if (inverted) {
                    notLessThan(value, other);
                } else {
                    lessThan(value, other);
                }
            }
    },
    lt: { type: 'alias', value: 'lessThan' },
    below: { type: 'alias', value: 'lessThan' }
});
