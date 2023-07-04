import { createAssertion } from 'hein-assertion-utils';

export const [inBallpark, notInBallpark] = createAssertion({
    messages: {
        miss: 'Expected {{actual}} to be in ballpark of {{expected}}',
        not: 'Expected {{actual}} to not be in ballpark of {{expected}}'
    },
    test: (report) => (actual: number, expected: number, allowedDifference = 0.1) => {
        if (actual <= expected * (1 + allowedDifference) && actual >= expected * (1 - allowedDifference)) {
            return report({ status: 'ok', expected, actual });
        }
        return report({ status: 'notok', messageId: 'miss', expected, actual });
    }
});
