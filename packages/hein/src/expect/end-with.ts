import { endsWith, notEndsWith } from '../assert';
import { use } from '../mixins';

declare module '../expect.types' {
    interface StringExpect {
        endWith(start: string): this;
    }
}

use({
    endWith: {
        type: 'method',
        value:
            ({ value, inverted }) =>
                (start: string) => {
                    if (inverted) {
                        notEndsWith(value, start);
                    } else {
                        endsWith(value, start);
                    }
                }
    }
});
