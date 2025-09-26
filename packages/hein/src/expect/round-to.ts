import { notRoundTo, roundTo } from '../assert.js';
import { use } from '../mixins.js';

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
