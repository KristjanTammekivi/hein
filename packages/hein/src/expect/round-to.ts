import { notRoundTo, roundTo } from '../assert';
import { use } from '../mixins';

declare module '../expect.types' {
    interface NumberExpect {
        /**
         * check if number close enough (default 10%)
         * @param target
         * @param decimal defaults to 0, can be negative if trying to round down to nearest 10, 100, etc
         */
        roundTo(target: number, decimal?: number): this;
    }
}

use({
    roundTo: {
        type: 'method',
        value:
            ({ value, inverted }) =>
            (target, decimal = 0) => {
                if (inverted) {
                    notRoundTo(value, target, decimal);
                } else {
                    roundTo(value, target, decimal);
                }
            }
    }
});
