import { isBetween, notBetween } from '../assert';
import { use } from '../mixins';

declare module '../expect.types' {
    interface DateExpect {
        /**
         * check if date is between other dates
         * @param start
         * @param end
         */
        between(start: Date, end: Date, inclusive?: boolean): this;
    }
    interface NumberExpect {
        /**
         * check if number is between other numbers
         * @param start
         * @param end
         * @param inclusive
         */
        between(start: number, end: number, inclusive?: boolean): this;
    }
}

use({
    between: {
        type: 'method',
        value:
            ({ value, inverted }) =>
            (start: Date, end: Date, inclusive = true) => {
                if (inverted) {
                    notBetween(value, start, end, { inclusive });
                } else {
                    isBetween(value, start, end, { inclusive });
                }
            }
    }
});
