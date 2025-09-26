import { inBallpark, notInBallpark } from '../assert.js';
import { use } from '../mixins.js';

use({
    ballpark: {
        type: 'method',
        value:
            ({ value, inverted }) =>
            (ballpark, multiplier = 0.1) => {
                if (inverted) {
                    notInBallpark(value, ballpark, multiplier);
                } else {
                    inBallpark(value, ballpark, multiplier);
                }
            }
    }
});
