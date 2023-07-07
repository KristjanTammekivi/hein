import { isAfter, notAfter } from '../assert';
import { use } from '../mixins';

declare module '../expect.types' {
    interface DateExpect {
        /**
         * check if date is after other date
         * @param date
         */
        after(date: Date): this;
    }
}

use({
    after: {
        type: 'method',
        value: ({ value, inverted }) => (date: Date) => {
            if (inverted) {
                notAfter(value, date);
            } else {
                isAfter(value, date);
            }
        }
    }
});
