import { inBallpark, notInBallpark } from '../assert';
import { use } from '../mixins';

declare module '../expect.types' {
    interface NumberExpect {
        /**
         * check if number close enough (default 10%)
         * @param ballpark
         * @param [multiplier=10] - a number between 0 and 1 (exclusive). 0.1 (default) means 10% difference is allowed.
         */
        ballpark(ballpark: number, multiplier?: number): this;
    }
}

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
