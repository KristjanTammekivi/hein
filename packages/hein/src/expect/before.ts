import { isBefore, notBefore } from '../assert';
import { use } from '../mixins';

declare module '../expect.types' {
    interface DateExpect {
        /**
         * check if date is before other date
         * @param date
         */
        before(date: Date): this;
    }
}

use({
    before: {
        type: 'method',
        value: ({ value, inverted }) => (date: Date) => {
            if (inverted) {
                notBefore(value, date);
            } else {
                isBefore(value, date);
            }
        }
    }
});
