import { endsWith, notEndsWith } from '../assert';
import { use } from '../mixins';

declare module '../expect.types' {
    interface StringExpect {
        /**
         * check if string ends with other string
         * @param start
         * @example endsWith('foo', 'o');
         */
        endWith(end: string): this;
    }
}

use({
    endWith: {
        type: 'method',
        value:
            ({ value, inverted }) =>
                (end: string) => {
                    if (inverted) {
                        notEndsWith(value, end);
                    } else {
                        endsWith(value, end);
                    }
                }
    }
});
