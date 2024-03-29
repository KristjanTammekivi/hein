import { match, notMatch } from '../assert';
import { use } from '../mixins';

declare module '../expect.types' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface StringExpect<T> {
        /**
         * check if string matches regex
         */
        match(regex: RegExp): this;
    }
}

use({
    match: {
        type: 'method',
        value:
            ({ value, inverted }) =>
            (regex: RegExp) => {
                if (inverted) {
                    notMatch(value, regex);
                } else {
                    match(value, regex);
                }
            }
    }
});
