import { startsWith, notStartsWith } from '../assert.js';
import { use } from '../mixins.js';

declare module '../expect.types' {
    interface StringExpect {
        /**
         * check if string starts with other string
         * @param start
         * @example startsWith('foo', 'f');
         */
        startWith(start: string): this;
    }
}

use({
    startWith: {
        type: 'method',
        value:
            ({ value, inverted }) =>
            (start: string) => {
                if (inverted) {
                    notStartsWith(value, start);
                } else {
                    startsWith(value, start);
                }
            }
    }
});
