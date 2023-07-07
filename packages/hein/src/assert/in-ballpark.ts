import { createAssertion } from 'hein-assertion-utils';

interface InBallpark {
    /**
     * check if a number is in ballpark of another number. See also roundTo
     * @param actual
     * @param expected
     * @param [allowedDifferenceMultiplier=0.1] - a number between 0 and 1 (exclusive). 0.1 (default) means 10% difference is allowed.
     * @example inBallpark(1, 1.1);
     * @example inBallpark(1, 1.1, 0.1);
     */
    (actual: number, expected: number, allowedDifferenceMultiplier?: number): void;
}

export const [inBallpark, notInBallpark] = createAssertion({
    messages: {
        miss: 'Expected {{actual}} to be in ballpark of {{expected}}',
        not: 'Expected {{actual}} to not be in ballpark of {{expected}}',
        invalidMultiplier: 'Expected multiplier to be between 0 and 1'
    },
    test: (report): InBallpark => (actual: number, expected: number, allowedDifference = 0.1) => {
        const absActual = Math.abs(actual);
        const absExpected = Math.abs(expected);
        if (allowedDifference <= 0 || allowedDifference >= 1) {
            report({ status: 'ok', messageId: 'invalidMultiplier', actual: allowedDifference });
            return report({ status: 'notok', messageId: 'invalidMultiplier', actual: allowedDifference });
        }
        if (absActual <= absExpected * (1 + allowedDifference) && absActual >= absExpected * (1 - allowedDifference)) {
            return report({ status: 'ok', expected, actual });
        }
        return report({ status: 'notok', messageId: 'miss', expected, actual });
    }
});
