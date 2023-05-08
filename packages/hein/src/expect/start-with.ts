import { startsWith, notStartsWith } from '../assert';
import { use } from '../mixins';

declare module '../expect.types' {
    interface StringExpect {
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
